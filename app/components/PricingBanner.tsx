import Link from "next/link";

export default function PricingBanner() {
  return (
    <section className="py-20 px-6" style={{ background: "#211710" }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl border p-10 md:p-14 text-center"
          style={{
            background: "rgba(232,89,12,0.05)",
            borderColor: "rgba(232,89,12,0.35)",
            boxShadow: "0 0 60px rgba(232,89,12,0.10)",
          }}
        >
          <h2 className="display-font text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Simple Monthly Pricing. <span className="gradient-text">No Setup Fees.</span>
            <br />
            Live in 7 Days.
          </h2>
          <p className="text-white/50 text-base md:text-lg mb-8 max-w-xl mx-auto">
            One flat monthly rate. No contracts, no hidden fees, no surprises — just a
            website built to keep your delivery calendar full.
          </p>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-lg font-black text-white transition-all hover:scale-105 hover:brightness-110 shadow-2xl"
            style={{
              background: "#e8590c",
              boxShadow: "0 0 50px rgba(232,89,12,0.45)",
            }}
          >
            See Plans & Pricing
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
