import Image from "next/image";
import Link from "next/link";
import type { MockVideo } from "@/lib/portal-data";

export function VideoCard({ video }: { video: MockVideo }) {
  return (
    <article className="group">
      <Link href={`/videos#${video.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-ink">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/35">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
              ▶
            </span>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white">
            {video.duration}
          </span>
        </div>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
          {video.category}
        </p>
        <h3 className="font-display mt-1 text-base font-bold leading-snug group-hover:text-accent">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-muted">
          {video.views.toLocaleString("es-DO")} reproducciones
        </p>
      </Link>
    </article>
  );
}

export function VideoSection({ videos }: { videos: MockVideo[] }) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">CRÓNICA TV</h2>
          <p className="mt-1 text-sm text-muted">Videos, entrevistas y resúmenes del día</p>
        </div>
        <Link
          href="/videos"
          className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:underline"
        >
          Ver canal
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.slice(0, 3).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
