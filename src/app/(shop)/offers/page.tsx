import type { Metadata } from "next";
import { OffersView } from "@/components/offers/OffersView";
import { getDealProducts, getSaleProducts } from "@/server";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Los mejores descuentos en tecnología, por tiempo limitado, con entrega al día siguiente.",
};

export default async function OffersPage() {
  const [saleProducts, dealProducts] = await Promise.all([getSaleProducts(), getDealProducts()]);
  return <OffersView products={saleProducts} flashDeals={dealProducts} />;
}
