from pydantic_settings import BaseSettings # type: ignore
from functools import lru_cache

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8002
    debug: bool = False
    max_file_size: int = 10 * 1024 * 1024  # 10MB limit

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()