import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import type { ContentPageSlug } from "@/data/types";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { getContentPage } from "@/server";

/** Título, descripción y hreflang de una página de contenido; su ruta es `/<slug>`. */
export async function contentPageMetadata(slug: ContentPageSlug, locale: Locale): Promise<Metadata> {
  const page = await getContentPage(slug, locale);
  return { title: page.title, description: page.description, alternates: localeAlternates(`/${slug}`, locale) };
}

/**
 * Página de contenido completa a partir de `src/server/db/pages.data.ts`. Las
 * legales (con `updated`) van en una tarjeta de lectura; `wide`, sin tarjeta y
 * con grillas a todo el ancho (nosotros).
 */
export async function ContentPageView({
  slug,
  locale,
  wide = false,
}: {
  slug: ContentPageSlug;
  locale: Locale;
  wide?: boolean;
}) {
  const page = await getContentPage(slug, locale);
  const t = await getTranslations({ locale, namespace: "contentPage" });

  return (
    <ContentPageLayout title={page.title} subtitle={page.subtitle} width={wide ? "wide" : "article"}>
      {wide ? (
        <ContentBlocks blocks={page.blocks} wide />
      ) : (
        <article className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-10 shadow-elevation-sm max-md:p-8 max-sm:px-5 max-sm:py-6">
          {page.updated && (
            <p className="text-body-sm text-text-muted">
              {t("updated", { date: formatDate(page.updated, locale) })}
            </p>
          )}
          <ContentBlocks blocks={page.blocks} />
        </article>
      )}
    </ContentPageLayout>
  );
}
