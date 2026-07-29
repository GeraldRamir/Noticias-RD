"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/buscar?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md overflow-hidden border border-line">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar noticias…"
        className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted"
        aria-label="Buscar"
      />
      <button
        type="submit"
        className="bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-dark"
      >
        Buscar
      </button>
    </form>
  );
}
