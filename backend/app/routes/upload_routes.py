import os
import uuid
from datetime import datetime,timedelta
from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from werkzeug.utils import secure_filename
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.database.db import db
from app.models.user import User
from app.models.pdf_session import PDFSession
from app.rag.pdf_loader import extract_pdf_text
from app.rag.ocr_loader import extract_ocr_text
from app.rag.embeddings import create_embeddings
from app.rag.vector_store import create_collection
from app.rag.vector_store import store_vectors

upload_bp=Blueprint(
    "upload",
    __name__
)

@upload_bp.route(
    "/pdf",
    methods=["POST"]
)
@jwt_required()
def upload_pdf():
    try:
        user_id=get_jwt_identity()

        user=User.query.get(user_id)

        if not user:
            return jsonify({
                "error":"User not found"
            }),404

        if "file" not in request.files and "pdf" not in request.files:
            return jsonify({
                "error":"PDF file required"
            }),400

        file = request.files.get("file") or request.files.get("pdf")

        if not file or file.filename == "":
            return jsonify({
                "error":"Invalid filename"
            }),400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({
                "error":"Only PDF allowed"
            }),400

        unique_id=str(uuid.uuid4())

        safe_filename=secure_filename(
            file.filename
        )

        uploads_dir = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "..",
                "uploads"
            )
        )
        os.makedirs(uploads_dir, exist_ok=True)

        stored_filename = f"{unique_id}_{safe_filename}"
        pdf_path = os.path.join(uploads_dir, stored_filename)

        file.save(pdf_path)

        pages=extract_pdf_text(pdf_path)

        if len(pages)==0:
            pages=extract_ocr_text(pdf_path)

        if len(pages)==0:
            return jsonify({
                "error":"No readable text found"
            }),400

        splitter=RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

        chunks=[]
        metadata=[]

        for page in pages:
            split_chunks=splitter.split_text(
                page["text"]
            )

            for chunk in split_chunks:
                chunks.append(chunk)

                metadata.append({
                    "page":page["page"],
                    "source":safe_filename,
                    "user_id":user.id
                })

        embeddings=create_embeddings(
            chunks
        )

        collection_name=f"user_{user.id}_{unique_id}"

        create_collection(
            collection_name
        )

        store_vectors(
            collection_name,
            embeddings,
            chunks,
            metadata
        )

        expiry_hours=user.retention_hours()

        expires_at=datetime.utcnow()+timedelta(
            hours=expiry_hours
        )

        session = PDFSession(
            user_id=user.id,
            original_filename=safe_filename,
            cloudinary_url="local_testing",
            public_id=unique_id,
            collection_name=collection_name,
            total_pages=len(pages),
            expires_at=expires_at
        )

        db.session.add(session)

        db.session.commit()

        return jsonify({
            "message":"PDF uploaded successfully",
            "session": session.to_dict(),
            "session_id": session.id
        }),201

    except Exception as e:
        return jsonify({
            "error":str(e)
        }),500