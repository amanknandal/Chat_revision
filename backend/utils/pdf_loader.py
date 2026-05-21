import fitz
def extract_text(pdf_path):
    try:
        document = fitz.open(pdf_path)
        full_text = []
        for page in document:
            try:
                text = page.get_text()
                if text:
                    full_text.append(text)
            except Exception:
                continue
        document.close()
        return "\n".join(full_text)
    except Exception as e:
        raise Exception(
            f"PDF extraction failed: {str(e)}"
        )