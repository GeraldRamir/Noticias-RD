import Link from "next/link";
import { getEvents, getSportsScores, getTags } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export async function SidebarWidgets() {
  const [sports, events, tags] = await Promise.all([
    getSportsScores(),
    getEvents(),
    getTags(),
  ]);

  return (
    <>
      <div className="border border-line p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Resultados</h3>
        <ul className="mt-4 space-y-3">
          {sports.map((match) => (
            <li key={match.id} className="border-b border-line pb-3 last:border-0 last:pb-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
                {match.league}
              </p>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span>{match.home}</span>
                <span className="font-display text-lg font-bold">
                  {match.status === "scheduled"
                    ? match.time
                    : `${match.homeScore} - ${match.awayScore}`}
                </span>
                <span className="text-right">{match.away}</span>
              </div>
              {match.status === "live" && (
                <span className="mt-1 inline-block bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  En vivo · {match.time}
                </span>
              )}
            </li>
          ))}
        </ul>
        <Link href="/categoria/deportes" className="mt-3 inline-block text-xs font-bold text-accent hover:underline">
          Más deportes →
        </Link>
      </div>

      <div className="border border-line p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Agenda</h3>
        <ul className="mt-4 space-y-3">
          {events.slice(0, 3).map((event) => (
            <li key={event.id} className="text-sm">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
                {formatDate(event.date)}
              </p>
              <p className="mt-1 font-semibold leading-snug">{event.title}</p>
              <p className="text-xs text-muted">{event.location}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-line p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">En tendencia</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 8).map((tag) => (
            <Link
              key={tag.slug}
              href={`/etiqueta/${tag.slug}`}
              className="border border-line px-2.5 py-1 text-xs transition hover:border-accent hover:text-accent"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
