// Single source of truth for Big Sky Firewood's fictional pricing, service
// area, and copy. The homepage pricing table and the /order flow both read
// from this file so the numbers can never drift out of sync.

// The root site's globals.css sets h1–h4 to the serif display font as an
// unlayered CSS rule, which beats any Tailwind utility class (Tailwind's
// utilities live inside @layer, and unlayered rules always win regardless of
// specificity). Big Sky Firewood's headlines are plain condensed system-font
// black, not the root site's serif — so headings here set this inline,
// which beats any stylesheet rule including the unlayered one.
export const HEADLINE_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const BUSINESS_NAME = "Big Sky Firewood";
export const BUSINESS_PHONE = { display: "(406) 555-0147", tel: "+14065550147" };
export const BUSINESS_CITY = "Bozeman, MT";

export const DELIVERY_TOWNS = ["Bozeman", "Belgrade", "Livingston", "Big Sky", "Ennis"];

export const VALID_ZIPS = ["59715", "59718", "59741", "59752", "59729"];

export const PICKUP_YARD = {
  address: "4210 Jackrabbit Ln, Belgrade, MT",
  hours: "Mon–Sat, 8am–5pm",
};

// Half/face-cord pricing isn't a strict fraction of the full-cord price —
// smaller loads still cost nearly as much to deliver, so they carry a higher
// per-cord rate. Oak's numbers ($329 / $175 / $120) are the reference; every
// other species is priced off the same two ratios, rounded to whole dollars.
const HALF_CORD_RATIO = 175 / 329;
const FACE_CORD_RATIO = 120 / 329;

export interface Species {
  id: string;
  name: string;
  fullPrice: number;
  desc: string;
}

export const SPECIES: Species[] = [
  { id: "oak", name: "Oak", fullPrice: 329, desc: "Hottest burn, longest lasting" },
  { id: "almond", name: "Almond", fullPrice: 299, desc: "Sweet smell, great heat" },
  { id: "mixed", name: "Mixed Hardwood", fullPrice: 269, desc: "Best value all-rounder" },
  { id: "fir", name: "Douglas Fir", fullPrice: 219, desc: "Lights easy, great kindling" },
];

export type QuantityId = "full" | "half" | "face";

export const QUANTITIES: { id: QuantityId; label: string; desc: string }[] = [
  { id: "full", label: "Full Cord", desc: "4ft × 4ft × 8ft stacked" },
  { id: "half", label: "Half Cord", desc: "4ft × 4ft × 4ft stacked" },
  { id: "face", label: "Face Cord", desc: "1/3 cord — 4ft × 16in × 8ft stacked" },
];

export function priceFor(species: Species, quantity: QuantityId): number {
  if (quantity === "full") return species.fullPrice;
  if (quantity === "half") return Math.round(species.fullPrice * HALF_CORD_RATIO);
  return Math.round(species.fullPrice * FACE_CORD_RATIO);
}

export function findSpecies(id: string): Species {
  return SPECIES.find((s) => s.id === id) ?? SPECIES[0];
}

export interface Addon {
  id: string;
  label: string;
  price: number;
  desc: string;
}

export const ADDONS: Addon[] = [
  { id: "stacking", label: "Stacking", price: 40, desc: "We stack it where you want it" },
  { id: "kindling", label: "Kindling Bundle", price: 25, desc: "A ready-to-burn starter bundle" },
  { id: "rush", label: "Rush Delivery", price: 50, desc: "Delivered within 48 hours" },
];

export const DEPOSIT_RATE = 0.2;

export interface Review {
  name: string;
  town: string;
  quote: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Jake M.",
    town: "Belgrade",
    quote:
      "Ordered on my phone during a coffee break, wood was stacked by my back door two days later. Didn't have to make a single call.",
  },
  {
    name: "Carrie T.",
    town: "Bozeman",
    quote:
      "The oak burns exactly like they said — hot and long. We've reordered every fall for three years now.",
  },
  {
    name: "Dan R.",
    town: "Livingston",
    quote:
      "Text reminders meant I actually remembered to leave the gate open. Small thing, but it's the little details.",
  },
  {
    name: "Marisol P.",
    town: "Big Sky",
    quote:
      "Rush delivery saved us before a cold snap hit. Showed up right in the window they gave us.",
  },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "Is the wood seasoned?",
    a: "Always. Every cord is split and seasoned at least 6 months before it leaves our yard — never green, never wet.",
  },
  {
    q: "Do you stack it?",
    a: "We can. Add stacking at checkout and we'll stack it wherever you point — porch, garage, wherever's easiest for you.",
  },
  {
    q: "How do I pay?",
    a: "A 20% deposit online holds your delivery window. The rest is due when the wood hits your driveway — cash, card, or check.",
  },
  {
    q: "What if I need to reschedule?",
    a: "Just reply RESCHEDULE to any of our text reminders, or give us a call. No fees, no hassle.",
  },
  {
    q: "Do I have to reorder every year?",
    a: "Nope — that's the best part. Every October, we text past customers a one-tap reorder. Reply YES and you're back on the schedule automatically.",
  },
];
