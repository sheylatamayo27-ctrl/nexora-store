import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CategoryView } from "@/components/category/CategoryView";
import { defaultFilters, toListQuery } from "@/components/category/query";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getCategories, getProductFacets, listProducts } from "@/server";

type Params = { locale: Locale; slug: string };

async function resolve({ locale, slug }: Params) {
  const [categories, t] = await Promise.all([
    getCategories(locale),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return {
      title: category.name,
      description: t("categoryDescription", { name: category.name.toLocaleLowerCase(locale) }),
      initialCategories: [slug],
    };
  }
  if (slug === "offers") {
    return {
      title: t("offers"),
      description: t("offersCategoryDescription"),
      initialCategories: [],
    };
  }
  return {
    title: t("electronics"),
    description: t("electronicsDescription"),
    initialCategories: [],
  };
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
  const categories = await getCategories(locale);
  return [...categories.map((c) => ({ slug: c.slug })), { slug: "offers" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { title, description } = await resolve(params);
  return { title, description, alternates: localeAlternates(`/category/${params.slug}`, params.locale) };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const { title, description, initialCategories } = await resolve(params);
  // "offers" parte solo de los productos rebajados; el resto, de todo el catálogo.
  const saleOnly = slug === "offers";

  // Primera página con los filtros iniciales (la misma consulta que hará el cliente):
  // va en el HTML (SEO) y como fallback de SWR, así no hay parpadeo ni doble carga.
  const [categories, initialData, facets] = await Promise.all([
    getCategories(locale),
    listProducts(toListQuery(defaultFilters(initialCategories), saleOnly), locale),
    getProductFacets({ sale: saleOnly }, locale),
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
