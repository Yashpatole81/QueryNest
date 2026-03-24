from sentence_transformers import SentenceTransformer
from typing import List
import numpy as np
import warnings
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class EmbeddingModel:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            logger.info(f"Loading embedding model: {settings.EMBEDDING_MODEL}")
            
            # Suppress position_ids warning
            with warnings.catch_warnings():
                warnings.filterwarnings("ignore", message=".*position_ids.*")
                cls._instance.model = SentenceTransformer(settings.EMBEDDING_MODEL)
            
            logger.info("Embedding model loaded successfully")
        return cls._instance
    
    def encode(self, texts: List[str]) -> np.ndarray:
        return self.model.encode(texts, convert_to_numpy=True)
    
    def encode_single(self, text: str) -> np.ndarray:
        return self.model.encode([text], convert_to_numpy=True)[0]

embedding_model = EmbeddingModel()
