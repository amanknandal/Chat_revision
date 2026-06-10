from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)
from app.models.user import User
from app.models.pdf_session import PDFSession
from app.rag.embeddings import embedding_model
from app.rag.vector_store import search_vectors
from app.utils.ollama_client import ask_ollama
from datetime import datetime

chat_bp = Blueprint(
    "chat",
    __name__
)
@chat_bp.route("/ask", methods=["POST"])
@jwt_required()
def ask_question():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({
                "error": "User not found"
            }), 404
        data = request.get_json()
        question = data.get("question")
        session_id = data.get("session_id")
        if not question:
            return jsonify({
                "error": "Question is required"
            }), 400
        if not session_id:
            return jsonify({
                "error": "Session ID is required"
            }), 400
        session = PDFSession.query.filter_by(
            id=session_id,
            user_id=user.id
        ).first()
        if not session:
            return jsonify({
                "error": "PDF session not found"
            }), 404
        if session.is_expired():
            return jsonify({
                "error": "PDF session expired"
            }), 410
        query_vector = embedding_model.encode(
            [question]
        )[0]
        contexts = search_vectors(
            session.collection_name,
            query_vector,
            limit=5
        )
        context_text = "\n\n".join(
            [item["text"] for item in contexts]
        )
        prompt = f'''
You are an AI PDF assistant for students.
Answer ONLY using the provided PDF context.
If the answer does not exist in the PDF context,
reply with:
"I could not find this information in the uploaded PDF."
PDF Context:
{context_text}
Question:
{question}
Answer:
'''
        answer = ask_ollama(prompt)
        return jsonify({
            "question": question,
            "answer": answer,
            "session_id": session.id,
            "expires_at": session.expires_at.isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500