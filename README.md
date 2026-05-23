# 🕉️ Krishna AI

<div align="center">

### *Wisdom for the Modern Soul*

An AI-powered spiritual guidance chatbot inspired by the timeless teachings of the Bhagavad Gita.

[![React](https://img.shields.io/badge/Frontend-React-blue)]()
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)]()
[![Python](https://img.shields.io/badge/Python-3.10+-yellow)]()
[![Vite](https://img.shields.io/badge/Vite-Frontend-purple)]()
[![License](https://img.shields.io/badge/License-MIT-orange)]()

</div>

---

# 🌌 About Krishna AI

Krishna AI is a modern AI chatbot designed to provide calm, philosophical, and spiritually grounded guidance inspired by the teachings of **Lord Krishna** and the **Bhagavad Gita**.

The project combines:

- 🧠 Large Language Models (LLMs)
- 📖 Retrieval-Augmented Generation (RAG)
- 🔍 Semantic Search
- 🌌 Cinematic Frontend Design
- ⚡ Fast API Backend

to create a peaceful and reflective conversational experience.

---

# ✨ Features

## 🧠 AI-Powered Spiritual Guidance
Ask emotional, philosophical, or life-related questions and receive thoughtful responses inspired by Bhagavad Gita teachings.

---

## 📖 Bhagavad Gita RAG System
Relevant verses are retrieved dynamically using semantic similarity search.

---

## 💬 Modern Chat Interface
- Beautiful AI chat UI
- Smooth animations
- Loading indicators
- Responsive design
- Cinematic dark theme

---

## 🔍 Semantic Verse Retrieval
Uses vector embeddings and ChromaDB to retrieve contextually relevant Bhagavad Gita verses.

---

## 🤖 LLM Integration
Powered using Groq-hosted LLMs for fast responses.

---

## 🌌 Cinematic Frontend
- Cosmic gradients
- Glassmorphism
- Spiritual aesthetic
- Smooth interactions

---

# 🧠 How Krishna AI Works

```text
User Query
   ↓
Embedding Generation
   ↓
Semantic Search (ChromaDB)
   ↓
Relevant Bhagavad Gita Verses Retrieved
   ↓
Prompt Engineering
   ↓
LLM Response Generation
   ↓
Final Spiritual Response
```

---

# 🛠️ Tech Stack

# Frontend
- React
- Vite
- TailwindCSS
- Framer Motion
- Lucide Icons

---

# Backend
- FastAPI
- Python
- ChromaDB
- Sentence Transformers
- Groq API

---

# Deployment
- Railway (Backend)
- Vercel (Frontend)

---

# 📂 Project Structure

```bash
Krishna-AI/
│
├── backend/
│   ├── app.py
│   ├── rag.py
│   ├── chroma_setup.py
│   ├── prompts.py
│   ├── llm.py
│   ├── requirements.txt
│   ├── db/
│   └── data/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│
└── README.md
```

---

# ⚙️ Backend Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Krishna-AI.git
cd Krishna-AI
```

---

# 2️⃣ Create Virtual Environment

## Windows

```bash
python -m venv venv
venv\Scripts\activate
```

## Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

# 3️⃣ Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

# 4️⃣ Create Environment Variables

Create a `.env` file inside `backend/`

```env
GROQ_API_KEY=your_api_key_here
```

---

# 5️⃣ Create Vector Database

```bash
python chroma_setup.py
```

This will:
- load Bhagavad Gita verses
- generate embeddings
- store them in ChromaDB

---

# 6️⃣ Run Backend

```bash
uvicorn app:app --reload
```

Backend runs at:

```bash
http://127.0.0.1:8000
```

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

# 1️⃣ Navigate to Frontend

```bash
cd frontend
```

---

# 2️⃣ Install Dependencies

```bash
npm install
```

---

# 3️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# 🌐 API Endpoint

# POST `/chat`

## Request

```json
{
  "query": "How do I overcome fear?"
}
```

---

## Response

```json
{
  "response": "Fear arises from attachment and uncertainty...",
  "references": [
    "Bhagavad Gita 11.49"
  ]
}
```

---

# 🚀 Deployment

# Backend Deployment (Railway)

1. Push backend to GitHub
2. Create Railway project
3. Add environment variables
4. Deploy FastAPI backend

---

# Frontend Deployment (Vercel)

1. Import GitHub repository
2. Select frontend folder
3. Add environment variables
4. Deploy Vite frontend

---

# 🔮 Future Improvements

- 🔊 Voice conversations
- 🧠 Long-term memory
- 🌍 Multi-language support
- 📜 Sanskrit verse rendering
- 🎤 Krishna voice assistant
- 📱 Mobile app
- ✨ Streaming responses
- 👤 Authentication system
- 🧘 Meditation mode
- 📚 Personalized spiritual guidance

---

# 📸 Screenshots

## Landing Page
_Add screenshot here_

---

## Chat Interface
_Add screenshot here_

---

## Mobile View
_Add screenshot here_

---

# 🙏 Inspiration

Krishna AI is inspired by the timeless wisdom of the Bhagavad Gita and the teachings of Lord Krishna.

The project aims to create a peaceful AI experience that helps users navigate:
- overthinking
- fear
- anxiety
- attachment
- confusion
- emotional struggles

through reflective and philosophical guidance.

---

# ⚠️ Disclaimer

Krishna AI is an experimental AI project created for:
- educational purposes
- inspiration
- exploration of AI + spirituality

It should NOT replace:
- professional mental health support
- medical advice
- certified spiritual guidance

---

# 👨‍💻 Author

## Ayush Varun

Chemical Engineering Student @ IIT Indore

- AI/ML Enthusiast
- Full Stack Learner
- Builder

GitHub:
https://github.com/Ayush771369

---

# ⭐ Support the Project

If you liked this project:

- ⭐ Star the repository
- 🍴 Fork the repo
- 🛠️ Contribute
- 📢 Share it

---

<div align="center">

# 🕉️ Hare Krishna

*"Whenever dharma declines and adharma rises, I manifest Myself."*

— Bhagavad Gita 4.7

</div>
