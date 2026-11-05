// `key`: texto en el namespace "nav".

/** Menú móvil (Header): las secciones principales de la tienda. */
export const primaryNav = [
  { key: "electronics", href: "/category/headphones" },
  { key: "offers", href: "/offers" },
  { key: "blogs", href: "/blog" },
  { key: "contact", href: "/contact" },
  { key: "whatsNew", href: "/new-arrivals" },
] as const;

/** Enlaces de ayuda: a la derecha de la barra del mega-menú (desktop) y al pie del menú móvil. */
export const secondaryNav = [
  { key: "faqs", href: "/faq" },
  { key: "trackOrder", href: "/track-order" },
  { key: "about", href: "/about" },
] as const;
