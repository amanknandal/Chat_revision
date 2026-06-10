import os
from flask import Blueprint, jsonify, request, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.pdf_session import PDFSession
from app.database.db import db

pdf_bp = Blueprint(
    "pdf",
    __name__
)

UPLOADS_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..",
        "uploads"
    )
)
os.makedirs(UPLOADS_DIR, exist_ok=True)


def _get_pdf_filename(session):
    return f"{session.public_id}_{session.original_filename}"


@pdf_bp.route("/all", methods=["GET"])
@jwt_required()
def list_pdfs():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    sessions = PDFSession.query.filter_by(user_id=user.id).order_by(
        PDFSession.created_at.desc()
    ).all()

    return jsonify({
        "pdfs": [session.to_dict() for session in sessions]
    }), 200


@pdf_bp.route("/view/<int:pdf_id>", methods=["GET"])
@jwt_required()
def view_pdf(pdf_id):
    user_id = get_jwt_identity()
    session = PDFSession.query.filter_by(
        id=pdf_id,
        user_id=user_id
    ).first()

    if not session:
        return jsonify({"error": "PDF session not found"}), 404
    if session.is_expired():
        return jsonify({"error": "PDF session expired"}), 410

    filename = _get_pdf_filename(session)
    file_path = os.path.join(UPLOADS_DIR, filename)
    if not os.path.exists(file_path):
        return jsonify({"error": "PDF file not found"}), 404

    download_url = f"{request.host_url.rstrip('/')}/api/pdf/download/{session.id}"
    return jsonify({
        "url": download_url,
        "name": session.original_filename
    }), 200


@pdf_bp.route("/download/<int:pdf_id>", methods=["GET"])
@jwt_required()
def download_pdf(pdf_id):
    user_id = get_jwt_identity()
    session = PDFSession.query.filter_by(
        id=pdf_id,
        user_id=user_id
    ).first()

    if not session:
        return jsonify({"error": "PDF session not found"}), 404
    if session.is_expired():
        return jsonify({"error": "PDF session expired"}), 410

    filename = _get_pdf_filename(session)
    if not os.path.exists(os.path.join(UPLOADS_DIR, filename)):
        return jsonify({"error": "PDF file not found"}), 404

    return send_from_directory(
        UPLOADS_DIR,
        filename,
        as_attachment=False
    )


@pdf_bp.route("/delete/<int:pdf_id>", methods=["DELETE"])
@jwt_required()
def delete_pdf(pdf_id):
    user_id = get_jwt_identity()
    session = PDFSession.query.filter_by(
        id=pdf_id,
        user_id=user_id
    ).first()

    if not session:
        return jsonify({"error": "PDF session not found"}), 404

    filename = _get_pdf_filename(session)
    file_path = os.path.join(UPLOADS_DIR, filename)
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except OSError:
            pass

    db.session.delete(session)
    db.session.commit()

    return jsonify({"message": "PDF deleted successfully"}), 200
