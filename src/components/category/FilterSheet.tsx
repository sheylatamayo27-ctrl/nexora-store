"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { OptionChip } from "@/components/ui/Chip";
import { RangeSlider } from "@/components/ui/RangeSlider";

/** Filtros que edita la hoja (los demás —valoración, color— son del sidebar de escritorio). */
export type SheetFilters = {
  cats: string[];
  price: [number, number];
  brands: string[];
  avail: Record<string, boolean>;
};

/**
 * Hoja de filtros (bottom sheet) para móvil/tablet — M02b.
 * Comparte el MISMO estado/lógica que el sidebar del escritorio: recibe los
 * valores actuales y aplica los cambios con `onApply`. Mientras está abierta
 * trabaja sobre un BORRADOR; "Mostrar X" aplica, "Restablecer" limpia el
 * borrador y cerrar sin aplicar descarta los cambios.
 * Solo se usa <lg (el escritorio no la monta).
 */
export function FilterSheet({
  open,
  onClose,
  categories,
  brands,
  priceMin,
  priceMax,
  priceStep,
  priceFormat,
  availabilityOptions,
  initial,
  resultCount,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  categories: { slug: string; name: string; count: number }[];
  brands: [string, number][];
  priceMin: number;
  priceMax: number;
  priceStep: number;
  priceFormat: (n: number) => string;
  availabilityOptions: { id: string; label: string }[];
  initial: SheetFilters;
  resultCount: (draft: SheetFilters) => number;
  onApply: (next: SheetFilters) => void;
}) {
  const [draft, setDraft] = useState<SheetFilters>(initial);
  const panelRef = useRef<HTMLDivElement>(null);

  // Al abrir, el borrador parte de los filtros aplicados actualmente.
  useEffect(() => {
    if (open) setDraft(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Bloquea el scroll del body mientras la hoja está abierta.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cerrar con Esc + trampa de foco (Tab se queda dentro de la hoja).
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  // Enfoca la hoja al abrir (para que la trampa de foco y Esc funcionen).
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const toggleCat = (slug: string) =>
    setDraft((d) => ({
      ...d,
      cats: d.cats.includes(slug) ? d.cats.filter((x) => x !== slug) : [...d.cats, slug],
    }));
  const toggleBrand = (b: string) =>
    setDraft((d) => ({
      ...d,
      brands: d.brands.includes(b) ? d.brands.filter((x) => x !== b) : [...d.brands, b],
    }));

  const reset = () =>
    setDraft({
      cats: [],
      price: [priceMin, priceMax],
      brands: [],
      avail: { inStock: true, onSale: false, freeDelivery: false },
    });

  const count = resultCount(draft);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-brand-900/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filtros"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85vh] flex-col rounded-t-3xl bg-surface outline-none md:max-w-lg lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
          >
            {/* Tirador */}
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-10 rounded-full bg-border-strong" aria-hidden />
            </div>

            {/* Encabezado */}
            <div className="flex items-center justify-between border-b border-border px-5 pb-4 pt-3">
              <h2 className="text-h4 text-text-primary">Filtros</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar filtros"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-subtle text-text-secondary transition-colors hover:bg-surface-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenido con scroll */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex flex-col gap-6">
                <section className="flex flex-col gap-3">
                  <h3 className="text-label-lg text-text-primary">Categoría</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {categories.map((c) => (
                      <OptionChip
                        key={c.slug}
                        selected={draft.cats.includes(c.slug)}
                        onClick={() => toggleCat(c.slug)}
                      >
                        {c.name}
                      </OptionChip>
                    ))}
                  </div>
                </section>

                <div className="h-px bg-border" />
                <section className="flex flex-col gap-3">
                  <h3 className="text-label-lg text-text-primary">Rango de precio</h3>
                  <RangeSlider
                    min={priceMin}
                    max={priceMax}
                    step={priceStep}
                    value={draft.price}
                    onChange={(price) => setDraft((d) => ({ ...d, price }))}
                    format={priceFormat}
                  />
                </section>

                <div className="h-px bg-border" />
                <section className="flex flex-col gap-3">
                  <h3 className="text-label-lg text-text-primary">Marca</h3>
                  {brands.map(([brand, n]) => (
                    <Checkbox
                      key={brand}
                      checked={draft.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      label={brand}
                      count={`(${n})`}
                    />
                  ))}
                </section>

                <div className="h-px bg-border" />
                <section className="flex flex-col gap-3">
                  <h3 className="text-label-lg text-text-primary">Disponibilidad</h3>
                  {availabilityOptions.map((o) => (
                    <Checkbox
                      key={o.id}
                      checked={!!draft.avail[o.id]}
                      onChange={() =>
                        setDraft((d) => ({ ...d, avail: { ...d.avail, [o.id]: !d.avail[o.id] } }))
                      }
                      label={o.label}
                    />
                  ))}
                </section>
              </div>
            </div>

            {/* Pie fijo */}
            <div className="flex gap-3 border-t border-border p-4">
              <Button variant="outline" fullWidth onClick={reset}>
                Restablecer
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  onApply(draft);
                  onClose();
                }}
              >
                Mostrar {count} resultados
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
