import Link from "next/link";
import { getCategories } from "@/lib/queries";
import { CategoriesMenu } from "./CategoriesMenu";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";

const NAV_SECTIONS = [
  { label: "Inicio", href: "/" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
  { label: "Buscar", href: "/buscar" },
] as const;

export async function Header() {
  const categories = await getCategories();
  const categoryItems = categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    description: c.description,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="border-b border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs tracking-wide">
          <p className="animate-slide-in opacity-90">
            {new Date().toLocaleDateString("es-DO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="hidden opacity-80 sm:block">Noticias que importan</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <Link href="/" className="group shrink-0">
          <span className="font-display text-3xl font-bold tracking-tight text-ink transition group-hover:text-accent md:text-4xl">
            CRÓNICA
          </span>
          <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            Noticias que importan
          </span>
        </Link>

        <div className="ml-auto hidden flex-1 justify-end md:flex">
          <SearchBar />
        </div>

        <MobileNav categories={categoryItems} sections={[...NAV_SECTIONS]} />
      </div>

      <nav className="hidden border-t border-line md:block">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-2">
          <li>
            <Link
              href="/"
              className="inline-flex px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-paper-soft"
            >
              Inicio
            </Link>
          </li>
          <CategoriesMenu categories={categoryItems} />
          {NAV_SECTIONS.filter((s) => s.href !== "/").map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="inline-flex px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
