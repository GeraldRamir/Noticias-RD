import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="font-display mt-3 text-4xl font-bold">Página no encontrada</h1>
      <p className="mt-3 text-muted">La noticia o sección que buscas no existe.</p>
      <Link
        href="/"
        className="mt-8 bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
