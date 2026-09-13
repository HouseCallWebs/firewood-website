import { redirect } from "next/navigation";

// Visiting /demo directly on the root domain (no subdomain, no slug) has
// nothing to render — [slug] only matches when there's an actual segment.
// Send it to the flagship order flow instead of leaving it a dead 404.
export default function DemoIndexPage() {
  redirect("/demo/bigsky/order");
}
