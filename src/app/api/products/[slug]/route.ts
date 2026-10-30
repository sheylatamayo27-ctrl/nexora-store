import type { NextRequest } from "next/server";
import { getProductBySlug, type ProductResponse } from "@/server";
import { handle, json, notFound } from "@/app/api/_lib";

/** GET /api/products/[slug] → el producto, o 404. */
export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  return handle(async () => {
    const product = await getProductBySlug(params.slug);
    if (!product) return notFound(`No existe el producto "${params.slug}".`);
    return json<ProductResponse>(product);
  });
}
