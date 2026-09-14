import { createFileRoute } from "@tanstack/react-router";

import { LegalDraft } from "@/components/site/LegalDraft";
import { SITE } from "@/config/site";

const title = "Privacy Policy (Draft) — PAW & CO.";
const description =
  "Draft privacy policy outline for PAW & CO. This page is pending legal review and is not final.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/privacy-policy` }],
  }),
  component: () => (
    <LegalDraft
      title="Privacy Policy"
      intro="Outline of the sections a UK pet ecommerce store normally needs to cover. The final wording must be written and verified before launch."
      sections={[
        {
          heading: "1. Who we are",
          points: [
            "Trading name, registered company name and registration number — to be confirmed.",
            "Registered address and contact details for privacy enquiries — to be confirmed.",
            "Whether a data protection officer or ICO registration applies — to be confirmed.",
          ],
        },
        {
          heading: "2. What personal data we collect",
          points: [
            "Order and delivery details collected through the checkout — to be documented.",
            "Account details, if customer accounts are offered — to be confirmed.",
            "Enquiry details sent through the contact page — to be documented.",
            "Any analytics or marketing data — to be confirmed once tools are chosen.",
          ],
        },
        {
          heading: "3. Why we use it and our lawful basis",
          points: [
            "Purpose for each category of data — to be completed.",
            "Lawful basis under UK GDPR for each purpose — to be completed.",
          ],
        },
        {
          heading: "4. Who we share it with",
          points: [
            "Payment and checkout provider — to be documented.",
            "Delivery partners and any other processors — to be documented.",
            "Any transfers outside the UK and safeguards used — to be confirmed.",
          ],
        },
        {
          heading: "5. How long we keep it",
          points: ["Retention periods per data category — to be defined."],
        },
        {
          heading: "6. Your rights",
          points: [
            "Access, rectification, erasure, restriction, portability and objection — wording to be finalised.",
            "How to make a request and expected response time — to be confirmed.",
            "Right to complain to the Information Commissioner's Office — wording to be finalised.",
          ],
        },
        {
          heading: "7. Security and changes",
          points: [
            "Security measures — to be documented accurately, with no overstated claims.",
            "How changes to this policy will be communicated — to be confirmed.",
            "Effective date and version — to be added on publication.",
          ],
        },
      ]}
    />
  ),
});
