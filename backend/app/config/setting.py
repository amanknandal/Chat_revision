import os
import secrets
from dotenv import load_dotenv
load_dotenv()
class Config:
    SQLALCHEMY_DATABASE_URI=os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:password@localhost/aipdf"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    JWT_SECRET_KEY=os.getenv(
        "JWT_SECRET_KEY",
        secrets.token_hex(32)
    )
    OLLAMA_URL=os.getenv(
        "OLLAMA_URL",
        "http://127.0.0.1:11434/api/generate"
    )
    OLLAMA_MODEL=os.getenv(
        "OLLAMA_MODEL",
        "qwen2.5:3b"
    )
    QDRANT_URL=os.getenv(
        "QDRANT_URL",
        "http://localhost:6333"
    )
    QDRANT_API_KEY=os.getenv(
        "QDRANT_API_KEY",
        ""
    )
    QDRANT_COLLECTION=os.getenv(
        "QDRANT_COLLECTION",
        "pdf_collection"
    )
    CLOUDINARY_CLOUD_NAME=os.getenv(
        "CLOUDINARY_CLOUD_NAME",
        ""
    )
    CLOUDINARY_API_KEY=os.getenv(
        "CLOUDINARY_API_KEY",
        ""
    )
    CLOUDINARY_API_SECRET=os.getenv(
        "CLOUDINARY_API_SECRET",
        ""
    )
    MAX_CONTENT_LENGTH=50*1024*1024