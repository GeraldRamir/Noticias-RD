import Image from "next/image";
import type { Metadata } from "next";
import { getMedia } from "@/lib/queries";
import { MediaType } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galería",
  description: "Galería multimedia y documentos descargables",
};

export default async function GalleryPage() {
  const media = await getMedia();
  const images = media.filter((m) => m.type === MediaType.IMAGE);
  const docs = media.filter((m) => m.type === MediaType.DOCUMENT);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Galería</h1>
      <p className="mt-2 text-muted">Imágenes y documentos disponibles para consulta.</p>

      <section className="mt-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Imágenes</h2>
        {images.length === 0 ? (
          <p className="text-sm text-muted">No hay imágenes todavía.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((item) => (
              <figure key={item.id} className="group overflow-hidden border border-line">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.url}
                    alt={item.alt || item.filename}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="px-3 py-2 text-sm text-muted">{item.alt || item.filename}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Documentos</h2>
        {docs.length === 0 ? (
          <p className="text-sm text-muted">No hay documentos todavía.</p>
        ) : (
          <ul className="divide-y divide-line border border-line">
            {docs.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-semibold">{doc.filename}</p>
                  {doc.alt && <p className="text-xs text-muted">{doc.alt}</p>}
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-ink px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-accent"
                >
                  Descargar
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
