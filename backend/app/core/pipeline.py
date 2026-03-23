from typing import Tuple, List
from app.core.retriever import retriever
from app.core.generator import generator
from app.services.llm_service import llm_service

class RAGPipeline:
    def query(self, query: str) -> Tuple[str, List[str]]:
        chunks, scores, sources = retriever.retrieve(query)
        
        if not chunks:
            return "No relevant documents found. Please ingest documents first.", []
        
        answer = generator.generate(query, chunks)
        unique_sources = list(set(sources))
        
        return answer, unique_sources
    
    def debug_query(self, query: str) -> dict:
        chunks, scores, sources = retriever.retrieve(query)
        
        if not chunks:
            return {
                "query": query,
                "retrieved_chunks": [],
                "scores": [],
                "sources": [],
                "final_prompt": "",
                "llm_response": "No documents found"
            }
        
        context = "\n\n".join(chunks)
        final_prompt = llm_service.build_prompt(query, context)
        llm_response = generator.generate(query, chunks)
        
        return {
            "query": query,
            "retrieved_chunks": chunks,
            "scores": scores,
            "sources": sources,
            "final_prompt": final_prompt,
            "llm_response": llm_response
        }

rag_pipeline = RAGPipeline()
