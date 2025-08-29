from fastapi import FastAPI, HTTPException, status # type: ignore
from app.services.rag_processor import process_rag
from app.config.env import get_settings
from pydantic import BaseModel # type: ignore

class RagRequest(BaseModel):
    query: str
    session_ids: list[str]

app = FastAPI(title="RAG Service")
settings = get_settings()

@app.post("/rag")
async def rag(request: RagRequest):
    if not request.query.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Query cannot be empty")
    if not request.session_ids:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="At least one session_id is required")

    try:
        response = await process_rag(request.query, request.session_ids)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error processing RAG: {str(e)}")