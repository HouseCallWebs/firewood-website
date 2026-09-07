// Shared between proxy.ts (routing) and app/demo/[slug] (rendering) — keep
// both in sync by editing only this file.

export const ROOT_DOMAIN = "firewoodwebsite.com";

/**
 * Returns the prospect slug for a subdomain request, or null if `host` is the
 * root domain, www, localhost, or a Vercel preview URL (all of which should
 * fall through to the normal site instead of the demo).
 */
export function extractSubdomain(host: string): string | null {
  const hostname = host.split(":")[0].toLowerCase(); // strip port

  if (!hostname) return null;
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) return null;
  if (hostname === "localhost" || hostname === "127.0.0.1") return null;
  if (hostname.endsWith(".vercel.app")) return null; // Vercel preview deployments

  // Local dev: e.g. bobsfirewood.localhost:3070
  if (hostname.endsWith(".localhost")) {
    const sub = hostname.slice(0, -".localhost".length);
    return sub || null;
  }

  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const sub = hostname.slice(0, -(`.${ROOT_DOMAIN}`.length));
    return sub && sub !== "www" ? sub : null;
  }

  return null;
}

const TRADE_SUFFIXES = ["firewood", "cordwood", "woodco", "wood"];

function titleCase(word: string): string {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

/**
 * Derives a display business name from a subdomain slug — no database lookup,
 * so any slug works automatically. e.g. "bobsfirewood" -> "Bob's Firewood".
 */
export function slugToBusinessName(rawSlug: string): string {
  const slug = rawSlug.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!slug) return "Your Firewood Business";

  let namePart = slug;
  let suffixPart = "";
  for (const suffix of TRADE_SUFFIXES) {
    if (slug.length > suffix.length && slug.endsWith(suffix)) {
      namePart = slug.slice(0, -suffix.length);
      suffixPart = suffix;
      break;
    }
  }

  if (!namePart) return titleCase(suffixPart) || "Your Firewood Business";

  const displayName =
    namePart.endsWith("s") && namePart.length > 1
      ? `${titleCase(namePart.slice(0, -1))}'s`
      : titleCase(namePart);

  return [displayName, titleCase(suffixPart)].filter(Boolean).join(" ");
}
