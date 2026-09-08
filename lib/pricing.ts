// Single source of truth for pricing — used by both /pricing (display) and
// /api/checkout/create-subscription (billing). Keep these in sync by editing
// only this file.

// Firewood delivery is seasonal, so the base site has two rates. BASE_PRICE
// is the "Full Service" rate (active lead-gen, add-ons available) for
// September through March. OFF_SEASON_PRICE is the "Off-Season Maintenance"
// rate (site stays live/hosted, no active lead-gen) for April through
// August — it applies to the base site only. Add-ons and bundles are only
// available/billed during Full Service months; a client can ask to keep an
// add-on running through the off-season, but that's an exception to the
// maintenance rate, not the default.
export const BASE_PRICE = 197; // dollars/month — Full Service (Sep–Mar)
export const OFF_SEASON_PRICE = 29; // dollars/month — Off-Season Maintenance (Apr–Aug)

export interface Addon {
  id: string;
  name: string;
  price: number; // dollars/month
  description?: string;
}

export const ADDONS: Addon[] = [
  { id: "seo", name: "Local SEO", price: 150 },
  { id: "gbp", name: "Google Business Profile", price: 75 },
  { id: "crm", name: "Delivery CRM & Lead Pipeline", price: 250 },
  { id: "ai", name: "AI Phone Receptionist", price: 400 },
  {
    id: "ads",
    name: "Google or Facebook Ads Management",
    price: 500,
    description:
      "Done-for-you ad campaigns across Google and Facebook. We write the copy, build the creatives, and manage everything. Ad spend paid directly to Google/Facebook separately (min. $500/mo recommended).",
  },
];

export interface Bundle {
  id: string;
  name: string;
  addonIds: string[];
  includes: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  popular: boolean;
}

export const BUNDLES: Bundle[] = [
  {
    id: "domination",
    name: "Domination Bundle",
    addonIds: ["seo", "gbp", "crm"],
    includes: ["Local SEO", "Google Business", "Delivery CRM"],
    originalPrice: 475,
    bundlePrice: 349,
    savings: 126,
    popular: true,
  },
  {
    id: "fullCommand",
    name: "Full Command",
    addonIds: ["seo", "gbp", "crm", "ai"],
    includes: ["Local SEO", "GBP", "Delivery CRM", "AI Receptionist"],
    originalPrice: 875,
    bundlePrice: 649,
    savings: 226,
    popular: false,
  },
];

export function findAddon(id: string): Addon | undefined {
  return ADDONS.find((a) => a.id === id);
}

export function findBundle(id: string): Bundle | undefined {
  return BUNDLES.find((b) => b.id === id);
}
