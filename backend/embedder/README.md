![alt text](image.png)

Expected Response: {"vector_id": "session123:uuid-string"}
Verify: Check Redis (redis-cli) with KEYS "session123:*" to see multiple keys (e.g., due to overlap).