"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
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
  const [internal, setInternal] = useState(value ?? 1);
  const qty = value ?? internal;

  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (onChange) onChange(clamped);
    else setInternal(clamped);
  };

  const cell = size === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-md border border-border-strong bg-surface">
      <button
        type="button"
        aria-label="Disminuir"
        onClick={() => set(qty - 1)}
        className={cn("flex items-center justify-center text-text-primary hover:bg-surface-subtle", cell)}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={cn("flex items-center justify-center text-label-lg text-text-primary", cell)}>
        {qty}
      </span>
      <button
        type="button"
        aria-label="Aumentar"
        onClick={() => set(qty + 1)}
        className={cn("flex items-center justify-center text-text-primary hover:bg-surface-subtle", cell)}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
