import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/site/CollectionPage";
import { COLLECTIONS, SITE } from "@/config/site";

const collection = COLLECTIONS.find((c) => c.slug === "cats")!;
const title = "For Cats — PAW & CO.";
const description =
  "Calm, practical products for cats and indoor life. Prices in GBP with secure checkout.";

export const Route = createFileRoute("/cats")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/cats` }],
  }),
  component: () => <CollectionPage collection={collection} />,
});
