import type { Metadata } from "next";

// La página es un componente cliente: el título se declara aquí.
export const metadata: Metadata = { title: "Carrito" };

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
