import os
import secrets
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:123@localhost/aipdf"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        secrets.token_hex(32)
    )
    OLLAMA_URL = os.getenv(
        "OLLAMA_URL",
        "http://127.0.0.1:11434/api/generate"
    )
    OLLAMA_MODEL = os.getenv(
        "OLLAMA_MODEL",
        "phi3:mini"
    )