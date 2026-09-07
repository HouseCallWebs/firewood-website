import { PinIcon } from "./icons";

const TOWNS = ["Millbrook", "Fairview", "Cedar Grove", "Riverside", "Oakdale", "Pine Hollow", "Maple Heights", "Clearwater"];

// The town badges above are fictional (derived from the demo, not a real
// service area), so the embedded map centers on a real, generic mid-sized
// US town as a plausible stand-in rather than trying to geocode them.
const MAP_QUERY = "Springfield, MO";

export default function DeliveryArea() {
  return (
    <section className="relative px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Service area</p>
          <h2 className="display-font text-2xl sm:text-3xl font-bold text-white mb-3">Now Delivering To</h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            From Millbrook to the surrounding towns, we&apos;ve been delivering seasoned
            hardwood to homes and cabins for 15+ years.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {TOWNS.map((town) => (
            <span
              key={town}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 px-4 py-2 rounded-full border border-white/8"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <PinIcon className="w-3.5 h-3.5 text-orange-400/80" />
              {town}
            </span>
          ))}
        </div>

        <div className="relative rounded-2xl border border-white/8 overflow-hidden h-80"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Service area map"
          />
        </div>
        <p className="text-white/25 text-xs text-center mt-3">
          Don&apos;t see your town? Ask us — we&apos;re always expanding our delivery radius.
        </p>
      </div>
    </section>
  );
}
