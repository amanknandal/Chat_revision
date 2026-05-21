from database.db import db
from datetime import datetime
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    username = db.Column(
        db.String(100),
        nullable=False
    )
    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False
    )
    password = db.Column(
        db.String(255),
        nullable=False
    )
    is_premium = db.Column(
        db.Boolean,
        default=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
    def retention_hours(self):
        return 10 if self.is_premium else 2
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_premium": self.is_premium
        }