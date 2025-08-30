from langchain.text_splitter import RecursiveCharacterTextSplitter # type: ignore
from langchain_huggingface import HuggingFaceEmbeddings # type: ignore
import redis # type: ignore
import uuid
import asyncio
from app.config.env import get_settings

settings = get_settings()
redis_client = redis.Redis(
    host=settings.redis_host,
    port=settings.redis_port,
    db=settings.redis_db,
    decode_responses=True
)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=settings.chunk_size, chunk_overlap=settings.chunk_overlap)
embeddings_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

async def embed_text(text: str, session_id: str):
    # Chunk the text with overlap
    chunks = text_splitter.split_text(text)
    
    # Generate embeddings for each chunk
    loop = asyncio.get_running_loop()
    embeddings = await loop.run_in_executor(None, lambda: embeddings_model.embed_documents(chunks))
    
    # Generate a unique vector ID per session
    vector_id = f"{session_id}:{uuid.uuid4()}"
    
    # Store embeddings and text in Redis with TTL
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        vector_key = f"{vector_id}:{i}"
        text_key = f"{vector_id}:text:{i}"
        redis_client.setex(vector_key, settings.ttl_seconds, str(embedding))  # Store the embedding
        redis_client.setex(text_key, settings.ttl_seconds, chunk)  # Store the original text chunk
    
    return vector_id