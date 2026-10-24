import { defineConfig, devices } from "@playwright/test";

/**
 * Pruebas de regresión visual de Nexora (solo Chromium).
 *
 * Objetivo doble:
 *  1. ESCRITORIO (1440 y 1024): línea base "oficial" con toHaveScreenshot.
 *     Debe quedar en 0 diferencias tras cada cambio. NO regenerar la base.
 *  2. TABLET/MÓVIL (834, 768, 390, 360): captura fullPage a carpeta para
 *     comparar a mano con el diseño de Figma, + chequeo de desbordamiento
 *     horizontal. No usan línea base comprometida.
 *
 * El servidor se levanta con `next start` sobre el build de producción.
 */

const PORT = 3100;

export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/__baseline__",
  outputDir: "./test-results",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],

  // Umbral estricto: un cambio que afecte al escritorio hará fallar la prueba.
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },

  use: {
    baseURL: `http://localhost:${PORT}`,
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
    trace: "off",
  },

  projects: [
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
    },
    {
      name: "desktop-1024",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 800 }, deviceScaleFactor: 1 },
    },
    {
      name: "tablet-834",
      use: { ...devices["Desktop Chrome"], viewport: { width: 834, height: 1112 }, deviceScaleFactor: 1 },
    },
    {
      name: "tablet-768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 },
    },
    {
      name: "mobile-390",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 },
    },
    {
      name: "mobile-360",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 }, deviceScaleFactor: 1 },
    },
  ],

  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
