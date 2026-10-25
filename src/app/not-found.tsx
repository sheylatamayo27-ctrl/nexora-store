import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Container } from "@/components/ui/Container";
import { AssetImage } from "@/components/media/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { NotFoundSearch } from "@/components/search/NotFoundSearch";
import { categories } from "@/data/categories";

// Móvil/tablet (M10/T10): sin buscador bajo el header, "4" grandes pegados a un
// círculo con anillo azul, botones apilados en móvil y "Inicio" activo abajo.
// Las clases sin prefijo max-* son las del escritorio, que no cambia.
const four =
  "text-[6rem] font-bold leading-none text-brand-800 sm:text-[10rem] max-sm:text-[7rem] sm:max-lg:text-[11rem]";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <Header mobileSearch={false} />
      <main className="flex-1">
        <Container className="flex flex-col items-center gap-5 py-16 text-center sm:py-24 max-sm:pb-12 max-sm:pt-10 sm:max-lg:pb-[4.5rem] sm:max-lg:pt-[4.5rem]">
          <div className="flex items-center gap-3 sm:gap-4 max-lg:mb-2 max-sm:gap-1.5 sm:max-lg:gap-2">
            <span className={four}>4</span>
            <span className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-brand-800 to-brand-500 sm:h-40 sm:w-40 max-lg:shrink-0 max-lg:border-brand-500 max-lg:bg-surface-muted max-lg:bg-none max-sm:h-[6.5rem] max-sm:w-[6.5rem] max-sm:border-[12px] sm:max-lg:h-44 sm:max-lg:w-44 sm:max-lg:border-[14px]">
              <AssetImage folder="products" name="headphones" alt="" sizes="160px" className="max-lg:scale-[1.2]" />
            </span>
            <span className={four}>4</span>
          </div>

          <h1 className="text-h2 text-text-primary sm:text-display-l max-sm:text-[2.125rem] max-sm:leading-[2.625rem] sm:max-lg:text-[3rem] sm:max-lg:leading-[3.5rem]">
            ¡Ups! Esta página se perdió
          </h1>
          <p className="max-w-md text-body-lg text-text-secondary max-lg:mb-1 max-lg:[text-wrap:balance] max-sm:text-[1.0625rem] max-sm:leading-[1.625rem] max-[389px]:text-body-lg sm:max-lg:max-w-xl sm:max-lg:text-[1.125rem] sm:max-lg:leading-7">
            La página que buscas no existe o fue movida. Intenta buscar un producto o vuelve al inicio.
          </p>

          <NotFoundSearch />

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-lg:pt-0 max-sm:w-full max-sm:flex-col max-sm:items-stretch">
            <ButtonLink href="/" variant="primary" size="lg" className="max-lg:h-12">
              Ir al inicio
              <ChevronRight className="h-4 w-4 lg:hidden" />
            </ButtonLink>
            <ButtonLink
              href="/categoria/auriculares"
              variant="outline"
              size="lg"
              className="max-lg:h-12 max-lg:bg-surface"
            >
              Explorar categorías
            </ButtonLink>
          </div>

          <div className="flex flex-col items-center gap-3 pt-6 max-lg:w-full max-lg:gap-3.5 max-sm:pt-5">
            <span className="text-label-xs uppercase tracking-widest text-text-muted max-lg:text-[0.6875rem] max-lg:leading-4">
              Categorías populares
            </span>
            {/* Móvil: rejilla de 3 columnas a la medida de su chip más ancho (2 filas). */}
            <div className="flex flex-wrap justify-center gap-2 max-sm:grid max-sm:grid-cols-[repeat(3,auto)] max-sm:justify-center max-[339px]:gap-1.5">
              {categories.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="rounded-md border border-border-strong bg-surface px-4 py-2 text-label text-text-primary transition-colors hover:border-brand-500 max-lg:whitespace-nowrap max-lg:py-2.5 max-sm:px-3 max-sm:text-[0.9375rem] max-[374px]:px-2.5 max-[374px]:text-label max-[339px]:px-2 max-[339px]:text-label-sm sm:max-lg:text-[0.9375rem]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <BottomNav active="Inicio" />
    </div>
  );
}
