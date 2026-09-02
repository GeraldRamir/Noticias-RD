import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { SearchBar } from "@/components/SearchBar";
import { POPULAR_SEARCHES } from "@/lib/mock-data";
import { getCategories, getTags, searchArticles } from "@/lib/queries";
import { getMostReadArticles } from "@/lib/recommendations";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busca noticias en CRÓNICA",
};

type Props = { searchParams: Promise<{ q?: string; categoria?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", categoria = "" } = await searchParams;
  const query = q.trim();
  const [results, trending, categories, tags] = await Promise.all([
    query ? searchArticles(query, categoria || undefined) : Promise.resolve([]),
    getMostReadArticles(5),
    getCategories(),
    getTags(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Archivo</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Buscar</h1>
        <p className="mt-2 text-muted">
          Encuentra noticias por título, resumen, contenido o etiqueta.
        </p>
      </div>

      <div className="max-w-xl">
        <SearchBar initial={q} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="self-center text-xs font-bold uppercase tracking-wide text-muted">Filtrar:</span>
        <Link
          href={query ? `/buscar?q=${encodeURIComponent(query)}` : "/buscar"}
          className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
            !categoria ? "border-accent bg-accent text-white" : "border-line hover:border-accent hover:text-accent"
          }`}
        >
          Todas
        </Link>
        {categories.slice(0, 8).map((cat) => (
          <Link
            key={cat.slug}
            href={
              query
                ? `/buscar?q=${encodeURIComponent(query)}&categoria=${cat.slug}`
                : `/categoria/${cat.slug}`
            }
            className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
              categoria === cat.slug
                ? "border-accent bg-accent text-white"
                : "border-line hover:border-accent hover:text-accent"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {query ? (
        <div className="mt-10">
          <p className="mb-6 text-sm text-muted">
            {results.length} resultado{results.length === 1 ? "" : "s"} para &ldquo;{query}&rdquo;
            {categoria && ` en ${categories.find((c) => c.slug === categoria)?.name}`}
          </p>
          <div>
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
            {results.length === 0 && (
              <div className="border border-line bg-paper-soft p-8 text-center">
                <p className="text-muted">No encontramos noticias con ese criterio.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <Link
                      key={term}
                      href={`/buscar?q=${encodeURIComponent(term)}`}
                      className="border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-wide hover:border-accent hover:text-accent"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Búsquedas populares
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/buscar?q=${encodeURIComponent(term)}`}
                  className="border border-line px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Etiquetas</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/etiqueta/${tag.slug}`}
                  className="border border-line px-3 py-1.5 text-xs hover:border-accent hover:text-accent"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Lo más leído</h2>
            <ol className="mt-4 space-y-3">
              {trending.map((article, i) => (
                <li key={article.id} className="flex gap-3 text-sm">
                  <span className="font-display text-lg font-bold text-accent/50">{i + 1}</span>
                  <Link href={`/noticia/${article.slug}`} className="hover:text-accent">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
