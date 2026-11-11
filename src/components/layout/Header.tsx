"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, User, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartButton } from "@/components/layout/CartButton";
import { SearchBar } from "@/components/layout/SearchBar";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { MegaMenu, type MegaMenuData } from "@/components/layout/MegaMenu";
import { primaryNav, secondaryNav } from "@/components/layout/nav-links";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { useHydrated } from "@/hooks/useHydrated";
import { useSignOut } from "@/hooks/useSignOut";
import { Link, usePathname } from "@/i18n/navigation";
import { getFirstName, getInitials, useAuth } from "@/store/auth";

export function Header({ megaMenu, mobileSearch = true }: { megaMenu: MegaMenuData; mobileSearch?: boolean }) {
  const t = useTranslations("header");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tAccount = useTranslations("account");
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useDialogFocus(menuOpen, drawerRef, () => setMenuOpen(false), closeButtonRef);
  const hydrated = useHydrated();
  const storedUser = useAuth((s) => s.user);
  const user = hydrated ? storedUser : null;
  const accountHref = hydrated && !user ? "/login" : "/account";
  const { signOut, signingOut } = useSignOut();
  const pathname = usePathname();
  const hideMobileSearch =
    !mobileSearch ||
    pathname.startsWith("/product/") ||
    pathname === "/cart" ||
    pathname === "/order-confirmation" ||
    pathname === "/offers" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/");

  return (
    <header className="sticky top-0 z-40 bg-surface">
      <AnnouncementBar />

      <div className="border-b border-border bg-surface">
        <div className="container-page flex items-center gap-4 py-3 lg:gap-10 lg:py-5">
          <button
            type="button"
            className="lg:hidden"
            aria-label={t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <Logo className="shrink-0" />

          <div className="hidden flex-1 lg:flex">
            <SearchBar variant="desktop" />
          </div>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <LanguageSelector />
            <Link href={accountHref} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                {user ? (
                  <span className="text-label text-brand-800">{getInitials(user.name)}</span>
                ) : (
                  <User className="h-5 w-5 text-brand-800" />
                )}
              </span>
              <span className="flex flex-col leading-tight">
                {user ? (
                  <span className="max-w-[10rem] truncate text-body-sm text-text-secondary">
                    {t("greetingUser", { name: getFirstName(user.name) })}
                  </span>
                ) : (
                  <span className="text-body-sm text-text-secondary">{t("greeting")}</span>
                )}
                <span className="text-label text-text-primary">{t("accountAndOrders")}</span>
              </span>
            </Link>
            <span className="h-8 w-px bg-border" />
            <CartButton />
          </div>

          <div className="ml-auto flex items-center gap-4 lg:hidden">
            <Link href="/wishlist" aria-label={t("wishlist")}>
              <Heart className="h-[22px] w-[22px]" />
            </Link>
            <Link href={accountHref} aria-label={t("account")}>
              {user ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-label-xs text-brand-800">
                  {getInitials(user.name)}
                </span>
              ) : (
                <User className="h-[22px] w-[22px]" />
              )}
            </Link>
            <CartButton compact />
          </div>
        </div>

        {!hideMobileSearch && (
          <div className="container-page pb-3 lg:hidden">
            <SearchBar variant="mobile" />
          </div>
        )}
      </div>

      <MegaMenu data={megaMenu} />

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-900/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              ref={drawerRef}
              id={drawerId}
              role="dialog"
              aria-modal="true"
              aria-label={t("mobileMenu")}
              className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col bg-surface lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <Logo />
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={t("closeMenu")}
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label={t("mobileMenu")} className="flex flex-col gap-1 p-4">
                {[
                  { label: tCommon("home"), href: "/" },
                  ...primaryNav.map((item) => ({ label: tNav(item.key), href: item.href })),
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-label-lg text-text-primary hover:bg-surface-subtle"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-text-muted" />
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                {secondaryNav.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2.5 text-label text-text-secondary hover:bg-surface-subtle"
                  >
                    {tNav(item.key)}
                  </Link>
                ))}
                {user && (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <button
                      type="button"
                      disabled={signingOut}
                      aria-busy={signingOut || undefined}
                      onClick={async () => {
                        if (await signOut()) setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-label text-sale-500 hover:bg-surface-subtle disabled:opacity-60"
                    >
                      <LogOut className="h-4 w-4" />
                      {signingOut ? tAccount("signingOut") : tAccount("signOut")}
                    </button>
                  </>
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
