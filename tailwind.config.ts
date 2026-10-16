import type { Config } from "tailwindcss";

/**
 * Tokens del sistema de diseño Nexora (exportados 1:1 desde Figma).
 * Colores, radios, sombras y escala tipográfica (fuente Jost).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#081B4B",
          800: "#0B2A6B",
          700: "#123C9C",
          500: "#1F57D6",
          100: "#E8EEFC",
        },
        accent: {
          700: "#B45309",
          600: "#F2AE00",
          500: "#FFC220",
          100: "#FFF4D6",
        },
        sale: {
          500: "#E5322D",
          100: "#FDECEC",
        },
        success: {
          700: "#15803D",
          500: "#16A34A",
          100: "#DCFCE7",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
          inverse: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F4F6FA",
          muted: "#EEF1F6",
        },
        border: {
          DEFAULT: "#E4E8EF",
          strong: "#CBD2DE",
        },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "4rem", letterSpacing: "-0.015em", fontWeight: "600" }],
        "display-l": ["2.75rem", { lineHeight: "3.25rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.005em", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.003em", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.625rem", fontWeight: "500" }],
        "body-lg": ["1rem", { lineHeight: "1.5rem" }],
        body: ["0.875rem", { lineHeight: "1.25rem" }],
        "body-sm": ["0.75rem", { lineHeight: "1rem" }],
        "label-lg": ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        label: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        "label-sm": ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }],
        "label-xs": ["0.625rem", { lineHeight: "0.875rem", letterSpacing: "0.04em", fontWeight: "600" }],
        price: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "price-sm": ["1rem", { lineHeight: "1.375rem", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        "elevation-sm": "0 1px 3px 0 rgba(15,23,42,0.06)",
        "elevation-md": "0 8px 24px -4px rgba(15,23,42,0.08)",
        "elevation-lg": "0 20px 40px -8px rgba(8,27,75,0.18)",
      },
      maxWidth: {
        page: "1440px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
