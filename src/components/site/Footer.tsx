import { Link } from "@tanstack/react-router";

import { NAV_LINKS, SITE } from "@/config/site";

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" as const },
  { label: "Terms & Conditions", to: "/terms-and-conditions" as const },
  { label: "Cookie Policy", to: "/cookie-policy" as const },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg tracking-[0.16em]">{SITE.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer shop">
          <h2 className="eyebrow">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.slice(1, 4).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer company">
          <h2 className="eyebrow">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.slice(4).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer legal">
          <h2 className="eyebrow">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/70">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Prices in GBP (£). Payments are processed through a secure hosted checkout.</p>
        </div>
      </div>
    </footer>
  );
}
