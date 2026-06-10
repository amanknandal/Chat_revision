from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.flashcard import Flashcard

flashcard_bp = Blueprint(
    "flashcards",
    __name__
)

@flashcard_bp.route("/", methods=["GET"])
@jwt_required()
def list_flashcards():
    user_id = get_jwt_identity()
    flashcards = Flashcard.query.filter_by(user_id=user_id).all()
    return jsonify([flashcard.to_dict() for flashcard in flashcards]), 200

@flashcard_bp.route("/<int:flashcard_id>", methods=["GET"])
@jwt_required()
def get_flashcard(flashcard_id):
    user_id = get_jwt_identity()
    flashcard = Flashcard.query.filter_by(id=flashcard_id, user_id=user_id).first()
    if not flashcard:
        return jsonify({"error": "Flashcard not found"}), 404
    return jsonify(flashcard.to_dict()), 200

@flashcard_bp.route("/", methods=["POST"])
@jwt_required()
def create_flashcard():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    question = data.get("question")
    answer = data.get("answer")
    topic = data.get("topic")

    if not question or not answer:
        return jsonify({"error": "Question and answer are required"}), 400

    flashcard = Flashcard(
        user_id=user_id,
        question=question,
        answer=answer,
        topic=topic
    )
    from app.database.db import db
    db.session.add(flashcard)
    db.session.commit()

    return jsonify(flashcard.to_dict()), 201

@flashcard_bp.route("/<int:flashcard_id>", methods=["PUT"])
@jwt_required()
def update_flashcard(flashcard_id):
    user_id = get_jwt_identity()
    flashcard = Flashcard.query.filter_by(id=flashcard_id, user_id=user_id).first()
    if not flashcard:
        return jsonify({"error": "Flashcard not found"}), 404

    data = request.get_json() or {}
    flashcard.question = data.get("question", flashcard.question)
    flashcard.answer = data.get("answer", flashcard.answer)
    flashcard.topic = data.get("topic", flashcard.topic)

    from app.database.db import db
    db.session.commit()

    return jsonify(flashcard.to_dict()), 200

@flashcard_bp.route("/<int:flashcard_id>", methods=["DELETE"])
@jwt_required()
def delete_flashcard(flashcard_id):
    user_id = get_jwt_identity()
    flashcard = Flashcard.query.filter_by(id=flashcard_id, user_id=user_id).first()
    if not flashcard:
        return jsonify({"error": "Flashcard not found"}), 404

    from app.database.db import db
    db.session.delete(flashcard)
    db.session.commit()

    return jsonify({"message": "Flashcard deleted"}), 200
