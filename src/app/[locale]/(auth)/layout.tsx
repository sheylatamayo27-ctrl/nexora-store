import { Suspense } from "react";
import { PageDots } from "@/components/ui/Dots";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <Suspense fallback={<PageDots />}>{children}</Suspense>
    </div>
  );
}
