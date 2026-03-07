"""
=================================================================================
PROJECT:     AI Watermarking System — Local Inference Server
FILE:        local_inference_server.py
PORT:        8083
DESCRIPTION: Flask inference server with full multi-algorithm watermarking.
             Supported approaches (pass as "approach" in request body):
               KGW           – Kirchenbauer et al. green-list (keyed SHA-256)
               SEMANTIC      – Hash-based green-list (fast, key-less seed)
               CRYPTO        – HMAC-SHA256 keyed green-list (high-security)
               EXPONENTIAL   – Distortion-free Gumbel-Max noise
               ADAPTIVE_KGW  – Entropy-aware adaptive delta KGW
               ENSEMBLE      – KGW + CRYPTO stacked (most robust)
               STYLOMETRIC   – Post-hoc sentence-structure rewriting (text only)

             DO NOT modify /generate or /health — they serve the main Go backend.
COPYRIGHT:   (c) 2026 Dinesh Kumar G M. All Rights Reserved.
=================================================================================
"""

import os
import time
import json
import platform
import torch
import hashlib
import math
from flask import Flask, request, Response, stream_with_context
from transformers import (AutoModelForCausalLM, AutoTokenizer,
                          TextIteratorStreamer, StoppingCriteria,
                          StoppingCriteriaList)
from threading import Thread, Lock
from dotenv import load_dotenv
from typing import List, Dict

# ── Import all watermarking algorithms from Themis ────────────────────────────
from themis_watermarker import (
    KGWWatermarker,
    SemanticWatermarker,
    CryptoWatermarker,
    ExponentialWatermarker,
    AdaptiveKGWWatermarker,
    EnsembleWatermarker,
    StylometricWatermarker,
)

# ── Environment ───────────────────────────────────────────────────────────────
load_dotenv() # Load from current directory .env first
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))

app = Flask(__name__)

# ── Config ─────────────────────────────────────────────────────────────────────
MODEL_ID   = os.environ.get("HF_MODEL_ID", "TinyLlama/TinyLlama-1.1B-Chat-v1.0")
HF_TOKEN   = os.environ.get("HF_API_TOKEN", "")
SECRET_KEY = os.environ.get("WATERMARK_SECRET_KEY", "ai-security-expert-key")
GAMMA      = 0.5
DELTA      = 2.0

print(f"[*] Initializing Unified Local Inference Server…")
print(f"[*] Model ID: {MODEL_ID}")

# ── Global state ──────────────────────────────────────────────────────────────
model     = None
tokenizer = None
gen_lock  = Lock()
stop_flag = False


# =============================================================================
# Stopping Criteria
# =============================================================================
class StopOnSignal(StoppingCriteria):
    def __call__(self, input_ids: torch.LongTensor,
                 scores: torch.FloatTensor, **kwargs) -> bool:
        global stop_flag
        return stop_flag


# =============================================================================
# Model Loading
# =============================================================================
def load_model():
    global model, tokenizer
    
    if os.environ.get("DISABLE_LOCAL_MODEL", "false").lower() == "true":
        print("[!] Local model loading is DISABLED as per system instructions.")
        return

    print("[*] Loading model into RAM from local disk (Hugging Face cache)…")
    try:
        token = HF_TOKEN if HF_TOKEN not in ("", "your_hf_token_here") else None
        tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, token=token)
        
        dtype = torch.float32
        if torch.cuda.is_available():
            dtype = torch.float16
            if torch.cuda.is_bf16_supported():
                dtype = torch.bfloat16
        elif platform.processor() and ('avx512' in platform.processor().lower()):
            # Modern CPUs handle bfloat16 well
            dtype = torch.bfloat16

        model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            torch_dtype=dtype,
            device_map="auto",
            token=token,
            low_cpu_mem_usage=True
        )
        model.eval()
        print("[+] Model loaded successfully.")
        print("[*] Server ready at http://127.0.0.1:8083")
    except Exception as e:
        import traceback
        print(f"[!] Error loading model: {e}")
        traceback.print_exc()


# =============================================================================
# KGW / Detection helpers  (kept for backward compat with /detect KGW path)
# =============================================================================
def _compute_seed(prev_token_id: int, secret_key: str) -> int:
    seed_str = f"{secret_key}-{prev_token_id}"
    return int(hashlib.sha256(seed_str.encode()).hexdigest(), 16) % (2 ** 32)


def get_green_list(prev_token_id: int, vocab_size: int,
                   secret_key: str, gamma: float = 0.5) -> torch.Tensor:
    """Legacy KGW green-list helper (used inside /detect for KGW approach)."""
    seed = _compute_seed(prev_token_id, secret_key)
    gen  = torch.Generator(device="cpu")
    gen.manual_seed(seed)
    perm = torch.randperm(vocab_size, generator=gen)
    return perm[: int(vocab_size * gamma)]


def apply_watermark_bias(logits: torch.FloatTensor,
                          green_list: torch.LongTensor,
                          delta: float = 1.0) -> torch.FloatTensor:
    logits[:, green_list] += delta
    return logits


def calculate_z_score(green_count: int, total_tokens: int, gamma: float) -> float:
    expected = total_tokens * gamma
    variance = total_tokens * gamma * (1 - gamma)
    z = (green_count - expected) / math.sqrt(variance + 1e-9)
    return (z + abs(z)) / 2.0   # clip to ≥ 0


# =============================================================================
# Watermarker Factory
# =============================================================================
def _build_watermarkers():
    """
    Instantiate all algorithm objects once after the model is loaded.
    Called lazily at first request so that vocab_size is available.
    """
    vs = tokenizer.vocab_size
    kgw_wm       = KGWWatermarker(vocab_size=vs, delta=DELTA, gamma=GAMMA)
    semantic_wm  = SemanticWatermarker(tokenizer, vocab_size=vs, delta=DELTA)
    crypto_wm    = CryptoWatermarker(tokenizer, vocab_size=vs, delta=DELTA)
    exp_wm       = ExponentialWatermarker(vocab_size=vs)
    adaptive_wm  = AdaptiveKGWWatermarker(vocab_size=vs, base_delta=DELTA,
                                           gamma=GAMMA, entropy_weight=2.0)
    # Ensemble = KGW + Crypto  (two independent keyed layers)
    ensemble_wm  = EnsembleWatermarker(kgw_wm, crypto_wm)
    stylometric_wm = StylometricWatermarker()

    return {
        "KGW":          kgw_wm,
        "SEMANTIC":     semantic_wm,
        "CRYPTO":       crypto_wm,
        "EXPONENTIAL":  exp_wm,
        "ADAPTIVE_KGW": adaptive_wm,
        "ENSEMBLE":     ensemble_wm,
        "STYLOMETRIC":  stylometric_wm,
    }


_watermarkers: dict = {}


def _get_watermarkers() -> dict:
    global _watermarkers
    if not _watermarkers and tokenizer is not None:
        _watermarkers = _build_watermarkers()
    return _watermarkers


# =============================================================================
# /generate  –  Standard streaming generation for the Go Backend
#               DO NOT modify this endpoint.
# =============================================================================
@app.route("/generate", methods=["POST"])
def generate():
    """Standard streaming generation for Go Backend — unchanged."""
    global stop_flag
    if model is None:
        return json.dumps({"error": "Model not loaded"}), 503

    data       = request.json
    prompt     = data.get("prompt", "")
    max_tokens = int(data.get("max_tokens", 512))

    print(f"[*] /generate — max_tokens={max_tokens}, lock={gen_lock.locked()}")

    def generate_streaming():
        global stop_flag
        stop_flag = True

        with gen_lock:
            stop_flag = False
            print(f"[*] Starting generation for: {prompt[:50]}…")

            max_context = 2048
            inputs      = tokenizer(prompt, return_tensors="pt").to(model.device)
            input_len   = inputs.input_ids.shape[1]

            if input_len > max_context:
                print(f"[!] Prompt too long ({input_len}). Truncating…")
                inputs.input_ids = inputs.input_ids[:, -max_context:]
                if "attention_mask" in inputs:
                    inputs.attention_mask = \
                        inputs.attention_mask[:, -max_context:]

            streamer          = TextIteratorStreamer(tokenizer,
                                                     skip_prompt=True,
                                                     skip_special_tokens=True)
            stopping_criteria = StoppingCriteriaList([StopOnSignal()])

            generation_kwargs = dict(
                input_ids=inputs.input_ids,
                attention_mask=inputs.attention_mask
                    if "attention_mask" in inputs else None,
                streamer=streamer,
                max_new_tokens=max_tokens,
                do_sample=True,
                temperature=0.7,
                stopping_criteria=stopping_criteria,
            )

            thread = Thread(target=model.generate, kwargs=generation_kwargs)
            thread.start()

            try:
                t0 = time.time()
                tokens_generated = 0
                for new_text in streamer:
                    if stop_flag:
                        print("[!] Generation interrupted.")
                        break
                    if new_text:
                        tokens_generated += 1
                        yield json.dumps({"response": new_text}) + "\n"
                
                elapsed = time.time() - t0
                if elapsed > 0:
                    print(f"[+] Generated approximately {tokens_generated} chunks in {elapsed:.1f}s "
                          f"({tokens_generated/elapsed:.1f} chunks/s)")
            except Exception as e:
                print(f"[!] Streamer error: {e}")
            finally:
                stop_flag = True
                print("[*] Stream sequence finished.")

    return Response(stream_with_context(generate_streaming()),
                    mimetype="application/x-ndjson")


# =============================================================================
# Watermark LogitsProcessor  –  bridges algorithm objects into HF's pipeline
# =============================================================================
from transformers import LogitsProcessor, LogitsProcessorList  # noqa: E402

class WatermarkLogitsProcessor(LogitsProcessor):
    """
    Wraps any of our watermarker objects into a HuggingFace LogitsProcessor
    so that model.generate() can use KV-cache while still applying our
    per-token watermark biases.

    This is the key fix: instead of calling model(full_input_ids) 150× in a
    loop (O(n²) attention, no cache), we hook into model.generate()'s internal
    loop which reuses the past_key_values cache — O(n) total work.
    """
    def __init__(self, approach: str, watermarkers: dict,
                 secret: str, gamma: float, temperature: float):
        self.approach      = approach
        self.wm            = watermarkers
        self.secret        = secret
        self.gamma         = gamma
        self.temperature   = temperature

    def __call__(self, input_ids: torch.LongTensor,
                 scores: torch.FloatTensor) -> torch.FloatTensor:
        prev_token_id = input_ids[0, -1].item()

        if self.approach == "SEMANTIC":
            scores, _ = self.wm["SEMANTIC"].apply_bias(
                scores, prev_token_id, self.secret, self.gamma
            )
        elif self.approach == "CRYPTO":
            scores, _ = self.wm["CRYPTO"].apply_bias(
                scores, prev_token_id, self.secret, self.gamma
            )
        elif self.approach == "EXPONENTIAL":
            scores = self.wm["EXPONENTIAL"].apply_bias(
                scores, prev_token_id, self.secret
            )
        elif self.approach == "ADAPTIVE_KGW":
            scores = self.wm["ADAPTIVE_KGW"].apply_bias(
                scores, prev_token_id, self.secret, self.gamma
            )
        elif self.approach == "ENSEMBLE":
            scores = self.wm["ENSEMBLE"].apply_bias(
                scores, prev_token_id, self.secret, self.gamma
            )
        elif self.approach == "STYLOMETRIC":
            pass  # post-hoc rewriter — no logit modification
        else:
            # Default: KGW
            scores = self.wm["KGW"].apply_bias(
                scores, prev_token_id, self.secret, self.gamma
            )
        return scores


# =============================================================================
# /generate_watermarked  –  Multi-algorithm watermarked generation
# =============================================================================
@app.route("/generate_watermarked", methods=["POST"])
def generate_watermarked():
    """
    Watermarked text generation using model.generate() + KV-cache.

    Request body (JSON)
    -------------------
    prompt      : str   – user prompt
    max_tokens  : int   – tokens to generate         (default 50)
    temperature : float – sampling temperature        (default 0.7)
    secret      : str   – watermark secret key
    green_ratio : float – γ: green-list fraction      (default 0.5)
    approach    : str   – one of KGW | SEMANTIC | CRYPTO | EXPONENTIAL |
                          ADAPTIVE_KGW | ENSEMBLE | STYLOMETRIC

    Response (JSON)
    ---------------
    generated_text : str
    tokens         : list[int]
    approach       : str
    """
    if model is None:
        return json.dumps({"error": "Model not loaded"}), 503

    data           = request.json
    prompt         = data.get("prompt", "")
    max_tokens     = int(data.get("max_tokens", 50))
    temperature    = float(data.get("temperature", 0.7))
    current_secret = data.get("secret", SECRET_KEY)
    current_gamma  = float(data.get("green_ratio", GAMMA))
    approach       = data.get("approach", "KGW").upper()

    wm = _get_watermarkers()

    t0 = time.time()
    print(f"[*] /generate_watermarked — approach={approach} max_tokens={max_tokens}")

    # ── Build chat-formatted prompt ─────────────────────────────────────────
    chat             = [{"role": "user", "content": prompt}]
    formatted_prompt = tokenizer.apply_chat_template(
        chat, tokenize=False, add_generation_prompt=True
    )

    inputs    = tokenizer(formatted_prompt, return_tensors="pt").to(model.device)
    input_len = inputs["input_ids"].shape[1]

    # ── Build LogitsProcessor list ──────────────────────────────────────────
    # Stylometric doesn't need a logits processor (post-hoc text rewriter).
    logits_processors = []
    if approach != "STYLOMETRIC":
        logits_processors.append(
            WatermarkLogitsProcessor(
                approach=approach, watermarkers=wm,
                secret=current_secret, gamma=current_gamma,
                temperature=temperature,
            )
        )

    # ── Efficient generation via model.generate() with KV-cache ─────────────
    # This is 20-50× faster than the old manual loop because:
    #   1. The transformer's past_key_values cache is reused each step
    #   2. Each forward pass only processes ONE new token, not the full sequence
    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            do_sample=(temperature > 0),
            temperature=temperature if temperature > 0 else 1.0,
            logits_processor=LogitsProcessorList(logits_processors),
            pad_token_id=tokenizer.eos_token_id,
        )

    # Slice off the prompt tokens to get only what was generated
    generated_token_ids = output_ids[0][input_len:].tolist()
    generated_text      = tokenizer.decode(generated_token_ids,
                                           skip_special_tokens=True)

    # ── Post-hoc Stylometric rewriting ──────────────────────────────────────
    if approach == "STYLOMETRIC":
        generated_text = wm["STYLOMETRIC"].apply(generated_text, current_secret)

    elapsed = time.time() - t0
    print(f"[+] Generated {len(generated_token_ids)} tokens in {elapsed:.1f}s "
          f"({len(generated_token_ids)/elapsed:.1f} tok/s)")

    return json.dumps({
        "generated_text": generated_text,
        "tokens":         generated_token_ids,
        "approach":       approach,
    })


# =============================================================================
# /detect  –  Multi-algorithm watermark detection
# =============================================================================
@app.route("/detect", methods=["POST"])
def detect():
    """
    Watermark detection endpoint.

    Request body (JSON)
    -------------------
    text        : str
    secret      : str
    green_ratio : float – γ  (default 0.5)
    approach    : str   – same values as /generate_watermarked

    Response (JSON)
    ---------------
    z_score      : float
    decision     : "WATERMARKED" | "CLEAN"
    confidence   : float [0,1]
    token_flags  : list[bool]
    token_words  : list[str]
    score        : float   – raw score (z_score for statistical, ratio for stylometric)
    approach     : str
    """
    if tokenizer is None:
        return json.dumps({"error": "Model not loaded"}), 503

    data           = request.json
    text           = data.get("text", "")
    current_secret = data.get("secret", SECRET_KEY)
    current_gamma  = data.get("green_ratio", GAMMA)
    approach       = data.get("approach", "KGW").upper()

    wm             = _get_watermarkers()

    # ── Stylometric detection (text-level, no tokenization needed) ───────────
    if approach == "STYLOMETRIC":
        score    = wm["STYLOMETRIC"].detect(text, current_secret)
        decision = "WATERMARKED" if score >= 0.6 else "CLEAN"
        return json.dumps({
            "z_score":     round(score * 10, 4),   # mapped for UI compatibility
            "decision":    decision,
            "confidence":  round(score, 6),
            "token_flags": [],
            "token_words": [],
            "score":       round(score, 6),
            "approach":    approach,
        })

    # ── Token-level detection for all green-list approaches ──────────────────
    tokens = tokenizer.encode(text, add_special_tokens=False)
    if len(tokens) < 2:
        return json.dumps({
            "z_score": 0.0, "decision": "CLEAN", "confidence": 0.5,
            "token_flags": [], "token_words": [], "score": 0.0,
            "approach": approach,
        })

    green_count  = 0
    token_flags  = [False] * len(tokens)
    token_words  = [tokenizer.decode([t]) for t in tokens]

    for i in range(1, len(tokens)):
        prev_token    = tokens[i - 1]
        current_token = tokens[i]

        if approach == "SEMANTIC":
            # Run apply_bias on a zero tensor to retrieve the green set
            dummy, g_set = wm["SEMANTIC"].apply_bias(
                torch.zeros((1, tokenizer.vocab_size)),
                prev_token, current_secret, current_gamma
            )
            green_set = g_set

        elif approach == "CRYPTO":
            green_set = wm["CRYPTO"].get_green_set(
                prev_token, current_secret, current_gamma
            )

        elif approach == "EXPONENTIAL":
            # Gumbel detection: flag tokens whose noise value exceeds the
            # (1-gamma) quantile, mirroring generation-time selection bias.
            noise = wm["EXPONENTIAL"].get_noise(prev_token, current_secret, "cpu")
            sorted_noise, _ = torch.sort(noise)
            threshold_idx   = int(tokenizer.vocab_size * (1 - current_gamma))
            threshold       = sorted_noise[threshold_idx].item()
            if noise[current_token].item() >= threshold:
                green_count    += 1
                token_flags[i]  = True
            continue   # skip generic green_set block below

        elif approach == "ADAPTIVE_KGW":
            green_set = wm["ADAPTIVE_KGW"].get_green_set(
                prev_token, current_secret, current_gamma
            )

        elif approach == "ENSEMBLE":
            green_set = wm["ENSEMBLE"].get_green_set(
                prev_token, current_secret, current_gamma
            )

        else:
            # Default: KGW  —  MUST use wm["KGW"].get_green_set() so the seed
            # format ("secret-kgw-prevtoken") exactly matches KGWWatermarker.apply_bias().
            # The legacy get_green_list() uses a DIFFERENT seed ("secret-prevtoken")
            # which produces a completely wrong green list → forensics fails.
            green_set = wm["KGW"].get_green_set(
                prev_token, current_secret, current_gamma
            )

        if current_token in green_set:
            green_count    += 1
            token_flags[i]  = True

    z_score    = calculate_z_score(green_count, len(tokens) - 1, current_gamma)
    confidence = 0.5 * (1 + math.erf(z_score / math.sqrt(2)))
    decision   = "WATERMARKED" if z_score > 3.0 else "CLEAN"

    return json.dumps({
        "z_score":     round(z_score, 4),
        "decision":    decision,
        "confidence":  round(confidence, 6),
        "token_flags": token_flags,
        "token_words": token_words,
        "score":       round(z_score, 4),
        "approach":    approach,
    })


# =============================================================================
# /algorithms  –  List all supported watermarking algorithms
# =============================================================================
@app.route("/algorithms", methods=["GET"])
def list_algorithms():
    """
    Returns metadata for every supported watermarking algorithm so the
    frontend can populate its algorithm picker without hard-coding strings.
    """
    algorithms = [
        {
            "id":          "KGW",
            "name":        "KGW (Kirchenbauer et al.)",
            "type":        "logit-bias",
            "description": (
                "SHA-256 keyed green-list.  Boosts the logits of a deterministic "
                "50% subset of the vocabulary.  The partition is conditioned on "
                "both the previous token and the secret key."
            ),
            "detectable": True,
            "distortion":  "Low",
            "robustness":  "Medium",
        },
        {
            "id":          "SEMANTIC",
            "name":        "Semantic (Hash-Seeded)",
            "type":        "logit-bias",
            "description": (
                "Key-less, fast multiplicative-hash green-list.  Partitions the "
                "vocabulary based solely on the previous token ID.  Lower security "
                "than KGW but effectively zero overhead."
            ),
            "detectable": True,
            "distortion":  "Low",
            "robustness":  "Low",
        },
        {
            "id":          "CRYPTO",
            "name":        "Crypto (HMAC-SHA256)",
            "type":        "logit-bias",
            "description": (
                "HMAC-SHA256 keyed green-list.  Cryptographically stronger than "
                "KGW; the partition is indistinguishable without the secret key, "
                "resisting vocabulary-mapping attacks."
            ),
            "detectable": True,
            "distortion":  "Low",
            "robustness":  "High",
        },
        {
            "id":          "EXPONENTIAL",
            "name":        "Exponential (Distortion-Free)",
            "type":        "logit-bias",
            "description": (
                "Aaronson-style Gumbel-Max trick.  All token logits are shifted "
                "by a secret-seeded Gumbel noise vector.  Statistically distortion-"
                "free: the marginal output distribution is identical to the "
                "unwatermarked model."
            ),
            "detectable": True,
            "distortion":  "None",
            "robustness":  "High",
        },
        {
            "id":          "ADAPTIVE_KGW",
            "name":        "Adaptive KGW (Entropy-Aware)",
            "type":        "logit-bias",
            "description": (
                "Extends KGW with an entropy-scaled delta.  At high-entropy "
                "(uncertain) positions the bias is amplified for a stronger "
                "signal; at low-entropy (confident) positions it is reduced "
                "to preserve text quality."
            ),
            "detectable": True,
            "distortion":  "Very Low",
            "robustness":  "High",
        },
        {
            "id":          "ENSEMBLE",
            "name":        "Ensemble (KGW + Crypto)",
            "type":        "logit-bias",
            "description": (
                "Stacks KGW and CRYPTO biases sequentially.  Provides dual-layer "
                "watermarking: the statistical KGW layer is detectable without the "
                "key while the CRYPTO layer adds cryptographic attribution."
            ),
            "detectable": True,
            "distortion":  "Medium",
            "robustness":  "Very High",
        },
        {
            "id":          "STYLOMETRIC",
            "name":        "Stylometric (Sentence-Structure)",
            "type":        "post-hoc",
            "description": (
                "Text-level, post-generation watermark.  Rewrites each sentence "
                "according to an HMAC-seeded rule: short  (≤10 words), long  "
                "(≥22 words), or comma-structure.  Does not alter logits; "
                "detection is purely structural."
            ),
            "detectable":  True,
            "distortion":  "Medium",
            "robustness":  "Medium",
        },
    ]
    return json.dumps({"algorithms": algorithms, "count": len(algorithms)})


# =============================================================================
# /health — unchanged
# =============================================================================
@app.route("/health", methods=["GET"])
def health():
    return json.dumps({
        "status": "ready" if model else "loading",
        "model":  MODEL_ID,
    })


# =============================================================================
# Entry Point
# =============================================================================
if __name__ == "__main__":
    load_model()
    port = int(os.environ.get("INFERENCE_PORT", 8083))
    app.run(host="0.0.0.0", port=port, threaded=True)
