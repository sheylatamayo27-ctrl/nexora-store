import { RequireAuth } from "@/components/account/RequireAuth";
import LoadingAccount from "./loading";

/** Todas las secciones de Mi cuenta exigen sesión; mientras se comprueba, el mismo esqueleto que al cargar. */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth fallback={<LoadingAccount />}>{children}</RequireAuth>;
}
