import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { ArticleStatus } from "@prisma/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/categorias`, lastModified: new Date() },
    { url: `${base}/contacto`, lastModified: new Date() },
    { url: `${base}/galeria`, lastModified: new Date() },
    { url: `${base}/buscar`, lastModified: new Date() },
    ...categories.map((c) => ({
      url: `${base}/categoria/${c.slug}`,
      lastModified: c.updatedAt,
    })),
    ...articles.map((a) => ({
      url: `${base}/noticia/${a.slug}`,
      lastModified: a.updatedAt,
    })),
  ];
}
