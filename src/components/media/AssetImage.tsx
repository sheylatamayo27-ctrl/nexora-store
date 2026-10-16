import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Extensión de los archivos de imagen.
 * Mientras se usan placeholders es "svg". Cuando se agreguen las fotos reales
 * exportadas de Figma (mismos nombres, formato .jpg) en /public/images, basta
 * con cambiar esta constante a "jpg" y toda la tienda usará las fotos reales.
 */
export const ASSET_EXT: "svg" | "jpg" = "svg";

export type AssetFolder = "products" | "banners" | "misc";

export function assetSrc(folder: AssetFolder, name: string): string {
  return `/images/${folder}/${name}.${ASSET_EXT}`;
}

interface AssetImageProps {
  folder: AssetFolder;
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Imagen que llena su contenedor (el contenedor debe ser `relative` y tener
 * tamaño). Usa next/image para fotos reales y <img> para los placeholders SVG.
 */
export function AssetImage({ folder, name, alt, sizes, priority, className }: AssetImageProps) {
  const src = assetSrc(folder, name);

  if (ASSET_EXT === "svg") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
