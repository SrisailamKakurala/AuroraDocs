import uvicorn # type: ignore
from fastapi import FastAPI # type: ignore
from app.routes.embed import app as embed_app
from app.config.env import get_settings

settings = get_settings()
app = FastAPI(title="Embedder Service")

app.mount("/embedder", embed_app)

if __name__ == "__main__":
    uvicorn.run(app, host=settings.host, port=settings.port, reload=settings.debug)