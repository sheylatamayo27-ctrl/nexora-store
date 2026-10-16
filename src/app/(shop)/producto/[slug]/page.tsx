import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { products, getProductBySlug } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.shortDescription ?? `${product.name} — disponible en Nexora.`,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.categorySlug === product.categorySlug ? -1 : 0))
    .slice(0, 5);

  return <ProductView product={product} related={related} />;
}
