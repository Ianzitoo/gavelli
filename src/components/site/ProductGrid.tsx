import { useQuery } from "@tanstack/react-query";

import { ProductCard } from "@/components/site/ProductCard";
import { productsQueryOptions } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductGrid({
  first = 24,
  query,
  emptyMessage = "No products found",
}: {
  first?: number | undefined;
  query?: string | undefined;
  emptyMessage?: string | undefined;
}) {
  const { data, isLoading, isError } = useQuery(productsQueryOptions(first, query));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        We couldn&apos;t load the products just now. Please refresh the page and try again.
      </p>
    );
  }

  const products = data ?? [];

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-base font-medium">{emptyMessage}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please check back soon — we&apos;re adding products to this section.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
