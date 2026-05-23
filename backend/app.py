from fastapi import FastAPI # type: ignore
from pydantic import BaseModel # type: ignore

from rag import retrieve_verses
from llm import generate_response



app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware # type: ignore

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
async def chat(request: ChatRequest):

    query = request.message
    context, metadata = retrieve_verses(query)
    response = generate_response(query, context)

    references = []

    for item in metadata:
        references.append(
            f"Bhagavad Gita {item['chapter']}.{item['verse']}"
        )

        return {
            "response": response,
            "references": references
        }   


















