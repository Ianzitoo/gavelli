import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";

import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );
  const currency = items[0]?.price.currencyCode ?? "GBP";

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open basket">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-[10px] text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl">Your basket</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Your basket is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your basket`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col px-4 pt-4">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Your basket is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <ul className="space-y-4">
                  {items.map((item) => {
                    const image = item.product.node.images?.edges?.[0]?.node;
                    return (
                      <li key={item.variantId} className="flex gap-4 py-2">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          {image && (
                            <img
                              src={image.url}
                              alt={image.altText ?? item.product.node.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-medium">
                            {item.product.node.title}
                          </h3>
                          {item.selectedOptions.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {item.selectedOptions.map((o) => o.value).join(" • ")}
                            </p>
                          )}
                          <p className="mt-1 text-sm font-semibold">
                            {formatMoney(item.price.amount, item.price.currencyCode)}
                          </p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            aria-label={`Remove ${item.product.node.title}`}
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-7 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex-shrink-0 space-y-3 border-t bg-background pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-semibold">
                    {formatMoney(totalPrice, currency)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Delivery and taxes are calculated at checkout.
                </p>
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Checkout securely
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
