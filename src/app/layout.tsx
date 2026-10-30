import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/layout/Toaster";
import { BackToTop } from "@/components/layout/BackToTop";

// Jost auto-alojada (licencia OFL en ./fonts/OFL.txt): el build no depende de Google Fonts.
// Es una fuente variable: este único archivo (subset latin, el mismo que servía
// Google Fonts) cubre los pesos 400–700.
const jost = localFont({
  src: [{ path: "./fonts/jost-variable-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});

const siteTitle = "Nexora — Tu tienda de tecnología";
const siteDescription =
  "Nexora es tu tienda de electrónica: audio premium, laptops, smartphones y accesorios con entrega al día siguiente.";

// Íconos e imagen para redes: archivos icon.png, apple-icon.png,
// opengraph-image.png y twitter-image.png en esta carpeta (convención de Next).
export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Nexora",
  },
  description: siteDescription,
  metadataBase: new URL("https://nexora.store"),
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Nexora",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={jost.variable}>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <BackToTop />
        <Toaster />
      </body>
    </html>
  );
}
