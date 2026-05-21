from database.db import db
from datetime import datetime
from database.db import db
from datetime import datetime
class PDFSession(db.Model):
    __tablename__ = "pdf_sessions"
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    user_id = db.Column(
        db.Integer,
        nullable=False
    )
    original_filename = db.Column(
        db.String(255),
        nullable=False
    )
    stored_filename = db.Column(
        db.String(255),
        nullable=False,
        unique=True
    )
    vector_path = db.Column(
        db.String(255),
        nullable=False
    )
    expires_at = db.Column(
        db.DateTime,
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
    def is_expired(self):
        return datetime.utcnow() > self.expires_at
    def to_dict(self):
        return {
            "id": self.id,
            "original_filename": self.original_filename,
            "stored_filename": self.stored_filename,
            "vector_path": self.vector_path,
            "expires_at": self.expires_at.isoformat()
        }
class PDFSession(db.Model):
    __tablename__ = "pdf_sessions"
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    user_id = db.Column(
        db.Integer,
        nullable=False
    )
    original_filename = db.Column(
        db.String(255),
        nullable=False
    )
    stored_filename = db.Column(
        db.String(255),
        nullable=False,
        unique=True
    )
    vector_path = db.Column(
        db.String(255),
        nullable=False
    )
    total_pages = db.Column(
        db.Integer,
        default=0
    )
    expires_at = db.Column(
        db.DateTime,
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
    def is_expired(self):
        return datetime.utcnow() > self.expires_at
    def to_dict(self):
        return {
            "id": self.id,
            "original_filename": self.original_filename,
            "stored_filename": self.stored_filename,
            "vector_path": self.vector_path,
            "total_pages": self.total_pages,
            "expires_at": self.expires_at.isoformat()
        }