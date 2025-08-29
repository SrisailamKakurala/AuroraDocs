import uvicorn # type: ignore
from fastapi import FastAPI # type: ignore
from app.routes.rag import app as rag_app
from app.config.env import get_settings

settings = get_settings()
app = FastAPI(title="RAG Service")

app.mount("/rag-service", rag_app)

if __name__ == "__main__":
    uvicorn.run(app, host=settings.host, port=settings.port, reload=settings.debug)