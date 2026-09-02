import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explora todas las secciones de noticias de CRÓNICA",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const totalArticles = categories.reduce((sum, cat) => sum + cat._count.articles, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Secciones</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Categorías</h1>
        <p className="mt-2 text-muted">
          Explora las {categories.length} áreas editoriales de CRÓNICA con {totalArticles} noticias
          publicadas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group border border-line p-6 transition hover:border-accent"
          >
            <span
              className="inline-block h-1.5 w-10"
              style={{ backgroundColor: cat.color || "#E10600" }}
            />
            <h2 className="font-display mt-4 text-2xl font-bold transition group-hover:text-accent">
              {cat.name}
            </h2>
            {cat.description && <p className="mt-2 text-sm text-muted">{cat.description}</p>}
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-muted">
              {cat._count.articles} noticia{cat._count.articles === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
