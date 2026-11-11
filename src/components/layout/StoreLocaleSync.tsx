"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { productsKey } from "@/hooks/useProducts";
import { fetcher } from "@/lib/fetcher";
import type { ProductListResponse } from "@/server/api-types";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";

const MAX_IDS = 50;

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

    if (ids.length === 0) {
      apply([]);
      return;
    }

    let cancelled = false;
    fetcher<ProductListResponse>(productsKey({ ids, pageSize: ids.length }, locale))
      .then(({ items }) => {
        if (!cancelled) apply(items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [mounted, locale]);

  return null;
}
