"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckIcon, PinIcon, LogIcon, CloseIcon } from "../components/icons";
import PhoneMockup, { type ThreadMessage } from "./components/PhoneMockup";
import {
  SPECIES,
  QUANTITIES,
  ADDONS,
  DEPOSIT_RATE,
  VALID_ZIPS,
  PICKUP_YARD,
  findSpecies,
  priceFor,
  HEADLINE_FONT,
  type QuantityId,
} from "../lib/data";

const STEP_LABELS = ["Wood", "Amount", "Delivery", "Window", "Add-ons", "Your Info", "Deposit", "Confirmed"];
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

type Mode = "delivery" | "pickup";

export default function OrderFlow() {
  const searchParams = useSearchParams();
  const dates = useMemo(() => upcomingDates(7), []);

  const [step, setStep] = useState(1);
  const [speciesId, setSpeciesId] = useState("oak");
  const [quantity, setQuantity] = useState<QuantityId>("half");
  const [mode, setMode] = useState<Mode>("delivery");
  const [zip, setZip] = useState("");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [windowChoice, setWindowChoice] = useState<{ dateIndex: number; slotIndex: number } | null>(null);
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const prefill = searchParams.get("zip");
    if (prefill && /^\d{5}$/.test(prefill)) setZip(prefill);
  }, [searchParams]);

  const species = findSpecies(speciesId);
  const woodPrice = priceFor(species, quantity);
  const addonsTotal = addonIds.reduce((sum, id) => {
    const a = ADDONS.find((x) => x.id === id);
    return sum + (a?.price ?? 0);
  }, 0);
  const total = woodPrice + addonsTotal;
  const deposit = Math.round(total * DEPOSIT_RATE);
  const remaining = total - deposit;

  const zipValid = mode === "delivery" && zip.length === 5 ? VALID_ZIPS.includes(zip) : null;

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
          { from: "business", text: `Big Sky Firewood: Thanks, ${firstName}! Your ${orderLabel()} is booked for ${weekdayShort(chosenDate)} ${chosenSlot}. We'll text the day before. 🪵`, time: "Just now" },
          { from: "business", text: `Reminder: delivery tomorrow ${chosenSlot}. Reply RESCHEDULE to move it.`, time: `${weekdayShort(chosenDate)} − 1 day` },
          { from: "business", text: "We're 30 min out! Please leave the gate unlocked. 🚚", time: weekdayShort(chosenDate) },
        ]
      : [
          { from: "business", text: `Big Sky Firewood: Thanks, ${firstName}! Your ${orderLabel()} will be ready for pickup ${weekdayShort(chosenDate)} ${chosenSlot} at our Belgrade yard. 🪵`, time: "Just now" },
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

  return (
    <div style={{ background: "#1a1512", minHeight: "100vh" }}>
      <div className="text-center py-2.5 px-4 text-xs font-black uppercase tracking-widest" style={{ background: "#5c3d2e", color: "#f59e0b" }}>
        Demo preview — nothing here is submitted or charged
      </div>

      <Header />

      <div className="relative px-5 pt-8 pb-28 sm:pb-16">
        <div className="max-w-xl mx-auto">
          {step < 8 && (
            <>
              <div className="flex items-center justify-between gap-4 mb-3">
                <Link
                  href="/demo/bigsky"
                  className="inline-flex items-center gap-1.5 text-xs font-bold flex-shrink-0"
                  style={{ color: "rgba(250,246,240,0.45)" }}
                >
                  <CloseIcon className="w-3.5 h-3.5" />
                  Exit
                </Link>
                <div className="flex items-center gap-1 flex-1">
                  {STEP_LABELS.slice(0, 7).map((label, i) => {
                    const n = i + 1;
                    const active = n === step;
                    const done = n < step;
                    return (
                      <div key={label} className="flex-1 h-1.5 rounded-full" style={{ background: done || active ? "#f59e0b" : "rgba(250,246,240,0.1)" }} />
                    );
                  })}
                </div>
              </div>
              <p className="text-xs font-bold mb-6" style={{ color: "rgba(250,246,240,0.4)" }}>
                Step {step} of 7 — {STEP_LABELS[step - 1]}
              </p>

              <div className="hidden sm:flex items-center justify-between rounded-xl border px-5 py-3.5 mb-6" style={{ borderColor: "rgba(250,246,240,0.1)", background: "rgba(250,246,240,0.03)" }}>
                <span className="text-sm" style={{ color: "rgba(250,246,240,0.55)" }}>
                  {quantityLabel(quantity)} of {species.name}{addonIds.length > 0 ? ` + ${addonIds.length} add-on${addonIds.length > 1 ? "s" : ""}` : ""}
                </span>
                <motion.span key={total} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }} className="text-xl font-black" style={{ color: "#f59e0b" }}>
                  ${total}
                </motion.span>
              </div>
            </>
          )}

          <div className="relative rounded-2xl border p-6 sm:p-8" style={{ borderColor: "rgba(250,246,240,0.1)", background: "rgba(250,246,240,0.03)" }}>
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
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>What kind of wood?</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {SPECIES.map((s) => {
                        const on = speciesId === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSpeciesId(s.id)}
                            className="rounded-xl border p-4 text-left transition-all"
                            style={{
                              borderColor: on ? "#f59e0b" : "rgba(250,246,240,0.12)",
                              background: on ? "rgba(245,158,11,0.08)" : "transparent",
                            }}
                          >
                            <LogIcon className="w-5 h-5 mb-2" style={{ color: on ? "#f59e0b" : "rgba(250,246,240,0.4)" }} />
                            <p className="font-black text-sm mb-0.5" style={{ color: on ? "#faf6f0" : "rgba(250,246,240,0.7)" }}>{s.name}</p>
                            <p className="text-xs mb-2" style={{ color: "rgba(250,246,240,0.4)" }}>{s.desc}</p>
                            <p className="text-sm font-black" style={{ color: on ? "#f59e0b" : "rgba(250,246,240,0.5)" }}>${s.fullPrice}/cord</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>How much do you need?</h2>
                    <div className="flex flex-col gap-3">
                      {QUANTITIES.map((q) => {
                        const on = quantity === q.id;
                        const price = priceFor(species, q.id);
                        return (
                          <button
                            key={q.id}
                            onClick={() => setQuantity(q.id)}
                            className="rounded-xl border p-4 flex items-center justify-between gap-4 text-left transition-all"
                            style={{
                              borderColor: on ? "#f59e0b" : "rgba(250,246,240,0.12)",
                              background: on ? "rgba(245,158,11,0.08)" : "transparent",
                            }}
                          >
                            <div>
                              <p className="font-black text-sm" style={{ color: on ? "#faf6f0" : "rgba(250,246,240,0.7)" }}>{q.label}</p>
                              <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{q.desc}</p>
                            </div>
                            <p className="text-lg font-black flex-shrink-0" style={{ color: on ? "#f59e0b" : "rgba(250,246,240,0.5)" }}>${price}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>Delivery or pickup?</h2>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <button
                        onClick={() => setMode("delivery")}
                        className="rounded-xl border p-4 text-left transition-all"
                        style={{ borderColor: mode === "delivery" ? "#f59e0b" : "rgba(250,246,240,0.12)", background: mode === "delivery" ? "rgba(245,158,11,0.08)" : "transparent" }}
                      >
                        <p className="font-black text-sm" style={{ color: mode === "delivery" ? "#faf6f0" : "rgba(250,246,240,0.7)" }}>Delivery</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>Free, 15 mi radius</p>
                      </button>
                      <button
                        onClick={() => setMode("pickup")}
                        className="rounded-xl border p-4 text-left transition-all"
                        style={{ borderColor: mode === "pickup" ? "#f59e0b" : "rgba(250,246,240,0.12)", background: mode === "pickup" ? "rgba(245,158,11,0.08)" : "transparent" }}
                      >
                        <p className="font-black text-sm" style={{ color: mode === "pickup" ? "#faf6f0" : "rgba(250,246,240,0.7)" }}>Pickup</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>At our yard</p>
                      </button>
                    </div>

                    {mode === "delivery" ? (
                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(250,246,240,0.5)" }}>ZIP Code</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          value={zip}
                          onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                          placeholder="e.g. 59715"
                          className="w-full rounded-lg px-4 py-3 text-base border focus:outline-none"
                          style={{ background: "rgba(250,246,240,0.06)", borderColor: "rgba(250,246,240,0.15)", color: "#faf6f0" }}
                        />
                        <AnimatePresence>
                          {zip.length === 5 && (
                            <motion.p
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="text-sm font-bold mt-3 flex items-center gap-2"
                              style={{ color: zipValid ? "#4ade80" : "#f87171" }}
                            >
                              {zipValid ? (
                                <>✓ We deliver to you, free within 15 miles.</>
                              ) : (
                                <>Sorry, that ZIP is outside our delivery radius. Try pickup instead.</>
                              )}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: "rgba(250,246,240,0.12)" }}>
                        <PinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
                        <div>
                          <p className="text-sm font-bold" style={{ color: "#faf6f0" }}>{PICKUP_YARD.address}</p>
                          <p className="text-xs mt-1" style={{ color: "rgba(250,246,240,0.45)" }}>{PICKUP_YARD.hours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>
                      Pick a {mode === "delivery" ? "delivery" : "pickup"} window
                    </h2>
                    <div className="flex flex-col gap-4">
                      {dates.map((d, dIdx) => (
                        <div key={dIdx}>
                          <p className="text-xs font-bold mb-2" style={{ color: "rgba(250,246,240,0.45)" }}>{shortDay(d)}</p>
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((slot, sIdx) => {
                              const on = windowChoice?.dateIndex === dIdx && windowChoice?.slotIndex === sIdx;
                              const fast = (dIdx === 1 && sIdx === 0) || (dIdx === 3 && sIdx === 1);
                              return (
                                <button
                                  key={slot}
                                  onClick={() => setWindowChoice({ dateIndex: dIdx, slotIndex: sIdx })}
                                  className="relative rounded-lg border px-2 py-2.5 text-xs font-bold transition-all"
                                  style={{
                                    borderColor: on ? "#f59e0b" : "rgba(250,246,240,0.12)",
                                    background: on ? "rgba(245,158,11,0.1)" : "transparent",
                                    color: on ? "#faf6f0" : "rgba(250,246,240,0.6)",
                                  }}
                                >
                                  {slot}
                                  {fast && (
                                    <span className="block text-[9px] mt-0.5 font-black uppercase tracking-wide" style={{ color: "#f87171" }}>
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
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>Add anything else?</h2>
                    <div className="flex flex-col gap-3">
                      {ADDONS.map((a) => {
                        const on = addonIds.includes(a.id);
                        return (
                          <button
                            key={a.id}
                            onClick={() => toggleAddon(a.id)}
                            className="rounded-xl border p-4 flex items-center gap-4 text-left transition-all"
                            style={{ borderColor: on ? "#f59e0b" : "rgba(250,246,240,0.12)", background: on ? "rgba(245,158,11,0.08)" : "transparent" }}
                          >
                            <div
                              className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0"
                              style={{ borderColor: on ? "#f59e0b" : "rgba(250,246,240,0.25)", background: on ? "#f59e0b" : "transparent" }}
                            >
                              {on && <CheckIcon className="w-3 h-3" style={{ color: "#1a1512" }} />}
                            </div>
                            <div className="flex-1">
                              <p className="font-black text-sm" style={{ color: "#faf6f0" }}>{a.label}</p>
                              <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{a.desc}</p>
                            </div>
                            <p className="text-sm font-black flex-shrink-0" style={{ color: "#f59e0b" }}>+${a.price}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>Your details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(250,246,240,0.5)" }}>Name</label>
                        <input
                          type="text"
                          value={details.name}
                          onChange={(e) => setDetails((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Jake Morrison"
                          className="w-full rounded-lg px-4 py-3 text-base border focus:outline-none"
                          style={{ background: "rgba(250,246,240,0.06)", borderColor: "rgba(250,246,240,0.15)", color: "#faf6f0" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(250,246,240,0.5)" }}>Phone</label>
                        <input
                          type="tel"
                          value={details.phone}
                          onChange={(e) => setDetails((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="(406) 555-0100"
                          className="w-full rounded-lg px-4 py-3 text-base border focus:outline-none"
                          style={{ background: "rgba(250,246,240,0.06)", borderColor: "rgba(250,246,240,0.15)", color: "#faf6f0" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(250,246,240,0.5)" }}>
                          {mode === "delivery" ? "Delivery Address" : "Your Address (for our records)"}
                        </label>
                        <input
                          type="text"
                          value={details.address}
                          onChange={(e) => setDetails((p) => ({ ...p, address: e.target.value }))}
                          placeholder="418 Story Mill Rd, Bozeman"
                          className="w-full rounded-lg px-4 py-3 text-base border focus:outline-none"
                          style={{ background: "rgba(250,246,240,0.06)", borderColor: "rgba(250,246,240,0.15)", color: "#faf6f0" }}
                        />
                      </div>
                    </div>
                    <p className="text-[11px] mt-4" style={{ color: "rgba(250,246,240,0.3)" }}>
                      Demo only — nothing you type here is submitted or stored anywhere.
                    </p>
                  </div>
                )}

                {step === 7 && (
                  <div>
                    <h2 className="font-black text-lg mb-5" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>Reserve your order</h2>

                    <div className="rounded-xl p-4 mb-5 space-y-1.5 border" style={{ borderColor: "rgba(250,246,240,0.1)" }}>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "rgba(250,246,240,0.55)" }}>{quantityLabel(quantity)} of {species.name}</span>
                        <span style={{ color: "#faf6f0" }}>${woodPrice}</span>
                      </div>
                      {addonIds.map((id) => {
                        const a = ADDONS.find((x) => x.id === id);
                        if (!a) return null;
                        return (
                          <div key={id} className="flex justify-between text-sm">
                            <span style={{ color: "rgba(250,246,240,0.55)" }}>{a.label}</span>
                            <span style={{ color: "#faf6f0" }}>+${a.price}</span>
                          </div>
                        );
                      })}
                      <div className="border-t pt-1.5 mt-1 flex justify-between font-black" style={{ borderColor: "rgba(250,246,240,0.1)" }}>
                        <span className="text-sm" style={{ color: "rgba(250,246,240,0.7)" }}>Total</span>
                        <span style={{ color: "#f59e0b" }}>${total}</span>
                      </div>
                    </div>

                    <div className="relative rounded-xl border-2 border-dashed p-5" style={{ borderColor: "rgba(250,246,240,0.2)" }}>
                      <div className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border" style={{ color: "rgba(250,246,240,0.5)", borderColor: "rgba(250,246,240,0.2)" }}>
                        Demo — no real charge
                      </div>
                      <p className="text-sm mt-5 mb-1" style={{ color: "rgba(250,246,240,0.75)" }}>
                        20% deposit due now: <span className="font-black" style={{ color: "#f59e0b" }}>${deposit}</span>
                      </p>
                      <p className="text-xs mb-4" style={{ color: "rgba(250,246,240,0.4)" }}>
                        Remaining ${remaining} due on delivery.
                      </p>
                      <div className="space-y-2.5 opacity-50 pointer-events-none select-none">
                        <div className="rounded-lg px-4 py-2.5 text-sm border" style={{ color: "rgba(250,246,240,0.6)", borderColor: "rgba(250,246,240,0.15)" }}>4242 4242 4242 4242</div>
                        <div className="flex gap-2.5">
                          <div className="flex-1 rounded-lg px-4 py-2.5 text-sm border" style={{ color: "rgba(250,246,240,0.6)", borderColor: "rgba(250,246,240,0.15)" }}>12/28</div>
                          <div className="flex-1 rounded-lg px-4 py-2.5 text-sm border" style={{ color: "rgba(250,246,240,0.6)", borderColor: "rgba(250,246,240,0.15)" }}>123</div>
                        </div>
                      </div>
                      <button
                        onClick={() => { setPlaced(true); setStep(8); }}
                        className="mt-5 w-full py-3.5 rounded-lg font-black text-sm transition-transform hover:scale-[1.02]"
                        style={{ background: "#f59e0b", color: "#1a1512" }}
                      >
                        Place order — ${deposit} deposit (demo)
                      </button>
                    </div>
                  </div>
                )}

                {step === 8 && placed && (
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(74,222,128,0.15)" }}>
                      <CheckIcon className="w-7 h-7" style={{ color: "#4ade80" }} />
                    </div>
                    <h2 className="font-black text-xl mb-1" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>Order Confirmed</h2>
                    <p className="text-sm mb-6" style={{ color: "rgba(250,246,240,0.5)" }}>
                      {quantityLabel(quantity)} of {species.name} · {chosenDate && shortDay(chosenDate)}, {chosenSlot} · ${total} total
                    </p>

                    <PhoneMockup contactName="Big Sky Firewood" messages={confirmationMessages} />

                    <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(250,246,240,0.1)" }}>
                      <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#f59e0b" }}>
                        Every October, your past customers get this text, automatically:
                      </p>
                      <PhoneMockup contactName="Big Sky Firewood" messages={reorderMessages} startDelay={confirmationMessages.length * 0.55 + 0.4} />
                    </div>

                    <div className="mt-10 flex flex-col items-center gap-4">
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-black tracking-tight transition-transform hover:scale-105"
                        style={{ background: "#f59e0b", color: "#1a1512" }}
                      >
                        This Could Be Your Business →
                      </Link>
                      <Link
                        href="/demo/bigsky"
                        className="text-sm font-bold"
                        style={{ color: "rgba(250,246,240,0.45)" }}
                      >
                        ← Back to Big Sky Firewood
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step <= 7 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: "rgba(250,246,240,0.1)" }}>
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="text-sm font-bold disabled:opacity-0 disabled:pointer-events-none"
                  style={{ color: "rgba(250,246,240,0.5)" }}
                >
                  ← Back
                </button>
                {step <= 6 && (
                  <button
                    onClick={() => setStep((s) => Math.min(7, s + 1))}
                    disabled={!canAdvance}
                    className="px-6 py-3 rounded-lg font-black text-sm transition-transform hover:scale-105 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
                    style={{ background: "#f59e0b", color: "#1a1512" }}
                  >
                    Next →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {step <= 6 && (
        <div
          className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-5 py-3.5 flex items-center justify-between border-t"
          style={{ background: "#1a1512", borderColor: "rgba(250,246,240,0.1)" }}
        >
          <span className="text-xs" style={{ color: "rgba(250,246,240,0.5)" }}>
            {quantityLabel(quantity)} of {species.name}
          </span>
          <motion.span key={total} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }} className="text-lg font-black" style={{ color: "#f59e0b" }}>
            ${total}
          </motion.span>
        </div>
      )}

      <div className="hidden sm:block">
        <Footer />
      </div>
    </div>
  );
}
