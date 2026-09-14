import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

const title = "About Us — PAW & CO.";
const description =
  "PAW & CO. is a new UK pet brand selling carefully selected, practical products for dogs and cats.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-14 lg:py-20">
      <p className="eyebrow">About us</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">A new UK pet brand, built around everyday life.</h1>

      <div className="mt-8 space-y-5 text-muted-foreground">
        <p>
          PAW & CO. is a new brand. We sell a small, carefully selected range of practical products
          for dogs and cats — things that earn their place in a normal household rather than sit in
          a cupboard.
        </p>
        <p>
          Because we are just starting out, we would rather be clear than impressive. We don&apos;t
          publish reviews we haven&apos;t received, awards we haven&apos;t won or numbers we
          can&apos;t stand behind. What you see on a product page is the product information itself:
          what it is, what it costs in pounds, and whether it is in stock.
        </p>
        <p>
          Our range grows slowly and deliberately. If something isn&apos;t genuinely useful, it
          doesn&apos;t go in the shop.
        </p>
      </div>

      <h2 className="mt-12 text-2xl">How we work</h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-foreground">Clear product information</dt>
          <dd className="mt-2 text-sm text-muted-foreground">
            Prices, options and availability come straight from our store, so what you see is
            current.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Secure checkout</dt>
          <dd className="mt-2 text-sm text-muted-foreground">
            Payment is handled by a secure hosted checkout. We never see your card details.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Prices in GBP</dt>
          <dd className="mt-2 text-sm text-muted-foreground">
            Everything is priced in pounds, with delivery options shown before you pay.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Easy to reach</dt>
          <dd className="mt-2 text-sm text-muted-foreground">
            Questions about an order are answered by email — no phone menus.
          </dd>
        </div>
      </dl>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/shop">Browse the shop</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
