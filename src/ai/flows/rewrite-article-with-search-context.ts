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
import * as cheerio from 'cheerio';

const RewriteArticleWithSearchContextInputSchema = z.object({
  title: z.string().describe('The title of the article to rewrite.'),
  content: z.string().describe('The content of the article to rewrite.'),
  serpApiKey: z.string().describe('The SerpApi API key.'),
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
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error fetching article for scraping', url, response.statusText);
      return '';
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    return $('article, main').text().trim().slice(0, 4000);
  } catch (e) {
    console.error('Error scraping article', url, e);
    return '';
  }
}

export async function rewriteArticleWithSearchContext(
  input: RewriteArticleWithSearchContextInput
): Promise<RewriteArticleWithSearchContextOutput> {
  return rewriteArticleWithSearchContextFlow(input);
}

const rewriteArticleWithSearchContextPrompt = ai.definePrompt({
  name: 'rewriteArticleWithSearchContextPrompt',
  input: {schema: z.object({
    title: z.string(),
    content: z.string(),
    content1: z.string(),
    content2: z.string(),
  })},
  output: {schema: RewriteArticleWithSearchContextOutputSchema},
  prompt: `You are a professional content editor.

Rewrite the following article using:
• Clear headings
• Short paragraphs
• SEO-friendly tone
• Human readability

DO NOT plagiarize.
Cite references naturally.

Original Article:
Title: {{{title}}}
Content:
{{{content}}}

Reference Article 1:
{{{content1}}}

Reference Article 2:
{{{content2}}}

Return clean HTML content for the rewritten article. Also list the URLs of the reference articles used.`,
});

const rewriteArticleWithSearchContextFlow = ai.defineFlow(
  {
    name: 'rewriteArticleWithSearchContextFlow',
    inputSchema: RewriteArticleWithSearchContextInputSchema,
    outputSchema: RewriteArticleWithSearchContextOutputSchema,
  },
  async input => {
    const searchUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(input.title)}&api_key=${input.serpApiKey}`;
    
    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      const errorBody = await searchResponse.text();
      console.error('SerpApi request failed:', searchResponse.status, errorBody);
      throw new Error(`SerpApi request failed with status ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    const links = searchData.organic_results
      .filter((r: any) => r.link.includes('blog') || r.snippet?.length > 200)
      .slice(0, 2)
      .map((r: any) => r.link);
    
    if (links.length < 2) {
      throw new Error('Could not find enough relevant articles to use as references.');
    }

    console.log('Found reference links:', links);

    const [content1, content2] = await Promise.all([
      scrapeArticle(links[0]),
      scrapeArticle(links[1]),
    ]);
    
    if (!content1 || !content2) {
      throw new Error('Failed to scrape content from one or more reference articles.');
    }

    console.log('Successfully scraped content. Generating rewritten article...');

    const {output} = await rewriteArticleWithSearchContextPrompt({
      title: input.title,
      content: input.content,
      content1,
      content2,
    });

    return {
      updatedContent: output!.updatedContent,
      referenceLinks: links,
    };
  }
);
