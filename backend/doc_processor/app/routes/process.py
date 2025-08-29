from fastapi import FastAPI, UploadFile, File, HTTPException, status # type: ignore
from app.services.extractor import extract_text
from app.config.env import get_settings

app = FastAPI(title="DocProcessor Service")
settings = get_settings()

@app.post("/process")
async def process_file(file: UploadFile = File(...)):
    if file.size > settings.max_file_size:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File size exceeds 10MB limit")
    
    content_type = file.content_type
    if content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported file type")

    try:
        # Pass the file object directly for async reading
        text = await extract_text(file)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error processing file: {str(e)}")