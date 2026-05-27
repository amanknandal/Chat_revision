from sentence_transformers import SentenceTransformer
embedding_model=SentenceTransformer(
    "BAAI/bge-small-en-v1.5"
)
def create_embeddings(texts):
    try:
        embeddings=embedding_model.encode(
            texts,
            normalize_embeddings=True
        )
        return embeddings.tolist()
    except Exception as e:
        raise Exception(
            f"Embedding error: {str(e)}"
        )