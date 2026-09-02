import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Pagination } from "@/components/Pagination";
import { getTagBySlug } from "@/lib/queries";

const PAGE_SIZE = 9;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug, 1);
  if (!tag) return { title: "Etiqueta" };
  return {
    title: `#${tag.name}`,
    description: `Noticias etiquetadas con ${tag.name}`,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const tag = await getTagBySlug(slug, PAGE_SIZE, (page - 1) * PAGE_SIZE);
  if (!tag) notFound();

  const totalPages = Math.max(1, Math.ceil(tag.total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Etiquetas", href: "/buscar" }, { label: `#${tag.name}` }]} />

      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Tema</p>
        <h1 className="font-display mt-2 text-4xl font-bold">#{tag.name}</h1>
        <p className="mt-2 text-muted">{tag.total} noticia{tag.total === 1 ? "" : "s"}</p>
      </div>

      <div>
        {tag.articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="horizontal" />
        ))}
        {tag.articles.length === 0 && (
          <p className="text-muted">No hay noticias con esta etiqueta.</p>
        )}
      </div>

      <Pagination basePath={`/etiqueta/${slug}`} currentPage={page} totalPages={totalPages} />
    </div>
  );
}
