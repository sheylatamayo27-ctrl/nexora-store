"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/commerce/Rating";
import { Price } from "@/components/commerce/Price";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";

export function ProductCard({
  product,
  showColors = true,
  className,
}: {
  product: Product;
  showColors?: boolean;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const [wished, setWished] = useState(false);
  const href = `/producto/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-2 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-elevation-md",
        className
      )}
    >
      {/* Media */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-surface-subtle">
        <AssetImage
          folder="products"
          name={product.image}
          alt={product.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <Badge type={product.badge.type} className="absolute left-2.5 top-2.5 shadow-elevation-sm">
            {product.badge.label}
          </Badge>
        )}

        {/* Quick look */}
        <span className="absolute right-2.5 top-2.5 hidden items-center gap-1 rounded-full bg-surface/95 px-2.5 py-1 text-label-sm text-text-primary shadow-elevation-sm backdrop-blur transition-opacity duration-300 sm:flex sm:opacity-0 sm:group-hover:opacity-100">
          <Eye className="h-3.5 w-3.5" /> Vista rápida
        </span>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Guardar en favoritos"
          onClick={() => setWished((w) => !w)}
          className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-elevation-sm transition-transform duration-200 hover:scale-105"
        >
          <Heart
            className={cn(
              "h-[18px] w-[18px] transition-colors",
              wished ? "fill-sale-500 text-sale-500" : "text-text-primary"
            )}
          />
        </button>

        {/* Add to cart */}
        <button
          type="button"
          aria-label="Agregar al carrito"
          onClick={() => add(product)}
          className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-md bg-brand-800 text-text-inverse shadow-elevation-sm transition-all duration-200 hover:bg-brand-900 hover:scale-105"
        >
          <ShoppingBag className="h-[18px] w-[18px]" />
        </button>

        <Link href={href} className="absolute inset-0" aria-label={product.name} />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 px-1 pb-1 pt-3">
        <span className="text-label-sm uppercase tracking-wide text-text-muted">{product.vendor}</span>
        <Link
          href={href}
          className="line-clamp-2 text-label-lg text-text-primary transition-colors hover:text-brand-700"
        >
          {product.name}
        </Link>
        <Rating rating={product.rating} reviews={product.reviews} />
        <Price price={product.price} compareAt={product.compareAt} size="sm" className="mt-0.5" />

        {showColors && product.colors && product.colors.length > 0 && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-body-sm text-text-secondary">Color: {product.colors[0].name}</span>
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 5).map((c, i) => (
                <span
                  key={c.name}
                  title={c.name}
                  className={cn(
                    "h-4 w-4 rounded-full ring-1 ring-black/10",
                    i === 0 && "ring-2 ring-brand-800 ring-offset-1"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
