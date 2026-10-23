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
            {/* Móvil: fila con desplazamiento horizontal; tablet/escritorio: cuadrícula.
                Cada tarjeta es vertical y centrada (ícono arriba, nombre y conteo). */}
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 lg:grid-cols-5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="group flex w-24 shrink-0 snap-start flex-col items-center gap-3 rounded-xl border border-border bg-surface p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation-md sm:w-auto"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface-subtle sm:h-20 sm:w-20">
                    <AssetImage folder="products" name={cat.image} alt={cat.name} sizes="80px" />
                  </div>
                  <div className="flex min-w-0 flex-col items-center gap-0.5">
                    <span className="max-w-full truncate text-label text-text-primary">{cat.name}</span>
                    <span className="text-body-sm text-text-secondary">{cat.itemCount} artículos</span>
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
                <div className="flex items-center gap-3">
                  <span className="hidden text-label text-text-secondary sm:inline">Termina en</span>
                  <Countdown endsInHours={1752} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          <div className="grid gap-5 sm:grid-cols-2">
            {promoBanners.map((b, i) => (
              <Reveal
                key={b.eyebrow}
                delay={i * 0.08}
                className={i === 2 ? "sm:col-span-2" : undefined}
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
            <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-12 lg:grid-cols-2 lg:gap-16">
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
                <p className="max-w-lg text-body-lg text-text-secondary">
                  Cuerpo ultrafino de aluminio, una impresionante pantalla 2.8K OLED y batería para
                  todo el día. Hecha para creadores y profesionales que trabajan desde cualquier lugar.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
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
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href="/producto/mybook-laptop-14-pulgadas-2-8k-oled" variant="primary" size="lg">
                    Agregar al carrito
                  </ButtonLink>
                  <ButtonLink href="/producto/mybook-laptop-14-pulgadas-2-8k-oled" variant="outline" size="lg">
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
              <div className="relative flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <div className="flex h-14 flex-1 items-center gap-3 rounded-md bg-surface px-4">
                  <Mail className="h-5 w-5 text-text-muted" />
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="h-full flex-1 bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </div>
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Suscribirse
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
