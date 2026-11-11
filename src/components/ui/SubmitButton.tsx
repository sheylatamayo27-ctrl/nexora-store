import { Button } from "@/components/ui/Button";
import { Dots } from "@/components/ui/Dots";
import { cn } from "@/lib/utils";

export function SubmitButton({
  busy,
  busyLabel,
  icon = false,
  className,
  children,
}: {
  busy: boolean;
  busyLabel: string;
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      icon={icon && !busy}
      disabled={busy}
      aria-busy={busy || undefined}
      className={cn("justify-center disabled:opacity-80", className)}
    >
      {busy ? (
        <>
          <Dots size="sm" tone="inverse" />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
