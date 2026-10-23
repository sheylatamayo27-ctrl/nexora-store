import Link from "next/link";
import { Mail } from "lucide-react";
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
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { Reveal } from "@/lib/motion";
import { categories } from "@/data/categories";
import { featuredProducts, dealProducts } from "@/data/products";

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
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:px-0">
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
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeader
              title="Explorar más"
              subtitle="Descubre nuestras colecciones por categoría"
            />
          </Reveal>
          <Reveal>
            <PromoCarousel />
          </Reveal>
        </Container>
      </section>

      {/* Producto destacado (spotlight) */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-12 md:grid-cols-2 md:gap-12 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-subtle">
                <AssetImage folder="products" name="laptop" alt="MyBook Laptop 14 pulgadas" sizes="(max-width: 768px) 100vw, 50vw" />
                <Badge type="hot" className="absolute left-5 top-5">Más vendido</Badge>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-h2 text-text-primary sm:text-display-l">MyBook Laptop 14″</h2>
                <Rating rating={4.9} reviews={1240} size={16} />
                <p className="max-w-lg text-body-lg text-text-secondary">
                  Cuerpo ultrafino de aluminio, una impresionante pantalla 2.8K OLED y batería para
                  todo el día. Hecha para creadores y profesionales que trabajan desde cualquier lugar.
                </p>
                <Price price={85999} size="lg" />
                <ButtonLink
                  href="/producto/mybook-laptop-14-pulgadas-2-8k-oled"
                  variant="primary"
                  size="lg"
                  icon
                  className="mt-1 w-full sm:w-auto"
                >
                  Agregar al carrito
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Beneficios */}
      <ServiceFeatures />

      {/* Newsletter */}
      <section className="pt-14 pb-12 sm:pt-20">
        <Container>
          <Reveal>
            <div className="relative flex flex-col gap-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-500 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-lg flex-col gap-2 text-text-inverse">
                <span className="text-label-xs tracking-widest text-accent-500">NEWSLETTER</span>
                <h2 className="text-h2">Obtén 10% de descuento en tu primer pedido</h2>
                <p className="text-body-lg text-white/75">
                  Suscríbete para ofertas exclusivas, novedades y consejos tech. Sin spam, nunca.
                </p>
              </div>
              <form className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <label className="flex h-14 items-center gap-3 rounded-md bg-surface px-4 sm:w-72">
                  <Mail className="h-5 w-5 shrink-0 text-text-muted" />
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="h-full w-full bg-transparent text-body text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </label>
                <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
                  Suscribirse
                </Button>
              </form>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
