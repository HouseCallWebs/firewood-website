import Link from "next/link";
import { BASE_PRICE } from "@/lib/pricing";

const steps = [
  {
    num: "01",
    tag: "Step 1 — Get Started",
    price: `$${BASE_PRICE}`,
    priceSub: "/mo",
    title: "We Build Your Site",
    desc: "Tell us about your delivery area and how you price your cords on a quick 15-minute call. We handle everything — design, copy, setup, and launch. You'll be live within a week.",
    bullets: [
      "Cord/face-cord pricing laid out clearly",
      "Delivery radius map for your service area",
      "Online order request forms & click-to-call",
      "Mobile-optimized for on-the-go customers",
      "Live in 7 days — guaranteed*",
    ],
  },
  {
    num: "02",
    tag: "Step 2 — Keep Growing",
    price: "Add-ons",
    priceSub: "from $75/mo",
    title: "Supercharge Your Results",
    desc: "Layer on powerful add-ons — Local SEO, Google Business Profile, delivery CRM, AI receptionist, and more. Pick what fits your budget. Cancel anytime.",
    bullets: [
      "Local SEO to rank for \"firewood near me\"",
      "Google Business Profile optimization",
      "Delivery CRM & repeat-customer pipeline",
      "AI phone receptionist (24/7)",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6" style={{ background: "#130d0a" }}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal-up text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-4">Simple & transparent</p>
          <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            How It Works. <span className="gradient-text">No Surprises.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every client goes through the same two steps. No hidden fees, no confusing packages.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num}>
              <div
                className="reveal-left rounded-3xl p-8 border transition-all"
                style={{
                  background: i === 1 ? "rgba(139,26,15,0.04)" : "rgba(255,237,213,0.03)",
                  borderColor: i === 1 ? "rgba(139,26,15,0.2)" : "rgba(255,237,213,0.06)",
                  animationDelay: `${0.2 + i * 0.15}s`,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}>
                      {step.num}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a]">{step.tag}</p>
                      <h3 className="text-xl font-bold text-white mt-0.5">{step.title}</h3>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-4xl font-black gradient-text">{step.price}</span>
                    <span className="text-white/30 text-sm ml-1">{step.priceSub}</span>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">{step.desc}</p>

                <ul className="space-y-2.5">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="gradient-text font-bold flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {i === 0 && (
                <div className="reveal-fade flex flex-col items-center py-5 gap-1" style={{ animationDelay: "0.5s" }}>
                  <div className="w-px h-8 bg-gradient-to-b from-[#8b1a0f]/30 to-[#8b1a0f]/5" />
                  <svg className="text-[#8b1a0f]/30" width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M7 8L0 0h14L7 8z" fill="currentColor" />
                  </svg>
                  <span className="text-white/20 text-xs mt-1">once you&apos;re live</span>
                </div>
              )}
            </div>
          ))}

          <div className="reveal-up text-center mt-10" style={{ animationDelay: "0.6s" }}>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#b0271a] hover:text-[#c9432c] transition-colors"
            >
              View full pricing & add-ons
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-white/20 text-xs mt-4">
              * Base website only. Add-on services (SEO, CRM, automations) require additional setup time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
