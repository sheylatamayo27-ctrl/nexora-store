import { NextResponse } from "next/server";
import { routing, type Locale } from "@/i18n/routing";
import type { ApiError } from "@/server/api-types";

/*
 * Utilidades de los Route Handlers de /api (el backend simulado).
 * No es una ruta: Next.js solo publica los archivos `route.ts`.
 */

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function notFound(message = "Recurso no encontrado.") {
  return json<ApiError>({ error: message }, 404);
}

export function badRequest(message: string) {
  return json<ApiError>({ error: message }, 400);
}

/** Parámetro inválido: `handle()` lo convierte en un 400. */
export class BadRequestError extends Error {}

interface IntRange {
  fallback: number;
  min: number;
  max: number;
}

/** Entero seguro: vacío o no numérico → `fallback` (nunca NaN); se recorta a [min, max]. */
export function toInt(raw: string | null | undefined, { fallback, min, max }: IntRange): number {
  if (raw == null || raw.trim() === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

export function intParam(params: URLSearchParams, name: string, range: IntRange): number {
  return toInt(params.get(name), range);
}

/** Número opcional: vacío o no numérico → undefined; se recorta a [min, max]. */
export function numberParam(
  params: URLSearchParams,
  name: string,
  { min, max }: Omit<IntRange, "fallback">
): number | undefined {
  const raw = params.get(name);
  if (raw == null || raw.trim() === "") return undefined;
  const n = Number(raw);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(max, Math.max(min, n));
}

/** Lista separada por comas (o parámetro repetido); sin valores → undefined. */
export function listParam(params: URLSearchParams, name: string): string[] | undefined {
  const values = params
    .getAll(name)
    .flatMap((raw) => raw.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
  return values.length ? values : undefined;
}

/** Texto recortado; vacío → undefined. */
export function textParam(params: URLSearchParams, name: string): string | undefined {
  return params.get(name)?.trim() || undefined;
}

/** `true`/`1` o `false`/`0`; ausente → false. Cualquier otro valor es un 400. */
export function flagParam(params: URLSearchParams, name: string): boolean {
  const raw = params.get(name);
  if (raw === null || raw === "" || raw === "false" || raw === "0") return false;
  if (raw === "true" || raw === "1") return true;
  throw new BadRequestError(`El parámetro "${name}" debe ser true o false.`);
}

/** Uno de los valores permitidos; ausente → `fallback`. Cualquier otro valor es un 400. */
export function enumParam<T extends string>(
  params: URLSearchParams,
  name: string,
  allowed: readonly T[],
  fallback: T
): T {
  const raw = params.get(name);
  if (raw === null || raw === "") return fallback;
  const isAllowed = (value: string): value is T => (allowed as readonly string[]).includes(value);
  if (isAllowed(raw)) return raw;
  throw new BadRequestError(`El parámetro "${name}" debe ser uno de: ${allowed.join(", ")}.`);
}

/** Idioma de los textos de la respuesta (`?locale=es|en`); ausente → el idioma por defecto. */
export function localeParam(params: URLSearchParams): Locale {
  return enumParam(params, "locale", routing.locales, routing.defaultLocale);
}

/**
 * Latencia simulada en ms: NEXT_PUBLIC_API_FAKE_LATENCY si está definida;
 * si no, 250 en desarrollo y 0 en producción.
 */
const FAKE_LATENCY = toInt(process.env.NEXT_PUBLIC_API_FAKE_LATENCY, {
  fallback: process.env.NODE_ENV === "development" ? 250 : 0,
  min: 0,
  max: 10_000,
});

export function delay(ms = FAKE_LATENCY): Promise<void> {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

/** Envuelve un handler: aplica la latencia simulada y convierte `BadRequestError` en 400. */
export async function handle(run: () => Promise<Response>): Promise<Response> {
  await delay();
  try {
    return await run();
  } catch (error) {
    if (error instanceof BadRequestError) return badRequest(error.message);
    throw error;
  }
}
