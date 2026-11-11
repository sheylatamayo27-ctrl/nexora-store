import localFont from "next/font/local";

export const jost = localFont({
  src: [{ path: "./fonts/jost-variable-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});
