"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, RotateCcw, Headset, Gift, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { CartLineItem } from "@/components/commerce/CartLineItem";
import { OrderSummary } from "@/components/commerce/OrderSummary";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "@/components/home/SectionHeader";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { featuredProducts } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 15000;

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-[60vh]" />;

  const count = items.reduce((n, i) => n + i.qty, 0);
  const unit = count === 1 ? "artículo" : "artículos";
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax = subtotal * 0.16;
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal + tax - discount;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (count === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
          <ShoppingBag className="h-9 w-9 text-brand-800" />
        </span>
        <h1 className="text-h2 text-text-primary">Tu carrito está vacío</h1>
        <p className="max-w-sm text-body-lg text-text-secondary">
          Aún no has agregado productos. Descubre los últimos gadgets y encuentra algo para ti.
        </p>
        <ButtonLink href="/categoria/auriculares" variant="primary" size="lg" icon>
          Empezar a comprar
        </ButtonLink>
      </Container>
    );
  }

  return (
    <div className="flex flex-col">
      <Container className="flex flex-col gap-2 pt-8">
        <Breadcrumb items={[{ label: "Carrito de compras" }]} className="max-lg:hidden" />
        {/* Conteo inline dentro del h1 (más pequeño y gris). En móvil (<sm) el
            título baja a text-h3 para que quepa en una sola línea a 360px (M04). */}
        <h1 className="text-h3 text-text-primary sm:text-display-l">
          Carrito de compras{" "}
          <span className="whitespace-nowrap align-baseline text-label font-normal text-text-secondary sm:text-label-lg">
            ({count} {unit})
          </span>
        </h1>
      </Container>

      <Container className="grid gap-8 py-8 lg:grid-cols-[1.7fr_1fr]">
        {/* Columna de productos (max-lg:min-w-0: deja que la pista del grid encoja
            por debajo del min-content de su contenido en móvil/tablet, evitando el
            scroll horizontal; en escritorio (≥lg) queda intacta). */}
        <div className="flex flex-col gap-4 max-lg:min-w-0">
          {/* Progreso envío gratis */}
          <div className="flex flex-col gap-3 rounded-xl bg-brand-100 p-5">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 shrink-0 text-brand-800" />
              <span className="text-label text-brand-800">
                {remaining > 0 ? (
                  <>
                    ¡Te faltan <strong>{formatPrice(remaining)}</strong> para el ENVÍO exprés GRATIS!
                  </>
                ) : (
                  <>¡Felicidades! Tienes envío exprés gratis 🎉</>
                )}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-900 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            {/* Cabecera (solo escritorio) */}
            <div className="hidden items-center justify-between border-b border-border p-4 lg:flex">
              <span className="text-label-lg text-text-primary">{count} {unit}</span>
              <Link href="/categoria/auriculares" className="text-label-sm text-brand-700">
                Seguir comprando
              </Link>
            </div>
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartLineItem key={item.key} item={item} />
              ))}
            </AnimatePresence>
            {/* Pie (solo tablet): seguir comprando + envoltorio de regalo */}
            <div className="hidden items-center justify-between gap-4 border-t border-border bg-surface-subtle p-4 md:flex lg:hidden">
              <Link href="/categoria/auriculares" className="flex items-center gap-1.5 text-label text-brand-700">
                Seguir comprando <ArrowRight className="h-4 w-4" />
              </Link>
              <button type="button" className="flex items-center gap-2 text-label text-text-secondary">
                <Gift className="h-4 w-4 text-brand-700" /> Agregar envoltorio de regalo (Rs. 99)
              </button>
            </div>
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Protección al comprador", s: "Reembolso total si no es como se describe" },
              { icon: RotateCcw, t: "Devoluciones gratis 30 días", s: "Recogida fácil en tu puerta" },
              { icon: Headset, t: "¿Necesitas ayuda?", s: "Chatea 24/7 o llama al +52 55 9876 5432" },
            ].map((f) => (
              <div key={f.t} className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
                <f.icon className="h-5 w-5 text-brand-700" />
                <span className="text-label text-text-primary">{f.t}</span>
                <span className="text-body-sm text-text-secondary">{f.s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen (max-lg:min-w-0: permite que la fila del cupón encoja en lugar
            de forzar el ancho de la columna y desbordar la página en móvil/tablet;
            en escritorio (≥lg) queda intacta). */}
        <div className="max-lg:min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <OrderSummary
            itemsLabel={`Subtotal (${count} ${unit})`}
            subtotal={subtotal}
            tax={tax}
            discount={discount}
            total={total}
            cta={{ label: "Proceder al pago", href: "/checkout" }}
            ctaHiddenOnMobile
          />
        </div>
      </Container>

      {/* Garantía (solo móvil, centrada) — con aire arriba y abajo para que no
          quede pegada a "Comprados juntos frecuentemente". */}
      <Container className="pt-4 pb-9 md:hidden">
        <p className="flex items-center justify-center gap-2 text-center text-body-sm text-text-secondary">
          <Check className="h-4 w-4 shrink-0 text-success-500" />
          Devoluciones gratis en 30 días · Protección al comprador
        </p>
      </Container>

      {/* Recomendaciones — en móvil reservamos el alto de la barra fija de pago
          (+ área segura) para que el contenido no quede oculto tras ella. */}
      <Container className="pb-20 max-md:pb-[calc(6rem+env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-8">
          <SectionHeader title="Comprados juntos frecuentemente" />

          {/* Móvil: grilla de 2 columnas */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {featuredProducts.slice(0, 2).map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} />
            ))}
          </div>

          {/* Tablet: carrusel con la 4ª tarjeta asomando */}
          <div className="no-scrollbar -mx-4 hidden gap-4 overflow-x-auto px-4 pb-2 md:flex lg:hidden">
            {featuredProducts.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} className="w-[30%] shrink-0" />
            ))}
          </div>

          {/* Escritorio: grilla de 5 (intacta) */}
          <div className="hidden gap-4 pb-2 lg:grid lg:grid-cols-5">
            {featuredProducts.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} />
            ))}
          </div>
        </div>
      </Container>

      {/* Barra fija de pago (móvil) — reemplaza a la barra de navegación inferior. */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-4 pt-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-body-sm text-text-secondary">Total</span>
            <span className="text-price text-brand-800">{formatPrice(total)}</span>
          </div>
          <ButtonLink href="/checkout" variant="primary" size="lg" icon className="flex-1">
            Pagar
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
