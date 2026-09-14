import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CartDrawer } from "@/components/site/CartDrawer";
import { NAV_LINKS, SITE, SHOP_ACCOUNT_URL } from "@/config/site";

function SearchBox({ onDone }: { onDone: () => void }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/shop", search: { q: term.trim() || undefined } });
        onDone();
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <Input
        id="site-search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search products"
        autoFocus
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4 lg:h-20">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-display tracking-[0.12em]">{SITE.name}</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="mt-2 flex flex-col px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/60 py-3 text-base transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary font-medium" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          to="/"
          className="font-display text-lg tracking-[0.16em] lg:text-xl"
          aria-label={`${SITE.name} home`}
        >
          {SITE.name}
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Search</DialogTitle>
              </DialogHeader>
              <SearchBox onDone={() => setSearchOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href={SHOP_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" aria-label="Account">
              <User className="h-5 w-5" />
            </a>
          </Button>

          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
