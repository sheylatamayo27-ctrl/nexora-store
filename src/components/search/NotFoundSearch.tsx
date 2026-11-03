"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { getPathname, useRouter } from "@/i18n/navigation";

/** Buscador de la página 404: lleva a /search?q=… (sin JS, el form hace lo mismo). */
export function NotFoundSearch() {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      action={getPathname({ href: "/search", locale })}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
      }}
      className="flex w-full max-w-lg items-center gap-2 rounded-lg border border-border-strong bg-surface p-1.5 pl-5 max-sm:pl-4"
    >
      <Search className="h-5 w-5 shrink-0 text-text-muted" />
      <input
        type="text"
        name="q"
        enterKeyHint="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholderProducts")}
        aria-label={t("searchProducts")}
        className="h-10 min-w-0 flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none max-lg:text-body-lg"
      />
      <Button type="submit" variant="accent" className="shrink-0 max-sm:px-4">
        {t("submit")}
      </Button>
    </form>
  );
}
