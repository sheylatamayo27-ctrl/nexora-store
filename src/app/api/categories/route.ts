import { getCategories, type CategoriesResponse } from "@/server";
import { handle, json } from "@/app/api/_lib";

/** GET /api/categories */
export async function GET() {
  return handle(async () => json<CategoriesResponse>(await getCategories()));
}
