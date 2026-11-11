"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function useCarousel(initialCount: number, align: ScrollLogicalPosition = "start") {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const perViewRef = useRef(1);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const items = Array.from(scroller.children) as HTMLElement[];
    if (!items.length) return;

    const measure = () => {
      const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
      const perView = Math.max(
        1,
        Math.round((scroller.clientWidth + gap) / (items[0].offsetWidth + gap))
      );
      perViewRef.current = perView;
      setCount(Math.ceil(items.length / perView));
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scroller);

    const visible = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = items.indexOf(entry.target as HTMLElement);
          if (entry.intersectionRatio >= 0.6) visible.add(index);
          else visible.delete(index);
        }
        if (!visible.size) return;
        const last = items.length - 1;
        setActive(
          visible.has(last)
            ? Math.ceil(items.length / perViewRef.current) - 1
            : Math.floor(Math.min(...visible) / perViewRef.current)
        );
      },
      { root: scroller, threshold: 0.6 }
    );
    items.forEach((item) => observer.observe(item));

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const item = scrollerRef.current?.children[index * perViewRef.current] as HTMLElement | undefined;
      if (!item) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      item.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: align });
    },
    [align]
  );

  return { scrollerRef, active: Math.min(active, count - 1), count, goTo };
}

export function CarouselDots({
  count,
  active,
  onSelect,
  label,
  className,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  label: (index: number, count: number) => string;
  className?: string;
}) {
  if (count <= 1) return null;

  return (
    <div className={cn("flex justify-center", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={label(i, count)}
          aria-current={i === active ? "true" : undefined}
          className="flex h-11 min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/50 rounded-full"
        >
          <span
            className={cn(
              "block h-2 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
              i === active ? "w-6 bg-brand-800" : "w-2 bg-border-strong"
            )}
          />
        </button>
      ))}
    </div>
  );
}
