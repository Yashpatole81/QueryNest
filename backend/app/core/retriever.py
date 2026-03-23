from typing import List, Tuple
from app.core.embeddings import embedding_model
from app.services.vector_store import vector_store
from app.config.settings import settings

class Retriever:
    def retrieve(self, query: str, top_k: int = None) -> Tuple[List[str], List[float], List[str]]:
        top_k = top_k or settings.TOP_K
        
        query_embedding = embedding_model.encode_single(query)
        chunks, scores, sources = vector_store.search(query_embedding, top_k)
        
        return chunks, scores, sources

retriever = Retriever()
