import fitz

def extract_pdf_text(pdf_path):
    try:
        document=fitz.open(pdf_path)

        pages=[]

        for page_number,page in enumerate(document):
            text=page.get_text()

            if text and text.strip():
                pages.append({
                    "page":page_number+1,
                    "text":text
                })

        document.close()

        return pages

    except Exception as e:
        raise Exception(
            f"PDF extraction failed: {str(e)}"
        )