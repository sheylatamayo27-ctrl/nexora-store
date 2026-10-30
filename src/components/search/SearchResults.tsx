"use client";

import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductCardSkeletons } from "@/components/commerce/ProductCardSkeleton";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useSearch } from "@/hooks/useSearch";

/** Tarjetas de relleno mientras llega la respuesta (dos filas en escritorio). */
const SKELETON_COUNT = 8;

export function SearchResults() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const { results, isLoading, error, mutate } = useSearch(query);
  const failed = Boolean(error) && !isLoading;

  return (
    <div className="flex flex-col">
      <div className="bg-surface">
        <Container className="flex flex-col gap-5 py-8">
          <Breadcrumb items={[{ label: "Búsqueda" }]} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-text-primary sm:text-display-l">
              {query ? <>Resultados para “{query}”</> : "Búsqueda"}
            </h1>
            {query && !failed && (
              <p className="text-body-lg text-text-secondary">
                {isLoading ? (
                  <>
                    <span className="sr-only">Buscando…</span>
                    <span aria-hidden className="inline-block h-4 w-44 animate-pulse rounded bg-surface-muted align-middle" />
                  </>
                ) : (
                  <>
                    {results.length} producto{results.length !== 1 && "s"} encontrado
                    {results.length !== 1 && "s"}
                  </>
                )}
              </p>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-10">
        {query && isLoading ? (
          <div aria-busy className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <ProductCardSkeletons count={SKELETON_COUNT} />
          </div>
        ) : query && failed ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-subtle">
              <SearchX className="h-7 w-7 text-text-muted" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-h4 text-text-primary">No pudimos completar la búsqueda</p>
              <p className="max-w-md text-body text-text-secondary">
                Revisa tu conexión e inténtalo de nuevo en unos segundos.
              </p>
            </div>
            <Button variant="primary" onClick={() => mutate()}>
              Reintentar
            </Button>
          </div>
        ) : query && results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-subtle">
              <SearchX className="h-7 w-7 text-text-muted" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-h4 text-text-primary">
                {query ? <>No encontramos nada para “{query}”</> : "Escribe algo para buscar"}
              </p>
              <p className="max-w-md text-body text-text-secondary">
                Revisa la ortografía o prueba con términos más generales, como “auriculares” o
                “laptop”.
              </p>
            </div>
            <ButtonLink href="/offers" variant="primary">
              Ver ofertas
            </ButtonLink>
          </div>
        )}
      </Container>
    </div>
  );
}
