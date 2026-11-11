import type { HeroSlide } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { heroSlides } from "./db/hero.data";
import { toHeroSlide } from "./localize";

export async function getHeroSlides(locale: Locale): Promise<HeroSlide[]> {
  // Backend real: fetch(apiBase + "/hero-slides?locale=" + locale)
  return heroSlides.map((s) => toHeroSlide(s, locale));
}
