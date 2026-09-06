const items = [
  "🪵 Seasoned Hardwood", "🚚 Delivery & Stacking", "🔥 Kiln-Dried Bundles", "🌲 U-Cut & Log Loads",
  "📦 Wholesale Cordwood", "🏕️ Campground Bundles", "🪓 Splitting Services", "📅 Seasonal Pre-Orders",
  "🗺️ Local Delivery Radius", "🔁 Repeat Customer Routes",
];

const track = [...items, ...items];

export default function TrustBar() {
  return (
    <div className="border-y border-white/5 overflow-hidden py-4"
      style={{ background: "rgba(255,237,213,0.02)" }}>
      <div className="flex gap-0">
        <div className="marquee-track flex gap-0 shrink-0">
          {track.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/35 px-8 whitespace-nowrap border-r border-white/5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
