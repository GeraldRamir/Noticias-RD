import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getColumnistBySlug } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const columnist = await getColumnistBySlug(slug);
  if (!columnist) return { title: "Autor" };
  return {
    title: `${columnist.name} — Columnista`,
    description: columnist.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const columnist = await getColumnistBySlug(slug);
  if (!columnist) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Opinión", href: "/opinion" }, { label: columnist.name }]} />

      <div className="grid gap-8 border-b border-line pb-8 lg:grid-cols-[200px_1fr]">
        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-line lg:mx-0">
          <Image src={columnist.avatar} alt={columnist.name} fill className="object-cover" sizes="160px" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{columnist.specialty}</p>
          <h1 className="font-display mt-2 text-4xl font-bold">{columnist.name}</h1>
          <p className="mt-4 max-w-2xl text-muted">{columnist.bio}</p>
          <p className="mt-4 text-sm text-muted">
            {columnist.articleCount} artículos publicados
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display mb-6 text-2xl font-bold">Artículos recientes</h2>
        {columnist.articles.length === 0 ? (
          <p className="text-muted">Sin artículos publicados.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {columnist.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      <div className="mt-10">
        <Link href="/opinion" className="text-sm font-bold text-accent hover:underline">
          ← Volver a Opinión
        </Link>
      </div>
    </div>
  );
}
