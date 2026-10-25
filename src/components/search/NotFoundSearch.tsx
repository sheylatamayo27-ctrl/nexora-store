"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Buscador de la página 404: lleva a /buscar?q=… (sin JS, el form hace lo mismo). */
export function NotFoundSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      action="/buscar"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar");
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
        placeholder="Busca productos…"
        aria-label="Buscar productos"
        className="h-10 min-w-0 flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none max-lg:text-body-lg"
      />
      <Button type="submit" variant="accent" className="shrink-0 max-sm:px-4">
        Buscar
      </Button>
    </form>
  );
}
