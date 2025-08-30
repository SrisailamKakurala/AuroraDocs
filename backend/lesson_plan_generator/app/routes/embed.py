from fastapi import FastAPI, HTTPException, status # type: ignore
from app.services.embedder import embed_text
from app.config.env import get_settings
from pydantic import BaseModel # type: ignore

class EmbedRequest(BaseModel):
    text: str
    session_id: str

app = FastAPI(title="Embedder Service")
settings = get_settings()

@app.post("/embed")
async def embed(request: EmbedRequest):
    if not request.text.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Text cannot be empty")
    
    try:
        vector_id = await embed_text(request.text, request.session_id)
        return {"vector_id": vector_id}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error embedding text: {str(e)}")