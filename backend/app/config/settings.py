import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self):
        self.LLM_API_URL = os.getenv("LLM_API_URL", "http://wiphackxlw49hx.cloudloka.com:8000/v1/chat/completions")
        self.MODEL_NAME = os.getenv("MODEL_NAME", "qwen")
        self.EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
        self.TOP_K = int(os.getenv("TOP_K", "5"))
        self.CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "400"))
        self.CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "50"))

settings = Settings()
