import { useTranslations } from "next-intl";
import type { FieldErrors, FieldValues } from "react-hook-form";
import type { ValidationKey } from "@/lib/schemas/common";

export const FORM_OPTIONS = { mode: "onBlur", delayError: 300 } as const;

export function useErrorText() {
  const t = useTranslations("validation");
  return (message?: string) => (message ? t(message as ValidationKey) : undefined);
}

export function focusFirstError<T extends FieldValues>(errors: FieldErrors<T>) {
  const names = new Set(Object.keys(errors));
  const first = Array.from(document.querySelectorAll<HTMLElement>("form [name]")).find((el) =>
    names.has(el.getAttribute("name") ?? "")
  );
  if (!first) return;
  first.scrollIntoView({ block: "center" });
  first.focus({ preventScroll: true });
}
