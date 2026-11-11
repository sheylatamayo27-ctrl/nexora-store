import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexora — Tu tienda de tecnología",
    short_name: "Nexora",
    description: "Audio premium, laptops, smartphones y accesorios con entrega al día siguiente.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#081B4B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
