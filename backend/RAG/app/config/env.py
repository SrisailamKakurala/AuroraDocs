from pydantic_settings import BaseSettings # type: ignore
from functools import lru_cache
import dotenv # type: ignore
import os

dotenv.load_dotenv()

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8004  # Unique port
    debug: bool = False
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    gemini_api_key: str = os.getenv("GEMINI_API_KEY")
    device: str = "auto"  # Use "cpu" or "cuda" if specified
    max_new_tokens: int = 100  # Max tokens for generation

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()