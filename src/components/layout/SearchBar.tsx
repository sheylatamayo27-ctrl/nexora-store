"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ChevronDown, X } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { Price } from "@/components/commerce/Price";
import { Button } from "@/components/ui/Button";
import { searchProducts } from "@/lib/search";
import { cn } from "@/lib/utils";

const MAX_SUGGESTIONS = 6;

export function SearchBar({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  /** Se llama tras navegar (p. ej. para cerrar el drawer móvil). */
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchProducts(query, MAX_SUGGESTIONS), [query]);

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
    go(`/buscar?q=${encodeURIComponent(q)}`);
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
        go(`/producto/${results[active].slug}`);
      } else {
        submit();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={wrapRef} className="relative flex-1">
      <div
        className={cn(
          "flex items-center rounded-md border border-border bg-surface-subtle",
          variant === "desktop" ? "pl-4 pr-1" : "px-3.5"
        )}
      >
        <Search className="h-[18px] w-[18px] shrink-0 text-text-muted" />
        <input
          type="text"
          role="combobox"
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
          placeholder={
            variant === "desktop"
              ? "Busca auriculares, laptops, accesorios…"
              : "Busca auriculares, laptops…"
          }
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-body text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
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
              <span className="text-label-sm">Todas las categorías</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
            <Button variant="accent" className="ml-1 shrink-0" onClick={submit}>
              Buscar
            </Button>
          </>
        )}
      </div>

      {showDropdown && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-border bg-surface shadow-elevation-lg"
        >
          {results.length > 0 ? (
            <>
              <ul className="max-h-[22rem] overflow-y-auto py-1">
                {results.map((p, i) => (
                  <li key={p.id} id={`${listId}-${i}`} role="option" aria-selected={active === i}>
                    <Link
                      href={`/producto/${p.slug}`}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(`/producto/${p.slug}`)}
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
                Ver todos los resultados para “{query.trim()}”
              </button>
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-label text-text-primary">Sin resultados para “{query.trim()}”</p>
              <p className="mt-1 text-body-sm text-text-secondary">
                Prueba con otro término o revisa la ortografía.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
