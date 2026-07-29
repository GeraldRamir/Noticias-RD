"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: { name: string; color: string };
};

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;
  const slide = slides[index];

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="relative min-h-[68vh] md:min-h-[78vh]">
        {slides.map((item, i) => (
          <div
            key={item.slug}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.coverImage && (
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 md:min-h-[78vh] md:pb-20">
          <p
            className="animate-slide-in text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: slide.category.color || "#E10600" }}
          >
            {slide.category.name}
          </p>
          <h1 className="font-display animate-fade-up mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
            <Link href={`/noticia/${slide.slug}`} className="hover:underline decoration-accent">
              {slide.title}
            </Link>
          </h1>
          {slide.excerpt && (
            <p className="animate-fade-up delay-1 mt-4 max-w-xl text-base text-white/80 md:text-lg">
              {slide.excerpt}
            </p>
          )}
          <div className="animate-fade-up delay-2 mt-8">
            <Link
              href={`/noticia/${slide.slug}`}
              className="inline-flex bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-accent-dark"
            >
              Leer ahora
            </Link>
          </div>

          {slides.length > 1 && (
            <div className="mt-10 flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  aria-label={`Ir a slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-8 transition ${i === index ? "bg-accent" : "bg-white/35"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
