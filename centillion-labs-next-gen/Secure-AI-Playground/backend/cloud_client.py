import os
import json
import logging
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CloudClient")

class CloudClient:
    """
    Client for Cloud-based LLMs (Gemini, Groq, xAI) with streaming and fallback.
    """
    def __init__(self):
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY")
        self.groq_api_key = os.environ.get("GROQ_API_KEY")
        self.xai_api_key = os.environ.get("XAI_API_KEY")
        
        # Models
        self.gemini_model = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash")
        self.groq_model = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")
        self.xai_model = os.environ.get("XAI_MODEL", "grok-beta")

    def generate_stream(self, prompt, max_tokens=512, model_preference=""):
        """
        Attempts to generate a response via cloud APIs with fallback logic.
        Order: Priority Model (if specified) -> Gemini -> Groq -> xAI (Grok)
        """
        
        # Determine priority order
        order = []
        pref_lower = model_preference.lower()
        
        if "gemini" in pref_lower or "google" in pref_lower:
            order = ["gemini", "groq", "xai"]
        elif "grok" in pref_lower or "xai" in pref_lower or "groq" in pref_lower:
            # We try Groq first as it's often faster than xAI, but xAI is the "real" Grok
            if "xai" in pref_lower or (pref_lower == "grok"):
                order = ["xai", "groq", "gemini"]
            else:
                order = ["groq", "xai", "gemini"]
        else:
            # Default order
            order = ["gemini", "groq", "xai"]

        for provider in order:
            if provider == "gemini" and self.gemini_api_key:
                logger.info(f"Targeting Gemini ({self.gemini_model})...")
                try:
                    for chunk in self._stream_gemini(prompt, max_tokens):
                        yield chunk
                    return
                except Exception as e:
                    logger.error(f"Gemini API failed: {e}")

            elif provider == "groq" and self.groq_api_key:
                logger.info(f"Targeting Groq ({self.groq_model})...")
                try:
                    for chunk in self._stream_groq(prompt, max_tokens):
                        yield chunk
                    return
                except Exception as e:
                    logger.error(f"Groq API failed: {e}")

            elif provider == "xai" and self.xai_api_key:
                logger.info(f"Targeting xAI ({self.xai_model})...")
                try:
                    for chunk in self._stream_xai(prompt, max_tokens):
                        yield chunk
                    return
                except Exception as e:
                    logger.error(f"xAI API failed: {e}")

        # If we reach here, all have failed or were not configured
        if not any([self.gemini_api_key, self.groq_api_key, self.xai_api_key]):
            yield json.dumps({"error": "No Cloud API keys configured. Set GEMINI_API_KEY, GROQ_API_KEY, or XAI_API_KEY."}) + "\n"
        else:
            yield json.dumps({"error": "All configured Cloud LLM fallback options failed."}) + "\n"

    def _stream_gemini(self, prompt, max_tokens):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.gemini_model}:streamGenerateContent?key={self.gemini_api_key}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "maxOutputTokens": max_tokens,
                "temperature": 0.7
            }
        }
        
        response = requests.post(url, json=payload, stream=True, timeout=60)
        response.raise_for_status()
        
        # Gemini's stream format is a bit unique; we'll attempt to parse the chunks
        for line in response.iter_lines():
            if not line: continue
            decoded = line.decode('utf-8')
            
            # Gemini stream can send multiple segments in one line or split them
            # Typically looks like:  "  { \"candidates\": [...] },"
            clean_line = decoded.strip()
            if clean_line.startswith("["): clean_line = clean_line[1:]
            if clean_line.endswith(","): clean_line = clean_line[:-1]
            if clean_line.endswith("]"): clean_line = clean_line[:-1]
            
            if not clean_line: continue
            
            try:
                data = json.loads(clean_line)
                if "candidates" in data and len(data["candidates"]) > 0:
                    cand = data["candidates"][0]
                    if "content" in cand and "parts" in cand["content"]:
                        text = cand["content"]["parts"][0].get("text", "")
                        if text:
                            yield json.dumps({"response": text}) + "\n"
            except:
                continue

    def _stream_groq(self, prompt, max_tokens):
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.groq_model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "stream": True
        }
        return self._stream_openai_compatible(url, headers, payload)

    def _stream_xai(self, prompt, max_tokens):
        url = "https://api.x.ai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.xai_api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.xai_model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "stream": True
        }
        return self._stream_openai_compatible(url, headers, payload)

    def _stream_openai_compatible(self, url, headers, payload):
        response = requests.post(url, headers=headers, json=payload, stream=True, timeout=60)
        response.raise_for_status()
        
        for line in response.iter_lines():
            if not line: continue
            decoded = line.decode('utf-8')
            if decoded.startswith("data: "):
                data_str = decoded[6:].strip()
                if data_str == "[DONE]": break
                try:
                    data = json.loads(data_str)
                    delta = data["choices"][0].get("delta", {})
                    if "content" in delta:
                        yield json.dumps({"response": delta["content"]}) + "\n"
                except:
                    continue
