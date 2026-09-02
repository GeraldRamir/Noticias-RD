import {
  MOCK_ARTICLES,
  MOCK_BANNERS,
  MOCK_CATEGORIES,
  MOCK_MEDIA,
  MOCK_SETTINGS,
  type MockArticle,
  type MockBanner,
} from "@/lib/mock-data";
import {
  AGORA_ARTICLES,
  ARTICLE_TAGS,
  BREAKING_HEADLINES,
  COLUMNISTS,
  EXTRA_CATEGORIES,
  MOCK_EVENTS,
  MOCK_PODCASTS,
  MOCK_SPORTS,
  MOCK_TAGS,
  MOCK_UTILITIES,
  MOCK_VIDEOS,
  OPINION_ARTICLES,
  type ArticleKind,
} from "@/lib/portal-data";

export type EnrichedArticle = MockArticle & {
  kind?: ArticleKind;
  tags: string[];
};

function sortByDate(articles: EnrichedArticle[]) {
  return [...articles].sort(
    (a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
  );
}

function enrich(article: MockArticle & { kind?: ArticleKind; tags?: string[] }): EnrichedArticle {
  return {
    ...article,
    kind: article.kind ?? "news",
    tags: article.tags ?? ARTICLE_TAGS[article.id] ?? [],
  };
}

function allArticles(): EnrichedArticle[] {
  return sortByDate([
    ...MOCK_ARTICLES.map((a) => enrich(a)),
    ...OPINION_ARTICLES.map((a) => enrich(a)),
    ...AGORA_ARTICLES.map((a) => enrich(a)),
  ]);
}

export async function getPublishedArticles(take = 20, skip = 0) {
  return allArticles().slice(skip, skip + take);
}

export async function getPublishedArticlesCount() {
  return allArticles().length;
}

export async function getSliderArticles() {
  return sortByDate(allArticles().filter((a) => a.slider));
}

export async function getFeaturedArticles(take = 4) {
  return sortByDate(allArticles().filter((a) => a.featured)).slice(0, take);
}

export async function getArticleBySlug(slug: string) {
  const article = allArticles().find((a) => a.slug === slug);
  if (!article) return null;
  return {
    ...article,
    comments: article.comments.filter((c) => c.approved),
  };
}

export async function getAdjacentArticles(slug: string) {
  const articles = allArticles();
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < articles.length - 1 ? articles[index + 1] : null,
    next: index > 0 ? articles[index - 1] : null,
  };
}

export async function getCategories() {
  const categories = [...MOCK_CATEGORIES, ...EXTRA_CATEGORIES];
  return categories.map((cat) => ({
    ...cat,
    _count: {
      articles: allArticles().filter((a) => a.categoryId === cat.id).length,
    },
  }));
}

export async function getCategoryBySlug(slug: string, take?: number, skip = 0) {
  const categories = [...MOCK_CATEGORIES, ...EXTRA_CATEGORIES];
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  const articles = sortByDate(allArticles().filter((a) => a.categoryId === category.id));
  return {
    ...category,
    articles: take !== undefined ? articles.slice(skip, skip + take) : articles.slice(skip),
    total: articles.length,
  };
}

export async function searchArticles(query: string, categorySlug?: string) {
  const q = query.toLowerCase();
  let results = allArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q))
  );
  if (categorySlug) {
    results = results.filter((a) => a.category.slug === categorySlug);
  }
  return results;
}

export async function getActiveBanners(position?: string) {
  const now = new Date();
  return MOCK_BANNERS.filter((banner) => {
    if (!banner.active) return false;
    if (position && banner.position !== position) return false;
    if (banner.startDate && banner.startDate > now) return false;
    if (banner.endDate && banner.endDate < now) return false;
    return true;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as MockBanner[];
}

export async function getMedia() {
  return [...MOCK_MEDIA].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getSettings() {
  return MOCK_SETTINGS;
}

export async function getArticlesByCategory(categorySlug: string, take = 3) {
  const category = [...MOCK_CATEGORIES, ...EXTRA_CATEGORIES].find((c) => c.slug === categorySlug);
  if (!category) return [];
  return sortByDate(allArticles().filter((a) => a.categoryId === category.id)).slice(0, take);
}

export async function articleExists(id: string) {
  return allArticles().some((a) => a.id === id);
}

export async function getOpinionArticles(take = 10, skip = 0) {
  return sortByDate(allArticles().filter((a) => a.kind === "opinion")).slice(skip, skip + take);
}

export async function getAgoraArticles(take = 10, skip = 0) {
  return sortByDate(allArticles().filter((a) => a.kind === "agora")).slice(skip, skip + take);
}

export async function getVideos(take = 10) {
  return [...MOCK_VIDEOS]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, take);
}

export async function getFeaturedVideos(take = 3) {
  return MOCK_VIDEOS.filter((v) => v.featured)
    .concat(MOCK_VIDEOS.filter((v) => !v.featured))
    .slice(0, take);
}

export async function getVideoBySlug(slug: string) {
  return MOCK_VIDEOS.find((v) => v.slug === slug) ?? null;
}

export async function getPodcasts(take = 10) {
  return [...MOCK_PODCASTS]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, take);
}

export async function getColumnists() {
  return COLUMNISTS;
}

export async function getColumnistBySlug(slug: string) {
  const columnist = COLUMNISTS.find((c) => c.slug === slug);
  if (!columnist) return null;
  const articles = sortByDate(
    allArticles().filter((a) => a.author.id === columnist.id || a.author.name === columnist.name)
  );
  return { ...columnist, articles };
}

export async function getTags() {
  return MOCK_TAGS;
}

export async function getTagBySlug(slug: string, take = 20, skip = 0) {
  const tag = MOCK_TAGS.find((t) => t.slug === slug);
  if (!tag) return null;
  const articles = sortByDate(allArticles().filter((a) => a.tags.includes(slug)));
  return { ...tag, articles: articles.slice(skip, skip + take), total: articles.length };
}

export async function getArticlesByTag(slug: string, take = 4) {
  return sortByDate(allArticles().filter((a) => a.tags.includes(slug))).slice(0, take);
}

export async function getUtilities() {
  return MOCK_UTILITIES;
}

export async function getSportsScores() {
  return MOCK_SPORTS;
}

export async function getEvents() {
  return [...MOCK_EVENTS].sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function getBreakingHeadlines() {
  return BREAKING_HEADLINES;
}

export async function getLatestHourArticles(take = 15) {
  return allArticles().slice(0, take);
}
