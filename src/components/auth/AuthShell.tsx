import { ChevronLeft, Star, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { AssetImage } from "@/components/media/AssetImage";
import { Link } from "@/i18n/navigation";

const perks = ["memberPrices", "firstOrderShipping", "earlyAccess"] as const;

const stats = [
  { value: "50k+", label: "happyCustomers" },
  { value: "4.9★", label: "averageRating" },
  { value: "24h", label: "expressDelivery" },
] as const;

export function AuthShell({ variant, children }: { variant: "signin" | "signup"; children: React.ReactNode }) {
  const t = useTranslations("auth");
  const isSignup = variant === "signup";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden p-6 lg:min-h-screen lg:w-[46%] lg:p-10">
        {isSignup ? (
          <AssetImage
            folder="banners"
            name="tablet-banner"
            alt="Nexora"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        ) : (
          <>
            <AssetImage
              folder="misc"
              name="hero"
              alt="Nexora"
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="lg:hidden"
            />
            <AssetImage
              folder="misc"
              name="auth-panel"
              alt="Nexora"
              priority
              sizes="50vw"
              className="hidden object-[center_35%] lg:block"
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061234]/90 via-[#061234]/40 to-[#061234]/50" />

        <div className="relative flex items-center justify-between lg:justify-start">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-text-inverse lg:hidden"
            aria-label={t("backToStore")}
          >
            <ChevronLeft className="h-[18px] w-[18px]" />
          </Link>
          <Logo tone="light" href={null} />
        </div>

        <div className="relative flex flex-col gap-6 text-text-inverse">
          {isSignup ? (
            <>
              <h2 className="max-w-md text-h3 lg:text-h2">{t("joinTitle")}</h2>
              <div className="flex flex-col gap-2">
                {perks.map((p) => (
                  <span key={p} className="flex items-center gap-2 text-body-lg text-white/90">
                    <Check className="h-4 w-4 text-accent-500" /> {t(p)}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 lg:hidden">
                <h2 className="max-w-md text-h3">{t("signInHeadline")}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <span className="text-body text-white/85">{t("ratingLine")}</span>
                </div>
              </div>

              <div className="hidden flex-col gap-8 lg:flex">
                <figure className="flex flex-col gap-4 rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <blockquote className="text-body-lg text-white/90">{t("testimonial")}</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-label-sm text-text-inverse">
                      AM
                    </span>
                    <span className="flex flex-col">
                      <span className="text-label text-text-inverse">Aarav Mehta</span>
                      <span className="text-body-sm text-white/70">{t("customerSince")}</span>
                    </span>
                  </figcaption>
                </figure>
                <div className="flex items-center justify-between">
                  {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5">
                      <span className="text-h3 text-text-inverse">{s.value}</span>
                      <span className="text-body-sm text-white/70">{t(s.label)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-6 pt-8 max-lg:items-start sm:px-10 sm:pb-10 sm:pt-10">
        <div className="flex w-full min-w-0 max-w-md flex-col gap-5">
          <Link
            href="/"
            className="hidden items-center gap-1 text-label text-text-secondary transition-colors hover:text-text-primary lg:flex"
          >
            <ChevronLeft className="h-4 w-4" /> {t("backToStore")}
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
