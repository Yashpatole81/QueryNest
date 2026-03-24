from fastapi import APIRouter
from app.models.response_models import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="healthy", message="QueryNest backend is running")
