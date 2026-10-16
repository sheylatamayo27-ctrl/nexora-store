import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Ruta de navegación" className={cn("flex flex-wrap items-center gap-2", className)}>
      <Link href="/" className="text-text-secondary hover:text-text-primary" aria-label="Inicio">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
            {item.href && !last ? (
              <Link href={item.href} className="text-body-sm text-text-secondary hover:text-text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-label-sm text-text-primary">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
