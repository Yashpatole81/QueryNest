import requests
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class LLMService:
    def __init__(self):
        self.api_url = settings.LLM_API_URL
        self.model_name = settings.MODEL_NAME
    
    def generate(self, query: str, context: str) -> str:
        prompt = f"""You are a helpful assistant. Answer ONLY from the context.

Context:
{context}

Question:
{query}"""
        
        payload = {
            "model": self.model_name,
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }
        
        headers = {"Content-Type": "application/json"}
        
        try:
            logger.info(f"Calling LLM API: {self.api_url}")
            response = requests.post(self.api_url, json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            answer = result['choices'][0]['message']['content']
            return answer
        except Exception as e:
            logger.error(f"LLM API error: {str(e)}")
            raise
    
    def build_prompt(self, query: str, context: str) -> str:
        return f"""You are a helpful assistant. Answer ONLY from the context.

Context:
{context}

Question:
{query}"""

llm_service = LLMService()
