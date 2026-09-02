import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { ArticleCard } from "@/components/ArticleCard";
import { BannerAd } from "@/components/BannerAd";
import { BreakingTicker } from "@/components/BreakingTicker";
import { CategorySection } from "@/components/CategorySection";
import { SecondaryStoryGrid } from "@/components/SecondaryStoryGrid";
import { OpinionSection } from "@/components/OpinionSection";
import { VideoSection } from "@/components/VideoSection";
import { PodcastSection } from "@/components/PodcastSection";
import { AgoraSection } from "@/components/AgoraSection";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SidebarWidgets } from "@/components/SidebarWidgets";
import {
  getActiveBanners,
  getAgoraArticles,
  getArticlesByCategory,
  getBreakingHeadlines,
  getCategories,
  getColumnists,
  getFeaturedArticles,
  getFeaturedVideos,
  getOpinionArticles,
  getPodcasts,
  getPublishedArticles,
  getSliderArticles,
} from "@/lib/queries";
import {
  getMostReadArticles,
  getRecommendedArticles,
  getVisitorIdFromCookies,
} from "@/lib/recommendations";

export default async function HomePage() {
  const visitorId = await getVisitorIdFromCookies();
  const [
    slider,
    featured,
    latest,
    categories,
    homepageBanners,
    sidebarBanners,
    headerBanners,
    mostRead,
    recommended,
    breaking,
    opinion,
    columnists,
    videos,
    podcasts,
    agora,
  ] = await Promise.all([
    getSliderArticles(),
    getFeaturedArticles(8),
    getPublishedArticles(12),
    getCategories(),
    getActiveBanners("HOMEPAGE"),
    getActiveBanners("SIDEBAR"),
    getActiveBanners("HEADER"),
    getMostReadArticles(5),
    getRecommendedArticles(visitorId, 6),
    getBreakingHeadlines(),
    getOpinionArticles(4),
    getColumnists(),
    getFeaturedVideos(3),
    getPodcasts(4),
    getAgoraArticles(3),
  ]);

  const slides = slider.length ? slider : featured.slice(0, 3);
  const slideIds = new Set(slides.map((s) => s.id));
  const secondaryStories = featured.filter((a) => !slideIds.has(a.id));
  const featuredRest = secondaryStories.slice(0, 3);
  const latestFiltered = latest.filter((a) => !slideIds.has(a.id));
  const recommendedFiltered = recommended.filter((a) => !slideIds.has(a.id));

  const editorialCategories = categories.filter(
    (c) => !["opinion", "agora"].includes(c.slug)
  );
  const categoryArticles = await Promise.all(
    editorialCategories.map(async (cat) => ({
      category: cat,
      articles: await getArticlesByCategory(cat.slug, 3),
    }))
  );

  return (
    <>
      {headerBanners[0] && (
        <div className="border-b border-line bg-[#f7f7f7]">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <BannerAd banner={headerBanners[0]} variant="leaderboard" />
          </div>
        </div>
      )}

      <BreakingTicker headlines={breaking} />

      <HeroSlider
        slides={slides.map((a) => ({
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          coverImage: a.coverImage,
          category: a.category,
        }))}
      />

      <div className="border-b border-line bg-paper-soft">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <SecondaryStoryGrid articles={secondaryStories.slice(0, 4)} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {homepageBanners[0] && (
          <div className="mb-10">
            <BannerAd banner={homepageBanners[0]} variant="billboard" />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <section className="mb-12">
              <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
                <div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">Para ti</h2>
                  <p className="mt-1 text-sm text-muted">
                    Recomendaciones basadas en tu historial de lectura
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Personalizado
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedFiltered.slice(0, 6).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            <OpinionSection articles={opinion} columnists={columnists} />
            <VideoSection videos={videos} />
            <AgoraSection articles={agora} />

            {featuredRest.length > 0 && (
              <section className="mb-12">
                <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
                  <h2 className="font-display text-2xl font-bold md:text-3xl">Destacadas</h2>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    Editor&apos;s pick
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredRest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {categoryArticles.map(({ category, articles }) => (
              <CategorySection
                key={category.id}
                name={category.name}
                slug={category.slug}
                color={category.color}
                articles={articles}
              />
            ))}

            <PodcastSection podcasts={podcasts} />

            <section>
              <div className="mb-2 flex items-end justify-between border-b-2 border-ink pb-3">
                <h2 className="font-display text-2xl font-bold md:text-3xl">Últimas noticias</h2>
                <Link
                  href="/ultima-hora"
                  className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Ver todo
                </Link>
              </div>
              <div>
                {latestFiltered.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="border border-line bg-paper-soft p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Boletín</h3>
              <p className="mt-2 text-sm text-muted">
                Lo más importante del día, cada mañana en tu correo.
              </p>
              <div className="mt-4 [&_form]:border-line [&_input]:bg-white [&_input]:text-ink">
                <NewsletterForm />
              </div>
            </div>

            <SidebarWidgets />

            <div className="border border-line p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Secciones</h3>
              <ul className="mt-4 space-y-2">
                {editorialCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categoria/${cat.slug}`}
                      className="flex items-center justify-between text-sm transition hover:text-accent"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </span>
                      <span className="text-xs text-muted">{cat._count.articles}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {sidebarBanners[0] && (
              <BannerAd banner={sidebarBanners[0]} variant="sidebar" />
            )}

            <div className="border border-line p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Más leídas</h3>
              <ol className="mt-4 space-y-4">
                {mostRead.map((article, i) => (
                  <li key={article.id} className="flex gap-3">
                    <span className="font-display text-2xl font-bold text-accent/40">{i + 1}</span>
                    <div>
                      <Link
                        href={`/noticia/${article.slug}`}
                        className="text-sm font-semibold leading-snug hover:text-accent"
                      >
                        {article.title}
                      </Link>
                      <p className="mt-1 text-[11px] text-muted">
                        {article.views.toLocaleString("es-DO")} lecturas
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
