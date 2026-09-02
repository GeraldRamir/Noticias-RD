import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getMedia } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Galería",
  description: "Galería multimedia y documentos descargables de CRÓNICA",
};

export default async function GalleryPage() {
  const media = await getMedia();
  const images = media.filter((m) => m.type === "IMAGE");
  const docs = media.filter((m) => m.type === "DOCUMENT");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Multimedia</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Galería</h1>
        <p className="mt-2 text-muted">
          Fotografías de cobertura, eventos editoriales y documentos institucionales de CRÓNICA.
        </p>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Imágenes ({images.length})
          </h2>
        </div>
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
              <figcaption className="border-t border-line px-3 py-3">
                <p className="text-sm font-semibold">{item.alt || item.filename}</p>
                <p className="mt-1 text-xs text-muted">
                  {item.createdAt.toLocaleDateString("es-DO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
          Documentos ({docs.length})
        </h2>
        <ul className="divide-y divide-line border border-line">
          {docs.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-4 px-4 py-4">
              <div>
                <p className="font-semibold">{doc.filename}</p>
                {doc.alt && <p className="text-sm text-muted">{doc.alt}</p>}
                <p className="mt-1 text-xs text-muted uppercase">{doc.mimeType}</p>
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
      </section>

      <div className="mt-12 border border-line bg-paper-soft p-6 text-center">
        <p className="text-sm text-muted">
          ¿Buscas material de prensa o cobertura de eventos?{" "}
          <Link href="/contacto" className="font-semibold text-accent hover:underline">
            Contáctanos
          </Link>
        </p>
      </div>
    </div>
  );
}
