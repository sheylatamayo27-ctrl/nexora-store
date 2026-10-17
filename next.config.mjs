/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las imágenes viven en /public/images. Si en el futuro se sirven desde un CDN,
    // se agregan aquí los remotePatterns correspondientes.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
