import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Sobre CRÓNICA — misión, visión y equipo editorial",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Institucional</p>
      <h1 className="font-display mt-2 text-4xl font-bold">Sobre {settings.siteName}</h1>

      <div className="prose-article mt-8">
        <p>
          <strong>{settings.siteName}</strong> es un medio digital independiente con cobertura de
          política, economía, deportes, cultura, tecnología y opinión. Nuestra redacción trabaja
          desde Santo Domingo con corresponsales en el Caribe y América Latina.
        </p>
        <h2>Misión</h2>
        <p>
          Informar con rigor, contexto y diversidad de voces para que los lectores tomen decisiones
          informadas sobre su comunidad y el mundo.
        </p>
        <h2>Compromiso editorial</h2>
        <p>
          Verificamos fuentes, separamos hechos de opinión y corregimos con transparencia. Las
          columnas de opinión representan la visión de sus autores, no necesariamente la de la
          dirección.
        </p>
        <h2>Contacto</h2>
        <p>
          Redacción:{" "}
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
          <br />
          Teléfono: {settings.contactPhone}
          <br />
          Dirección: {settings.address}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/contacto" className="bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-dark">
          Escríbenos
        </Link>
        <Link href="/opinion" className="border border-line px-5 py-2.5 text-sm hover:border-accent hover:text-accent">
          Opinión
        </Link>
      </div>
    </div>
  );
}
