import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { SearchBar } from "@/components/SearchBar";
import { searchArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busca noticias en CRÓNICA",
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const results = q.trim() ? await searchArticles(q.trim()) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Buscar</h1>
      <div className="mt-6 max-w-xl">
        <SearchBar initial={q} />
      </div>

      {q.trim() ? (
        <div className="mt-10">
          <p className="mb-6 text-sm text-muted">
            {results.length} resultado{results.length === 1 ? "" : "s"} para &ldquo;{q}&rdquo;
          </p>
          <div>
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
            {results.length === 0 && (
              <p className="text-muted">No encontramos noticias con ese criterio.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-8 text-muted">Escribe un término para buscar noticias.</p>
      )}
    </div>
  );
}
