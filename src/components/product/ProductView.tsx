"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
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
import { SectionHeader } from "@/components/home/SectionHeader";
import { Container } from "@/components/ui/Container";
import { formatPrice, discountPercent } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { favoriteToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";

const editions = [
  { label: "Estándar", value: "estandar" },
  { label: "Pro · +Rs. 1,500", value: "pro" },
  { label: "Max · Agotado", value: "max", disabled: true },
];

const highlights = [
  { icon: BatteryCharging, title: "40 h de batería", sub: "Carga de 10 min = 5 h" },
  { icon: Headphones, title: "ANC híbrido", sub: "Hasta 98% menos ruido" },
  { icon: Zap, title: "Baja latencia", sub: "Ideal para gaming y video" },
  { icon: Cpu, title: "Multipunto", sub: "Conecta dos equipos a la vez" },
];

const specTable = [
  ["Driver", "40 mm dinámico, ajuste personalizado"],
  ["Respuesta de frecuencia", "20 Hz – 40 kHz (Hi-Res)"],
  ["Batería", "Hasta 40 h (ANC on), 60 h (ANC off)"],
  ["Carga", "USB-C, 10 min = 5 h de reproducción"],
  ["Conectividad", "Bluetooth 5.3, multipunto, LDAC"],
  ["Peso", "250 g"],
];

const reviews = [
  {
    initials: "AS",
    name: "Ana Sánchez",
    meta: "Compra verificada · 12 sep 2026",
    title: "La mejor cancelación de ruido a este precio",
    body: "El sonido es cálido y detallado, el ANC bloquea por completo el metro y la batería dura toda la semana.",
    helpful: 24,
  },
  {
    initials: "RK",
    name: "Roberto Cano",
    meta: "Compra verificada · 28 ago 2026",
    title: "Cómodos para largas jornadas",
    body: "Los uso más de 8 horas en llamadas. Las almohadillas se mantienen frescas y el micrófono es claro.",
    helpful: 17,
  },
  {
    initials: "MP",
    name: "María Pérez",
    meta: "Compra verificada · 03 ago 2026",
    title: "Sensación premium, gran app",
    body: "La calidad de construcción se siente mucho más cara de lo que cuesta. El ecualizador de la app es excelente.",
    helpful: 9,
  },
];

const distribution = [
  { stars: 5, pct: 86, count: 1066 },
  { stars: 4, pct: 9, count: 112 },
  { stars: 3, pct: 3, count: 37 },
  { stars: 2, pct: 1, count: 15 },
  { stars: 1, pct: 1, count: 10 },
];

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const add = useCart((s) => s.add);
  const toggleFavorite = useFavorites((s) => s.toggle);
  const favorites = useFavorites((s) => s.items);
  const wished = favorites.some((p) => p.id === product.id);
  const handleWish = () => favoriteToast(product, toggleFavorite(product));
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [edition, setEdition] = useState("pro");
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const discount = discountPercent(product.price, product.compareAt);

  return (
    <div className="flex flex-col">
      {/* Bloque superior */}
      <div className="bg-surface">
        <Container className="flex flex-col gap-6 py-6">
          <Breadcrumb
            items={[
              { label: "Tienda", href: "/categoria/auriculares" },
              { label: product.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Galería */}
            <div className="flex gap-4 self-start">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`relative h-16 w-16 overflow-hidden rounded-lg bg-surface-subtle sm:h-20 sm:w-20 ${
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
                    aria-label={wished ? "Quitar de favoritos" : "Guardar en favoritos"}
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
                    aria-label="Compartir"
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
                <Badge type="hot">Más vendido</Badge>
                <span className="text-label-sm tracking-wide text-brand-700">
                  {product.vendor.toUpperCase()} AUDIO
                </span>
              </div>
              <h1 className="text-h2 text-text-primary sm:text-display-l">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <Rating rating={product.rating} showCount={false} size={16} />
                <span className="text-label text-text-primary">{product.rating.toFixed(1)}</span>
                <span className="text-label-sm text-brand-700 underline underline-offset-2">
                  {product.reviews.toLocaleString("es-MX")} reseñas
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
                    {discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-body-sm text-text-muted">
                Impuestos incluidos · Mensualidades desde Rs. 667/mes · Envío gratis
              </p>

              <div className="h-px bg-border" />

              {product.shortDescription && (
                <p className="text-body-lg text-text-secondary">{product.shortDescription}</p>
              )}

              {/* Color */}
              {product.colors && (
                <div className="flex flex-col gap-3">
                  <span className="text-label text-text-secondary">
                    Color: <span className="text-text-primary">{color}</span>
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
                <span className="text-label text-text-secondary">Edición</span>
                <div className="flex flex-wrap gap-2">
                  {editions.map((e) => (
                    <OptionChip
                      key={e.value}
                      selected={edition === e.value}
                      disabled={e.disabled}
                      onClick={() => !e.disabled && setEdition(e.value)}
                    >
                      {e.label}
                    </OptionChip>
                  ))}
                </div>
              </div>

              {/* Compra */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <QuantityStepper value={qty} onChange={setQty} />
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => add(product, { qty, color })}
                >
                  Agregar al carrito
                </Button>
                <ButtonLink href="/carrito" variant="accent" size="lg" className="flex-1">
                  Comprar ahora
                </ButtonLink>
                <button
                  type="button"
                  onClick={handleWish}
                  aria-label={wished ? "Quitar de favoritos" : "Guardar en favoritos"}
                  aria-pressed={wished}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-md border transition-colors",
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
                {[
                  { icon: Truck, t: "Entrega gratis el vie 17 oct", s: "Haz tu pedido en las próximas 4 h 20 min" },
                  { icon: RotateCcw, t: "Devoluciones fáciles en 30 días", s: "Sin preguntas, recogida gratuita" },
                  { icon: ShieldCheck, t: "Garantía Nexora de 2 años", s: "Cubre defectos de fabricación" },
                ].map((r, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                      <r.icon className="h-5 w-5 text-brand-800" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-label text-text-primary">{r.t}</span>
                      <span className="text-body-sm text-text-secondary">{r.s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Pestañas */}
      <Container className="py-14">
        <Tabs
          items={[
            {
              id: "desc",
              label: "Descripción",
              content: (
                <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                  <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:p-8">
                    <h3 className="text-h3 text-text-primary">Sonido envolvente, cero distracciones</h3>
                    <p className="text-body-lg text-text-secondary">
                      Aura usa seis micrófonos y un motor de ANC híbrido adaptativo para cancelar hasta
                      el 98% del ruido ambiental. Los drivers de 40 mm ofrecen graves profundos y voces
                      nítidas, mientras el Bluetooth 5.3 multipunto te deja cambiar entre laptop y
                      teléfono al instante.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {highlights.map((h) => (
                        <div key={h.title} className="flex gap-3 rounded-lg bg-surface-subtle p-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface">
                            <h.icon className="h-5 w-5 text-brand-700" />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-label text-text-primary">{h.title}</span>
                            <span className="text-body-sm text-text-secondary">{h.sub}</span>
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
              label: "Especificaciones",
              content: (
                <div className="overflow-hidden rounded-xl border border-border">
                  {specTable.map(([k, v], i) => (
                    <div key={k} className={`flex gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-surface-subtle" : "bg-surface"}`}>
                      <span className="w-48 shrink-0 text-label text-text-secondary">{k}</span>
                      <span className="text-body text-text-primary">{v}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              id: "reviews",
              label: `Reseñas (${product.reviews.toLocaleString("es-MX")})`,
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
                              <span className="text-body-sm text-text-muted">{r.meta}</span>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                            ))}
                          </div>
                        </div>
                        <h4 className="text-label-lg text-text-primary">{r.title}</h4>
                        <p className="text-body text-text-secondary">{r.body}</p>
                        <span className="flex items-center gap-2 text-label-sm text-text-secondary">
                          <ThumbsUp className="h-3.5 w-3.5" /> Útil ({r.helpful})
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

      {/* Relacionados */}
      <Container className="pb-20">
        <div className="flex flex-col gap-8">
          <SectionHeader title="También te puede gustar" />
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} className="w-[70vw] shrink-0 sm:w-auto" />
            ))}
          </div>
        </div>
      </Container>

      {/* Beneficios (igual que en el home), encima del pie de página */}
      <ServiceFeatures />
    </div>
  );
}

function ReviewSummary({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:p-8">
      <h4 className="text-h4 text-text-primary">Reseñas de clientes</h4>
      <div className="flex items-center gap-4">
        <span className="text-display-l text-text-primary">{rating.toFixed(1)}</span>
        <div className="flex flex-col gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-[18px] w-[18px] fill-accent-500 text-accent-500" />
            ))}
          </div>
          <span className="text-body-sm text-text-secondary">
            Basado en {reviews.toLocaleString("es-MX")} reseñas
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
        Escribir una reseña
      </Button>
    </div>
  );
}
