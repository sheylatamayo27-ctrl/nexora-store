import type { CategoryRecord, PromoBannerRecord } from "./types";

/** "Base de datos" simulada de categorías y banners promocionales (ver `src/server/categories.ts`). */
export const categories: CategoryRecord[] = [
  { slug: "earbuds", name: { es: "Audífonos", en: "Earbuds" }, image: "earbuds", itemCount: 4 },
  { slug: "hard-drives", name: { es: "Discos Duros", en: "Hard Drives" }, image: "drive", itemCount: 8 },
  { slug: "keyboards", name: { es: "Teclados", en: "Keyboards" }, image: "keyboard", itemCount: 2 },
  { slug: "smartphones", name: { es: "Smartphones", en: "Smartphones" }, image: "mobile", itemCount: 6 },
  { slug: "printers", name: { es: "Impresoras", en: "Printers" }, image: "printer", itemCount: 3 },
  { slug: "speakers", name: { es: "Altavoces", en: "Speakers" }, image: "cube", itemCount: 4 },
  { slug: "headphones", name: { es: "Auriculares", en: "Headphones" }, image: "headphones", itemCount: 5 },
  { slug: "laptops", name: { es: "Laptops", en: "Laptops" }, image: "laptop", itemCount: 5 },
  { slug: "pen-drives", name: { es: "Pen Drives", en: "Pen Drives" }, image: "pendrive", itemCount: 4 },
  { slug: "tablets", name: { es: "Tablets", en: "Tablets" }, image: "tablet", itemCount: 5 },
  { slug: "accessories", name: { es: "Accesorios", en: "Accessories" }, image: "powerbank", itemCount: 3 },
];

export const promoBanners: PromoBannerRecord[] = [
  {
    eyebrow: { es: "Smartphones", en: "Smartphones" },
    title: { es: "Innovación en Smartphones", en: "Smartphone Innovation" },
    subtitle: { es: "Tecnología de última generación", en: "Cutting-edge technology" },
    image: "phone-banner",
    align: "left",
    href: "/category/smartphones",
  },
  {
    eyebrow: { es: "Audífonos", en: "Earbuds" },
    title: { es: "Libertad de Audio", en: "Audio Freedom" },
    subtitle: { es: "El sonido se encuentra con la innovación", en: "Where sound meets innovation" },
    image: "earbuds-banner",
    align: "center",
    href: "/category/earbuds",
  },
  {
    eyebrow: { es: "Tablets", en: "Tablets" },
    title: { es: "El Poder de las Tablets Portátiles", en: "The Power of Portable Tablets" },
    subtitle: { es: "Rendimiento donde vayas", en: "Performance wherever you go" },
    image: "tablet-banner",
    align: "left",
    href: "/category/tablets",
  },
];
