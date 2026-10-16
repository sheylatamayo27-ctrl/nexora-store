"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Botón de carrito con contador. Evita desajustes de hidratación. */
export function CartButton({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((n, i) => n + i.qty, 0) : 0;
  const subtotal = mounted ? items.reduce((s, i) => s + i.product.price * i.qty, 0) : 0;

  return (
    <Link href="/carrito" className="flex items-center gap-3" aria-label="Ver carrito">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-text-inverse">
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <span
            className={cn(
              "absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-label-xs text-brand-900 ring-2 ring-surface"
            )}
          >
            {count}
          </span>
        )}
      </span>
      {!compact && (
        <span className="hidden flex-col leading-tight lg:flex">
          <span className="text-body-sm text-text-secondary">Mi carrito</span>
          <span className="text-label text-text-primary">{formatPrice(subtotal)}</span>
        </span>
      )}
    </Link>
  );
}
