import json
import chromadb  # type: ignore
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction  # type: ignore

# Create embedding function
embedding_function = SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

# Create Chroma client
client = chromadb.PersistentClient(path="db")

# Create or get collection
collection = client.get_or_create_collection(
    name="gita",
    embedding_function=embedding_function
)

def setup_chroma():

    # Check if collection already has data
    existing_count = collection.count()

    if existing_count > 0:
        print("Collection already exists with data.")
        return

    # Load files
    with open("data/translation.json", "r", encoding="utf-8") as f:
        translations = json.load(f)

    with open("data/verse.json", "r", encoding="utf-8") as f:
        verses = json.load(f)

    # Filter English translations
    english_translations = [
        t for t in translations
        if t["lang"] == "english"
    ]

    print(f"Total filtered verses: {len(english_translations)}")

    documents = []
    metadatas = []
    ids = []

    for item in english_translations:

        verse_id = item["verse_id"]

        verse_data = next(
            (v for v in verses if v["id"] == verse_id),
            None
        )

        if verse_data is None:
            continue

        documents.append(item["description"])

        metadatas.append({
            "chapter": verse_data["chapter_number"],
            "verse": verse_data["verse_number"]
        })

        ids.append(str(item["id"]))

    # Add data to collection
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )

    print("Bhagavad Gita verses stored successfully!")

# Run directly if file executed manually
if __name__ == "__main__":
    setup_chroma()