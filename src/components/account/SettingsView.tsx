"use client";

import { useState } from "react";
import { Mail, Phone, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";

type Field = "firstName" | "lastName" | "email" | "phone";
type Values = Record<Field, string>;
/** Error de cada campo: su clave de texto en "validation". */
type Errors = Partial<Record<Field, "firstName" | "lastName" | "email" | "phone">>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: Values = {
  firstName: "Sheyla",
  lastName: "Tamayo",
  email: "sheyla@nexora.store",
  phone: "+52 55 9876 5432",
};

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.firstName.trim()) errors.firstName = "firstName";
  if (!v.lastName.trim()) errors.lastName = "lastName";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "email";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 8) errors.phone = "phone";
  return errors;
}

/**
 * Configuración (datos del perfil). Solo front-end: valida en el cliente y
 * simula el guardado. Para conectarlo, cambia el bloque marcado en
 * `handleSubmit` por la llamada real (p. ej. PATCH /api/account).
 */
export function SettingsView() {
  const t = useTranslations("settings");
  const tFields = useTranslations("common.fields");
  const tValidation = useTranslations("validation");
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const field = (name: Field) => {
    const error = errors[name];
    return {
      name,
      value: values[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
        setErrors((err) => ({ ...err, [name]: undefined }));
      },
      error: error !== undefined,
      "aria-invalid": error !== undefined,
      helper: error && tValidation(error),
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // Guardado simulado: aquí iría la petición al backend.
    notifyToast({ title: t("savedTitle"), description: t("savedDescription"), icon: Check });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-h2 text-text-primary">{t("title")}</h1>
        <p className="text-body text-text-secondary">{t("subtitle")}</p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 max-md:p-4"
      >
        <h2 className="text-h4 text-text-primary">{t("personalDetails")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={tFields("firstName")} autoComplete="given-name" {...field("firstName")} />
          <Input label={tFields("lastName")} autoComplete="family-name" {...field("lastName")} />
          <Input label={tFields("email")} icon={Mail} type="email" autoComplete="email" {...field("email")} />
          <Input label={tFields("phone")} icon={Phone} type="tel" autoComplete="tel" {...field("phone")} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="max-sm:w-full">
            {t("save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
