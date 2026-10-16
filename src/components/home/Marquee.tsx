import { Zap } from "lucide-react";

/** Franja animada de ofertas (desplazamiento continuo). */
export function Marquee() {
  const item = (
    <span className="flex items-center gap-3 px-6">
      <Zap className="h-4 w-4 shrink-0 text-accent-500" />
      <span className="text-label-lg text-text-inverse">Ofertas Jackpot</span>
      <span className="text-body text-white/75">Toca para obtener 50% de descuento</span>
    </span>
  );

  return (
    <div className="overflow-hidden bg-gradient-to-r from-brand-800 via-brand-500 to-brand-800 py-4">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}
