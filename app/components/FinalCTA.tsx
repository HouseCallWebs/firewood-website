"use client";
import { useState } from "react";

const inputClass =
  "w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-orange-500/50 transition-colors";
const inputStyle = { background: "rgba(255,255,255,0.05)" };
const selectStyle = { background: "#1b130e" };

export default function FinalCTA() {
  const [fields, setFields] = useState({
    name: "", business: "", phone: "", bestTime: "", deliveryArea: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof fields, string>>>({});

  const set = (k: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [k]: e.target.value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const required: (keyof typeof fields)[] = ["name", "business", "phone", "bestTime", "deliveryArea"];
    const newErrors: Partial<Record<keyof typeof fields, string>> = {};
    required.forEach((k) => {
      if (!fields[k].trim()) newErrors[k] = "This field is required.";
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFields({ name: "", business: "", phone: "", bestTime: "", deliveryArea: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden" style={{ background: "#130d0a" }}>
      <div className="absolute top-[-20%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8590c 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-[-20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern absolute inset-0 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase text-orange-300 mb-7"
              style={{ background: "rgba(232,89,12,0.08)", borderColor: "rgba(232,89,12,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flicker" />
              Free — No Obligation
            </div>
            <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              Let&apos;s Build Something That<br />
              <span className="gradient-text">Keeps the Truck Full.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Tell us about your delivery area and how you sell wood. We&apos;ll put
              together a free plan showing what your site would look like and
              exactly what it costs — no pressure, no jargon, no hidden fees.
            </p>
            <ul className="space-y-3">
              {[
                "Custom-designed for your delivery area & pricing",
                "Optimized to rank in Google for your city",
                "Includes click-to-call, order forms, and lead capture",
                "Live in as little as 1 week*",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-orange-400 text-xs font-bold"
                    style={{ background: "rgba(232,89,12,0.12)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white/20 text-xs mt-6">
              * Base website only. Add-on services (SEO, CRM, automations) require additional setup time.
            </p>
          </div>

          <div
            className="reveal-right rounded-3xl p-8 border border-white/8"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", animationDelay: "0.15s" }}
          >
            <h3 className="text-white font-bold text-xl mb-1">Get your free quote</h3>
            <p className="text-white/35 text-sm mb-7">We&apos;ll reply within 1 business day.</p>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "rgba(232,89,12,0.12)" }}>✅</div>
                <h4 className="text-white font-bold text-lg">We&apos;ve got your request!</h4>
                <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                  Thanks, <strong className="text-white">{fields.name || "there"}</strong>! We&apos;ll review your info and
                  reach out within 1 business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">
                      Your Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="text" required
                      placeholder="John Smith"
                      value={fields.name} onChange={set("name")}
                      className={inputClass} style={inputStyle}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">
                      Business Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="text" required
                      placeholder="Smith's Firewood Co."
                      value={fields.business} onChange={set("business")}
                      className={inputClass} style={inputStyle}
                    />
                    {errors.business && <p className="text-red-400 text-xs mt-1">{errors.business}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">
                      Phone <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="tel" required
                      placeholder="(555) 000-0000"
                      value={fields.phone} onChange={set("phone")}
                      className={inputClass} style={inputStyle}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">
                      Best Time to Call <span className="text-orange-400">*</span>
                    </label>
                    <select
                      required
                      value={fields.bestTime} onChange={set("bestTime")}
                      className={inputClass} style={selectStyle}
                    >
                      <option value="">Select a time...</option>
                      <option>Morning (8am–12pm)</option>
                      <option>Afternoon (12pm–5pm)</option>
                      <option>Evening (5pm–8pm)</option>
                    </select>
                    {errors.bestTime && <p className="text-red-400 text-xs mt-1">{errors.bestTime}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">
                    Delivery Area <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text" required
                    placeholder="e.g. within 30 miles of Springfield, MO"
                    value={fields.deliveryArea} onChange={set("deliveryArea")}
                    className={inputClass} style={inputStyle}
                  />
                  {errors.deliveryArea && <p className="text-red-400 text-xs mt-1">{errors.deliveryArea}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">
                    Anything else? <span className="text-white/20">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Cord pricing, stacking service, seasonal pre-orders, anything we should know..."
                    value={fields.message} onChange={set("message")}
                    className={`${inputClass} resize-none`} style={inputStyle}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center">
                    Something went wrong. Please try again or email us directly at hello@housecallwebs.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl font-bold text-black text-base transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #e8590c, #fbbf24)",
                    boxShadow: "0 0 30px rgba(232,89,12,0.25)",
                  }}
                >
                  {status === "loading" ? "Sending…" : "Check Availability →"}
                </button>

                <p className="text-center text-white/20 text-xs">
                  No spam. No obligation. 100% free.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
