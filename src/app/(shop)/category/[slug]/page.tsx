import type { Metadata } from "next";
import { CategoryView } from "@/components/category/CategoryView";
import { defaultFilters, toListQuery } from "@/components/category/query";
import { getCategories, getProductFacets, listProducts } from "@/server";

async function resolve(slug: string) {
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (category) {
    return {
      title: category.name,
      description: `Explora nuestra selección de ${category.name.toLowerCase()} con entrega al día siguiente.`,
      initialCategories: [slug],
    };
  }
  if (slug === "offers") {
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

export async function generateStaticParams() {
  const categories = await getCategories();
  return [...categories.map((c) => ({ slug: c.slug })), { slug: "offers" }];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, description } = await resolve(params.slug);
  return { title, description };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { title, description, initialCategories } = await resolve(params.slug);
  // "offers" parte solo de los productos rebajados; el resto, de todo el catálogo.
  const saleOnly = params.slug === "offers";

  // Primera página con los filtros iniciales (la misma consulta que hará el cliente):
  // va en el HTML (SEO) y como fallback de SWR, así no hay parpadeo ni doble carga.
  const [categories, initialData, facets] = await Promise.all([
    getCategories(),
    listProducts(toListQuery(defaultFilters(initialCategories), saleOnly)),
    getProductFacets({ sale: saleOnly }),
  ]);

  return (
    <CategoryView
      title={title}
      description={description}
      categories={categories}
      initialCategories={initialCategories}
      saleOnly={saleOnly}
      facets={facets}
      initialData={initialData}
    />
  );
}
