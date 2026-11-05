import type { ContentPage, ContentPageSlug, FaqGroup } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { faqGroups } from "./db/faq.data";
import { contentPages } from "./db/pages.data";
import { toContentPage, toFaqGroup } from "./localize";

/*
 * Páginas de contenido (legales, envíos, nosotros) y preguntas frecuentes. Hoy
 * leen de `./db`; el día del CMS, cada función cambia su cuerpo por el fetch indicado.
 */

export async function getContentPage(slug: ContentPageSlug, locale: Locale): Promise<ContentPage> {
  // CMS real: fetch(apiBase + "/pages/" + slug + "?locale=" + locale)
  const record = contentPages.find((p) => p.slug === slug);
  if (!record) throw new Error(`Falta la página de contenido "${slug}" en src/server/db/pages.data.ts`);
  return toContentPage(record, locale);
}

export async function getFaqGroups(locale: Locale): Promise<FaqGroup[]> {
  // CMS real: fetch(apiBase + "/faq?locale=" + locale)
  return faqGroups.map((g) => toFaqGroup(g, locale));
}
