"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
}: {
  selected: boolean;
  onSelect: () => void;
  icon: LucideIcon;
  title: string;
  desc: string;
  price?: string;
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
        <Icon className="h-5 w-5 text-brand-800" />
      </span>
      <span className="flex flex-1 flex-col">
        <span className="text-label text-text-primary">{title}</span>
        <span className="text-body-sm text-text-secondary">{desc}</span>
      </span>
      {price && <span className="text-label text-text-primary">{price}</span>}
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

      {/* Progreso móvil */}
      <div className="border-b border-border bg-surface py-4 lg:hidden">
        <div className="container-page">
          <CheckoutSteps current={1} />
        </div>
      </div>

      {/* Resumen colapsable (móvil) */}
      <button
        onClick={() => setSummaryOpen((o) => !o)}
        className="flex items-center justify-between border-b border-border bg-brand-100 px-4 py-3.5 lg:hidden"
      >
        <span className="flex items-center gap-2 text-label text-brand-800">
          <ShoppingBag className="h-[18px] w-[18px]" /> {summaryOpen ? "Ocultar" : "Ver"} resumen ({count})
          <ChevronDown className={cn("h-4 w-4 transition-transform", summaryOpen && "rotate-180")} />
        </span>
        <span className="text-price-sm text-brand-800">{formatPrice(total)}</span>
      </button>
      {summaryOpen && (
        <div className="border-b border-border bg-surface px-4 py-4 lg:hidden">
          <SummaryRows subtotal={subtotal} shipCost={shipCost} tax={tax} discount={discount} total={total} count={count} />
        </div>
      )}

      <div className="container-page grid flex-1 gap-10 py-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Formularios */}
        <div className="flex flex-col gap-5">
          <Section title="Pago exprés">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { l: "UPI", c: "bg-brand-800 text-white" },
                { l: "PayPal", c: "bg-accent-500 text-brand-900" },
                { l: "Transferencia", c: "bg-surface text-text-primary border border-border-strong" },
              ].map((b) => (
                <button key={b.l} className={cn("flex h-12 items-center justify-center rounded-md text-label", b.c)}>
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
            <Input label="Correo electrónico" icon={Mail} defaultValue="sheyla@nexora.store" placeholder="tu@correo.com" />
            <Checkbox checked onChange={() => {}} label="Enviarme ofertas y novedades por correo" />
          </Section>

          <Section title="Dirección de envío">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Nombre" defaultValue="Sheyla" />
              <Input label="Apellidos" defaultValue="Tamayo" />
            </div>
            <Input label="Dirección" icon={MapPin} defaultValue="Parque Tecnológico 221B" />
            <Input label="Depto., suite (opcional)" placeholder="Piso, referencia…" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Ciudad" defaultValue="CDMX" />
              <Select
                label="Estado"
                defaultValue="cdmx"
                options={[
                  { value: "cdmx", label: "Ciudad de México" },
                  { value: "jal", label: "Jalisco" },
                  { value: "nl", label: "Nuevo León" },
                ]}
              />
              <Input label="Código postal" defaultValue="06000" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="País"
                defaultValue="mx"
                options={[
                  { value: "mx", label: "México" },
                  { value: "us", label: "Estados Unidos" },
                ]}
              />
              <Input label="Teléfono" icon={Phone} defaultValue="+52 55 9876 5432" />
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
                      <Input label="Número de tarjeta" icon={CreditCard} defaultValue="4417 1234 5678 9010" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Vencimiento" defaultValue="08 / 29" />
                        <Input label="CVV" icon={Lock} defaultValue="•••" />
                      </div>
                      <Input label="Nombre en la tarjeta" icon={User} defaultValue="SHEYLA TAMAYO" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Checkbox checked onChange={() => {}} label="La dirección de facturación es la misma que la de envío" />
          </Section>

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

      <footer className="border-t border-border bg-surface py-5">
        <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-body-sm text-text-muted">© 2026 Nexora Electronics</p>
          <div className="flex gap-4 text-label-sm text-text-secondary">
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
