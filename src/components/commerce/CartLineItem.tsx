"use client";

import { Heart, Trash2, Check } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { useCart, type CartItem } from "@/store/cart";

export function CartLineItem({ item }: { item: CartItem }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const { product } = item;

  return (
    <div className="flex gap-4 border-b border-border p-4 last:border-b-0 sm:p-6">
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
          <button className="hidden items-center gap-1.5 text-label-sm text-text-secondary sm:flex">
            <Heart className="h-4 w-4" /> Guardar
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
      </div>
    </div>
  );
}
