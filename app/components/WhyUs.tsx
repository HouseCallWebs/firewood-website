const features = [
  {
    icon: "🪵",
    title: "Firewood-Only Focus",
    desc: "We don't build sites for dentists, lawyers, or restaurants. Every site we build understands cord pricing, seasonal delivery, and stacking upsells — because that's all we build.",
  },
  {
    icon: "🇺🇸",
    title: "Built in the USA",
    desc: "Every site is designed and built in-house by our team. No outsourcing, no overseas work farms, no cookie-cutter templates.",
  },
  {
    icon: "⚡",
    title: "7-Day Delivery",
    desc: "Most agencies take months. We take 7 days. You'll be live and taking orders within a week of our kickoff call — guaranteed.*",
  },
  {
    icon: "🗺️",
    title: "Delivery Radius, Built In",
    desc: "Every site ships with a clear service-area map so customers know instantly whether you deliver to them — no back-and-forth calls to find out.",
  },
  {
    icon: "📞",
    title: "Designed to Convert",
    desc: "Cord pricing, click-to-call, and order request forms — every page is engineered to turn visitors into repeat customers, not just impress them.",
  },
  {
    icon: "🤝",
    title: "Real Ongoing Support",
    desc: "After launch, you get a dedicated point of contact — a real person who knows your business and is available when you need updates or help.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-28 px-6" style={{ background: "#130d0a" }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal-up text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">Why we&apos;re different</p>
          <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Built for Firewood. <span className="gradient-text">Not Everyone Else.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Any developer can make a website. We make websites that keep your
            delivery calendar full, season after season.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal-up rounded-2xl p-7 border border-white/5 hover:border-orange-500/15 transition-all group cursor-default"
              style={{ background: "rgba(255,237,213,0.025)", animationDelay: `${0.1 * i}s` }}
            >
              <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {f.icon}
              </div>
              <h3 className="font-bold text-white text-base mb-3">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center mt-8">
          * Base website only. Add-on services (SEO, CRM, automations) require additional setup time.
        </p>
      </div>
    </section>
  );
}
