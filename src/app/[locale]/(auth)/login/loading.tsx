import { AuthSkeleton } from "@/components/skeletons/blocks";

/** Iniciar sesión: panel de marca y formulario (correo y contraseña). */
export default function LoadingLogin() {
  return <AuthSkeleton fields={2} />;
}
