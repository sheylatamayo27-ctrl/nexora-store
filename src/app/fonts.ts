import localFont from "next/font/local";

// Jost auto-alojada (licencia OFL en ./fonts/OFL.txt): el build no depende de Google Fonts.
// Es una fuente variable: este único archivo (subset latin, el mismo que servía
// Google Fonts) cubre los pesos 400–700.
export const jost = localFont({
  src: [{ path: "./fonts/jost-variable-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});
