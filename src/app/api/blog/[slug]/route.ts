import type { NextRequest } from "next/server";
import { getPostBySlug, getRelatedPosts, type BlogPostResponse } from "@/server";
import { handle, json, notFound } from "@/app/api/_lib";

/** GET /api/blog/[slug] → el artículo y sus relacionados, o 404. */
export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  return handle(async () => {
    const post = await getPostBySlug(params.slug);
    if (!post) return notFound(`No existe el artículo "${params.slug}".`);
    return json<BlogPostResponse>({ post, related: await getRelatedPosts(params.slug) });
  });
}
