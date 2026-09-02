import type { MetadataRoute } from "next";
import { MOCK_ARTICLES, MOCK_CATEGORIES } from "@/lib/mock-data";
import { AGORA_ARTICLES, EXTRA_CATEGORIES, OPINION_ARTICLES } from "@/lib/portal-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const allArticles = [...MOCK_ARTICLES, ...OPINION_ARTICLES, ...AGORA_ARTICLES];
  const allCategories = [...MOCK_CATEGORIES, ...EXTRA_CATEGORIES];

  const staticPages = [
    "",
    "/categorias",
    "/contacto",
    "/galeria",
    "/buscar",
    "/opinion",
    "/agora",
    "/videos",
    "/podcast",
    "/ultima-hora",
    "/servicios",
    "/nosotros",
    "/privacidad",
    "/terminos",
  ];

  return [
    ...staticPages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...allCategories.map((c) => ({
      url: `${base}/categoria/${c.slug}`,
      lastModified: c.updatedAt,
    })),
    ...allArticles.map((a) => ({
      url: `${base}/noticia/${a.slug}`,
      lastModified: a.updatedAt,
    })),
  ];
}
