import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/;

export const richLinkClass =
  "text-brand-700 underline decoration-brand-500/40 underline-offset-2 transition-colors hover:text-brand-800 hover:decoration-brand-800";

export function RichText({ text }: { text: string }) {
  const parts = text.split(new RegExp(LINK, "g"));
  return (
    <>
      {parts.map((part, i) => {
        if (i % 3 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (i % 3 === 2) return null;
        const href = parts[i + 1];
        return href.startsWith("/") ? (
          <Link key={i} href={href} className={richLinkClass}>
            {part}
          </Link>
        ) : (
          <a key={i} href={href} className={richLinkClass}>
            {part}
          </a>
        );
      })}
    </>
  );
}
