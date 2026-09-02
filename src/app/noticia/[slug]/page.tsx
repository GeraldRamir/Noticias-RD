import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CommentForm } from "@/components/CommentForm";
import { BannerAd } from "@/components/BannerAd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TagList } from "@/components/TagList";
import { TrackArticleView } from "@/components/TrackArticleView";
import { ArticleCard } from "@/components/ArticleCard";
import {
  getActiveBanners,
  getAdjacentArticles,
  getArticleBySlug,
  getArticlesByTag,
  getColumnists,
} from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import {
  getRecommendedArticles,
  getVisitorIdFromCookies,
} from "@/lib/recommendations";

type Props = { params: Promise<{ slug: string }> };

function estimateReadingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Noticia no encontrada" };
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || undefined,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt || undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const visitorId = await getVisitorIdFromCookies();
  const primaryTag = article.tags[0];
  const [banners, related, adjacent, tagRelated, columnists] = await Promise.all([
    getActiveBanners("ARTICLE"),
    getRecommendedArticles(visitorId, 4),
    getAdjacentArticles(slug),
    primaryTag ? getArticlesByTag(primaryTag, 4) : Promise.resolve([]),
    getColumnists(),
  ]);

  const columnist = columnists.find((c) => c.name === article.author.name);
  const relatedFiltered = related.filter((a) => a.id !== article.id).slice(0, 3);
  const tagRelatedFiltered = tagRelated.filter((a) => a.id !== article.id).slice(0, 3);
  const readingTime = estimateReadingTime(article.content);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/noticia/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt?.toISOString(),
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: "CRÓNICA" },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackArticleView articleId={article.id} categoryId={article.categoryId} />

      <Breadcrumbs
        items={[
          { label: article.category.name, href: `/categoria/${article.category.slug}` },
          { label: article.title },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <Link
          href={`/categoria/${article.category.slug}`}
          className="text-xs font-bold uppercase tracking-[0.2em] text-accent"
        >
          {article.category.name}
        </Link>
        <h1 className="font-display mt-3 text-4xl font-bold leading-tight md:text-5xl animate-fade-up">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-lg text-muted animate-fade-up delay-1">{article.excerpt}</p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-line py-3 text-sm text-muted">
          {columnist ? (
            <Link href={`/autor/${columnist.slug}`} className="font-semibold text-ink hover:text-accent">
              {article.author.name}
            </Link>
          ) : (
            <span className="font-semibold text-ink">{article.author.name}</span>
          )}
          <span>·</span>
          <time>{formatDate(article.publishedAt)}</time>
          <span>·</span>
          <span>{readingTime} min de lectura</span>
          <span>·</span>
          <span>{article.views.toLocaleString("es-DO")} lecturas</span>
        </div>
        {article.tags.length > 0 && (
          <div className="mt-4">
            <TagList tags={article.tags} />
          </div>
        )}
      </div>

      {article.coverImage && (
        <div className="relative mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden animate-fade-up delay-2">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 900px"
          />
        </div>
      )}

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <div
            className="prose-article mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mx-auto mt-10 max-w-3xl border border-line bg-paper-soft p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Compartir</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                X
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {(adjacent.prev || adjacent.next) && (
            <nav className="mx-auto mt-10 grid max-w-3xl gap-4 border border-line sm:grid-cols-2">
              {adjacent.prev && (
                <Link href={`/noticia/${adjacent.prev.slug}`} className="p-4 hover:bg-paper-soft">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted">← Anterior</p>
                  <p className="mt-1 text-sm font-semibold leading-snug">{adjacent.prev.title}</p>
                </Link>
              )}
              {adjacent.next && (
                <Link
                  href={`/noticia/${adjacent.next.slug}`}
                  className="border-t border-line p-4 text-right hover:bg-paper-soft sm:border-t-0 sm:border-l"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted">Siguiente →</p>
                  <p className="mt-1 text-sm font-semibold leading-snug">{adjacent.next.title}</p>
                </Link>
              )}
            </nav>
          )}

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold">
              Comentarios ({article.comments.length})
            </h2>
            <div className="mb-8 space-y-4">
              {article.comments.length === 0 && (
                <p className="text-sm text-muted">Sé el primero en comentar.</p>
              )}
              {article.comments.map((c) => (
                <div key={c.id} className="border border-line p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{c.authorName}</p>
                    <time className="text-xs text-muted">{formatDate(c.createdAt)}</time>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{c.content}</p>
                </div>
              ))}
            </div>
            <CommentForm articleId={article.id} />
          </section>

          {tagRelatedFiltered.length > 0 && (
            <section className="mx-auto mt-14 max-w-3xl">
              <h2 className="font-display mb-6 text-2xl font-bold">Más sobre #{primaryTag}</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {tagRelatedFiltered.map((item) => (
                  <ArticleCard key={item.id} article={item} />
                ))}
              </div>
            </section>
          )}

          {relatedFiltered.length > 0 && (
            <section className="mx-auto mt-14 max-w-3xl">
              <h2 className="font-display mb-6 text-2xl font-bold">También te puede interesar</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedFiltered.map((item) => (
                  <ArticleCard key={item.id} article={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-line p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Sobre el autor</h3>
            {columnist ? (
              <>
                <Link href={`/autor/${columnist.slug}`} className="mt-3 block font-semibold hover:text-accent">
                  {columnist.name}
                </Link>
                <p className="mt-2 text-sm text-muted">{columnist.bio}</p>
              </>
            ) : (
              <>
                <p className="mt-3 font-semibold">{article.author.name}</p>
                <p className="mt-2 text-sm text-muted">
                  Periodista de CRÓNICA especializado en {article.category.name.toLowerCase()}.
                </p>
              </>
            )}
          </div>

          <div className="border border-line p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Sección</h3>
            <Link
              href={`/categoria/${article.category.slug}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold hover:text-accent"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: article.category.color }}
              />
              Más en {article.category.name}
            </Link>
          </div>

          {banners[0] && <BannerAd banner={banners[0]} variant="article" />}
        </aside>
      </div>
    </article>
  );
}
