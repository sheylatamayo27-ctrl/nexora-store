import type { Metadata } from "next";
import { Package, Truck, CheckCircle2, Heart, Search } from "lucide-react";
import { AccountShell } from "@/components/account/AccountShell";
import { AssetImage } from "@/components/media/AssetImage";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Mis pedidos" };

const stats = [
  { icon: Package, n: "12", l: "Pedidos totales", bg: "bg-brand-100", fg: "text-brand-800" },
  { icon: Truck, n: "2", l: "En tránsito", bg: "bg-accent-100", fg: "text-accent-700" },
  { icon: CheckCircle2, n: "9", l: "Entregados", bg: "bg-success-100", fg: "text-success-700" },
  { icon: Heart, n: "8", l: "Favoritos", bg: "bg-sale-100", fg: "text-sale-500" },
];

const tabs = ["Todos (12)", "Procesando", "Enviados", "Entregados", "Cancelados"];

const statusStyles: Record<string, string> = {
  Procesando: "bg-accent-100 text-accent-700",
  Enviado: "bg-brand-100 text-brand-700",
  Entregado: "bg-success-100 text-success-700",
  Cancelado: "bg-sale-100 text-sale-500",
};

const orders = [
  {
    id: "#NX-482913",
    date: "15 oct 2026",
    total: 15608.21,
    status: "Procesando",
    summary: "4 artículos · Llega el sáb 18 oct",
    items: "Auriculares Aura ANC, Pods Lite +1 más",
    images: ["headphones", "earbuds", "speaker"],
    cta: "Rastrear pedido",
  },
  {
    id: "#NX-479201",
    date: "02 oct 2026",
    total: 85999,
    status: "Enviado",
    summary: "1 artículo · En reparto hoy",
    items: 'MyBook Laptop 14" · Gris espacial',
    images: ["laptop"],
    cta: "Rastrear pedido",
  },
  {
    id: "#NX-471188",
    date: "18 sep 2026",
    total: 6000,
    status: "Entregado",
    summary: "3 artículos · Entregado el 22 sep",
    items: "Power Bank, KeyPop Combo, Open Ear",
    images: ["powerbank", "keyboard", "openear"],
    cta: "Comprar de nuevo",
  },
  {
    id: "#NX-462034",
    date: "29 ago 2026",
    total: 19100,
    status: "Cancelado",
    summary: "1 artículo · Reembolsado el 31 ago",
    items: "Proyector Multimedia Digital",
    images: ["projector"],
    cta: "Comprar de nuevo",
  },
];

export default function AccountOrdersPage() {
  return (
    <AccountShell active="orders" crumb="Pedidos">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-h2 text-text-primary">Mis pedidos</h1>
            <p className="text-body text-text-secondary">Rastrea, devuelve o vuelve a comprar.</p>
          </div>
          <div className="flex h-11 items-center gap-2 rounded-md border border-border-strong bg-surface px-4">
            <Search className="h-[18px] w-[18px] text-text-muted" />
            <input
              placeholder="Buscar por N.º de pedido o producto"
              className="h-full w-56 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", s.bg)}>
                <s.icon className={cn("h-[22px] w-[22px]", s.fg)} />
              </span>
              <div className="flex flex-col">
                <span className="text-h3 text-text-primary">{s.n}</span>
                <span className="text-body-sm text-text-secondary">{s.l}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 overflow-x-auto border-b border-border no-scrollbar">
          {tabs.map((t, i) => (
            <button
              key={t}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 py-3 text-label-lg",
                i === 0 ? "border-brand-800 text-brand-800" : "border-transparent text-text-secondary"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pedidos */}
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="overflow-hidden rounded-lg border border-border bg-surface">
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
                    <span className="text-label text-text-primary">{formatPrice(o.total)}</span>
                  </div>
                </div>
                <span className={cn("rounded-full px-3 py-1.5 text-label-sm", statusStyles[o.status])}>
                  {o.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {o.images.map((img) => (
                      <div key={img} className="relative h-16 w-16 overflow-hidden rounded-md bg-surface-subtle">
                        <AssetImage folder="products" name={img} alt="" sizes="64px" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-label text-text-primary">{o.summary}</span>
                    <span className="text-body-sm text-text-secondary">{o.items}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Ver detalles</Button>
                  <Button variant="primary">{o.cta}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountShell>
  );
}
