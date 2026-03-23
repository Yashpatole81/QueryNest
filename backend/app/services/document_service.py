from pathlib import Path
from typing import List
from fastapi import UploadFile
from app.config.constants import RAW_DOCS_DIR
from app.utils.file_loader import load_document
from app.core.chunking import chunk_text
from app.core.embeddings import embedding_model
from app.services.vector_store import vector_store
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class DocumentService:
    async def ingest_files(self, files: List[UploadFile]) -> List[str]:
        RAW_DOCS_DIR.mkdir(parents=True, exist_ok=True)
        processed_files = []
        
        for file in files:
            file_path = RAW_DOCS_DIR / file.filename
            
            with open(file_path, 'wb') as f:
                content = await file.read()
                f.write(content)
            
            logger.info(f"Processing file: {file.filename}")
            
            text = load_document(file_path)
            chunks = chunk_text(text)
            
            logger.info(f"Generated {len(chunks)} chunks from {file.filename}")
            
            embeddings = embedding_model.encode(chunks)
            source_files = [file.filename] * len(chunks)
            
            vector_store.add_vectors(embeddings, chunks, source_files)
            processed_files.append(file.filename)
        
        vector_store.save()
        logger.info(f"Ingestion complete: {len(processed_files)} files processed")
        
        return processed_files

document_service = DocumentService()
