import chromadb # type: ignore

client = chromadb.PersistentClient(path="./db")

collection = client.get_collection(name="gita")

def retrieve_verses(query, n_results=3):

    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )

    verses = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = "\n".join(verses)

    return context, metadatas