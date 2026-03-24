# QueryNest - CPU-Optimized RAG with Debugging

## 🎯 Overview
QueryNest is a FastAPI-based multi-document RAG (Retrieval-Augmented Generation) system optimized for CPU execution with a powerful RAG Debugger.

## ✨ Key Features
- ✅ Multi-document ingestion (PDF, TXT, DOCX)
- ✅ CPU-optimized embeddings and vector search
- ✅ Custom Qwen LLM integration
- ✅ **RAG Debugger** - View retrieved chunks, scores, prompts, and responses
- ✅ FAISS vector store for efficient retrieval
- ✅ Explainable AI with source tracking

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
Edit `.env` file with your settings (already configured for Qwen endpoint)

### 3. Run the Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

### Ingest Documents
```bash
POST /ingest
Content-Type: multipart/form-data

files: [file1.pdf, file2.txt, file3.docx]
```

### Query Documents
```bash
POST /query
Content-Type: application/json

{
  "query": "What is RAG?"
}

Response:
{
  "answer": "...",
  "sources": ["doc1.pdf", "doc2.txt"]
}
```

### Debug RAG Pipeline (🔥 Hackathon Feature)
```bash
POST /debug
Content-Type: application/json

{
  "query": "Explain the concept"
}

Response:
{
  "query": "...",
  "retrieved_chunks": ["chunk1", "chunk2", "chunk3"],
  "scores": [0.85, 0.78, 0.72],
  "sources": ["file1.pdf", "file2.txt"],
  "final_prompt": "You are a helpful assistant...",
  "llm_response": "Based on the context..."
}
```

## 🏗️ Architecture

```
Query → Embedding → FAISS Search → Top-K Chunks → LLM → Answer
```

## 🔧 Configuration

- **Chunk Size**: 400 tokens
- **Chunk Overlap**: 50 tokens
- **Embedding Model**: all-MiniLM-L6-v2
- **Vector Store**: FAISS (IndexFlatL2)
- **LLM**: Qwen (custom endpoint)
- **Top-K Retrieval**: 5 chunks

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config/              # Settings & constants
│   ├── api/routes/          # API endpoints
│   ├── core/                # RAG pipeline components
│   ├── services/            # Business logic
│   ├── models/              # Pydantic models
│   └── utils/               # Utilities
├── data/                    # Document storage
├── requirements.txt
└── .env
```

## 🎯 Hackathon Highlights

1. **RAG Debugger** - Complete transparency into the RAG pipeline
2. **Multi-Document Support** - Ingest and query across multiple documents
3. **CPU Optimized** - Runs efficiently without GPU
4. **Custom LLM Integration** - Qwen endpoint integration
5. **Explainability** - Source tracking and similarity scores

## 🧪 Testing

```bash
# Test health
curl http://localhost:8000/health

# Test ingest
curl -X POST http://localhost:8000/ingest \
  -F "files=@document.pdf"

# Test query
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is this about?"}'

# Test debug
curl -X POST http://localhost:8000/debug \
  -H "Content-Type: application/json" \
  -d '{"query": "Explain the main concept"}'
```

## 🔥 Performance Tips

- Use batch embedding for multiple documents
- Limit top_k to 3-5 for faster responses
- FAISS index is loaded once at startup (singleton pattern)
- Async FastAPI for concurrent requests

## 📝 License

