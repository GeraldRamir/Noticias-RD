import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import type { MockArticle } from "@/lib/mock-data";

export function AgoraSection({ articles }: { articles: MockArticle[] }) {
  if (!articles.length) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Ágora</h2>
          <p className="mt-1 text-sm text-muted">Debate ciudadano y foros de opinión</p>
        </div>
        <Link href="/agora" className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:underline">
          Ver foros
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
