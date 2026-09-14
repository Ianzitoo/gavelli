import { createFileRoute } from "@tanstack/react-router";

import { LegalDraft } from "@/components/site/LegalDraft";
import { SITE } from "@/config/site";

const title = "Cookie Policy (Draft) — PAW & CO.";
const description =
  "Draft cookie policy outline for PAW & CO. This page is pending legal review and is not final.";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/cookie-policy` }],
  }),
  component: () => (
    <LegalDraft
      title="Cookie Policy"
      intro="Outline only. The cookies actually set by this site must be audited before this page is completed — nothing below assumes any particular tracking or analytics setup."
      sections={[
        {
          heading: "1. What cookies and similar technologies are",
          points: ["Plain-English explanation — to be drafted."],
        },
        {
          heading: "2. Cookies used on this site",
          points: [
            "A full cookie audit is required: name, provider, purpose, type and duration for each cookie.",
            "Strictly necessary cookies (for example basket and checkout functionality) — to be listed after audit.",
            "Analytics, preference or marketing cookies — none assumed; to be listed only if introduced.",
          ],
        },
        {
          heading: "3. Consent",
          points: [
            "How consent is requested and recorded under PECR and UK GDPR — to be implemented and described.",
            "How consent can be withdrawn or changed — to be implemented and described.",
          ],
        },
        {
          heading: "4. Managing cookies in your browser",
          points: ["Browser-level guidance — to be drafted."],
        },
        {
          heading: "5. Third parties",
          points: [
            "Any third-party cookies set by the checkout, hosting or embedded content — to be confirmed by audit.",
          ],
        },
        {
          heading: "6. Updates",
          points: ["How and when this policy is reviewed — to be confirmed.", "Effective date — to be added on publication."],
        },
      ]}
    />
  ),
});
