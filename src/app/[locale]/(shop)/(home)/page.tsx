import type { Metadata } from "next";
import { ArrowRight, Cpu, Monitor, BatteryCharging, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AssetImage } from "@/components/media/AssetImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/commerce/Price";
import { Rating } from "@/components/commerce/Rating";
import { Countdown } from "@/components/commerce/Countdown";
import { StockBar } from "@/components/commerce/StockBar";
import { ServiceFeatures } from "@/components/commerce/ServiceFeatures";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { SectionHeader } from "@/components/home/SectionHeader";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/lib/motion";
import {
  getCategories,
  getDealProducts,
  getFeaturedProducts,
  getHeroSlides,
  getPromoBanners,
} from "@/server";

const specs = [
  { icon: Cpu, title: "specCpu", sub: "specCpuSub" },
  { icon: Monitor, title: "specDisplay", sub: "specDisplaySub" },
  { icon: BatteryCharging, title: "specBattery", sub: "specBatterySub" },
] as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return { alternates: localeAlternates("/", locale) };
}

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const [heroSlides, categories, featuredProducts, dealProducts, promoBanners, t, tc] = await Promise.all([
    getHeroSlides(locale),
    getCategories(locale),
    getFeaturedProducts(locale),
    getDealProducts(locale),
    getPromoBanners(locale),
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  /** "Top 10": las grillas de colecciones son de 5 columnas (2 filas exactas). */
  const topCategories = categories.slice(0, 10);

  return (
    <div className="flex flex-col">
      <Hero slides={heroSlides} />

      {/* Colecciones */}
      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeader
              title={t("collectionsTitle")}
              subtitle={t("collectionsSubtitle")}
              href="/category/headphones"
            />
          </Reveal>
          <Reveal>
            {/* Móvil: fila con scroll horizontal · Tablet: grilla de 5 (ícono + nombre). */}
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:hidden">
              {topCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevation-md md:w-auto"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-subtle md:h-16 md:w-16">
                    <AssetImage folder="products" name={cat.image} alt={cat.name} sizes="64px" />
                  </div>
                  <span className="w-full truncate text-label-sm text-text-primary">{cat.name}</span>
                  <span className="hidden text-body-sm text-text-secondary md:block">
                    {tc("itemCount", { count: cat.itemCount })}
                  </span>
                </Link>
              ))}
            </div>

            {/* Escritorio (≥1024): tarjetas horizontales — intacto, idéntico al diseño actual. */}
            <div className="hidden gap-4 lg:grid lg:grid-cols-5">
              {topCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-md"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-label-lg text-text-primary">{cat.name}</span>
                    <span className="truncate text-body-sm text-text-secondary">
                      {tc("itemCount", { count: cat.itemCount })}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-label-sm text-brand-700">
                      {t("shop")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface-subtle sm:h-20 sm:w-20">
                    <AssetImage folder="products" name={cat.image} alt={cat.name} sizes="80px" />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <Marquee />

      {/* Colección destacada */}
      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeader
              title={t("featuredTitle")}
              subtitle={t("featuredSubtitle")}
              href="/category/headphones"
            />
          </Reveal>
          <FeaturedCarousel products={featuredProducts} />
        </Container>
      </section>

      {/* Oferta del día */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-h3 text-text-primary sm:text-h2">{t("dealTitle")}</h2>
                  <p className="text-body text-text-secondary">{t("dealSubtitle")}</p>
                </div>
                <div className="flex items-center gap-3 max-sm:w-full">
                  <span className="hidden text-label text-text-secondary sm:inline">{tc("endsIn")}</span>
                  <Countdown endsInHours={1752} className="max-sm:w-full max-sm:justify-between" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dealProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="flex gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                      <AssetImage folder="products" name={p.image} alt={p.name} sizes="96px" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-label-sm uppercase tracking-wide text-text-muted">
                        {p.vendor}
                      </span>
                      <span className="line-clamp-2 text-label text-text-primary">{p.name}</span>
                      <Price price={p.price} compareAt={p.compareAt} size="sm" className="mt-0.5" />
                      {p.sold && (
                        <StockBar current={p.sold.current} total={p.sold.total} className="mt-auto pt-2" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Banners promocionales */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <PromoCarousel banners={promoBanners} />
        </Container>
      </section>

      {/* Producto destacado (spotlight) */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-12 md:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-subtle">
                <AssetImage folder="products" name="laptop" alt={t("spotlightImageAlt")} sizes="(max-width: 1024px) 100vw, 50vw" />
                <Badge type="sale" className="absolute left-5 top-5">
                  {t("spotlightSave", { amount: formatPrice(92500 - 85999) })}
                </Badge>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Badge type="hot">{tc("bestSeller")}</Badge>
                  <span className="text-label-sm tracking-wide text-brand-700">{t("spotlightEyebrow")}</span>
                </div>
                <h2 className="text-h2 text-text-primary sm:text-display-l">{t("spotlightTitle")}</h2>
                <Rating rating={4.9} reviews={1240} size={16} />
                <p className="max-w-lg text-body-lg text-text-secondary max-lg:line-clamp-2">
                  {t("spotlightDescription")}
                </p>
                <div className="hidden gap-3 lg:grid lg:grid-cols-3">
                  {specs.map((s) => (
                    <div key={s.title} className="flex flex-col gap-2 rounded-lg bg-surface-subtle p-4">
                      <s.icon className="h-[22px] w-[22px] text-brand-700" />
                      <span className="text-label text-text-primary">{t(s.title)}</span>
                      <span className="text-body-sm text-text-secondary">{t(s.sub)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Price price={85999} compareAt={92500} size="lg" />
                  <span className="rounded-sm bg-sale-100 px-2 py-1 text-label-sm text-sale-500">
                    {tc("percentOff", { percent: 7 })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 max-lg:flex-col max-lg:items-stretch">
                  <ButtonLink
                    href="/product/mybook-14-inch-laptop-2-8k-oled"
                    variant="primary"
                    size="lg"
                    className="max-lg:w-full"
                  >
                    {tc("addToCart")}
                  </ButtonLink>
                  <ButtonLink
                    href="/product/mybook-14-inch-laptop-2-8k-oled"
                    variant="outline"
                    size="lg"
                    className="max-lg:hidden"
                  >
                    {tc("buyNow")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Beneficios */}
      <ServiceFeatures />

      {/* Newsletter */}
      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-500 p-8 sm:p-12 lg:flex-row lg:items-center">
              <div className="relative flex max-w-lg flex-col gap-2 text-text-inverse">
                <span className="text-label-xs tracking-widest text-accent-500">{t("newsletterEyebrow")}</span>
                <h2 className="text-h2">{t("newsletterTitle")}</h2>
                <p className="text-body-lg text-white/75">{t("newsletterDescription")}</p>
              </div>
              <div className="relative flex w-full max-w-md items-center gap-2 max-sm:flex-col max-sm:items-stretch">
                <div className="flex h-14 items-center gap-3 rounded-md bg-surface px-4 sm:flex-1 max-sm:w-full">
                  <Mail className="h-5 w-5 text-text-muted" />
                  <input
                    type="email"
                    placeholder={t("newsletterPlaceholder")}
                    className="h-full flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </div>
                <Button variant="accent" size="lg" className="max-sm:w-full">{t("subscribe")}</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
