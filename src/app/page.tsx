import { HeroSlider } from "@/components/HeroSlider";
import { ArticleCard } from "@/components/ArticleCard";
import { BannerAd } from "@/components/BannerAd";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  getActiveBanners,
  getFeaturedArticles,
  getPublishedArticles,
  getSliderArticles,
} from "@/lib/queries";
import {
  getMostReadArticles,
  getRecommendedArticles,
  getVisitorIdFromCookies,
} from "@/lib/recommendations";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const visitorId = await getVisitorIdFromCookies();
  const [slider, featured, latest, homepageBanners, sidebarBanners, mostRead, recommended] =
    await Promise.all([
      getSliderArticles(),
      getFeaturedArticles(4),
      getPublishedArticles(10),
      getActiveBanners("HOMEPAGE"),
      getActiveBanners("SIDEBAR"),
      getMostReadArticles(5),
      getRecommendedArticles(visitorId, 6),
    ]);

  const slides = slider.length ? slider : featured.slice(0, 3);
  const featuredRest = featured.filter((a) => !slides.some((s) => s.id === a.id)).slice(0, 3);
  const latestFiltered = latest.filter((a) => !slides.some((s) => s.id === a.id));
  const recommendedFiltered = recommended.filter((a) => !slides.some((s) => s.id === a.id));

  return (
    <>
      <HeroSlider
        slides={slides.map((a) => ({
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          coverImage: a.coverImage,
          category: a.category,
        }))}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {homepageBanners[0] && (
          <div className="mb-10">
            <BannerAd banner={homepageBanners[0]} className="aspect-[21/5] w-full" />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            {recommendedFiltered.length > 0 && (
              <section className="mb-12">
                <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      Para ti
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Basado en las noticias que más visitas
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
            )}

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

            <section>
              <div className="mb-2 border-b-2 border-ink pb-3">
                <h2 className="font-display text-2xl font-bold md:text-3xl">Últimas noticias</h2>
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
              <p className="mt-2 text-sm text-muted">Las noticias clave, cada mañana.</p>
              <div className="mt-4 [&_form]:border-line [&_input]:bg-white [&_input]:text-ink">
                <NewsletterForm />
              </div>
            </div>

            {sidebarBanners[0] && (
              <BannerAd banner={sidebarBanners[0]} className="aspect-[4/5] w-full" />
            )}

            <div className="border border-line p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Más leídas</h3>
              <ol className="mt-4 space-y-4">
                {mostRead.map((article, i) => (
                  <li key={article.id} className="flex gap-3">
                    <span className="font-display text-2xl font-bold text-accent/40">{i + 1}</span>
                    <div>
                      <a
                        href={`/noticia/${article.slug}`}
                        className="text-sm font-semibold leading-snug hover:text-accent"
                      >
                        {article.title}
                      </a>
                      <p className="mt-1 text-[11px] text-muted">{article.views} visitas</p>
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
