'use server';
/**
 * @fileOverview Rewrites an article using its original content.
 *
 * - rewriteArticleWithSearchContext - A function that rewrites an article.
 * - RewriteArticleWithSearchContextInput - The input type for the rewriteArticleWithSearchContext function.
 * - RewriteArticleWithSearchContextOutput - The return type for the rewriteArticleWithSearchContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteArticleWithSearchContextInputSchema = z.object({
  title: z.string().describe('The title of the article to rewrite.'),
  content: z.string().describe('The content of the article to rewrite.'),
});

export type RewriteArticleWithSearchContextInput = z.infer<
  typeof RewriteArticleWithSearchContextInputSchema
>;

const RewriteArticleWithSearchContextOutputSchema = z.object({
  updatedContent: z.string().describe('The rewritten content of the article.'),
});

export type RewriteArticleWithSearchContextOutput = z.infer<
  typeof RewriteArticleWithSearchContextOutputSchema
>;

export async function rewriteArticleWithSearchContext(
  input: RewriteArticleWithSearchContextInput
): Promise<RewriteArticleWithSearchContextOutput> {
  return rewriteArticleWithSearchContextFlow(input);
}

const rewriteArticleWithSearchContextPrompt = ai.definePrompt({
  name: 'rewriteArticleWithSearchContextPrompt',
  input: {schema: RewriteArticleWithSearchContextInputSchema},
  output: {schema: RewriteArticleWithSearchContextOutputSchema},
  prompt: `You are a professional content editor.

Rewrite the following article using:
• Clear headings
• Short paragraphs
• SEO-friendly tone
• Human readability

DO NOT plagiarize.

Original Article:
Title: {{{title}}}
Content:
{{{content}}}

Return clean HTML content for the rewritten article.`,
});

const rewriteArticleWithSearchContextFlow = ai.defineFlow(
  {
    name: 'rewriteArticleWithSearchContextFlow',
    inputSchema: RewriteArticleWithSearchContextInputSchema,
    outputSchema: RewriteArticleWithSearchContextOutputSchema,
  },
  async input => {
    console.log('Generating rewritten article...');

    const {output} = await rewriteArticleWithSearchContextPrompt(input);

    return {
      updatedContent: output!.updatedContent,
    };
  }
);
