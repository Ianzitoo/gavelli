import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney, productQueryOptions, type ShopifyVariant } from "@/lib/shopify";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => {
    const url = `${SITE.url}/product/${params.handle}`;
    return {
      meta: [
        { title: `Product — PAW & CO.` },
        {
          name: "description",
          content: "Product details, pricing and availability from the PAW & CO. store.",
        },
        { property: "og:title", content: "Product — PAW & CO." },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading, isError } = useQuery(productQueryOptions(handle));
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const variants = useMemo<ShopifyVariant[]>(
    () => product?.node.variants.edges.map((e) => e.node) ?? [],
    [product],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const selected = variants.find((v) => v.id === selectedId) ?? variants.find((v) => v.availableForSale) ?? variants[0];

  if (isLoading) {
    return (
      <div className="container-page grid gap-10 py-14 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl">This product isn&apos;t available</h1>
        <p className="mt-3 text-muted-foreground">
          It may have sold out or been removed from the shop.
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  const node = product.node;
  const images = node.images.edges.map((e) => e.node);
  const price = selected?.price ?? node.priceRange.minVariantPrice;
  const compareAt = selected?.compareAtPrice;
  const onOffer =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) ? compareAt : null;
  const soldOut = !node.availableForSale || !selected?.availableForSale;

  const addSelected = async () => {
    if (!selected) return;
    await addItem({
      product,
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity: 1,
      selectedOptions: selected.selectedOptions || [],
    });
  };

  const handleAddToCart = async () => {
    await addSelected();
    toast.success("Added to your basket", { description: node.title, position: "top-center" });
  };

  const handleBuyNow = async () => {
    await addSelected();
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  };

  return (
    <div className="container-page py-10 lg:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{node.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-soft)]">
            {images[activeImage] ? (
              <img
                src={images[activeImage].url}
                alt={images[activeImage].altText ?? node.title}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center text-sm text-muted-foreground">
                No image available
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === activeImage}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition-colors ${
                    index === activeImage ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText ?? `${node.title} image ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl">{node.title}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">
              {formatMoney(price.amount, price.currencyCode)}
            </span>
            {onOffer && (
              <span className="text-muted-foreground line-through">
                {formatMoney(onOffer.amount, onOffer.currencyCode)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {soldOut ? "Currently out of stock" : "In stock"} · Delivery calculated at checkout
          </p>

          {variants.length > 1 && (
            <fieldset className="mt-8">
              <legend className="eyebrow">Options</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedId(variant.id)}
                    disabled={!variant.availableForSale}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      selected?.id === variant.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isAdding || soldOut}
              className="sm:flex-1"
            >
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to basket"}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleBuyNow}
              disabled={isAdding || soldOut}
              className="sm:flex-1"
            >
              Buy now
            </Button>
          </div>

          {node.description && (
            <div className="mt-10">
              <h2 className="text-lg font-medium">Product details</h2>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {node.description}
              </p>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            <p>
              Delivery options and prices are shown at checkout. Payment is handled by our secure
              hosted checkout.
            </p>
          </div>

          <section className="mt-10" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="text-lg font-medium">
              Reviews
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">No reviews yet.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
