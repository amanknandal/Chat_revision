from datetime import datetime
from app.database.db import db
class PDFSession(db.Model):
    __tablename__="pdf_sessions"
    id=db.Column(
        db.Integer,
        primary_key=True
    )
    user_id=db.Column(
        db.Integer,
        nullable=False
    )
    original_filename=db.Column(
        db.String(255),
        nullable=False
    )
    cloudinary_url=db.Column(
        db.Text,
        nullable=False
    )
    public_id=db.Column(
        db.String(255),
        nullable=False,
        unique=True
    )
    collection_name=db.Column(
        db.String(255),
        nullable=False
    )
    total_pages=db.Column(
        db.Integer,
        default=0
    )
    expires_at=db.Column(
        db.DateTime,
        nullable=False
    )
    created_at=db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
    def is_expired(self):
        return datetime.utcnow()>self.expires_at
    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "original_filename":self.original_filename,
            "cloudinary_url":self.cloudinary_url,
            "collection_name":self.collection_name,
            "total_pages":self.total_pages,
            "expires_at":self.expires_at.isoformat(),
            "created_at":self.created_at.isoformat()
        }