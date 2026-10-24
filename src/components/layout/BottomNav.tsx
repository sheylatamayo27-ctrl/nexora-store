"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Inicio", href: "/", icon: Home },
  // `match` detecta la pestaña activa de forma más amplia que el destino del enlace
  // (p. ej. "Categorías" se activa en cualquier /categoria/*).
  { label: "Categorías", href: "/categoria/auriculares", match: "/categoria", icon: LayoutGrid },
  { label: "Favoritos", href: "/favoritos", icon: Heart },
  { label: "Carrito", href: "/carrito", icon: ShoppingBag },
  { label: "Cuenta", href: "/cuenta", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface shadow-[0_-4px_16px_rgba(15,23,42,0.06)] md:hidden">
      <div className="flex items-center px-1 pb-2 pt-1">
        {items.map(({ label, href, match, icon: Icon }) => {
          const base = match ?? href;
          const active = base === "/" ? pathname === "/" : pathname.startsWith(base);
          return (
            <Link
              key={label}
              href={href}
              className="flex min-w-0 flex-1 basis-0 flex-col items-center gap-1 py-1.5"
            >
              <span
                className={cn(
                  "flex h-7 w-11 items-center justify-center rounded-full transition-colors",
                  active ? "bg-brand-100" : "bg-transparent"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-brand-800" : "text-text-secondary")} />
              </span>
              <span className={cn("max-w-full truncate text-label-xs", active ? "text-brand-800" : "text-text-secondary")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
