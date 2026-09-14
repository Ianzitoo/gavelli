import { toast } from "sonner";

/**
 * Shopify Storefront API client.
 * Shopify is the single source of truth for titles, descriptions, images,
 * variants, prices and availability. Nothing here is duplicated in the UI.
 */

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "eshbjn-c3.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "168050aa06135ef37b7adf18dd585b75";

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  image?: { url: string; altText: string | null } | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml?: string;
    handle: string;
    availableForSale: boolean;
    tags?: string[];
    productType?: string;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    compareAtPriceRange?: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: { edges: Array<{ node: ShopifyVariant }> };
    options: Array<{ name: string; values: string[] }>;
  };
}

const PRODUCT_FIELDS = `
  id
  title
  description
  descriptionHtml
  handle
  availableForSale
  tags
  productType
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        quantityAvailable
        image { url altText }
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description:
        "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }

  return data;
}

export async function fetchProducts(first = 24, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query: query ?? null });
  return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = data?.data?.product;
  return product ? ({ node: product } as ShopifyProduct) : null;
}

export function productsQueryOptions(first = 24, query?: string) {
  return {
    queryKey: ["shopify", "products", first, query ?? null] as const,
    queryFn: () => fetchProducts(first, query),
    staleTime: 60_000,
  };
}

export function productQueryOptions(handle: string) {
  return {
    queryKey: ["shopify", "product", handle] as const,
    queryFn: () => fetchProductByHandle(handle),
    staleTime: 60_000,
  };
}

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function formatMoney(amount: string | number, currencyCode = "GBP") {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(value)) return "";
  if (currencyCode === "GBP") return gbpFormatter.format(value);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: currencyCode }).format(value);
}

export function firstAvailableVariant(product: ShopifyProduct): ShopifyVariant | undefined {
  const variants = product.node.variants.edges.map((e) => e.node);
  return variants.find((v) => v.availableForSale) ?? variants[0];
}
