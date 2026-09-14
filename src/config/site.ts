import type { LinkProps } from "@tanstack/react-router";

export const SITE = {
  name: "GAVELLI",
  tagline: "Better for pets. Easier for you.",
  url: "https://gavelli.example",
  locale: "en-GB",
  currency: "GBP",
  contactEmail: "hello@gavelli.example",
} as const;

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

const PET_IMAGES = {
  hero: {
    src: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=85",
    alt: "Golden retriever resting comfortably at home",
  },
  dogs: {
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=85",
    alt: "Dog relaxing outdoors in natural light",
  },
  cats: {
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1400&q=85",
    alt: "Cat relaxing comfortably in a bright home",
  },
} as const;

export const PLACEHOLDER_IMAGES = {
  hero: { src: PET_IMAGES.hero.src, isPlaceholder: false },
  dogs: { src: PET_IMAGES.dogs.src, isPlaceholder: false },
  cats: { src: PET_IMAGES.cats.src, isPlaceholder: false },
} as const;

export interface FeaturedProductConfig {
  handle: string;
  fallbackQuery?: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  image: { src: string; alt: string; isPlaceholder: boolean };
  primaryCta: { label: string; to: NonNullable<LinkProps["to"]> };
  secondaryCta: { label: string; to: NonNullable<LinkProps["to"]> };
  points?: string[];
}

export const FEATURED_PRODUCT: FeaturedProductConfig = {
  handle: "paw-cleaner",
  fallbackQuery: "title:paw* OR product_type:Paw Cleaner",
  eyebrow: "For cleaner walks",
  headline: "Less mud. Less mess. Happier homes.",
  subheadline:
    "A simple way to clean muddy paws before they make it across your floors — made for everyday walks and real life with your dog.",
  image: {
    src: PLACEHOLDER_IMAGES.hero.src,
    alt: PET_IMAGES.hero.alt,
    isPlaceholder: false,
  },
  primaryCta: { label: "Shop the Paw Cleaner", to: "/shop" },
  secondaryCta: { label: "Explore the collection", to: "/shop" },
  points: [
    "Easy to use",
    "Rinse and reuse",
    "Made for everyday walks",
  ],
};

export const TRUST_BLOCKS = [
  { title: "Thoughtfully chosen", body: "Practical products for everyday pet life." },
  { title: "UK delivery", body: "Available delivery options shown at checkout." },
  { title: "Secure checkout", body: "Your payment is securely handled at checkout." },
  { title: "Made for real life", body: "Simple products that fit naturally into your routine." },
] as const;

export interface CollectionConfig {
  slug: "dogs" | "cats";
  title: string;
  intro: string;
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
      alt: PET_IMAGES.dogs.alt,
      isPlaceholder: false,
    },
  },
  {
    slug: "cats",
    title: "For Cats",
    intro: "Calm, practical pieces for indoor life.",
    query: "tag:cat OR tag:cats OR product_type:Cat OR title:cat*",
    image: {
      src: PLACEHOLDER_IMAGES.cats.src,
      alt: PET_IMAGES.cats.alt,
      isPlaceholder: false,
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
