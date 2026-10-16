"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  Zap,
  LayoutGrid,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartButton } from "@/components/layout/CartButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Electrónica", href: "/categoria/auriculares", dropdown: true },
  { label: "Ofertas", href: "/categoria/ofertas", dropdown: true, hot: true },
  { label: "Blogs", href: "#", dropdown: true },
  { label: "Contacto", href: "#" },
  { label: "Novedades", href: "#" },
];

const secondaryNav = ["FAQs", "Rastrear pedido", "Nosotros"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface">
      <AnnouncementBar />

      {/* Barra principal */}
      <div className="border-b border-border bg-surface">
        <div className="container-page flex items-center gap-4 py-3 lg:gap-10 lg:py-5">
          <button
            type="button"
            className="lg:hidden"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Logo className="shrink-0" />

          {/* Buscador (desktop) */}
          <div className="hidden flex-1 items-center rounded-md border border-border bg-surface-subtle pl-4 pr-1 lg:flex">
            <Search className="h-[18px] w-[18px] text-text-muted" />
            <input
              type="text"
              placeholder="Busca auriculares, laptops, accesorios…"
              className="h-11 flex-1 bg-transparent px-3 text-body text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <div className="flex items-center gap-1 border-l border-border px-3 text-text-secondary">
              <span className="text-label-sm">Todas las categorías</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
            <Button variant="accent" className="ml-1">
              Buscar
            </Button>
          </div>

          {/* Utilidades (desktop) */}
          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <button className="flex items-center gap-1 text-label text-text-primary">
              <Globe className="h-[18px] w-[18px]" /> ES
              <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
            </button>
            <Link href="/cuenta" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                <User className="h-5 w-5 text-brand-800" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-body-sm text-text-secondary">Hola, entra</span>
                <span className="text-label text-text-primary">Cuenta y pedidos</span>
              </span>
            </Link>
            <span className="h-8 w-px bg-border" />
            <CartButton />
          </div>

          {/* Iconos (móvil) */}
          <div className="ml-auto flex items-center gap-4 lg:hidden">
            <Link href="/favoritos" aria-label="Favoritos">
              <Heart className="h-[22px] w-[22px]" />
            </Link>
            <Link href="/cuenta" aria-label="Cuenta">
              <User className="h-[22px] w-[22px]" />
            </Link>
            <CartButton compact />
          </div>
        </div>

        {/* Buscador (móvil) */}
        <div className="container-page pb-3 lg:hidden">
          <div className="flex items-center gap-2 rounded-md border border-border bg-surface-subtle px-3.5">
            <Search className="h-[18px] w-[18px] text-text-muted" />
            <input
              type="text"
              placeholder="Busca auriculares, laptops…"
              className="h-11 flex-1 bg-transparent text-body placeholder:text-text-muted focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Navegación (desktop) */}
      <nav className="hidden border-b border-border bg-surface lg:block">
        <div className="container-page flex items-center justify-between py-3">
          <div className="flex items-center gap-8">
            <Link
              href="/categoria/auriculares"
              className="flex items-center gap-2 rounded-md bg-brand-100 px-4 py-2 text-label text-brand-800"
            >
              <LayoutGrid className="h-[18px] w-[18px]" />
              Comprar todo
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 text-label text-text-primary transition-colors hover:text-brand-700"
              >
                {item.label}
                {item.dropdown && <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />}
                {item.hot && (
                  <span className="rounded-sm bg-accent-500 px-1.5 py-0.5 text-label-xs text-brand-900">
                    HOT
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="flex items-center gap-1.5 text-label text-brand-700">
              <Zap className="h-4 w-4 text-accent-600" /> Todas las colecciones
            </Link>
            {secondaryNav.map((label) => (
              <div key={label} className="flex items-center gap-6">
                <span className="h-4 w-px bg-border" />
                <Link href="#" className="text-label text-text-secondary hover:text-text-primary">
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Drawer móvil */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-900/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col bg-surface lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <Logo />
                <button aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {[{ label: "Inicio", href: "/" }, ...primaryNav].map((item) => (
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
                {secondaryNav.map((label) => (
                  <Link
                    key={label}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2.5 text-label text-text-secondary hover:bg-surface-subtle"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
