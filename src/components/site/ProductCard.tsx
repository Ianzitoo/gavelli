import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { firstAvailableVariant, formatMoney, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const node = product.node;
  const image = node.images.edges[0]?.node;
  const variant = firstAvailableVariant(product);
  const soldOut = !node.availableForSale || !variant?.availableForSale;
  const price = variant?.price ?? node.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice;
  const onOffer =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) ? compareAt : null;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your basket", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      <Link
        to="/product/$handle"
        params={{ handle: node.handle }}
        className="block overflow-hidden bg-muted"
      >
        <div className="aspect-square w-full overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? node.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              No image available
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1">
          <h3 className="text-base leading-snug font-medium">
            <Link
              to="/product/$handle"
              params={{ handle: node.handle }}
              className="transition-colors hover:text-primary"
            >
              {node.title}
            </Link>
          </h3>
          {node.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{node.description}</p>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold">
            {formatMoney(price.amount, price.currencyCode)}
          </span>
          {onOffer && (
            <span className="text-sm text-muted-foreground line-through">
              {formatMoney(onOffer.amount, onOffer.currencyCode)}
            </span>
          )}
          {soldOut && <span className="eyebrow ml-auto">Out of stock</span>}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isLoading || !variant || soldOut}
          className="w-full"
          variant={soldOut ? "secondary" : "default"}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : soldOut ? (
            "Out of stock"
          ) : (
            "Add to basket"
          )}
        </Button>
      </div>
    </article>
  );
}
