const problems = [
  {
    icon: "📵",
    title: "Selling off a Facebook Marketplace post",
    desc: "Chasing comments and DMs for every cord means missed orders, no order history, and zero credibility when a new customer is deciding between you and the guy with an actual website.",
    stat: "Most local firewood searches now start on Google, not social feeds",
  },
  {
    icon: "📅",
    title: "No way to handle seasonal demand",
    desc: "When the first cold snap hits, your phone won't stop ringing — and there's no way for customers to see your delivery radius, check availability, or place a standing seasonal order without calling you directly.",
    stat: "Peak-season order spikes overwhelm phone-only businesses fastest",
  },
  {
    icon: "🤷",
    title: "A generic template that doesn't sell wood",
    desc: "Built by a general freelancer who's never delivered a cord? No cord-size pricing, no delivery radius map, no stacking upsell. Just a page that doesn't answer the questions your customers actually have.",
    stat: "Customers bounce when they can't find price-per-cord in the first screen",
  },
];

export default function Problem() {
  return (
    <section id="services" className="py-28 px-6" style={{ background: "#1b130e" }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal-up text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">Sound familiar?</p>
          <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Is Your Website <span className="gradient-text">Costing You Cords?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Most firewood delivery businesses are losing orders every week
            because their online presence isn&apos;t built for how customers
            actually buy firewood.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="reveal-up rounded-2xl p-7 border border-white/5 hover:border-red-500/20 transition-all group"
              style={{ background: "rgba(255,237,213,0.03)", animationDelay: `${0.15 * i}s` }}
            >
              <div className="text-4xl mb-5">{p.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{p.desc}</p>
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-red-400/70 italic">&ldquo;{p.stat}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
