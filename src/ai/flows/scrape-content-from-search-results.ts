'use server';
/**
 * @fileOverview This file defines a Genkit flow for scraping content from the top 2 Google search results related to an article.
 *
 * - scrapeContentFromSearchResults - A function that handles the process of scraping content from search results.
 * - ScrapeContentFromSearchResultsInput - The input type for the scrapeContentFromSearchResults function.
 * - ScrapeContentFromSearchResultsOutput - The return type for the scrapeContentFromSearchResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import axios from 'axios';
import * as cheerio from 'cheerio';

const ScrapeContentFromSearchResultsInputSchema = z.object({
  articleTitle: z.string().describe('The title of the article to search for on Google.'),
});
export type ScrapeContentFromSearchResultsInput = z.infer<typeof ScrapeContentFromSearchResultsInputSchema>;

const ScrapeContentFromSearchResultsOutputSchema = z.object({
  content1: z.string().describe('The content scraped from the first search result.'),
  content2: z.string().describe('The content scraped from the second search result.'),
});
export type ScrapeContentFromSearchResultsOutput = z.infer<typeof ScrapeContentFromSearchResultsOutputSchema>;

async function scrapeArticle(url: string): Promise<string> {
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    //console.log($('article').text());
    return $('article').text();
  } catch (e) {
    console.error('Error scraping article', e);
    return '';
  }
}


export async function scrapeContentFromSearchResults(
  input: ScrapeContentFromSearchResultsInput
): Promise<ScrapeContentFromSearchResultsOutput> {
  return scrapeContentFromSearchResultsFlow(input);
}

const ScrapeContentFromSearchResultsFlow = ai.defineFlow(
  {
    name: 'scrapeContentFromSearchResultsFlow',
    inputSchema: ScrapeContentFromSearchResultsInputSchema,
    outputSchema: ScrapeContentFromSearchResultsOutputSchema,
  },
  async input => {
    console.log('Checking for SERPAPI_API_KEY. Found:', !!process.env.SERPAPI_API_KEY);
    if (!process.env.SERPAPI_API_KEY) {
      throw new Error('The SERPAPI_API_KEY environment variable is not set. Please add it to your .env file to use the article revitalization feature.');
    }
    
    const search = await axios.get(
      `https://serpapi.com/search.json?q=${input.articleTitle}&api_key=${process.env.SERPAPI_API_KEY}`
    );

    const links = search.data.organic_results
      .filter((r: any) => r.type === 'organic')
      .slice(0, 2)
      .map((r: any) => r.link);

    const content1 = await scrapeArticle(links[0]);
    const content2 = await scrapeArticle(links[1]);

    return {
      content1: content1,
      content2: content2,
    };
  }
);
