/**
 * Editable site + merchandising configuration.
 *
 * Swapping the featured product, the shop filters or the trust strip copy is a
 * data change here — no component or layout code needs to be touched.
 */

import type { LinkProps } from "@tanstack/react-router";

import heroPawCleaner from "@/assets/placeholder-assets/hero-paw-cleaner.jpg";
import categoryDogs from "@/assets/placeholder-assets/category-dogs.jpg";
import categoryCats from "@/assets/placeholder-assets/category-cats.jpg";

export const SITE = {
  name: "PAW & CO.",
  tagline: "Carefully selected products for dogs and cats.",
  /** Update to the live domain once the store is published. */
  url: "https://pawandco.example",
  locale: "en-GB",
  currency: "GBP",
  contactEmail: "hello@pawandco.example",
} as const;

/** Shopify-hosted customer account area (never used for checkout). */
export const SHOP_ACCOUNT_URL = "https://eshbjn-c3.myshopify.com/account";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Dogs", to: "/dogs" },
  { label: "Cats", to: "/cats" },
  { label: "About Us", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

/**
 * Images used before real product/lifestyle photography is connected.
 * Everything in `placeholder-assets` is a development placeholder and is
 * flagged in the UI so it can never be mistaken for final launch imagery.
 */
export const PLACEHOLDER_IMAGES = {
  hero: { src: heroPawCleaner, isPlaceholder: true },
  dogs: { src: categoryDogs, isPlaceholder: true },
  cats: { src: categoryCats, isPlaceholder: true },
} as const;

export interface FeaturedProductConfig {
  /** Shopify product handle. Leave empty to fall back to the first product. */
  handle: string;
  /** Optional Storefront search query used when the handle is unavailable. */
  fallbackQuery?: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  image: { src: string; alt: string; isPlaceholder: boolean };
  primaryCta: { label: string; to: NonNullable<LinkProps["to"]> };
  secondaryCta: { label: string; to: NonNullable<LinkProps["to"]> };
  points?: string[];
}

/**
 * CURRENT HYPOTHESIS ONLY — the Paw Cleaner is a placeholder instance.
 * Change `handle` (and the copy below) to feature a different Shopify product.
 */
export const FEATURED_PRODUCT: FeaturedProductConfig = {
  handle: "paw-cleaner",
  fallbackQuery: "title:paw* OR product_type:Paw Cleaner",
  eyebrow: "Featured",
  headline: "Goodbye, muddy paw prints.",
  subheadline:
    "An easier way to clean up after walks — without turning the whole house into a mud zone.",
  image: {
    src: PLACEHOLDER_IMAGES.hero.src,
    alt: "A dog having its muddy paw cleaned in a hallway after a walk",
    isPlaceholder: true,
  },
  primaryCta: { label: "Shop Paw Cleaners", to: "/shop" },
  secondaryCta: { label: "Explore All Products", to: "/shop" },
  points: [
    "Made for everyday walks",
    "Quick to rinse and store",
    "Delivery options shown at checkout",
  ],
};

export const TRUST_BLOCKS = [
  { title: "Thoughtfully Selected", body: "Practical products for everyday life." },
  { title: "UK Delivery", body: "Delivery options shown at checkout." },
  { title: "Secure Checkout", body: "Safe and secure payment." },
  { title: "Here to Help", body: "Questions answered by email." },
] as const;

export interface CollectionConfig {
  slug: "dogs" | "cats";
  title: string;
  intro: string;
  /** Storefront API search syntax used to filter the catalogue. */
  query: string;
  image: { src: string; alt: string; isPlaceholder: boolean };
}

export const COLLECTIONS: CollectionConfig[] = [
  {
    slug: "dogs",
    title: "For Dogs",
    intro: "Everyday essentials for walks, mealtimes and rest.",
    query: "tag:dog OR tag:dogs OR product_type:Dog OR title:dog*",
    image: {
      src: PLACEHOLDER_IMAGES.dogs.src,
      alt: "A dog resting on a wooden floor in a bright home",
      isPlaceholder: true,
    },
  },
  {
    slug: "cats",
    title: "For Cats",
    intro: "Calm, practical pieces for indoor life.",
    query: "tag:cat OR tag:cats OR product_type:Cat OR title:cat*",
    image: {
      src: PLACEHOLDER_IMAGES.cats.src,
      alt: "A cat sitting on a linen sofa in a sunlit room",
      isPlaceholder: true,
    },
  },
];

export const FAQS = [
  {
    q: "Where do you deliver?",
    a: "We deliver within the United Kingdom. Available delivery options, timings and costs are shown at checkout before you pay.",
  },
  {
    q: "How much is delivery?",
    a: "Delivery options and prices are calculated at checkout based on your address and basket.",
  },
  {
    q: "Which payment methods can I use?",
    a: "Payment is handled by Shopify's secure hosted checkout. The payment methods available to you are shown there.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "If your order has not been dispatched, email us as soon as possible and we will do what we can. Include your order number.",
  },
  {
    q: "How do returns work?",
    a: "Our returns process is being finalised and will be published in full in our Terms & Conditions. Please contact us before returning anything.",
  },
  {
    q: "How do I get in touch?",
    a: "Use the contact page and we will reply by email.",
  },
] as const;
