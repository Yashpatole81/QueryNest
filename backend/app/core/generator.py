from typing import List
from app.services.llm_service import llm_service

class Generator:
    def generate(self, query: str, chunks: List[str]) -> str:
        context = "\n\n".join(chunks)
        answer = llm_service.generate(query, context)
        return answer

generator = Generator()
