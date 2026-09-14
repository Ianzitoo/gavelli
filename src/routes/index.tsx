import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/site/ProductGrid";
import { Button } from "@/components/ui/button";
import { COLLECTIONS, SITE } from "@/config/site";

const title = "Gavelli — Thoughtful essentials for life with your pet.";
const description =
  "Thoughtfully chosen pet essentials for everyday life. Explore practical products for dogs and cats from Gavelli.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/` }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section className="container-page pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-secondary px-7 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow">Thoughtfully chosen for everyday life</p>
            <h1 className="mt-5 text-4xl leading-[1.04] sm:text-5xl lg:text-[4.75rem]">
              Better everyday life, for you and your pet.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Practical, considered essentials for the everyday moments you share.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/shop">Shop all <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/dogs">Shop for dogs</Link></Button>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border-[3rem] border-primary/10 sm:h-[28rem] sm:w-[28rem]" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-primary/5" />
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Gavelli approach</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Thoughtfully chosen. Made for everyday life.</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            We focus on simple, useful products that solve everyday pet-owner problems and feel natural in your home and routine.
          </p>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="shop-by-pet">
        <div className="flex items-end justify-between gap-6">
          <div><p className="eyebrow">Shop by pet</p><h2 id="shop-by-pet" className="mt-3 text-3xl sm:text-4xl">For the ones you love.</h2></div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/shop">View all <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {COLLECTIONS.map((collection) => (
            <Link key={collection.slug} to={`/${collection.slug}`} className="group relative isolate min-h-[420px] overflow-hidden rounded-[1.5rem] bg-muted">
              <img src={collection.image.src} alt={collection.image.alt} width={1400} height={1050} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <div className="relative flex min-h-[420px] flex-col justify-end p-7 text-white sm:p-10">
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">Collection {collection.slug === "dogs" ? "01" : "02"}</p>
                <h3 className="mt-2 text-3xl sm:text-4xl">{collection.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">{collection.intro}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium">Explore {collection.slug} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-background" aria-labelledby="featured-products">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-6">
            <div><p className="eyebrow">Everyday essentials</p><h2 id="featured-products" className="mt-3 text-3xl sm:text-4xl">Useful things, chosen with care.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A considered selection of practical products for the routines you share every day.</p></div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/shop">Shop all <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-8"><ProductGrid first={4} /></div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="real-life">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-border bg-secondary lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex min-h-[300px] items-center justify-center border-b border-border/70 p-10 lg:min-h-[460px] lg:border-b-0 lg:border-r"><div className="text-center"><p className="text-7xl leading-none text-primary/15 sm:text-8xl">01</p><p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Everyday, considered</p></div></div>
          <div className="flex items-center px-7 py-12 sm:px-12 lg:px-16"><div className="max-w-lg"><p className="eyebrow">Made for real life</p><h2 id="real-life" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">The best essentials simply fit in.</h2><p className="mt-5 text-base leading-7 text-muted-foreground">From muddy walks to quiet evenings at home, Gavelli focuses on practical details that make everyday routines feel a little easier.</p><Button asChild variant="outline" className="mt-7"><Link to="/about">Why Gavelli <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="principles">
        <div className="border-t border-border/70 pt-16 sm:pt-20 lg:pt-24"><div className="max-w-2xl"><p className="eyebrow">Why Gavelli</p><h2 id="principles" className="mt-4 text-3xl sm:text-4xl">Simple principles. Better choices.</h2></div><div className="mt-10 grid gap-8 border-y border-border/70 py-8 sm:grid-cols-3 sm:gap-10">{[["01", "Practical", "Products should earn their place in your routine."],["02", "Simple", "Useful details without unnecessary fuss."],["03", "Everyday", "Made to feel natural in real homes and real life."]].map(([number, heading, body]) => (<div key={heading}><p className="text-xs tracking-[0.16em] text-muted-foreground">{number}</p><h3 className="mt-3 text-xl">{heading}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{body}</p></div>))}</div></div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="paw-cleaner-feature">
        <div className="rounded-[1.75rem] bg-primary px-7 py-12 text-primary-foreground sm:px-12 sm:py-16 lg:px-16"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[0.16em] opacity-70">A Gavelli favourite</p><h2 id="paw-cleaner-feature" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Less mud. Less mess. Happier homes.</h2><p className="mt-5 max-w-xl text-base leading-7 opacity-80">Discover the Paw Cleaner — a simple solution for muddy paws before they make it across your floors.</p><Button asChild size="lg" variant="secondary" className="mt-8"><Link to="/shop">Discover the Paw Cleaner <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></div>
      </section>

      <section className="bg-primary text-primary-foreground"><div className="container-page py-16 text-center sm:py-20"><p className="text-xs uppercase tracking-[0.16em] opacity-75">Gavelli</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">Better for pets. Easier for you.</h2><Button asChild size="lg" variant="secondary" className="mt-8"><Link to="/shop">Explore the collection <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></section>
    </main>
  );
}
