import Link from "next/link";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { AssetImage } from "@/components/media/AssetImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/categories";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <Header />
      <main className="flex-1">
        <Container className="flex flex-col items-center gap-5 py-16 text-center sm:py-24">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[6rem] font-bold leading-none text-brand-800 sm:text-[10rem]">4</span>
            <span className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-brand-800 to-brand-500 sm:h-40 sm:w-40">
              <AssetImage folder="products" name="headphones" alt="" sizes="160px" />
            </span>
            <span className="text-[6rem] font-bold leading-none text-brand-800 sm:text-[10rem]">4</span>
          </div>

          <h1 className="text-h2 text-text-primary sm:text-display-l">¡Ups! Esta página se perdió</h1>
          <p className="max-w-md text-body-lg text-text-secondary">
            La página que buscas no existe o fue movida. Intenta buscar un producto o vuelve al inicio.
          </p>

          <div className="flex w-full max-w-lg items-center gap-2 rounded-lg border border-border-strong bg-surface p-1.5 pl-5">
            <Search className="h-5 w-5 text-text-muted" />
            <input
              placeholder="Busca productos…"
              className="h-10 flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <Button variant="accent">Buscar</Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <ButtonLink href="/" variant="primary" size="lg">
              Ir al inicio
            </ButtonLink>
            <ButtonLink href="/categoria/auriculares" variant="outline" size="lg">
              Explorar categorías
            </ButtonLink>
          </div>

          <div className="flex flex-col items-center gap-3 pt-6">
            <span className="text-label-xs uppercase tracking-widest text-text-muted">
              Categorías populares
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="rounded-md border border-border-strong bg-surface px-4 py-2 text-label text-text-primary transition-colors hover:border-brand-500"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
