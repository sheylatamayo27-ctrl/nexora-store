import type { Category, PromoBanner } from "./types";

export const categories: Category[] = [
  { slug: "audifonos", name: "Audífonos", image: "earbuds", itemCount: 4 },
  { slug: "discos-duros", name: "Discos Duros", image: "drive", itemCount: 8 },
  { slug: "teclados", name: "Teclados", image: "keyboard", itemCount: 2 },
  { slug: "smartphones", name: "Smartphones", image: "mobile", itemCount: 6 },
  { slug: "impresoras", name: "Impresoras", image: "printer", itemCount: 3 },
  { slug: "altavoces", name: "Altavoces", image: "cube", itemCount: 4 },
  { slug: "auriculares", name: "Auriculares", image: "headphones", itemCount: 5 },
  { slug: "laptops", name: "Laptops", image: "laptop", itemCount: 5 },
  { slug: "pen-drives", name: "Pen Drives", image: "pendrive", itemCount: 4 },
  { slug: "tablets", name: "Tablets", image: "tablet", itemCount: 5 },
];

export const promoBanners: PromoBanner[] = [
  {
    eyebrow: "Smartphones",
    title: "Innovación en Smartphones",
    subtitle: "Tecnología de última generación",
    image: "phone-banner",
    align: "left",
    href: "/categoria/smartphones",
  },
  {
    eyebrow: "Audífonos",
    title: "Libertad de Audio",
    subtitle: "El sonido se encuentra con la innovación",
    image: "earbuds-banner",
    align: "center",
    href: "/categoria/audifonos",
  },
  {
    eyebrow: "Tablets",
    title: "El Poder de las Tablets Portátiles",
    subtitle: "Rendimiento donde vayas",
    image: "tablet-banner",
    align: "left",
    href: "/categoria/tablets",
  },
];
