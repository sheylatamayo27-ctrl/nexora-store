import { AuthSkeleton } from "@/components/skeletons/blocks";

/** Recuperar contraseña: panel de marca y formulario con el correo. */
export default function LoadingForgotPassword() {
  return <AuthSkeleton fields={1} social={false} />;
}
