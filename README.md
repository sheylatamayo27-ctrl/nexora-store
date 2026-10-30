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
| Tipografía | Jost auto-alojada (`next/font/local`, `src/app/fonts/`, licencia SIL OFL) |
| Animaciones | Framer Motion |
| Estado (carrito) | Zustand (persistido en localStorage) |
| Datos en cliente | SWR (búsqueda y listado de categoría, contra `/api`) |
| Iconos | lucide-react |

## Estructura

```
src/
  app/
    layout.tsx          # layout raíz, fuente Jost, metadatos
    fonts/              # Jost (.woff2 variable, subset latin) + OFL.txt
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
  server/               # fuente de datos async (getProducts, getPostBySlug…)
    db/                 # catálogo mock: los arrays crudos
  data/types.ts         # tipos de dominio (Product, Category, BlogPost…)
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
2. Reinicia `npm run dev`. Un script (`scripts/generate-assets-manifest.mjs`, se ejecuta solo antes de `dev` y `build`) detecta las fotos reales y genera `src/lib/assets.generated.ts`.

Cada imagen se reemplaza de forma independiente: si existe `headphones.jpg` se usa; si no, se usa `headphones.svg`. Puedes ir reemplazando una por una y borrar el `.svg` cuando ya tengas su foto. Todos los componentes usan estos nombres, así que no hay que tocar nada más.

## Datos

`src/server/` es el único lugar que sabe de dónde salen los datos:

- `src/server/db/` — el catálogo de ejemplo (productos, categorías, blog, hero).
- `src/server/*.ts` — funciones `async` (`getProducts()`, `getProductBySlug(slug)`, `getBlogPosts()`, `searchProducts(q)`…), re-exportadas desde `@/server`. Cada una indica en un comentario el `fetch` que la sustituirá.
- `src/server/config.ts` — `apiBase` (por defecto `/api`), leído de `NEXT_PUBLIC_API_BASE_URL` (ver `.env.example`). Lo usa solo el cliente (SWR); `src/server` lee siempre de `src/server/db`.
- `src/server/api-types.ts` — tipos de las respuestas de la API.
- `src/data/types.ts` — tipos de dominio (`Product`, `Category`, `BlogPost`…). Solo tipos: los datos se piden siempre a `@/server`.

Cuando quieras datos reales (Shopify Storefront API, Supabase…), cambia el cuerpo de las funciones de `src/server/`; quien las llama no cambia.

### API simulada (`src/app/api/`)

Route Handlers que imitan el backend real leyendo de `@/server`. Latencia simulada con `NEXT_PUBLIC_API_FAKE_LATENCY` (ms; por defecto 250 en desarrollo y 0 en producción). Los errores responden `{ "error": "…" }` con 400 (parámetro inválido) o 404.

| Endpoint | Respuesta |
|---|---|
| `GET /api/products` | `{ items, total, page, pageSize, totalPages }` — `page` (1), `pageSize` (12, máx. 50), `q`, `category`, `brand`, `color` (varios valores separados por comas), `minPrice`, `maxPrice`, `minRating`, `sale`, `deal`, `featured` (`true`/`false`), `sort` (`relevance` · `popular` · `price-asc` · `price-desc` · `rating`) |
| `GET /api/products/[slug]` | `Product` o 404 |
| `GET /api/categories` | `Category[]` |
| `GET /api/banners` | `PromoBanner[]` |
| `GET /api/hero` | `HeroSlide[]` |
| `GET /api/blog` | `{ items, featured }` |
| `GET /api/blog/[slug]` | `{ post, related }` o 404 |
| `GET /api/search?q=&limit=` | `Product[]` (`q` obligatorio; `limit` 1–50) |

### Datos en el cliente (SWR)

Capas: `src/server` lee de `src/server/db` → `/api` solo llama a `src/server` → el cliente solo llama a `/api`.

- `src/app/providers.tsx` — `<SWRConfig>` global: fetcher de `src/lib/fetcher.ts` contra `apiBase`, sin revalidar al enfocar y con `keepPreviousData`.
- `src/hooks/useProducts.ts` — `useProducts(params, { fallbackData })` → `{ items, total, page, pageSize, totalPages, isLoading, error }` (GET `/api/products`).
- `src/hooks/useSearch.ts` — `useSearch(query, limit?)` → `{ results, isLoading, error }` (GET `/api/search`; con `query` vacío no pide nada).

Los usan el buscador (sugerencias con debounce y página `/search`) y el listado de `/category/[slug]`. En el listado, la primera página la calcula el servidor y llega como `fallbackData`, así que el HTML ya trae los productos. Home, producto, ofertas y blog se renderizan en el servidor (`await` a `@/server`), sin SWR.

Los componentes de cliente nunca importan `@/server`: el Server Component más cercano pide los datos y se los pasa por props (mega-menú desde el layout de la tienda y la 404 vía `getMegaMenuData()`, hero desde la home, recomendados desde `/cart`, categorías desde `/category/[slug]`).

## URLs

Rutas y slugs en inglés (`/product/[slug]`, `/category/[slug]`, `/cart`, `/search`, `/offers`, `/wishlist`, `/account`, `/login`, `/register`, `/order-confirmation`); los nombres visibles siguen en español. Los slugs del blog también están en inglés (títulos y contenido en español). Las URLs antiguas en español redirigen de forma permanente a las nuevas (`redirects()` en `next.config.mjs`).

---

Hecho con Next.js. Diseño: sistema Nexora.
