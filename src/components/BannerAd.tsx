import Image from "next/image";
import Link from "next/link";

type Banner = {
  title: string;
  imageUrl: string;
  linkUrl: string | null;
};

type BannerVariant = "leaderboard" | "billboard" | "sidebar" | "article";

const VARIANT_STYLES: Record<
  BannerVariant,
  { aspect: string; maxHeight?: string; sizes: string }
> = {
  leaderboard: {
    aspect: "aspect-[728/90]",
    maxHeight: "max-h-[90px] md:max-h-[90px]",
    sizes: "(max-width:768px) 100vw, 728px",
  },
  billboard: {
    aspect: "aspect-[970/250]",
    maxHeight: "max-h-[250px]",
    sizes: "(max-width:768px) 100vw, 970px",
  },
  sidebar: {
    aspect: "aspect-[300/250]",
    sizes: "(max-width:768px) 100vw, 300px",
  },
  article: {
    aspect: "aspect-[300/600]",
    sizes: "280px",
  },
};

type BannerAdProps = {
  banner: Banner;
  variant?: BannerVariant;
  className?: string;
};

function AdLabel({ sponsor }: { sponsor?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/80 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-sm border border-line bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-muted">
          Publicidad
        </span>
        <span className="hidden h-3 w-px bg-line sm:block" aria-hidden />
        <span className="hidden text-[10px] text-muted sm:inline">Contenido patrocinado</span>
      </div>
      {sponsor && (
        <p className="truncate text-[11px] font-medium text-ink-soft">{sponsor}</p>
      )}
    </div>
  );
}

function AdFrame({
  banner,
  variant,
  className = "",
}: {
  banner: Banner;
  variant: BannerVariant;
  className?: string;
}) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={`ad-slot relative overflow-hidden bg-[linear-gradient(135deg,#f8f8f8_0%,#f0f0f0_100%)] ${styles.aspect} ${styles.maxHeight ?? ""} w-full ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.35] ad-slot-pattern" aria-hidden />
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
        sizes={styles.sizes}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
    </div>
  );
}

export function BannerAd({ banner, variant = "billboard", className = "" }: BannerAdProps) {
  const shell = (
    <div
      className={`ad-shell group overflow-hidden rounded-sm border border-line bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${className}`}
    >
      <AdLabel sponsor={banner.title} />
      <AdFrame banner={banner} variant={variant} />
    </div>
  );

  if (banner.linkUrl) {
    return (
      <Link
        href={banner.linkUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block transition hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
        aria-label={`Publicidad: ${banner.title}`}
      >
        {shell}
      </Link>
    );
  }

  return shell;
}
