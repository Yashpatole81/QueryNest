# Git Setup for QueryNest

## ✅ Completed Tasks

1. **Created `.gitignore`** with:
   - Python cache files (`__pycache__/`, `*.pyc`, `*.pyo`)
   - Node modules (`node_modules/`)
   - Virtual environments (`.venv/`, `venv/`)
   - Environment files (`.env`)
   - IDE files (`.vscode/`, `.idea/`)
   - Data directories (but keeping structure with `.gitkeep`)
   - Log files
   - OS-specific files (`.DS_Store`, `Thumbs.db`)

2. **Removed all `__pycache__` directories** from the project

3. **Added `.gitkeep` files** to preserve directory structure:
   - `backend/data/raw_docs/.gitkeep`
   - `backend/data/processed_chunks/.gitkeep`
   - `backend/data/faiss_index/.gitkeep`

## 🚀 Initialize Git Repository

If you haven't already initialized git:

```bash
cd ~/intel_hackathon/QueryNest

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: QueryNest CPU-Optimized RAG Backend"
```

## 📤 Push to GitHub

```bash
# Add remote repository
git remote add origin <your-github-repo-url>

# Push to main branch
git branch -M main
git push -u origin main
```

## 🔍 Verify What's Ignored

```bash
# Check git status
git status

# See what's being ignored
git status --ignored
```

## 📋 What Gets Committed

✅ **Included in Git**:
- All source code (`app/`)
- Configuration files (`requirements.txt`, `.env.example`)
- Documentation (`README.md`, `QUICKSTART.md`, etc.)
- Empty data directories (via `.gitkeep`)

❌ **Excluded from Git**:
- `__pycache__/` and `*.pyc` files
- `.venv/` virtual environment
- `node_modules/` (for frontend)
- `.env` (sensitive environment variables)
- Uploaded documents in `data/raw_docs/`
- Generated FAISS index in `data/faiss_index/`
- Log files

## 🔐 Environment Variables

Create a `.env.example` for team members:

```bash
# Copy your .env but remove sensitive values
cp backend/.env backend/.env.example

# Edit .env.example to have placeholder values
# Then commit .env.example (but NOT .env)
git add backend/.env.example
git commit -m "Add environment variables template"
```

## 🧹 Clean Cache Anytime

If `__pycache__` directories appear again:

```bash
# Windows
for /d /r . %d in (__pycache__) do @if exist "%d" rd /s /q "%d"

# Linux/Mac
find . -type d -name "__pycache__" -exec rm -rf {} +

# Or use Python
python -Bc "import pathlib; [p.rmdir() for p in pathlib.Path('.').rglob('__pycache__')]"
```

## 📝 Useful Git Commands

```bash
# Check what's being tracked
git ls-files

# Check what's being ignored
git status --ignored

# Remove file from git but keep locally
git rm --cached <file>

# Update .gitignore and clean cache
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

## 🎯 Ready for Hackathon!

Your repository is now clean and ready to:
- Share with team members
- Push to GitHub
- Deploy to production
- Present to judges

All sensitive data and cache files are properly ignored! 🚀
