import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { FeaturedProductHero } from "@/components/site/FeaturedProductHero";
import { ProductGrid } from "@/components/site/ProductGrid";
import { DevPlaceholderBadge } from "@/components/site/DevPlaceholderBadge";
import { Button } from "@/components/ui/button";
import { COLLECTIONS, FEATURED_PRODUCT, SITE, TRUST_BLOCKS } from "@/config/site";

const title = "PAW & CO. — Practical products for dogs and cats";
const description =
  "Carefully selected, practical products for dogs and cats. Prices in GBP, secure checkout and UK delivery options shown at checkout.";

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

      <section className="container-page py-16 lg:py-20" aria-labelledby="shop-by-pet">
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
        <div className="mb-8">
          <p className="eyebrow">The range</p>
          <h2 id="latest-products" className="mt-3 text-3xl sm:text-4xl">
            Everything in the shop
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Product details, prices and availability come straight from our store.
          </p>
        </div>
        <ProductGrid first={6} />
      </section>
    </>
  );
}
