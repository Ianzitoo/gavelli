# Paw & Co. Storefront

Crie um novo projeto com Shopify ativado. Create a premium, modern, trustworthy UK pet ecommerce store for a new pet brand, built as a headless storefront connected to Shopify via Lovable's native Shopify connector (Storefront API).

Use Shopify as the commerce backend for products, variants, inventory, cart, checkout and payments. Do not build a custom payment or checkout system.

IMPORTANT — PRODUCT FLEXIBILITY:

No final winning product has been validated yet. The current working hypothesis is the Paw Cleaner as lead product, but this is NOT confirmed. Do not permanently hardcode any product as the brand-defining hero. Every section that references a specific product must be built so that product can be swapped for another Shopify product without redesigning the section or the site. Use the Paw Cleaner as the current placeholder instance so v1 has real, concrete content — but structure the underlying components generically so swapping the data swaps the section automatically.

## TECHNICAL RULES (STRICT — DO NOT DEVIATE)

1. SOURCE OF TRUTH: Once Shopify is connected, Shopify is the single source of truth for product titles, descriptions, images, variants, prices, compare-at prices, availability and inventory. Do not duplicate or hardcode these values in frontend code.

2. NO FAKE PRODUCTS: If the Shopify catalogue is empty or unavailable during development, show clearly labelled development placeholders only (e.g. a visible "DEV PLACEHOLDER" badge). Never present placeholder products, prices or images to customers as if real.

3. GRACEFUL DEGRADATION: All product-driven sections must gracefully handle a product being unpublished, out of stock or removed from Shopify. Never hardcode product IDs without making them configurable.

4. CONFIGURABLE HERO: Create a reusable `FeaturedProductHero` component whose product, image, headline, subheadline, CTA label and CTA destination are configurable. The current configuration uses the Paw Cleaner, but changing the featured Shopify product must require changing configuration/data only — never component code or layout.

5. CART/CHECKOUT: Add-to-cart must use Shopify's Storefront API cart functionality. Buy Now adds the selected variant to the Shopify cart and proceeds to Shopify's hosted checkout. Never create a custom checkout, payment form or payment processing flow.

6. SEO FOUNDATIONS: Build editable page titles, meta descriptions, canonical URLs, semantic HTML, accessible headings, descriptive image alt text and clean URLs. Do not generate unsupported claims in SEO metadata.

7. LEGAL PAGES: Privacy Policy, Terms & Conditions and Cookie Policy pages must be created as clearly marked DRAFT placeholders (e.g. "[DRAFT — PENDING LEGAL REVIEW]") with structural sections (what a UK pet ecommerce store typically needs to cover) but no invented final legal text, no invented company registration details, and no assumptions about specific data practices, cookie usage or return windows. These require human/professional review before publishing.

8. PLACEHOLDER IMAGERY: Any hero, featured-product or editorial image used before real product photography is connected must be visually or structurally flagged as a development placeholder (e.g. stored in a clearly named `placeholder-assets` folder / tagged in a config file), so it cannot be mistaken for final launch imagery.

## BRAND

Placeholder name: "PAW & CO."

Sells carefully selected, practical products for dogs and cats. Must feel like a legitimate modern UK pet brand, not a generic dropshipping store. British English. Currency: GBP (£).

Never mention (customer-facing): Brazil, dropshipping, suppliers, AliExpress, CJdropshipping, China, sourcing, or product origin.

Never fabricate: reviews, ratings, awards, certifications, statistics, customer counts, UK warehouse claims, "trusted by thousands," guarantees, fictional company history, fictional founders, fake testimonials. Build trust through design, clarity, transparency and real product information only.

## VISUAL IDENTITY

Modern UK pet-lifestyle aesthetic: premium but accessible, warm, minimal, trustworthy, sophisticated, practical, contemporary. Warm neutral backgrounds, restrained natural colours, strong typography, generous whitespace, subtle rounded corners and shadows, tasteful micro-interactions, high-quality lifestyle photography.

Avoid: cartoonish pet-store clichés, excessive paw-print motifs, oversaturated colours, generic dropshipping layouts, clutter, heavy gradients, flashy animation, fake urgency, cheap promotional elements.

Mobile-first — mobile gets the same design attention as desktop.

## HOMEPAGE

1. **Sticky header** — Logo "PAW & CO." Nav: Home, Shop, Dogs, Cats, About Us, FAQ, Contact. Right: Search, Account, Cart. Mobile: hamburger + logo + cart.

2. **Hero** (uses `FeaturedProductHero` component, rule #4) — currently configured with the Paw Cleaner. Lifestyle image: dog with muddy paws being cleaned. Headline: "Goodbye, muddy paw prints." Subtext: "An easier way to clean up after walks — without turning the whole house into a mud zone." Primary CTA: "Shop Paw Cleaners". Secondary CTA: "Explore All Products".

3. **Trust strip** — 4 blocks, no unsupported claims: "Thoughtfully Selected" / "Practical products for everyday life." — "UK Delivery" / "Delivery options shown at checkout." — "Secure Checkout" / "Safe and secure payment." —

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gavelli.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5fd95b72-a42a-40ba-a092-91395555b38b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
