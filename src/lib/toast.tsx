"use client";

import { toast } from "sonner";
import { Heart, HeartOff, ArrowRight, Check, ShoppingBag, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { AssetImage } from "@/components/media/AssetImage";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/data/types";

/** Un solo aviso a la vez: el nuevo reemplaza al anterior en vez de apilarse. */
function showToast(...args: Parameters<typeof toast.custom>) {
  toast.dismiss();
  toast.custom(...args);
}

/** Contenido del toast de favoritos (componente: así lee el idioma activo). */
function FavoriteToast({ id, product, added }: { id: string | number; product: Product; added: boolean }) {
  const t = useTranslations("toast");
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-elevation-lg">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
        <AssetImage folder="products" name={product.image} alt={product.name} sizes="48px" />
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
          {added ? t("addedToWishlist") : t("removedFromWishlist")}
        </span>
        <span className="truncate text-body-sm text-text-secondary">{product.name}</span>
      </div>

      {added && (
        <Link
          href="/wishlist"
          onClick={() => toast.dismiss(id)}
          className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-label-sm text-brand-700 transition-colors hover:bg-brand-100"
        >
          {t("view")} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

/**
 * Toast elegante y de marca para la lista de favoritos.
 * Muestra la miniatura del producto, el estado y un acceso directo a Favoritos.
 */
export function favoriteToast(product: Product, added: boolean) {
  showToast((id) => <FavoriteToast id={id} product={product} added={added} />, {
    duration: 3200,
    unstyled: true,
  });
}

/** Recorta `text` a `max` caracteres con "…" (los nombres de producto pueden ser largos). */
function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** Contenido del toast del carrito: miniatura con check verde, nombre y acceso al carrito. */
function CartToast({ id, product }: { id: string | number; product: Product }) {
  const t = useTranslations("toast");
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-elevation-lg">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
        <AssetImage folder="products" name={product.image} alt="" sizes="48px" />
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-success-500 text-white ring-2 ring-surface">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-label text-text-primary" title={product.name}>
          {truncate(product.name, 40)}
        </span>
        <span className="text-body-sm text-text-secondary">{t("addedToCart")}</span>
      </div>

      <Link
        href="/cart"
        onClick={() => toast.dismiss(id)}
        className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-label-sm text-brand-700 transition-colors hover:bg-brand-100"
      >
        {t("viewCart")} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

/** Aviso al agregar un producto al carrito (tarjetas y vista rápida), con acceso a /cart. */
export function cartToast(product: Product) {
  showToast((id) => <CartToast id={id} product={product} />, { duration: 3000, unstyled: true });
}

/**
 * Toast de marca genérico (mismo lenguaje visual que el de favoritos). Recibe los textos ya traducidos.
 * `tone: "error"` pinta el ícono en rojo (fallos de envío, etc.).
 */
export function notifyToast({
  title,
  description,
  icon: Icon = ShoppingBag,
  tone = "brand",
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  tone?: "brand" | "error";
}) {
  showToast(
    () => (
      <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-elevation-lg">
        <span
          className={
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg " +
            (tone === "error" ? "bg-sale-100 text-sale-500" : "bg-brand-100 text-brand-800")
          }
        >
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
