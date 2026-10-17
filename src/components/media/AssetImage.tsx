"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Extensión de los archivos de imagen.
 * Mientras se usan placeholders es "svg". Cuando se agreguen las fotos reales
 * exportadas de Figma (mismos nombres, formato .jpg) en /public/images, basta
 * con cambiar esta constante a "jpg" y toda la tienda usará las fotos reales.
 */
export const ASSET_EXT = "jpg";

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
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("absolute inset-0 flex items-center justify-center bg-surface-subtle text-text-tertiary", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
      </div>
    );
  }

  if (ASSET_EXT === "jpg") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
        onError={() => setFailed(true)}
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
