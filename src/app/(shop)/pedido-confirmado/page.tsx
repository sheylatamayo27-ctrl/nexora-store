"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AssetImage } from "@/components/media/AssetImage";
import { formatPrice } from "@/lib/format";
import { useCart, type CartItem } from "@/store/cart";
import { cn } from "@/lib/utils";

const tracker = [
  { label: "Pedido confirmado", state: "done" },
  { label: "Empaquetado", state: "current" },
  { label: "Enviado", state: "upcoming" },
  { label: "Entregado", state: "upcoming" },
] as const;

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
    <Container className="flex flex-col gap-6 py-8 sm:py-12">
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

        {/* Tracker */}
        <div className="mt-4 flex w-full max-w-2xl items-center justify-between">
          {tracker.map((t, i) => (
            <div key={t.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-label-sm",
                    t.state === "done" && "bg-brand-800 text-white",
                    t.state === "current" && "border-2 border-brand-800 text-brand-800",
                    t.state === "upcoming" && "bg-surface-muted text-text-muted"
                  )}
                >
                  {t.state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-label-sm sm:block",
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
                  <div className="flex flex-1 flex-col">
                    <span className="text-label text-text-primary">{item.product.name}</span>
                    <span className="text-body-sm text-text-secondary">
                      {item.color ? `${item.color} · ` : ""}Cant. {item.qty}
                    </span>
                  </div>
                  <span className="text-label text-text-primary">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
              <div className="h-px bg-border" />
              {[
                { l: "Subtotal", v: formatPrice(subtotal) },
                { l: "Envío", v: "Gratis", h: true },
                { l: "Impuestos (IVA 16%)", v: formatPrice(tax) },
                { l: "Descuento (NEXORA10)", v: `−${formatPrice(discount)}`, h: true },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between">
                  <span className="text-body text-text-secondary">{r.l}</span>
                  <span className={cn("text-label", r.h ? "text-success-500" : "text-text-primary")}>{r.v}</span>
                </div>
              ))}
              <div className="h-px bg-border" />
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

        {/* Info de envío */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8">
          {[
            { icon: MapPin, t: "Dirección de envío", lines: ["Sheyla Tamayo", "Parque Tecnológico 221B", "CDMX 06000 · México"] },
            { icon: Truck, t: "Método de entrega", lines: ["Envío exprés", "Llega el sáb 18 oct 2026"] },
            { icon: CreditCard, t: "Pago", lines: ["Visa terminada en 4417", "Pagado el 15 oct 2026"] },
          ].map((b) => (
            <div key={b.t} className="flex gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <b.icon className="h-5 w-5 text-brand-800" />
              </span>
              <div className="flex flex-col gap-0.5">
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

      <div className="flex flex-wrap items-center justify-center gap-3">
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
