import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { getAgoraArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Ágora",
  description: "Debate ciudadano y foros de opinión — CRÓNICA",
};

const PAGE_SIZE = 6;

type Props = { searchParams: Promise<{ page?: string }> };

export default async function AgoraPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const all = await getAgoraArticles(100);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const articles = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Foro ciudadano</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Ágora</h1>
        <p className="mt-2 text-muted">
          Espacio de debate donde ciudadanos, expertos y autoridades dialogan sobre los temas que
          mueven al país.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <Pagination basePath="/agora" currentPage={page} totalPages={totalPages} />
    </div>
  );
}
