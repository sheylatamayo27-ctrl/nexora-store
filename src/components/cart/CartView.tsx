"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, RotateCcw, Headset, Gift, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { CartLineItem } from "@/components/commerce/CartLineItem";
import { OrderSummary } from "@/components/commerce/OrderSummary";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/store/cart";
import { couponDiscount } from "@/lib/coupons";
import { GIFT_WRAP_PRICE } from "@/lib/fees";
import { formatPrice } from "@/lib/format";
import { DEFAULT_SHIPPING_METHOD, freeExpressProgress, shippingCost } from "@/lib/shipping";
import type { Product } from "@/data/types";


/** Carrito. El contenido sale del store del navegador; las recomendaciones, del servidor. */
export function CartView({ recommended }: { recommended: Product[] }) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const tCheckout = useTranslations("checkout");
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const coupon = useCart((s) => s.coupon);
  const setCoupon = useCart((s) => s.setCoupon);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-[60vh]" />;

  const count = items.reduce((n, i) => n + i.qty, 0);
  const itemCount = tCommon("itemCount", { count });
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax = subtotal * 0.16;
  const discount = couponDiscount(coupon, subtotal);
  // Envío estimado con el método que el checkout trae elegido (exprés), el mismo
  // que promete la barra de progreso: así el total coincide al pasar a pagar.
  const shipping = shippingCost(DEFAULT_SHIPPING_METHOD, subtotal, coupon);
  const total = subtotal + tax - discount + shipping;
  const { remaining, percent: pct } = freeExpressProgress(subtotal);

  if (count === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
          <ShoppingBag className="h-9 w-9 text-brand-800" />
        </span>
        <h1 className="text-h2 text-text-primary">{t("emptyTitle")}</h1>
        <p className="max-w-sm text-body-lg text-text-secondary">{t("emptyDescription")}</p>
        <ButtonLink href="/category/headphones" variant="primary" size="lg" icon>
          {t("startShopping")}
        </ButtonLink>
      </Container>
    );
  }

  return (
    <div className="flex flex-col">
      <Container className="flex flex-col gap-2 pt-8">
        <Breadcrumb items={[{ label: t("title") }]} className="max-lg:hidden" />
        {/* Conteo inline dentro del h1 (más pequeño y gris). En móvil (<sm) el
            título baja a text-h3 para que quepa en una sola línea a 360px (M04). */}
        <h1 className="text-h3 text-text-primary sm:text-display-l">
          {t("title")}{" "}
          <span className="whitespace-nowrap align-baseline text-label font-normal text-text-secondary sm:text-label-lg">
            ({itemCount})
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
                {remaining > 0
                  ? t.rich("freeShippingRemaining", {
                      amount: formatPrice(remaining),
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })
                  : t("freeShippingUnlocked")}
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
              <span className="text-label-lg text-text-primary">{itemCount}</span>
              <Link href="/category/headphones" className="text-label-sm text-brand-700">
                {tCommon("continueShopping")}
              </Link>
            </div>
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartLineItem key={item.key} item={item} />
              ))}
            </AnimatePresence>
            {/* Pie (solo tablet): seguir comprando + envoltorio de regalo */}
            <div className="hidden items-center justify-between gap-4 border-t border-border bg-surface-subtle p-4 md:flex lg:hidden">
              <Link href="/category/headphones" className="flex items-center gap-1.5 text-label text-brand-700">
                {tCommon("continueShopping")} <ArrowRight className="h-4 w-4" />
              </Link>
              <button type="button" className="flex items-center gap-2 text-label text-text-secondary">
                <Gift className="h-4 w-4 text-brand-700" /> {t("giftWrap", { amount: formatPrice(GIFT_WRAP_PRICE) })}
              </button>
            </div>
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-3">
            {(
              [
                { icon: ShieldCheck, title: "buyerProtection", sub: "buyerProtectionSub" },
                { icon: RotateCcw, title: "freeReturns", sub: "freeReturnsSub" },
                { icon: Headset, title: "needHelp", sub: "needHelpSub" },
              ] as const
            ).map((f) => (
              <div key={f.title} className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
                <f.icon className="h-5 w-5 text-brand-700" />
                <span className="text-label text-text-primary">{t(f.title)}</span>
                <span className="text-body-sm text-text-secondary">{t(f.sub)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen (max-lg:min-w-0: permite que la fila del cupón encoja en lugar
            de forzar el ancho de la columna y desbordar la página en móvil/tablet;
            en escritorio (≥lg) queda intacta). */}
        <div className="max-lg:min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <OrderSummary
            itemsLabel={t("subtotalItems", { count })}
            subtotal={subtotal}
            shipping={shipping}
            shippingLabel={tCheckout("expressShipping")}
            tax={tax}
            discount={discount}
            coupon={coupon}
            onCouponChange={setCoupon}
            total={total}
            cta={{ label: t("proceedToCheckout"), href: "/checkout" }}
            ctaHiddenOnMobile
          />
        </div>
      </Container>

      {/* Garantía (solo móvil, centrada) — con aire arriba y abajo para que no
          quede pegada a "Comprados juntos frecuentemente". */}
      <Container className="pt-4 pb-9 md:hidden">
        <p className="flex items-center justify-center gap-2 text-center text-body-sm text-text-secondary">
          <Check className="h-4 w-4 shrink-0 text-success-500" />
          {t("guarantee")}
        </p>
      </Container>

      {/* Recomendaciones */}
      <Container className="pb-20">
        <div className="flex flex-col gap-8">
          <SectionHeader title={t("frequentlyBought")} />

          {/* Móvil: grilla de 2 columnas */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {recommended.slice(0, 2).map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} />
            ))}
          </div>

          {/* Tablet: carrusel con la 4ª tarjeta asomando */}
          <div className="no-scrollbar -mx-4 hidden gap-4 overflow-x-auto px-4 pb-2 md:flex lg:hidden">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} className="w-[30%] shrink-0" />
            ))}
          </div>

          {/* Escritorio: grilla de 5 (intacta) */}
          <div className="hidden gap-4 pb-2 lg:grid lg:grid-cols-5">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} showColors={false} />
            ))}
          </div>
        </div>
      </Container>

      {/* Barra fija de pago (móvil). El footer reserva su alto vía [data-fixed-bar]. */}
      <div
        data-fixed-bar
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-4 pt-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-body-sm text-text-secondary">{tCommon("total")}</span>
            <span className="text-price text-brand-800">{formatPrice(total)}</span>
          </div>
          <ButtonLink href="/checkout" variant="primary" size="lg" icon className="flex-1">
            {t("pay")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
