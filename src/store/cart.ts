"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import type { ShippingMethod } from "@/lib/shipping";

export interface CartItem {
  key: string;
  product: Product;
  qty: number;
  color?: string;
}

interface CartState {
  items: CartItem[];
  locale?: Locale;
  coupon?: string;
  shippingMethod?: ShippingMethod;
  add: (product: Product, opts?: { qty?: number; color?: string }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  setCoupon: (code?: string) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  relocalize: (products: Product[], locale: Locale) => void;
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
      clear: () => set({ items: [], coupon: undefined, shippingMethod: undefined }),
      setCoupon: (coupon) => set({ coupon }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),
      relocalize: (products, locale) =>
        set((state) => ({
          locale,
          items: state.items.map((item) => {
            const next = products.find((p) => p.id === item.product.id);
            if (!next) return item;
            const colorIndex = item.product.colors?.findIndex((c) => c.name === item.color) ?? -1;
            const color = colorIndex >= 0 ? next.colors?.[colorIndex]?.name ?? item.color : item.color;
            return { ...item, product: next, color };
          }),
        })),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.product.price * i.qty, 0),
    }),
    {
      name: "nexora-cart",
      version: 1,
      migrate: (persisted) => ({ ...(persisted as CartState), locale: undefined }),
    }
  )
);
