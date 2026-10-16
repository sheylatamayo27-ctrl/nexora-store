import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

export function Price({
  price,
  compareAt,
  size = "md",
  className,
}: {
  price: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const priceClass =
    size === "lg" ? "text-h3 text-brand-800" : size === "sm" ? "text-price-sm" : "text-price";
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className={cn("text-text-primary", priceClass)}>{formatPrice(price)}</span>
      {compareAt && compareAt > price && (
        <span className="text-body-sm text-text-muted line-through">{formatPrice(compareAt)}</span>
      )}
    </div>
  );
}
