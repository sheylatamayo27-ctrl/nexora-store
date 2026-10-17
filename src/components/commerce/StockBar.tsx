import { cn } from "@/lib/utils";

/**
 * Barra de progreso de stock para ofertas. Muestra el porcentaje vendido con
 * un degradado de marca y, opcionalmente, el texto "Vendidos: x / y".
 * Reutilizable en la home (Oferta del día) y en /ofertas.
 */
export function StockBar({
  current,
  total,
  showLabel = true,
  className,
}: {
  current: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  const almostGone = pct >= 80;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% vendido`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-sale-500 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn("text-body-sm", almostGone ? "text-sale-500" : "text-text-secondary")}>
          {almostGone ? "¡Casi agotado! " : "Vendidos: "}
          {current} / {total}
        </span>
      )}
    </div>
  );
}
