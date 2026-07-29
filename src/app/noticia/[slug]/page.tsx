import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CommentForm } from "@/components/CommentForm";
import { BannerAd } from "@/components/BannerAd";
import { TrackArticleView } from "@/components/TrackArticleView";
import { ArticleCard } from "@/components/ArticleCard";
import { getActiveBanners, getArticleBySlug } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import {
  getRecommendedArticles,
  getVisitorIdFromCookies,
} from "@/lib/recommendations";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

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
  const [banners, related] = await Promise.all([
    getActiveBanners("ARTICLE"),
    getRecommendedArticles(visitorId, 4),
  ]);

  const relatedFiltered = related.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <TrackArticleView articleId={article.id} categoryId={article.categoryId} />

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
          <span className="font-semibold text-ink">{article.author.name}</span>
          <span>·</span>
          <time>{formatDate(article.publishedAt)}</time>
          <span>·</span>
          <span>{article.views} lecturas</span>
        </div>
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
          {banners[0] && <BannerAd banner={banners[0]} className="aspect-[3/4] w-full" />}
        </aside>
      </div>
    </article>
  );
}
