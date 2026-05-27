import fitz
import tempfile
from PIL import Image
from paddleocr import PaddleOCR

ocr=PaddleOCR(
    use_angle_cls=True,
    lang="en"
)

def extract_ocr_text(pdf_path):
    try:
        document=fitz.open(pdf_path)

        pages=[]

        for page_number,page in enumerate(document):
            pix=page.get_pixmap()

            temp_image=tempfile.NamedTemporaryFile(
                suffix=".png",
                delete=False
            )

            image=Image.frombytes(
                "RGB",
                [pix.width,pix.height],
                pix.samples
            )

            image.save(temp_image.name)

            result=ocr.ocr(
                temp_image.name,
                cls=True
            )

            text_lines=[]

            for line in result[0]:
                detected_text=line[1][0]
                text_lines.append(detected_text)

            page_text="\n".join(text_lines)

            if page_text.strip():
                pages.append({
                    "page":page_number+1,
                    "text":page_text
                })

        document.close()

        return pages

    except Exception as e:
        raise Exception(
            f"OCR extraction failed: {str(e)}"
        )