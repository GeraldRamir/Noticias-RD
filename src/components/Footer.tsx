import Link from "next/link";
import { getSettings } from "@/lib/queries";
import { NewsletterForm } from "./NewsletterForm";

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  twitter: "X",
  instagram: "Instagram",
  youtube: "YouTube",
};

export async function Footer() {
  const settings = await getSettings();
  const socialKeys = ["facebook", "twitter", "instagram", "youtube"] as const;

  return (
    <footer className="mt-16 border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-5">
        <div className="animate-fade-up md:col-span-2">
          <p className="font-display text-3xl font-bold tracking-tight">
            {settings.siteName || "CRÓNICA"}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {settings.tagline || "Noticias que importan"}
          </p>
          <p className="mt-4 text-sm text-white/60">{settings.address}</p>
          <p className="mt-2 text-sm text-white/60">{settings.contactPhone}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialKeys.map((key) => {
              const url = settings[key];
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition hover:border-accent hover:text-accent"
                >
                  {SOCIAL_LABELS[key]}
                </a>
              );
            })}
          </div>
        </div>

        <div className="animate-fade-up delay-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Secciones</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/ultima-hora" className="hover:text-white">Última hora</Link></li>
            <li><Link href="/opinion" className="hover:text-white">Opinión</Link></li>
            <li><Link href="/agora" className="hover:text-white">Ágora</Link></li>
            <li><Link href="/videos" className="hover:text-white">CRÓNICA TV</Link></li>
            <li><Link href="/podcast" className="hover:text-white">Podcast</Link></li>
            <li><Link href="/categorias" className="hover:text-white">Categorías</Link></li>
          </ul>
        </div>

        <div className="animate-fade-up delay-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Servicios</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/servicios" className="hover:text-white">Clima y divisas</Link></li>
            <li><Link href="/galeria" className="hover:text-white">Galería</Link></li>
            <li><Link href="/buscar" className="hover:text-white">Buscar archivo</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
          </ul>
        </div>

        <div className="animate-fade-up delay-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Newsletter</h3>
          <p className="mt-3 text-sm text-white/70">Recibe lo más importante del día.</p>
          <div className="mt-4">
            <NewsletterForm dark />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {settings.siteName || "CRÓNICA"}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacidad" className="hover:text-white">Privacidad</Link>
            <Link href="/terminos" className="hover:text-white">Términos</Link>
            <Link href="/nosotros" className="hover:text-white">Nosotros</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
