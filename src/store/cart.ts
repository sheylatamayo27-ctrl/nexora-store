"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

export interface CartItem {
  key: string;
  product: Product;
  qty: number;
  color?: string;
}

interface CartState {
  items: CartItem[];
  add: (product: Product, opts?: { qty?: number; color?: string }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, opts) =>
        set((state) => {
          const color = opts?.color;
          const qty = opts?.qty ?? 1;
          const key = `${product.id}:${color ?? ""}`;
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { key, product, qty, color }] };
        }),
      remove: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.product.price * i.qty, 0),
    }),
    { name: "nexora-cart" }
  )
);
