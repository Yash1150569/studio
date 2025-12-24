'use server';

import { rewriteArticleWithSearchContext } from '@/ai/flows/rewrite-article-with-search-context';

export async function revitalizeArticle(title: string, content: string) {
  try {
    const result = await rewriteArticleWithSearchContext({ title, content });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error during article revitalization:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `AI revitalization failed. ${errorMessage}` };
  }
}
