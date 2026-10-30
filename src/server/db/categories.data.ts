import type { Category, PromoBanner } from "@/data/types";

/** "Base de datos" simulada de categorías y banners promocionales (ver `src/server/categories.ts`). */
export const categories: Category[] = [
  { slug: "earbuds", name: "Audífonos", image: "earbuds", itemCount: 4 },
  { slug: "hard-drives", name: "Discos Duros", image: "drive", itemCount: 8 },
  { slug: "keyboards", name: "Teclados", image: "keyboard", itemCount: 2 },
  { slug: "smartphones", name: "Smartphones", image: "mobile", itemCount: 6 },
  { slug: "printers", name: "Impresoras", image: "printer", itemCount: 3 },
  { slug: "speakers", name: "Altavoces", image: "cube", itemCount: 4 },
  { slug: "headphones", name: "Auriculares", image: "headphones", itemCount: 5 },
  { slug: "laptops", name: "Laptops", image: "laptop", itemCount: 5 },
  { slug: "pen-drives", name: "Pen Drives", image: "pendrive", itemCount: 4 },
  { slug: "tablets", name: "Tablets", image: "tablet", itemCount: 5 },
  { slug: "accessories", name: "Accesorios", image: "powerbank", itemCount: 3 },
];

export const promoBanners: PromoBanner[] = [
  {
    eyebrow: "Smartphones",
    title: "Innovación en Smartphones",
    subtitle: "Tecnología de última generación",
    image: "phone-banner",
    align: "left",
    href: "/category/smartphones",
  },
  {
    eyebrow: "Audífonos",
    title: "Libertad de Audio",
    subtitle: "El sonido se encuentra con la innovación",
    image: "earbuds-banner",
    align: "center",
    href: "/category/earbuds",
  },
  {
    eyebrow: "Tablets",
    title: "El Poder de las Tablets Portátiles",
    subtitle: "Rendimiento donde vayas",
    image: "tablet-banner",
    align: "left",
    href: "/category/tablets",
  },
];
