from qdrant_client import QdrantClient
from qdrant_client.models import Distance
from qdrant_client.models import VectorParams
from qdrant_client.models import PointStruct
from app.config.setting import Config
import uuid
qdrant_client=QdrantClient(
    url=Config.QDRANT_URL,
    api_key=Config.QDRANT_API_KEY if Config.QDRANT_API_KEY else None
)
def create_collection(collection_name):
    existing_collections=qdrant_client.get_collections().collections
    collection_exists=any(
        collection.name==collection_name
        for collection in existing_collections
    )
    if not collection_exists:
        qdrant_client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )
def store_vectors(
    collection_name,
    vectors,
    chunks,
    metadata
):
    points=[]
    for i,vector in enumerate(vectors):
        points.append(
            PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={
                    "text":chunks[i],
                    "page":metadata[i]["page"],
                    "source":metadata[i]["source"],
                    "user_id":metadata[i]["user_id"]
                }
            )
        )
    qdrant_client.upsert(
        collection_name=collection_name,
        points=points
    )
def search_vectors(
    collection_name,
    query_vector,
    limit=5
):
    results=qdrant_client.search(
        collection_name=collection_name,
        query_vector=query_vector,
        limit=limit
    )
    contexts=[]
    for result in results:
        contexts.append({
            "text":result.payload["text"],
            "page":result.payload["page"],
            "source":result.payload["source"]
        })
    return contexts
def delete_collection(collection_name):
    qdrant_client.delete_collection(
        collection_name=collection_name
    )