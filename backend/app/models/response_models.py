from pydantic import BaseModel
from typing import List

class QueryResponse(BaseModel):
    answer: str
    sources: List[str]

class DebugResponse(BaseModel):
    query: str
    retrieved_chunks: List[str]
    scores: List[float]
    sources: List[str]
    final_prompt: str
    llm_response: str

class IngestResponse(BaseModel):
    message: str
    files_processed: List[str]

class HealthResponse(BaseModel):
    status: str
    message: str
