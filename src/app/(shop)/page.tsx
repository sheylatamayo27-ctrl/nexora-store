import Link from "next/link";
import { ArrowRight, Cpu, Monitor, BatteryCharging, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AssetImage } from "@/components/media/AssetImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Price } from "@/components/commerce/Price";
import { Rating } from "@/components/commerce/Rating";
import { Countdown } from "@/components/commerce/Countdown";
import { StockBar } from "@/components/commerce/StockBar";
import { ServiceFeatures } from "@/components/commerce/ServiceFeatures";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { categories, promoBanners } from "@/data/categories";
import { featuredProducts, dealProducts } from "@/data/products";

const specs = [
  { icon: Cpu, title: "Core i7 13ª gen", sub: "16 GB RAM · 1 TB SSD" },
  { icon: Monitor, title: '14" 2.8K OLED', sub: "120 Hz · 100% DCI-P3" },
  { icon: BatteryCharging, title: "18 h de batería", sub: "Carga rápida de 65W" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Colecciones */}
      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeader
              title="Compra por colección"
              subtitle="Top 10 más vendidos esta semana · Entrega al día siguiente"
              href="/categoria/auriculares"
            />
          </Reveal>
          <Reveal>
            {/* Móvil: fila con scroll horizontal · Tablet: grilla de 5 (ícono + nombre). */}
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:hidden">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="group flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevation-md md:w-auto"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-subtle md:h-16 md:w-16">
                    <AssetImage folder="products" name={cat.image} alt={cat.name} sizes="64px" />
                  </div>
                  <span className="w-full truncate text-label-sm text-text-primary">{cat.name}</span>
                  <span className="hidden text-body-sm text-text-secondary md:block">{cat.itemCount} artículos</span>
                </Link>
              ))}
            </div>

            {/* Escritorio (≥1024): tarjetas horizontales — intacto, idéntico al diseño actual. */}
            <div className="hidden gap-4 lg:grid lg:grid-cols-5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-md"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-label-lg text-text-primary">{cat.name}</span>
                    <span className="truncate text-body-sm text-text-secondary">{cat.itemCount} artículos</span>
                    <span className="mt-1 flex items-center gap-1 text-label-sm text-brand-700">
                      Comprar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface-subtle sm:h-20 sm:w-20">
                    <AssetImage folder="products" name={cat.image} alt={cat.name} sizes="80px" />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <Marquee />

      {/* Colección destacada */}
      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeader
              title="Colección destacada"
              subtitle="Los más vendidos seleccionados · Entrega al día siguiente"
              href="/categoria/auriculares"
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Oferta del día */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-h3 text-text-primary sm:text-h2">Oferta del día</h2>
                  <p className="text-body text-text-secondary">
                    Ahorros increíbles — ¡apúrate, las ofertas terminan pronto!
                  </p>
                </div>
                <div className="flex items-center gap-3 max-sm:w-full">
                  <span className="hidden text-label text-text-secondary sm:inline">Termina en</span>
                  <Countdown endsInHours={1752} className="max-sm:w-full max-sm:justify-between" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dealProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/producto/${p.slug}`}
                    className="flex gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-surface-subtle">
                      <AssetImage folder="products" name={p.image} alt={p.name} sizes="96px" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-label-sm uppercase tracking-wide text-text-muted">
                        {p.vendor}
                      </span>
                      <span className="line-clamp-2 text-label text-text-primary">{p.name}</span>
                      <Price price={p.price} compareAt={p.compareAt} size="sm" className="mt-0.5" />
                      {p.sold && (
                        <StockBar current={p.sold.current} total={p.sold.total} className="mt-auto pt-2" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Banners promocionales */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {promoBanners.map((b, i) => (
              <Reveal
                key={b.eyebrow}
                delay={i * 0.08}
                className={cn(
                  "w-[85vw] shrink-0 snap-start md:w-auto",
                  i === 2 && "md:col-span-2 lg:col-span-1"
                )}
              >
                <Link
                  href={b.href}
                  className="group relative flex h-80 flex-col overflow-hidden rounded-xl bg-brand-800 p-8"
                >
                  <AssetImage
                    folder="banners"
                    name={b.image}
                    alt={b.title}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 ${
                      b.align === "center"
                        ? "bg-gradient-to-t from-[#081B4B]/90 via-[#081B4B]/30 to-transparent"
                        : "bg-gradient-to-r from-[#081B4B]/90 via-[#081B4B]/30 to-transparent"
                    }`}
                  />
                  <div
                    className={`relative mt-auto flex flex-col gap-1 ${
                      b.align === "center" ? "items-center text-center" : "items-start"
                    }`}
                  >
                    <span className="text-label-xs uppercase tracking-widest text-accent-500">
                      {b.eyebrow}
                    </span>
                    <span className="max-w-[14rem] text-h3 text-text-inverse">{b.title}</span>
                    <span className="text-body text-white/80">{b.subtitle}</span>
                    <span className="mt-2 flex items-center gap-1.5 text-label text-text-inverse underline decoration-from-font underline-offset-4">
                      Comprar ahora <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Producto destacado (spotlight) */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-12 md:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-subtle">
                <AssetImage folder="products" name="laptop" alt="MyBook Laptop 14 pulgadas" sizes="(max-width: 1024px) 100vw, 50vw" />
                <Badge type="sale" className="absolute left-5 top-5">Ahorra Rs. 6,501.00</Badge>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Badge type="hot">Más vendido</Badge>
                  <span className="text-label-sm tracking-wide text-brand-700">PRODUCTO DESTACADO</span>
                </div>
                <h2 className="text-h2 text-text-primary sm:text-display-l">MyBook Laptop 14″</h2>
                <Rating rating={4.9} reviews={1240} size={16} />
                <p className="max-w-lg text-body-lg text-text-secondary max-lg:line-clamp-2">
                  Cuerpo ultrafino de aluminio, una impresionante pantalla 2.8K OLED y batería para
                  todo el día. Hecha para creadores y profesionales que trabajan desde cualquier lugar.
                </p>
                <div className="hidden gap-3 lg:grid lg:grid-cols-3">
                  {specs.map((s) => (
                    <div key={s.title} className="flex flex-col gap-2 rounded-lg bg-surface-subtle p-4">
                      <s.icon className="h-[22px] w-[22px] text-brand-700" />
                      <span className="text-label text-text-primary">{s.title}</span>
                      <span className="text-body-sm text-text-secondary">{s.sub}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Price price={85999} compareAt={92500} size="lg" />
                  <span className="rounded-sm bg-sale-100 px-2 py-1 text-label-sm text-sale-500">7% OFF</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 max-lg:flex-col max-lg:items-stretch">
                  <ButtonLink
                    href="/producto/mybook-laptop-14-pulgadas-2-8k-oled"
                    variant="primary"
                    size="lg"
                    className="max-lg:w-full"
                  >
                    Agregar al carrito
                  </ButtonLink>
                  <ButtonLink
                    href="/producto/mybook-laptop-14-pulgadas-2-8k-oled"
                    variant="outline"
                    size="lg"
                    className="max-lg:hidden"
                  >
                    Comprar ahora
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Beneficios */}
      <ServiceFeatures />

      {/* Newsletter */}
      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-500 p-8 sm:p-12 lg:flex-row lg:items-center">
              <div className="relative flex max-w-lg flex-col gap-2 text-text-inverse">
                <span className="text-label-xs tracking-widest text-accent-500">NEWSLETTER</span>
                <h2 className="text-h2">Obtén 10% de descuento en tu primer pedido</h2>
                <p className="text-body-lg text-white/75">
                  Suscríbete para ofertas exclusivas, novedades y consejos tech. Sin spam, nunca.
                </p>
              </div>
              <div className="relative flex w-full max-w-md items-center gap-2 max-sm:flex-col max-sm:items-stretch">
                <div className="flex h-14 items-center gap-3 rounded-md bg-surface px-4 sm:flex-1 max-sm:w-full">
                  <Mail className="h-5 w-5 text-text-muted" />
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="h-full flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </div>
                <Button variant="accent" size="lg" className="max-sm:w-full">Suscribirse</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
