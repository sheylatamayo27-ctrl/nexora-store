"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  Check,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AssetImage } from "@/components/media/AssetImage";
import { formatPrice } from "@/lib/format";
import { useCart, type CartItem } from "@/store/cart";
import { cn } from "@/lib/utils";

// `sub` (fecha/estado) solo se muestra en la línea de tiempo vertical de móvil (M06).
const tracker = [
  { label: "Pedido confirmado", state: "done", sub: "15 oct, 10:42" },
  { label: "Empaquetado", state: "current", sub: "En proceso" },
  { label: "Enviado", state: "upcoming", sub: "Estimado 16 oct" },
  { label: "Entregado", state: "upcoming", sub: "sáb 18 oct" },
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
  const [snapshot, setSnapshot] = useState<CartItem[]>([]);
  const clear = useCart((s) => s.clear);
  const captured = useRef(false);

  useEffect(() => {
    if (captured.current) return;
    captured.current = true;
    const items = useCart.getState().items;
    setSnapshot(items);
    clear();
  }, [clear]);

  const subtotal = snapshot.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax = subtotal * 0.16;
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal + tax - discount;

  return (
    // max-md:-mb-20 cancela el pb-20 móvil del <main> (sin barra inferior aquí),
    // para que no quede hueco entre los botones y el footer (M06).
    <Container className="flex flex-col gap-6 py-8 max-md:-mb-20 sm:py-12">
      {/* Tarjeta de éxito */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
        <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-success-100">
          <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-success-500">
            <CheckCircle2 className="h-8 w-8 text-text-inverse" />
          </span>
        </span>
        <h1 className="text-h2 text-text-primary sm:text-display-l">¡Gracias, Sheyla!</h1>
        <p className="max-w-md text-body-lg text-text-secondary">
          Tu pedido está confirmado y en preparación. Enviamos el recibo a sheyla@nexora.store.
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-4 py-2">
          <span className="text-label text-brand-700">Pedido</span>
          <span className="text-label text-brand-800">#NX-482913</span>
        </span>

        {/* Línea de tiempo VERTICAL (solo móvil, M06): círculo a la izquierda,
            nombre en negrita + estado/fecha en gris a la derecha. */}
        <div className="mt-2 flex w-full flex-col text-left md:hidden">
          {tracker.map((t, i) => (
            <div key={t.label} className="flex gap-3.5">
              <div className="flex flex-col items-center self-stretch">
                {stepCircle(t.state, i)}
                {i < tracker.length - 1 && (
                  <span className={cn("w-0.5 flex-1", i < 1 ? "bg-brand-800" : "bg-border-strong")} />
                )}
              </div>
              <div className={cn("flex flex-col pb-6", i === tracker.length - 1 && "pb-0")}>
                <span
                  className={cn(
                    "text-label font-semibold",
                    t.state === "upcoming" ? "text-text-muted" : "text-text-primary"
                  )}
                >
                  {t.label}
                </span>
                <span
                  className={cn(
                    "text-body-sm",
                    t.state === "upcoming" ? "text-text-muted" : "text-text-secondary"
                  )}
                >
                  {t.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tracker HORIZONTAL con nombres (tablet T06 + escritorio, intacto) */}
        <div className="mt-4 hidden w-full max-w-2xl items-center justify-between md:flex">
          {tracker.map((t, i) => (
            <div key={t.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                {stepCircle(t.state, i)}
                <span
                  className={cn(
                    "text-label-sm",
                    t.state === "upcoming" ? "text-text-muted" : "text-text-primary"
                  )}
                >
                  {t.label}
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
        {/* Detalles del pedido */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-h4 text-text-primary">Detalles del pedido</h2>
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
                      {item.color ? `${item.color} · ` : ""}Cant. {item.qty}
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-label text-text-primary">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
              <div className="h-px bg-border" />
              {/* Desglose: solo escritorio (≥lg). En móvil/tablet se muestra
                  directamente el "Total pagado" (M06/T06). */}
              {[
                { l: "Subtotal", v: formatPrice(subtotal) },
                { l: "Envío", v: "Gratis", h: true },
                { l: "Impuestos (IVA 16%)", v: formatPrice(tax) },
                { l: "Descuento (NEXORA10)", v: `−${formatPrice(discount)}`, h: true },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between max-lg:hidden">
                  <span className="text-body text-text-secondary">{r.l}</span>
                  <span className={cn("text-label", r.h ? "text-success-500" : "text-text-primary")}>{r.v}</span>
                </div>
              ))}
              <div className="h-px bg-border max-lg:hidden" />
              <div className="flex items-center justify-between">
                <span className="text-label-lg text-text-primary">Total pagado</span>
                <span className="text-h3 text-brand-800">{formatPrice(total)}</span>
              </div>
            </>
          ) : (
            <p className="text-body text-text-secondary">
              Tu pedido fue registrado. Recibirás los detalles por correo.
            </p>
          )}
        </div>

        {/* Info de envío — móvil apilado, tablet 3 columnas, escritorio apilado */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 max-md:gap-5 sm:p-8 md:flex-row md:gap-6 lg:flex-col lg:gap-4">
          {[
            { icon: MapPin, t: "Dirección de envío", lines: ["Sheyla Tamayo", "Parque Tecnológico 221B", "CDMX 06000 · México"] },
            { icon: Truck, t: "Método de entrega", lines: ["Envío exprés", "Llega el sáb 18 oct 2026"] },
            { icon: CreditCard, t: "Pago", lines: ["Visa terminada en 4417", "Pagado el 15 oct 2026"] },
          ].map((b) => (
            <div key={b.t} className="flex gap-3.5 md:flex-1 lg:flex-initial">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <b.icon className="h-5 w-5 text-brand-800" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-label text-text-primary">{b.t}</span>
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

      {/* Botones — móvil/tablet (M06/T06) */}
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex flex-col gap-3 md:flex-row">
          <ButtonLink
            href="/cuenta"
            variant="primary"
            size="lg"
            icon
            fullWidth
            className="md:w-auto md:flex-1"
          >
            Rastrear tu pedido
          </ButtonLink>
          <Button variant="secondary" size="lg" fullWidth className="md:w-auto md:flex-1">
            Descargar factura
          </Button>
        </div>
        <Link
          href="/categoria/auriculares"
          className="inline-flex items-center gap-1.5 self-start text-label-lg text-brand-800"
        >
          Seguir comprando <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Botones — escritorio (intacto) */}
      <div className="hidden flex-wrap items-center justify-center gap-3 lg:flex">
        <Button variant="outline" size="lg">
          Descargar factura
        </Button>
        <ButtonLink href="/cuenta" variant="primary" size="lg">
          Rastrear tu pedido
        </ButtonLink>
        <ButtonLink href="/categoria/auriculares" variant="ghost" size="lg">
          Seguir comprando
        </ButtonLink>
      </div>
    </Container>
  );
}
