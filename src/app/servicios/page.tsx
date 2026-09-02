import type { Metadata } from "next";
import Link from "next/link";
import { getEvents, getUtilities } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Utilidades y servicios — CRÓNICA",
};

export default async function ServiciosPage() {
  const [utilities, events] = await Promise.all([getUtilities(), getEvents()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Portal</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Servicios</h1>
        <p className="mt-2 text-muted">
          Información útil del día: clima, divisas, lotería y agenda de eventos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="border border-line p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Clima</h2>
          <p className="font-display mt-4 text-4xl font-bold">{utilities.weather.temp}°C</p>
          <p className="mt-2 font-semibold">{utilities.weather.city}</p>
          <p className="text-sm text-muted">{utilities.weather.condition}</p>
          <p className="mt-3 text-xs text-muted">
            Humedad {utilities.weather.humidity}% · Viento {utilities.weather.wind}
          </p>
        </div>

        <div className="border border-line p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Divisas</h2>
          <ul className="mt-4 space-y-3">
            {utilities.exchange.map((rate) => (
              <li key={rate.currency} className="flex justify-between text-sm">
                <span className="font-bold">{rate.currency}</span>
                <span>
                  Compra {rate.buy} · Venta {rate.sell}{" "}
                  <span className={rate.change.startsWith("+") ? "text-emerald-600" : "text-accent"}>
                    {rate.change}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Lotería</h2>
          <p className="mt-4 font-semibold">{utilities.lottery.name}</p>
          <p className="font-display mt-3 text-2xl font-bold tracking-wider">
            {utilities.lottery.numbers.join(" · ")}
          </p>
          <p className="mt-2 text-sm text-muted">Extra: {utilities.lottery.bonus}</p>
          <p className="mt-1 text-xs text-muted">{utilities.lottery.date}</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold">Agenda CRÓNICA</h2>
        <ul className="divide-y divide-line border border-line">
          {events.map((event) => (
            <li key={event.id} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted">{event.location}</p>
              </div>
              <div className="text-sm">
                <span className="text-accent">{event.category}</span>
                <span className="mx-2 text-muted">·</span>
                <span>{formatDate(event.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/buscar" className="border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent">
          Buscar noticias
        </Link>
        <Link href="/contacto" className="border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent">
          Contacto
        </Link>
        <Link href="/galeria" className="border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent">
          Galería
        </Link>
      </div>
    </div>
  );
}
