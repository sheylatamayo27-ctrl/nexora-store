import type { LucideIcon } from "lucide-react";

export function AccountEmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface px-6 py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
        <Icon className="h-9 w-9 text-brand-800" />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-h3 text-text-primary">{title}</h1>
        <p className="max-w-md text-body-lg text-text-secondary">{description}</p>
      </div>
      {children && <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>}
    </div>
  );
}
