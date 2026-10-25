import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  /** Si se pasa, el ícono se vuelve un botón (p. ej. mostrar/ocultar contraseña). */
  onIconClick?: () => void;
  iconLabel?: string;
  helper?: string;
  error?: boolean;
}

export function Input({ label, icon: Icon, onIconClick, iconLabel, helper, error, className, ...props }: InputProps) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      {label && <span className="text-label text-text-primary">{label}</span>}
      <span
        className={cn(
          "flex h-12 items-center gap-3 rounded-md border bg-surface px-4 transition-colors focus-within:ring-4",
          error
            ? "border-sale-500 focus-within:ring-sale-500/15"
            : "border-border-strong focus-within:border-brand-500 focus-within:ring-brand-500/15"
        )}
      >
        {Icon &&
          (onIconClick ? (
            // <span role="button"> en vez de <button>: un <button> dentro del
            // <label> sería su control asociado y el clic se dispararía dos veces.
            <span
              role="button"
              tabIndex={0}
              aria-label={iconLabel}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                onIconClick();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onIconClick();
                }
              }}
              className="flex shrink-0 cursor-pointer items-center text-text-muted transition-colors hover:text-text-secondary focus-visible:text-brand-700 focus-visible:outline-none"
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
          ) : (
            <Icon className="h-[18px] w-[18px] text-text-muted" />
          ))}
        <input
          className="h-full w-full min-w-0 flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
          {...props}
        />
      </span>
      {helper && (
        <span className={cn("text-body-sm", error ? "text-sale-500" : "text-text-secondary")}>
          {helper}
        </span>
      )}
    </label>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      {label && <span className="text-label text-text-primary">{label}</span>}
      <div className="relative">
        <select
          className="h-12 w-full appearance-none rounded-md border border-border-strong bg-surface px-4 pr-10 text-body text-text-primary focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
}
