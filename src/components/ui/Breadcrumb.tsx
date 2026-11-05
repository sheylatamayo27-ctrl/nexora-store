import { Home, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** `tone="inverse"`: en blanco, para banners oscuros (páginas de contenido). */
export function Breadcrumb({
  items,
  tone = "default",
  className,
}: {
  items: Crumb[];
  tone?: "default" | "inverse";
  className?: string;
}) {
  const t = useTranslations("common");
  const inverse = tone === "inverse";
  const link = inverse ? "text-white/70 hover:text-white" : "text-text-secondary hover:text-text-primary";
  return (
    <nav
      aria-label={t("breadcrumb")}
      className={cn(
        "flex flex-wrap items-center gap-2 max-lg:flex-nowrap max-lg:overflow-hidden",
        className
      )}
    >
      <Link href="/" className={cn("shrink-0", link)} aria-label={t("home")}>
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className={cn("flex items-center gap-2", last ? "min-w-0" : "shrink-0")}>
            <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", inverse ? "text-white/40" : "text-text-muted")} />
            {item.href && !last ? (
              <Link href={item.href} className={cn("shrink-0 text-body-sm", link)}>
                {item.label}
              </Link>
            ) : (
              <span className={cn("truncate text-label-sm", inverse ? "text-white" : "text-text-primary")}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
