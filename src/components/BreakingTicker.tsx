import Link from "next/link";

type Headline = { title: string; slug: string };

export function BreakingTicker({ headlines }: { headlines: Headline[] }) {
  const items = [...headlines, ...headlines];

  return (
    <div className="border-b border-line bg-accent text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5">
        <span className="relative flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-white" />
          Última hora
        </span>

        <div className="min-w-0 overflow-hidden">
          <div className="ticker-track flex w-max gap-8">
            {items.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/noticia/${item.slug}`}
                className="shrink-0 text-sm whitespace-nowrap opacity-90 transition hover:opacity-100 hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/ultima-hora"
          className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-2 opacity-90 hover:opacity-100"
        >
          Ver todo
        </Link>
      </div>
    </div>
  );
}
