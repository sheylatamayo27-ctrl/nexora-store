import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ContentPageBanner } from "@/components/layout/ContentPageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getNewArrivals } from "@/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("newArrivals"),
    description: t("newArrivalsDescription"),
    alternates: localeAlternates("/new-arrivals", locale),
  };
}

export default async function NewArrivalsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const [products, t] = await Promise.all([
    getNewArrivals(locale),
    getTranslations({ locale, namespace: "newArrivals" }),
  ]);

  return (
    <div className="flex flex-col">
      <ContentPageBanner title={t("title")} subtitle={t("subtitle")} />
      <Container className="py-14 max-md:py-10">
        {products.length > 0 ? (
          <div className="flex flex-col gap-6">
            <p className="text-body text-text-secondary">{t("count", { count: products.length })}</p>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
              <Sparkles className="h-9 w-9 text-brand-800" />
            </span>
            <h2 className="text-h3 text-text-primary">{t("emptyTitle")}</h2>
            <p className="text-body-lg text-text-secondary">{t("emptyText")}</p>
            <ButtonLink href="/offers" variant="primary" size="lg" icon>
              {t("emptyCta")}
            </ButtonLink>
          </div>
        )}
      </Container>
    </div>
  );
}
