import type { Metadata } from "next";
import { CategoryView } from "@/components/category/CategoryView";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

function resolve(slug: string) {
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return {
      title: category.name,
      description: `Explora nuestra selección de ${category.name.toLowerCase()} con entrega al día siguiente.`,
      initialCategories: [slug],
    };
  }
  if (slug === "ofertas") {
    return {
      title: "Ofertas",
      description: "Los mejores descuentos en tecnología, por tiempo limitado.",
      initialCategories: [],
    };
  }
  return {
    title: "Electrónica",
    description:
      "Explora 248 productos en audio, computación y dispositivos inteligentes — con entrega al día siguiente.",
    initialCategories: [],
  };
}

export function generateStaticParams() {
  return [...categories.map((c) => ({ slug: c.slug })), { slug: "ofertas" }];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, description } = resolve(params.slug);
  return { title, description };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { title, description, initialCategories } = resolve(params.slug);
  const pool = params.slug === "ofertas" ? products.filter((p) => p.compareAt) : products;

  return (
    <CategoryView
      title={title}
      description={description}
      products={pool}
      initialCategories={initialCategories}
    />
  );
}
