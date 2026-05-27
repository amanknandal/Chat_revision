from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from apscheduler.schedulers.background import BackgroundScheduler
from app.config.setting import Config
from app.database.db import db
from app.models.user import User
from app.models.pdf_session import PDFSession
from app.routes.auth_routes import auth_bp
app=Flask(__name__)
app.config.from_object(Config)
CORS(
    app,
    resources={
        r"/*":{
            "origins":"*"
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
scheduler=BackgroundScheduler()
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