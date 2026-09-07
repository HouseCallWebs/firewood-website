const POINTS = [
  { icon: "💧", text: "Moisture tested below 20% before every delivery" },
  { icon: "📅", text: "Split & seasoned a minimum of 6 months" },
  { icon: "🚫", text: "100% no green wood — guaranteed" },
];

export default function WoodQuality() {
  return (
    <section className="relative px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Wood quality</p>
        <h2 className="display-font text-2xl sm:text-3xl font-bold text-white mb-8">Properly Seasoned. Every Time.</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {POINTS.map((p) => (
            <div key={p.text} className="rounded-2xl border border-white/8 p-5"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-2xl mb-3">{p.icon}</div>
              <p className="text-white/60 text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
