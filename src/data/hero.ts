import type { HeroSlide } from "./types";

/**
 * Diapositivas del banner principal. Mientras solo haya una, el Hero no
 * muestra indicador de slider (no tendría sentido). En cuanto se agregue
 * una segunda entrada aquí, el indicador aparece automáticamente y rota
 * entre todas las diapositivas.
 */
export const heroSlides: HeroSlide[] = [
  {
    image: "hero",
    badge: "NUEVA TEMPORADA · COLECCIÓN 2026",
    title: "Mantente a la vanguardia con los últimos gadgets",
    subtitle:
      "Descubre los gadgets más nuevos que te mantienen un paso adelante: sonido premium, dispositivos inteligentes y tecnología para cada día.",
    primaryCta: { label: "Comprar ahora", href: "/categoria/auriculares" },
    secondaryCta: { label: "Ver más", href: "/categoria/ofertas" },
  },
];
