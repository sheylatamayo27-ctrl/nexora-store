import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/content/RichText";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getFaqGroups } from "@/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("faq"), description: t("faqDescription"), alternates: localeAlternates("/faq", locale) };
}

const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

export default async function FaqPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const [groups, t] = await Promise.all([getFaqGroups(locale), getTranslations({ locale, namespace: "faq" })]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
      }))
    ),
  };

  return (
    <ContentPageLayout title={t("title")} subtitle={t("subtitle")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <section key={group.title} className="flex flex-col gap-4">
            <h2 className="text-h4 text-text-primary">{group.title}</h2>
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-elevation-sm">
              {group.items.map((item) => (
                <details key={item.question} className="group border-b border-border last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-label-lg text-text-primary transition-colors hover:bg-surface-subtle focus-visible:bg-surface-subtle focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="px-5 pb-5 text-body text-text-secondary">
                    <RichText text={item.answer} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="flex items-center justify-between gap-6 rounded-2xl bg-brand-900 p-8 text-text-inverse max-sm:flex-col max-sm:items-start max-sm:p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-h4">{t("ctaTitle")}</h2>
            <p className="text-body text-white/75">{t("ctaText")}</p>
          </div>
          <ButtonLink href="/contact" variant="accent" size="lg" icon className="shrink-0 max-sm:w-full">
            {t("ctaButton")}
          </ButtonLink>
        </div>
      </div>
    </ContentPageLayout>
  );
}
