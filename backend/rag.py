import chromadb # type: ignore
import json

client = chromadb.PersistentClient(path="./db")

collection = client.get_or_create_collection("gita")


def retrieve_verses(query):

    results = collection.query(
        query_texts=[query],
        n_results=3
    )

    retrieved_verses = results["documents"][0]
    retrieved_metadata = results["metadatas"][0]

    context = "\n".join(retrieved_verses)

    return context, retrieved_metadata