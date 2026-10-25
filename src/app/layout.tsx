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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
