import os
import logging
import json
import torch
import hashlib
import hmac
import re
import math
import numpy as np

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ThemisWatermarker")

# ─────────────────────────────────────────────────────────────────────────────
# 1. KGW – Kirchenbauer et al. Green-List Watermark
# ─────────────────────────────────────────────────────────────────────────────
class KGWWatermarker:
    def __init__(self, vocab_size: int, delta: float = 2.0, gamma: float = 0.5):
        self.vocab_size = vocab_size
        self.delta = delta
        self.gamma = gamma

    def _get_seed(self, prev_token_id: int, secret_key: str) -> int:
        seed_str = f"{secret_key}-kgw-{prev_token_id}"
        return int(hashlib.sha256(seed_str.encode()).hexdigest(), 16) % (2 ** 32)

    def _get_green_list(self, prev_token_id: int, secret_key: str, gamma: float = None) -> torch.Tensor:
        gamma = gamma if gamma is not None else self.gamma
        seed = self._get_seed(prev_token_id, secret_key)
        gen = torch.Generator(device="cpu").manual_seed(seed)
        perm = torch.randperm(self.vocab_size, generator=gen)
        return perm[: int(self.vocab_size * gamma)]

    def apply_bias(self, logits: torch.Tensor, prev_token_id: int, secret_key: str, gamma: float = None) -> torch.Tensor:
        gamma = gamma if gamma is not None else self.gamma
        green_list = self._get_green_list(prev_token_id, secret_key, gamma).to(logits.device)
        logits[:, green_list] += self.delta
        return logits

    def get_green_set(self, prev_token_id: int, secret_key: str, gamma: float = None) -> set:
        gamma = gamma if gamma is not None else self.gamma
        return set(self._get_green_list(prev_token_id, secret_key, gamma).tolist())

# ─────────────────────────────────────────────────────────────────────────────
# 2. Semantic – Hash-based Green-List
# ─────────────────────────────────────────────────────────────────────────────
class SemanticWatermarker:
    def __init__(self, tokenizer, vocab_size: int, delta: float = 2.5):
        self.tokenizer = tokenizer
        self.vocab_size = vocab_size
        self.delta = delta

    def _get_cluster_seed(self, prev_token_id: int) -> int:
        return (prev_token_id * 31) % (2 ** 32)

    def apply_bias(self, logits: torch.Tensor, prev_token_id: int, secret_key: str = None, gamma: float = 0.5):
        seed = self._get_cluster_seed(prev_token_id)
        gen = torch.Generator(device="cpu").manual_seed(seed)
        perm = torch.randperm(self.vocab_size, generator=gen)
        green_size = int(self.vocab_size * gamma)
        green_list = perm[:green_size].to(logits.device)
        logits[:, green_list] += self.delta
        return logits, set(green_list.tolist())

# ─────────────────────────────────────────────────────────────────────────────
# 3. Crypto – HMAC-SHA256 Keyed Green-List
# ─────────────────────────────────────────────────────────────────────────────
class CryptoWatermarker:
    def __init__(self, tokenizer, vocab_size: int, delta: float = 2.5):
        self.tokenizer = tokenizer
        self.vocab_size = vocab_size
        self.delta = delta

    def _get_hmac_seed(self, prev_token_id: int, secret_key: str) -> int:
        h = hmac.new(secret_key.encode(), str(prev_token_id).encode(), hashlib.sha256)
        return int.from_bytes(h.digest()[:4], byteorder="big") % (2 ** 32)

    def apply_bias(self, logits: torch.Tensor, prev_token_id: int, secret_key: str, gamma: float = 0.5):
        seed = self._get_hmac_seed(prev_token_id, secret_key)
        gen = torch.Generator(device="cpu").manual_seed(seed)
        perm = torch.randperm(self.vocab_size, generator=gen)
        green_size = int(self.vocab_size * gamma)
        green_list = perm[:green_size].to(logits.device)
        logits[:, green_list] += self.delta
        return logits, set(green_list.tolist())

    def get_green_set(self, prev_token_id: int, secret_key: str, gamma: float = 0.5) -> set:
        seed = self._get_hmac_seed(prev_token_id, secret_key)
        gen = torch.Generator(device="cpu").manual_seed(seed)
        perm = torch.randperm(self.vocab_size, generator=gen)
        green_size = int(self.vocab_size * gamma)
        return set(perm[:green_size].tolist())

# ─────────────────────────────────────────────────────────────────────────────
# 4. Exponential – Distortion-Free
# ─────────────────────────────────────────────────────────────────────────────
class ExponentialWatermarker:
    def __init__(self, vocab_size: int):
        self.vocab_size = vocab_size

    def get_noise(self, prev_token_id: int, secret_key: str, device: str = "cpu") -> torch.Tensor:
        seed_str = f"{secret_key}-exp-{prev_token_id}"
        seed = int(hashlib.sha256(seed_str.encode()).hexdigest(), 16) % (2 ** 32)
        gen = torch.Generator(device="cpu").manual_seed(seed)
        u = torch.rand(self.vocab_size, generator=gen)
        noise = -torch.log(-torch.log(u + 1e-10) + 1e-10)
        return noise.to(device)

    def apply_bias(self, logits: torch.Tensor, prev_token_id: int, secret_key: str) -> torch.Tensor:
        noise = self.get_noise(prev_token_id, secret_key, device=logits.device if logits.dim() > 1 else "cpu")
        if logits.dim() == 2:
            logits[0] += noise
        else:
            logits += noise
        return logits

# ─────────────────────────────────────────────────────────────────────────────
# 5. Adaptive KGW – Entropy-Aware Green-List
# ─────────────────────────────────────────────────────────────────────────────
class AdaptiveKGWWatermarker:
    def __init__(self, vocab_size: int, base_delta: float = 2.0, gamma: float = 0.5, entropy_weight: float = 2.0):
        self.vocab_size = vocab_size
        self.base_delta = base_delta
        self.gamma = gamma
        self.entropy_weight = entropy_weight

    def _normalised_entropy(self, logits: torch.Tensor) -> float:
        probs = torch.softmax(logits.float(), dim=-1).clamp(min=1e-9)
        entropy = -(probs * torch.log(probs)).sum().item()
        max_entropy = math.log(self.vocab_size)
        return entropy / max_entropy if max_entropy > 0 else 0.0

    def _get_seed(self, prev_token_id: int, secret_key: str) -> int:
        seed_str = f"{secret_key}-adaptive-{prev_token_id}"
        return int(hashlib.sha256(seed_str.encode()).hexdigest(), 16) % (2 ** 32)

    def _get_green_list(self, prev_token_id: int, secret_key: str, gamma: float) -> torch.Tensor:
        seed = self._get_seed(prev_token_id, secret_key)
        gen = torch.Generator(device="cpu").manual_seed(seed)
        perm = torch.randperm(self.vocab_size, generator=gen)
        return perm[: int(self.vocab_size * gamma)]

    def apply_bias(self, logits: torch.Tensor, prev_token_id: int, secret_key: str, gamma: float = None) -> torch.Tensor:
        gamma = gamma if gamma is not None else self.gamma
        logit_vec = logits[0] if logits.dim() == 2 else logits
        h_norm = self._normalised_entropy(logit_vec)
        eff_delta = self.base_delta * (1.0 + self.entropy_weight * h_norm)
        green_list = self._get_green_list(prev_token_id, secret_key, gamma).to(logits.device)
        logits[:, green_list] += eff_delta
        return logits

    def get_green_set(self, prev_token_id: int, secret_key: str, gamma: float = None) -> set:
        gamma = gamma if gamma is not None else self.gamma
        return set(self._get_green_list(prev_token_id, secret_key, gamma).tolist())

# ─────────────────────────────────────────────────────────────────────────────
# 6. Ensemble – Multi-Strategy Stacking
# ─────────────────────────────────────────────────────────────────────────────
class EnsembleWatermarker:
    def __init__(self, *watermarkers):
        self.watermarkers = list(watermarkers)

    def apply_bias(self, logits: torch.Tensor, prev_token_id: int, secret_key: str, gamma: float = 0.5) -> torch.Tensor:
        for wm in self.watermarkers:
            result = wm.apply_bias(logits, prev_token_id, secret_key, gamma)
            logits = result[0] if isinstance(result, tuple) else result
        return logits

    def get_green_set(self, prev_token_id: int, secret_key: str, gamma: float = 0.5) -> set:
        union = set()
        for wm in self.watermarkers:
            if hasattr(wm, "get_green_set"):
                union |= wm.get_green_set(prev_token_id, secret_key, gamma)
        return union

# ─────────────────────────────────────────────────────────────────────────────
# 7. Stylometric – Post-Hoc Sentence-Structure
# ─────────────────────────────────────────────────────────────────────────────
class StylometricWatermarker:
    def split_into_sentences(self, text: str) -> list:
        return [s.strip() for s in re.findall(r"[^.!?]+[.!?]?", text) if s.strip()]

    def _get_rule(self, index: int, secret_key: str) -> int:
        h = hmac.new(secret_key.encode(), str(index).encode(), hashlib.sha256)
        return int.from_bytes(h.digest()[:4], byteorder="big") % 3

    def apply(self, text: str, secret_key: str) -> str:
        sentences = self.split_into_sentences(text)
        modified = []
        for i, s in enumerate(sentences):
            rule = self._get_rule(i, secret_key)
            s = s.rstrip(".!?").replace(",", "")
            words = s.split()
            if rule == 0: # Short
                if len(words) > 10: words = words[:10]
                while len(words) < 10: words.append("neutral")
            elif rule == 1: # Long
                if len(words) > 22: words = words[:22]
                while len(words) < 22: words.append("padding")
            elif rule == 2: # Comma
                if len(words) >= 3: s = " ".join(words[:2]) + ", " + " ".join(words[2:])
                else: s = s + ", indeed"
                words = s.split()
            modified.append(" ".join(words).strip() + ".")
        return " ".join(modified)

    def detect(self, text: str, secret_key: str) -> float:
        sentences = self.split_into_sentences(text)
        if not sentences: return 0.0
        compliant = 0
        for i, s in enumerate(sentences):
            rule = self._get_rule(i, secret_key)
            wc = len(s.split())
            if rule == 0: compliant += int(8 <= wc <= 12 and "," not in s)
            elif rule == 1: compliant += int(18 <= wc <= 25 and "," not in s)
            elif rule == 2: compliant += int("," in s)
        return compliant / len(sentences)

# ─────────────────────────────────────────────────────────────────────────────
# THEMIS ORCHESTRATOR
# ─────────────────────────────────────────────────────────────────────────────
class ThemisWatermarker:
    """
    The Goddess of Divine Law and Order.
    Handles generate/detect for LLM watermarking and security fingerprinting.
    """
    def __init__(self, vocab_size=32000):
        self.gamma = 0.5
        self.delta = 2.0
        self.secret = os.environ.get("WATERMARK_SECRET_KEY", "ai-security-expert-key")
        
        # Strategy pattern: use specialized watermarkers
        self.kgw = KGWWatermarker(vocab_size=vocab_size, delta=self.delta, gamma=self.gamma)
        self.crypto = CryptoWatermarker(tokenizer=None, vocab_size=vocab_size, delta=self.delta)

    def generate_watermark(self, text, approach="KGW"):
        logger.info(f"Themis applying divine order via {approach}")
        return {"text": text, "approach": approach, "status": "processed"}

    def detect_watermark(self, text, approach="KGW"):
        logger.info(f"Themis judging text for divine marks using {approach}")
        # Placeholder for bridging with local_inference_server logic
        return {"z_score": 0.0, "decision": "CLEAN", "confidence": 0.5, "approach": approach}

    def security_fingerprint(self, system_id="playground-v1"):
        return {"system_id": system_id, "status": "secure", "fingerprint": "GREEK-GOD-SEC-777"}
