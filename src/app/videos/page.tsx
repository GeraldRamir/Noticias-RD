import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoSection";
import { getVideos } from "@/lib/queries";

export const metadata: Metadata = {
  title: "CRÓNICA TV",
  description: "Videos, entrevistas y resúmenes del día",
};

export default async function VideosPage() {
  const videos = await getVideos(20);
  const featured = videos.filter((v) => v.featured);
  const rest = videos.filter((v) => !v.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Multimedia</p>
        <h1 className="font-display mt-2 text-4xl font-bold">CRÓNICA TV</h1>
        <p className="mt-2 text-muted">
          Cobertura en video, entrevistas exclusivas y resúmenes editoriales.
        </p>
      </div>

      {featured.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Destacados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((video) => (
              <div key={video.id} id={video.slug}>
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Todos los videos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video) => (
            <div key={video.id} id={video.slug}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
