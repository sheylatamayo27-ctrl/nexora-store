"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  BatteryCharging,
  Headphones,
  Zap,
  Cpu,
  Star,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AssetImage } from "@/components/media/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/commerce/Rating";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { OptionChip } from "@/components/ui/Chip";
import { Tabs } from "@/components/ui/Tabs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ServiceFeatures } from "@/components/commerce/ServiceFeatures";
import { Accordion } from "@/components/ui/Accordion";
import { MobileGallery } from "@/components/product/MobileGallery";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { formatPrice, formatNumber, discountPercent } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { favoriteToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";

// Contenido de ejemplo de la ficha. Los textos son claves del namespace "product".
const editions: {
  label: "editionStandard" | "editionPro" | "editionMax";
  value: string;
  delta: number;
  disabled?: boolean;
}[] = [
  { label: "editionStandard", value: "estandar", delta: -1500 },
  { label: "editionPro", value: "pro", delta: 0 },
  { label: "editionMax", value: "max", disabled: true, delta: 0 },
];

const highlights = [
  { icon: BatteryCharging, title: "highlightBattery", sub: "highlightBatterySub" },
  { icon: Headphones, title: "highlightAnc", sub: "highlightAncSub" },
  { icon: Zap, title: "highlightLatency", sub: "highlightLatencySub" },
  { icon: Cpu, title: "highlightMultipoint", sub: "highlightMultipointSub" },
] as const;

const specTable = [
  ["specDriver", "specDriverValue"],
  ["specFrequency", "specFrequencyValue"],
  ["specBattery", "specBatteryValue"],
  ["specCharging", "specChargingValue"],
  ["specConnectivity", "specConnectivityValue"],
  ["specWeight", "specWeightValue"],
] as const;

// Nombres de quien reseña: no se traducen.
const reviews = [
  { initials: "AS", name: "Ana Sánchez", meta: "review1Meta", title: "review1Title", body: "review1Body", helpful: 24 },
  { initials: "RK", name: "Roberto Cano", meta: "review2Meta", title: "review2Title", body: "review2Body", helpful: 17 },
  { initials: "MP", name: "María Pérez", meta: "review3Meta", title: "review3Title", body: "review3Body", helpful: 9 },
] as const;

const distribution = [
  { stars: 5, pct: 86, count: 1066 },
  { stars: 4, pct: 9, count: 112 },
  { stars: 3, pct: 3, count: 37 },
  { stars: 2, pct: 1, count: 15 },
  { stars: 1, pct: 1, count: 10 },
];

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const reviewCount = { count: product.reviews, formatted: formatNumber(product.reviews, locale) };
  const [mounted, setMounted] = useState(false);
  const add = useCart((s) => s.add);
  const toggleFavorite = useFavorites((s) => s.toggle);
  const favorites = useFavorites((s) => s.items);
  useEffect(() => setMounted(true), []);
  // Hasta el montaje se pinta como en el servidor (favoritos vienen de localStorage).
  const wished = mounted && favorites.some((p) => p.id === product.id);
  const handleWish = () => favoriteToast(product, toggleFavorite(product));
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [edition, setEdition] = useState("pro");
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const discount = discountPercent(product.price, product.compareAt);
  const galleryImages = Array.from({ length: 4 }, () => product.image);
  const unitPrice = product.price + (editions.find((e) => e.value === edition)?.delta ?? 0);

  return (
    <div className="flex flex-col">
      {/* Bloque superior */}
      <div className="bg-surface">
        <Container className="flex flex-col gap-6 py-6 max-lg:gap-4 max-lg:pt-4">
          <Breadcrumb
            items={[
              { label: tCommon("shop"), href: "/category/headphones" },
              { label: product.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Galería móvil/tablet: carrusel deslizable con contador (M03/T03). */}
            <div className="lg:hidden">
              <MobileGallery
                images={galleryImages}
                alt={product.name}
                badge={product.badge}
                wished={wished}
                onWish={handleWish}
              />
            </div>

            {/* Galería escritorio (intacta): miniaturas en columna + imagen grande. */}
            <div className="hidden self-start lg:flex lg:gap-4">
              <div className="flex gap-3 lg:flex-col">
                {Array.from({ length: 4 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-subtle sm:h-20 sm:w-20 ${
                      activeThumb === i ? "ring-2 ring-brand-800" : "ring-1 ring-border"
                    }`}
                  >
                    <AssetImage folder="products" name={product.image} alt={product.name} sizes="80px" />
                  </button>
                ))}
              </div>
              <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-surface-subtle">
                <AssetImage
                  folder="products"
                  name={product.image}
                  alt={product.name}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.badge && (
                  <Badge type={product.badge.type} className="absolute left-4 top-4">
                    {product.badge.label}
                  </Badge>
                )}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleWish}
                    aria-label={wished ? tCommon("removeFromWishlist") : tCommon("saveToWishlist")}
                    aria-pressed={wished}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-elevation-sm transition-transform hover:scale-105"
                  >
                    <Heart
                      className={cn(
                        "h-[18px] w-[18px] transition-colors",
                        wished ? "fill-sale-500 text-sale-500" : "text-text-primary"
                      )}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label={tCommon("share")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-elevation-sm transition-transform hover:scale-105"
                  >
                    <Share2 className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Badge type="hot">{tCommon("bestSeller")}</Badge>
                <span className="text-label-sm tracking-wide text-brand-700">
                  {t("brandLine", { vendor: product.vendor.toUpperCase() })}
                </span>
              </div>
              <h1 className="text-h2 text-text-primary sm:text-display-l">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <Rating rating={product.rating} showCount={false} size={16} />
                <span className="text-label text-text-primary">{product.rating.toFixed(1)}</span>
                <span className="text-label-sm text-brand-700 underline underline-offset-2">
                  {t("reviewCount", reviewCount)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-h2 text-brand-800">{formatPrice(product.price)}</span>
                {product.compareAt && (
                  <span className="text-price text-text-muted line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                )}
                {discount && (
                  <span className="rounded-sm bg-sale-100 px-2 py-1 text-label-sm text-sale-500">
                    {tCommon("percentOff", { percent: discount })}
                  </span>
                )}
              </div>
              <p className="text-body-sm text-text-muted">{t("taxLine")}</p>

              <div className="h-px bg-border" />

              {product.shortDescription && (
                <p className="text-body-lg text-text-secondary">{product.shortDescription}</p>
              )}

              {/* Color */}
              {product.colors && (
                <div className="flex flex-col gap-3">
                  <span className="text-label text-text-secondary">
                    {t.rich("colorSelected", {
                      color: color ?? "",
                      value: (chunks) => <span className="text-text-primary">{chunks}</span>,
                    })}
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        title={c.name}
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          color === c.name ? "ring-2 ring-brand-800 ring-offset-2" : ""
                        }`}
                      >
                        <span
                          className="h-7 w-7 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Edición */}
              <div className="flex flex-col gap-3">
                <span className="text-label text-text-secondary">{t("edition")}</span>
                <div className="flex flex-wrap gap-2">
                  {editions.map((e) => (
                    <OptionChip
                      key={e.value}
                      selected={edition === e.value}
                      disabled={e.disabled}
                      onClick={() => !e.disabled && setEdition(e.value)}
                    >
                      {t(e.label)}
                    </OptionChip>
                  ))}
                </div>
              </div>

              {/* Compra en línea (tablet + escritorio). En móvil va en la barra fija. */}
              <div className="hidden flex-wrap items-center gap-3 pt-1 md:flex">
                <QuantityStepper value={qty} onChange={setQty} />
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => add(product, { qty, color })}
                >
                  {tCommon("addToCart")}
                </Button>
                <ButtonLink href="/cart" variant="accent" size="lg" className="flex-1">
                  {tCommon("buyNow")}
                </ButtonLink>
                <button
                  type="button"
                  onClick={handleWish}
                  aria-label={wished ? tCommon("removeFromWishlist") : tCommon("saveToWishlist")}
                  aria-pressed={wished}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-md border transition-colors max-lg:hidden",
                    wished ? "border-sale-500 bg-sale-100" : "border-border-strong hover:bg-surface-subtle"
                  )}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      wished ? "fill-sale-500 text-sale-500" : "text-text-primary"
                    )}
                  />
                </button>
              </div>

              {/* Entrega */}
              <div className="overflow-hidden rounded-lg border border-border">
                {(
                  [
                    { icon: Truck, t: "freeDeliveryDate", s: "orderWithin" },
                    { icon: RotateCcw, t: "easyReturns", s: "easyReturnsSub" },
                    { icon: ShieldCheck, t: "warranty", s: "warrantySub" },
                  ] as const
                ).map((r, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                      <r.icon className="h-5 w-5 text-brand-800" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-label text-text-primary">{t(r.t)}</span>
                      <span className="text-body-sm text-text-secondary">{t(r.s)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Pestañas (tablet + escritorio) */}
      <Container className="hidden py-14 md:block">
        <Tabs
          items={[
            {
              id: "desc",
              label: t("tabDescription"),
              content: (
                <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                  <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:p-8">
                    <h3 className="text-h3 text-text-primary">{t("descriptionTitle")}</h3>
                    <p className="text-body-lg text-text-secondary">{t("descriptionBody")}</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {highlights.map((h) => (
                        <div key={h.title} className="flex gap-3 rounded-lg bg-surface-subtle p-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface">
                            <h.icon className="h-5 w-5 text-brand-700" />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-label text-text-primary">{t(h.title)}</span>
                            <span className="text-body-sm text-text-secondary">{t(h.sub)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ReviewSummary rating={product.rating} reviews={product.reviews} />
                </div>
              ),
            },
            {
              id: "specs",
              label: t("tabSpecs"),
              content: (
                <div className="overflow-hidden rounded-xl border border-border">
                  {specTable.map(([k, v], i) => (
                    <div key={k} className={`flex gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-surface-subtle" : "bg-surface"}`}>
                      <span className="w-48 shrink-0 text-label text-text-secondary">{t(k)}</span>
                      <span className="text-body text-text-primary">{t(v)}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              id: "reviews",
              label: t("tabReviews", { count: reviewCount.formatted }),
              content: (
                <div className="flex flex-col gap-6">
                  <div className="grid gap-6 lg:grid-cols-3">
                    {reviews.map((r) => (
                      <article key={r.name} className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-label text-brand-800">
                              {r.initials}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-label text-text-primary">{r.name}</span>
                              <span className="text-body-sm text-text-muted">{t(r.meta)}</span>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                            ))}
                          </div>
                        </div>
                        <h4 className="text-label-lg text-text-primary">{t(r.title)}</h4>
                        <p className="text-body text-text-secondary">{t(r.body)}</p>
                        <span className="flex items-center gap-2 text-label-sm text-text-secondary">
                          <ThumbsUp className="h-3.5 w-3.5" /> {t("helpful", { count: r.helpful })}
                        </span>
                      </article>
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Container>

      {/* Acordeones + reseñas (móvil) — M03 */}
      <Container className="flex flex-col gap-4 py-10 md:hidden">
        <Accordion title={t("tabDescription")} defaultOpen>
          <div className="flex flex-col gap-4">
            <h3 className="text-h4 text-text-primary">{t("descriptionTitle")}</h3>
            <p className="text-body text-text-secondary">{t("descriptionBody")}</p>
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div key={h.title} className="flex flex-col gap-2 rounded-lg bg-surface-subtle p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface">
                    <h.icon className="h-[18px] w-[18px] text-brand-700" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-text-primary">{t(h.title)}</span>
                    <span className="text-body-sm text-text-secondary">{t(h.sub)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Accordion>

        <Accordion title={t("tabSpecs")}>
          <div className="overflow-hidden rounded-lg border border-border">
            {specTable.map(([k, v], i) => (
              <div
                key={k}
                className={`flex flex-col gap-0.5 px-4 py-3 ${i % 2 === 0 ? "bg-surface-subtle" : "bg-surface"}`}
              >
                <span className="text-label-sm text-text-secondary">{t(k)}</span>
                <span className="text-body text-text-primary">{t(v)}</span>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title={t("shippingAndReturns")}>
          <div className="flex flex-col gap-3 text-body text-text-secondary">
            <p>{t("shippingInfo")}</p>
            <p>{t("returnsInfo")}</p>
            <p>{t("warrantyInfo")}</p>
          </div>
        </Accordion>

        {/* Resumen de reseñas */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <span className="text-display-l text-text-primary">{product.rating.toFixed(1)}</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <span className="text-body-sm text-text-secondary">{t("basedOn", reviewCount)}</span>
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            {t("writeReviewShort")}
          </Button>
        </div>

        {/* Una reseña */}
        <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-label text-brand-800">
                {reviews[0].initials}
              </span>
              <div className="flex flex-col">
                <span className="text-label text-text-primary">{reviews[0].name}</span>
                <span className="text-body-sm text-text-muted">{t(reviews[0].meta)}</span>
              </div>
            </div>
            <div className="flex shrink-0 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
              ))}
            </div>
          </div>
          <h4 className="text-label-lg text-text-primary">{t(reviews[0].title)}</h4>
          <p className="text-body text-text-secondary">{t(reviews[0].body)}</p>
          <span className="flex items-center gap-2 text-label-sm text-text-secondary">
            <ThumbsUp className="h-3.5 w-3.5" /> {t("helpful", { count: reviews[0].helpful })}
          </span>
        </article>
      </Container>

      {/* Relacionados */}
      <Container className="pb-20">
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-h3 text-text-primary sm:text-h2">{t("youMayAlsoLike")}</h2>
            </div>
            <Link
              href="/category/headphones"
              className="flex shrink-0 items-center gap-1.5 text-label text-brand-700 transition-colors hover:text-brand-800 lg:hidden"
            >
              {tCommon("viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Móvil: grilla de 2 columnas */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {related.slice(0, 2).map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} />
            ))}
          </div>

          {/* Tablet: carrusel con la 4ª tarjeta asomando */}
          <div className="no-scrollbar -mx-4 hidden gap-4 overflow-x-auto px-4 pb-2 md:flex lg:hidden">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} className="w-[30%] shrink-0" />
            ))}
          </div>

          {/* Escritorio: grilla de 5 (intacta) */}
          <div className="hidden gap-4 pb-2 lg:grid lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} />
            ))}
          </div>
        </div>
      </Container>

      {/* Beneficios (igual que en el home), encima del pie de página */}
      <ServiceFeatures />

      {/* Barra fija de compra (móvil). El footer reserva su alto vía [data-fixed-bar]. */}
      <div
        data-fixed-bar
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-4 pt-3 md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      >
        <div className="flex items-center gap-2.5">
          <QuantityStepper value={qty} onChange={setQty} />
          <Button
            variant="primary"
            size="lg"
            className="flex-1 px-4"
            onClick={() => add(product, { qty, color })}
          >
            {t("addWithPrice", { amount: formatNumber(unitPrice * qty, locale) })}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ReviewSummary({ rating, reviews }: { rating: number; reviews: number }) {
  const t = useTranslations("product");
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:p-8">
      <h4 className="text-h4 text-text-primary">{t("customerReviews")}</h4>
      <div className="flex items-center gap-4">
        <span className="text-display-l text-text-primary">{rating.toFixed(1)}</span>
        <div className="flex flex-col gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-[18px] w-[18px] fill-accent-500 text-accent-500" />
            ))}
          </div>
          <span className="text-body-sm text-text-secondary">
            {t("basedOn", { count: reviews, formatted: formatNumber(reviews, locale) })}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {distribution.map((d) => (
          <div key={d.stars} className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-label-sm text-text-primary">
              {d.stars}
              <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full rounded-full bg-accent-500" style={{ width: `${d.pct}%` }} />
            </div>
            <span className="w-10 text-right text-body-sm text-text-secondary">{d.count}</span>
          </div>
        ))}
      </div>
      <Button variant="outline" fullWidth>
        {t("writeReview")}
      </Button>
    </div>
  );
}
