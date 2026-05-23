import chromadb # type: ignore
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction # type: ignore

# Embedding function
embedding_function = SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

# Load existing DB
client = chromadb.PersistentClient(path="backend/db")

# Load existing collection
collection = client.get_collection(
    name="gita",
    embedding_function=embedding_function
)

def retrieve_verses(query, n_results=3):

    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )

    return results