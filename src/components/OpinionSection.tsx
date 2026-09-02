import Image from "next/image";
import Link from "next/link";
import type { Columnist } from "@/lib/portal-data";
import type { MockArticle } from "@/lib/mock-data";

export function OpinionCard({
  article,
  columnist,
}: {
  article: MockArticle;
  columnist?: Columnist;
}) {
  return (
    <article className="group flex gap-4 border-b border-line py-5 last:border-0">
      {columnist && (
        <Link href={`/autor/${columnist.slug}`} className="shrink-0">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-line">
            <Image
              src={columnist.avatar}
              alt={columnist.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </Link>
      )}
      <div>
        <Link
          href={`/autor/${columnist?.slug ?? "#"}`}
          className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent"
        >
          {article.author.name}
        </Link>
        <h3 className="font-display mt-1 text-lg font-bold leading-snug">
          <Link href={`/noticia/${article.slug}`} className="transition hover:text-accent">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
        )}
      </div>
    </article>
  );
}

export function OpinionSection({
  articles,
  columnists,
}: {
  articles: MockArticle[];
  columnists: Columnist[];
}) {
  const byAuthor = new Map(columnists.map((c) => [c.name, c]));

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Opinión</h2>
          <p className="mt-1 text-sm text-muted">Columnas, editoriales y análisis de fondo</p>
        </div>
        <Link
          href="/opinion"
          className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:underline"
        >
          Ver todo
        </Link>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {articles.slice(0, 4).map((article) => (
          <OpinionCard
            key={article.id}
            article={article}
            columnist={byAuthor.get(article.author.name)}
          />
        ))}
      </div>
    </section>
  );
}
