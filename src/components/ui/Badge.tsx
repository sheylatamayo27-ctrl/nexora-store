import { cn } from "@/lib/utils";
import type { BadgeType } from "@/data/types";

const styles: Record<BadgeType, string> = {
  sale: "bg-sale-500 text-text-inverse",
  new: "bg-brand-500 text-text-inverse",
  hot: "bg-accent-500 text-text-primary",
};

export function Badge({
  type,
  children,
  className,
}: {
  type: BadgeType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 text-label-xs uppercase",
        styles[type],
        className
      )}
    >
      {children}
    </span>
  );
}
