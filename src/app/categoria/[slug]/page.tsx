import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Pagination } from "@/components/Pagination";
import { getCategoryBySlug } from "@/lib/queries";

const PAGE_SIZE = 9;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoría" };
  return {
    title: category.name,
    description: category.description || `Noticias de ${category.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const category = await getCategoryBySlug(slug, PAGE_SIZE, (page - 1) * PAGE_SIZE);
  if (!category) notFound();

  const totalPages = Math.max(1, Math.ceil(category.total / PAGE_SIZE));
  const featured = page === 1 ? (category.articles.find((a) => a.featured) ?? category.articles[0]) : null;
  const rest = featured
    ? category.articles.filter((a) => a.id !== featured.id)
    : category.articles;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Categorías", href: "/categorias" }, { label: category.name }]} />

      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Sección</p>
        <h1 className="font-display mt-2 text-4xl font-bold" style={{ color: category.color }}>
          {category.name}
        </h1>
        {category.description && <p className="mt-2 text-muted">{category.description}</p>}
        <p className="mt-3 text-sm text-muted">
          {category.total} noticia{category.total === 1 ? "" : "s"} publicada
          {category.total === 1 ? "" : "s"}
        </p>
      </div>

      {category.total === 0 ? (
        <p className="text-muted">No hay noticias publicadas en esta categoría.</p>
      ) : (
        <>
          {featured && (
            <div className="mb-10">
              <ArticleCard article={featured} variant="featured" />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          <Pagination basePath={`/categoria/${slug}`} currentPage={page} totalPages={totalPages} />

          <div className="mt-12 border border-line bg-paper-soft p-6 text-center">
            <p className="text-sm text-muted">
              Explora otras secciones en{" "}
              <Link href="/categorias" className="font-semibold text-accent hover:underline">
                todas las categorías
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
