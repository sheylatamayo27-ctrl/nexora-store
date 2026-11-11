import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
