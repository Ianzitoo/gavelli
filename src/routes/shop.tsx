import { createFileRoute } from "@tanstack/react-router";

import { ProductGrid } from "@/components/site/ProductGrid";
import { SITE } from "@/config/site";

const title = "Shop all — PAW & CO.";
const description =
  "Browse every PAW & CO. product for dogs and cats. Prices shown in GBP with secure checkout.";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" && search.q.length > 0 ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/shop` }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();

  return (
    <div className="container-page py-14 lg:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{q ? `Results for “${q}”` : "All products"}</h1>
        <p className="mt-4 text-muted-foreground">
          Every product detail, price and stock level is taken directly from our store.
        </p>
      </header>

      <div className="mt-10">
        <ProductGrid
          first={48}
          query={q}
          emptyMessage={q ? `No products match “${q}”` : "No products found"}
        />
      </div>
    </div>
  );
}
