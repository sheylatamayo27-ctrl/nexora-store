"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { AssetImage } from "@/components/media/AssetImage";
import { Price } from "@/components/commerce/Price";
import { Button } from "@/components/ui/Button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearch } from "@/hooks/useSearch";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const MAX_SUGGESTIONS = 6;
const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

export function SearchBar({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const t = useTranslations("search");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  const term = query.trim();
  const debouncedTerm = useDebouncedValue(term, DEBOUNCE_MS);
  const { results, isLoading, error, mutate } = useSearch(
    debouncedTerm.length >= MIN_QUERY_LENGTH ? debouncedTerm : "",
    MAX_SUGGESTIONS
  );
  const pending = debouncedTerm !== term || isLoading;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setActive(-1);
    router.push(href);
    onNavigate?.();
  };

  const submit = () => {
    const q = query.trim();
    if (q.length < 1) return;
    go(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        e.preventDefault();
        go(`/product/${results[active].slug}`);
      } else {
        submit();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const showDropdown = open && term.length >= MIN_QUERY_LENGTH;

  return (
    <div ref={wrapRef} role="search" className="relative flex-1">
      <div
        className={cn(
          "flex items-center rounded-md border border-border bg-surface-subtle",
          variant === "desktop" ? "pl-4 pr-1" : "px-3.5"
        )}
      >
        <Search className="h-[18px] w-[18px] shrink-0 text-text-muted" aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-label={t("label")}
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={variant === "desktop" ? t("placeholder") : t("placeholderShort")}
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-body text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label={t("clear")}
            onClick={() => {
              setQuery("");
              setActive(-1);
            }}
            className="shrink-0 p-1 text-text-muted hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {variant === "desktop" && (
          <>
            <div className="flex shrink-0 items-center gap-1 border-l border-border px-3 text-text-secondary">
              <span className="text-label-sm">{t("allCategories")}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
            <Button variant="accent" className="ml-1 shrink-0" onClick={submit}>
              {t("submit")}
            </Button>
          </>
        )}
      </div>

      {showDropdown && (
        <div
          id={listId}
          role="listbox"
          aria-label={t("suggestions")}
          aria-busy={pending}
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-border bg-surface shadow-elevation-lg"
        >
          {error && !pending ? (
            <div className="px-4 py-8 text-center">
              <p className="text-label text-text-primary">{t("loadError")}</p>
              <p className="mt-1 text-body-sm text-text-secondary">{t("checkConnection")}</p>
              <button
                type="button"
                onClick={() => mutate()}
                className="mt-3 text-label-sm text-brand-700 hover:text-brand-800"
              >
                {tCommon("retry")}
              </button>
            </div>
          ) : results.length > 0 && !error ? (
            <>
              <ul className={cn("max-h-[22rem] overflow-y-auto py-1 transition-opacity", pending && "opacity-60")}>
                {results.map((p, i) => (
                  <li key={p.id} id={`${listId}-${i}`} role="option" aria-selected={active === i}>
                    <Link
                      href={`/product/${p.slug}`}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(`/product/${p.slug}`)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 transition-colors",
                        active === i ? "bg-surface-subtle" : "hover:bg-surface-subtle"
                      )}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                        <AssetImage folder="products" name={p.image} alt={p.name} sizes="48px" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-label text-text-primary">{p.name}</span>
                        <span className="text-body-sm text-text-muted">{p.vendor}</span>
                      </div>
                      <Price price={p.price} size="sm" />
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={submit}
                className="flex w-full items-center justify-center gap-1.5 border-t border-border px-3 py-3 text-label-sm text-brand-700 transition-colors hover:bg-surface-subtle"
              >
                {t("viewAllResults", { query: query.trim() })}
              </button>
            </>
          ) : pending ? (
            <>
              <span className="sr-only">{t("searching")}</span>
              <ul aria-hidden className="py-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <li key={i} className="flex items-center gap-3 px-3 py-2.5">
                    <div className="h-12 w-12 shrink-0 animate-pulse rounded-md bg-surface-subtle" />
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="h-3.5 w-3/4 animate-pulse rounded bg-surface-muted" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-surface-muted" />
                    </div>
                    <div className="h-4 w-14 animate-pulse rounded bg-surface-muted" />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-label text-text-primary">{t("noResultsFor", { query: query.trim() })}</p>
              <p className="mt-1 text-body-sm text-text-secondary">{t("tryAnother")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
