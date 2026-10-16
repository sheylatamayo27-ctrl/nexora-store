"use client";

import { Zap, Check } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "@/lib/motion";

const perks = ["Garantía de 2 años", "Entrega gratis", "Calificación 4.9★"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <AssetImage
        folder="misc"
        name="hero"
        alt="Los últimos gadgets"
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061234]/95 via-[#061234]/70 to-transparent lg:via-[#061234]/40" />

      <div className="container-page relative flex min-h-[460px] items-center py-16 sm:min-h-[520px] lg:min-h-[580px]">
        <motion.div
          className="flex max-w-xl flex-col gap-5 text-text-inverse"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">
            <Zap className="h-3.5 w-3.5 text-accent-500" />
            <span className="text-label-xs tracking-wide text-accent-500">
              NUEVA TEMPORADA · COLECCIÓN 2026
            </span>
          </span>

          <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-[3rem] lg:text-display-xl">
            Mantente a la vanguardia con los últimos gadgets
          </h1>

          <p className="max-w-md text-body-lg text-white/80">
            Descubre los gadgets más nuevos que te mantienen un paso adelante: sonido premium,
            dispositivos inteligentes y tecnología para cada día.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <ButtonLink href="/categoria/auriculares" variant="accent" size="lg" icon>
              Comprar ahora
            </ButtonLink>
            <ButtonLink href="/categoria/ofertas" variant="ghost" size="lg" className="text-text-inverse hover:bg-white/10">
              Ver más
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

      {/* Indicador de slider (decorativo) */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 rounded-full bg-white/40 transition-all"
            style={{ width: i === 0 ? 28 : 8, backgroundColor: i === 0 ? "#fff" : undefined }}
          />
        ))}
      </div>
    </section>
  );
}
