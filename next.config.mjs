import createNextIntlPlugin from "next-intl/plugin";

/** next-intl: idioma y diccionario de cada petición (ver src/i18n/request.ts). */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/*
 * Las URLs antiguas en español (/carrito, /producto/…) no se redirigen aquí sino en
 * el middleware (src/lib/legacy-redirects.ts): en Netlify el middleware de idioma
 * corre antes que `redirects()` y esas redirecciones nunca llegaban a aplicarse.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las imágenes viven en /public/images. Si en el futuro se sirven desde un CDN,
    // se agregan aquí los remotePatterns correspondientes.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
