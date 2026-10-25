import type { Metadata } from "next";

// La página es un componente cliente: el título se declara aquí.
export const metadata: Metadata = { title: "Pedido confirmado" };

export default function OrderConfirmedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
