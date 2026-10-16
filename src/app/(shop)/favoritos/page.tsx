import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { AccountShell } from "@/components/account/AccountShell";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Favoritos" };

const wishlist = products.slice(0, 8);

export default function WishlistPage() {
  return (
    <AccountShell active="wishlist" crumb="Favoritos">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-h2 text-text-primary">Mis favoritos</h1>
            <p className="text-body text-text-secondary">
              {wishlist.length} artículos guardados · Los precios se actualizan en tiempo real
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Compartir lista</Button>
            <Button variant="primary">Agregar todo al carrito</Button>
          </div>
        </div>

        {/* Alerta de bajada de precio */}
        <div className="flex gap-3 rounded-lg bg-success-100 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success-500" />
          <div className="flex flex-col">
            <span className="text-label text-text-primary">
              ¡Buenas noticias! 2 artículos de tu lista bajaron de precio
            </span>
            <span className="text-body-sm text-text-secondary">
              Los Auriculares Aura ANC y los Pods Lite tienen hasta 24% de descuento. Los precios
              pueden cambiar en cualquier momento.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} showColors={false} />
          ))}
        </div>

        <p className="text-body-sm text-text-muted">
          Los artículos permanecen en tu lista durante 90 días. Te avisaremos cuando bajen de precio
          o queden pocas existencias.
        </p>
      </div>
    </AccountShell>
  );
}
