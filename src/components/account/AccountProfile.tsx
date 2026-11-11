"use client";

import { LogIn, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/Skeleton";
import { Link } from "@/i18n/navigation";
import { useHydrated } from "@/hooks/useHydrated";
import { useSignOut } from "@/hooks/useSignOut";
import { getInitials, useAuth } from "@/store/auth";

export function AccountProfile() {
  const t = useTranslations("account");
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-gradient-to-b from-brand-100 to-surface p-6 text-center max-lg:flex-row max-lg:gap-3 max-lg:rounded-none max-lg:border-0 max-lg:bg-none max-lg:p-0 max-lg:text-left md:max-lg:gap-4">
      <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-100 text-h3 text-brand-800 max-lg:shrink-0 max-md:h-12 max-md:w-12 max-md:text-label-lg md:max-lg:h-14 md:max-lg:w-14 md:max-lg:text-h4">
        {!hydrated ? null : user ? (
          getInitials(user.name)
        ) : (
          <User className="h-8 w-8 max-md:h-6 max-md:w-6 md:max-lg:h-7 md:max-lg:w-7" />
        )}
      </span>
      <div className="contents max-lg:flex max-lg:min-w-0 max-lg:flex-col max-lg:gap-0.5">
        {!hydrated ? (
          <>
            <Skeleton variant="text" className="w-32" />
            <Skeleton className="h-3 w-36" />
          </>
        ) : user ? (
          <>
            <div className="contents max-lg:flex max-lg:items-center max-lg:gap-2">
              <span className="text-label-lg text-text-primary max-lg:truncate max-lg:font-semibold">{user.name}</span>
              <span className="shrink-0 rounded-sm bg-accent-500 px-1.5 py-0.5 text-label-xs uppercase text-brand-900 lg:hidden">
                {t("gold")}
              </span>
            </div>
            <span className="text-body-sm text-text-secondary max-lg:truncate">{user.email}</span>
          </>
        ) : (
          <>
            <span className="text-label-lg text-text-primary max-lg:truncate max-lg:font-semibold">{t("guestTitle")}</span>
            <Link href="/login" className="text-body-sm text-brand-700 underline underline-offset-2 max-lg:truncate">
              {t("guestSubtitle")}
            </Link>
          </>
        )}
      </div>
      {hydrated && user && (
        <span className="rounded-sm bg-accent-500 px-2 py-1 text-label-xs uppercase text-brand-900 max-lg:hidden">
          {t("goldMember")}
        </span>
      )}
    </div>
  );
}

const menuItem =
  "flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-label hover:bg-surface-subtle max-lg:hidden";

export function SignOutButton() {
  const t = useTranslations("account");
  const tCommon = useTranslations("common");
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const { signOut, signingOut } = useSignOut();

  if (hydrated && !user) {
    return (
      <Link href="/login" className={`${menuItem} text-brand-700`}>
        <LogIn className="h-5 w-5" />
        {tCommon("signIn")}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={signingOut}
      aria-busy={signingOut || undefined}
      className={`${menuItem} text-left text-sale-500 disabled:opacity-60`}
    >
      <LogOut className="h-5 w-5" />
      {signingOut ? t("signingOut") : t("signOut")}
    </button>
  );
}
