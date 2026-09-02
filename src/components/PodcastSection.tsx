import Link from "next/link";
import Image from "next/image";
import type { MockPodcast } from "@/lib/portal-data";
import { formatRelative } from "@/lib/utils";

export function PodcastSection({ podcasts }: { podcasts: MockPodcast[] }) {
  return (
    <section className="mb-12 border border-line bg-paper-soft p-6">
      <div className="mb-6 flex items-end justify-between border-b border-line pb-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Podcast CRÓNICA</h2>
          <p className="mt-1 text-sm text-muted">Análisis y reportajes en audio</p>
        </div>
        <Link href="/podcast" className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:underline">
          Ver episodios
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {podcasts.slice(0, 4).map((pod) => (
          <article key={pod.id} className="flex gap-4 bg-paper p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden">
              <Image src={pod.coverImage} alt={pod.title} fill className="object-cover" sizes="80px" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-accent">
                Ep. {pod.episode} · {pod.duration}
              </p>
              <h3 className="mt-1 font-semibold leading-snug">
                <Link href={`/podcast#${pod.slug}`} className="hover:text-accent">
                  {pod.title}
                </Link>
              </h3>
              <p className="mt-1 text-xs text-muted">{formatRelative(pod.publishedAt)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
