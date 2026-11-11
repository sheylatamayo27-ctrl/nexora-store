"use client";

import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductCardSkeletons } from "@/components/commerce/ProductCardSkeleton";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useSearch } from "@/hooks/useSearch";

const SKELETON_COUNT = 8;

export function SearchResults() {
  const t = useTranslations("search");
  const tCommon = useTranslations("common");
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const { results, isLoading, error, mutate } = useSearch(query);
  const failed = Boolean(error) && !isLoading;

  return (
    <div className="flex flex-col">
      <div className="bg-surface">
        <Container className="flex flex-col gap-5 py-8">
          <Breadcrumb items={[{ label: t("title") }]} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-text-primary sm:text-display-l">
              {query ? t("resultsFor", { query }) : t("title")}
            </h1>
            {query && !failed && (
              <p className="text-body-lg text-text-secondary">
                {isLoading ? (
                  <>
                    <span className="sr-only">{t("searching")}</span>
                    <span aria-hidden className="inline-block h-4 w-44 animate-pulse rounded bg-surface-muted align-middle" />
                  </>
                ) : (
                  t("found", { count: results.length })
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
              <p className="text-h4 text-text-primary">{t("failed")}</p>
              <p className="max-w-md text-body text-text-secondary">{t("failedHint")}</p>
            </div>
            <Button variant="primary" onClick={() => mutate()}>
              {tCommon("retry")}
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
                {query ? t("nothingFor", { query }) : t("typeSomething")}
              </p>
              <p className="max-w-md text-body text-text-secondary">{t("hint")}</p>
            </div>
            <ButtonLink href="/offers" variant="primary">
              {tCommon("viewOffers")}
            </ButtonLink>
          </div>
        )}
      </Container>
    </div>
  );
}
