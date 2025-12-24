# **App Name**: BeyondChats AI Revitalizer

## Core Features:

- Article Scraper: Scrape the 5 oldest articles from BeyondChats using Laravel and Guzzle HTTP Client.
- Article Database: Store scraped articles in a MySQL database with fields for title, content, source URL, and update status.
- CRUD APIs: Implement CRUD APIs in Laravel for managing articles.
- AI-Powered Article Rewrite: Rewrite articles to improve structure, SEO, and clarity using the LLM as a tool, drawing inspiration from top search results.
- Google Search Integration: Integrate Google Search (via SerpAPI or Google Custom Search) to find relevant articles for content inspiration.
- Content Scraping from Search Results: Scrape content from the top 2 search results to use as reference material for rewriting.
- Frontend Article Display: Display articles in a React frontend, indicating whether each article has been updated by AI.

## Style Guidelines:

- Primary color: Saturated blue (#29ABE2) for a tech-forward, intelligent feel, evoking clarity and trust.
- Background color: Light blue (#D6EAEE), desaturated for a clean, professional look that complements the primary color.
- Accent color: Light green (#B7E4C7), an analogous hue to the primary blue for highlighting calls to action or new updates.
- Body and headline font: 'Inter', a grotesque-style sans-serif providing a modern, objective, and neutral feel suitable for both headlines and body text.
- Use a CSS Grid layout to display articles in a responsive, card-based UI.
- Subtle animations for loading new content and highlighting updated articles.