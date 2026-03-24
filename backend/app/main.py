from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health, ingest, query, debug
from app.utils.helpers import ensure_directories

app = FastAPI(
    title="QueryNest",
    description="CPU-Optimized RAG with Debugging",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    ensure_directories()

app.include_router(health.router, tags=["Health"])
app.include_router(ingest.router, tags=["Ingest"])
app.include_router(query.router, tags=["Query"])
app.include_router(debug.router, tags=["Debug"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to QueryNest - CPU-Optimized RAG with Debugging",
        "endpoints": {
            "health": "/health",
            "ingest": "/ingest",
            "query": "/query",
            "debug": "/debug"
        }
    }
