"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { BASE_PRICE, ADDONS, BUNDLES } from "@/lib/pricing";

// UPDATE THIS NUMBER MANUALLY EACH MONTH
const SPOTS_LEFT = 2;

function toAnnual(monthly: number) {
  return Math.round(monthly * 12 * 0.75);
}
function annualSavings(monthly: number) {
  return Math.round(monthly * 12 * 0.25);
}

export default function Pricing() {
  const router = useRouter();

  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalStatus, setModalStatus] = useState<"idle" | "loading" | "error">("idle");
  const [modalErrors, setModalErrors] = useState<{ name?: string; email?: string }>({});
  const [authChecked, setAuthChecked] = useState(false);
  const [tosChecked, setTosChecked] = useState(false);
  const [tosDrawerOpen, setTosDrawerOpen] = useState(false);

  function toggleAddon(id: string) {
    setSelectedBundle(null);
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function toggleBundle(id: string) {
    setSelectedAddons([]);
    setSelectedBundle((prev) => (prev === id ? null : id));
  }

  const monthlyTotal = useMemo(() => {
    let t = BASE_PRICE;
    if (selectedBundle) {
      const b = BUNDLES.find((b) => b.id === selectedBundle);
      if (b) t += b.bundlePrice;
    } else {
      selectedAddons.forEach((id) => {
        const a = ADDONS.find((a) => a.id === id);
        if (a) t += a.price;
      });
    }
    return t;
  }, [selectedAddons, selectedBundle]);

  const displayTotal = isAnnual ? toAnnual(monthlyTotal) : monthlyTotal;
  const totalSavings = isAnnual ? annualSavings(monthlyTotal) : 0;
  const activeBundle = BUNDLES.find((b) => b.id === selectedBundle);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    const errs: { name?: string; email?: string } = {};
    if (!modalName.trim()) errs.name = "This field is required.";
    if (!modalEmail.trim()) errs.email = "This field is required.";
    if (Object.keys(errs).length) { setModalErrors(errs); return; }

    setModalStatus("loading");
    try {
      const res = await fetch("/api/checkout/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType: "Professional Website",
          addons: selectedAddons,
          bundleId: selectedBundle,
          isAnnual,
          customerEmail: modalEmail,
          customerName: modalName,
        }),
      });
      const data = await res.json();
      if (data.success) router.push(data.checkoutUrl);
      else setModalStatus("error");
    } catch {
      setModalStatus("error");
    }
  }

  const cardBase = "rounded-2xl border transition-all duration-200";
  const cardOff = "border-white/7 bg-white/[0.025]";
  const cardOn = "border-orange-500/60 bg-orange-500/[0.06]";

  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="pricing-orbs fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8590c 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="pricing-orbs fixed bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      <Nav />

      <div className="relative pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
              style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
              ⚡ Currently accepting {SPOTS_LEFT} new clients this month — spots are limited.
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div
              className="inline-flex items-center p-1 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  !isAnnual ? "text-black shadow-lg" : "text-white/40 hover:text-white/70"
                }`}
                style={!isAnnual ? { background: "linear-gradient(135deg, #e8590c, #fbbf24)" } : {}}
              >
                Monthly
              </button>

              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2.5 ${
                  isAnnual ? "text-black shadow-lg" : "text-white/40 hover:text-white/70"
                }`}
                style={isAnnual ? { background: "linear-gradient(135deg, #e8590c, #fbbf24)" } : {}}
              >
                Annual
                <span
                  className="text-[10px] font-black px-1.5 py-0.5 rounded-md tracking-wide"
                  style={
                    isAnnual
                      ? { background: "rgba(0,0,0,0.18)", color: "rgba(0,0,0,0.65)" }
                      : { background: "rgba(34,197,94,0.15)", color: "#4ade80" }
                  }
                >
                  Save 25%
                </span>
              </button>
            </div>

            <AnimatePresence>
              {isAnnual && (
                <motion.p
                  key="annual-label"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="text-xs text-white/35 text-center"
                >
                  Billed once per year — cancel anytime.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <div
              className={`${cardBase} p-7 md:p-8 transition-all duration-300`}
              style={{
                borderColor: isAnnual ? "rgba(251,191,36,0.55)" : "rgba(232,89,12,0.45)",
                background: isAnnual ? "rgba(251,191,36,0.04)" : "rgba(232,89,12,0.04)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <AnimatePresence>
                    {isAnnual && (
                      <motion.span
                        key="best-value"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                        style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)", color: "#000" }}
                      >
                        ★ Best Value
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">your anchor</p>
                  <h2 className="display-font text-2xl font-bold text-white mb-3">Firewood Business Website</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    {["Live in 7 days", "Hosting included", "Mobile ready", "Google-optimized"].map((tag) => (
                      <span key={tag} className="text-xs font-medium text-white/50 px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <AnimatePresence mode="wait">
                    {isAnnual ? (
                      <motion.div
                        key="annual-price"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-white/30 text-sm line-through mb-0.5">
                          ${(BASE_PRICE * 12).toLocaleString()}/yr
                        </div>
                        <div className="text-5xl font-black gradient-text leading-none">
                          ${toAnnual(BASE_PRICE).toLocaleString()}
                        </div>
                        <div className="text-white/40 text-sm mt-1">per year</div>
                        <div className="text-xs font-bold mt-2 px-2.5 py-1 rounded-full inline-block"
                          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                          Save ${annualSavings(BASE_PRICE).toLocaleString()}/yr
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="monthly-price"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-5xl font-black gradient-text leading-none">${BASE_PRICE}</div>
                        <div className="text-white/40 text-sm mt-1">per month</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                🛡 The guarantee: Live in 7 days or your first month is free.*
              </span>
              <p className="text-white/20 text-xs">
                * Base website only. Add-on services (SEO, CRM, automations) require additional setup time.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">individual add-ons</p>
            <h3 className="display-font text-2xl font-bold text-white mb-2">Supercharge Your Results</h3>
            <p className="text-white/40 text-sm mb-7">
              Add any of these on top of your base plan.
              {isAnnual && (
                <span className="text-green-400/70"> All prices shown at 25% annual discount.</span>
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              {ADDONS.map((addon) => {
                const on = selectedAddons.includes(addon.id);
                const displayPrice = isAnnual
                  ? `$${toAnnual(addon.price).toLocaleString()}/yr`
                  : `+$${addon.price}/mo`;
                const strikePrice = isAnnual
                  ? `$${(addon.price * 12).toLocaleString()}/yr`
                  : null;

                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`${cardBase} ${on ? cardOn : cardOff} w-full text-left px-5 py-4 flex items-center gap-4 hover:border-orange-500/40 cursor-pointer`}
                  >
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200 ${
                      on ? "border-orange-400 bg-orange-400" : "border-white/20 bg-transparent"
                    }`}>
                      {on && (
                        <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 min-w-0">
                      <span className={`block text-sm font-semibold transition-colors ${on ? "text-white" : "text-white/65"}`}>
                        {addon.name}
                      </span>
                      {addon.description && (
                        <span className="block text-xs text-white/35 mt-0.5 leading-relaxed">
                          {addon.description}
                        </span>
                      )}
                    </span>
                    <div className="text-right flex-shrink-0">
                      {strikePrice && (
                        <div className="text-white/25 text-xs line-through leading-tight">{strikePrice}</div>
                      )}
                      <span className={`text-sm font-black transition-colors ${on ? "gradient-text" : "text-white/35"}`}>
                        {displayPrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">or choose a bundle</p>
            <h3 className="display-font text-2xl font-bold text-white mb-2">Save More with a Bundle</h3>
            <p className="text-white/40 text-sm mb-7">
              Bundles replace individual add-on selections. Billed {isAnnual ? "annually" : "monthly"} on top of your base plan.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              {BUNDLES.map((bundle) => {
                const on = selectedBundle === bundle.id;
                const displayPrice = isAnnual
                  ? `$${toAnnual(bundle.bundlePrice).toLocaleString()}/yr`
                  : `$${bundle.bundlePrice}/mo`;
                const strikePrice = isAnnual
                  ? `$${(bundle.bundlePrice * 12).toLocaleString()}/yr`
                  : `$${bundle.originalPrice}/mo`;
                const savingsLabel = isAnnual
                  ? `save $${annualSavings(bundle.bundlePrice).toLocaleString()}/yr`
                  : `save $${bundle.savings}/mo`;

                return (
                  <button
                    key={bundle.id}
                    onClick={() => toggleBundle(bundle.id)}
                    className={`${cardBase} ${
                      bundle.popular
                        ? on
                          ? "border-orange-400/80 bg-orange-500/[0.07]"
                          : "border-orange-500/35 bg-orange-500/[0.03]"
                        : on ? cardOn : cardOff
                    } w-full text-left p-6 flex flex-col gap-4 hover:border-orange-500/40 relative`}
                  >
                    {bundle.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-black"
                          style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)" }}>
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      <h4 className={`text-base font-black mb-3 transition-colors ${on ? "text-white" : "text-white/80"}`}>
                        {bundle.name}
                      </h4>
                      <ul className="space-y-1.5">
                        {bundle.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-white/45">
                            <span className="text-orange-400/60 flex-shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-2 border-t border-white/6">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <div className="text-white/30 text-xs line-through">{strikePrice}</div>
                          <motion.div
                            key={`${bundle.id}-${isAnnual}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className={`text-2xl font-black transition-colors ${on ? "gradient-text" : "text-white/80"}`}
                          >
                            {displayPrice}
                          </motion.div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                          {savingsLabel}
                        </span>
                      </div>
                    </div>

                    <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      on ? "border-orange-400 bg-orange-400" : "border-white/20"
                    }`}>
                      {on && (
                        <svg className="w-2 h-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">
              your {isAnnual ? "annual" : "monthly"} total
            </p>
            <h3 className="display-font text-2xl font-bold text-white mb-7">Here&apos;s What You&apos;re Looking At</h3>

            <div className={`${cardBase} ${cardOff} p-7`}>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Firewood Business Website</span>
                  <motion.span
                    key={`base-${isAnnual}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="text-white font-semibold"
                  >
                    {isAnnual
                      ? `$${toAnnual(BASE_PRICE).toLocaleString()}/yr`
                      : `$${BASE_PRICE}/mo`}
                  </motion.span>
                </div>

                {activeBundle && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/60">{activeBundle.name}</span>
                    <span className="text-white font-semibold">
                      {isAnnual
                        ? `+$${toAnnual(activeBundle.bundlePrice).toLocaleString()}/yr`
                        : `+$${activeBundle.bundlePrice}/mo`}
                    </span>
                  </motion.div>
                )}

                <AnimatePresence>
                  {selectedAddons.map((id) => {
                    const addon = ADDONS.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-white/60">{addon.name}</span>
                        <span className="text-white font-semibold">
                          {isAnnual
                            ? `+$${toAnnual(addon.price).toLocaleString()}/yr`
                            : `+$${addon.price}/mo`}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {!activeBundle && selectedAddons.length === 0 && (
                  <p className="text-white/20 text-xs italic pt-1">
                    Select add-ons or a bundle above to see them here.
                  </p>
                )}
              </div>

              <div className="border-t border-white/8 pt-5">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-white/40 text-xs mb-1">
                      {isAnnual ? "Annual total (billed once)" : "Monthly recurring"}
                    </p>
                    <motion.div
                      key={displayTotal}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="text-4xl font-black gradient-text"
                    >
                      ${displayTotal.toLocaleString()}{isAnnual ? "/yr" : "/mo"}
                    </motion.div>

                    <AnimatePresence>
                      {isAnnual && totalSavings > 0 && (
                        <motion.p
                          key="savings"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.18 }}
                          className="text-xs font-semibold mt-1.5"
                          style={{ color: "#4ade80" }}
                        >
                          You save ${totalSavings.toLocaleString()} vs. monthly billing
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:scale-105 hover:brightness-110 shadow-xl flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)", boxShadow: "0 0 24px rgba(232,89,12,0.25)" }}
                  >
                    Get Started →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setModalOpen(false); setModalStatus("idle"); setAuthChecked(false); setTosChecked(false); }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div
                className="w-full max-w-md rounded-3xl border border-white/10 p-8 pointer-events-auto overflow-y-auto"
                style={{ background: "#1b130e", maxHeight: "90vh" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-black text-xl mb-1">You&apos;re almost in.</h3>
                    <p className="text-white/40 text-sm">We&apos;ll get you set up right away.</p>
                  </div>
                  <button
                    onClick={() => { setModalOpen(false); setModalStatus("idle"); setAuthChecked(false); setTosChecked(false); }}
                    className="text-white/30 hover:text-white transition-colors mt-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="rounded-xl p-4 mb-6 space-y-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {isAnnual && (
                    <div className="flex justify-end mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80" }}>
                        Annual — 25% off
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Firewood Business Website</span>
                    <span className="text-white">
                      {isAnnual ? `$${toAnnual(BASE_PRICE).toLocaleString()}/yr` : `$${BASE_PRICE}/mo`}
                    </span>
                  </div>
                  {activeBundle && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{activeBundle.name}</span>
                      <span className="text-white">
                        {isAnnual
                          ? `+$${toAnnual(activeBundle.bundlePrice).toLocaleString()}/yr`
                          : `+$${activeBundle.bundlePrice}/mo`}
                      </span>
                    </div>
                  )}
                  {selectedAddons.map((id) => {
                    const a = ADDONS.find((a) => a.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-white/50">{a.name}</span>
                        <span className="text-white">
                          {isAnnual ? `+$${toAnnual(a.price).toLocaleString()}/yr` : `+$${a.price}/mo`}
                        </span>
                      </div>
                    );
                  })}
                  <div className="border-t border-white/8 pt-2 mt-1 flex justify-between">
                    <span className="text-white/40 text-xs">
                      {isAnnual ? "Annual total" : "Monthly total"}
                    </span>
                    <span className="font-black gradient-text">
                      ${displayTotal.toLocaleString()}{isAnnual ? "/yr" : "/mo"}
                    </span>
                  </div>
                  {isAnnual && totalSavings > 0 && (
                    <p className="text-xs font-semibold text-right" style={{ color: "#4ade80" }}>
                      Saving ${totalSavings.toLocaleString()} vs. monthly
                    </p>
                  )}
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={modalName}
                      onChange={(e) => { setModalName(e.target.value); setModalErrors((p) => ({ ...p, name: "" })); }}
                      placeholder="John Smith"
                      className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-orange-500/50 transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    {modalErrors.name && <p className="text-red-400 text-xs mt-1">{modalErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={modalEmail}
                      onChange={(e) => { setModalEmail(e.target.value); setModalErrors((p) => ({ ...p, email: "" })); }}
                      placeholder="john@smithsfirewood.com"
                      className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-orange-500/50 transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    {modalErrors.email && <p className="text-red-400 text-xs mt-1">{modalErrors.email}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input type="checkbox" checked={authChecked}
                        onChange={(e) => setAuthChecked(e.target.checked)} className="sr-only" />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                        authChecked
                          ? "border-orange-400 bg-orange-400"
                          : "border-white/25 bg-transparent group-hover:border-white/45"
                      }`}>
                        {authChecked && (
                          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-white/50 leading-relaxed select-none">
                      I authorize Firewood Website to charge my card{" "}
                      <span className="text-white font-semibold">
                        ${displayTotal.toLocaleString()}{isAnnual ? "/yr" : "/mo"}
                      </span>{" "}
                      starting 30 days after my site goes live. I understand I can cancel anytime.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input type="checkbox" checked={tosChecked}
                        onChange={(e) => setTosChecked(e.target.checked)} className="sr-only" />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                        tosChecked
                          ? "border-orange-400 bg-orange-400"
                          : "border-white/25 bg-transparent group-hover:border-white/45"
                      }`}>
                        {tosChecked && (
                          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-white/50 leading-relaxed select-none">
                      I have read and agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setTosDrawerOpen(true)}
                        className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
                      >
                        Terms of Service
                      </button>
                      .
                    </span>
                  </label>

                  {modalStatus === "error" && (
                    <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                  )}

                  <div className="relative group/btn">
                    <button
                      type="submit"
                      disabled={modalStatus === "loading" || !authChecked || !tosChecked}
                      className="w-full py-4 rounded-xl font-bold text-base transition-all duration-200 disabled:cursor-not-allowed"
                      style={{
                        background: authChecked && tosChecked
                          ? "linear-gradient(135deg, #e8590c, #fbbf24)"
                          : "rgba(255,255,255,0.07)",
                        color: authChecked && tosChecked ? "#000" : "rgba(255,255,255,0.2)",
                        boxShadow: authChecked && tosChecked ? "0 0 24px rgba(232,89,12,0.3)" : "none",
                      }}
                    >
                      {modalStatus === "loading" ? "Processing…" : "Proceed to Payment →"}
                    </button>
                    {(!authChecked || !tosChecked) && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none"
                        style={{ background: "rgba(10,15,28,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        Please accept the terms above
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                          style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(10,15,28,0.97)" }} />
                      </div>
                    )}
                  </div>

                  <p className="text-center text-white/25 text-xs">
                    Cancel anytime. No long-term contracts. No setup fees.
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tosDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTosDrawerOpen(false)}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 48 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[60] mx-auto w-full max-w-lg rounded-t-3xl border border-white/10 flex flex-col shadow-2xl"
              style={{ background: "#1b130e", maxHeight: "78vh" }}
            >
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/15" />
              </div>

              <div className="flex items-center justify-between px-6 pt-3 pb-4 border-b border-white/7 flex-shrink-0">
                <div>
                  <h4 className="text-white font-black text-base">Terms of Service</h4>
                  <p className="text-white/30 text-xs mt-0.5">Firewood Website · Effective 2026</p>
                </div>
                <button
                  onClick={() => setTosDrawerOpen(false)}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
                {[
                  {
                    title: "1. Agreement & Services",
                    body: "These Terms govern website design, hosting, and maintenance services provided by Firewood Website, a HouseCall Webs company.",
                  },
                  {
                    title: "2. Ownership & Hosting",
                    body: "All websites remain property of Firewood Website until the client exercises a full buyout. Monthly service includes hosting, security updates, and maintenance.",
                  },
                  {
                    title: "3. Monthly Billing",
                    body: "You authorize recurring monthly charges. Billing begins 30 days after site launch. Cancel anytime.",
                  },
                  {
                    title: "4. Site Buyout",
                    body: "You may request full ownership transfer at any time. Buyout fee is the greater of 6× your monthly rate or $1,500. Upon payment we transfer all files and access.",
                  },
                  {
                    title: "5. Cancellation",
                    body: "Cancel anytime. Hosting and support end at the close of the paid period. No refunds for partial months.",
                  },
                  {
                    title: "6. Acceptable Use",
                    body: "You agree not to use the website for illegal activities or prohibited content.",
                  },
                  {
                    title: "7. Limitation of Liability",
                    body: "Firewood Website's liability shall not exceed the amount paid in the last 12 months.",
                  },
                  {
                    title: "8. Governing Law",
                    body: "Governed by the laws of the State of California.",
                  },
                ].map((s) => (
                  <div key={s.title}>
                    <h5 className="text-white font-bold text-sm mb-1.5">{s.title}</h5>
                    <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-white/7 flex-shrink-0">
                <button
                  onClick={() => { setTosChecked(true); setTosDrawerOpen(false); }}
                  className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #e8590c, #fbbf24)" }}
                >
                  I Agree to the Terms of Service
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
