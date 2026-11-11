import type { HeroSlideRecord } from "./types";

export const heroSlides: HeroSlideRecord[] = [
  {
    image: "hero",
    badge: { es: "NUEVA TEMPORADA · COLECCIÓN 2026", en: "NEW SEASON · 2026 COLLECTION" },
    title: {
      es: "Mantente a la vanguardia con los últimos gadgets",
      en: "Stay ahead with the latest gadgets",
    },
    subtitle: {
      es: "Descubre los gadgets más nuevos que te mantienen un paso adelante: sonido premium, dispositivos inteligentes y tecnología para cada día.",
      en: "Discover the newest gadgets that keep you one step ahead: premium sound, smart devices and tech for every day.",
    },
    primaryCta: { label: { es: "Comprar ahora", en: "Shop now" }, href: "/category/headphones" },
    secondaryCta: { label: { es: "Ver más", en: "See more" }, href: "/category/offers" },
  },
];
