import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` en el servidor y durante la hidratación; `true` después. Sirve para
 * pintar lo que depende de localStorage (sesión, etc.) sin desajustar el HTML del
 * servidor. A diferencia de `useState(false)` + `useEffect`, un componente que se
 * monta más tarde (navegación en el cliente) ya arranca en `true`, sin un fotograma
 * de respaldo.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
