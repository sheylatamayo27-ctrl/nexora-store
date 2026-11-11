"use client";

import { useEffect, useRef, useState } from "react";
import { Tag, Lock, TicketCheck, TicketX, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonLink } from "@/components/ui/Button";
import { findCoupon } from "@/lib/coupons";
import { formatPrice } from "@/lib/format";
import { notifyToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface Row {
  label: string;
  value: string;
  highlight?: boolean;
}

export function OrderSummary({
  itemsLabel,
  subtotal,
  shipping,
  shippingLabel,
  tax,
  discount,
  coupon,
  onCouponChange,
  total,
  showCoupon = true,
  cta,
  ctaHiddenOnMobile = false,
  className,
}: {
  itemsLabel: string;
  subtotal: number;
  shipping?: number;
  shippingLabel?: string;
  tax: number;
  discount?: number;
  coupon?: string;
  onCouponChange?: (code?: string) => void;
  total: number;
  showCoupon?: boolean;
  cta?: { label: string; href: string };
  ctaHiddenOnMobile?: boolean;
  className?: string;
}) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const rows: Row[] = [
    { label: itemsLabel, value: formatPrice(subtotal) },
    {
      label: shippingLabel ?? tCommon("shipping"),
      value: shipping ? formatPrice(shipping) : tCommon("free"),
      highlight: !shipping,
    },
    { label: t("estimatedTax"), value: formatPrice(tax) },
  ];
  if (discount && coupon) {
    rows.push({ label: tCommon("discountCode", { code: coupon }), value: `−${formatPrice(discount)}`, highlight: true });
  }

  return (
    <div className={cn("flex flex-col gap-4 rounded-xl border border-border bg-surface p-6", className)}>
      <h3 className="text-h4 text-text-primary">{tCommon("orderSummary")}</h3>

      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-body text-text-secondary">{r.label}</span>
            <span className={cn("text-label", r.highlight ? "text-success-500" : "text-text-primary")}>
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between">
        <span className="text-label-lg text-text-primary">{tCommon("total")}</span>
        <span className="text-h3 text-brand-800">{formatPrice(total)}</span>
      </div>
      <span className="text-body-sm text-text-muted">{t("taxesIncluded")}</span>

      {showCoupon && <CouponField coupon={coupon} onCouponChange={onCouponChange} />}

      {cta && (
        <ButtonLink
          href={cta.href}
          variant="primary"
          size="lg"
          fullWidth
          className={cn("mt-1", ctaHiddenOnMobile && "max-md:hidden")}
        >
          {cta.label}
        </ButtonLink>
      )}

      <div className="flex items-center justify-center gap-2 text-body-sm text-text-muted">
        <Lock className="h-3.5 w-3.5" /> {tCommon("securePaymentSsl")}
      </div>
    </div>
  );
}

const INVALID_MS = 2000;

function CouponField({ coupon, onCouponChange }: { coupon?: string; onCouponChange?: (code?: string) => void }) {
  const t = useTranslations("cart");
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const invalidTimer = useRef<ReturnType<typeof setTimeout>>();
  const removed = useRef(false);

  useEffect(() => () => clearTimeout(invalidTimer.current), []);

  useEffect(() => {
    if (!coupon && removed.current) inputRef.current?.focus();
    removed.current = false;
  }, [coupon]);

  const describe = (c: NonNullable<ReturnType<typeof findCoupon>>) =>
    c.kind === "percent" ? t("couponPercent", { percent: c.percent }) : t("couponFreeShipping");

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      inputRef.current?.focus();
      return;
    }
    const found = findCoupon(code);
    if (!found) {
      setInvalid(true);
      clearTimeout(invalidTimer.current);
      invalidTimer.current = setTimeout(() => setInvalid(false), INVALID_MS);
      notifyToast({ tone: "error", icon: TicketX, title: t("couponInvalid"), description: t("couponInvalidDescription") });
      return;
    }
    setCode("");
    onCouponChange?.(found.code);
    notifyToast({ icon: TicketCheck, title: t("couponApplied", { code: found.code }), description: describe(found) });
  };

  const applied = findCoupon(coupon);
  if (applied) {
    return (
      <div className="flex h-11 items-center gap-2 rounded-md border border-success-500/40 bg-success-100 pl-3 pr-1.5 text-success-700 motion-safe:animate-fade-in">
        <TicketCheck className="h-4 w-4 shrink-0" />
        <span className="shrink-0 text-label">{applied.code}</span>
        <span className="min-w-0 flex-1 truncate text-body-sm">· {describe(applied)}</span>
        <button
          type="button"
          onClick={() => {
            removed.current = true;
            onCouponChange?.(undefined);
          }}
          aria-label={t("couponRemove")}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-success-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500/40"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={apply} className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-11 min-w-0 flex-1 items-center gap-2 rounded-md border border-border-strong bg-surface px-3 transition-colors",
          invalid && "border-sale-500"
        )}
      >
        <Tag className={cn("h-4 w-4 shrink-0 text-text-muted", invalid && "text-sale-500")} />
        <input
          ref={inputRef}
          name="coupon"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setInvalid(false);
          }}
          placeholder={t("promoCode")}
          aria-label={t("promoCode")}
          aria-invalid={invalid || undefined}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="h-full min-w-0 flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
        />
      </div>
      <Button type="submit" variant="outline" className="shrink-0">
        {t("apply")}
      </Button>
    </form>
  );
}
