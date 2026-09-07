const TOWNS = ["Millbrook", "Fairview", "Cedar Grove", "Riverside", "Oakdale", "Pine Hollow", "Maple Heights", "Clearwater"];

// Rough scattered positions (percent) for the static map placeholder pins.
const PINS = [
  { top: "28%", left: "22%" },
  { top: "48%", left: "58%" },
  { top: "65%", left: "30%" },
  { top: "22%", left: "68%" },
  { top: "72%", left: "70%" },
];

export default function DeliveryArea() {
  return (
    <section className="relative px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Service area</p>
          <h2 className="display-font text-2xl sm:text-3xl font-bold text-white">Now Delivering To</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {TOWNS.map((town) => (
            <span
              key={town}
              className="text-sm font-medium text-white/70 px-4 py-2 rounded-full border border-white/8"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              📍 {town}
            </span>
          ))}
        </div>

        <div className="relative rounded-2xl border border-white/8 overflow-hidden h-56"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="grain-pattern absolute inset-0 opacity-60" />
          {PINS.map((pin, i) => (
            <span key={i} className="absolute text-lg -translate-x-1/2 -translate-y-full" style={{ top: pin.top, left: pin.left }}>
              📍
            </span>
          ))}
          <div className="absolute bottom-3 right-3 text-[11px] text-white/30 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(19,13,10,0.6)" }}>
            Service area map
          </div>
        </div>
        <p className="text-white/25 text-xs text-center mt-3">
          Don&apos;t see your town? Ask us — we&apos;re always expanding our delivery radius.
        </p>
      </div>
    </section>
  );
}
