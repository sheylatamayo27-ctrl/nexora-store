import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  rating,
  reviews,
  size = 13,
  className,
  showCount = true,
}: {
  rating: number;
  reviews?: number;
  size?: number;
  className?: string;
  showCount?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={cn(
              i < Math.round(rating)
                ? "fill-accent-500 text-accent-500"
                : "fill-border text-border"
            )}
          />
        ))}
      </div>
      {showCount && reviews !== undefined && (
        <span className="text-body-sm text-text-secondary">
          {rating.toFixed(1)} ({reviews.toLocaleString("es-MX")})
        </span>
      )}
    </div>
  );
}
