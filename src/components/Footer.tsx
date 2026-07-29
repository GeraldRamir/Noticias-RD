import Link from "next/link";
import { getSettings } from "@/lib/queries";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="mt-16 border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="animate-fade-up">
          <p className="font-display text-3xl font-bold tracking-tight">
            {settings.siteName || "CRÓNICA"}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {settings.tagline || "Noticias que importan"}
          </p>
          <p className="mt-4 text-sm text-white/60">
            {settings.address || "Santo Domingo, República Dominicana"}
          </p>
        </div>

        <div className="animate-fade-up delay-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Secciones</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/categorias" className="hover:text-white">
                Categorías
              </Link>
            </li>
            <li>
              <Link href="/galeria" className="hover:text-white">
                Galería
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/buscar" className="hover:text-white">
                Buscar
              </Link>
            </li>
          </ul>
        </div>

        <div className="animate-fade-up delay-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Newsletter</h3>
          <p className="mt-3 text-sm text-white/70">
            Recibe lo más importante del día en tu correo.
          </p>
          <div className="mt-4">
            <NewsletterForm dark />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {settings.siteName || "CRÓNICA"}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
