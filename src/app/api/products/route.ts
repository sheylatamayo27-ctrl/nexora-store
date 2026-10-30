import type { NextRequest } from "next/server";
import { PRODUCT_LIST_DEFAULTS, PRODUCT_SORTS, listProducts, type ProductListResponse } from "@/server";
import {
  enumParam,
  flagParam,
  handle,
  intParam,
  json,
  listParam,
  numberParam,
  textParam,
} from "@/app/api/_lib";

/**
 * GET /api/products?page=&pageSize=&q=&category=&brand=&color=&minPrice=&maxPrice=&minRating=
 *   &sale=true&deal=true&featured=true&sort=
 * page (1), pageSize (12, máx. 50); category, brand y color admiten varios valores separados
 * por comas; sort: relevance | popular | price-asc | price-desc | rating.
 */
export async function GET(request: NextRequest) {
  return handle(async () => {
    const params = request.nextUrl.searchParams;
    const { page, pageSize, maxPageSize } = PRODUCT_LIST_DEFAULTS;
    const result = await listProducts({
      page: intParam(params, "page", { fallback: page, min: 1, max: Number.MAX_SAFE_INTEGER }),
      pageSize: intParam(params, "pageSize", { fallback: pageSize, min: 1, max: maxPageSize }),
      category: listParam(params, "category"),
      q: textParam(params, "q"),
      brand: listParam(params, "brand"),
      color: listParam(params, "color"),
      minPrice: numberParam(params, "minPrice", { min: 0, max: Number.MAX_SAFE_INTEGER }),
      maxPrice: numberParam(params, "maxPrice", { min: 0, max: Number.MAX_SAFE_INTEGER }),
      minRating: numberParam(params, "minRating", { min: 0, max: 5 }),
      sale: flagParam(params, "sale"),
      deal: flagParam(params, "deal"),
      featured: flagParam(params, "featured"),
      sort: enumParam(params, "sort", PRODUCT_SORTS, "relevance"),
    });
    return json<ProductListResponse>(result);
  });
}
