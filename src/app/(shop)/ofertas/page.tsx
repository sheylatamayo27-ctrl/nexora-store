import type { Metadata } from "next";
import { OffersView } from "@/components/offers/OffersView";
import { saleProducts, dealProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Los mejores descuentos en tecnología, por tiempo limitado, con entrega al día siguiente.",
};

export default function OffersPage() {
  return <OffersView products={saleProducts} flashDeals={dealProducts} />;
}
