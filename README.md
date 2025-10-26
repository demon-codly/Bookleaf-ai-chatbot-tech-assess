# 📚 BookLeaf AI Author Assistant Chatbot

![Project Status](https://img.shields.io/badge/status-completed-brightgreen)
![GitHub issues](https://img.shields.io/github/issues/your-username/your-repo-name) ![GitHub forks](https://img.shields.io/github/forks/your-username/your-repo-name?style=social) ![GitHub Repo stars](https://img.shields.io/github/stars/your-username/your-repo-name?style=social) Welcome to the BookLeaf AI Author Assistant Chatbot! This full-stack application provides BookLeaf Publications authors with an intelligent chatbot to answer questions about their publications using author-specific data and a general knowledge base, powered by a local LLM (Gemma 2B).

---

## ✨ Project Goal

[cite_start]The primary goal is to create an AI-powered assistant that helps authors get instant answers to common questions about their book status, royalties, publishing services, and general FAQs, reducing the need for manual support and providing 24/7 assistance[cite: 1, 2].

---

## 🚀 Features

* [cite_start]👤 **Author Authentication:** Secure login using email/password validated against Supabase[cite: 1, 2].
* [cite_start]🧠 **AI-Powered Chat:** Natural language understanding and response generation using Google Gemma 2B (via Ollama)[cite: 1, 2].
* 📚 **Retrieval-Augmented Generation (RAG):** Answers questions using both:
    * [cite_start]Author-specific data fetched from Supabase[cite: 1, 2].
    * [cite_start]General information from a dedicated knowledge base (`.txt` file)[cite: 1, 2].
* [cite_start]📊 **Confidence Scoring:** Assesses the AI's confidence in its answer[cite: 1, 2].
* [cite_start]🧑‍💼 **Human Escalation:** Automatically suggests escalating to a human agent if confidence is below 80%[cite: 1, 2].
* [cite_start]📝 **Query Logging:** Records all interactions (query, response, confidence, escalation) in Supabase for monitoring[cite: 1, 2].
* [cite_start]🖥️ **Responsive UI:** Clean chat interface built with React and Tailwind CSS[cite: 1, 2].
* [cite_start]🔒 **Dynamic User Context:** Uses the logged-in author's email for personalized queries[cite: 1, 2].
* [cite_start]🚪 **Logout Functionality:** Allows users to securely end their session[cite: 1, 2].

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-222222?style=for-the-badge&logo=ollama&logoColor=white)
![Google Gemma](https://img.shields.io/badge/Gemma_2B-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🏗️ Architecture Overview

[cite_start]The application uses a full-stack architecture comprising a React frontend, a Node.js/Express backend API, a Supabase PostgreSQL database for author data and logs, and a locally running Ollama instance serving the Gemma 2B model for the RAG pipeline[cite: 1, 2]. [cite_start]The RAG service classifies intent, fetches context from Supabase and a text knowledge base, generates responses via Gemma 2B, calculates confidence, and handles escalation[cite: 1, 2].

---

## ⚙️ Setup and Installation

### Prerequisites

* Node.js (v18+) & npm
* Ollama installed locally
* Gemma 2B model pulled via Ollama (`ollama pull gemma2:2b`)
* Python (for potential future ChromaDB integration, not strictly needed for current version)
* A Supabase account and project

### Backend Setup (`bookleaf-backend`)

1.  **Clone the repository** (if applicable) or set up the folder structure.
2.  **Run Ollama Server:**
    ```bash
    # Ensure Ollama is running (handle port conflicts/CUDA errors if necessary)
    ollama serve
    ```
3.  **Set up Supabase:**
    * [cite_start]Create `authors` and `query_logs` tables using the SQL schemas provided in the documentation[cite: 1, 2].
    * [cite_start]Insert mock author data (including passwords - hash in production)[cite: 1, 2].
4.  **Configure Environment:**
    * [cite_start]Create a `.env` file in the backend root[cite: 1, 2].
    * [cite_start]Add your `PORT`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `OLLAMA_BASE_URL` (e.g., `http://localhost:11434`)[cite: 1, 2].
5.  **Install Dependencies:**
    ```bash
    cd bookleaf-backend
    npm install --legacy-peer-deps
    ```
6.  **Add Knowledge Base:**
    * [cite_start]Place your knowledge base `.txt` file (e.g., `BookLeaf.txt`) inside the `data/` directory[cite: 1, 2].
7.  **Run Backend Server:**
    ```bash
    node server.js
    ```
    [cite_start]The server should start on the specified port (default 5000)[cite: 1, 2].

### Frontend Setup (`bookleaf-frontend`)

1.  **Clone the repository** (if applicable) or set up the folder structure using `create-react-app`.
2.  **Install Dependencies:**
    ```bash
    cd bookleaf-frontend
    npm install
    ```
    [cite_start]Ensure `axios`, `react-router-dom`, and Tailwind CSS dependencies are installed[cite: 1, 2].
3.  [cite_start]**(Optional) Configure Supabase Client:** If your login logic directly interacts with Supabase from the frontend, create `src/config/supabaseClient.js` with your Supabase URL and Anon Key[cite: 1, 2].
4.  **Run Frontend Server:**
    ```bash
    npm start
    ```
    [cite_start]The React app should open on `http://localhost:3000`[cite: 1, 2].

---

## ▶️ Running the Application

1.  [cite_start]Ensure the **Ollama server** is running with the Gemma 2B model available[cite: 1, 2].
2.  [cite_start]Start the **Backend server** (`node server.js` in `bookleaf-backend`)[cite: 1, 2].
3.  [cite_start]Start the **Frontend server** (`npm start` in `bookleaf-frontend`)[cite: 1, 2].
4.  [cite_start]Open `http://localhost:3000` in your browser[cite: 1, 2].
5.  [cite_start]Navigate to the login page (`/login`)[cite: 1, 2].
6.  [cite_start]Log in using an email/password combination that exists in your Supabase `authors` table[cite: 1, 2].
7.  [cite_start]You should be redirected to the chatbot interface (`/chatbot`)[cite: 1, 2].
8.  [cite_start]Ask questions related to the author's data or general publishing topics[cite: 1, 2].
9.  [cite_start]Use the "Logout" button to clear the session and return home[cite: 1, 2].

---

## 📸 Screenshots / Demo

*(Placeholder: Add screenshots of your Login Page, Chatbot Interface, example interactions, and maybe the Dashboard view here)*

---

## 🔮 Future Enhancements

* [cite_start]Implement secure password hashing (bcrypt)[cite: 1, 2].
* [cite_start]Integrate ChromaDB for efficient vector-based knowledge base retrieval[cite: 1, 2].
* [cite_start]Implement robust session management[cite: 1, 2].
* [cite_start]Add UI loading indicators and detailed error handling[cite: 1, 2].
* [cite_start]Develop a UI for human agent handoff[cite: 1, 2].
* [cite_start]Build out remaining Dashboard features[cite: 1, 2].
* [cite_start]Containerize the application using Docker[cite: 1, 2].
* [cite_start]Deploy to a cloud platform[cite: 1, 2].

---

*(Optional Sections)*

## 🤝 Contributing

Contributions are welcome! Please follow standard fork/pull request procedures.

## 📄 License

*(Specify your license, e.g., MIT)*
