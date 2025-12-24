import { getArticles } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { ArticleCard } from "@/components/article-card";

export default function Home() {
  const articles = getArticles();

  return (
    <div className="container mx-auto px-4 pb-12">
      <PageHeader
        title="BeyondChats AI Revitalizer"
        subtitle="Scraped articles ready for an AI-powered upgrade."
      />
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </main>
    </div>
  );
}
