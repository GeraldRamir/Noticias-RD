import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getLatestHourArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Última hora",
  description: "Noticias de última hora — CRÓNICA",
};

export default async function UltimaHoraPage() {
  const articles = await getLatestHourArticles(20);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-accent bg-accent px-6 py-4 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.25em]">En vivo</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Última hora</h1>
        <p className="mt-2 opacity-90">
          Cobertura continua de los hechos más recientes del día.
        </p>
      </div>

      <div>
        {articles.map((article, i) => (
          <article key={article.id} className="relative border-b border-line py-5 pl-8">
            <span className="absolute left-0 top-6 font-display text-lg font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ArticleCard article={article} variant="horizontal" />
          </article>
        ))}
      </div>
    </div>
  );
}
