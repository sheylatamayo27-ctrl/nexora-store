import Image from "next/image";
import { cn } from "@/lib/utils";
import { REAL_IMAGES } from "@/data/assets.generated";

export type AssetFolder = "products" | "banners" | "misc";

/**
 * Ruta de una imagen. Si existe la foto real en /public/images (jpg, png o webp)
 * se usa; si no, se usa el placeholder .svg con el mismo nombre.
 * La lista de fotos reales la genera `scripts/generate-assets-manifest.mjs`.
 */
export function assetSrc(folder: AssetFolder, name: string): string {
  const ext = REAL_IMAGES[`${folder}/${name}`] ?? "svg";
  return `/images/${folder}/${name}.${ext}`;
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

  if (src.endsWith(".svg")) {
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
