import { prisma } from "@/lib/prisma";
import { ArticleStatus } from "@prisma/client";

export async function getPublishedArticles(take = 20, skip = 0) {
  return prisma.article.findMany({
    where: { status: ArticleStatus.PUBLISHED },
    include: { category: true, author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    take,
    skip,
  });
}

export async function getSliderArticles() {
  return prisma.article.findMany({
    where: { status: ArticleStatus.PUBLISHED, slider: true },
    include: { category: true, author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    take: 5,
  });
}

export async function getFeaturedArticles(take = 4) {
  return prisma.article.findMany({
    where: { status: ArticleStatus.PUBLISHED, featured: true },
    include: { category: true, author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, status: ArticleStatus.PUBLISHED },
    include: {
      category: true,
      author: { select: { name: true } },
      comments: {
        where: { approved: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { status: ArticleStatus.PUBLISHED },
        include: { category: true, author: { select: { name: true } } },
        orderBy: { publishedAt: "desc" },
      },
    },
  });
}

export async function searchArticles(query: string) {
  return prisma.article.findMany({
    where: {
      status: ArticleStatus.PUBLISHED,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { excerpt: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { category: true, author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    take: 30,
  });
}

export async function getActiveBanners(position?: string) {
  const now = new Date();
  return prisma.banner.findMany({
    where: {
      active: true,
      ...(position ? { position: position as never } : {}),
      AND: [
        { OR: [{ startDate: null }, { startDate: { lte: now } }] },
        { OR: [{ endDate: null }, { endDate: { gte: now } }] },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMedia() {
  return prisma.media.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getSettings() {
  const rows = await prisma.siteSetting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
