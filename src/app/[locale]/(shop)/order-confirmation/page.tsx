"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  Check,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AssetImage } from "@/components/media/AssetImage";
import { Link } from "@/i18n/navigation";
import { couponDiscount } from "@/lib/coupons";
import { DEFAULT_SHIPPING_METHOD, shippingCost, type ShippingMethod } from "@/lib/shipping";
import { formatPrice } from "@/lib/format";
import { useCart, type CartItem } from "@/store/cart";
import { cn } from "@/lib/utils";

const CUSTOMER = { firstName: "Sheyla", email: "sheyla@nexora.store" };

const shippingTitles = { standard: "standardShipping", express: "expressShipping", sameday: "sameDay" } as const;

const tracker = [
  { label: "stepConfirmed", state: "done", sub: "stepConfirmedSub" },
  { label: "stepPacked", state: "current", sub: "stepPackedSub" },
  { label: "stepShipped", state: "upcoming", sub: "stepShippedSub" },
  { label: "stepDelivered", state: "upcoming", sub: "stepDeliveredSub" },
] as const;

function stepCircle(state: string, index: number) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-label-sm",
        state === "done" && "bg-brand-800 text-white",
        state === "current" && "border-2 border-brand-800 bg-surface text-brand-800",
        state === "upcoming" && "bg-surface-muted text-text-muted"
      )}
    >
      {state === "done" ? <Check className="h-4 w-4" /> : index + 1}
    </span>
  );
}

export default function ConfirmationPage() {
  const t = useTranslations("orderConfirmation");
  const tCommon = useTranslations("common");
  const tCheckout = useTranslations("checkout");
  const [snapshot, setSnapshot] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string>();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(DEFAULT_SHIPPING_METHOD);
  const clear = useCart((s) => s.clear);
  const captured = useRef(false);

  useEffect(() => {
    if (captured.current) return;
    captured.current = true;
    const { items, coupon, shippingMethod } = useCart.getState();
    setSnapshot(items);
    setCoupon(coupon);
    if (shippingMethod) setShippingMethod(shippingMethod);
    clear();
  }, [clear]);

  const subtotal = snapshot.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax = subtotal * 0.16;
  const discount = couponDiscount(coupon, subtotal);
  const shipping = shippingCost(shippingMethod, subtotal, coupon);
  const total = subtotal + tax - discount + shipping;

  return (
    <Container className="flex flex-col gap-6 py-8 sm:py-12">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
        <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-success-100">
          <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-success-500">
            <CheckCircle2 className="h-8 w-8 text-text-inverse" />
          </span>
        </span>
        <h1 className="text-h2 text-text-primary sm:text-display-l">
          {t("thanks", { name: CUSTOMER.firstName })}
        </h1>
        <p className="max-w-md text-body-lg text-text-secondary">{t("confirmed", { email: CUSTOMER.email })}</p>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-4 py-2">
          <span className="text-label text-brand-700">{t("order")}</span>
          <span className="text-label text-brand-800">#NX-482913</span>
        </span>

        <div className="mt-2 flex w-full flex-col text-left md:hidden">
          {tracker.map((step, i) => (
            <div key={step.label} className="flex gap-3.5">
              <div className="flex flex-col items-center self-stretch">
                {stepCircle(step.state, i)}
                {i < tracker.length - 1 && (
                  <span className={cn("w-0.5 flex-1", i < 1 ? "bg-brand-800" : "bg-border-strong")} />
                )}
              </div>
              <div className={cn("flex flex-col pb-6", i === tracker.length - 1 && "pb-0")}>
                <span
                  className={cn(
                    "text-label font-semibold",
                    step.state === "upcoming" ? "text-text-muted" : "text-text-primary"
                  )}
                >
                  {t(step.label)}
                </span>
                <span
                  className={cn(
                    "text-body-sm",
                    step.state === "upcoming" ? "text-text-muted" : "text-text-secondary"
                  )}
                >
                  {t(step.sub)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 hidden w-full max-w-2xl items-center justify-between md:flex">
          {tracker.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                {stepCircle(step.state, i)}
                <span
                  className={cn(
                    "text-label-sm",
                    step.state === "upcoming" ? "text-text-muted" : "text-text-primary"
                  )}
                >
                  {t(step.label)}
                </span>
              </div>
              {i < tracker.length - 1 && (
                <span className={cn("mx-1 h-0.5 flex-1", i < 1 ? "bg-brand-800" : "bg-border-strong")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-h4 text-text-primary">{t("details")}</h2>
          {snapshot.length > 0 ? (
            <>
              {snapshot.map((item) => (
                <div key={item.key} className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                    <AssetImage folder="products" name={item.product.image} alt={item.product.name} sizes="56px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-label text-text-primary max-lg:line-clamp-2">{item.product.name}</span>
                    <span className="text-body-sm text-text-secondary">
                      {item.color ? `${item.color} · ` : ""}
                      {t("quantity", { qty: item.qty })}
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-label text-text-primary">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
              <div className="h-px bg-border" />
              {[
                { l: tCommon("subtotal"), v: formatPrice(subtotal) },
                { l: tCommon("shipping"), v: shipping ? formatPrice(shipping) : tCommon("free"), h: !shipping },
                { l: tCommon("taxVat"), v: formatPrice(tax) },
                ...(discount && coupon
                  ? [{ l: tCommon("discountCode", { code: coupon }), v: `−${formatPrice(discount)}`, h: true }]
                  : []),
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between max-lg:hidden">
                  <span className="text-body text-text-secondary">{r.l}</span>
                  <span className={cn("text-label", r.h ? "text-success-500" : "text-text-primary")}>{r.v}</span>
                </div>
              ))}
              <div className="h-px bg-border max-lg:hidden" />
              <div className="flex items-center justify-between">
                <span className="text-label-lg text-text-primary">{t("totalPaid")}</span>
                <span className="text-h3 text-brand-800">{formatPrice(total)}</span>
              </div>
            </>
          ) : (
            <p className="text-body text-text-secondary">{t("registered")}</p>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 max-md:gap-5 sm:p-8 md:flex-row md:gap-6 lg:flex-col lg:gap-4">
          {[
            { icon: MapPin, title: t("shippingAddress"), lines: ["Sheyla Tamayo", "Parque Tecnológico 221B", t("addressCityLine")] },
            { icon: Truck, title: t("deliveryMethod"), lines: [tCheckout(shippingTitles[shippingMethod]), t("arrives")] },
            { icon: CreditCard, title: t("payment"), lines: [t("cardEnding"), t("paidOn")] },
          ].map((b) => (
            <div key={b.title} className="flex gap-3.5 md:flex-1 lg:flex-initial">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <b.icon className="h-5 w-5 text-brand-800" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-label text-text-primary">{b.title}</span>
                {b.lines.map((l) => (
                  <span key={l} className="text-body-sm text-text-secondary">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex flex-col gap-3 md:flex-row">
          <ButtonLink
            href="/account"
            variant="primary"
            size="lg"
            icon
            fullWidth
            className="md:w-auto md:flex-1"
          >
            {t("trackOrder")}
          </ButtonLink>
          <Button variant="secondary" size="lg" fullWidth className="md:w-auto md:flex-1">
            {t("downloadInvoice")}
          </Button>
        </div>
        <Link
          href="/category/headphones"
          className="inline-flex items-center gap-1.5 self-start text-label-lg text-brand-800"
        >
          {tCommon("continueShopping")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-3 lg:flex">
        <Button variant="outline" size="lg">
          {t("downloadInvoice")}
        </Button>
        <ButtonLink href="/account" variant="primary" size="lg">
          {t("trackOrder")}
        </ButtonLink>
        <ButtonLink href="/category/headphones" variant="ghost" size="lg">
          {tCommon("continueShopping")}
        </ButtonLink>
      </div>
    </Container>
  );
}
