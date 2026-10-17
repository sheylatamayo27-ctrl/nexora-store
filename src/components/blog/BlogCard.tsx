import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/data/types";

export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-elevation-md",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-surface-subtle">
        <AssetImage
          folder={post.coverFolder}
          name={post.cover}
          alt={post.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-3 py-1 text-label-sm text-brand-800 shadow-elevation-sm backdrop-blur">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-body-sm text-text-muted">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="line-clamp-2 text-h4 text-text-primary transition-colors hover:text-brand-700"
        >
          {post.title}
        </Link>
        <p className="line-clamp-2 text-body text-text-secondary">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-label-sm text-text-secondary">{post.author.name}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-label-sm text-brand-700 transition-colors hover:text-brand-800"
          >
            Leer <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
