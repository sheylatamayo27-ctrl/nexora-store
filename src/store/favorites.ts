"use client";

import { create } from "zustand";
import type { Product } from "@/data/types";

/**
 * Favoritos solo de ejemplo: se guardan en una lista en memoria (este store).
 * No se persiste en localStorage, así que se pierden al recargar la página.
 */
interface FavoritesState {
  items: Product[];
  /** Alterna el favorito y devuelve `true` si quedó agregado. */
  toggle: (product: Product) => boolean;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
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
}));
