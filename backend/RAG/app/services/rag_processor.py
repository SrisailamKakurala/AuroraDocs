from langchain.embeddings import HuggingFaceEmbeddings # type: ignore
from langchain.llms import HuggingFacePipeline # type: ignore
from transformers import AutoModelForCausalLM, AutoTokenizer # type: ignore
import redis # type: ignore
import asyncio
import numpy as np # type: ignore
from app.config.env import get_settings
import torch # type: ignore

settings = get_settings()
redis_client = redis.Redis(
    host=settings.redis_host,
    port=settings.redis_port,
    db=settings.redis_db,
    decode_responses=True
)
embeddings_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

async def fetch_vectors(session_ids: list[str]):
    all_vectors = {}
    for session_id in session_ids:
        keys = redis_client.keys(f"{session_id}:*")
        vectors = [redis_client.get(key) for key in keys]
        all_vectors[session_id] = [eval(vec) for vec in vectors if vec]  # Convert string back to list
    return all_vectors

def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

async def process_rag(query: str, session_ids: list[str]):
    # Fetch vectors from Redis
    vectors = await fetch_vectors(session_ids)
    
    # Embed the query
    query_embedding = embeddings_model.embed_query(query)
    
    # Collect all documents and their vectors
    documents = []
    all_vectors_flat = []
    for session_id, vecs in vectors.items():
        for i, vec in enumerate(vecs):
            doc_content = f"Doc {session_id} chunk {i}"
            documents.append({"page_content": doc_content, "vector": vec})
            all_vectors_flat.append((doc_content, vec))
    
    # Compute similarity scores
    similarities = []
    for doc_content, vec in all_vectors_flat:
        vec_array = np.array(eval(vec))  # Convert string list to numpy array
        sim_score = cosine_similarity(np.array(query_embedding), vec_array)
        similarities.append((doc_content, sim_score))
    
    # Sort by similarity and get top k (e.g., 3)
    k = 3
    relevant_docs = sorted(similarities, key=lambda x: x[1], reverse=True)[:k]
    context = "\n".join([doc[0] for doc in relevant_docs])
    
    # Load Granite model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained(settings.granite_model_path, token=settings.hf_token)
    model = AutoModelForCausalLM.from_pretrained(
        settings.granite_model_path,
        token=settings.hf_token,
        device_map=settings.device,
        torch_dtype=torch.float16
    )
    model.eval()
    
    # Create a pipeline for LangChain
    pipeline = HuggingFacePipeline.from_model_id(
        model_id=settings.granite_model_path,
        task="text-generation",
        model_kwargs={"token": settings.hf_token, "device_map": settings.device, "torch_dtype": torch.float16},
        pipeline_kwargs={"max_new_tokens": settings.max_new_tokens}
    )
    
    # Generate response using the chat template
    chat_input = [
        {"role": "user", "content": f"{context}\n\nQuery: {query}"},
    ]
    chat = tokenizer.apply_chat_template(chat_input, tokenize=False, add_generation_prompt=True)
    input_tokens = tokenizer(chat, return_tensors="pt").to(next(model.parameters()).device)
    
    # Generate output
    loop = asyncio.get_running_loop()
    output = await loop.run_in_executor(None, lambda: pipeline(chat))
    
    return output[0] if isinstance(output, list) else output