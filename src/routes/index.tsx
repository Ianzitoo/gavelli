import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { FeaturedProductHero } from "@/components/site/FeaturedProductHero";
import { ProductGrid } from "@/components/site/ProductGrid";
import { DevPlaceholderBadge } from "@/components/site/DevPlaceholderBadge";
import { Button } from "@/components/ui/button";
import { COLLECTIONS, FEATURED_PRODUCT, SITE, TRUST_BLOCKS } from "@/config/site";

const title = "Gavelli — Better for pets. Easier for you.";
const description =
  "Thoughtfully chosen essentials for dogs and cats. Prices in GBP, secure checkout, and UK delivery options shown at checkout.";

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
      <FeaturedProductHero config={FEATURED_PRODUCT} />

      <section aria-label="What we stand for" className="border-y border-border/70 bg-background">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_BLOCKS.map((block) => (
            <div key={block.title}>
              <h2 className="text-base font-medium">{block.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 lg:py-20" aria-labelledby="problem-solution">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Made for real life</p>
            <h2 id="problem-solution" className="mt-3 text-3xl sm:text-4xl">
              The little messes add up.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Muddy paws, wet floors and the towel by the door. The everyday moments are
              small, but a simple solution can make them easier.
            </p>
            <ul className="mt-7 space-y-3 text-sm">
              {[
                "Easy to use after everyday walks",
                "Quick to rinse and put away",
                "A simple addition to your routine",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-secondary/70 p-8 sm:p-10">
            <p className="eyebrow">A simpler routine</p>
            <h3 className="mt-3 text-2xl sm:text-3xl">From muddy paws to cleaner floors.</h3>
            <ol className="mt-7 space-y-5 text-sm text-muted-foreground">
              {["Add a little water", "Gently clean each paw", "Rinse, empty and store"].map(
                (step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 lg:pb-20" aria-labelledby="shop-by-pet">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Shop by pet</p>
            <h2 id="shop-by-pet" className="mt-3 text-3xl sm:text-4xl">
              Dogs and cats, sorted.
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">
              View everything <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              to={collection.slug === "dogs" ? "/dogs" : "/cats"}
              className="group relative overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              {collection.image.isPlaceholder && (
                <DevPlaceholderBadge className="absolute top-4 left-4" label="DEV PLACEHOLDER IMAGE" />
              )}
              <img
                src={collection.image.src}
                alt={collection.image.alt}
                width={1200}
                height={1200}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
                <h3 className="font-display text-2xl text-background">{collection.title}</h3>
                <p className="mt-1 max-w-xs text-sm text-background/85">{collection.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-20" aria-labelledby="latest-products">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Thoughtfully chosen</p>
            <h2 id="latest-products" className="mt-3 text-3xl sm:text-4xl">
              Everyday essentials, chosen with care.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Simple, practical products designed to fit naturally into life with your pet.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">
              Shop all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ProductGrid first={6} />
      </section>

      <section className="bg-primary text-primary-foreground" aria-labelledby="brand-promise">
        <div className="container-page py-16 text-center sm:py-20">
          <p className="text-xs uppercase tracking-[0.16em] opacity-75">The Gavelli promise</p>
          <h2 id="brand-promise" className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Better for pets. Easier for you.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
            We believe everyday pet products should be useful, simple and genuinely pleasant
            to live with.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/shop">
              Explore Gavelli <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
