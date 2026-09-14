import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/site/ProductGrid";
import { DevPlaceholderBadge } from "@/components/site/DevPlaceholderBadge";
import { Button } from "@/components/ui/button";
import { COLLECTIONS, PLACEHOLDER_IMAGES, SITE } from "@/config/site";

const title = "Gavelli — Better everyday life, for you and your pet.";
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
    <>
      <section className="container-page pt-6 pb-14 sm:pt-8 sm:pb-20 lg:pb-24" aria-labelledby="home-hero">
        <div className="grid overflow-hidden rounded-[2rem] bg-secondary lg:grid-cols-[1fr_1.08fr]">
          <div className="flex flex-col justify-center px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <p className="eyebrow">Thoughtfully chosen for everyday life</p>
            <h1 id="home-hero" className="mt-4 max-w-xl text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
              Better everyday life, for you and your pet.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Practical, considered essentials for the little moments that make life with a pet better.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">
                  Shop all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dogs">Explore for dogs</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[360px] bg-muted sm:min-h-[460px] lg:min-h-[560px]">
            <DevPlaceholderBadge className="absolute top-5 left-5 z-10" label="DEV PLACEHOLDER IMAGE" />
            <img
              src={PLACEHOLDER_IMAGES.hero.src}
              alt="Lifestyle image placeholder for a pet at home"
              width={1200}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-18 lg:py-20" aria-labelledby="intro-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The Gavelli approach</p>
          <h2 id="intro-heading" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Thoughtfully chosen for everyday life.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            We look for simple, useful products that solve everyday pet-owner problems and feel natural in your home and routine.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-18" aria-labelledby="shop-by-pet">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Shop by pet</p>
            <h2 id="shop-by-pet" className="mt-3 text-3xl sm:text-4xl">Made for life with them.</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              to={collection.slug === "dogs" ? "/dogs" : "/cats"}
              className="group relative overflow-hidden rounded-[1.5rem] bg-muted shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
            >
              {collection.image.isPlaceholder && (
                <DevPlaceholderBadge className="absolute top-4 left-4 z-10" label="DEV PLACEHOLDER IMAGE" />
              )}
              <img
                src={collection.image.src}
                alt={collection.image.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent p-7 pt-20">
                <h3 className="font-display text-3xl text-background">{collection.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-background/85">{collection.intro}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-background">
                  Shop {collection.title.replace("For ", "")} <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-14 sm:py-18 lg:py-20" aria-labelledby="featured-products">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Everyday essentials</p>
            <h2 id="featured-products" className="mt-3 text-3xl sm:text-4xl">Useful things, chosen with care.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              A considered selection of practical products for the routines you share every day.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">
              Shop all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8">
          <ProductGrid first={4} />
        </div>
      </section>

      <section className="container-page py-14 sm:py-18 lg:py-20" aria-labelledby="real-life">
        <div className="grid items-center overflow-hidden rounded-[2rem] bg-secondary lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[360px] lg:min-h-[500px]">
            <DevPlaceholderBadge className="absolute top-5 left-5 z-10" label="DEV PLACEHOLDER IMAGE" />
            <img
              src={PLACEHOLDER_IMAGES.dogs.src}
              alt="Lifestyle image placeholder showing a dog at home"
              width={1200}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
            <p className="eyebrow">Made for real life</p>
            <h2 id="real-life" className="mt-4 max-w-lg text-3xl sm:text-4xl">
              The best essentials are the ones that simply fit in.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              From muddy walks to quiet evenings at home, Gavelli focuses on practical details that make everyday routines feel a little easier.
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/about">
                Why Gavelli <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-background" aria-labelledby="principles">
        <div className="container-page py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Gavelli</p>
            <h2 id="principles" className="mt-4 text-3xl sm:text-4xl">Simple principles. Better choices.</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {[
              ["Practical", "Products should earn their place in your routine."],
              ["Simple", "Useful details without unnecessary fuss."],
              ["Everyday", "Made to feel natural in real homes and real life."],
            ].map(([heading, body]) => (
              <div key={heading} className="text-center sm:text-left">
                <h3 className="text-lg font-medium">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-18 lg:py-20" aria-labelledby="paw-cleaner-feature">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-muted">
            <DevPlaceholderBadge className="absolute top-5 left-5 z-10" label="DEV PLACEHOLDER IMAGE" />
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
            <p className="eyebrow">For cleaner walks</p>
            <h2 id="paw-cleaner-feature" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Less mud. Less mess. Happier homes.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              A simple solution for muddy paws before they make it across your floors. Explore the Paw Cleaner and see how it fits into your everyday walk routine.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/shop">
                Shop the Paw Cleaner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground" aria-labelledby="home-close">
        <div className="container-page py-16 text-center sm:py-20">
          <p className="text-xs uppercase tracking-[0.16em] opacity-75">Gavelli</p>
          <h2 id="home-close" className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Better for pets. Easier for you.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
            Thoughtful essentials for the everyday moments you share.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/shop">
              Explore the collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
