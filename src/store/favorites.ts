"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

/**
 * Favoritos persistidos en localStorage (igual que el carrito), así que
 * sobreviven a las recargas. Quien lea `items` para pintar debe esperar al
 * montaje (`mounted`) para no desajustar la hidratación del HTML del servidor.
 */
interface FavoritesState {
  items: Product[];
  /** Alterna el favorito y devuelve `true` si quedó agregado. */
  toggle: (product: Product) => boolean;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
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
    }),
    { name: "nexora-favorites" }
  )
);
