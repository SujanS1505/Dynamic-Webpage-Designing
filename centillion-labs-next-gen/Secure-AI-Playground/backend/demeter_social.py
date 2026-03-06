import requests
import json
import os
import logging
from typing import Dict, Any, List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DemeterSocial")

class DemeterSocialAnalyzer:
    """
    The Goddess of the Harvest and Growth.
    Handles LinkedIn scraping and cognitive analysis.
    """
    def __init__(self):
        self.scraper_key = os.environ.get("SCRAPERTABLE_API_KEY")
        self.groq_api_key = os.environ.get("GROQ_API_KEY")
        self.aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
        self.aws_secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
        self.aws_region = os.environ.get("AWS_REGION", "us-east-1")
        self.mistral_model_id = os.environ.get("MISTRAL_MODEL_ID", "mistral.mistral-7b-instruct-v0:2")

    def scrape_linkedin(self, profile_url: str) -> Dict[str, Any]:
        if not self.scraper_key:
            return {"error": "SCRAPERTABLE_API_KEY is missing"}
            
        url = "https://v3.scrapetable.com/linkedin/people"
        params = {
            "key": self.scraper_key,
            "profileUrl": profile_url,
            "includeRecentActivity": "true",
            "includePosts": "true"
        }
        
        try:
            response = requests.get(url, params=params, timeout=180)
            response.raise_for_status()
            data = response.json()
            if not data.get("success"):
                return {"error": data.get("message", "Scrape failed")}
            return data.get("person", {})
        except Exception as e:
            logger.error(f"Scraping error: {e}")
            return {"error": str(e)}

    def analyze_with_groq(self, scraped_data: Dict[str, Any], post_content: str = None) -> str:
        if not self.groq_api_key:
            return "Analysis feature pending Groq API key."

        data_str = json.dumps(scraped_data)
        
        if post_content:
            prompt = self._build_combined_prompt(data_str, post_content)
        else:
            prompt = self._build_profile_prompt(data_str)

        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}]
        }
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.groq_api_key}"
        }

        try:
            response = requests.post("https://api.groq.com/openai/v1/chat/completions", 
                                     headers=headers, json=payload, timeout=60)
            response.raise_for_status()
            res_data = response.json()
            return res_data["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Groq analysis error: {e}")
            return f"Analysis failed: {e}"

    def _build_profile_prompt(self, data_str):
        return f"""### ROLE: FORENSIC AI JUDGE & COGNITIVE ANALYST
Analyze the person's professional authenticity and cognitive patterns.
DATA: {data_str}"""

    def _build_combined_prompt(self, data_str, post_content):
        return f"""### ROLE: FORENSIC AI JUDGE & COGNITIVE ANALYST
Analyze this post contextually against the author's profile.
PROFILE: {data_str}
POST: {post_content}"""

    # --- Deep Pipeline Stubs ---
    def deep_analyze(self, url, post_content):
        # Implementation of multi-agent pipeline would go here
        logger.info(f"Starting deep analysis for {url}")
        return {"status": "Analysis in progress", "url": url}
