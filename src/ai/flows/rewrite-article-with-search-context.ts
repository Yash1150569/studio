'use server';
/**
 * @fileOverview Rewrites an article using insights from Google search results.
 *
 * - rewriteArticleWithSearchContext - A function that rewrites an article.
 * - RewriteArticleWithSearchContextInput - The input type for the rewriteArticleWithSearchContext function.
 * - RewriteArticleWithSearchContextOutput - The return type for the rewriteArticleWithSearchContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import axios from 'axios';
import * as cheerio from 'cheerio';

const RewriteArticleWithSearchContextInputSchema = z.object({
  title: z.string().describe('The title of the article to rewrite.'),
  content: z.string().describe('The content of the article to rewrite.'),
});

export type RewriteArticleWithSearchContextInput = z.infer<
  typeof RewriteArticleWithSearchContextInputSchema
>;

const RewriteArticleWithSearchContextOutputSchema = z.object({
  updatedContent: z.string().describe('The rewritten content of the article.'),
  referenceLinks: z.array(z.string()).describe('The links to the reference articles used for rewriting.'),
});

export type RewriteArticleWithSearchContextOutput = z.infer<
  typeof RewriteArticleWithSearchContextOutputSchema
>;

async function scrapeArticle(url: string): Promise<string> {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  return $('article').text();
}

export async function rewriteArticleWithSearchContext(
  input: RewriteArticleWithSearchContextInput
): Promise<RewriteArticleWithSearchContextOutput> {
  return rewriteArticleWithSearchContextFlow(input);
}

const rewriteArticleWithSearchContextPrompt = ai.definePrompt({
  name: 'rewriteArticleWithSearchContextPrompt',
  input: {schema: RewriteArticleWithSearchContextInputSchema},
  output: {schema: RewriteArticleWithSearchContextOutputSchema},
  prompt: `Rewrite the following article to improve structure, SEO, and clarity by taking inspiration from the two reference articles.\n\nOriginal:\n{{{content}}}\n\nReference 1:\n{{{content1}}}\n\nReference 2:\n{{{content2}}}\n\nReturn clean HTML content. Also list the URLs of the reference articles used.`,
});

const rewriteArticleWithSearchContextFlow = ai.defineFlow(
  {
    name: 'rewriteArticleWithSearchContextFlow',
    inputSchema: RewriteArticleWithSearchContextInputSchema,
    outputSchema: RewriteArticleWithSearchContextOutputSchema,
  },
  async input => {
    console.log('Checking for SERPAPI_API_KEY. Found:', !!process.env.SERPAPI_API_KEY);
    if (!process.env.SERPAPI_API_KEY) {
      throw new Error('The SERPAPI_API_KEY environment variable is not set. Please add it to your .env file to use the article revitalization feature.');
    }

    const search = await axios.get(
      `https://serpapi.com/search.json?q=${input.title}&api_key=${process.env.SERPAPI_API_KEY}`
    );

    const links = search.data.organic_results
      .filter((r: any) => r.type === 'organic')
      .slice(0, 2)
      .map((r: any) => r.link);

    const content1 = await scrapeArticle(links[0]);
    const content2 = await scrapeArticle(links[1]);

    const {output} = await rewriteArticleWithSearchContextPrompt({
      ...input,
      content1,
      content2,
    });

    return {
      updatedContent: output!.updatedContent,
      referenceLinks: links,
    };
  }
);
