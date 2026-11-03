import type { NextRequest } from "next/server";
import { getCategories, type CategoriesResponse } from "@/server";
import { handle, json, localeParam } from "@/app/api/_lib";

/** GET /api/categories?locale= */
export async function GET(request: NextRequest) {
  return handle(async () => json<CategoriesResponse>(await getCategories(localeParam(request.nextUrl.searchParams))));
}
