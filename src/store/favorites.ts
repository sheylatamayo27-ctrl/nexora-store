"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";
import type { Locale } from "@/i18n/routing";

/**
 * Favoritos persistidos en localStorage (igual que el carrito), así que
 * sobreviven a las recargas. Quien lea `items` para pintar debe esperar al
 * montaje (`mounted`) para no desajustar la hidratación del HTML del servidor.
 *
 * Sincronizar con la cuenta: hoy solo viven en el navegador. Con backend real,
 * llama a `syncWishlist(get().items.map((p) => p.id))` (src/services/wishlist.ts)
 * al final de `toggle`, `remove` y `clear` si hay sesión, y al iniciar sesión
 * mezcla aquí lo que devuelva `getWishlist()`.
 */
interface FavoritesState {
  items: Product[];
  locale?: Locale;
  toggle: (product: Product) => boolean;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
  relocalize: (products: Product[], locale: Locale) => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set((state) => ({ items: state.items.filter((p) => p.id !== product.id) }));
          return false;
        }
        set((state) => ({ items: [product, ...state.items] }));
        return true;
      },
      has: (id) => get().items.some((p) => p.id === id),
      remove: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
      clear: () => set({ items: [] }),
      relocalize: (products, locale) =>
        set((state) => ({
          locale,
          items: state.items.map((item) => products.find((p) => p.id === item.id) ?? item),
        })),
    }),
    {
      name: "nexora-favorites",
      version: 1,
      migrate: (persisted) => ({ ...(persisted as FavoritesState), locale: undefined }),
    }
  )
);
