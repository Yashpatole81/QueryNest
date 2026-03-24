#!/usr/bin/env python3
"""Test script to verify all imports work correctly"""

print("Testing imports...")

try:
    print("✓ Testing FastAPI...")
    from fastapi import FastAPI
    
    print("✓ Testing Pydantic...")
    from pydantic import BaseModel
    
    print("✓ Testing dotenv...")
    from dotenv import load_dotenv
    
    print("✓ Testing sentence-transformers...")
    from sentence_transformers import SentenceTransformer
    
    print("✓ Testing FAISS...")
    import faiss
    
    print("✓ Testing numpy...")
    import numpy as np
    
    print("✓ Testing requests...")
    import requests
    
    print("✓ Testing pypdf...")
    import pypdf
    
    print("✓ Testing docx...")
    from docx import Document
    
    print("\n✓ Testing app.config.settings...")
    from app.config.settings import settings
    print(f"  LLM_API_URL: {settings.LLM_API_URL}")
    print(f"  MODEL_NAME: {settings.MODEL_NAME}")
    print(f"  EMBEDDING_MODEL: {settings.EMBEDDING_MODEL}")
    print(f"  TOP_K: {settings.TOP_K}")
    
    print("\n✅ All imports successful!")
    
except Exception as e:
    print(f"\n❌ Import failed: {e}")
    import traceback
    traceback.print_exc()
