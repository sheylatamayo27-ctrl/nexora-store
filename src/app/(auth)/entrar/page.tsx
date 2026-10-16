import type { Metadata } from "next";
import { AuthView } from "@/components/auth/AuthView";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function SignInPage() {
  return <AuthView mode="signin" />;
}
