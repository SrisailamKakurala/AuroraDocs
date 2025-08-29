# 📚 Doc Intelligence App - Project Documentation

## 🚀 Overview

The **Doc Intelligence App** is an AI-powered application built using **ReactJS (frontend)**, **FastAPI (backend)**, and **AI models** (Gemini, IBM Granite, or other LLMs). It helps students and faculty interact with documents (PDFs, DOCX, or text input), generate comprehensive notes, create question papers, and much more.

This app aims to be a **one-stop academic assistant** by supporting:

* Single & multi-document chat (with text + speech recognition)
* Notes generation (and chat with generated notes)
* Mindmap creation
* Question paper & flashcard generation
* Translation of notes
* Faculty tools like lesson plan generation

---

## 🎯 Key Features

### 1. **Single Doc Chat**

* Upload one document (PDF/DOCX).
* Ask questions via **text or speech input**.
* AI provides contextual answers with references.

### 2. **Multi Doc Chat**

* Upload multiple documents.
* AI generates a **consolidated/common answer** if content overlaps.

### 3. **Notes Generator**

* Input options:

  * Upload a **syllabus doc**.
  * Upload a **chapter doc/text**.
  * Enter a **topic text** manually.
* Generate structured notes with:

  * Headings, sub-sections, bullet points.
  * Different summarization modes (executive, detailed, cheat-sheet).
* **💬 Chat with Generated Notes** → AI stores the notes in memory (vector DB) and allows Q\&A with the generated content.
* Export notes in multiple formats.

### 4. **Mindmap Generator**

* Convert syllabus/notes into a **visual mindmap**.
* Display relationships between topics.
* Useful for revision and teaching.

### 5. **Question Paper Generator**

* From syllabus/notes/docs, generate:

  * **Quiz Mode** → MCQs, short answers.
  * **Flashcards** → For quick student revision.
  * Full exam-style question paper.

### 6. **Translate Notes**

* Convert generated notes into multiple languages.
* Helps with accessibility for regional learners.

### 7. **Lesson Plan Generator (Faculty Mode)**

* Upload syllabus or docs.
* AI creates a structured **lesson plan** with timelines.
* Option to export as PPT/PDF.

### 8. **Other Features**

* Speech-to-text support in chat modes.
* Export notes and Q\&A to **PDF/DOCX/Markdown**.
* Theming (Light/Dark mode).
* Profile management & logout.

