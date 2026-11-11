"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { announce } from "@/lib/announce";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
  min = 1,
  max = 99,
}: {
  value?: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  min?: number;
  max?: number;
}) {
  const t = useTranslations("common");
  const tA11y = useTranslations("a11y");
  const [internal, setInternal] = useState(value ?? 1);
  const qty = value ?? internal;

  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (onChange) onChange(clamped);
    else setInternal(clamped);
    if (clamped !== qty) announce(tA11y("quantityUpdated", { count: clamped }));
  };

  const cell = size === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <div
      role="group"
      aria-label={tA11y("quantity")}
      className="inline-flex items-center overflow-hidden rounded-md border border-border-strong bg-surface"
    >
      <button
        type="button"
        aria-label={t("decrease")}
        onClick={() => set(qty - 1)}
        className={cn(
          "flex items-center justify-center text-text-primary hover:bg-surface-subtle focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/50",
          cell
        )}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className={cn("flex items-center justify-center text-label-lg text-text-primary", cell)}>
        {qty}
      </span>
      <button
        type="button"
        aria-label={t("increase")}
        onClick={() => set(qty + 1)}
        className={cn(
          "flex items-center justify-center text-text-primary hover:bg-surface-subtle focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/50",
          cell
        )}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
