// Single source of truth for pricing — used by both /pricing (display) and
// /api/checkout/create-subscription (billing). Keep these in sync by editing
// only this file.

// The core offer: a website plan, plus an optional ordering-system upgrade.
export const BASE_PRICE = 197; // dollars/month — Website Plan
export const ORDERING_MACHINE_PRICE = 400; // dollars/month — The Ordering Machine (on top of the Website Plan)
export const ORDERING_MACHINE_SETUP_FEE = 500; // one-time — The Ordering Machine only
export const BUNDLE_TOTAL = BASE_PRICE + ORDERING_MACHINE_PRICE; // dollars/month — Website Plan + Ordering Machine

// Seasonal pricing — an alternate path for businesses that only deliver in
// winter, shown on /pricing for informational purposes. Not part of the
// default Website Plan / Ordering Machine offer above.
export const OFF_SEASON_PRICE = 29; // dollars/month — Off-Season Maintenance (Apr–Aug)

export interface ValueStackRow {
  label: string;
  desc: string;
  value: number;
  /** True if this piece activates after account setup rather than being live immediately. */
  activatesLater?: boolean;
}

export const VALUE_STACK: ValueStackRow[] = [
  {
    label: "Custom firewood website",
    desc: "Cord pricing, delivery map, mobile-first",
    value: 2500,
  },
  {
    label: "Online ordering machine",
    desc: "Species, quantity, stacking upsells, delivery windows",
    value: 3000,
  },
  {
    label: "SMS automation",
    desc: "Booking confirmation, day-before reminder, delivery-day text",
    value: 1200,
    activatesLater: true,
  },
  {
    label: "Fall Reorder Engine",
    desc: "One-tap seasonal reorder texts to every past customer",
    value: 2400,
    activatesLater: true,
  },
  {
    label: "Review autopilot + missed-call text-back",
    desc: "",
    value: 1400,
    activatesLater: true,
  },
];

export const VALUE_STACK_TOTAL = VALUE_STACK.reduce((sum, row) => sum + row.value, 0);
