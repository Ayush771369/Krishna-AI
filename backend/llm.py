from openai import OpenAI # type: ignore
from prompts import SYSTEM_PROMPT

from dotenv import load_dotenv # type: ignore
import os

load_dotenv()

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_response(query, context):

    prompt = f"""
    {SYSTEM_PROMPT}

    Use the following Bhagavad Gita verses as grounding context:

    {context}

    User Question:
    {query}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content