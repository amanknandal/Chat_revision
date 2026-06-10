from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from apscheduler.schedulers.background import BackgroundScheduler
from app.config.setting import Config
from app.database.db import db
from app.models.user import User
from app.models.pdf_session import PDFSession
from app.models.flashcard import Flashcard
from app.models.revision_note import RevisionNote
from app.routes.auth_routes import auth_bp
from app.routes.upload_routes import upload_bp
from app.routes.chat_routes import chat_bp
from app.routes.pdf_routes import pdf_bp
from app.routes.dashboard_routes import dashboard_bp
from app.routes.flashcard_routes import flashcard_bp
from app.routes.revision_routes import revision_bp

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
app.register_blueprint(
    pdf_bp,
    url_prefix="/api/pdf"
)
app.register_blueprint(
    flashcard_bp,
    url_prefix="/api/flashcards"
)
app.register_blueprint(
    revision_bp,
    url_prefix="/api/revision"
)
app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
)
scheduler = BackgroundScheduler()
scheduler.start()
@app.route("/")
def home():
    return {
        "message":"AI PDF Assistant Running"
    }
@app.route("/health")
def health():
    return {
        "status":"healthy"
    }