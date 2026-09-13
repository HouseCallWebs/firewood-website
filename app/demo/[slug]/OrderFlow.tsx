"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PinIcon } from "./components/icons";
import PhoneMockup, { type ThreadMessage } from "./components/PhoneMockup";

const ROOT_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firewoodwebsite.com";

// ── Wood species pricing — the wildcard demo's own established prices, kept
// as-is. Half/face-cord prices aren't a strict fraction of the full-cord
// price — smaller loads still cost nearly as much to deliver, so they carry
// a higher per-cord rate. These ratios mirror the ones used on the Big Sky
// Firewood flagship demo's order flow, so both share the same pricing logic. ─
const SPECIES = [
  { id: "oak", name: "Oak", fullPrice: 350, desc: "Hottest burn, longest lasting" },
  { id: "pine", name: "Pine", fullPrice: 220, desc: "Lights easy, great kindling" },
  { id: "cedar", name: "Cedar", fullPrice: 300, desc: "Pleasant smell, steady heat" },
  { id: "mix", name: "Mix", desc: "Mixed hardwood — best value all-rounder", fullPrice: 275 },
] as const;

type QuantityId = "full" | "half" | "face";
const QUANTITIES: { id: QuantityId; label: string; desc: string }[] = [
  { id: "full", label: "Full Cord", desc: "4ft × 4ft × 8ft stacked" },
  { id: "half", label: "Half Cord", desc: "4ft × 4ft × 4ft stacked" },
  { id: "face", label: "Face Cord", desc: "1/3 cord — 4ft × 16in × 8ft stacked" },
];

const HALF_CORD_RATIO = 175 / 329;
const FACE_CORD_RATIO = 120 / 329;
function priceFor(fullPrice: number, quantity: QuantityId) {
  if (quantity === "full") return fullPrice;
  if (quantity === "half") return Math.round(fullPrice * HALF_CORD_RATIO);
  return Math.round(fullPrice * FACE_CORD_RATIO);
}

const ADDONS = [
  { id: "stacking", label: "Stacking", price: 40, desc: "We stack it where you want it" },
  { id: "kindling", label: "Kindling Bundle", price: 25, desc: "A ready-to-burn starter bundle" },
  { id: "rush", label: "Rush Delivery", price: 50, desc: "Delivered within 48 hours" },
];

const DEPOSIT_RATE = 0.2;
const HOME_REGION = "the Millbrook area";
const TIME_SLOTS = ["8–11am", "11am–2pm", "2–5pm"];

function upcomingDates(n: number) {
  const out: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    out.push(d);
  }
  return out;
}
function shortDay(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function weekdayShort(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short" });
}
function weekdayFull(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

const STEP_LABELS = ["Wood", "Amount", "Delivery", "Window", "Add-ons", "Your Info", "Deposit", "Confirmed"];
type Mode = "delivery" | "pickup";

export default function OrderFlow({ businessName }: { businessName: string }) {
  const dates = useMemo(() => upcomingDates(7), []);

  const [step, setStep] = useState(1);
  const [speciesId, setSpeciesId] = useState<(typeof SPECIES)[number]["id"]>("oak");
  const [quantity, setQuantity] = useState<QuantityId>("half");
  const [mode, setMode] = useState<Mode>("delivery");
  const [zip, setZip] = useState("");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [windowChoice, setWindowChoice] = useState<{ dateIndex: number; slotIndex: number } | null>(null);
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });
  const [placed, setPlaced] = useState(false);

  const species = SPECIES.find((s) => s.id === speciesId) ?? SPECIES[0];
  const woodPrice = priceFor(species.fullPrice, quantity);
  const addonsTotal = addonIds.reduce((sum, id) => {
    const a = ADDONS.find((x) => x.id === id);
    return sum + (a?.price ?? 0);
  }, 0);
  const total = woodPrice + addonsTotal;
  const deposit = Math.round(total * DEPOSIT_RATE);
  const remaining = total - deposit;

  function toggleAddon(id: string) {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }
  function quantityLabel(id: QuantityId) {
    return QUANTITIES.find((q) => q.id === id)?.label ?? "";
  }
  function orderLabel() {
    if (quantity === "full") return `${species.name.toLowerCase()} cord`;
    return `${quantityLabel(quantity).toLowerCase()} of ${species.name.toLowerCase()}`;
  }

  const canAdvance =
    (step === 3 && (mode === "pickup" || zip.length === 5)) ||
    (step === 4 && !!windowChoice) ||
    (step === 6 && details.name.trim() && details.phone.trim() && details.address.trim()) ||
    step === 1 || step === 2 || step === 5;

  const firstName = details.name.trim().split(" ")[0] || "there";
  const chosenDate = windowChoice ? dates[windowChoice.dateIndex] : null;
  const chosenSlot = windowChoice ? TIME_SLOTS[windowChoice.slotIndex] : null;

  const confirmationMessages: ThreadMessage[] = chosenDate && chosenSlot
    ? mode === "delivery"
      ? [
          { from: "business", text: `${businessName}: Thanks, ${firstName}! Your ${orderLabel()} is booked for ${weekdayShort(chosenDate)} ${chosenSlot}. We'll text the day before. 🪵`, time: "Just now" },
          { from: "business", text: `Reminder: delivery tomorrow ${chosenSlot}. Reply RESCHEDULE to move it.`, time: `${weekdayShort(chosenDate)} − 1 day` },
          { from: "business", text: "We're 30 min out! Please leave the gate unlocked. 🚚", time: weekdayShort(chosenDate) },
        ]
      : [
          { from: "business", text: `${businessName}: Thanks, ${firstName}! Your ${orderLabel()} will be ready for pickup ${weekdayShort(chosenDate)} ${chosenSlot}. 🪵`, time: "Just now" },
          { from: "business", text: `Reminder: your pickup is tomorrow, ${chosenSlot}. Reply RESCHEDULE to move it.`, time: `${weekdayShort(chosenDate)} − 1 day` },
          { from: "business", text: "We're loading it up now — see you soon! 🚚", time: weekdayShort(chosenDate) },
        ]
    : [];

  const reorderMessages: ThreadMessage[] = chosenDate
    ? [
        { from: "business", text: `Hey ${firstName}, winter's coming. Want your usual ${orderLabel()}? Reply YES and you're on the schedule. ❄️`, time: "Next October" },
        { from: "customer", text: "YES", time: "A moment later" },
        { from: "business", text: `Done, see you ${weekdayFull(chosenDate)}. 🪵`, time: "A moment later" },
      ]
    : [];

  const cardBorder = (on: boolean) => (on ? "rgba(176,39,26,0.7)" : "rgba(255,255,255,0.08)");
  const cardBg = (on: boolean) => (on ? "rgba(139,26,15,0.08)" : "transparent");

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
      <div className="text-center py-2 px-4 text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgba(139,26,15,0.14)", color: "#c9432c" }}>
        Demo preview — nothing here is submitted or charged
      </div>

      <div className="p-8">
        {step < 8 && (
          <>
            <div className="flex items-center gap-1 mb-2">
              {STEP_LABELS.slice(0, 7).map((label, i) => {
                const n = i + 1;
                const active = n === step;
                const done = n < step;
                return (
                  <div key={label} className="flex-1 h-1.5 rounded-full" style={{ background: done || active ? "linear-gradient(135deg, #8b1a0f, #c9432c)" : "rgba(255,255,255,0.08)" }} />
                );
              })}
            </div>
            <p className="text-xs font-bold text-white/40 mb-6">
              Step {step} of 7 — {STEP_LABELS[step - 1]}
            </p>

            <div className="hidden sm:flex items-center justify-between rounded-xl border border-white/8 px-5 py-3.5 mb-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-sm text-white/55">
                {quantityLabel(quantity)} of {species.name}{addonIds.length > 0 ? ` + ${addonIds.length} add-on${addonIds.length > 1 ? "s" : ""}` : ""}
              </span>
              <motion.span key={total} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }} className="text-xl font-black gradient-text">
                ${total}
              </motion.span>
            </div>
          </>
        )}

        <div className="relative">
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
                  <h3 className="display-font text-white font-bold text-xl mb-5">What kind of wood?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {SPECIES.map((s) => {
                      const on = speciesId === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSpeciesId(s.id)}
                          className="rounded-2xl border p-4 text-left transition-all duration-150"
                          style={{ borderColor: cardBorder(on), background: cardBg(on) }}
                        >
                          <p className={`font-bold text-sm mb-0.5 ${on ? "text-white" : "text-white/70"}`}>{s.name}</p>
                          <p className="text-white/40 text-[11px] mb-2">{s.desc}</p>
                          <p className={`text-sm font-black ${on ? "gradient-text" : "text-white/40"}`}>${s.fullPrice}/cord</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="display-font text-white font-bold text-xl mb-5">How much do you need?</h3>
                  <div className="flex flex-col gap-3">
                    {QUANTITIES.map((q) => {
                      const on = quantity === q.id;
                      const price = priceFor(species.fullPrice, q.id);
                      return (
                        <button
                          key={q.id}
                          onClick={() => setQuantity(q.id)}
                          className="rounded-2xl border p-4 flex items-center justify-between gap-4 text-left transition-all duration-150"
                          style={{ borderColor: cardBorder(on), background: cardBg(on) }}
                        >
                          <div>
                            <p className={`font-bold text-sm ${on ? "text-white" : "text-white/70"}`}>{q.label}</p>
                            <p className="text-white/35 text-xs mt-0.5">{q.desc}</p>
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
                  <h3 className="display-font text-white font-bold text-xl mb-5">Delivery or pickup?</h3>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <button
                      onClick={() => setMode("delivery")}
                      className="rounded-2xl border p-4 text-left transition-all duration-150"
                      style={{ borderColor: cardBorder(mode === "delivery"), background: cardBg(mode === "delivery") }}
                    >
                      <p className={`font-bold text-sm ${mode === "delivery" ? "text-white" : "text-white/70"}`}>Delivery</p>
                      <p className="text-white/40 text-xs mt-0.5">Free, right to your door</p>
                    </button>
                    <button
                      onClick={() => setMode("pickup")}
                      className="rounded-2xl border p-4 text-left transition-all duration-150"
                      style={{ borderColor: cardBorder(mode === "pickup"), background: cardBg(mode === "pickup") }}
                    >
                      <p className={`font-bold text-sm ${mode === "pickup" ? "text-white" : "text-white/70"}`}>Pickup</p>
                      <p className="text-white/40 text-xs mt-0.5">At our yard</p>
                    </button>
                  </div>

                  {mode === "delivery" ? (
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Delivery ZIP Code</label>
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
                            className="text-sm font-semibold text-green-400 mt-3"
                          >
                            ✓ Delivering within our service area of {zip}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/8 p-4 flex items-start gap-3">
                      <PinIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#c9432c]" />
                      <div>
                        <p className="text-sm font-bold text-white">Our yard, {HOME_REGION}</p>
                        <p className="text-xs mt-1 text-white/45">We&apos;ll text the exact pickup address and hours after you order.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="display-font text-white font-bold text-xl mb-5">
                    Pick a {mode === "delivery" ? "delivery" : "pickup"} window
                  </h3>
                  <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
                    {dates.map((d, dIdx) => (
                      <div key={dIdx}>
                        <p className="text-xs font-bold text-white/45 mb-2">{shortDay(d)}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot, sIdx) => {
                            const on = windowChoice?.dateIndex === dIdx && windowChoice?.slotIndex === sIdx;
                            const fast = (dIdx === 1 && sIdx === 0) || (dIdx === 3 && sIdx === 1);
                            return (
                              <button
                                key={slot}
                                onClick={() => setWindowChoice({ dateIndex: dIdx, slotIndex: sIdx })}
                                className="relative rounded-lg border px-2 py-2.5 text-xs font-bold transition-all"
                                style={{ borderColor: cardBorder(on), background: on ? "rgba(139,26,15,0.1)" : "transparent", color: on ? "#fff" : "rgba(255,255,255,0.6)" }}
                              >
                                {slot}
                                {fast && (
                                  <span className="block text-[9px] mt-0.5 font-black uppercase tracking-wide text-red-400">
                                    Filling fast
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="display-font text-white font-bold text-xl mb-5">Add anything else?</h3>
                  <div className="flex flex-col gap-3">
                    {ADDONS.map((a) => {
                      const on = addonIds.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          className="rounded-2xl border p-4 flex items-center gap-4 text-left transition-all duration-150"
                          style={{ borderColor: cardBorder(on), background: cardBg(on) }}
                        >
                          <div
                            className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 text-xs font-black"
                            style={{ borderColor: on ? "#b0271a" : "rgba(255,255,255,0.25)", background: on ? "#b0271a" : "transparent", color: "#fff" }}
                          >
                            {on && "✓"}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-white">{a.label}</p>
                            <p className="text-xs mt-0.5 text-white/40">{a.desc}</p>
                          </div>
                          <p className="text-sm font-black flex-shrink-0 gradient-text">+${a.price}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h3 className="display-font text-white font-bold text-xl mb-5">Your details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Name</label>
                      <input
                        type="text"
                        value={details.name}
                        onChange={(e) => setDetails((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Jamie Rivera"
                        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={details.phone}
                        onChange={(e) => setDetails((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="(555) 010-0100"
                        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">
                        {mode === "delivery" ? "Delivery Address" : "Your Address (for our records)"}
                      </label>
                      <input
                        type="text"
                        value={details.address}
                        onChange={(e) => setDetails((p) => ({ ...p, address: e.target.value }))}
                        placeholder={mode === "delivery" ? "214 Millbrook Rd." : "e.g. I'll bring a trailer"}
                        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 border border-white/8 focus:outline-none focus:border-[#8b1a0f]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] mt-4 text-white/30">
                    Demo only — nothing you type here is submitted or stored anywhere.
                  </p>
                </div>
              )}

              {step === 7 && (
                <div>
                  <h3 className="display-font text-white font-bold text-xl mb-5">Reserve your order</h3>

                  <div className="rounded-xl p-4 mb-5 space-y-1.5 border border-white/8">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/55">{quantityLabel(quantity)} of {species.name}</span>
                      <span className="text-white">${woodPrice}</span>
                    </div>
                    {addonIds.map((id) => {
                      const a = ADDONS.find((x) => x.id === id);
                      if (!a) return null;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-white/55">{a.label}</span>
                          <span className="text-white">+${a.price}</span>
                        </div>
                      );
                    })}
                    <div className="border-t border-white/8 pt-1.5 mt-1 flex justify-between font-black">
                      <span className="text-sm text-white/70">Total</span>
                      <span className="gradient-text">${total}</span>
                    </div>
                  </div>

                  <div className="relative rounded-2xl border-2 border-dashed border-white/15 p-5">
                    <div className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/15 text-white/50">
                      Demo — no real charge
                    </div>
                    <p className="text-sm mt-5 mb-1 text-white/75">
                      20% deposit due now: <span className="font-black gradient-text">${deposit}</span>
                    </p>
                    <p className="text-xs mb-4 text-white/40">
                      Remaining ${remaining} due on delivery.
                    </p>
                    <div className="space-y-2.5 opacity-50 pointer-events-none select-none">
                      <div className="rounded-lg px-4 py-2.5 text-sm border border-white/10 text-white/60">4242 4242 4242 4242</div>
                      <div className="flex gap-2.5">
                        <div className="flex-1 rounded-lg px-4 py-2.5 text-sm border border-white/10 text-white/60">12/28</div>
                        <div className="flex-1 rounded-lg px-4 py-2.5 text-sm border border-white/10 text-white/60">123</div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setPlaced(true); setStep(8); }}
                      className="mt-5 w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.02] hover:brightness-110"
                      style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
                    >
                      Place order — ${deposit} deposit (demo)
                    </button>
                  </div>
                </div>
              )}

              {step === 8 && placed && (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(74,222,128,0.15)" }}>
                    <span className="text-2xl text-green-400">✓</span>
                  </div>
                  <h3 className="display-font text-white font-bold text-xl mb-1">Order Confirmed</h3>
                  <p className="text-sm mb-6 text-white/50">
                    {quantityLabel(quantity)} of {species.name} · {chosenDate && shortDay(chosenDate)}, {chosenSlot} · ${total} total
                  </p>

                  <PhoneMockup contactName={businessName} messages={confirmationMessages} />

                  <div className="mt-10 pt-8 border-t border-white/8">
                    <p className="text-xs font-black uppercase tracking-widest mb-4 text-[#c9432c]">
                      Every October, your past customers get this text, automatically:
                    </p>
                    <PhoneMockup contactName={businessName} messages={reorderMessages} startDelay={confirmationMessages.length * 0.55 + 0.4} />
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-4">
                    <a
                      href={`${ROOT_URL}/contact`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-xl"
                      style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 30px rgba(139,26,15,0.25)" }}
                    >
                      Like What You See? Get This For Your Business →
                    </a>
                    <button
                      onClick={() => {
                        setStep(1); setPlaced(false); setSpeciesId("oak"); setQuantity("half"); setMode("delivery");
                        setZip(""); setAddonIds([]); setWindowChoice(null); setDetails({ name: "", phone: "", address: "" });
                      }}
                      className="text-sm font-semibold text-white/40 hover:text-white transition-colors"
                    >
                      Start another order
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step <= 7 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="text-sm font-semibold text-white/40 hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                ← Back
              </button>
              {step <= 6 && (
                <button
                  onClick={() => setStep((s) => Math.min(7, s + 1))}
                  disabled={!canAdvance}
                  className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
                  style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
