from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.revision_note import RevisionNote

revision_bp = Blueprint(
    "revision",
    __name__
)

@revision_bp.route("/", methods=["GET"])
@jwt_required()
def list_revision_notes():
    user_id = get_jwt_identity()
    notes = RevisionNote.query.filter_by(user_id=user_id).all()
    return jsonify([note.to_dict() for note in notes]), 200

@revision_bp.route("/<int:note_id>", methods=["GET"])
@jwt_required()
def get_revision_note(note_id):
    user_id = get_jwt_identity()
    note = RevisionNote.query.filter_by(id=note_id, user_id=user_id).first()
    if not note:
        return jsonify({"error": "Revision note not found"}), 404
    return jsonify(note.to_dict()), 200

@revision_bp.route("/", methods=["POST"])
@jwt_required()
def create_revision_note():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    title = data.get("title")
    content = data.get("content")
    source = data.get("source")

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    note = RevisionNote(
        user_id=user_id,
        title=title,
        content=content,
        source=source
    )
    from app.database.db import db
    db.session.add(note)
    db.session.commit()

    return jsonify(note.to_dict()), 201

@revision_bp.route("/<int:note_id>", methods=["PUT"])
@jwt_required()
def update_revision_note(note_id):
    user_id = get_jwt_identity()
    note = RevisionNote.query.filter_by(id=note_id, user_id=user_id).first()
    if not note:
        return jsonify({"error": "Revision note not found"}), 404

    data = request.get_json() or {}
    note.title = data.get("title", note.title)
    note.content = data.get("content", note.content)
    note.source = data.get("source", note.source)

    from app.database.db import db
    db.session.commit()

    return jsonify(note.to_dict()), 200

@revision_bp.route("/<int:note_id>", methods=["DELETE"])
@jwt_required()
def delete_revision_note(note_id):
    user_id = get_jwt_identity()
    note = RevisionNote.query.filter_by(id=note_id, user_id=user_id).first()
    if not note:
        return jsonify({"error": "Revision note not found"}), 404

    from app.database.db import db
    db.session.delete(note)
    db.session.commit()

    return jsonify({"message": "Revision note deleted"}), 200
