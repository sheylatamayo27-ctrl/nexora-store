import { AuthSkeleton } from "@/components/skeletons/blocks";

/** Crear cuenta: panel de marca y formulario (nombre, correo, teléfono y contraseña). */
export default function LoadingRegister() {
  return <AuthSkeleton fields={4} panel="benefits" pairFirst />;
}
