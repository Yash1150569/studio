import type { Article } from './types';

const articles: Article[] = [
  {
    id: 1,
    title: 'Getting Started with Laravel Queues',
    content:
      '<p>Laravel queues provide a unified API across a variety of different queue backends, such as Amazon SQS, Redis, or even a relational database. This article will walk you through the basics of setting up and using Laravel queues to offload time-consuming tasks.</p>',
    source_url: 'https://beyondchats.com/blog/getting-started-with-laravel-queues',
    is_updated: false,
    created_at: '2023-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'A Deep Dive into React Hooks',
    content:
      '<p>React Hooks have revolutionized how we write functional components. They let you use state and other React features without writing a class. We will explore useState, useEffect, and useContext in depth, with practical examples to solidify your understanding.</p>',
    source_url: 'https://beyondchats.com/blog/deep-dive-into-react-hooks',
    is_updated: true,
    created_at: '2023-02-20T14:30:00Z',
  },
  {
    id: 3,
    title: 'Optimizing Performance in Next.js Applications',
    content:
      '<p>Next.js is powerful, but a large application can suffer from performance issues if not optimized correctly. This guide covers several key strategies for making your Next.js app faster, including code splitting, image optimization, and static site generation.</p>',
    source_url: 'https://beyondchats.com/blog/optimizing-nextjs-performance',
    is_updated: false,
    created_at: '2023-03-10T09:00:00Z',
  },
  {
    id: 4,
    title: 'Building a REST API with Node.js and Express',
    content:
      '<p>Learn how to build a robust and scalable REST API from scratch using Node.js and the Express framework. We will cover routing, middleware, and connecting to a MongoDB database with Mongoose for a complete backend solution.</p>',
    source_url: 'https://beyondchats.com/blog/nodejs-express-api',
    is_updated: false,
    created_at: '2023-04-05T18:00:00Z',
  },
  {
    id: 5,
    title: 'Advanced CSS Grid Layouts',
    content:
      '<p>Go beyond the basics of CSS Grid. This tutorial explores advanced techniques like using minmax(), auto-fit, and creating complex, responsive layouts that were once difficult to achieve with CSS alone.</p>',
    source_url: 'https://beyondchats.com/blog/advanced-css-grid',
    is_updated: false,
    created_at: '2023-05-01T11:45:00Z',
  },
];

export function getArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getArticleById(id: number): Article | undefined {
  return articles.find((article) => article.id === id);
}
