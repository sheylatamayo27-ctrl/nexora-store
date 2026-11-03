import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * Loader de tres puntos con animación suave (sin el spinner clásico).
 * Reutilizable en estados de carga (loading.tsx, botones, etc.).
 */
export function Dots({
  size = "md",
  tone = "brand",
  className,
}: {
  size?: "sm" | "md" | "lg";
  /** "inverse": puntos blancos, para fondos oscuros (p. ej. dentro de un botón primario). */
  tone?: "brand" | "inverse";
  className?: string;
}) {
  const t = useTranslations("common");
  const dot =
    size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-3 w-3" : "h-2.5 w-2.5";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} role="status" aria-label={t("loading")}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("animate-dot rounded-full", tone === "inverse" ? "bg-white" : "bg-brand-700", dot)}
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}

/** Dots centrados en un área alta: respaldo mínimo de los `<Suspense>` de los layouts. */
export function PageDots() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Dots size="lg" />
    </div>
  );
}
