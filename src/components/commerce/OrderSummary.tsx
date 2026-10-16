import { Tag, Lock } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
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
  tax,
  discount,
  total,
  showCoupon = true,
  cta,
  className,
}: {
  itemsLabel: string;
  subtotal: number;
  shipping?: number;
  tax: number;
  discount?: number;
  total: number;
  showCoupon?: boolean;
  cta?: { label: string; href: string };
  className?: string;
}) {
  const rows: Row[] = [
    { label: itemsLabel, value: formatPrice(subtotal) },
    {
      label: "Envío",
      value: shipping ? formatPrice(shipping) : "Gratis",
      highlight: !shipping,
    },
    { label: "Impuestos estimados (IVA 16%)", value: formatPrice(tax) },
  ];
  if (discount) rows.push({ label: "Descuento (NEXORA10)", value: `−${formatPrice(discount)}`, highlight: true });

  return (
    <div className={cn("flex flex-col gap-4 rounded-xl border border-border bg-surface p-6", className)}>
      <h3 className="text-h4 text-text-primary">Resumen del pedido</h3>

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
        <span className="text-label-lg text-text-primary">Total</span>
        <span className="text-h3 text-brand-800">{formatPrice(total)}</span>
      </div>
      <span className="text-body-sm text-text-muted">Incluye todos los impuestos</span>

      {showCoupon && (
        <div className="flex items-center gap-2">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-md border border-border-strong bg-surface px-3">
            <Tag className="h-4 w-4 text-text-muted" />
            <input
              placeholder="Código de promoción"
              className="h-full flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
            />
          </div>
          <Button variant="outline">Aplicar</Button>
        </div>
      )}

      {cta && (
        <ButtonLink href={cta.href} variant="primary" size="lg" fullWidth className="mt-1">
          {cta.label}
        </ButtonLink>
      )}

      <div className="flex items-center justify-center gap-2 text-body-sm text-text-muted">
        <Lock className="h-3.5 w-3.5" /> Pago seguro · Cifrado SSL de 256 bits
      </div>
    </div>
  );
}
