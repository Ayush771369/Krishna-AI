import json
import chromadb # type: ignore

# =========================
# LOAD DATASETS
# =========================

with open("data/translation.json", "r", encoding="utf-8") as f:
    translations = json.load(f)

with open("data/verse.json", "r", encoding="utf-8") as f:
    verses = json.load(f)

# =========================
# CREATE VERSE LOOKUP
# =========================

verse_lookup = {}

for verse in verses:
    verse_lookup[verse["id"]] = verse

# =========================
# FILTER ENGLISH TRANSLATIONS
# =========================

filtered_verses = []

for item in translations:

    if (
        item["lang"] == "english"
        and item["authorName"] == "Swami Adidevananda"
    ):
        filtered_verses.append(item)

print(f"Total filtered verses: {len(filtered_verses)}")
##print(verses[0])

# =========================
# PREPARE DOCUMENTS
# =========================

documents = []
ids = []
metadatas = []

for item in filtered_verses:

    verse_data = verse_lookup[item["verse_id"]]

    documents.append(item["description"])

    ids.append(str(item["verse_id"]))

    metadatas.append({
        "chapter": verse_data["chapter_number"],
        "verse": verse_data["verse_number"]
    })

# =========================
# CREATE PERSISTENT DB
# =========================

client = chromadb.PersistentClient(path="./db")

collection = client.get_or_create_collection(
    name="gita"
)

# =========================
# ADD DATA TO CHROMADB
# =========================

collection.add(
    documents=documents,
    ids=ids,
    metadatas=metadatas
)

print("Bhagavad Gita verses stored successfully!")
print(verse[0])