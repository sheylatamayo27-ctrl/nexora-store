import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContentPageBanner } from "@/components/layout/ContentPageLayout";
import { SOCIALS, STORE_CONTACT, STORE_HOURS } from "@/components/layout/store-info";
import { Container } from "@/components/ui/Container";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("contact"), description: t("contactDescription"), alternates: localeAlternates("/contact", locale) };
}

const card = "flex flex-col gap-6 rounded-xl border border-border bg-surface p-8 shadow-elevation-sm max-sm:p-5";

export default async function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const channels: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
    { icon: MapPin, label: t("address"), value: STORE_CONTACT.address },
    { icon: Phone, label: t("phone"), value: STORE_CONTACT.phone, href: STORE_CONTACT.phoneHref },
    { icon: Mail, label: t("email"), value: STORE_CONTACT.email, href: `mailto:${STORE_CONTACT.email}` },
  ];

  return (
    <div className="flex flex-col">
      <ContentPageBanner title={t("title")} subtitle={t("subtitle")} />
      <Container className="py-14 max-md:py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-8 max-lg:grid-cols-1 max-sm:gap-6">
          <aside aria-labelledby="contact-info-title" className={card}>
            <div className="flex flex-col gap-1">
              <h2 id="contact-info-title" className="text-h4 text-text-primary">{t("infoTitle")}</h2>
              <p className="text-body text-text-secondary">{t("infoDescription")}</p>
            </div>

            <ul className="flex flex-col gap-5">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-body-sm text-text-muted">{label}</span>
                    {href ? (
                      <a href={href} className="break-words text-label text-text-primary transition-colors hover:text-brand-700">
                        {value}
                      </a>
                    ) : (
                      <span className="text-label text-text-primary">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-label-lg text-text-primary">
                <Clock className="h-[18px] w-[18px] text-brand-700" /> {t("hours")}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {STORE_HOURS.map((h) => (
                  <li key={h} className="text-body text-text-secondary">
                    {tFooter(h)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-3">
              <h3 className="text-label-lg text-text-primary">{t("follow")}</h3>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-800 transition-colors hover:bg-brand-800 hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <section className={card}>
            <div className="flex flex-col gap-1">
              <h2 className="text-h4 text-text-primary">{t("formTitle")}</h2>
              <p className="text-body text-text-secondary">{t("formDescription")}</p>
            </div>
            <ContactForm />
          </section>
        </div>
      </Container>
    </div>
  );
}
