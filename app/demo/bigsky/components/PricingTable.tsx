import Link from "next/link";
import { SPECIES, QUANTITIES, priceFor, HEADLINE_FONT } from "../lib/data";

export default function PricingTable() {
  return (
    <section id="pricing" className="px-5 py-16 sm:py-20" style={{ background: "#1a1512" }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-black uppercase tracking-tight text-3xl sm:text-4xl text-center mb-3"
          style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
        >
          Pricing
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: "rgba(250,246,240,0.5)" }}>
          Per cord, by species. No hidden fees — the price you see is the price you pay.
        </p>

        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(250,246,240,0.1)", background: "rgba(250,246,240,0.03)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b" style={{ borderColor: "rgba(250,246,240,0.1)" }}>
                  <th className="text-left px-5 py-4 font-black uppercase tracking-widest text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>
                    Species
                  </th>
                  {QUANTITIES.map((q) => (
                    <th key={q.id} className="text-right px-5 py-4 font-black uppercase tracking-widest text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>
                      {q.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPECIES.map((s) => (
                  <tr key={s.id} className="border-b last:border-b-0" style={{ borderColor: "rgba(250,246,240,0.06)" }}>
                    <td className="px-5 py-4">
                      <p className="font-black" style={{ color: "#faf6f0" }}>{s.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.desc}</p>
                    </td>
                    {QUANTITIES.map((q) => (
                      <td key={q.id} className="text-right px-5 py-4 font-black" style={{ color: "#f59e0b" }}>
                        ${priceFor(s, q.id)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/demo/bigsky/order"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-black tracking-tight transition-transform hover:scale-105"
            style={{ background: "#f59e0b", color: "#1a1512" }}
          >
            Order Firewood
          </Link>
        </div>
      </div>
    </section>
  );
}
