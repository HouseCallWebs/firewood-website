// Single source of truth for pricing — used by both /pricing (display) and
// /api/checkout/create-subscription (billing). Keep these in sync by editing
// only this file.

export const BASE_PRICE = 197; // dollars/month

export interface Addon {
  id: string;
  name: string;
  price: number; // dollars/month
  description?: string;
}

export const ADDONS: Addon[] = [
  { id: "seo", name: "Local SEO", price: 150 },
  { id: "gbp", name: "Google Business Profile", price: 75 },
  { id: "missedCall", name: "Missed Call Text Back", price: 75 },
  { id: "reviews", name: "Review Request Automation", price: 75 },
  { id: "crm", name: "Delivery CRM & Lead Pipeline", price: 200 },
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
    id: "reputation",
    name: "Reputation Stack",
    addonIds: ["gbp", "missedCall", "reviews"],
    includes: ["Google Business", "Missed Call Text Back", "Review Automation"],
    originalPrice: 225,
    bundlePrice: 175,
    savings: 50,
    popular: false,
  },
  {
    id: "domination",
    name: "Domination Bundle",
    addonIds: ["seo", "gbp", "missedCall", "reviews", "crm"],
    includes: ["Local SEO", "Google Business", "Missed Call Text", "Reviews", "Delivery CRM"],
    originalPrice: 575,
    bundlePrice: 375,
    savings: 200,
    popular: true,
  },
  {
    id: "fullCommand",
    name: "Full Command",
    addonIds: ["seo", "gbp", "missedCall", "reviews", "crm", "ai"],
    includes: ["Local SEO", "GBP", "Missed Call", "Reviews", "Delivery CRM", "AI Receptionist"],
    originalPrice: 975,
    bundlePrice: 699,
    savings: 276,
    popular: false,
  },
];

export function findAddon(id: string): Addon | undefined {
  return ADDONS.find((a) => a.id === id);
}

export function findBundle(id: string): Bundle | undefined {
  return BUNDLES.find((b) => b.id === id);
}
