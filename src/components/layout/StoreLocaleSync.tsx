"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { productsKey } from "@/hooks/useProducts";
import { fetcher } from "@/lib/fetcher";
import type { ProductListResponse } from "@/server/api-types";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";

/** Tope de productos por petición (el `maxPageSize` de la API). */
const MAX_IDS = 50;

/**
 * El carrito y los favoritos guardan en localStorage una copia de cada producto
 * con sus textos en el idioma en que se agregó. Al entrar en otro idioma pide esos
 * productos a la API en el idioma actual y actualiza las copias, para que no se
 * cuelen nombres o colores del idioma anterior. No pinta nada.
 */
export function StoreLocaleSync() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const cart = useCart.getState();
    const favorites = useFavorites.getState();
    const staleIds = [
      ...(cart.locale !== locale ? cart.items.map((i) => i.product.id) : []),
      ...(favorites.locale !== locale ? favorites.items.map((p) => p.id) : []),
    ];
    const ids = [...new Set(staleIds)].slice(0, MAX_IDS);

    const apply = (items: ProductListResponse["items"]) => {
      if (useCart.getState().locale !== locale) useCart.getState().relocalize(items, locale);
      if (useFavorites.getState().locale !== locale) useFavorites.getState().relocalize(items, locale);
    };

    // Nada que traducir: basta con anotar el idioma.
    if (ids.length === 0) {
      apply([]);
      return;
    }

    let cancelled = false;
    fetcher<ProductListResponse>(productsKey({ ids, pageSize: ids.length }, locale))
      .then(({ items }) => {
        if (!cancelled) apply(items);
      })
      // Si falla, las copias siguen siendo válidas y se reintenta en la próxima carga.
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [mounted, locale]);

  return null;
}
