import Image from "next/image";
import Link from "next/link";

type Banner = {
  title: string;
  imageUrl: string;
  linkUrl: string | null;
};

export function BannerAd({ banner, className = "" }: { banner: Banner; className?: string }) {
  const content = (
    <div className={`relative overflow-hidden bg-paper-soft ${className}`}>
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover"
        sizes="(max-width:768px) 100vw, 320px"
      />
    </div>
  );

  if (banner.linkUrl) {
    return (
      <Link href={banner.linkUrl} target="_blank" rel="noopener noreferrer" className="block">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Publicidad</p>
        {content}
      </Link>
    );
  }

  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Publicidad</p>
      {content}
    </div>
  );
}
