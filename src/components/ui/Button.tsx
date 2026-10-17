import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-800 text-text-inverse hover:bg-brand-900",
  secondary: "bg-surface text-text-primary border border-border-strong hover:bg-surface-subtle",
  accent: "bg-accent-500 text-brand-900 hover:bg-accent-600",
  outline: "border border-border-strong text-text-primary hover:bg-surface-subtle",
  ghost: "text-text-primary hover:bg-surface-subtle",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-label-sm gap-1.5",
  md: "h-11 px-5 text-label gap-2",
  lg: "h-14 px-6 text-label-lg gap-2",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  icon = false,
  fullWidth,
  className,
  children,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
      {icon && <ChevronRight className="h-4 w-4" />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon = false,
  fullWidth,
  className,
  children,
  href,
}: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
    >
      {children}
      {icon && <ChevronRight className="h-4 w-4" />}
    </Link>
  );
}
