from pathlib import Path
from typing import Dict
import pypdf
from docx import Document

def load_pdf(file_path: Path) -> str:
    text = ""
    with open(file_path, 'rb') as f:
        pdf = pypdf.PdfReader(f)
        for page in pdf.pages:
            text += page.extract_text()
    return text

def load_txt(file_path: Path) -> str:
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def load_docx(file_path: Path) -> str:
    doc = Document(file_path)
    return '\n'.join([para.text for para in doc.paragraphs])

def load_document(file_path: Path) -> str:
    suffix = file_path.suffix.lower()
    if suffix == '.pdf':
        return load_pdf(file_path)
    elif suffix == '.txt':
        return load_txt(file_path)
    elif suffix == '.docx':
        return load_docx(file_path)
    else:
        raise ValueError(f"Unsupported file type: {suffix}")
