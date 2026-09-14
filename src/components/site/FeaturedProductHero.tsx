import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DevPlaceholderBadge } from "@/components/site/DevPlaceholderBadge";
import { useCartStore } from "@/stores/cartStore";
import {
  fetchProductByHandle,
  fetchProducts,
  firstAvailableVariant,
  formatMoney,
  type ShopifyProduct,
} from "@/lib/shopify";
import type { FeaturedProductConfig } from "@/config/site";

async function resolveFeaturedProduct(
  config: FeaturedProductConfig,
): Promise<ShopifyProduct | null> {
  if (config.handle) {
    const byHandle = await fetchProductByHandle(config.handle);
    if (byHandle) return byHandle;
  }
  if (config.fallbackQuery) {
    const matches = await fetchProducts(1, config.fallbackQuery);
    if (matches.length > 0) return matches[0]!;
  }
  const any = await fetchProducts(1);
  return any.length > 0 ? any[0]! : null;
}

export function FeaturedProductHero({ config }: { config: FeaturedProductConfig }) {
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const { data: product, isLoading } = useQuery({
    queryKey: ["shopify", "featured", config.handle, config.fallbackQuery ?? null],
    queryFn: () => resolveFeaturedProduct(config),
    staleTime: 60_000,
  });

  const variant = product ? firstAvailableVariant(product) : undefined;
  const available = Boolean(product?.node.availableForSale && variant?.availableForSale);
  const usingFallbackProduct = Boolean(
    product && config.handle && product.node.handle !== config.handle,
  );

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your basket", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <section className="bg-secondary/50" aria-labelledby="featured-hero-heading">
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="order-2 lg:order-1">
          {config.eyebrow && <p className="eyebrow">{config.eyebrow}</p>}
          <h1
            id="featured-hero-heading"
            className="mt-4 max-w-2xl text-4xl leading-[1.04] sm:text-5xl lg:text-6xl"
          >
            {config.headline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            {config.subheadline}
          </p>

          <div className="mt-7 min-h-7">
            {isLoading ? (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading product details
              </span>
            ) : product ? (
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xl font-semibold">
                  {formatMoney(
                    (variant?.price ?? product.node.priceRange.minVariantPrice).amount,
                    (variant?.price ?? product.node.priceRange.minVariantPrice).currencyCode,
                  )}
                </span>
                <span className="text-sm text-muted-foreground">{product.node.title}</span>
                {!available && <span className="eyebrow">Currently unavailable</span>}
                {usingFallbackProduct && <DevPlaceholderBadge label="DEV FALLBACK PRODUCT" />}
              </div>
            ) : (
              <DevPlaceholderBadge label="DEV PLACEHOLDER — NO PRODUCT CONNECTED" />
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {product && available ? (
              <Button size="lg" onClick={handleAdd} disabled={isAdding} className="sm:w-auto">
                {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to basket"}
              </Button>
            ) : (
              <Button asChild size="lg" className="sm:w-auto">
                <Link to={config.primaryCta.to}>
                  {config.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="ghost">
              <Link to={config.secondaryCta.to}>{config.secondaryCta.label}</Link>
            </Button>
          </div>

          {config.points && config.points.length > 0 && (
            <ul className="mt-8 grid max-w-xl gap-2 text-sm text-muted-foreground sm:grid-cols-3 sm:gap-4">
              {config.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-1 lg:order-2">
          <figure className="relative overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-lift)]">
            {config.image.isPlaceholder && (
              <DevPlaceholderBadge className="absolute top-4 left-4" label="DEV PLACEHOLDER IMAGE" />
            )}
            <img
              src={config.image.src}
              alt={config.image.alt}
              width={1600}
              height={1200}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
