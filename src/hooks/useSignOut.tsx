"use client";

import { useState } from "react";
import { AlertCircle, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/store/auth";
import { notifyToast } from "@/lib/toast";

export function useSignOut() {
  const t = useTranslations("account");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const logout = useAuth((s) => s.logout);
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    if (signingOut) return false;
    setSigningOut(true);
    try {
      await logout();
      notifyToast({ icon: LogOut, title: t("signedOut") });
      router.push("/");
      return true;
    } catch {
      notifyToast({ tone: "error", icon: AlertCircle, title: t("signOutFailed"), description: tCommon("checkConnection") });
      return false;
    } finally {
      setSigningOut(false);
    }
  };

  return { signOut, signingOut };
}
