import type { JsonLdObject } from "@/lib/jsonLd";

/**
 * Inserta datos estructurados (schema.org) como `<script type="application/ld+json">`.
 * No pinta nada. `<` se escapa para que un texto con "</script>" no cierre la etiqueta.
 */
export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
