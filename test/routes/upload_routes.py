from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models.user import User
from models.pdf_session import PDFSession
from database.db import db
from utils.pdf_loader import extract_text
from utils.embeddings import create_embeddings
from utils.vector_store import save_vectors
from datetime import datetime, timedelta
import uuid
import os
upload_bp = Blueprint(
    "upload",
    __name__
)
TEMP_UPLOAD_FOLDER = "temp_uploads"
TEMP_VECTOR_FOLDER = "temp_vectors"
os.makedirs(TEMP_UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TEMP_VECTOR_FOLDER, exist_ok=True)
@upload_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_pdf():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({
                "error": "User not found"
            }), 404
        if "file" not in request.files:
            return jsonify({
                "error": "No file uploaded"
            }), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({
                "error": "Empty filename"
            }), 400
        if not file.filename.lower().endswith(".pdf"):
            return jsonify({
                "error": "Only PDF files allowed"
            }), 400
        unique_id = str(uuid.uuid4())
        safe_filename = secure_filename(
            file.filename
        )
        stored_filename = f"{unique_id}_{safe_filename}"
        pdf_path = os.path.join(
            TEMP_UPLOAD_FOLDER,
            stored_filename
        )
        file.save(pdf_path)
        text = extract_text(pdf_path)
        if not text.strip():
            return jsonify({
                "error": "Could not extract text from PDF"
            }), 400
        chunks = [
            text[i:i + 500]
            for i in range(0, len(text), 500)
        ]
        vectors = create_embeddings(chunks)
        vector_path = os.path.join(
            TEMP_VECTOR_FOLDER,
            unique_id
        )
        save_vectors(
            vectors,
            chunks,
            vector_path
        )
        expiry_hours = user.retention_hours()
        expires_at = datetime.utcnow() + timedelta(
            hours=expiry_hours
        )
        session = PDFSession(
            user_id=user.id,
            original_filename=safe_filename,
            stored_filename=stored_filename,
            vector_path=vector_path,
            expires_at=expires_at
        )
        db.session.add(session)
        db.session.commit()
        return jsonify({
            "message": "PDF uploaded successfully",
            "session_id": session.id,
            "expires_at": expires_at.isoformat(),
            "retention_hours": expiry_hours
        }), 201
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500