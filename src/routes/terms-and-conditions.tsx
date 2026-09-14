import { createFileRoute } from "@tanstack/react-router";

import { LegalDraft } from "@/components/site/LegalDraft";
import { SITE } from "@/config/site";

const title = "Terms & Conditions (Draft) — PAW & CO.";
const description =
  "Draft terms and conditions outline for PAW & CO. This page is pending legal review and is not final.";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/terms-and-conditions` }],
  }),
  component: () => (
    <LegalDraft
      title="Terms & Conditions"
      intro="Structural outline of the terms a UK pet ecommerce store normally needs. All figures, timescales and wording must be decided and reviewed before publication."
      sections={[
        {
          heading: "1. About us",
          points: [
            "Legal entity, company number and registered address — to be confirmed.",
            "How to contact us about an order — to be confirmed.",
          ],
        },
        {
          heading: "2. Placing an order",
          points: [
            "How a contract is formed and when it is accepted — to be drafted.",
            "Product descriptions, images and pricing accuracy — to be drafted.",
            "What happens if an item is out of stock or priced incorrectly — to be drafted.",
          ],
        },
        {
          heading: "3. Prices and payment",
          points: [
            "Prices are shown in GBP (£).",
            "Whether prices include VAT, and VAT registration status — to be confirmed.",
            "Accepted payment methods, as offered by the checkout provider — to be documented.",
          ],
        },
        {
          heading: "4. Delivery",
          points: [
            "Delivery areas, services and costs shown at checkout — to be documented.",
            "Estimated dispatch and delivery timescales — to be confirmed.",
            "When risk and ownership pass to the customer — to be drafted.",
          ],
        },
        {
          heading: "5. Cancellation, returns and refunds",
          points: [
            "Statutory cancellation rights under UK consumer law — wording to be drafted.",
            "Return window, condition requirements and return costs — to be decided.",
            "Refund method and timescale — to be decided.",
            "Any exclusions (for example hygiene items) — to be decided.",
          ],
        },
        {
          heading: "6. Faulty or incorrect items",
          points: [
            "Process for reporting a fault — to be drafted.",
            "Remedies available under the Consumer Rights Act 2015 — wording to be drafted.",
          ],
        },
        {
          heading: "7. Product use and safety",
          points: [
            "Guidance that products should be used as intended and supervised where appropriate — to be drafted.",
            "Any age, size or animal-suitability notes — to be confirmed per product.",
          ],
        },
        {
          heading: "8. Liability, governing law and complaints",
          points: [
            "Limitation of liability wording — to be drafted by a professional.",
            "Governing law and jurisdiction — to be confirmed.",
            "Complaints and dispute resolution process — to be confirmed.",
          ],
        },
      ]}
    />
  ),
});
