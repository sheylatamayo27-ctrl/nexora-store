import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge no conoce nuestra escala tipográfica personalizada
 * (text-label-lg, text-h3, text-price…) y, por defecto, la confunde con el
 * grupo de color: al unir "text-white text-label-lg" eliminaba el color.
 * Registramos esas clases en el grupo "font-size" para que convivan con el
 * color sin pisarse.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-l",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "body-sm",
            "label-lg",
            "label",
            "label-sm",
            "label-xs",
            "price",
            "price-sm",
          ],
        },
      ],
    },
  },
});

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
