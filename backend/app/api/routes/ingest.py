from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.models.response_models import IngestResponse
from app.services.document_service import document_service

router = APIRouter()

@router.post("/ingest", response_model=IngestResponse)
async def ingest_documents(files: List[UploadFile] = File(...)):
    try:
        processed_files = await document_service.ingest_files(files)
        return IngestResponse(
            message=f"Successfully processed {len(processed_files)} files",
            files_processed=processed_files
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
