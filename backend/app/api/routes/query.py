from fastapi import APIRouter, HTTPException
from app.models.request_models import QueryRequest
from app.models.response_models import QueryResponse
from app.core.pipeline import rag_pipeline

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    try:
        answer, sources = rag_pipeline.query(request.query, request.pipeline)
        return QueryResponse(answer=answer, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
