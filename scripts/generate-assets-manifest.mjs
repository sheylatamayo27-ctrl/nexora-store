/**
 * Genera `src/data/assets.generated.ts` revisando /public/images.
 *
 * Para cada imagen (carpeta/nombre) guarda la mejor extensión disponible:
 * fotos reales (jpg, png, webp) tienen prioridad sobre el placeholder .svg.
 * Se ejecuta automáticamente antes de `npm run dev` y `npm run build`.
 */
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const imagesDir = join(root, "public", "images");
const outFile = join(root, "src", "data", "assets.generated.ts");

const folders = ["products", "banners", "misc"];
// Orden de prioridad: la foto real gana al placeholder.
const priority = ["jpg", "jpeg", "png", "webp"];

const manifest = {};

for (const folder of folders) {
  const dir = join(imagesDir, folder);
  if (!existsSync(dir)) continue;

  const byName = new Map();
  for (const file of readdirSync(dir)) {
    const ext = extname(file).slice(1).toLowerCase();
    if (!priority.includes(ext)) continue;
    const name = basename(file, extname(file));
    const current = byName.get(name);
    if (!current || priority.indexOf(ext) < priority.indexOf(current)) {
      byName.set(name, ext);
    }
  }
  for (const [name, ext] of [...byName].sort(([a], [b]) => a.localeCompare(b))) {
    manifest[`${folder}/${name}`] = ext;
  }
}

const body = Object.entries(manifest)
  .map(([key, ext]) => `  "${key}": "${ext}",`)
  .join("\n");

writeFileSync(
  outFile,
  `// Archivo generado por scripts/generate-assets-manifest.mjs — no editar a mano.
// Lista las fotos reales presentes en /public/images (el resto usa el placeholder .svg).
export const REAL_IMAGES: Record<string, "jpg" | "jpeg" | "png" | "webp"> = {
${body}
};
`,
);

console.log(`[assets] ${Object.keys(manifest).length} foto(s) real(es) detectada(s).`);
