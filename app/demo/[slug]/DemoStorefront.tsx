"use client";
import { useState, useMemo } from "react";

const ROOT_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firewoodwebsite.com";

// ── Wood species pricing — edit these anytime ───────────────────────────────
const SPECIES = [
  { id: "oak", label: "Oak", pricePerCord: 350 },
  { id: "pine", label: "Pine", pricePerCord: 220 },
  { id: "cedar", label: "Cedar", pricePerCord: 300 },
  { id: "mix", label: "Mix", desc: "Mixed hardwood", pricePerCord: 275 },
] as const;

// Cord size sets the quantity (as a fraction of a full cord) that the
// selected species' per-cord price is multiplied by.
const CORD_SIZES = [
  { id: "quarter", label: "Quarter Cord", desc: "~2ft x 4ft x 8ft stacked", quantity: 0.25 },
  { id: "half", label: "Half Cord", desc: "~4ft x 4ft x 8ft stacked", quantity: 0.5 },
  { id: "full", label: "Full Cord", desc: "~8ft x 4ft x 8ft stacked", quantity: 1 },
] as const;

const STACKING_FEE = 40;

interface Props {
  slug: string;
  businessName: string;
}

export default function DemoStorefront({ businessName }: Props) {
  const [species, setSpecies] = useState<(typeof SPECIES)[number]["id"]>("oak");
  const [cordSize, setCordSize] = useState<(typeof CORD_SIZES)[number]["id"]>("half");
  const [zip, setZip] = useState("");
  const [stacking, setStacking] = useState(false);

  const selectedSpecies = SPECIES.find((s) => s.id === species)!;
  const selectedCord = CORD_SIZES.find((c) => c.id === cordSize)!;
  const woodTotal = useMemo(
    () => Math.round(selectedSpecies.pricePerCord * selectedCord.quantity),
    [selectedSpecies, selectedCord]
  );
  const total = woodTotal + (stacking ? STACKING_FEE : 0);

  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8590c 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="fixed bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      {/* Header — this business's own branding, not Firewood Website's */}
      <header className="relative border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)" }}>
              🔥
            </div>
            <span className="display-font font-bold text-lg text-white tracking-tight">{businessName}</span>
          </div>
          <a
            href="#quote"
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-black transition-all hover:scale-105 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)" }}
          >
            Order Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase text-orange-300 mb-8"
            style={{ background: "rgba(232,89,12,0.10)", borderColor: "rgba(232,89,12,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flicker" />
            Seasoned Hardwood · Delivered Fast
          </span>
          <h1 className="display-font text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight text-white mb-6">
            {businessName}
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Kiln-dried and seasoned hardwood, delivered and stacked on your schedule.
            Get an instant quote below — no calls, no waiting.
          </p>
        </div>
      </section>

      {/* Instant quote calculator */}
      <section id="quote" className="relative px-6 pb-24">
        <div className="max-w-2xl mx-auto rounded-3xl border border-white/8 p-8"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Instant quote</p>
          <h2 className="text-white font-bold text-2xl mb-7">Get Your Price</h2>

          <label className="block text-xs font-medium text-white/40 mb-2">Wood Species</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {SPECIES.map((s) => {
              const on = species === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSpecies(s.id)}
                  className={`rounded-2xl border p-3 text-left transition-all duration-150 ${
                    on ? "border-orange-400/70" : "border-white/8 hover:border-white/20"
                  }`}
                  style={{ background: on ? "rgba(232,89,12,0.08)" : "rgba(255,255,255,0.02)" }}
                >
                  <p className={`font-bold text-sm mb-0.5 ${on ? "text-white" : "text-white/70"}`}>{s.label}</p>
                  {"desc" in s && s.desc && <p className="text-white/30 text-[11px] mb-2">{s.desc}</p>}
                  <p className={`text-sm font-black ${on ? "gradient-text" : "text-white/40"}`}>${s.pricePerCord}/cord</p>
                </button>
              );
            })}
          </div>

          <label className="block text-xs font-medium text-white/40 mb-2">Cord Quantity</label>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {CORD_SIZES.map((c) => {
              const on = cordSize === c.id;
              const priceForCard = Math.round(selectedSpecies.pricePerCord * c.quantity);
              return (
                <button
                  key={c.id}
                  onClick={() => setCordSize(c.id)}
                  className={`rounded-2xl border p-4 text-left transition-all duration-150 ${
                    on ? "border-orange-400/70" : "border-white/8 hover:border-white/20"
                  }`}
                  style={{ background: on ? "rgba(232,89,12,0.08)" : "rgba(255,255,255,0.02)" }}
                >
                  <p className={`font-bold text-sm mb-1 ${on ? "text-white" : "text-white/70"}`}>{c.label}</p>
                  <p className="text-white/35 text-xs mb-3">{c.desc}</p>
                  <p className={`text-xl font-black ${on ? "gradient-text" : "text-white/50"}`}>${priceForCard}</p>
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Delivery ZIP Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder="e.g. 65801"
                className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-orange-500/50 transition-colors"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
              {zip.length === 5 && (
                <p className="text-xs text-white/30 mt-1.5">Delivering within our service area of {zip} ✓</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Stacking Service</label>
              <button
                onClick={() => setStacking((s) => !s)}
                className="w-full rounded-xl px-4 py-3 flex items-center justify-between border transition-all duration-150"
                style={{
                  background: stacking ? "rgba(232,89,12,0.08)" : "rgba(255,255,255,0.05)",
                  borderColor: stacking ? "rgba(232,89,12,0.45)" : "rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-sm text-white/70">Stack it for me (+${STACKING_FEE})</span>
                <span className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${stacking ? "bg-orange-500" : "bg-white/15"}`}>
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: stacking ? "22px" : "2px" }}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl p-6 flex items-center justify-between border-t border-white/8 pt-6">
            <div>
              <p className="text-white/40 text-xs mb-1">Your instant quote</p>
              <p className="text-white/55 text-sm">
                {selectedCord.label} of {selectedSpecies.label}{stacking ? " + stacking" : ""}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black gradient-text leading-none">${total}</div>
            </div>
          </div>

          <a
            href={`${ROOT_URL}/contact`}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black text-base transition-all hover:scale-[1.02] hover:brightness-110 shadow-xl"
            style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)", boxShadow: "0 0 30px rgba(232,89,12,0.25)" }}
          >
            Book This Delivery →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 px-6 py-10 text-center">
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
