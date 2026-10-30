/*
 * URLs antiguas en español → nuevas en inglés. La web ya estaba publicada con las
 * antiguas: se redirigen de forma permanente para conservar el SEO y los enlaces.
 */

/** Rutas sin slug. */
const legacyRoutes = {
  "/entrar": "/login",
  "/crear-cuenta": "/register",
  "/carrito": "/cart",
  "/buscar": "/search",
  "/ofertas": "/offers",
  "/favoritos": "/wishlist",
  "/cuenta": "/account",
  "/pedido-confirmado": "/order-confirmation",
};

/** /categoria/<viejo> → /category/<nuevo>. "ofertas" es la vista especial de descuentos. */
const legacyCategorySlugs = {
  audifonos: "earbuds",
  "discos-duros": "hard-drives",
  teclados: "keyboards",
  smartphones: "smartphones",
  impresoras: "printers",
  altavoces: "speakers",
  auriculares: "headphones",
  laptops: "laptops",
  "pen-drives": "pen-drives",
  tablets: "tablets",
  ofertas: "offers",
  accesorios: "accessories",
};

/** /producto/<viejo> → /product/<nuevo>. */
const legacyProductSlugs = {
  "nexora-aura-anc-auriculares-inalambricos": "nexora-aura-anc-wireless-headphones",
  "nexora-pods-lite-audifonos-true-wireless": "nexora-pods-lite-true-wireless-earbuds",
  "open-ear-audifonos-deportivos-inalambricos": "open-ear-wireless-sports-earbuds",
  "altavoz-portatil-inalambrico-exterior": "portable-wireless-outdoor-speaker",
  "nexora-cube-altavoz-inteligente-luz-ambiental": "nexora-cube-smart-speaker-ambient-light",
  "power-bank-compacto-de-bolsillo-10000mah": "compact-pocket-power-bank-10000mah",
  "keypop-combo-teclado-y-mouse-inalambrico": "keypop-wireless-keyboard-mouse-combo",
  "proyector-multimedia-digital-inalambrico-4k": "wireless-4k-digital-multimedia-projector",
  "mybook-laptop-14-pulgadas-2-8k-oled": "mybook-14-inch-laptop-2-8k-oled",
  "nexora-x12-smartphone-256gb": "nexora-x12-smartphone-256gb",
  "nexora-tab-11-tablet-con-stylus": "nexora-tab-11-tablet-with-stylus",
  "nexora-disk-2tb-disco-duro-portatil": "nexora-disk-2tb-portable-hard-drive",
  "nexora-pen-drive-metalico-usb": "nexora-metal-usb-pen-drive",
  "impresora-laser-multifuncion-oficina": "multifunction-office-laser-printer",
  "funda-rigida-mate-personalizada-laptop": "custom-matte-hard-shell-laptop-case",
};

/** /blog/<viejo> → /blog/<nuevo>. */
const legacyBlogSlugs = {
  "como-elegir-auriculares-cancelacion-de-ruido": "how-to-choose-noise-cancelling-headphones",
  "5-accesorios-imprescindibles-para-tu-laptop": "5-essential-laptop-accessories",
  "nexora-x12-primeras-impresiones": "nexora-x12-first-impressions",
  "audio-sin-cables-guia-definitiva-2026": "wireless-audio-ultimate-guide-2026",
  "tablets-para-crear-vale-la-pena-el-stylus": "tablets-for-creators-is-the-stylus-worth-it",
  "como-cuidar-la-bateria-de-tus-gadgets": "how-to-care-for-your-gadget-batteries",
};

/** `permanent: true` → Next.js responde 308 (equivalente a 301 para buscadores). */
const permanent = (source, destination) => ({ source, destination, permanent: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las imágenes viven en /public/images. Si en el futuro se sirven desde un CDN,
    // se agregan aquí los remotePatterns correspondientes.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...Object.entries(legacyCategorySlugs).map(([from, to]) => permanent(`/categoria/${from}`, `/category/${to}`)),
      ...Object.entries(legacyProductSlugs).map(([from, to]) => permanent(`/producto/${from}`, `/product/${to}`)),
      ...Object.entries(legacyBlogSlugs).map(([from, to]) => permanent(`/blog/${from}`, `/blog/${to}`)),
      // Cualquier otro slug conserva su valor; solo cambia el segmento.
      permanent("/categoria/:slug", "/category/:slug"),
      permanent("/producto/:slug", "/product/:slug"),
      ...Object.entries(legacyRoutes).map(([from, to]) => permanent(from, to)),
    ];
  },
};

export default nextConfig;
