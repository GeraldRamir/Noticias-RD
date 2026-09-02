import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import type { MockArticle } from "@/lib/mock-data";

type CategorySectionProps = {
  name: string;
  slug: string;
  color: string;
  articles: MockArticle[];
};

export function CategorySection({ name, slug, color, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-block h-8 w-1" style={{ backgroundColor: color }} />
          <h2 className="font-display text-2xl font-bold md:text-3xl">{name}</h2>
        </div>
        <Link
          href={`/categoria/${slug}`}
          className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:underline"
        >
          Ver todo
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
