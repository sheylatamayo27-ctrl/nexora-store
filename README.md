# Nexora Store

Tienda de electrónica construida con **Next.js (App Router) + TypeScript + Tailwind CSS**, fiel al diseño de Figma. Diseño responsivo (escritorio, tablet y móvil), transiciones elegantes con Framer Motion y carrito con Zustand.

## Requisitos

- Node.js 20 o superior
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Scripts: `npm run dev` · `npm run build` · `npm start` · `npm run lint`

## Stack

| Área | Herramienta |
|------|-------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS (tokens del diseño en `tailwind.config.ts`) |
| Tipografía | Jost (`next/font`) |
| Animaciones | Framer Motion |
| Estado (carrito) | Zustand (persistido en localStorage) |
| Iconos | lucide-react |

## Estructura

```
src/
  app/
    layout.tsx          # layout raíz, fuente Jost, metadatos
    globals.css         # estilos base + utilidades
    (shop)/             # grupo con Header/Footer/BottomNav
      layout.tsx
      page.tsx          # Home
  components/
    ui/                 # Button, Badge, Container…
    commerce/           # ProductCard, Price, Rating…
    layout/             # Header, Footer, BottomNav, AnnouncementBar
    home/               # secciones de la home (Hero, Marquee…)
    media/AssetImage    # imagen con sistema de placeholders
    brand/Logo
  data/                 # catálogo mock (products, categories, types)
  lib/                  # utils (cn), format (precios), motion (Reveal)
  store/cart.ts         # carrito (Zustand)
public/images/          # imágenes (products / banners / misc)
```

## Imágenes

Mientras se integran las fotos reales, la tienda usa **placeholders SVG** con la estética de la marca, ubicados en `public/images/{products,banners,misc}`.

Para usar las fotos reales del diseño:

1. Exporta cada imagen desde Figma como **JPG** (o colócalas con estos nombres) en las carpetas:
   - `public/images/misc/` → `hero.jpg`
   - `public/images/banners/` → `phone-banner.jpg`, `earbuds-banner.jpg`, `tablet-banner.jpg`
   - `public/images/products/` → `headphones.jpg`, `earbuds.jpg`, `openear.jpg`, `speaker.jpg`, `cube.jpg`, `powerbank.jpg`, `keyboard.jpg`, `projector.jpg`, `laptop.jpg`, `mobile.jpg`, `tablet.jpg`, `drive.jpg`, `pendrive.jpg`, `printer.jpg`, `laptopcase.jpg`
2. Reinicia `npm run dev`. Un script (`scripts/generate-assets-manifest.mjs`, se ejecuta solo antes de `dev` y `build`) detecta las fotos reales y genera `src/data/assets.generated.ts`.

Cada imagen se reemplaza de forma independiente: si existe `headphones.jpg` se usa; si no, se usa `headphones.svg`. Puedes ir reemplazando una por una y borrar el `.svg` cuando ya tengas su foto. Todos los componentes usan estos nombres, así que no hay que tocar nada más.

## Datos

El catálogo de ejemplo vive en `src/data/`. Cuando quieras datos reales (Shopify Storefront API o Supabase), solo cambia la fuente de datos; los componentes no cambian.

---

Hecho con Next.js. Diseño: sistema Nexora.
