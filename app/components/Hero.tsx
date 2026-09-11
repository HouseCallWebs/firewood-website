import Link from "next/link";

const stats = [
  { value: "7-Day", label: "Live" },
  { value: "1-Tap", label: "Reorder Texts" },
  { value: "$197", label: "Starting Price" },
  { value: "🇺🇸 USA", label: "Built & Supported" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#130d0a" }}
    >
      <div className="hero-orbs absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-[-15%] right-[-8%] w-[650px] h-[650px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #8b1a0f 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div className="orb-2 absolute bottom-[-20%] left-[-10%] w-[580px] h-[580px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="orb-3 absolute top-[45%] left-[42%] w-[380px] h-[380px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9432c 0%, transparent 65%)", filter: "blur(70px)" }} />
      </div>

      <div className="absolute inset-0 grain-pattern pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="hero-fade-1">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase text-[#c9432c] mb-8 inline-block"
            style={{ background: "rgba(139,26,15,0.10)", borderColor: "rgba(139,26,15,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b0271a] flicker" />
            Built Only For Firewood Delivery Businesses
          </span>
        </div>

        <h1 className="hero-fade-2 display-font text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-tight text-white mb-6">
          A Website That Takes the Order<br />
          <span className="gradient-text">While You&apos;re Out on Delivery.</span>
        </h1>

        <p className="hero-fade-3 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-6">
          We build the site. Then we add the Ordering Machine — online ordering
          and a Fall Reorder Engine that texts every past customer each season
          so they rebuy without you lifting a finger.
        </p>

        <div className="hero-fade-3 flex flex-wrap justify-center gap-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/60 border border-white/10">
            🪵 Pays for itself with 2 extra cords a month
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#c9432c] border"
            style={{ background: "rgba(139,26,15,0.10)", borderColor: "rgba(139,26,15,0.25)" }}>
            ❄️ Get live before the first cold snap
          </span>
        </div>

        <div className="hero-fade-4 flex flex-col items-center gap-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link
              href="/live-demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #8b1a0f, #c9432c)",
                boxShadow: "0 0 40px rgba(139,26,15,0.30)",
              }}
            >
              Try the Live Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/10 hover:border-white/22 hover:bg-white/5 transition-all"
            >
              Book a Free 15-Min Call
            </Link>
          </div>

          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-lg font-black text-white transition-all hover:scale-105 hover:brightness-110 shadow-2xl"
            style={{
              background: "#8b1a0f",
              boxShadow: "0 0 50px rgba(139,26,15,0.45)",
            }}
          >
            See Pricing & Plans
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="hero-fade-5 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-white/28 mb-14">
          <span>🇺🇸 Built in the USA</span>
          <span className="text-white/12">·</span>
          <span>⚡ 7-Day Delivery</span>
          <span className="text-white/12">·</span>
          <span>🪓 Firewood-Only Focus</span>
          <span className="text-white/12">·</span>
          <span>📞 Real Human Support</span>
        </div>

        <div
          className="hero-fade-6 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/5"
          style={{ background: "rgba(255,237,213,0.04)" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="py-5 px-4 text-center" style={{ background: "rgba(19,13,10,0.65)" }}>
              <div className="text-xl sm:text-2xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-xs text-white/35 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #130d0a)" }} />
    </section>
  );
}
