import Image from "next/image";
import type { Metadata } from "next";
import { getPodcasts } from "@/lib/queries";
import { formatRelative } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Podcasts y reportajes en audio — CRÓNICA",
};

export default async function PodcastPage() {
  const podcasts = await getPodcasts(20);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Audio</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Podcast CRÓNICA</h1>
        <p className="mt-2 text-muted">
          Análisis, entrevistas y reportajes de fondo para escuchar donde quieras.
        </p>
      </div>

      <div className="space-y-4">
        {podcasts.map((pod) => (
          <article
            key={pod.id}
            id={pod.slug}
            className="flex flex-col gap-4 border border-line p-5 sm:flex-row sm:items-center"
          >
            <div className="relative h-28 w-28 shrink-0 overflow-hidden">
              <Image src={pod.coverImage} alt={pod.title} fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Episodio {pod.episode} · {pod.duration}
              </p>
              <h2 className="font-display mt-1 text-xl font-bold">{pod.title}</h2>
              <p className="mt-2 text-sm text-muted">{pod.description}</p>
              <p className="mt-2 text-xs text-muted">{formatRelative(pod.publishedAt)}</p>
            </div>
            <button
              type="button"
              className="shrink-0 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-accent-dark"
            >
              Reproducir
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
