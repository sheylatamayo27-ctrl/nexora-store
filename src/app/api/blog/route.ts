import { getBlogPosts, getFeaturedPost, type BlogListResponse } from "@/server";
import { handle, json } from "@/app/api/_lib";

/** GET /api/blog → todos los artículos y el destacado. */
export async function GET() {
  return handle(async () => {
    const [items, featured] = await Promise.all([getBlogPosts(), getFeaturedPost()]);
    return json<BlogListResponse>({ items, featured });
  });
}
