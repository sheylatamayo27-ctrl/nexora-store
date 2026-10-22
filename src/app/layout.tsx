import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/layout/Toaster";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexora — Tecnología y gadgets",
    template: "%s · Nexora",
  },
  description:
    "Nexora es tu tienda de electrónica: audio premium, laptops, smartphones y accesorios con entrega al día siguiente.",
  metadataBase: new URL("https://nexora.store"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={jost.variable}>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
