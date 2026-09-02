import Link from "next/link";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  query?: Record<string, string>;
};

function buildHref(basePath: string, page: number, query?: Record<string, string>) {
  const params = new URLSearchParams(query);
  if (page > 1) params.set("page", String(page));
  else params.delete("page");
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ basePath, currentPage, totalPages, query }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={buildHref(basePath, currentPage - 1, query)}
          className="border border-line px-3 py-2 text-sm hover:border-accent hover:text-accent"
        >
          ← Anterior
        </Link>
      )}
      {pages.map((page, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-muted">…</span>}
            <Link
              href={buildHref(basePath, page, query)}
              className={`min-w-10 border px-3 py-2 text-center text-sm ${
                page === currentPage
                  ? "border-accent bg-accent text-white"
                  : "border-line hover:border-accent hover:text-accent"
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}
      {currentPage < totalPages && (
        <Link
          href={buildHref(basePath, currentPage + 1, query)}
          className="border border-line px-3 py-2 text-sm hover:border-accent hover:text-accent"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}
