import Image from "next/image";
import Link from "next/link";
import type { MockArticle } from "@/lib/mock-data";

export function SecondaryStoryGrid({ articles }: { articles: MockArticle[] }) {
  if (!articles.length) return null;

  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {articles.slice(0, 4).map((article) => (
        <article key={article.id} className="group bg-paper">
          <Link href={`/noticia/${article.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              {article.coverImage && (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              )}
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                {article.category.name}
              </span>
              <h3 className="font-display mt-2 line-clamp-3 text-base font-bold leading-snug group-hover:text-accent">
                {article.title}
              </h3>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
