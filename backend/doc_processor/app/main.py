import uvicorn # type: ignore
from fastapi import FastAPI # type: ignore
from app.routes.process import app as process_app
from app.config.env import get_settings

settings = get_settings()
app = FastAPI(title="DocProcessor Service")

app.mount("/docprocessor", process_app)

if __name__ == "__main__":
    uvicorn.run(app, host=settings.host, port='8002', reload=settings.debug)