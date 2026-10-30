"use client";

import { useState } from "react";
import { Mail, Phone, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { notifyToast } from "@/lib/toast";

type Field = "firstName" | "lastName" | "email" | "phone";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: Values = {
  firstName: "Sheyla",
  lastName: "Tamayo",
  email: "sheyla@nexora.store",
  phone: "+52 55 9876 5432",
};

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.firstName.trim()) errors.firstName = "Escribe tu nombre.";
  if (!v.lastName.trim()) errors.lastName = "Escribe tus apellidos.";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Escribe un correo válido, p. ej. nombre@correo.com.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 8) errors.phone = "Escribe un teléfono válido.";
  return errors;
}

/**
 * Configuración (datos del perfil). Solo front-end: valida en el cliente y
 * simula el guardado. Para conectarlo, cambia el bloque marcado en
 * `handleSubmit` por la llamada real (p. ej. PATCH /api/account).
 */
export function SettingsView() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const field = (name: Field) => ({
    name,
    value: values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((err) => ({ ...err, [name]: undefined }));
    },
    error: errors[name] !== undefined,
    "aria-invalid": errors[name] !== undefined,
    helper: errors[name],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // Guardado simulado: aquí iría la petición al backend.
    notifyToast({ title: "Cambios guardados", description: "Tus datos están al día", icon: Check });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-h2 text-text-primary">Configuración</h1>
        <p className="text-body text-text-secondary">Actualiza los datos de tu cuenta.</p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 max-md:p-4"
      >
        <h2 className="text-h4 text-text-primary">Datos personales</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre" autoComplete="given-name" {...field("firstName")} />
          <Input label="Apellidos" autoComplete="family-name" {...field("lastName")} />
          <Input label="Correo electrónico" icon={Mail} type="email" autoComplete="email" {...field("email")} />
          <Input label="Teléfono" icon={Phone} type="tel" autoComplete="tel" {...field("phone")} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="max-sm:w-full">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
