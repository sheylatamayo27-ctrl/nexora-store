"use client";

import { useMemo, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle2,
  Heart,
  Search,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
} from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type OrderStatus = "Procesando" | "Enviado" | "Entregado" | "Cancelado";

interface OrderItem {
  name: string;
  image: string;
  qty: number;
  price: number;
  color?: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  summary: string;
  eta: string;
  items: OrderItem[];
  shipping: number;
  address: string;
  payment: string;
  cta: string;
}

const stats = [
  { icon: Package, n: "12", l: "Pedidos totales", bg: "bg-brand-100", fg: "text-brand-800" },
  { icon: Truck, n: "2", l: "En tránsito", bg: "bg-accent-100", fg: "text-accent-700" },
  { icon: CheckCircle2, n: "9", l: "Entregados", bg: "bg-success-100", fg: "text-success-700" },
  { icon: Heart, n: "8", l: "Favoritos", bg: "bg-sale-100", fg: "text-sale-500" },
];

const statusStyles: Record<OrderStatus, string> = {
  Procesando: "bg-accent-100 text-accent-700",
  Enviado: "bg-brand-100 text-brand-700",
  Entregado: "bg-success-100 text-success-700",
  Cancelado: "bg-sale-100 text-sale-500",
};

const STEPS: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: "Procesando", label: "Procesando", icon: Clock },
  { status: "Enviado", label: "Enviado", icon: Truck },
  { status: "Entregado", label: "Entregado", icon: CheckCircle2 },
];

const orders: Order[] = [
  {
    id: "#NX-482913",
    date: "15 oct 2026",
    status: "Procesando",
    summary: "4 artículos · Llega el sáb 18 oct",
    eta: "Entrega estimada: sáb 18 oct",
    items: [
      { name: "Auriculares Aura ANC", image: "headphones", qty: 1, price: 4999, color: "Negro medianoche" },
      { name: "Pods Lite", image: "earbuds", qty: 2, price: 1299, color: "Blanco" },
      { name: "Altavoz SoundGo", image: "speaker", qty: 1, price: 3499 },
    ],
    shipping: 0,
    address: "Parque Tecnológico 221B, CDMX, 01090",
    payment: "VISA ·· 4821",
    cta: "Rastrear pedido",
  },
  {
    id: "#NX-479201",
    date: "02 oct 2026",
    status: "Enviado",
    summary: "1 artículo · En reparto hoy",
    eta: "En reparto hoy · Llega antes de las 21:00",
    items: [{ name: 'MyBook Laptop 14"', image: "laptop", qty: 1, price: 85999, color: "Gris espacial" }],
    shipping: 0,
    address: "Parque Tecnológico 221B, CDMX, 01090",
    payment: "Mastercard ·· 7390",
    cta: "Rastrear pedido",
  },
  {
    id: "#NX-471188",
    date: "18 sep 2026",
    status: "Entregado",
    summary: "3 artículos · Entregado el 22 sep",
    eta: "Entregado el 22 sep a las 14:12",
    items: [
      { name: "Power Bank 20K", image: "powerbank", qty: 1, price: 1499 },
      { name: "KeyPop Combo", image: "keyboard", qty: 1, price: 2999 },
      { name: "Open Ear Sport", image: "openear", qty: 1, price: 1799 },
    ],
    shipping: 0,
    address: "Av. Reforma 88, CDMX, 06600",
    payment: "PayPal · sheyla@nexora.store",
    cta: "Comprar de nuevo",
  },
  {
    id: "#NX-462034",
    date: "29 ago 2026",
    status: "Cancelado",
    summary: "1 artículo · Reembolsado el 31 ago",
    eta: "Cancelado · Reembolso completado el 31 ago",
    items: [{ name: "Proyector Multimedia Digital", image: "projector", qty: 1, price: 19100 }],
    shipping: 0,
    address: "Parque Tecnológico 221B, CDMX, 01090",
    payment: "VISA ·· 4821",
    cta: "Comprar de nuevo",
  },
];

const tabs: { label: string; status: OrderStatus | null }[] = [
  { label: "Todos", status: null },
  { label: "Procesando", status: "Procesando" },
  { label: "Enviados", status: "Enviado" },
  { label: "Entregados", status: "Entregado" },
  { label: "Cancelados", status: "Cancelado" },
];

const subtotalOf = (o: Order) => o.items.reduce((s, i) => s + i.price * i.qty, 0);

export function OrdersView() {
  const [active, setActive] = useState<OrderStatus | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);

  const counts = useMemo(() => {
    const map = new Map<OrderStatus, number>();
    for (const o of orders) map.set(o.status, (map.get(o.status) ?? 0) + 1);
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (active && o.status !== active) return false;
      if (q) {
        const haystack = `${o.id} ${o.items.map((i) => i.name).join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [active, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h2 text-text-primary">Mis pedidos</h1>
          <p className="text-body text-text-secondary">Rastrea, devuelve o vuelve a comprar.</p>
        </div>
        {/* El buscador no aparece en M09/T09: solo escritorio. */}
        <div className="flex h-11 items-center gap-2 rounded-md border border-border-strong bg-surface px-4 max-lg:hidden">
          <Search className="h-[18px] w-[18px] text-text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por N.º de pedido o producto"
            className="h-full w-56 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
      </div>

      {/* Stats */}
      {/* Móvil 2×2 · tablet una fila de 4 · escritorio intacto */}
      <div className="grid grid-cols-2 gap-4 max-lg:gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5 max-lg:gap-3 max-lg:p-4 max-md:gap-2.5 max-md:p-3">
            <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg max-lg:h-10 max-lg:w-10 max-lg:shrink-0 max-md:h-9 max-md:w-9", s.bg)}>
              <s.icon className={cn("h-[22px] w-[22px] max-lg:h-5 max-lg:w-5", s.fg)} />
            </span>
            <div className="flex flex-col max-lg:min-w-0">
              <span className="text-h3 text-text-primary">{s.n}</span>
              <span className="text-body-sm text-text-secondary">{s.l}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-6 overflow-x-auto border-b border-border no-scrollbar">
        {tabs.map((t) => {
          const count = t.status === null ? orders.length : counts.get(t.status) ?? 0;
          const isActive = active === t.status;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(t.status)}
              className={cn(
                "flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 py-3 text-label-lg transition-colors",
                isActive
                  ? "border-brand-800 text-brand-800"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {t.label}
              {/* <lg: conteo en gris junto al nombre, sin chip. */}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-label-xs",
                  "max-lg:min-w-0 max-lg:bg-transparent max-lg:px-0 max-lg:text-label max-lg:font-normal max-lg:text-text-muted",
                  isActive ? "bg-brand-100 text-brand-800" : "bg-surface-muted text-text-secondary"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pedidos */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.map((o) => (
            <div key={o.id} className="overflow-hidden rounded-lg border border-border bg-surface">
              {/* Móvil/tablet (M09/T09) */}
              <div className="lg:hidden">
                <div className="flex flex-col gap-0.5 bg-surface-subtle px-4 py-3 md:px-5 md:py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-label-lg font-semibold text-text-primary">{o.id}</span>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-label-sm",
                        statusStyles[o.status]
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {o.status}
                    </span>
                  </div>
                  <span className="truncate text-body-sm text-text-secondary">
                    {o.date} · {formatPrice(subtotalOf(o) + o.shipping)}
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-5 md:p-5">
                  <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
                    <div className="flex shrink-0 gap-1.5 md:gap-2">
                      {o.items.slice(0, 3).map((item) => (
                        <div
                          key={item.name}
                          className="relative h-12 w-12 overflow-hidden rounded-md bg-surface-subtle max-[359px]:h-10 max-[359px]:w-10 md:h-14 md:w-14"
                        >
                          <AssetImage folder="products" name={item.image} alt={item.name} sizes="56px" />
                        </div>
                      ))}
                    </div>
                    <span className="min-w-0 text-label-sm text-text-primary md:text-label">{o.summary}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:flex md:shrink-0">
                    <Button variant="secondary" fullWidth onClick={() => setSelected(o)} className="md:w-auto max-md:px-3 max-[359px]:px-2 max-[359px]:text-label-sm">
                      Ver detalles
                    </Button>
                    <Button variant="primary" fullWidth className="md:w-auto max-md:px-3 max-[359px]:px-2 max-[359px]:text-label-sm">
                      {o.cta}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Escritorio (intacto) */}
              <div className="max-lg:hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-subtle px-5 py-4">
                <div className="flex flex-wrap gap-8">
                  <div className="flex flex-col">
                    <span className="text-body-sm text-text-muted">Pedido</span>
                    <span className="text-label text-text-primary">{o.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-body-sm text-text-muted">Fecha</span>
                    <span className="text-label text-text-primary">{o.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-body-sm text-text-muted">Total</span>
                    <span className="text-label text-text-primary">{formatPrice(subtotalOf(o) + o.shipping)}</span>
                  </div>
                </div>
                <span className={cn("rounded-full px-3 py-1.5 text-label-sm", statusStyles[o.status])}>
                  {o.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {o.items.map((item) => (
                      <div key={item.name} className="relative h-16 w-16 overflow-hidden rounded-md bg-surface-subtle">
                        <AssetImage folder="products" name={item.image} alt={item.name} sizes="64px" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-label text-text-primary">{o.summary}</span>
                    <span className="text-body-sm text-text-secondary">
                      {o.items.map((i) => i.name).join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelected(o)}>
                    Ver detalles
                  </Button>
                  <Button variant="primary">{o.cta}</Button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle">
            <Package className="h-7 w-7 text-text-muted" />
          </span>
          <p className="text-h4 text-text-primary">No hay pedidos en esta categoría</p>
          <button onClick={() => { setActive(null); setQuery(""); }} className="text-label text-brand-700">
            Ver todos los pedidos
          </button>
        </div>
      )}

      <OrderDetailsModal order={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function OrderDetailsModal({ order, onClose }: { order: Order | null; onClose: () => void }) {
  const subtotal = order ? subtotalOf(order) : 0;
  const total = order ? subtotal + order.shipping : 0;
  const cancelled = order?.status === "Cancelado";
  const currentStep = order ? STEPS.findIndex((s) => s.status === order.status) : -1;

  return (
    <Modal
      open={!!order}
      onClose={onClose}
      title={order ? `Pedido ${order.id}` : ""}
      description={order ? `Realizado el ${order.date}` : undefined}
      className="sm:max-w-3xl"
      footer={
        order && (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose} className="sm:w-auto">
              Cerrar
            </Button>
            <Button variant="primary" className="sm:w-auto">
              {order.cta}
            </Button>
          </div>
        )
      }
    >
      {order && (
        <div className="grid gap-6 p-6 sm:grid-cols-[1.6fr_1fr]">
          {/* Columna izquierda: estado + artículos */}
          <div className="flex flex-col gap-6">
          {/* Estado / línea de tiempo */}
          {cancelled ? (
            <div className="flex items-center gap-3 rounded-lg bg-sale-100 p-4">
              <XCircle className="h-5 w-5 shrink-0 text-sale-500" />
              <div className="flex flex-col">
                <span className="text-label text-text-primary">Pedido cancelado</span>
                <span className="text-body-sm text-text-secondary">{order.eta}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-label text-text-primary">Estado del pedido</span>
                <span className={cn("rounded-full px-3 py-1 text-label-sm", statusStyles[order.status])}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-start">
                {STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  return (
                    <div key={step.status} className="flex flex-1 flex-col items-center gap-1.5">
                      <div className="flex w-full items-center">
                        <span
                          className={cn(
                            "h-0.5 flex-1 rounded-full",
                            i === 0 ? "opacity-0" : done ? "bg-brand-800" : "bg-surface-muted"
                          )}
                        />
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                            done ? "bg-brand-800 text-white" : "bg-surface-muted text-text-muted"
                          )}
                        >
                          <step.icon className="h-[18px] w-[18px]" />
                        </span>
                        <span
                          className={cn(
                            "h-0.5 flex-1 rounded-full",
                            i === STEPS.length - 1 ? "opacity-0" : i < currentStep ? "bg-brand-800" : "bg-surface-muted"
                          )}
                        />
                      </div>
                      <span className={cn("text-label-sm", done ? "text-text-primary" : "text-text-muted")}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-body-sm text-text-secondary">{order.eta}</p>
            </div>
          )}

          {/* Artículos */}
          <div className="flex flex-col gap-3">
            <span className="text-label text-text-primary">
              Artículos ({order.items.reduce((n, i) => n + i.qty, 0)})
            </span>
            <div className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
              {order.items.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                    <AssetImage folder="products" name={item.image} alt={item.name} sizes="64px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-label text-text-primary">{item.name}</span>
                    <span className="text-body-sm text-text-secondary">
                      {item.color ? `${item.color} · ` : ""}Cantidad: {item.qty}
                    </span>
                  </div>
                  <span className="shrink-0 text-label text-text-primary">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Columna derecha: resumen, envío y pago */}
          <div className="flex flex-col gap-4">
          {/* Totales */}
          <div className="flex flex-col gap-2 rounded-lg bg-surface-subtle p-4">
            <div className="flex justify-between text-body text-text-secondary">
              <span>Subtotal</span>
              <span className="text-text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-body text-text-secondary">
              <span>Envío</span>
              <span className="text-success-700">{order.shipping === 0 ? "Gratis" : formatPrice(order.shipping)}</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-border pt-3 text-label-lg text-text-primary">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Envío y pago */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 rounded-lg border border-border p-4">
              <MapPin className="h-5 w-5 shrink-0 text-brand-700" />
              <div className="flex flex-col">
                <span className="text-label-sm text-text-secondary">Dirección de envío</span>
                <span className="text-body text-text-primary">{order.address}</span>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-border p-4">
              <CreditCard className="h-5 w-5 shrink-0 text-brand-700" />
              <div className="flex flex-col">
                <span className="text-label-sm text-text-secondary">Método de pago</span>
                <span className="text-body text-text-primary">{order.payment}</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
