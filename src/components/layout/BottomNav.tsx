"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Categorías", href: "/categoria/auriculares", icon: LayoutGrid },
  { label: "Favoritos", href: "/favoritos", icon: Heart },
  { label: "Carrito", href: "/carrito", icon: ShoppingBag },
  { label: "Cuenta", href: "/cuenta", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface shadow-[0_-4px_16px_rgba(15,23,42,0.06)] lg:hidden">
      <div className="flex items-center justify-between px-4 pb-2 pt-1">
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className="flex w-16 flex-col items-center gap-1 py-1.5"
            >
              <span
                className={cn(
                  "flex h-7 w-11 items-center justify-center rounded-full transition-colors",
                  active ? "bg-brand-100" : "bg-transparent"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-brand-800" : "text-text-secondary")} />
              </span>
              <span className={cn("text-label-xs", active ? "text-brand-800" : "text-text-secondary")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
