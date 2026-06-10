from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.pdf_session import PDFSession
from app.models.flashcard import Flashcard
from app.models.revision_note import RevisionNote

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)

@dashboard_bp.route("/stats", methods=["GET"])
@jwt_required()
def dashboard_stats():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    pdf_count = PDFSession.query.filter_by(user_id=user.id).count()
    flashcard_count = Flashcard.query.filter_by(user_id=user.id).count()
    revision_count = RevisionNote.query.filter_by(user_id=user.id).count()

    return jsonify({
        "pdfs": pdf_count,
        "chats": 0,
        "flashcards": flashcard_count,
        "insights": 0,
        "revision_notes": revision_count
    }), 200
