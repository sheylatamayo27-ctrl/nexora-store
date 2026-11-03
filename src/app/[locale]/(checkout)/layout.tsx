import { Suspense } from "react";
import { PageDots } from "@/components/ui/Dots";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <Suspense fallback={<PageDots />}>{children}</Suspense>
    </div>
  );
}
