from pydantic import BaseModel
from typing import List, Optional

class QueryRequest(BaseModel):
    query: str
    pipeline: Optional[str] = "explainer"

class DebugRequest(BaseModel):
    query: str
