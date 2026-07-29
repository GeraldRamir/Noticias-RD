"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavCategory = {
  name: string;
  slug: string;
  description?: string | null;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
  );
}

export function CategoriesMenu({ categories }: { categories: NavCategory[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
      clearClose();
    };
  }, []);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium normal-case tracking-normal transition-colors ${
          open
            ? "bg-ink text-white"
            : "text-ink-soft hover:bg-paper-soft hover:text-ink"
        }`}
      >
        Categorías
        <Chevron open={open} />
      </button>

      <div
        className={`absolute left-0 top-full z-50 overflow-hidden border-x border-b border-line bg-paper transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid grid-rows-[1fr]" : "pointer-events-none grid grid-rows-[0fr]"
        }`}
        onMouseEnter={clearClose}
        onMouseLeave={scheduleClose}
      >
        <div className="min-h-0">
          <div className="w-[min(92vw,560px)] p-1">
            <div className="grid sm:grid-cols-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-3.5 py-3 transition-colors hover:bg-paper-soft"
                >
                  <div className="text-sm font-semibold text-ink">{cat.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {cat.description || `Noticias de ${cat.name.toLowerCase()}`}
                  </p>
                </Link>
              ))}
            </div>
            <div className="border-t border-line px-3.5 py-2.5">
              <Link
                href="/categorias"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Ver todas las categorías →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
