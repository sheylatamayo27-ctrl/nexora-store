import { useEffect, useState } from "react";

/** `value` cuando lleva `delay` ms sin cambiar (para no pedir a la API en cada tecla). */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
