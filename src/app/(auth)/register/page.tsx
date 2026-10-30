import type { Metadata } from "next";
import { AuthView } from "@/components/auth/AuthView";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function SignUpPage() {
  return <AuthView mode="signup" />;
}
