from app.config.constants import RAW_DOCS_DIR, PROCESSED_CHUNKS_DIR, FAISS_INDEX_DIR

def ensure_directories():
    """Ensure all required directories exist"""
    RAW_DOCS_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_CHUNKS_DIR.mkdir(parents=True, exist_ok=True)
    FAISS_INDEX_DIR.mkdir(parents=True, exist_ok=True)
