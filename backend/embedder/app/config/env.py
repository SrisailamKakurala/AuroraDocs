from pydantic_settings import BaseSettings # type: ignore
from functools import lru_cache

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8003  # Different port to avoid conflict with DocProcessor
    debug: bool = False
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    ttl_seconds: int = 3200  # 30 minutes TTL
    chunk_size: int = 500  # Tokens per chunk
    chunk_overlap: int = 100  # Overlap between chunks

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()