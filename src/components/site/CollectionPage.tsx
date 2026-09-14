import { ProductGrid } from "@/components/site/ProductGrid";
import { DevPlaceholderBadge } from "@/components/site/DevPlaceholderBadge";
import type { CollectionConfig } from "@/config/site";

export function CollectionPage({ collection }: { collection: CollectionConfig }) {
  return (
    <div className="container-page py-14 lg:py-20">
      <header className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Collection</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{collection.title}</h1>
          <p className="mt-4 max-w-md text-muted-foreground">{collection.intro}</p>
        </div>
        <figure className="relative overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-soft)]">
          {collection.image.isPlaceholder && (
            <DevPlaceholderBadge className="absolute top-4 left-4" label="DEV PLACEHOLDER IMAGE" />
          )}
          <img
            src={collection.image.src}
            alt={collection.image.alt}
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </figure>
      </header>

      <div className="mt-12">
        <ProductGrid
          first={48}
          query={collection.query}
          emptyMessage={`No ${collection.slug} products available right now`}
        />
      </div>
    </div>
  );
}
