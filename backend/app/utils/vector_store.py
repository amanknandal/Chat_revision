import faiss
import numpy as np
import pickle
def save_vectors(
    vectors,
    chunks,
    vector_path
):
    try:
        dimension = vectors.shape[1]
        index = faiss.IndexFlatL2(
            dimension
        )
        index.add(vectors)
        faiss.write_index(
            index,
            f"{vector_path}.index"
        )
        with open(
            f"{vector_path}.pkl",
            "wb"
        ) as file:
            pickle.dump(
                chunks,
                file
            )
    except Exception as e:
        raise Exception(
            f"Vector saving failed: {str(e)}"
        )
def search_vectors(
    query_vector,
    vector_path,
    k=5
):
    try:
        index = faiss.read_index(
            f"{vector_path}.index"
        )
        with open(
            f"{vector_path}.pkl",
            "rb"
        ) as file:

            chunks = pickle.load(file)
        query_vector = np.array(
            [query_vector],
            dtype=np.float32
        )
        distances, indices = index.search(
            query_vector,
            k
        )
        results = []
        for idx in indices[0]:
            if idx < len(chunks):
                results.append(
                    chunks[idx]
                )
        return results
    except Exception as e:
        raise Exception(
            f"Vector search failed: {str(e)}"
        )