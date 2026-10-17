import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/blog/BlogCard";
import { AssetImage } from "@/components/media/AssetImage";
import { Reveal } from "@/lib/motion";
import { formatDate } from "@/lib/format";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import type { BlogBlock } from "@/data/types";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return { title: post.title, description: post.excerpt };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-h3 text-text-primary">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="border-l-4 border-brand-500 bg-surface-subtle px-5 py-4">
          <p className="text-h4 text-text-primary">“{block.text}”</p>
          {block.cite && <cite className="mt-2 block text-label-sm not-italic text-text-secondary">— {block.cite}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-body-lg text-text-secondary">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="text-body-lg leading-relaxed text-text-secondary">{block.text}</p>;
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <div className="bg-surface-subtle">
      <article>
        {/* Cabecera */}
        <div className="bg-surface">
          <Container className="flex flex-col gap-5 py-8">
            <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-label-sm text-brand-800">
                {post.category}
              </span>
              <h1 className="text-h2 text-text-primary sm:text-display-l">{post.title}</h1>
              <p className="text-body-lg text-text-secondary">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-3 text-body-sm text-text-muted">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-label-sm text-brand-800">
                  {post.author.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="flex flex-col">
                  <span className="text-label-sm text-text-primary">{post.author.name}</span>
                  <span className="text-body-sm text-text-muted">{post.author.role}</span>
                </div>
                <span className="h-4 w-px bg-border" />
                <span>{formatDate(post.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min de lectura
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* Portada */}
        <Container className="py-8">
          <Reveal>
            <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-surface-subtle">
              <AssetImage
                folder={post.coverFolder}
                name={post.cover}
                alt={post.title}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </Reveal>
        </Container>

        {/* Contenido */}
        <Container className="pb-12">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <Link
              href="/blog"
              className="mt-4 flex w-fit items-center gap-1.5 text-label text-brand-700 transition-colors hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" /> Volver al blog
            </Link>
          </div>
        </Container>
      </article>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-12">
          <Container className="flex flex-col gap-8">
            <h2 className="text-h3 text-text-primary sm:text-h2">Artículos relacionados</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} className="h-full" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
