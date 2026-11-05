"use client";

import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { FieldError } from "@/components/ui/FieldError";
import { Input, Select, Textarea } from "@/components/ui/Input";

type FormFieldProps = Omit<React.ComponentPropsWithoutRef<typeof Input>, "error" | "helper"> & {
  /** Error ya traducido. Sin él, el campo se ve exactamente como un `Input`. */
  error?: string;
};

/**
 * `Input` para formularios. Con `error`: borde rojo y mensaje debajo, enlazado
 * con aria-describedby. Con `type="password"`: el ícono muestra/oculta la
 * contraseña (Eye cuando se ve; mientras está oculta, el `icon` recibido o EyeOff).
 * Reenvía la ref, así que acepta `{...register("campo")}` de react-hook-form.
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { error, id, type, icon, onIconClick, iconLabel, ...props },
  ref
) {
  const t = useTranslations("common");
  const autoId = useId();
  const errorId = `${id ?? autoId}-error`;
  const isPassword = type === "password";
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      ref={ref}
      id={id}
      type={isPassword && visible ? "text" : type}
      icon={isPassword ? (visible ? Eye : icon ?? EyeOff) : icon}
      onIconClick={isPassword ? () => setVisible((v) => !v) : onIconClick}
      iconLabel={isPassword ? t(visible ? "hidePassword" : "showPassword") : iconLabel}
      error={!!error}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      helper={error && <FieldError id={errorId} message={error} />}
    />
  );
});

type SelectFieldProps = Omit<React.ComponentPropsWithoutRef<typeof Select>, "error" | "helper"> & {
  /** Error ya traducido. Sin él, el campo se ve exactamente como un `Select`. */
  error?: string;
};

/** `Select` para formularios, con el mismo tratamiento de errores que `FormField`. */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { error, id, ...props },
  ref
) {
  const autoId = useId();
  const errorId = `${id ?? autoId}-error`;

  return (
    <Select
      {...props}
      ref={ref}
      id={id}
      error={!!error}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      helper={error && <FieldError id={errorId} message={error} />}
    />
  );
});

type TextareaFieldProps = Omit<React.ComponentPropsWithoutRef<typeof Textarea>, "error" | "helper"> & {
  /** Error ya traducido. */
  error?: string;
};

/** `Textarea` para formularios, con el mismo tratamiento de errores que `FormField`. */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField(
  { error, id, ...props },
  ref
) {
  const autoId = useId();
  const errorId = `${id ?? autoId}-error`;

  return (
    <Textarea
      {...props}
      ref={ref}
      id={id}
      error={!!error}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      helper={error && <FieldError id={errorId} message={error} />}
    />
  );
});
