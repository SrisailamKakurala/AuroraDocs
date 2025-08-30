import uvicorn # type: ignore
from fastapi import FastAPI # type: ignore
from app.routes.embed import app as embed_app
from app.config.env import get_settings
from fastapi.middleware.cors import CORSMiddleware # type: ignore

settings = get_settings()
app = FastAPI(title="Embedder Service")

# CORS Middleware
origins = [
    "http://localhost:5173",  # Vite development server
    "http://127.0.0.1:5173",  # Alternative localhost address
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.mount("/embedder", embed_app)

if __name__ == "__main__":
    uvicorn.run(app, host=settings.host, port=settings.port, reload=settings.debug)