import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  /** Si se pasa, el ícono se vuelve un botón (p. ej. mostrar/ocultar contraseña). */
  onIconClick?: () => void;
  iconLabel?: string;
  helper?: React.ReactNode;
  error?: boolean;
}

/** La ref llega al <input>: `register()` de react-hook-form la usa para leerlo y enfocarlo. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, icon: Icon, onIconClick, iconLabel, helper, error, className, ...props },
  ref
) {
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
          ref={ref}
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
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  /** Primera opción, vacía y no elegible ("Selecciona…"); se ve atenuada mientras esté seleccionada. */
  placeholder?: string;
  helper?: React.ReactNode;
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, helper, error, className, ...props },
  ref
) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      {label && <span className="text-label text-text-primary">{label}</span>}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-12 w-full appearance-none rounded-md border bg-surface px-4 pr-10 text-body text-text-primary focus:outline-none focus:ring-4",
            error
              ? "border-sale-500 focus:ring-sale-500/15"
              : "border-border-strong focus:border-brand-500 focus:ring-brand-500/15",
            placeholder && "has-[option[value='']:checked]:text-text-muted [&>option]:text-text-primary"
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
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
      {helper && (
        <span className={cn("text-body-sm", error ? "text-sale-500" : "text-text-secondary")}>
          {helper}
        </span>
      )}
    </label>
  );
});
