import { Home, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  const t = useTranslations("common");
  return (
    <nav
      aria-label={t("breadcrumb")}
      className={cn(
        "flex flex-wrap items-center gap-2 max-lg:flex-nowrap max-lg:overflow-hidden",
        className
      )}
    >
      <Link href="/" className="shrink-0 text-text-secondary hover:text-text-primary" aria-label={t("home")}>
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className={cn("flex items-center gap-2", last ? "min-w-0" : "shrink-0")}>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-muted" />
            {item.href && !last ? (
              <Link href={item.href} className="shrink-0 text-body-sm text-text-secondary hover:text-text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="truncate text-label-sm text-text-primary">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
