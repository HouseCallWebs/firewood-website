const PHOTOS = [
  { icon: "🪵", caption: "Freshly Split Oak", gradient: "linear-gradient(135deg, #3d2412, #7a3d16)" },
  { icon: "🚚", caption: "On the Road", gradient: "linear-gradient(135deg, #24211b, #4a3d20)" },
  { icon: "🏡", caption: "Stacked & Ready", gradient: "linear-gradient(135deg, #1f2a1c, #3f5a34)" },
];

export default function PhotoGallery() {
  return (
    <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">See the work</p>
          <h2 className="display-font text-2xl sm:text-3xl font-bold text-white">From Our Yard to Yours</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {PHOTOS.map((p) => (
            <div key={p.caption} className="rounded-2xl overflow-hidden border border-white/8">
              <div className="h-40 flex items-center justify-center text-5xl" style={{ background: p.gradient }}>
                {p.icon}
              </div>
              <div className="px-4 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-white/70 text-sm font-medium">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
