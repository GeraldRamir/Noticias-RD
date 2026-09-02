import Link from "next/link";
import { getCategories, getSettings } from "@/lib/queries";
import { UtilityBar } from "./UtilityBar";
import { CategoriesMenu } from "./CategoriesMenu";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";

const NAV_SECTIONS = [
  { label: "Última hora", href: "/ultima-hora" },
  { label: "Opinión", href: "/opinion" },
  { label: "Ágora", href: "/agora" },
  { label: "Videos", href: "/videos" },
  { label: "Podcast", href: "/podcast" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
] as const;

export async function Header() {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()]);
  const categoryItems = categories
    .filter((c) => !["opinion", "agora"].includes(c.slug))
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
    }));

  const social = [
    { key: "facebook", label: "FB", href: settings.facebook },
    { key: "twitter", label: "X", href: settings.twitter },
    { key: "instagram", label: "IG", href: settings.instagram },
  ].filter((s) => s.href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="border-b border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-xs tracking-wide">
          <p className="animate-slide-in opacity-90">
            {new Date().toLocaleDateString("es-DO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/nosotros" className="opacity-80 hover:opacity-100">
              Nosotros
            </Link>
            <Link href="/servicios" className="opacity-80 hover:opacity-100">
              Servicios
            </Link>
            <span className="opacity-50">|</span>
            {social.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold opacity-80 hover:opacity-100"
              >
                {s.label}
              </a>
            ))}
          </div>
          <Link
            href="/buscar"
            className="hidden font-semibold uppercase tracking-wide text-accent hover:underline md:inline"
          >
            Versión digital
          </Link>
        </div>
      </div>

      <UtilityBar />

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <Link href="/" className="group shrink-0">
          <span className="font-display text-3xl font-bold tracking-tight text-ink transition group-hover:text-accent md:text-4xl">
            CRÓNICA
          </span>
          <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            {settings.tagline || "Noticias que importan"}
          </span>
        </Link>

        <div className="ml-auto hidden flex-1 justify-end md:flex">
          <SearchBar />
        </div>

        <MobileNav
          categories={categoryItems}
          sections={[{ label: "Inicio", href: "/" }, ...NAV_SECTIONS, { label: "Buscar", href: "/buscar" }]}
        />
      </div>

      <nav className="hidden border-t border-line md:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-2">
          <li>
            <Link
              href="/"
              className="inline-flex px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-paper-soft"
            >
              Inicio
            </Link>
          </li>
          <CategoriesMenu categories={categoryItems} />
          {NAV_SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="inline-flex px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink"
              >
                {section.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/buscar"
              className="inline-flex px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink"
            >
              Buscar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
