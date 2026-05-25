from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models.user import User
from database.db import db
import bcrypt

auth_bp = Blueprint(
    "auth",
    __name__
)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json(force=True)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        phone = data.get("phone")

        if not username or not email or not password or not phone:
            return jsonify({
                "error": "All fields are required"
            }), 400

        existing_user = User.query.filter_by(
            email=email
        ).first()

        if existing_user:
            return jsonify({
                "error": "Email already exists"
            }), 409
        
        existing_user = User.query.filter_by(
            phone=phone
        ).first()

        if existing_user:
            return jsonify({
                "error": "Phone already exists"
            }), 409

        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        user = User(
            username=username,
            email=email,
            password=hashed_password,
            phone=phone
        )

        db.session.add(user)
        db.session.commit()

        token = create_access_token(
            identity=str(user.id)
        )

        return jsonify({
            "message": "Signup successful",
            "token": token,
            "user": user.to_dict()
        }), 201

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json(force=True)

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({
                "error": "Email and password are required"
            }), 400

        user = User.query.filter_by(
            email=email
        ).first()

        if not user:
            return jsonify({
                "error": "Invalid credentials"
            }), 401

        valid_password = bcrypt.checkpw(
            password.encode("utf-8"),
            user.password.encode("utf-8")
        )

        if not valid_password:
            return jsonify({
                "error": "Invalid credentials"
            }), 401

        token = create_access_token(
            identity=str(user.id)
        )

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500