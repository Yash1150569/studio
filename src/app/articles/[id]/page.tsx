import { getArticleById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ArticlePageProps = {
  params: {
    id: string;
  };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  const articleId = parseInt(params.id, 10);
  const article = getArticleById(articleId);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pb-12">
       <header className="py-6">
        <Button asChild variant="ghost" className="text-muted-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </header>
      <main>
        <ArticleView article={article} />
      </main>
    </div>
  );
}
