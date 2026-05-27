from datetime import datetime
from app.database.db import db
class User(db.Model):
    __tablename__="users"
    id=db.Column(
        db.Integer,
        primary_key=True
    )

    username=db.Column(
        db.String(100),
        nullable=False
    )
    email=db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )
    password=db.Column(
        db.String(255),
        nullable=False
    )
    is_premium=db.Column(
        db.Boolean,
        default=False
    )
    created_at=db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
    def retention_hours(self):
        return 24 if self.is_premium else 4
    def to_dict(self):
        return {
            "id":self.id,
            "username":self.username,
            "email":self.email,
            "is_premium":self.is_premium,
            "created_at":self.created_at.isoformat()
        }