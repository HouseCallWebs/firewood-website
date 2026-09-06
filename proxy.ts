import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Wildcard subdomain scaffolding ──────────────────────────────────────────
// Not active yet. Future work: a prospect visiting
//   joesfirewood.firewoodwebsite.com
// should be routed to a personalized demo preview (e.g. rewritten to
// /demo/joesfirewood) generated from prospect data. To build that:
//   1. Add a wildcard domain (*.firewoodwebsite.com) in this project's Vercel
//      domain settings, pointed at this same deployment.
//   2. Extract the subdomain below and, when it's neither "www" nor the root
//      domain, rewrite to a /demo/[slug] route instead of falling through.
//   3. Add app/demo/[slug]/page.tsx to render the personalized preview.
// Until then this proxy is a no-op passthrough for every request.

const ROOT_DOMAIN = "firewoodwebsite.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = host
    .replace(`.${ROOT_DOMAIN}`, "")
    .replace(ROOT_DOMAIN, "")
    .replace(/:\d+$/, ""); // strip port for local dev

  if (subdomain && subdomain !== "www" && subdomain !== host) {
    // Reserved for the future per-prospect demo preview system.
    // e.g. return NextResponse.rewrite(new URL(`/demo/${subdomain}${request.nextUrl.pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg).*)",
  ],
};
