import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { OpinionCard } from "@/components/OpinionSection";
import { Pagination } from "@/components/Pagination";
import { getColumnists, getOpinionArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Opinión",
  description: "Columnas, editoriales y análisis — CRÓNICA",
};

const PAGE_SIZE = 6;

type Props = { searchParams: Promise<{ page?: string }> };

export default async function OpinionPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const all = await getOpinionArticles(100);
  const totalPages = Math.ceil(all.length / PAGE_SIZE);
  const articles = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const columnists = await getColumnists();
  const byAuthor = new Map(columnists.map((c) => [c.name, c]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Editorial</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Opinión</h1>
        <p className="mt-2 text-muted">
          Columnas de analistas, editoriales y puntos de vista sobre la actualidad nacional e
          internacional.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columnists.map((col) => (
          <Link
            key={col.slug}
            href={`/autor/${col.slug}`}
            className="border border-line p-4 transition hover:border-accent"
          >
            <p className="font-display text-lg font-bold">{col.name}</p>
            <p className="mt-1 text-xs text-accent">{col.specialty}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{col.bio}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          {articles.map((article) => (
            <OpinionCard
              key={article.id}
              article={article}
              columnist={byAuthor.get(article.author.name)}
            />
          ))}
          <Pagination basePath="/opinion" currentPage={page} totalPages={totalPages} />
        </div>
        <aside className="space-y-6">
          <div className="border border-line p-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Destacadas</h2>
            <div className="mt-4 space-y-4">
              {all.slice(0, 3).map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
