/**
 * URLs antiguas en español → nuevas en inglés. La web ya estaba publicada con las
 * antiguas: se redirigen de forma permanente (308, equivalente a 301 para
 * buscadores) para conservar el SEO y los enlaces.
 *
 * Las resuelve el middleware antes que el idioma, y no `redirects()` de
 * next.config: en Netlify el middleware corre primero, next-intl reescribía
 * /carrito a /es/carrito y la redirección ya no coincidía (404).
 */

/** Rutas sin slug. */
const legacyRoutes = new Map(
  Object.entries({
    "/entrar": "/login",
    "/crear-cuenta": "/register",
    "/carrito": "/cart",
    "/buscar": "/search",
    "/ofertas": "/offers",
    "/favoritos": "/wishlist",
    "/cuenta": "/account",
    "/pedido-confirmado": "/order-confirmation",
  }),
);

/** /categoria/<viejo> → /category/<nuevo>. "ofertas" es la vista especial de descuentos. */
const legacyCategorySlugs = new Map(
  Object.entries({
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
  }),
);

/** /producto/<viejo> → /product/<nuevo>. */
const legacyProductSlugs = new Map(
  Object.entries({
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
  }),
);

/** /blog/<viejo> → /blog/<nuevo>. */
const legacyBlogSlugs = new Map(
  Object.entries({
    "como-elegir-auriculares-cancelacion-de-ruido": "how-to-choose-noise-cancelling-headphones",
    "5-accesorios-imprescindibles-para-tu-laptop": "5-essential-laptop-accessories",
    "nexora-x12-primeras-impresiones": "nexora-x12-first-impressions",
    "audio-sin-cables-guia-definitiva-2026": "wireless-audio-ultimate-guide-2026",
    "tablets-para-crear-vale-la-pena-el-stylus": "tablets-for-creators-is-the-stylus-worth-it",
    "como-cuidar-la-bateria-de-tus-gadgets": "how-to-care-for-your-gadget-batteries",
  }),
);

/**
 * Ruta nueva que corresponde a `pathname` si es una URL antigua; si no, `null`.
 * En categoría y producto cualquier otro slug conserva su valor (solo cambia el
 * segmento); en el blog solo se redirigen los slugs renombrados.
 * La barra final no cuenta: en Netlify el middleware recibe /carrito/ tal cual.
 */
export function legacyRedirect(rawPathname: string): string | null {
  const pathname = rawPathname.replace(/\/+$/, "");
  const route = legacyRoutes.get(pathname);
  if (route) return route;

  const [, segment, slug, ...rest] = pathname.split("/");
  if (!slug || rest.length > 0) return null;
  if (segment === "categoria") return `/category/${legacyCategorySlugs.get(slug) ?? slug}`;
  if (segment === "producto") return `/product/${legacyProductSlugs.get(slug) ?? slug}`;
  const post = segment === "blog" && legacyBlogSlugs.get(slug);
  return post ? `/blog/${post}` : null;
}
