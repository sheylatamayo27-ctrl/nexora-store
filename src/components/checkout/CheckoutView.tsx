"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
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
import { Logo } from "@/components/brand/Logo";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { Input, Select } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ButtonLink } from "@/components/ui/Button";
import { AssetImage } from "@/components/media/AssetImage";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

function RadioCard({
  selected,
  onSelect,
  icon: Icon,
  title,
  desc,
  price,
  priceHighlight,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: LucideIcon;
  title: string;
  desc: string;
  price?: string;
  priceHighlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors",
        selected ? "border-brand-800 bg-brand-100" : "border-border bg-surface hover:border-border-strong"
      )}
    >
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
    </button>
  );
}

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

const shippingOptions = [
  { id: "standard", icon: Truck, title: "Envío estándar", desc: "3–5 días hábiles · Llega el mar 21 oct", price: 0 },
  { id: "express", icon: Zap, title: "Envío exprés", desc: "1–2 días hábiles · Llega el sáb 18 oct", price: 199 },
  { id: "sameday", icon: Clock, title: "Entrega el mismo día", desc: "Solo CDMX · Antes de las 2:00 PM", price: 349 },
];

const paymentOptions = [
  { id: "card", icon: CreditCard, title: "Tarjeta de crédito / débito", desc: "Visa, Mastercard, Amex" },
  { id: "upi", icon: Phone, title: "Billetera / UPI", desc: "Google Pay, Mercado Pago y más" },
  { id: "bank", icon: Home, title: "Transferencia bancaria", desc: "Todos los bancos principales" },
  { id: "cod", icon: Package, title: "Pago contra entrega", desc: "Paga al recibir · Cargo de Rs. 49" },
];

export function CheckoutView() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const [shipping, setShipping] = useState("express");
  const [payment, setPayment] = useState("card");
  const [summaryOpen, setSummaryOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? items.reduce((s, i) => s + i.product.price * i.qty, 0) : 0;
  const shipCost = shippingOptions.find((o) => o.id === shipping)?.price ?? 0;
  const tax = subtotal * 0.16;
  const discount = Math.round(subtotal * 0.1);
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
            <Lock className="h-3.5 w-3.5" /> Pago seguro
          </span>
        </div>
      </header>

      {/* Progreso (<lg): móvil con segmentos (M05), tablet con pasos (T05) */}
      <div className="border-b border-border bg-surface py-4 lg:hidden">
        <div className="container-page">
          {/* Móvil (<md): "Paso 2 de 4" + barra de 4 segmentos */}
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-3">
              <span className="text-label text-text-primary">Paso 2 de 4 · Información</span>
              <span className="shrink-0 text-label-sm text-text-muted">Siguiente: Envío</span>
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
          <ShoppingBag className="h-[18px] w-[18px] shrink-0" /> Ver resumen del pedido ({count})
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
              {count === 0 && <p className="text-body text-text-secondary">Tu carrito está vacío.</p>}
              <div className="h-px bg-border" />
              <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} total={total} count={count} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-page grid flex-1 gap-10 py-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Formularios */}
        <div className="flex flex-col gap-5">
          <Section title="Pago exprés">
            {/* Móvil (<md): 2 botones (UPI, PayPal). Tablet/escritorio (≥md): 3. */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[
                { l: "UPI", c: "bg-brand-800 text-white" },
                { l: "PayPal", c: "bg-accent-500 text-brand-900" },
                { l: "Transferencia", c: "bg-surface text-text-primary border border-border-strong", hide: true },
              ].map((b) => (
                <button
                  key={b.l}
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
            title="Contacto"
            right={
              <Link href="/entrar" className="text-label-sm text-brand-700 underline underline-offset-2">
                Iniciar sesión
              </Link>
            }
          >
            <Input
              label="Correo electrónico"
              icon={Mail}
              type="email"
              inputMode="email"
              autoComplete="email"
              defaultValue="sheyla@nexora.store"
              placeholder="tu@correo.com"
            />
            <Checkbox checked onChange={() => {}} label="Enviarme ofertas y novedades por correo" />
          </Section>

          <Section title="Dirección de envío">
            {/* <md: una columna (salvo Estado + CP). ≥md: grilla tipo T05. */}
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Nombre" defaultValue="Sheyla" autoComplete="given-name" />
              <Input label="Apellidos" defaultValue="Tamayo" autoComplete="family-name" />
            </div>
            <Input label="Dirección" icon={MapPin} defaultValue="Parque Tecnológico 221B" autoComplete="address-line1" />
            <Input label="Depto., suite (opcional)" placeholder="Piso, referencia…" autoComplete="address-line2" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {/* Ciudad a ancho completo en móvil; Estado + CP lado a lado. */}
              <Input label="Ciudad" defaultValue="CDMX" autoComplete="address-level2" className="col-span-2 md:col-span-1" />
              <Select
                label="Estado"
                defaultValue="cdmx"
                autoComplete="address-level1"
                options={[
                  { value: "cdmx", label: "Ciudad de México" },
                  { value: "jal", label: "Jalisco" },
                  { value: "nl", label: "Nuevo León" },
                ]}
              />
              <Input label="Código postal" defaultValue="06000" inputMode="numeric" autoComplete="postal-code" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="País"
                defaultValue="mx"
                autoComplete="country-name"
                options={[
                  { value: "mx", label: "México" },
                  { value: "us", label: "Estados Unidos" },
                ]}
              />
              <Input
                label="Teléfono"
                icon={Phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                defaultValue="+52 55 9876 5432"
              />
            </div>
          </Section>

          <Section title="Método de envío">
            <div className="flex flex-col gap-3">
              {shippingOptions.map((o) => (
                <RadioCard
                  key={o.id}
                  selected={shipping === o.id}
                  onSelect={() => setShipping(o.id)}
                  icon={o.icon}
                  title={o.title}
                  desc={o.desc}
                  price={o.price ? formatPrice(o.price) : "Gratis"}
                  priceHighlight={!o.price}
                />
              ))}
            </div>
          </Section>

          <Section
            title="Pago"
            right={
              <span className="flex items-center gap-1.5 text-body-sm text-text-muted">
                <Lock className="h-3.5 w-3.5" /> Cifrado
              </span>
            }
          >
            <div className="flex flex-col gap-3">
              {paymentOptions.map((o) => (
                <div key={o.id} className="flex flex-col gap-3">
                  <RadioCard
                    selected={payment === o.id}
                    onSelect={() => setPayment(o.id)}
                    icon={o.icon}
                    title={o.title}
                    desc={o.desc}
                  />
                  {o.id === "card" && payment === "card" && (
                    <div className="flex flex-col gap-4 rounded-lg bg-surface-subtle p-4">
                      <Input
                        label="Número de tarjeta"
                        icon={CreditCard}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        defaultValue="4417 1234 5678 9010"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Vencimiento" inputMode="numeric" autoComplete="cc-exp" defaultValue="08 / 29" />
                        <Input label="CVV" icon={Lock} inputMode="numeric" autoComplete="cc-csc" defaultValue="•••" />
                      </div>
                      <Input label="Nombre en la tarjeta" icon={User} autoComplete="cc-name" defaultValue="SHEYLA TAMAYO" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Checkbox checked onChange={() => {}} label="La dirección de facturación es la misma que la de envío" />
          </Section>

          {/* Resumen del pedido a ancho completo — solo tablet (T05), antes de pagar. */}
          <div className="hidden flex-col gap-4 rounded-xl border border-border bg-surface p-6 md:flex lg:hidden">
            <h2 className="text-h4 text-text-primary">Resumen del pedido</h2>
            <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} total={total} count={count} />
            <p className="text-body-sm text-text-muted">Impuestos incluidos</p>
            <span className="flex items-center justify-center gap-1.5 text-body-sm text-text-muted">
              <Lock className="h-3.5 w-3.5" /> Pago seguro · Cifrado SSL de 256 bits
            </span>
          </div>

          <ButtonLink href="/pedido-confirmado" variant="primary" size="lg" fullWidth className="justify-center">
            Pagar {formatPrice(total)} de forma segura
          </ButtonLink>
          <p className="text-center text-body-sm text-text-muted">
            Al realizar tu pedido aceptas los Términos y la Política de Privacidad de Nexora.
          </p>
        </div>

        {/* Resumen (escritorio) */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-text-primary">Tu pedido ({count})</h2>
              <Link href="/carrito" className="text-label-sm text-brand-700 underline underline-offset-2">
                Editar
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
              {count === 0 && <p className="text-body text-text-secondary">Tu carrito está vacío.</p>}
            </div>
            <div className="h-px bg-border" />
            <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} total={total} count={count} />
          </div>
        </aside>
      </div>

      {/* Footer mínimo: móvil centrado (enlaces arriba); tablet enlaces a la
          izquierda y copyright a la derecha (T05); escritorio intacto. */}
      <footer className="border-t border-border bg-surface py-5">
        <div className="container-page flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="order-2 text-body-sm text-text-muted lg:order-1">© 2026 Nexora Electronics</p>
          <div className="order-1 flex gap-4 text-label-sm text-text-secondary lg:order-2">
            <span>Reembolsos</span>
            <span>Envíos</span>
            <span>Privacidad</span>
            <span>Términos</span>
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
  total,
  count,
}: {
  subtotal: number;
  shipCost: number;
  tax: number;
  discount: number;
  total: number;
  count: number;
}) {
  const rows = [
    { l: `Subtotal (${count} artículos)`, v: formatPrice(subtotal) },
    { l: "Envío", v: shipCost ? formatPrice(shipCost) : "Gratis", h: !shipCost },
    { l: "Impuestos (IVA 16%)", v: formatPrice(tax) },
    { l: "Descuento (NEXORA10)", v: `−${formatPrice(discount)}`, h: true },
  ];
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
        <span className="text-label-lg text-text-primary">Total</span>
        <span className="text-h3 text-brand-800">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
