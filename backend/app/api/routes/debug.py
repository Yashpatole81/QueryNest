from fastapi import APIRouter, HTTPException
from app.models.request_models import DebugRequest
from app.models.response_models import DebugResponse
from app.core.pipeline import rag_pipeline

router = APIRouter()

@router.post("/debug", response_model=DebugResponse)
async def debug_query(request: DebugRequest):
    try:
        debug_info = rag_pipeline.debug_query(request.query)
        return DebugResponse(**debug_info)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
