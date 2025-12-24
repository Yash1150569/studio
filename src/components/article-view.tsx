"use client";

import { useState } from 'react';
import type { Article } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { revitalizeArticle } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

export function ArticleView({ article }: { article: Article }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(article);
  const { toast } = useToast();

  const handleRevitalize = async () => {
    setIsUpdating(true);
    const result = await revitalizeArticle(currentArticle.title, currentArticle.content);

    if (result.success && result.data) {
      const referenceHtml = `
        <h3 class="mt-8 text-xl font-semibold border-b pb-2 mb-4">References</h3>
        <ul class="list-disc pl-5 mt-2 space-y-2">
          ${result.data.referenceLinks.map(link => `<li><a href="${link}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">${link}</a></li>`).join('')}
        </ul>
      `;

      setCurrentArticle({
        ...currentArticle,
        content: result.data.updatedContent + referenceHtml,
        is_updated: true,
      });
      toast({
        title: 'Article Revitalized!',
        description: 'The article has been successfully updated with AI-powered insights.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: result.error || 'Could not revitalize the article.',
      });
    }
    setIsUpdating(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-foreground">{currentArticle.title}</h1>
            <Badge variant={currentArticle.is_updated ? "default" : "secondary"} className={currentArticle.is_updated ? "bg-accent text-accent-foreground border-accent" : ""}>
              {currentArticle.is_updated ? "AI-Updated" : "Original"}
            </Badge>
          </div>
          {!currentArticle.is_updated && (
            <Button onClick={handleRevitalize} disabled={isUpdating} size="lg">
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Revitalizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Revitalize with AI
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 relative">
        {isUpdating && (
           <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10">
             <Loader2 className="h-12 w-12 animate-spin text-primary" />
             <p className="mt-4 text-muted-foreground font-medium">AI is rewriting the article...</p>
             <p className="text-sm text-muted-foreground">This may take a moment.</p>
           </div>
        )}
        <div
          className={`prose prose-lg dark:prose-invert max-w-none transition-opacity duration-300 ${isUpdating ? 'opacity-20 blur-sm' : 'opacity-100'}`}
          dangerouslySetInnerHTML={{ __html: currentArticle.content }}
        />
      </CardContent>
    </Card>
  );
}
