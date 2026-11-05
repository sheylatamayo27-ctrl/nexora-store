import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * Botón circular de flecha (solo escritorio: `hidden lg:flex`). `md` = 40px
 * (sobre el carrusel), `sm` = 36px (en la cabecera de sección).
 */
export function ArrowButton({
  direction,
  size = "md",
  onClick,
  disabled,
  className,
}: {
  direction: "prev" | "next";
  size?: "sm" | "md";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const t = useTranslations("common");
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? t("previous") : t("next")}
      className={cn(
        "hidden shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-elevation-sm transition-all duration-200 lg:flex",
        "hover:bg-surface-subtle hover:shadow-elevation-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-surface disabled:hover:shadow-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
        size === "md" ? "h-10 w-10" : "h-9 w-9",
        className
      )}
    >
      <Icon className={size === "md" ? "h-5 w-5" : "h-4 w-4"} />
    </button>
  );
}

/**
 * Flechas anterior/siguiente a los lados de un carrusel (escritorio). El
 * contenedor del carrusel debe ser `relative`: sobresalen 20px a cada lado,
 * centradas en vertical en la franja que ocupa este componente (por defecto,
 * todo el carrusel; `className` puede acotarla, p. ej. a la altura de las imágenes).
 */
export function CarouselArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      <ArrowButton
        direction="prev"
        onClick={onPrev}
        disabled={!canPrev}
        className="pointer-events-auto absolute -left-5 top-1/2 -translate-y-1/2"
      />
      <ArrowButton
        direction="next"
        onClick={onNext}
        disabled={!canNext}
        className="pointer-events-auto absolute -right-5 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
