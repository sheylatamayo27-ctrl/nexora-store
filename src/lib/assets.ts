import { REAL_IMAGES } from "@/lib/assets.generated";

export type AssetFolder = "products" | "banners" | "misc";

export function assetSrc(folder: AssetFolder, name: string): string {
  const ext = REAL_IMAGES[`${folder}/${name}`] ?? "svg";
  return `/images/${folder}/${name}.${ext}`;
}
