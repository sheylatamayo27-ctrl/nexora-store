"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Heart, HeartOff, ArrowRight, ShoppingBag, type LucideIcon } from "lucide-react";
import { assetSrc } from "@/components/media/AssetImage";
import type { Product } from "@/data/types";

/**
 * Toast elegante y de marca para la lista de favoritos.
 * Muestra la miniatura del producto, el estado y un acceso directo a Favoritos.
 */
export function favoriteToast(product: Product, added: boolean) {
  toast.custom(
    (id) => (
      <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-elevation-lg">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetSrc("products", product.image)}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <span
            className={
              "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-surface " +
              (added ? "bg-sale-500 text-white" : "bg-surface-muted text-text-secondary")
            }
          >
            {added ? <Heart className="h-3.5 w-3.5 fill-current" /> : <HeartOff className="h-3.5 w-3.5" />}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-label text-text-primary">
            {added ? "Agregado a favoritos" : "Quitado de favoritos"}
          </span>
          <span className="truncate text-body-sm text-text-secondary">{product.name}</span>
        </div>

        {added && (
          <Link
            href="/favoritos"
            onClick={() => toast.dismiss(id)}
            className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-label-sm text-brand-700 transition-colors hover:bg-brand-100"
          >
            Ver <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    ),
    { duration: 3200, unstyled: true }
  );
}

/** Toast de marca genérico (mismo lenguaje visual que el de favoritos). */
export function notifyToast({
  title,
  description,
  icon: Icon = ShoppingBag,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
}) {
  toast.custom(
    () => (
      <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-elevation-lg">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-800">
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-label text-text-primary">{title}</span>
          {description && <span className="truncate text-body-sm text-text-secondary">{description}</span>}
        </div>
      </div>
    ),
    { duration: 2800, unstyled: true }
  );
}
