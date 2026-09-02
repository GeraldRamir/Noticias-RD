import Link from "next/link";
import { getUtilities } from "@/lib/queries";

export async function UtilityBar() {
  const { weather, exchange, lottery } = await getUtilities();

  return (
    <div className="border-b border-line bg-paper-soft">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wide text-accent">Clima</span>
          <span className="text-muted">
            {weather.city}: {weather.temp}°C · {weather.condition}
          </span>
        </div>
        <div className="hidden h-4 w-px bg-line sm:block" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold uppercase tracking-wide text-accent">Divisas</span>
          {exchange.map((rate) => (
            <span key={rate.currency} className="text-muted">
              {rate.currency} {rate.sell}{" "}
              <span className={rate.change.startsWith("+") ? "text-emerald-600" : "text-accent"}>
                {rate.change}
              </span>
            </span>
          ))}
        </div>
        <div className="hidden h-4 w-px bg-line md:block" />
        <div className="hidden items-center gap-2 md:flex">
          <span className="font-bold uppercase tracking-wide text-accent">Lotería</span>
          <span className="text-muted">
            {lottery.name}: {lottery.numbers.join(" · ")} +{lottery.bonus}
          </span>
        </div>
        <Link
          href="/servicios"
          className="ml-auto hidden font-semibold uppercase tracking-wide text-ink-soft hover:text-accent lg:inline"
        >
          Servicios →
        </Link>
      </div>
    </div>
  );
}
