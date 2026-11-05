import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Banner azul de las páginas de contenido: migas (Inicio › título), título y subtítulo centrados. */
export function ContentPageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-brand-900 text-text-inverse">
      <Container className="flex flex-col items-center gap-4 py-16 text-center max-md:py-12 max-sm:py-10">
        <Breadcrumb tone="inverse" items={[{ label: title }]} className="justify-center" />
        <h1 className="text-display-l max-sm:text-h2">{title}</h1>
        {subtitle && <p className="max-w-2xl text-body-lg text-white/75">{subtitle}</p>}
      </Container>
    </section>
  );
}

/**
 * Página de contenido estático: banner + cuerpo centrado. `width="article"`
 * (por defecto) para texto corrido; `"wide"` para páginas con grillas (nosotros, FAQ).
 */
export function ContentPageLayout({
  title,
  subtitle,
  width = "article",
  children,
}: {
  title: string;
  subtitle?: string;
  width?: "article" | "wide";
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <ContentPageBanner title={title} subtitle={subtitle} />
      <Container className="py-14 max-md:py-10">
        <div className={cn("mx-auto", width === "article" ? "max-w-3xl" : "max-w-5xl")}>{children}</div>
      </Container>
    </div>
  );
}
