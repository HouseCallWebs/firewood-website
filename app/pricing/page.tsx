"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  BASE_PRICE,
  ORDERING_MACHINE_PRICE,
  ORDERING_MACHINE_SETUP_FEE,
  BUNDLE_TOTAL,
  OFF_SEASON_PRICE,
  VALUE_STACK,
  VALUE_STACK_TOTAL,
} from "@/lib/pricing";

// UPDATE THIS NUMBER MANUALLY EACH MONTH
const SPOTS_LEFT = 2;

export default function Pricing() {
  const router = useRouter();

  const [addOrderingMachine, setAddOrderingMachine] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalStatus, setModalStatus] = useState<"idle" | "loading" | "error">("idle");
  const [modalErrors, setModalErrors] = useState<{ name?: string; email?: string }>({});
  const [authChecked, setAuthChecked] = useState(false);
  const [tosChecked, setTosChecked] = useState(false);
  const [agreementError, setAgreementError] = useState("");
  const [tosDrawerOpen, setTosDrawerOpen] = useState(false);

  const monthlyTotal = addOrderingMachine ? BUNDLE_TOTAL : BASE_PRICE;

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    const errs: { name?: string; email?: string } = {};
    if (!modalName.trim()) errs.name = "This field is required.";
    if (!modalEmail.trim()) errs.email = "This field is required.";
    if (Object.keys(errs).length) { setModalErrors(errs); return; }

    if (!authChecked || !tosChecked) {
      setAgreementError("Please check both boxes above to continue.");
      return;
    }
    setAgreementError("");

    setModalStatus("loading");
    try {
      const res = await fetch("/api/checkout/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addOrderingMachine,
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

  const cardBase = "rounded-2xl border transition-all duration-300";

  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="pricing-orbs fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b1a0f 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="pricing-orbs fixed bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      <Nav />

      <div className="relative pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
              style={{ background: "rgba(176,39,26,0.12)", border: "1px solid rgba(176,39,26,0.25)", color: "#c9432c" }}>
              ⚡ Currently accepting {SPOTS_LEFT} new clients this month — spots are limited.
            </span>
          </div>

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-2">simple pricing</p>
            <h1 className="display-font text-3xl sm:text-4xl font-bold text-white mb-3">A Website, or a Website That Takes Orders.</h1>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              Start with a website. Add the ordering machine when you&apos;re ready to
              stop taking orders one phone call at a time.
            </p>
          </div>

          {/* Two-card offer */}
          <div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Website Plan */}
              <button
                type="button"
                onClick={() => setAddOrderingMachine(false)}
                className={`${cardBase} p-7 text-left w-full`}
                style={{
                  borderColor: !addOrderingMachine ? "rgba(176,39,26,0.55)" : "rgba(255,255,255,0.08)",
                  background: !addOrderingMachine ? "rgba(176,39,26,0.04)" : "rgba(255,255,255,0.02)",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">the basics</p>
                <h2 className="display-font text-xl font-bold text-white mb-3">Website Plan</h2>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  A custom-built site with your cord pricing and delivery area on it.
                  Nothing fancy — just a real website that makes you look like the
                  business you are.
                </p>
                <div className="mb-5">
                  <span className="text-4xl font-black text-white leading-none">${BASE_PRICE}</span>
                  <span className="text-white/40 text-sm ml-1">/mo</span>
                </div>
                <ul className="space-y-2">
                  {["Custom-built site", "No setup fee", "Live in 7 days"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                      <span className="text-white/30 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </button>

              {/* Ordering Machine */}
              <button
                type="button"
                onClick={() => setAddOrderingMachine(true)}
                className={`${cardBase} p-7 text-left w-full relative`}
                style={{
                  borderColor: addOrderingMachine ? "rgba(176,39,26,0.6)" : "rgba(139,26,15,0.3)",
                  background: addOrderingMachine ? "rgba(139,26,15,0.07)" : "rgba(139,26,15,0.03)",
                }}
              >
                <div className="absolute -top-3 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}>
                    Most Businesses Start Here
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-2 mt-2">website + ordering</p>
                <h2 className="display-font text-xl font-bold text-white mb-3">The Ordering Machine</h2>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  Everything in the Website Plan, plus the system that takes and
                  reorders for you — so you spend less time on the phone and more
                  time on the truck.
                </p>
                <div className="mb-1">
                  <span className="text-4xl font-black gradient-text leading-none">${BUNDLE_TOTAL}</span>
                  <span className="text-white/40 text-sm ml-1">/mo</span>
                </div>
                <p className="text-white/35 text-xs mb-5">
                  Website Plan (${BASE_PRICE}/mo) + Ordering Machine (+${ORDERING_MACHINE_PRICE}/mo) · ${ORDERING_MACHINE_SETUP_FEE} one-time setup
                </p>
                <ul className="space-y-2">
                  {["Online ordering — species, quantity, delivery windows", "SMS booking & delivery reminders", "Fall Reorder Engine", "Review autopilot + missed-call text-back"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                      <span className="text-[#b0271a] flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            </div>
          </div>

          {/* 60-day guarantee — core trust element, kept prominent and on its own */}
          <div className="rounded-2xl border p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: "rgba(34,197,94,0.05)", borderColor: "rgba(34,197,94,0.25)" }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "rgba(34,197,94,0.12)" }}>
              🛡
            </div>
            <div>
              <p className="text-white font-bold text-base mb-1">The 60-day guarantee</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Try the Ordering Machine for 60 days. If it doesn&apos;t pay for itself,
                you drop back to the ${BASE_PRICE}/mo Website Plan — no hard feelings.
              </p>
            </div>
          </div>

          {/* Value stack */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-2 text-center">what you&apos;re actually getting</p>
            <h2 className="display-font text-2xl sm:text-3xl font-bold text-white mb-7 text-center">Here&apos;s the Whole Stack.</h2>

            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-6 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">What&apos;s Included</th>
                      <th className="text-right px-6 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Stated Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VALUE_STACK.map((row) => (
                      <tr key={row.label} className="border-b border-white/5">
                        <td className="px-6 py-4">
                          <p className="text-white font-semibold">
                            {row.label}
                            {row.activatesLater && (
                              <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-white/30 align-middle">
                                activates once your account is set up
                              </span>
                            )}
                          </p>
                          {row.desc && <p className="text-white/40 text-xs mt-0.5">{row.desc}</p>}
                        </td>
                        <td className="px-6 py-4 text-right text-white/70 font-semibold whitespace-nowrap">
                          ${row.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-b border-white/8">
                      <td className="px-6 py-4 text-white/50 text-sm">Total value</td>
                      <td className="px-6 py-4 text-right text-white/50 text-sm line-through whitespace-nowrap">
                        ${VALUE_STACK_TOTAL.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-5 text-white font-black">Today</td>
                      <td className="px-6 py-5 text-right whitespace-nowrap">
                        <span className="gradient-text font-black text-lg">${BUNDLE_TOTAL}/mo</span>
                        <span className="block text-white/35 text-xs mt-0.5">less than 2 cords</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-white/20 text-xs text-center mt-4 max-w-md mx-auto leading-relaxed">
              SMS features require a registered business (EIN) due to carrier regulations.
            </p>
          </div>

          {/* Order summary + CTA */}
          <div>
            <div className={`${cardBase} border-white/7 p-7`} style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Website Plan</span>
                  <span className="text-white font-semibold">${BASE_PRICE}/mo</span>
                </div>
                <AnimatePresence>
                  {addOrderingMachine && (
                    <motion.div
                      key="ordering-machine-line"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white/60">The Ordering Machine</span>
                      <span className="text-white font-semibold">+${ORDERING_MACHINE_PRICE}/mo</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {addOrderingMachine && (
                    <motion.div
                      key="setup-fee-line"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white/40">One-time setup fee</span>
                      <span className="text-white/70 font-semibold">${ORDERING_MACHINE_SETUP_FEE}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-white/8 pt-5">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-white/40 text-xs mb-1">Monthly recurring</p>
                    <motion.div
                      key={monthlyTotal}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="text-4xl font-black gradient-text"
                    >
                      ${monthlyTotal}/mo
                    </motion.div>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 hover:brightness-110 shadow-xl flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 24px rgba(139,26,15,0.25)" }}
                  >
                    Get Started →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal option — informational only, alternate path for winter-only businesses */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2 text-center">seasonal option (winter delivery businesses only)</p>
            <h3 className="display-font text-xl font-bold text-white mb-2 text-center">Only Deliver in the Cold Months?</h3>
            <p className="text-white/40 text-sm text-center max-w-xl mx-auto mb-7">
              If your business is winter-only, you can run the base site on a seasonal
              rate instead of the standard Website Plan above. This is an alternate path,
              not the default — most clients run the Website Plan or Ordering Machine
              year-round.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={`${cardBase} p-6`} style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white/60 inline-block mb-3"
                  style={{ background: "rgba(255,255,255,0.06)" }}>
                  Sep – Mar
                </span>
                <h4 className="text-white font-bold text-base mb-2">Full Service</h4>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  Active lead generation during your busy months.
                </p>
                <div className="text-2xl font-black text-white/80">${BASE_PRICE}<span className="text-white/40 text-sm font-normal">/mo</span></div>
              </div>
              <div className={`${cardBase} p-6`} style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white/60 inline-block mb-3"
                  style={{ background: "rgba(255,255,255,0.06)" }}>
                  Apr – Aug
                </span>
                <h4 className="text-white font-bold text-base mb-2">Off-Season Maintenance</h4>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  Your site stays live and ready for when the cold comes back.
                </p>
                <div className="text-2xl font-black text-white/80">${OFF_SEASON_PRICE}<span className="text-white/40 text-sm font-normal">/mo</span></div>
              </div>
            </div>
            <p className="text-white/20 text-xs text-center mt-4">
              Want to talk through the seasonal option? <a href="/contact" className="text-[#b0271a] hover:text-[#c9432c] underline underline-offset-2 transition-colors">Get in touch</a> and we&apos;ll set it up.
            </p>
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
              onClick={() => { setModalOpen(false); setModalStatus("idle"); setAuthChecked(false); setTosChecked(false); setAgreementError(""); }}
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
                    onClick={() => { setModalOpen(false); setModalStatus("idle"); setAuthChecked(false); setTosChecked(false); setAgreementError(""); }}
                    className="text-white/30 hover:text-white transition-colors mt-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="rounded-xl p-4 mb-6 space-y-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Website Plan</span>
                    <span className="text-white">${BASE_PRICE}/mo</span>
                  </div>
                  {addOrderingMachine && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">The Ordering Machine</span>
                        <span className="text-white">+${ORDERING_MACHINE_PRICE}/mo</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">One-time setup fee</span>
                        <span className="text-white">${ORDERING_MACHINE_SETUP_FEE}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-white/8 pt-2 mt-1 flex justify-between">
                    <span className="text-white/40 text-xs">Monthly total</span>
                    <span className="font-black gradient-text">${monthlyTotal}/mo</span>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={modalName}
                      onChange={(e) => { setModalName(e.target.value); setModalErrors((p) => ({ ...p, name: "" })); }}
                      placeholder="John Smith"
                      className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
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
                      className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    {modalErrors.email && <p className="text-red-400 text-xs mt-1">{modalErrors.email}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input type="checkbox" checked={authChecked}
                        onChange={(e) => { setAuthChecked(e.target.checked); setAgreementError(""); }} className="sr-only" />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                        authChecked
                          ? "border-[#b0271a] bg-[#b0271a]"
                          : "border-white/25 bg-transparent group-hover:border-white/45"
                      }`}>
                        {authChecked && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-white/50 leading-relaxed select-none">
                      {addOrderingMachine ? (
                        <>
                          I authorize Firewood Website to charge my card{" "}
                          <span className="text-white font-semibold">${ORDERING_MACHINE_SETUP_FEE} today</span> for
                          setup, and <span className="text-white font-semibold">${monthlyTotal}/mo</span>{" "}
                          starting 30 days after my site goes live. I understand I can cancel anytime.
                        </>
                      ) : (
                        <>
                          I authorize Firewood Website to charge my card{" "}
                          <span className="text-white font-semibold">${monthlyTotal}/mo</span> starting 30 days
                          after my site goes live. I understand I can cancel anytime.
                        </>
                      )}
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input type="checkbox" checked={tosChecked}
                        onChange={(e) => { setTosChecked(e.target.checked); setAgreementError(""); }} className="sr-only" />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                        tosChecked
                          ? "border-[#b0271a] bg-[#b0271a]"
                          : "border-white/25 bg-transparent group-hover:border-white/45"
                      }`}>
                        {tosChecked && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="text-[#b0271a] hover:text-[#c9432c] underline underline-offset-2 transition-colors"
                      >
                        Terms of Service
                      </button>
                      .
                    </span>
                  </label>

                  {agreementError && (
                    <p className="text-red-400 text-xs text-center">{agreementError}</p>
                  )}

                  {modalStatus === "error" && (
                    <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={modalStatus === "loading"}
                    className="w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #8b1a0f, #c9432c)",
                      boxShadow: "0 0 24px rgba(139,26,15,0.3)",
                    }}
                  >
                    {modalStatus === "loading" ? "Processing…" : "Proceed to Payment →"}
                  </button>

                  <p className="text-center text-white/25 text-xs">
                    Cancel anytime. No long-term contracts.
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
                    body: "These Terms govern website design, hosting, ordering-system, and maintenance services provided by Firewood Website.",
                  },
                  {
                    title: "2. Ownership & Hosting",
                    body: "All websites remain property of Firewood Website until the client exercises a full buyout. Monthly service includes hosting, security updates, and maintenance.",
                  },
                  {
                    title: "3. Billing",
                    body: "You authorize the one-time setup fee (if applicable) today, and recurring monthly charges beginning 30 days after site launch. Cancel anytime.",
                  },
                  {
                    title: "4. Site Buyout",
                    body: "You may request full ownership transfer at any time. Buyout fee is the greater of 6× your monthly rate or $1,500. Upon payment we transfer all files and access.",
                  },
                  {
                    title: "5. Cancellation",
                    body: "Cancel anytime. Hosting and support end at the close of the paid period. No refunds for partial months. Setup fees are non-refundable once work has begun.",
                  },
                  {
                    title: "6. Acceptable Use",
                    body: "You agree not to use the website for illegal activities or prohibited content.",
                  },
                  {
                    title: "7. SMS & Automation Features",
                    body: "SMS automation, the Fall Reorder Engine, and related texting features require the client to be a registered business (EIN) due to carrier and regulatory requirements for automated texting.",
                  },
                  {
                    title: "8. Limitation of Liability",
                    body: "Firewood Website's liability shall not exceed the amount paid in the last 12 months.",
                  },
                  {
                    title: "9. Governing Law",
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
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
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
