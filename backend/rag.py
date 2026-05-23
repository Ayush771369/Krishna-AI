import chromadb # type: ignore

# Load existing DB
client = chromadb.PersistentClient(path="backend/db")

# Load existing collection
collection = client.get_collection(name="gita")

def retrieve_verses(query, n_results=3):

    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )

    return results