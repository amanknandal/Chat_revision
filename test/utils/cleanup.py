import os
from datetime import datetime
from models.pdf_session import PDFSession
from database.db import db
def cleanup_expired_sessions():
    try:
        expired_sessions = PDFSession.query.filter(
            PDFSession.expires_at < datetime.utcnow()
        ).all()
        deleted_count = 0
        for session in expired_sessions:
            try:
                pdf_path = os.path.join(
                    "temp_uploads",
                    session.stored_filename
                )
                vector_index = (
                    f"{session.vector_path}.index"
                )
                vector_pickle = (
                    f"{session.vector_path}.pkl"
                )
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
                if os.path.exists(vector_index):
                    os.remove(vector_index)
                if os.path.exists(vector_pickle):
                    os.remove(vector_pickle)
                db.session.delete(session)
                deleted_count += 1
            except Exception:
                continue
        db.session.commit()
        return {
            "deleted_sessions": deleted_count
        }
    except Exception as e:
        db.session.rollback()
        return {
            "error": str(e)
        }