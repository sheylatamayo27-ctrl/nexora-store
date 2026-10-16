"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex gap-6 overflow-x-auto border-b border-border no-scrollbar sm:gap-8">
        {items.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 py-3.5 text-label-lg transition-colors",
              active === tab.id
                ? "border-brand-800 text-brand-800"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{items.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
