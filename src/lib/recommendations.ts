import { cookies } from "next/headers";
import { getPublishedArticles } from "@/lib/queries";

const VISITOR_COOKIE = "cronica_vid";

export async function getVisitorIdFromCookies() {
  const jar = await cookies();
  return jar.get(VISITOR_COOKIE)?.value ?? null;
}

function sortByViews<T extends { views: number; publishedAt: Date | null }>(articles: T[]) {
  return [...articles].sort((a, b) => {
    if (b.views !== a.views) return b.views - a.views;
    return (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0);
  });
}

export async function getMostReadArticles(take = 5) {
  const all = await getPublishedArticles(100);
  return sortByViews(all).slice(0, take);
}

export async function getRecommendedArticles(_visitorId: string | null, take = 6) {
  const jar = await cookies();
  const history = jar.get("cronica_history")?.value;
  const all = await getPublishedArticles(100);

  if (!history) {
    return getMostReadArticles(take);
  }

  const preferredSlugs = history.split(",").filter(Boolean);
  const now = Date.now();

  const scored = all
    .map((article) => {
      const categoryBoost = preferredSlugs.includes(article.category.slug) ? 4 : 0;
      const viewsScore = Math.log10(article.views + 1) * 2;
      const ageDays = article.publishedAt
        ? Math.max((now - article.publishedAt.getTime()) / (1000 * 60 * 60 * 24), 0)
        : 30;
      const recency = (Math.max(0, 14 - ageDays) / 14) * 3;
      const score = categoryBoost + viewsScore + recency;
      return { article, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((row) => row.article);

  return scored.slice(0, take);
}

export async function getViewsLastDays(_days = 7) {
  const all = await getPublishedArticles(100);
  return all.reduce((sum, a) => sum + a.views, 0);
}

export async function getTopArticlesByViews(take = 8) {
  return getMostReadArticles(take);
}
