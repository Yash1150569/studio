import { config } from 'dotenv';
config();

import '@/ai/flows/scrape-content-from-search-results.ts';
import '@/ai/flows/rewrite-article-with-search-context.ts';