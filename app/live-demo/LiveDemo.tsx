"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup, { type MockMessage } from "../components/PhoneMockup";

// Entirely front-end. Nothing here is submitted, stored, or charged —
// this is a click-through preview of what a real customer would see on an
// Ordering Machine site, not a working order form.
const EXAMPLE_BUSINESS = "Riverbend Firewood Co.";

const SPECIES = [
  { id: "oak", label: "Oak", pricePerCord: 350 },
  { id: "almond", label: "Almond", pricePerCord: 420 },
  { id: "mixed", label: "Mixed Hardwood", pricePerCord: 275 },
  { id: "cedar", label: "Cedar", pricePerCord: 300 },
] as const;

const CORD_SIZES = [
  { id: "full", label: "Full Cord", desc: "8ft x 4ft x 4ft stacked", fraction: 1 },
  { id: "half", label: "Half Cord", desc: "4ft x 4ft x 4ft stacked", fraction: 0.5 },
  { id: "face", label: "Face Cord", desc: "8ft x 4ft x 16in stacked — about a third of a full cord", fraction: 1 / 3 },
] as const;

const DELIVERY_FEE = 45;

const WINDOWS = [
  { id: "w1", date: "Sat, Oct 4", time: "8am – 11am" },
  { id: "w2", date: "Sat, Oct 4", time: "1pm – 4pm" },
  { id: "w3", date: "Mon, Oct 6", time: "8am – 11am" },
  { id: "w4", date: "Wed, Oct 8", time: "1pm – 4pm" },
  { id: "w5", date: "Fri, Oct 10", time: "8am – 11am" },
] as const;

const STEP_LABELS = [
  "Wood", "Amount", "Delivery or Pickup", "Zone Check", "Schedule", "Your Info", "Reserve", "Confirmed",
];

type Mode = "delivery" | "pickup";

export default function LiveDemo() {
  const [step, setStep] = useState(1);
  const [species, setSpecies] = useState<(typeof SPECIES)[number]["id"]>("oak");
  const [cordSize, setCordSize] = useState<(typeof CORD_SIZES)[number]["id"]>("half");
  const [mode, setMode] = useState<Mode>("delivery");
  const [zip, setZip] = useState("");
  const [windowId, setWindowId] = useState<(typeof WINDOWS)[number]["id"] | null>(null);
  const [contact, setContact] = useState({ name: "", phone: "", address: "" });
  const [depositConfirmed, setDepositConfirmed] = useState(false);

  const selectedSpecies = SPECIES.find((s) => s.id === species)!;
  const selectedCord = CORD_SIZES.find((c) => c.id === cordSize)!;
  const selectedWindow = WINDOWS.find((w) => w.id === windowId);

  const woodTotal = useMemo(
    () => Math.round(selectedSpecies.pricePerCord * selectedCord.fraction),
    [selectedSpecies, selectedCord]
  );
  const deliveryFee = mode === "delivery" ? DELIVERY_FEE : 0;
  const total = woodTotal + deliveryFee;
  const deposit = Math.max(25, Math.round(total * 0.2));

  function resetAll() {
    setStep(1);
    setSpecies("oak");
    setCordSize("half");
    setMode("delivery");
    setZip("");
    setWindowId(null);
    setContact({ name: "", phone: "", address: "" });
    setDepositConfirmed(false);
  }

  const canAdvance =
    (step === 4 && zip.length === 5) ||
    (step === 5 && !!windowId) ||
    (step === 6 && contact.name.trim() && contact.phone.trim() && contact.address.trim()) ||
    step === 1 || step === 2 || step === 3;

  const firstName = contact.name.trim().split(" ")[0] || "there";
  const messages: MockMessage[] = selectedWindow
    ? [
        {
          text: `Hey ${firstName} — ${EXAMPLE_BUSINESS} here. Confirming your order: ${selectedCord.label.toLowerCase()} of ${selectedSpecies.label}, ${mode === "delivery" ? "delivery" : "pickup"} on ${selectedWindow.date} (${selectedWindow.time}). Total: $${total}.`,
          time: "Just now",
        },
        {
          text: `Reminder: your ${mode === "delivery" ? "delivery" : "pickup"} is tomorrow, ${selectedWindow.date}, between ${selectedWindow.time}.`,
          time: `${selectedWindow.date} − 1 day`,
        },
        {
          text: mode === "delivery"
            ? "We're on our way! Should be there within the hour."
            : "We're ready whenever you want to swing by today.",
          time: selectedWindow.date,
        },
      ]
    : [];

  return (
    <div className="relative pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: "rgba(176,39,26,0.12)", border: "1px solid rgba(176,39,26,0.25)", color: "#c9432c" }}>
            🖱️ Live Demo — this is what your customers would see
          </span>
          <h1 className="display-font text-3xl sm:text-4xl font-bold text-white mt-5 mb-2">Try Placing an Order.</h1>
          <p className="text-white/45 text-sm max-w-md mx-auto">
            Click through it like a customer would. Nothing here gets submitted,
            saved, or charged — it&apos;s just a preview.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between gap-1 mb-2">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const active = n === step;
            const done = n < step;
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full h-1.5 rounded-full transition-colors duration-300"
                  style={{ background: done || active ? "linear-gradient(135deg, #8b1a0f, #c9432c)" : "rgba(255,255,255,0.08)" }}
                />
              </div>
            );
          })}
        </div>
        <p className="text-white/25 text-xs text-center mb-7">
          Step {step} of {STEP_LABELS.length} — {STEP_LABELS[step - 1]}
        </p>

        {/* Live price strip (visible through the ordering steps) */}
        {step <= 6 && (
          <div className="flex items-center justify-between rounded-2xl border border-white/8 px-5 py-3.5 mb-6"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="text-white/45 text-xs">
              {selectedCord.label} of {selectedSpecies.label}{mode === "delivery" ? " + delivery" : " (pickup)"}
            </span>
            <motion.span key={total} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}
              className="text-xl font-black gradient-text">
              ${total}
            </motion.span>
          </div>
        )}

        <div className="relative rounded-3xl border border-white/8 p-7 sm:p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, position: "absolute" }}
              transition={{ duration: 0.18 }}
            >
              {step === 1 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">What kind of wood?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {SPECIES.map((s) => {
                      const on = species === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSpecies(s.id)}
                          className={`rounded-2xl border p-4 text-left transition-all duration-150 ${on ? "border-[#b0271a]/70" : "border-white/8 hover:border-white/20"}`}
                          style={{ background: on ? "rgba(139,26,15,0.08)" : "rgba(255,255,255,0.02)" }}
                        >
                          <p className={`font-bold text-sm mb-1 ${on ? "text-white" : "text-white/70"}`}>{s.label}</p>
                          <p className={`text-sm font-black ${on ? "gradient-text" : "text-white/40"}`}>${s.pricePerCord}/cord</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">How much do you need?</h2>
                  <div className="flex flex-col gap-3">
                    {CORD_SIZES.map((c) => {
                      const on = cordSize === c.id;
                      const price = Math.round(selectedSpecies.pricePerCord * c.fraction);
                      return (
                        <button
                          key={c.id}
                          onClick={() => setCordSize(c.id)}
                          className={`rounded-2xl border p-4 flex items-center justify-between gap-4 text-left transition-all duration-150 ${on ? "border-[#b0271a]/70" : "border-white/8 hover:border-white/20"}`}
                          style={{ background: on ? "rgba(139,26,15,0.08)" : "rgba(255,255,255,0.02)" }}
                        >
                          <div>
                            <p className={`font-bold text-sm ${on ? "text-white" : "text-white/70"}`}>{c.label}</p>
                            <p className="text-white/35 text-xs mt-0.5">{c.desc}</p>
                          </div>
                          <p className={`text-lg font-black flex-shrink-0 ${on ? "gradient-text" : "text-white/50"}`}>${price}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">Delivery or pickup?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setMode("delivery")}
                      className={`rounded-2xl border p-5 text-left transition-all duration-150 ${mode === "delivery" ? "border-[#b0271a]/70" : "border-white/8 hover:border-white/20"}`}
                      style={{ background: mode === "delivery" ? "rgba(139,26,15,0.08)" : "rgba(255,255,255,0.02)" }}
                    >
                      <p className={`font-bold text-sm mb-1 ${mode === "delivery" ? "text-white" : "text-white/70"}`}>Delivery</p>
                      <p className={`text-sm font-black ${mode === "delivery" ? "gradient-text" : "text-white/40"}`}>+${DELIVERY_FEE}</p>
                    </button>
                    <button
                      onClick={() => setMode("pickup")}
                      className={`rounded-2xl border p-5 text-left transition-all duration-150 ${mode === "pickup" ? "border-[#b0271a]/70" : "border-white/8 hover:border-white/20"}`}
                      style={{ background: mode === "pickup" ? "rgba(139,26,15,0.08)" : "rgba(255,255,255,0.02)" }}
                    >
                      <p className={`font-bold text-sm mb-1 ${mode === "pickup" ? "text-white" : "text-white/70"}`}>Pickup</p>
                      <p className={`text-sm font-black ${mode === "pickup" ? "gradient-text" : "text-white/40"}`}>Free</p>
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">
                    {mode === "delivery" ? "Where are we delivering?" : "Where are you picking up from?"}
                  </h2>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="e.g. 65801"
                    className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                  <AnimatePresence>
                    {zip.length === 5 && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-sm font-semibold mt-3 flex items-center gap-2"
                        style={{ color: "#4ade80" }}
                      >
                        ✓ {mode === "delivery" ? "Yes, we deliver to you!" : "Yes, we've got a pickup yard near you!"}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">
                    Pick a {mode === "delivery" ? "delivery" : "pickup"} window
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {WINDOWS.map((w) => {
                      const on = windowId === w.id;
                      return (
                        <button
                          key={w.id}
                          onClick={() => setWindowId(w.id)}
                          className={`rounded-2xl border p-4 text-left transition-all duration-150 ${on ? "border-[#b0271a]/70" : "border-white/8 hover:border-white/20"}`}
                          style={{ background: on ? "rgba(139,26,15,0.08)" : "rgba(255,255,255,0.02)" }}
                        >
                          <p className={`font-bold text-sm ${on ? "text-white" : "text-white/70"}`}>{w.date}</p>
                          <p className="text-white/40 text-xs mt-0.5">{w.time}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">Who&apos;s this for?</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Name</label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Dana Ruiz"
                        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="(555) 010-0100"
                        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">
                        {mode === "delivery" ? "Delivery Address" : "Anything we should know?"}
                      </label>
                      <input
                        type="text"
                        value={contact.address}
                        onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))}
                        placeholder={mode === "delivery" ? "214 Millbrook Rd." : "e.g. I'll bring a trailer"}
                        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                  </div>
                  <p className="text-white/20 text-[11px] mt-4">
                    Demo only — nothing you type here is submitted or stored anywhere.
                  </p>
                </div>
              )}

              {step === 7 && (
                <div>
                  <h2 className="text-white font-bold text-lg mb-5">Reserve your order</h2>

                  <div className="rounded-xl p-4 mb-5 space-y-1.5 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{selectedCord.label} of {selectedSpecies.label}</span>
                      <span className="text-white">${woodTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{mode === "delivery" ? "Delivery" : "Pickup"}</span>
                      <span className="text-white">{mode === "delivery" ? `$${DELIVERY_FEE}` : "Free"}</span>
                    </div>
                    <div className="border-t border-white/8 pt-1.5 mt-1 flex justify-between font-semibold">
                      <span className="text-white/70 text-sm">Total</span>
                      <span className="gradient-text">${total}</span>
                    </div>
                  </div>

                  <div className="relative rounded-2xl border-2 border-dashed border-white/15 p-5 overflow-hidden">
                    <div className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white/50 border border-white/15">
                      Demo — not a real payment form
                    </div>
                    <p className="text-white/40 text-xs mb-4 mt-5">
                      A ${deposit} deposit reserves your spot. No card info is collected
                      here — this is just a preview of that step.
                    </p>
                    <div className="space-y-2.5 opacity-40 pointer-events-none select-none">
                      <div className="rounded-lg px-4 py-2.5 text-sm text-white/40 border border-white/10">•••• •••• •••• ••••</div>
                      <div className="flex gap-2.5">
                        <div className="flex-1 rounded-lg px-4 py-2.5 text-sm text-white/40 border border-white/10">MM / YY</div>
                        <div className="flex-1 rounded-lg px-4 py-2.5 text-sm text-white/40 border border-white/10">CVC</div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setDepositConfirmed(true); setStep(8); }}
                      className="mt-5 w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.02] hover:brightness-110"
                      style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
                    >
                      Confirm Reservation (Demo) — ${deposit} deposit
                    </button>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                    style={{ background: "rgba(34,197,94,0.12)" }}>✅</div>
                  <h2 className="text-white font-bold text-xl mb-2">You&apos;re on the schedule.</h2>
                  <p className="text-white/45 text-sm mb-7 max-w-xs mx-auto">
                    This is what your customer&apos;s phone would look like right after
                    booking — automatically, no calls needed.
                  </p>

                  <PhoneMockup senderName={EXAMPLE_BUSINESS} messages={messages} />

                  <p className="text-white/20 text-xs mt-5 max-w-xs mx-auto">
                    Example texts for illustration. SMS features activate once your
                    account is set up and require a registered business (EIN).
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-xl"
                      style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 24px rgba(139,26,15,0.25)" }}
                    >
                      This Could Be Your Site →
                    </Link>
                    <button
                      onClick={resetAll}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/10 hover:border-white/22 hover:bg-white/5 transition-all"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step <= 6 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="text-sm font-semibold text-white/40 hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => Math.min(7, s + 1))}
                disabled={!canAdvance}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
                style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
