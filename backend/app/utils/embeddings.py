from sentence_transformers import SentenceTransformer
embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)
def create_embeddings(text_chunks):
    try:
        embeddings = embedding_model.encode(
            text_chunks,
            convert_to_numpy=True
        )
        return embeddings
    except Exception as e:
        raise Exception(
            f"Embedding creation failed: {str(e)}"
        )