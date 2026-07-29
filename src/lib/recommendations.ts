import { cookies } from "next/headers";
import { ArticleStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const VISITOR_COOKIE = "cronica_vid";

export async function getVisitorIdFromCookies() {
  const jar = await cookies();
  return jar.get(VISITOR_COOKIE)?.value ?? null;
}

export async function getMostReadArticles(take = 5) {
  return prisma.article.findMany({
    where: { status: ArticleStatus.PUBLISHED },
    include: { category: true, author: { select: { name: true } } },
    orderBy: [{ views: "desc" }, { publishedAt: "desc" }],
    take,
  });
}

/**
 * Personalized feed:
 * 1) Top categories the visitor clicked most (30 days)
 * 2) Score = categoryAffinity*4 + log(views+1)*2 + recencyBoost
 * 3) Soft-exclude articles already viewed in last 7 days
 * 4) Fallback to global most-read
 */
export async function getRecommendedArticles(visitorId: string | null, take = 6) {
  const publishedInclude = {
    category: true,
    author: { select: { name: true } },
  } as const;

  if (!visitorId) {
    return getMostReadArticles(take);
  }

  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
  const recentViews = await prisma.articleView.findMany({
    where: { visitorId, createdAt: { gte: since } },
    select: { articleId: true, categoryId: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  if (!recentViews.length) {
    return getMostReadArticles(take);
  }

  const categoryScores = new Map<string, number>();
  const viewedIds = new Set<string>();
  for (const view of recentViews) {
    viewedIds.add(view.articleId);
    categoryScores.set(view.categoryId, (categoryScores.get(view.categoryId) || 0) + 1);
  }

  const topCategories = [...categoryScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);

  const candidates = await prisma.article.findMany({
    where: {
      status: ArticleStatus.PUBLISHED,
      OR: [
        { categoryId: { in: topCategories } },
        { views: { gt: 0 } },
      ],
    },
    include: publishedInclude,
    orderBy: { publishedAt: "desc" },
    take: 40,
  });

  const now = Date.now();
  const scored = candidates
    .map((article) => {
      const affinity = categoryScores.get(article.categoryId) || 0;
      const viewsScore = Math.log10((article.views || 0) + 1);
      const ageDays = article.publishedAt
        ? Math.max((now - article.publishedAt.getTime()) / (1000 * 60 * 60 * 24), 0)
        : 30;
      const recency = Math.max(0, 14 - ageDays) / 14;
      const alreadyReadPenalty = viewedIds.has(article.id) ? 0.35 : 1;
      const score = (affinity * 4 + viewsScore * 2 + recency * 3) * alreadyReadPenalty;
      return { article, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((row) => row.article);

  const unique = scored.filter(
    (article, index, arr) => arr.findIndex((a) => a.id === article.id) === index
  );

  if (unique.length < take) {
    const fallback = await getMostReadArticles(take * 2);
    for (const article of fallback) {
      if (!unique.some((u) => u.id === article.id)) unique.push(article);
      if (unique.length >= take) break;
    }
  }

  return unique.slice(0, take);
}

export async function getViewsLastDays(days = 7) {
  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * days);
  return prisma.articleView.count({ where: { createdAt: { gte: since } } });
}

export async function getTopArticlesByViews(take = 8) {
  return prisma.article.findMany({
    where: { status: ArticleStatus.PUBLISHED },
    include: { category: true, author: { select: { name: true } } },
    orderBy: { views: "desc" },
    take,
  });
}
