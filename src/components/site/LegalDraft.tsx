import type { ReactNode } from "react";

export interface LegalSection {
  heading: string;
  points: string[];
}

/**
 * Legal pages are DRAFT structures only. They contain no final legal wording,
 * no company registration details and no assumed data, cookie or returns
 * practices — those must be completed and checked by a professional.
 */
export function LegalDraft({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <div className="container-page max-w-3xl py-14 lg:py-20">
      <p className="inline-flex rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-destructive uppercase">
        [DRAFT — PENDING LEGAL REVIEW]
      </p>
      <h1 className="mt-6 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 text-muted-foreground">{intro}</p>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
        This page is a structural outline for a UK pet ecommerce store. Each section lists what
        still needs to be written and verified. Nothing here is legal advice, and no wording below
        should be published without professional review.
      </div>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl">{section.heading}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {children}
    </div>
  );
}
