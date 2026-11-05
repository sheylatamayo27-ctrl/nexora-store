"use client";

import { forwardRef, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  Zap,
  Clock,
  Home,
  Package,
  ShoppingBag,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { FormField, SelectField } from "@/components/ui/FormField";
import { Checkbox } from "@/components/ui/Checkbox";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { AssetImage } from "@/components/media/AssetImage";
import { Link, useRouter } from "@/i18n/navigation";
import { couponDiscount, couponFreeShipping } from "@/lib/coupons";
import { formatPrice } from "@/lib/format";
import { FORM_OPTIONS, focusFirstError, useErrorText } from "@/lib/forms";
import { checkoutSchema, type CheckoutData } from "@/lib/schemas/checkout";
import { SHIPPING_RATES } from "@/lib/shipping";
import { simulateRequest } from "@/lib/simulate";
import { notifyToast } from "@/lib/toast";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

type RadioCardProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "title"> & {
  selected: boolean;
  icon: LucideIcon;
  title: string;
  desc: string;
  price?: string;
  priceHighlight?: boolean;
};

/**
 * Opción de una lista (envío, pago): tarjeta con un radio nativo oculto, así se
 * registra con `register()` y se elige con teclado (flechas) como cualquier radio.
 */
const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(function RadioCard(
  { selected, icon: Icon, title, desc, price, priceHighlight, ...props },
  ref
) {
  return (
    <label
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-4 rounded-lg border p-4 text-left transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500/40",
        selected ? "border-brand-800 bg-brand-100" : "border-border bg-surface hover:border-border-strong"
      )}
    >
      <input ref={ref} type="radio" className="sr-only" {...props} />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-2 border-brand-800" : "border-border-strong"
        )}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-800" />}
      </span>
      {/* Ícono en cuadro: visible en tablet/escritorio (≥md); oculto en móvil (M05). */}
      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface md:flex">
        <Icon className="h-5 w-5 text-brand-800" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-label text-text-primary">{title}</span>
        <span className="text-body-sm text-text-secondary">{desc}</span>
      </span>
      {price && (
        <span
          className={cn(
            "shrink-0 text-label",
            // "Gratis" en verde en móvil/tablet (M05/T05); escritorio intacto.
            priceHighlight ? "text-text-primary max-lg:text-success-500" : "text-text-primary"
          )}
        >
          {price}
        </span>
      )}
    </label>
  );
});

function Section({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h4 text-text-primary">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

// `title` y `desc`: claves del namespace "checkout".
const shippingOptions = [
  { id: "standard", icon: Truck, title: "standardShipping", desc: "standardShippingDesc", price: SHIPPING_RATES.standard },
  { id: "express", icon: Zap, title: "expressShipping", desc: "expressShippingDesc", price: SHIPPING_RATES.express },
  { id: "sameday", icon: Clock, title: "sameDay", desc: "sameDayDesc", price: SHIPPING_RATES.sameday },
] as const;

const paymentOptions = [
  { id: "card", icon: CreditCard, title: "card", desc: "cardDesc" },
  { id: "upi", icon: Phone, title: "wallet", desc: "walletDesc" },
  { id: "bank", icon: Home, title: "bankTransfer", desc: "bankTransferDesc" },
  { id: "cod", icon: Package, title: "cashOnDelivery", desc: "cashOnDeliveryDesc" },
] as const;

// `label`: claves del namespace "checkout".
const footerLinks = [
  { href: "/returns", label: "refunds" },
  { href: "/shipping", label: "shippingLink" },
  { href: "/privacy", label: "privacy" },
  { href: "/terms", label: "termsLink" },
] as const;

/** El formulario arranca vacío; solo vienen elegidos el envío exprés y el pago con tarjeta. */
const CHECKOUT_DEFAULTS: CheckoutData = {
  email: "",
  newsletter: true,
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  shippingMethod: "express",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  cardName: "",
};

/** Campos que se registran con `field()` (inputs y selects). */
type TextField = Exclude<keyof CheckoutData, "newsletter" | "shippingMethod" | "paymentMethod">;

/**
 * Checkout. Solo front-end: valida con zod (al salir de cada campo y al pagar)
 * y simula el cobro; para conectarlo, cambia `simulateRequest` por la llamada
 * real (p. ej. POST /api/orders con los datos validados).
 */
export function CheckoutView() {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const errorText = useErrorText();
  const router = useRouter();
  const [navigating, startNavigation] = useTransition();
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const coupon = useCart((s) => s.coupon);
  const [summaryOpen, setSummaryOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: CHECKOUT_DEFAULTS,
    // El foco al primer error lo lleva `focusFirstError` (centrado en pantalla).
    shouldFocusError: false,
    ...FORM_OPTIONS,
  });
  const shipping = watch("shippingMethod");
  const payment = watch("paymentMethod");

  const field = (name: TextField) => ({ ...register(name), error: errorText(errors[name]?.message) });

  const onSubmit = async () => {
    try {
      await simulateRequest(2000);
      notifyToast({ icon: CheckCircle2, title: t("paymentSuccess"), description: t("paymentSuccessDescription") });
      startNavigation(() => router.push("/order-confirmation"));
    } catch {
      notifyToast({
        tone: "error",
        icon: AlertCircle,
        title: t("paymentFailed"),
        description: tCommon("checkConnection"),
      });
    }
  };

  const subtotal = mounted ? items.reduce((s, i) => s + i.product.price * i.qty, 0) : 0;
  const shipCost = mounted && couponFreeShipping(coupon) ? 0 : shippingOptions.find((o) => o.id === shipping)?.price ?? 0;
  const tax = subtotal * 0.16;
  const discount = couponDiscount(coupon, subtotal);
  const total = subtotal + tax - discount + shipCost;
  const count = mounted ? items.reduce((n, i) => n + i.qty, 0) : 0;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header minimal */}
      <header className="border-b border-border bg-surface">
        <div className="container-page flex items-center justify-between py-3.5">
          <Logo />
          <div className="hidden lg:block">
            <CheckoutSteps current={1} />
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-success-100 px-3 py-1.5 text-label-sm text-success-700">
            <Lock className="h-3.5 w-3.5" /> {t("securePayment")}
          </span>
        </div>
      </header>

      {/* Progreso (<lg): móvil con segmentos (M05), tablet con pasos (T05) */}
      <div className="border-b border-border bg-surface py-4 lg:hidden">
        <div className="container-page">
          {/* Móvil (<md): "Paso 2 de 4" + barra de 4 segmentos */}
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-3">
              <span className="text-label text-text-primary">{t("stepProgress")}</span>
              <span className="shrink-0 text-label-sm text-text-muted">{t("nextStep")}</span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn("h-1.5 flex-1 rounded-full", i <= 1 ? "bg-brand-800" : "bg-border-strong")}
                />
              ))}
            </div>
          </div>
          {/* Tablet (md–lg): pasos con círculo + nombre unidos por líneas */}
          <div className="hidden md:block">
            <CheckoutSteps current={1} />
          </div>
        </div>
      </div>

      {/* Resumen colapsable (móvil/tablet) — barra azul claro + panel animado */}
      <button
        onClick={() => setSummaryOpen((o) => !o)}
        aria-expanded={summaryOpen}
        className="flex items-center justify-between gap-3 border-b border-border bg-brand-100 px-4 py-3.5 lg:hidden"
      >
        <span className="flex items-center gap-2 text-label text-brand-800">
          <ShoppingBag className="h-[18px] w-[18px] shrink-0" /> {t("viewSummary", { count })}
          <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", summaryOpen && "rotate-180")} />
        </span>
        <span className="shrink-0 text-price-sm text-brand-800">{formatPrice(total)}</span>
      </button>
      <AnimatePresence initial={false}>
        {summaryOpen && (
          <motion.div
            key="mobile-summary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-surface lg:hidden"
          >
            <div className="container-page flex flex-col gap-4 py-4">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                    <AssetImage folder="products" name={item.product.image} alt={item.product.name} sizes="56px" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-label-xs text-white ring-2 ring-surface">
                      {item.qty}
                    </span>
                  </div>
                  <span className="min-w-0 flex-1 text-label text-text-primary">{item.product.name}</span>
                  <span className="shrink-0 text-label text-text-primary">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
              {count === 0 && <p className="text-body text-text-secondary">{t("emptyCart")}</p>}
              <div className="h-px bg-border" />
              <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} coupon={coupon} total={total} count={count} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-page grid flex-1 gap-10 py-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Formularios */}
        <form noValidate onSubmit={handleSubmit(onSubmit, focusFirstError)} className="flex flex-col gap-5">
          <Section title={t("expressCheckout")}>
            {/* Móvil (<md): 2 botones (UPI, PayPal). Tablet/escritorio (≥md): 3. */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[
                { l: "UPI", c: "bg-brand-800 text-white" },
                { l: "PayPal", c: "bg-accent-500 text-brand-900" },
                { l: t("transfer"), c: "bg-surface text-text-primary border border-border-strong", hide: true },
              ].map((b) => (
                <button
                  key={b.l}
                  type="button"
                  className={cn(
                    "flex h-12 items-center justify-center rounded-md text-label",
                    b.c,
                    b.hide && "max-md:hidden"
                  )}
                >
                  {b.l}
                </button>
              ))}
            </div>
          </Section>

          <Section
            title={t("contact")}
            right={
              <Link href="/login" className="text-label-sm text-brand-700 underline underline-offset-2">
                {tCommon("signIn")}
              </Link>
            }
          >
            <FormField
              label={tCommon("fields.email")}
              icon={Mail}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              {...field("email")}
            />
            <Controller
              control={control}
              name="newsletter"
              render={({ field: newsletter }) => (
                <Checkbox checked={newsletter.value} onChange={newsletter.onChange} label={t("newsletterOptIn")} />
              )}
            />
          </Section>

          <Section title={t("shippingAddress")}>
            {/* <md: una columna (salvo Estado + CP). ≥md: grilla tipo T05. */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label={tCommon("fields.firstName")} autoComplete="given-name" {...field("firstName")} />
              <FormField label={tCommon("fields.lastName")} autoComplete="family-name" {...field("lastName")} />
            </div>
            <FormField label={t("address")} icon={MapPin} autoComplete="address-line1" {...field("address")} />
            <FormField
              label={t("apartment")}
              placeholder={t("apartmentPlaceholder")}
              autoComplete="address-line2"
              {...field("apartment")}
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {/* Ciudad a ancho completo en móvil; Estado + CP lado a lado. */}
              <FormField
                label={t("city")}
                autoComplete="address-level2"
                className="col-span-2 md:col-span-1"
                {...field("city")}
              />
              <SelectField
                label={t("state")}
                placeholder={t("selectPlaceholder")}
                defaultValue=""
                autoComplete="address-level1"
                options={[
                  { value: "cdmx", label: t("stateCdmx") },
                  { value: "jal", label: t("stateJalisco") },
                  { value: "nl", label: t("stateNuevoLeon") },
                ]}
                {...field("state")}
              />
              <FormField
                label={t("postalCode")}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                {...field("postalCode")}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label={t("country")}
                placeholder={t("selectPlaceholder")}
                defaultValue=""
                autoComplete="country-name"
                options={[
                  { value: "mx", label: t("countryMexico") },
                  { value: "us", label: t("countryUs") },
                ]}
                {...field("country")}
              />
              <FormField
                label={tCommon("fields.phone")}
                icon={Phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                {...field("phone")}
              />
            </div>
          </Section>

          <Section title={t("shippingMethod")}>
            <div className="flex flex-col gap-3">
              {shippingOptions.map((o) => (
                <RadioCard
                  key={o.id}
                  {...register("shippingMethod")}
                  value={o.id}
                  defaultChecked={o.id === CHECKOUT_DEFAULTS.shippingMethod}
                  selected={shipping === o.id}
                  icon={o.icon}
                  title={t(o.title)}
                  desc={t(o.desc)}
                  price={o.price ? formatPrice(o.price) : tCommon("free")}
                  priceHighlight={!o.price}
                />
              ))}
            </div>
          </Section>

          <Section
            title={t("payment")}
            right={
              <span className="flex items-center gap-1.5 text-body-sm text-text-muted">
                <Lock className="h-3.5 w-3.5" /> {t("encrypted")}
              </span>
            }
          >
            <div className="flex flex-col gap-3">
              {paymentOptions.map((o) => (
                <div key={o.id} className="flex flex-col gap-3">
                  <RadioCard
                    {...register("paymentMethod")}
                    value={o.id}
                    defaultChecked={o.id === CHECKOUT_DEFAULTS.paymentMethod}
                    selected={payment === o.id}
                    icon={o.icon}
                    title={t(o.title)}
                    desc={t(o.desc)}
                  />
                  {o.id === "card" && payment === "card" && (
                    <div className="flex flex-col gap-4 rounded-lg bg-surface-subtle p-4">
                      <FormField
                        label={t("cardNumber")}
                        icon={CreditCard}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        {...field("cardNumber")}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          label={t("expiry")}
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder={t("expiryPlaceholder")}
                          maxLength={7}
                          {...field("cardExpiry")}
                        />
                        <FormField
                          label={t("cvv")}
                          icon={Lock}
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={4}
                          {...field("cardCvc")}
                        />
                      </div>
                      <FormField label={t("nameOnCard")} icon={User} autoComplete="cc-name" {...field("cardName")} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Checkbox checked onChange={() => {}} label={t("billingSame")} />
          </Section>

          {/* Resumen del pedido a ancho completo — solo tablet (T05), antes de pagar. */}
          <div className="hidden flex-col gap-4 rounded-xl border border-border bg-surface p-6 md:flex lg:hidden">
            <h2 className="text-h4 text-text-primary">{tCommon("orderSummary")}</h2>
            <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} coupon={coupon} total={total} count={count} />
            <p className="text-body-sm text-text-muted">{t("taxesIncluded")}</p>
            <span className="flex items-center justify-center gap-1.5 text-body-sm text-text-muted">
              <Lock className="h-3.5 w-3.5" /> {tCommon("securePaymentSsl")}
            </span>
          </div>

          <SubmitButton busy={isSubmitting || navigating} busyLabel={t("processingPayment")}>
            {t("payAmount", { amount: formatPrice(total) })}
          </SubmitButton>
          <p className="text-center text-body-sm text-text-muted">{t("terms")}</p>
        </form>

        {/* Resumen (escritorio) */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-text-primary">{t("yourOrder", { count })}</h2>
              <Link href="/cart" className="text-label-sm text-brand-700 underline underline-offset-2">
                {t("edit")}
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                    <AssetImage folder="products" name={item.product.image} alt={item.product.name} sizes="56px" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-label-xs text-white ring-2 ring-surface">
                      {item.qty}
                    </span>
                  </div>
                  <span className="flex-1 text-label text-text-primary">{item.product.name}</span>
                  <span className="text-label text-text-primary">{formatPrice(item.product.price * item.qty)}</span>
                </div>
              ))}
              {count === 0 && <p className="text-body text-text-secondary">{t("emptyCart")}</p>}
            </div>
            <div className="h-px bg-border" />
            <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} coupon={coupon} total={total} count={count} />
          </div>
        </aside>
      </div>

      {/* Footer mínimo: móvil centrado (enlaces arriba); tablet enlaces a la
          izquierda y copyright a la derecha (T05); escritorio intacto. */}
      <footer className="border-t border-border bg-surface py-5">
        <div className="container-page flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="order-2 text-body-sm text-text-muted lg:order-1">{t("copyright")}</p>
          <div className="order-1 flex gap-4 text-label-sm text-text-secondary lg:order-2">
            {footerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-text-primary">
                {t(l.label)}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SummaryRows({
  subtotal,
  shipCost,
  tax,
  discount,
  coupon,
  total,
  count,
}: {
  subtotal: number;
  shipCost: number;
  tax: number;
  discount: number;
  coupon?: string;
  total: number;
  count: number;
}) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const rows = [
    { l: t("subtotalItems", { count }), v: formatPrice(subtotal) },
    { l: tCommon("shipping"), v: shipCost ? formatPrice(shipCost) : tCommon("free"), h: !shipCost },
    { l: tCommon("taxVat"), v: formatPrice(tax) },
  ];
  if (discount && coupon) rows.push({ l: tCommon("discountCode", { code: coupon }), v: `−${formatPrice(discount)}`, h: true });
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.l} className="flex items-center justify-between">
          <span className="text-body text-text-secondary">{r.l}</span>
          <span className={cn("text-label", r.h ? "text-success-500" : "text-text-primary")}>{r.v}</span>
        </div>
      ))}
      <div className="h-px bg-border" />
      <div className="flex items-center justify-between">
        <span className="text-label-lg text-text-primary">{tCommon("total")}</span>
        <span className="text-h3 text-brand-800">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
