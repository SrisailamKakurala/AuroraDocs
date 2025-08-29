import io
from PyPDF2 import PdfReader # type: ignore
from docx import Document # type: ignore
import asyncio

async def extract_text(file):
    # Read file content asynchronously
    content = await file.read()  # Await the UploadFile.read() method
    file.seek(0)  # Reset file pointer for potential reuse

    if file.filename.endswith(".pdf"):
        pdf_reader = PdfReader(io.BytesIO(content))
        text = "".join(page.extract_text() for page in pdf_reader.pages if page.extract_text())
    elif file.filename.endswith(".docx"):
        doc = Document(io.BytesIO(content))
        text = "\n".join(paragraph.text for paragraph in doc.paragraphs if paragraph.text)
    else:
        raise ValueError("Unsupported file format")

    return text if text else "No text extracted"