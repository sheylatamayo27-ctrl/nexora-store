import { test, expect, type Page } from "@playwright/test";

/**
 * Rutas que recorre la suite. Para rutas dinámicas se usa un slug real
 * del catálogo (ver build: /categoria/[slug], /producto/[slug], /blog/[slug]).
 */
const routes: { name: string; path: string }[] = [
  { name: "home", path: "/" },
  { name: "categoria", path: "/categoria/audifonos" },
  { name: "producto", path: "/producto/nexora-aura-anc-auriculares-inalambricos" },
  { name: "carrito", path: "/carrito" },
  { name: "checkout", path: "/checkout" },
  { name: "pedido-confirmado", path: "/pedido-confirmado" },
  { name: "entrar", path: "/entrar" },
  { name: "crear-cuenta", path: "/crear-cuenta" },
  { name: "cuenta", path: "/cuenta" },
  { name: "favoritos", path: "/favoritos" },
  { name: "ofertas", path: "/ofertas" },
  { name: "blog", path: "/blog" },
  { name: "blog-post", path: "/blog/como-elegir-auriculares-cancelacion-de-ruido" },
  { name: "buscar", path: "/buscar?q=auriculares" },
  { name: "404", path: "/esta-ruta-no-existe-nexora" },
];

/** Elementos que cambian solos (se enmascaran para capturas estables). */
function dynamicMasks(page: Page) {
  return [
    page.locator('[role="timer"]'), // cuenta regresiva (cambia cada segundo)
    page.locator(".animate-marquee"), // franjas en movimiento (marquee)
  ];
}

/** Desactiva animaciones/transiciones, dispara imágenes perezosas y estabiliza. */
async function stabilize(page: Page) {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      scroll-behavior: auto !important;
      caret-color: transparent !important;
    }`,
  });
  // Recorre la página en pasos para disparar la carga perezosa de imágenes.
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += Math.round(window.innerHeight * 0.8);
        if (y < document.body.scrollHeight) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, 0);
          resolve();
        }
      };
      step();
    });
  });
  // Fuentes listas (acotado para no colgar si algo falla).
  await page
    .evaluate(() => (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts?.ready)
    .catch(() => {});
  // Deja que las peticiones disparadas por el scroll terminen.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(500);
}

for (const route of routes) {
  test(route.name, async ({ page }, testInfo) => {
    const width = page.viewportSize()!.width;
    const isDesktop = width >= 1024;

    await page.goto(route.path, { waitUntil: "networkidle" });
    await stabilize(page);

    if (isDesktop) {
      // Línea base oficial del escritorio: 0 diferencias.
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        mask: dynamicMasks(page),
      });
    } else {
      // Captura primero (siempre disponible para comparar con Figma),
      // aunque la ruta aún tenga desbordamiento.
      // Organizadas POR PANTALLA: tests/visual/__captures__/<pantalla>/<dispositivo>.png
      // (p. ej. home/mobile-390.png, home/tablet-834.png) — así se ve de un vistazo
      // qué captura pertenece a qué pantalla. Playwright crea las carpetas solo.
      const capturePath = `tests/visual/__captures__/${route.name}/${testInfo.project.name}.png`;
      await page.screenshot({
        path: capturePath,
        fullPage: true,
        mask: dynamicMasks(page),
      });
      await testInfo.attach(`${route.name}/${testInfo.project.name}`, {
        path: capturePath,
        contentType: "image/png",
      });

      // Tablet/móvil: sin desbordamiento horizontal.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(
        overflow,
        `Desbordamiento horizontal en ${route.name} @${width}px: ${overflow}px`
      ).toBeLessThanOrEqual(1);
    }
  });
}
