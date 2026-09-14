import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/site/CollectionPage";
import { COLLECTIONS, SITE } from "@/config/site";

const collection = COLLECTIONS.find((c) => c.slug === "dogs")!;
const title = "For Dogs — PAW & CO.";
const description =
  "Practical products for dogs: everyday essentials for walks, mealtimes and rest. Prices in GBP.";

export const Route = createFileRoute("/dogs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/dogs` }],
  }),
  component: () => <CollectionPage collection={collection} />,
});
