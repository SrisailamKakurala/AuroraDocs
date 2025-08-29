from langchain_huggingface import HuggingFaceEmbeddings # type: ignore
from google.generativeai import GenerativeModel, configure # type: ignore
import redis # type: ignore
import asyncio
import numpy as np # type: ignore
from app.config.env import get_settings

settings = get_settings()
configure(api_key=settings.gemini_api_key)  # Configure Gemini with API key
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
        vectors = {key: redis_client.get(key) for key in keys if redis_client.get(key) and isinstance(redis_client.get(key), str)}
        all_vectors[session_id] = [vec for key, vec in vectors.items() if ":text:" not in key]  # Exclude text keys
    return all_vectors

def cosine_similarity(vec1, vec2):
    if vec1.size == 0 or vec2.size == 0 or np.linalg.norm(vec1) < 1e-10 or np.linalg.norm(vec2) < 1e-10:
        return 0.0
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

async def process_rag(query: str, session_ids: list[str]):
    # Fetch vectors from Redis
    vectors = await fetch_vectors(session_ids)
    
    print("before embed the query")
    
    # Embed the query
    query_embedding = embeddings_model.embed_query(query)
    
    print("after embed the query")
    
    # Collect all documents and their vectors
    documents = []
    all_vectors_flat = []
    for session_id, vecs in vectors.items():
        for i, vec in enumerate(vecs):
            if vec and isinstance(vec, str):
                try:
                    vector = eval(vec)  # Evaluate to get the vector list
                    key = f"{session_id}:{i}"
                    text_key = f"{session_id}:text:{i}"
                    # Fetch the associated text, prioritizing text_key
                    content = redis_client.get(text_key)
                    if not content:
                        # Fallback to a placeholder if text is missing
                        content = f"Doc {session_id} chunk {i} (Text not found in Redis)"
                        print(f"Warning: No text found for {text_key}, using placeholder")
                    documents.append({"page_content": content, "vector": vector})
                    all_vectors_flat.append((content, vector))
                except (SyntaxError, NameError, TypeError) as e:
                    print(f"Warning: Invalid vector data for {session_id}:{i} - {str(e)}")
            else:
                print(f"Warning: No valid vector data for {session_id}:{i}")
    
    print("after collect all docs")
    
    if not all_vectors_flat:
        raise ValueError("No valid vectors found in Redis. Ensure Embedder-service has processed the documents.")
    
    # Compute similarity scores
    similarities = []
    try:
        for doc_content, vec in all_vectors_flat:
            vec_array = np.array(vec) if vec else np.zeros_like(query_embedding)
            sim_score = cosine_similarity(np.array(query_embedding), vec_array)
            similarities.append((doc_content, sim_score))
    except Exception as e:
        print(f"Error in similarity computation: {str(e)}")
        raise
    
    print("after compute similarity")
    
    # Sort by similarity and get top k (e.g., 3)
    k = 3
    relevant_docs = sorted(similarities, key=lambda x: x[1], reverse=True)[:k]
    context = "\n".join([doc[0] for doc in relevant_docs if doc[0] != ""])
    print(f"Generated context: {context}")
    
    if not context.strip():
        context = "No relevant content found. Please upload and process documents first."
        print("Warning: Empty context generated")
    
    # Initialize Gemini model
    model = GenerativeModel(model_name="gemini-2.5-flash")
    
    print("after initialize Gemini model")
    
    # Generate response
    prompt = f"Context: {context}\n\nQuery: {query}"
    print(prompt)
    try:
        response = await asyncio.to_thread(lambda: model.generate_content(prompt))
        print("after generate response")
        if hasattr(response, 'text'):
            print(response.text)
            # Return both the response and the relevant documents
            return {"response": response.text, "context_docs": [doc[0] for doc in relevant_docs]}
        else:
            raise ValueError("Response does not contain text attribute")
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        raise