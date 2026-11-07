import { REAL_IMAGES } from "@/lib/assets.generated";

export type AssetFolder = "products" | "banners" | "misc";

/**
 * Ruta de una imagen. Si existe la foto real en /public/images (jpg, png o webp)
 * se usa; si no, se usa el placeholder .svg con el mismo nombre.
 * La lista de fotos reales la genera `scripts/generate-assets-manifest.mjs`.
 * Vive fuera de `AssetImage` (componente cliente) para poder usarla también en el
 * servidor (metadata, JSON-LD).
 */
export function assetSrc(folder: AssetFolder, name: string): string {
  const ext = REAL_IMAGES[`${folder}/${name}`] ?? "svg";
  return `/images/${folder}/${name}.${ext}`;
}
