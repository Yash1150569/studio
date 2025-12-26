# BeyondChats AI Article Revitalizer

> Breathe new life into your content.

This is a web application built with Next.js that allows users to take existing articles and "revitalize" them using the power of Generative AI. The AI rewrites the content to be more engaging, readable, and SEO-friendly. The project was built as a demonstration of modern web development and AI integration skills.

## Features

*   **Article Listing:** View a list of articles from a mock data source.
*   **Article View:** Click on an article to read its full content.
*   **AI Revitalization:** On an article page, click the "Revitalize with AI" button to have a Genkit-powered AI flow rewrite the content.
*   **Visual Feedback:** The UI clearly distinguishes between original and AI-updated content using badges.
*   **Modern UI/UX:** A clean, responsive interface built with ShadCN UI and Tailwind CSS, featuring custom animations and a unique cursor for a polished user experience.
*   **Loading States:** The application provides clear loading indicators while the AI is processing the article.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **AI Integration:** [Google AI Studio (Genkit)](https://ai.google.dev/genkit)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) (version 18 or later) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### Running the Application

This application requires running two separate processes: the Next.js frontend server and the Genkit AI development server.

1.  **Start the Genkit AI server:**
    In a terminal, run the following command to start the Genkit development server, which handles the AI flows.
    ```bash
    npm run genkit:watch
    ```

2.  **Start the Next.js server:**
    In a separate terminal, run the following command to start the Next.js frontend application.
    ```bash
    npm run dev
    ```

3.  **Open the application:**
    Open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.
