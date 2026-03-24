from typing import Tuple, List
from app.core.retriever import retriever
from app.core.generator import generator
from app.services.llm_service import llm_service
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class RAGPipeline:
    def query(self, query: str, pipeline: str = "explainer") -> Tuple[str, List[str]]:
        logger.info(f"Query received: '{query}' with pipeline mode: '{pipeline}'")
        
        if pipeline == "fast":
            return self._fast_mode(query)
        elif pipeline == "accurate":
            return self._accurate_mode(query)
        else:
            return self._explainer_mode(query)
    
    def _fast_mode(self, query: str) -> Tuple[str, List[str]]:
        """Direct LLM answer without FAISS search"""
        logger.info("Using FAST mode - Direct LLM without FAISS")
        
        payload = {
            "model": llm_service.model_name,
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": query}
            ],
            "temperature": 0.7,
            "max_tokens": 150
        }
        
        headers = {"Content-Type": "application/json"}
        
        try:
            import requests
            logger.info(f"Calling LLM API: {llm_service.api_url}")
            logger.info(f"Using model: {llm_service.model_name}")
            
            response = requests.post(llm_service.api_url, json=payload, headers=headers, timeout=60)
            response.raise_for_status()
            result = response.json()
            answer = result['choices'][0]['message']['content']
            
            logger.info(f"LLM response received successfully")
            return answer, []
        except Exception as e:
            logger.error(f"Fast mode error: {str(e)}")
            return f"Error: {str(e)}", []
    
    def _accurate_mode(self, query: str) -> Tuple[str, List[str]]:
        """Return FAISS chunks only without LLM generation"""
        logger.info("Using ACCURATE mode - FAISS chunks only")
        
        chunks, scores, sources = retriever.retrieve(query)
        logger.info(f"Retrieved {len(chunks)} chunks from FAISS")
        
        if not chunks:
            logger.warning("No chunks found in FAISS")
            return "No relevant documents found. Please ingest documents first.", []
        
        formatted_chunks = "\n\n---\n\n".join([f"Chunk {i+1} (Score: {scores[i]:.4f}):\n{chunk}" for i, chunk in enumerate(chunks)])
        unique_sources = list(set(sources))
        
        return formatted_chunks, unique_sources
    
    def _explainer_mode(self, query: str) -> Tuple[str, List[str]]:
        """FAISS search + LLM generation (original behavior)"""
        logger.info("Using EXPLAINER mode - FAISS + LLM")
        
        chunks, scores, sources = retriever.retrieve(query)
        logger.info(f"Retrieved {len(chunks)} chunks from FAISS")
        
        if not chunks:
            logger.warning("No chunks found in FAISS")
            return "No relevant documents found. Please ingest documents first.", []
        
        logger.info("Generating answer with LLM")
        answer = generator.generate(query, chunks)
        unique_sources = list(set(sources))
        
        logger.info("Explainer mode completed successfully")
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
