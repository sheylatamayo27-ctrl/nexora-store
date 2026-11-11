"use client";

import { useEffect, useState } from "react";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  const compact = useMediaQuery("(max-width: 1023.98px)");

  return (
    <SonnerToaster
      position={compact ? "bottom-center" : "bottom-right"}
      gap={10}
      offset={compact ? { bottom: "var(--toast-bottom)" } : { bottom: "20px", right: "20px" }}
      mobileOffset={{ bottom: "var(--toast-bottom)", left: "16px", right: "16px" }}
      style={{ "--width": "368px" } as React.CSSProperties}
    />
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}
