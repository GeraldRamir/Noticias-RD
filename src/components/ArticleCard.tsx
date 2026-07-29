import Image from "next/image";
import Link from "next/link";
import { formatDate, formatRelative } from "@/lib/utils";

type ArticleCardProps = {
  article: {
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    category: { name: string; slug: string; color: string };
    author: { name: string };
  };
  variant?: "featured" | "horizontal" | "compact";
};

export function ArticleCard({ article, variant = "compact" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden bg-ink text-white animate-fade-up">
        <Link href={`/noticia/${article.slug}`} className="block">
          <div className="relative aspect-[16/10] md:aspect-[21/9]">
            {article.coverImage ? (
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-ink-soft" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: article.category.color || "#E10600" }}
              >
                {article.category.name}
              </span>
              <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">{article.excerpt}</p>
              )}
              <p className="mt-4 text-xs uppercase tracking-wider text-white/60">
                {article.author.name} · {formatRelative(article.publishedAt)}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group grid gap-4 border-b border-line py-5 sm:grid-cols-[180px_1fr] animate-fade-up">
        <Link href={`/noticia/${article.slug}`} className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="180px"
            />
          )}
        </Link>
        <div>
          <Link
            href={`/categoria/${article.category.slug}`}
            className="text-xs font-bold uppercase tracking-[0.18em] text-accent"
          >
            {article.category.name}
          </Link>
          <h3 className="font-display mt-1 text-xl font-bold leading-snug">
            <Link href={`/noticia/${article.slug}`} className="transition hover:text-accent">
              {article.title}
            </Link>
          </h3>
          {article.excerpt && <p className="mt-2 text-sm text-muted line-clamp-2">{article.excerpt}</p>}
          <p className="mt-3 text-xs text-muted">
            {article.author.name} · {formatDate(article.publishedAt)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group animate-fade-up">
      <Link href={`/noticia/${article.slug}`} className="relative mb-3 block aspect-[16/10] overflow-hidden bg-paper-soft">
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        )}
      </Link>
      <Link
        href={`/categoria/${article.category.slug}`}
        className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent"
      >
        {article.category.name}
      </Link>
      <h3 className="font-display mt-1 text-lg font-bold leading-snug">
        <Link href={`/noticia/${article.slug}`} className="transition hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-xs text-muted">{formatRelative(article.publishedAt)}</p>
    </article>
  );
}
