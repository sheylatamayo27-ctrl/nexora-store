import { Suspense } from "react";
import { PageDots } from "@/components/ui/Dots";
import { MAIN_CONTENT_ID } from "@/lib/a11y";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="min-h-screen bg-surface focus:outline-none">
      <Suspense fallback={<PageDots />}>{children}</Suspense>
    </main>
  );
}
