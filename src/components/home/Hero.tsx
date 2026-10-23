"use client";

import { useEffect, useState } from "react";
import { Zap, Check } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "@/lib/motion";
import { heroSlides } from "@/data/hero";

const perks = ["Garantía de 2 años", "Entrega gratis", "Calificación 4.9★"];

const AUTO_ROTATE_MS = 6000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleSlides = heroSlides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroSlides.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [hasMultipleSlides]);

  const slide = heroSlides[activeIndex];

  return (
    <section className="relative overflow-hidden bg-brand-900">
      <AssetImage
        key={slide.image}
        folder="misc"
        name={slide.image}
        alt={slide.title}
        priority
        sizes="100vw"
        className="object-cover object-[70%_30%] lg:object-center"
      />
      {/* En móvil el degradado es vertical (oscuro abajo) para dejar ver la
          foto arriba; en escritorio es horizontal (oscuro a la izquierda). */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061234]/95 via-[#061234]/65 to-[#061234]/20 lg:bg-gradient-to-r lg:from-[#061234]/95 lg:via-[#061234]/40 lg:to-transparent" />

      <div className="container-page relative flex min-h-[520px] items-end py-10 sm:min-h-[540px] sm:py-14 lg:min-h-[580px] lg:items-center lg:py-16">
        <motion.div
          key={activeIndex}
          className="flex max-w-xl flex-col gap-4 text-text-inverse sm:gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">
            <Zap className="h-3.5 w-3.5 text-accent-500" />
            <span className="text-label-xs tracking-wide text-accent-500">{slide.badge}</span>
          </span>

          <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-[3rem] lg:text-display-xl">
            {slide.title}
          </h1>

          <p className="max-w-md text-body-lg text-white/80">{slide.subtitle}</p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <ButtonLink href={slide.primaryCta.href} variant="accent" size="lg" icon>
              {slide.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={slide.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="text-text-inverse hover:bg-white/10"
            >
              {slide.secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="mt-4 flex flex-wrap gap-5">
            {perks.map((p) => (
              <span key={p} className="flex items-center gap-2 text-body text-white/85">
                <Check className="h-4 w-4 text-accent-500" />
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {hasMultipleSlides && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la diapositiva ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === activeIndex ? 28 : 8,
                backgroundColor: i === activeIndex ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
