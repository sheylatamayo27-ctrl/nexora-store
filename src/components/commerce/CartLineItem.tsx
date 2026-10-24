"use client";

import { Heart, Trash2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { AssetImage } from "@/components/media/AssetImage";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { useCart, type CartItem } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { favoriteToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export function CartLineItem({ item }: { item: CartItem }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const toggleFavorite = useFavorites((s) => s.toggle);
  const favorites = useFavorites((s) => s.items);
  const { product } = item;
  const wished = favorites.some((p) => p.id === product.id);
  const handleWish = () => favoriteToast(product, toggleFavorite(product));
  const savings = product.compareAt ? (product.compareAt - product.price) * item.qty : 0;

  return (
    <motion.div
      layout
      initial={false}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border p-4 last:border-b-0 sm:p-6"
    >
      {/* Móvil (<md): fila simplificada (M04) — sin marca, stock ni "Ahorras". */}
      <div className="flex gap-4 md:hidden">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
          <AssetImage folder="products" name={product.image} alt={product.name} sizes="96px" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 text-label-lg text-text-primary">{product.name}</h3>
          {item.color && <span className="text-body-sm text-text-secondary">Color: {item.color}</span>}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-price text-text-primary">{formatPrice(product.price * item.qty)}</span>
            {product.compareAt && (
              <span className="text-body-sm text-text-muted line-through">
                {formatPrice(product.compareAt * item.qty)}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <QuantityStepper value={item.qty} onChange={(q) => setQty(item.key, q)} size="sm" />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleWish}
                aria-label={wished ? "Quitar de favoritos" : "Guardar en favoritos"}
                aria-pressed={wished}
                className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-subtle"
              >
                <Heart className={cn("h-[18px] w-[18px]", wished && "fill-sale-500 text-sale-500")} />
              </button>
              <button
                type="button"
                onClick={() => remove(item.key)}
                aria-label="Eliminar"
                className="flex h-9 w-9 items-center justify-center rounded-md text-sale-500 transition-colors hover:bg-sale-100"
              >
                <Trash2 className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet + escritorio (≥md): fila completa (idéntica en escritorio). */}
      <div className="hidden gap-4 md:flex">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-subtle sm:h-28 sm:w-28">
          <AssetImage folder="products" name={product.image} alt={product.name} sizes="112px" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-label-sm uppercase tracking-wide text-text-muted">{product.vendor}</span>
          <h3 className="text-label-lg text-text-primary">{product.name}</h3>
          {item.color && <span className="text-body-sm text-text-secondary">Color: {item.color}</span>}
          <span className="flex items-center gap-1.5 pt-1 text-body-sm text-success-700">
            <Check className="h-3.5 w-3.5 text-success-500" /> En stock · Envío mañana
          </span>
          <div className="mt-2 flex items-center gap-5">
            <QuantityStepper value={item.qty} onChange={(q) => setQty(item.key, q)} size="sm" />
            <button
              onClick={() => remove(item.key)}
              className="flex items-center gap-1.5 text-label-sm text-sale-500"
            >
              <Trash2 className="h-4 w-4" /> Quitar
            </button>
            <button
              onClick={handleWish}
              className="hidden items-center gap-1.5 text-label-sm text-text-secondary sm:flex"
            >
              <Heart className={cn("h-4 w-4", wished && "fill-sale-500 text-sale-500")} />
              Guardar<span className="lg:hidden"> para después</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-0.5 text-right">
          <span className="text-price text-text-primary">{formatPrice(product.price * item.qty)}</span>
          {product.compareAt && (
            <span className="text-body-sm text-text-muted line-through">
              {formatPrice(product.compareAt * item.qty)}
            </span>
          )}
          {savings > 0 && (
            <span className="text-body-sm text-success-700 lg:hidden">Ahorras {formatPrice(savings)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
