"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import type { NavCategory } from "./CategoriesMenu";

type Section = { label: string; href: string };

export function MobileNav({
  categories,
  sections,
}: {
  categories: NavCategory[];
  sections: Section[];
}) {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const home = sections.find((s) => s.href === "/");
  const rest = sections.filter((s) => s.href !== "/");

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink"
      >
        <span className="sr-only">Menú</span>
        <div className="space-y-1.5">
          <span className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-line bg-paper px-4 py-4 shadow-lg">
          <SearchBar />
          <ul className="mt-4 space-y-1 text-sm font-medium">
            {home && (
              <li>
                <Link
                  href={home.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-accent"
                >
                  {home.label}
                </Link>
              </li>
            )}

            <li>
              <button
                type="button"
                onClick={() => setCategoriesOpen((v) => !v)}
                className={`flex w-full items-center justify-between px-3 py-2 ${
                  categoriesOpen ? "bg-ink text-white" : "hover:bg-paper-soft"
                }`}
                aria-expanded={categoriesOpen}
              >
                Categorías
                <svg
                  className={`h-3.5 w-3.5 transition ${categoriesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {categoriesOpen && (
                <div className="mt-1 border border-line bg-paper">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categoria/${cat.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 hover:bg-paper-soft"
                    >
                      <div className="font-semibold text-ink">{cat.name}</div>
                      <p className="mt-0.5 text-xs text-muted">
                        {cat.description || `Noticias de ${cat.name.toLowerCase()}`}
                      </p>
                    </Link>
                  ))}
                  <Link
                    href="/categorias"
                    onClick={() => setOpen(false)}
                    className="block border-t border-line px-3 py-2 text-xs font-semibold text-accent"
                  >
                    Ver todas las categorías →
                  </Link>
                </div>
              )}
            </li>

            {rest.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 hover:bg-paper-soft"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
