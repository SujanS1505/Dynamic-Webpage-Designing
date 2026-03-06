import requests
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ApolloClient")

class ApolloClient:
    """
    Singleton/Service Pattern: Communicates with the local inference server.
    
    The God of Light and Communication.
    """
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(ApolloClient, cls).__new__(cls)
        return cls._instance

    def __init__(self, base_url="http://127.0.0.1:8083"):
        # Ensure init only runs once for singleton
        if hasattr(self, '_initialized'):
            return
        self.base_url = base_url
        self._initialized = True

    def generate_stream(self, prompt, max_tokens=512):
        url = f"{self.base_url}/generate"
        payload = {
            "prompt": prompt,
            "max_tokens": max_tokens
        }
        
        logger.info(f"Calling inference server: {url}")
        
        try:
            response = requests.post(url, json=payload, stream=True, timeout=180)
            response.raise_for_status()
            
            for line in response.iter_lines():
                if line:
                    yield line.decode('utf-8') + '\n'
                    
        except requests.exceptions.RequestException as e:
            logger.error(f"Inference error: {e}")
            yield json.dumps({"error": str(e)}) + '\n'
