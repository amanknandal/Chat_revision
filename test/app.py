from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from apscheduler.schedulers.background import BackgroundScheduler

from config import Config
from database.db import db

from routes.auth_routes import auth_bp
from routes.upload_routes import upload_bp
from routes.chat_routes import chat_bp

from utils.cleanup import cleanup_expired_sessions

from models.user import User
from models.pdf_session import PDFSession

app = Flask(__name__)
app.config.from_object(Config)

CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)

JWTManager(app)

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    upload_bp,
    url_prefix="/api/upload"
)

app.register_blueprint(
    chat_bp,
    url_prefix="/api/chat"
)

scheduler = BackgroundScheduler()

scheduler.add_job(
    func=cleanup_expired_sessions,
    trigger="interval",
    minutes=10
)

scheduler.start()

@app.route("/")
def home():
    return {
        "message": "AI PDF Assistant Backend Running"
    }

@app.route("/health")
def health():
    return {
        "status": "healthy"
    }

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )