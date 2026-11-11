"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartButton({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("header");
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((n, i) => n + i.qty, 0) : 0;
  const subtotal = mounted ? items.reduce((s, i) => s + i.product.price * i.qty, 0) : 0;

  return (
    <Link href="/cart" className="flex items-center gap-3" aria-label={t("viewCart")}>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white">
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
          <span className="text-body-sm text-text-secondary">{t("myCart")}</span>
          <span className="text-label text-text-primary">{formatPrice(subtotal)}</span>
        </span>
      )}
    </Link>
  );
}
