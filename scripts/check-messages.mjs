import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse, TYPE } from "@formatjs/icu-messageformat-parser";

const dir = join(process.cwd(), "messages");
const REFERENCE = "es";

const locales = readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.slice(0, -".json".length));

function flatten(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") flatten(value, path, out);
    else out[path] = value;
  }
  return out;
}

function signature(elements, acc = { args: new Set(), tags: new Set() }) {
  for (const el of elements) {
    if (el.type === TYPE.tag) {
      acc.tags.add(el.value);
      signature(el.children, acc);
    } else if ([TYPE.argument, TYPE.number, TYPE.date, TYPE.time].includes(el.type)) {
      acc.args.add(el.value);
    } else if (el.type === TYPE.plural || el.type === TYPE.select) {
      acc.args.add(el.value);
      for (const option of Object.values(el.options)) signature(option.value, acc);
    }
  }
  return acc;
}

const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
const show = (set) => `{${[...set].sort().join(", ")}}`;

const dictionaries = Object.fromEntries(
  locales.map((locale) => [locale, flatten(JSON.parse(readFileSync(join(dir, `${locale}.json`), "utf8")))])
);
const errors = [];

for (const locale of locales) {
  for (const [key, value] of Object.entries(dictionaries[locale])) {
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`${locale}.json → "${key}" está vacío o no es texto.`);
      continue;
    }
    try {
      parse(value);
    } catch (error) {
      errors.push(`${locale}.json → "${key}" no es un mensaje ICU válido (${error.message}).`);
    }
  }
}

const reference = dictionaries[REFERENCE];
for (const locale of locales.filter((l) => l !== REFERENCE)) {
  const dictionary = dictionaries[locale];
  for (const key of Object.keys(reference)) {
    if (!(key in dictionary)) errors.push(`${locale}.json → falta la clave "${key}".`);
  }
  for (const key of Object.keys(dictionary)) {
    if (!(key in reference)) errors.push(`${locale}.json → sobra la clave "${key}" (no existe en ${REFERENCE}.json).`);
  }
  for (const key of Object.keys(reference).filter((k) => k in dictionary)) {
    let a, b;
    try {
      a = signature(parse(reference[key]));
      b = signature(parse(dictionary[key]));
    } catch {
      continue;
    }
    if (!sameSet(a.args, b.args)) {
      errors.push(`"${key}": parámetros distintos — ${REFERENCE} ${show(a.args)} vs ${locale} ${show(b.args)}.`);
    }
    if (!sameSet(a.tags, b.tags)) {
      errors.push(`"${key}": etiquetas distintas — ${REFERENCE} ${show(a.tags)} vs ${locale} ${show(b.tags)}.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`✗ Diccionarios de idioma con ${errors.length} problema(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(
  `✓ Diccionarios OK: ${locales.join(", ")} · ${Object.keys(reference).length} claves cada uno, mismos parámetros.`
);
