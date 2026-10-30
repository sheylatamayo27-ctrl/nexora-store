import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { getFeaturedProducts } from "@/server";

export const metadata: Metadata = { title: "Carrito" };

export default async function CartPage() {
  // "Comprados juntos frecuentemente": los 5 primeros destacados.
  const recommended = (await getFeaturedProducts()).slice(0, 5);
  return <CartView recommended={recommended} />;
}
