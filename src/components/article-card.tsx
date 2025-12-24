import Link from "next/link";
import type { Article } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div
            className="text-sm text-muted-foreground line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4">
          <Badge variant={article.is_updated ? "default" : "secondary"} className={article.is_updated ? "bg-accent text-accent-foreground border-accent" : ""}>
            {article.is_updated ? "AI-Updated" : "Original"}
          </Badge>
          <div className="flex items-center text-sm text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Article
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
