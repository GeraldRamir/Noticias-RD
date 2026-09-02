import Link from "next/link";

export function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/etiqueta/${tag}`}
          className="border border-line px-3 py-1 text-xs font-semibold uppercase tracking-wide transition hover:border-accent hover:text-accent"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
