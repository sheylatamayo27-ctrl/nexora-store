# Nexora Store

Tienda de electrónica construida con **Next.js (App Router) + TypeScript + Tailwind CSS**, fiel al diseño de Figma. Diseño responsivo (escritorio, tablet y móvil), transiciones elegantes con Framer Motion, carrito con Zustand y la web completa en español e inglés (next-intl).

## Requisitos

- Node.js 20 o superior
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Scripts: `npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run i18n:check`

## Stack

| Área | Herramienta |
|------|-------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS (tokens del diseño en `tailwind.config.ts`) |
| Tipografía | Jost auto-alojada (`next/font/local`, `src/app/fonts/`, licencia SIL OFL) |
| Animaciones | Framer Motion |
| Estado (carrito y favoritos) | Zustand (persistido en localStorage: `nexora-cart`, `nexora-favorites`) |
| Datos en cliente | SWR (búsqueda y listado de categoría, contra `/api`) |
| Idiomas | next-intl (español por defecto, sin prefijo; inglés bajo `/en`) |
| Iconos | lucide-react |

## Estructura

```
messages/               # diccionarios de interfaz: es.json, en.json
src/
  middleware.ts         # idioma de cada petición (next-intl)
  i18n/                 # routing (idiomas), request (diccionario), navigation (Link, useRouter…), metadata
  app/
    document.tsx        # <html lang>, fuente Jost, proveedores
    fonts/              # Jost (.woff2 variable, subset latin) + OFL.txt
    globals.css         # estilos base + utilidades
    global-error.tsx    # error en el layout raíz: documento propio, textos en ES/EN
    [locale]/           # todas las páginas, por idioma
      layout.tsx        # metadatos del sitio en el idioma
      (shop)/           # grupo con Header/Footer
        layout.tsx
        (home)/page.tsx # Home (en su grupo para que su loading.tsx no cubra otras rutas)
      **/loading.tsx    # skeleton de cada ruta, con las medidas de la página real
      **/error.tsx      # pantalla de error de cada ruta (ErrorFallback: reintentar / inicio)
    api/                # API simulada (fuera de [locale]; idioma por ?locale=)
  components/
    ui/                 # Button, Badge, Container, Skeleton, ErrorFallback…
    skeletons/blocks    # piezas de los loading.tsx (tarjeta, migas, resumen, cuenta, acceso)
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
  store/favorites.ts    # favoritos (Zustand)
public/images/          # imágenes (products / banners / misc)
```

## Imágenes

Las fotos están en **WebP** en `public/images/{products,banners,misc}`. Los componentes las piden por nombre, sin extensión (`AssetImage folder="products" name="headphones"`), y `next/image` las sirve redimensionadas en AVIF/WebP según la pantalla.

Para cambiar o añadir una foto:

1. Guárdala con su nombre en la carpeta que corresponde, en **WebP** de preferencia (JPG y PNG también sirven):
   - `public/images/misc/` → `hero` (y `hero-tablet`, `hero-mobile`), `auth-panel`, `auth-register`
   - `public/images/banners/` → `phone-banner`, `earbuds-banner`, `tablet-banner`
   - `public/images/products/` → `headphones`, `earbuds`, `openear`, `speaker`, `cube`, `powerbank`, `keyboard`, `projector`, `laptop`, `mobile`, `tablet`, `drive`, `pendrive`, `printer`, `laptopcase`
2. Reinicia `npm run dev`. Un script (`scripts/generate-assets-manifest.mjs`, se ejecuta solo antes de `dev` y `build`) detecta las fotos y genera `src/lib/assets.generated.ts`.

Deja un solo archivo por nombre: si hay varios, gana el JPG, luego el PNG y por último el WebP. Si falta una foto se busca `<nombre>.svg`, y si tampoco existe se muestra un ícono en su lugar sin romper el diseño. Los íconos y la imagen para redes (`src/app/icon.png`, `opengraph-image.png`…) siguen en PNG: Next los exige con esos nombres.

## Datos

`src/server/` es el único lugar que sabe de dónde salen los datos:

- `src/server/db/` — el catálogo de ejemplo (productos, categorías, blog, hero) y el contenido de las páginas informativas (`pages.data.ts`: términos, privacidad, envíos, devoluciones, garantía y nosotros; `faq.data.ts`: preguntas frecuentes). Los textos de las páginas usan `[texto](/ruta)` para los enlaces. Los textos traducibles guardan un valor por idioma (`name: { es, en }`); tipos en `src/server/db/types.ts`.
- `src/server/*.ts` — funciones `async` que reciben el idioma (`getProducts(locale)`, `getProductBySlug(slug, locale)`, `getBlogPosts(locale)`, `searchProducts(q, locale)`…) y devuelven los textos ya resueltos (`product.name` es texto plano; si falta una traducción, se usa el español). Re-exportadas desde `@/server`. Cada una indica en un comentario el `fetch` que la sustituirá.
- `src/server/localize.ts` — convierte los registros de `db` a un idioma.
- `src/server/config.ts` — `apiBase` (por defecto `/api`), leído de `NEXT_PUBLIC_API_BASE_URL` (ver `.env.example`). Lo usa solo el cliente (SWR); `src/server` lee siempre de `src/server/db`.
- `src/server/api-types.ts` — tipos de las respuestas de la API.
- `src/data/types.ts` — tipos de dominio (`Product`, `Category`, `BlogPost`…). Solo tipos: los datos se piden siempre a `@/server`.

Cuando quieras datos reales (Shopify Storefront API, Supabase…), cambia el cuerpo de las funciones de `src/server/`; quien las llama no cambia.

### API simulada (`src/app/api/`)

Route Handlers que imitan el backend real leyendo de `@/server`. Latencia simulada con `NEXT_PUBLIC_API_FAKE_LATENCY` (ms; por defecto 250 en desarrollo y 0 en producción). Los errores responden `{ "error": "…" }` con 400 (parámetro inválido) o 404. Todos los endpoints aceptan `?locale=es|en` (por defecto `es`) y devuelven los textos en ese idioma.

| Endpoint | Respuesta |
|---|---|
| `GET /api/products` | `{ items, total, page, pageSize, totalPages }` — `page` (1), `pageSize` (12, máx. 50), `ids`, `q`, `category`, `brand`, `color` (varios valores separados por comas; `color` por nombre en el idioma pedido), `minPrice`, `maxPrice`, `minRating`, `sale`, `deal`, `featured` (`true`/`false`), `sort` (`relevance` · `popular` · `price-asc` · `price-desc` · `rating`), `locale` |
| `GET /api/products/[slug]` | `Product` o 404 |
| `GET /api/categories` | `Category[]` |
| `GET /api/banners` | `PromoBanner[]` |
| `GET /api/hero` | `HeroSlide[]` |
| `GET /api/blog` | `{ items, featured }` |
| `GET /api/blog/[slug]` | `{ post, related }` o 404 |
| `GET /api/search?q=&limit=&locale=` | `Product[]` (`q` obligatorio; `limit` 1–50) |

### Datos en el cliente (SWR)

Capas: `src/server` lee de `src/server/db` → `/api` solo llama a `src/server` → el cliente solo llama a `/api`.

- `src/app/providers.tsx` — `<SWRConfig>` global: fetcher de `src/lib/fetcher.ts` contra `apiBase`, sin revalidar al enfocar y con `keepPreviousData`.
- `src/hooks/useProducts.ts` — `useProducts(params, { fallbackData })` → `{ items, total, page, pageSize, totalPages, isLoading, error }` (GET `/api/products`).
- `src/hooks/useSearch.ts` — `useSearch(query, limit?)` → `{ results, isLoading, error }` (GET `/api/search`; con `query` vacío no pide nada).

Ambos hooks incluyen el idioma actual en la key de SWR (y en la petición, `?locale=`): al cambiar de idioma se piden de nuevo. Los usan el buscador (sugerencias con debounce y página `/search`) y el listado de `/category/[slug]`. En el listado, la primera página la calcula el servidor y llega como `fallbackData`, así que el HTML ya trae los productos. Home, producto, ofertas y blog se renderizan en el servidor (`await` a `@/server`), sin SWR.

Los componentes de cliente nunca importan `@/server`: el Server Component más cercano pide los datos y se los pasa por props (mega-menú desde el layout de la tienda y la 404 vía `getMegaMenuData()`, hero desde la home, recomendados desde `/cart`, categorías desde `/category/[slug]`).

## URLs

Rutas y slugs en inglés (`/product/[slug]`, `/category/[slug]`, `/cart`, `/search`, `/offers`, `/wishlist`, `/account`, `/account/addresses`, `/account/payments`, `/account/notifications`, `/account/settings`, `/login`, `/register`, `/forgot-password`, `/order-confirmation`, `/terms`, `/privacy`, `/shipping`, `/returns`, `/warranty`, `/about`, `/faq`, `/contact`, `/new-arrivals`, `/track-order`) en ambos idiomas: el español va sin prefijo y el inglés bajo `/en` (`/en/cart`, `/en/product/[slug]`…). Los slugs del blog también están en inglés. Las URLs antiguas en español redirigen de forma permanente a las nuevas (`src/lib/legacy-redirects.ts`, aplicado en `src/middleware.ts` antes que el idioma).

## Idiomas (i18n)

next-intl con `locales: ['es', 'en']`, `defaultLocale: 'es'` y `localePrefix: 'as-needed'` (`src/i18n/routing.ts`).

- **Textos de interfaz** — `messages/es.json` y `messages/en.json`, por namespaces (`common`, `header`, `nav`, `footer`, `home`, `product`, `cart`, `checkout`, `account`, `orders`, `auth`, `search`, `category`, `blog`, `offers`…). Server Components: `getTranslations`; el resto: `useTranslations`. Las claves están tipadas desde `es.json` (`src/i18n/app-config.d.ts`): una clave inexistente no compila.
- **Contenido** — productos, categorías, blog, hero, banners, páginas informativas y FAQ guardan cada texto en ambos idiomas en `src/server/db/` (ver *Datos*).
- **Enlaces** — se usan `Link`, `useRouter` y `usePathname` de `@/i18n/navigation` (no los de Next), que añaden `/en` cuando toca.
- **Selector de idioma** — navega a la misma página en el otro idioma sin recargar y conservando el scroll. La elección se guarda en la cookie `NEXT_LOCALE` (un año), que el middleware usa al volver. El idioma del navegador no se tiene en cuenta: sin cookie ni `/en`, la tienda se ve en español (en `src/middleware.ts` se explica cómo activarlo).
- **SEO** — `<html lang>`, títulos y descripciones por idioma, `canonical` y `hreflang` (es, en y x-default) en cada página (`src/i18n/metadata.ts`).
- **Carrito y favoritos** — guardan una copia de cada producto en localStorage; al entrar en otro idioma, `StoreLocaleSync` la vuelve a pedir a la API en ese idioma.
- **Comprobación** — `npm run i18n:check` (también antes de `dev` y `build`) falla si a un idioma le falta o le sobra una clave, si hay textos vacíos o si los parámetros `{…}` no coinciden. Una clave que falte en tiempo de render rompe el build.

Para añadir un idioma: agrégalo a `routing.locales` (y a `intlLocales`/`ogLocales`), crea `messages/<idioma>.json` con las mismas claves y añade su valor a cada texto de `src/server/db/`.

## Pendiente de completar por el comprador

### Datos de la tienda

- Contacto (dirección, teléfono, correo), horario y redes sociales: `src/components/layout/store-info.ts`, compartido por el footer y `/contact`. Las redes apuntan a la portada de cada red: cámbialas por los perfiles de tu tienda.
- Textos legales (`/terms`, `/privacy`) y políticas (`/shipping`, `/returns`, `/warranty`): son de ejemplo; revísalos con tu asesor legal antes de publicar (`src/server/db/pages.data.ts`).
- Moneda: dólares estadounidenses (USD), con el formato de `src/lib/format.ts` (`$1,035.99`). Los precios del catálogo y de los pedidos de ejemplo están en USD.
- Regla de envío: `src/lib/shipping.ts` (`shippingCost`). Estándar siempre gratis, exprés $4.99 y gratis desde $500 (`FREE_EXPRESS_THRESHOLD`), mismo día $8.99. La usan el carrito (resumen y barra de progreso), el checkout, la confirmación, la tabla de `/shipping` y los textos que mencionan el umbral: cambia el valor ahí y se actualiza en todo el sitio.
- Recargos fijos (envoltorio de regalo, pago contra entrega): `src/lib/fees.ts`.

### Pantallas solo de front-end

No envían nada a ningún sitio: validan en el cliente y simulan el resultado. Cada componente indica en un comentario dónde va la llamada real.

- `/forgot-password` (`src/components/auth/ForgotPasswordView.tsx`) — valida el correo y muestra "Te enviamos un enlace", sin enviar ningún correo.
- `/account/settings` (`src/components/account/SettingsView.tsx`) — valida el perfil y muestra "Cambios guardados", sin guardar nada.
- `/contact` (`src/components/contact/ContactForm.tsx`) — valida el formulario y muestra "Mensaje enviado", sin enviar nada.
- `/track-order` (`src/components/track-order/TrackOrderView.tsx`) — cualquier número de pedido válido muestra el mismo envío de ejemplo "En camino".
- `/account/payments`, `/account/addresses` y `/account/notifications` — siempre vacías; "Agregar" solo muestra un aviso de "Próximamente".

---

Hecho con Next.js. Diseño: sistema Nexora.
