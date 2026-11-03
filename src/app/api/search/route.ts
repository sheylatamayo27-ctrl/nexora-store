import type { NextRequest } from "next/server";
import { searchProducts, type SearchResponse } from "@/server";
import { BadRequestError, handle, intParam, json, localeParam, textParam } from "@/app/api/_lib";

const MAX_LIMIT = 50;

/** GET /api/search?q=&limit=&locale= → productos ordenados por relevancia (limit: 1–50, def. 50). */
export async function GET(request: NextRequest) {
  return handle(async () => {
    const params = request.nextUrl.searchParams;
    const q = textParam(params, "q");
    if (!q) throw new BadRequestError('Falta el parámetro "q".');
    const limit = intParam(params, "limit", { fallback: MAX_LIMIT, min: 1, max: MAX_LIMIT });
    return json<SearchResponse>(await searchProducts(q, localeParam(params), limit));
  });
}
