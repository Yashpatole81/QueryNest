from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    LLM_API_URL: str
    MODEL_NAME: str
    EMBEDDING_MODEL: str
    TOP_K: int
    CHUNK_SIZE: int
    CHUNK_OVERLAP: int
    
    class Config:
        env_file = ".env"

settings = Settings()
