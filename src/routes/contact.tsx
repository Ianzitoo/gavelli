import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/config/site";

const title = "Contact — PAW & CO.";
const description =
  "Get in touch with PAW & CO. about an order, a product question or anything else.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = order ? `Enquiry about order ${order}` : "Enquiry from the website";
    const body = `${message}\n\n— ${name}`;
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="container-page grid max-w-5xl gap-12 py-14 lg:grid-cols-2 lg:py-20">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Get in touch</h1>
        <p className="mt-4 text-muted-foreground">
          Questions about an order, a product or a delivery? Send us a message and we&apos;ll reply
          by email.
        </p>

        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-medium">Email</dt>
            <dd className="text-muted-foreground">
              <a className="hover:text-foreground" href={`mailto:${SITE.contactEmail}`}>
                {SITE.contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Orders</dt>
            <dd className="text-muted-foreground">
              Please include your order number so we can find it quickly.
            </dd>
          </div>
        </dl>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6">
        <div className="space-y-5">
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="order">Order number (optional)</Label>
            <Input
              id="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="mt-2"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send message
          </Button>
          <p className="text-xs text-muted-foreground">
            This form opens your email app so you can send the message directly to us.
          </p>
        </div>
      </form>
    </div>
  );
}
