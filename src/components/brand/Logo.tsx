import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logotipo de Nexora: marca con "N" sobre caja degradada y una chispa amarilla,
 * acompañada del wordmark. Tono claro para fondos oscuros, oscuro para claros.
 */
export function Logo({
  tone = "dark",
  className,
  href = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  href?: string | null;
}) {
  const wordColor = tone === "light" ? "text-text-inverse" : "text-brand-800";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden className="shrink-0">
        <defs>
          <linearGradient id="nexora-mark" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B2A6B" />
            <stop offset="1" stopColor="#1F57D6" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill={tone === "light" ? "#FFFFFF" : "url(#nexora-mark)"} />
        <path
          d="M11 26V11l13 14V12"
          stroke={tone === "light" ? "#0B2A6B" : "#FFFFFF"}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="27.5" cy="8.5" r="3" fill="#FFC220" />
      </svg>
      <span className={cn("text-[1.6rem] font-semibold tracking-tight lowercase leading-none", wordColor)}>
        nexora
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Nexora — inicio">
      {content}
    </Link>
  );
}
