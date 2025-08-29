from pydantic_settings import BaseSettings # type: ignore
from functools import lru_cache
import dotenv # type: ignore
import os

dotenv.load_dotenv()
class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8002  # Unique port
    debug: bool = False
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    granite_model_path: str = "ibm-granite/granite-3.1-1b-a400m-instruct"  # Hugging Face model path
    hf_token: str = os.getenv("HF_TOKEN")
    device: str = "auto"  # Use "cpu" or "cuda" if specified
    max_new_tokens: int = 100  # Max tokens for generation

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()