import { cn } from "@/lib/utils";

/**
 * Loader de tres puntos con animación suave (sin el spinner clásico).
 * Reutilizable en estados de carga (loading.tsx, botones, etc.).
 */
export function Dots({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dot =
    size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-3 w-3" : "h-2.5 w-2.5";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} role="status" aria-label="Cargando">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("animate-dot rounded-full bg-brand-700", dot)}
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}
