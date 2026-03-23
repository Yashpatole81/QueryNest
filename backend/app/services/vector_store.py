import faiss
import numpy as np
import json
from typing import List, Tuple, Dict
from pathlib import Path
from app.config.constants import FAISS_INDEX_PATH, METADATA_PATH
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class VectorStore:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.index = None
            cls._instance.metadata = []
            cls._instance.load()
        return cls._instance
    
    def load(self):
        if FAISS_INDEX_PATH.exists():
            logger.info("Loading existing FAISS index")
            self.index = faiss.read_index(str(FAISS_INDEX_PATH))
            with open(METADATA_PATH, 'r') as f:
                self.metadata = json.load(f)
            logger.info(f"Loaded {self.index.ntotal} vectors")
        else:
            logger.info("No existing index found")
    
    def create_index(self, dimension: int):
        self.index = faiss.IndexFlatL2(dimension)
        self.metadata = []
        logger.info(f"Created new FAISS index with dimension {dimension}")
    
    def add_vectors(self, embeddings: np.ndarray, chunks: List[str], source_files: List[str]):
        if self.index is None:
            self.create_index(embeddings.shape[1])
        
        self.index.add(embeddings.astype('float32'))
        
        for chunk, source in zip(chunks, source_files):
            self.metadata.append({"chunk": chunk, "source": source})
        
        logger.info(f"Added {len(chunks)} vectors to index")
    
    def search(self, query_embedding: np.ndarray, top_k: int) -> Tuple[List[str], List[float], List[str]]:
        if self.index is None or self.index.ntotal == 0:
            return [], [], []
        
        query_embedding = query_embedding.reshape(1, -1).astype('float32')
        distances, indices = self.index.search(query_embedding, min(top_k, self.index.ntotal))
        
        chunks = [self.metadata[i]["chunk"] for i in indices[0]]
        scores = [1 / (1 + float(d)) for d in distances[0]]
        sources = [self.metadata[i]["source"] for i in indices[0]]
        
        return chunks, scores, sources
    
    def save(self):
        FAISS_INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
        faiss.write_index(self.index, str(FAISS_INDEX_PATH))
        with open(METADATA_PATH, 'w') as f:
            json.dump(self.metadata, f)
        logger.info("Saved FAISS index and metadata")

vector_store = VectorStore()
