import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractSubdomain } from "@/lib/subdomain";

// ── Wildcard subdomain demo previews ────────────────────────────────────────
// firewoodwebsite.com / www.firewoodwebsite.com / localhost continue to the
// normal site. Any other subdomain (e.g. bobsfirewood.firewoodwebsite.com, or
// bobsfirewood.localhost:3070 in dev) is rewritten to /demo/[slug], which
// renders a personalized storefront preview built entirely from the slug —
// no database lookup, so any subdomain works automatically.
//
// To go live: add a wildcard domain (*.firewoodwebsite.com) in this
// project's Vercel domain settings, pointed at this same deployment.

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = extractSubdomain(host);

  if (subdomain) {
    const url = request.nextUrl.clone();
    url.pathname = `/demo/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excludes /api (checkout + contact stay pointed at the same backend
    // regardless of hostname), static assets, and metadata files.
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)",
  ],
};
