import { RequireAuth } from "@/components/account/RequireAuth";
import LoadingAccount from "./loading";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth fallback={<LoadingAccount />}>{children}</RequireAuth>;
}
