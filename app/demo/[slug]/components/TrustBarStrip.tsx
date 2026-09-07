import { BadgeCheckIcon } from "./icons";

const ITEMS = [
  "Family-Owned & Operated",
  "Seasoned 6+ Months",
  "Same-Week Delivery",
  "15+ Years Serving Millbrook",
];

export default function TrustBarStrip() {
  return (
    <div className="relative border-y border-white/6 px-6 py-5" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {ITEMS.map((item) => (
          <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-white/60">
            <BadgeCheckIcon className="w-4 h-4 text-orange-400 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
