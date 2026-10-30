import type { HeroSlide } from "@/data/types";
import { heroSlides } from "./db/hero.data";

/** Diapositivas del banner principal de la home. */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  // Backend real: fetch(apiBase + "/hero-slides")
  return heroSlides;
}
