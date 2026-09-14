import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/site/ProductGrid";
import { DevPlaceholderBadge } from "@/components/site/DevPlaceholderBadge";
import { Button } from "@/components/ui/button";
import { COLLECTIONS, PLACEHOLDER_IMAGES, SITE } from "@/config/site";

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
        <div className="grid min-h-[620px] overflow-hidden rounded-[1.75rem] bg-secondary lg:grid-cols-2">
          <div className="flex items-center px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="max-w-xl">
              <p className="eyebrow">Thoughtfully chosen for everyday life</p>
              <h1 className="mt-5 text-4xl leading-[1.04] sm:text-5xl lg:text-[4.25rem]">
                Better everyday life, for you and your pet.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Practical, considered essentials for the everyday moments you share.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/shop">
                    Shop all <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/dogs">Shop for dogs</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[420px] bg-muted lg:min-h-0">
            <DevPlaceholderBadge className="absolute left-5 top-5 z-10" label="DEV PLACEHOLDER IMAGE" />
            <img
              src={PLACEHOLDER_IMAGES.hero.src}
              alt="Lifestyle image placeholder for Gavelli"
              width={1200}
              height={1400}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Gavelli approach</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Thoughtfully chosen. Made for everyday life.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            We focus on simple, useful products that solve everyday pet-owner problems and feel natural in your home and routine.
          </p>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="shop-by-pet">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Shop by pet</p>
            <h2 id="shop-by-pet" className="mt-3 text-3xl sm:text-4xl">For the ones you love.</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              to={collection.slug === "dogs" ? "/dogs" : "/cats"}
              className="group relative overflow-hidden rounded-[1.5rem] bg-muted"
            >
              {collection.image.isPlaceholder && (
                <DevPlaceholderBadge className="absolute left-4 top-4 z-10" label="DEV PLACEHOLDER IMAGE" />
              )}
              <img
                src={collection.image.src}
                alt={collection.image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[1.15/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-7 pt-24">
                <h3 className="text-3xl text-background">{collection.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-background/85">{collection.intro}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-background">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-background" aria-labelledby="featured-products">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Everyday essentials</p>
              <h2 id="featured-products" className="mt-3 text-3xl sm:text-4xl">Useful things, chosen with care.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                A considered selection of practical products for the routines you share every day.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/shop">Shop all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8">
            <ProductGrid first={4} />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="real-life">
        <div className="grid overflow-hidden rounded-[1.75rem] bg-secondary lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[520px]">
            <DevPlaceholderBadge className="absolute left-5 top-5 z-10" label="DEV PLACEHOLDER IMAGE" />
            <img
              src={PLACEHOLDER_IMAGES.dogs.src}
              alt="Lifestyle image placeholder showing a dog at home"
              width={1200}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center px-7 py-12 sm:px-12 lg:px-16">
            <div className="max-w-lg">
              <p className="eyebrow">Made for real life</p>
              <h2 id="real-life" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                The best essentials simply fit in.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                From muddy walks to quiet evenings at home, Gavelli focuses on practical details that make everyday routines feel a little easier.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/about">Why Gavelli <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="principles">
        <div className="border-t border-border/70 pt-16 sm:pt-20 lg:pt-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Gavelli</p>
            <h2 id="principles" className="mt-4 text-3xl sm:text-4xl">Simple principles. Better choices.</h2>
          </div>
          <div className="mt-10 grid gap-8 border-y border-border/70 py-8 sm:grid-cols-3 sm:gap-10">
            {[
              ["01", "Practical", "Products should earn their place in your routine."],
              ["02", "Simple", "Useful details without unnecessary fuss."],
              ["03", "Everyday", "Made to feel natural in real homes and real life."],
            ].map(([number, heading, body]) => (
              <div key={heading}>
                <p className="text-xs tracking-[0.16em] text-muted-foreground">{number}</p>
                <h3 className="mt-3 text-xl">{heading}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="paw-cleaner-feature">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-muted">
            <DevPlaceholderBadge className="absolute left-5 top-5 z-10" label="DEV PLACEHOLDER IMAGE" />
            <img
              src={PLACEHOLDER_IMAGES.hero.src}
              alt="Lifestyle image placeholder for the featured paw cleaner"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">A Gavelli favourite</p>
            <h2 id="paw-cleaner-feature" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Less mud. Less mess. Happier homes.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Discover the Paw Cleaner — a simple solution for muddy paws before they make it across your floors.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/shop">Discover the Paw Cleaner <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-16 text-center sm:py-20">
          <p className="text-xs uppercase tracking-[0.16em] opacity-75">Gavelli</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">Better for pets. Easier for you.</h2>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/shop">Explore the collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
