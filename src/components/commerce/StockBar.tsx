import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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
  const t = useTranslations("common.stock");
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
        aria-label={t("soldPercent", { percent: pct })}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-sale-500 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn("text-body-sm", almostGone ? "text-sale-500" : "text-text-secondary")}>
          {t(almostGone ? "almostGone" : "sold", { current, total })}
        </span>
      )}
    </div>
  );
}
