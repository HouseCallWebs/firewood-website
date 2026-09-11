"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PinIcon, ArrowIcon } from "./icons";
import { DELIVERY_TOWNS, HEADLINE_FONT } from "../lib/data";

export default function DeliveryArea() {
  const router = useRouter();
  const [zip, setZip] = useState("");

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (zip.length !== 5) return;
    router.push(`/demo/bigsky/order?zip=${zip}`);
  }

  return (
    <section id="delivery" className="px-5 py-16 sm:py-20" style={{ background: "#150f0c" }}>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2
            className="font-black uppercase tracking-tight text-3xl sm:text-4xl mb-4"
            style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
          >
            Delivery Area
          </h2>
          <p className="text-sm mb-5" style={{ color: "rgba(250,246,240,0.5)" }}>
            We deliver free within 15 miles across the Gallatin Valley:
          </p>
          <ul className="grid grid-cols-2 gap-2.5 mb-8">
            {DELIVERY_TOWNS.map((town) => (
              <li key={town} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#faf6f0" }}>
                <PinIcon className="w-4 h-4 flex-shrink-0 text-[#f59e0b]" />
                {town}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border p-7" style={{ borderColor: "rgba(250,246,240,0.1)", background: "rgba(250,246,240,0.03)" }}>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#f59e0b" }}>
            Check your zip
          </p>
          <h3 className="font-black text-xl mb-4" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>
            Do we deliver to you?
          </h3>
          <form onSubmit={handleCheck} className="flex gap-2.5">
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="e.g. 59715"
              className="flex-1 min-w-0 rounded-lg px-4 py-3.5 text-base border focus:outline-none"
              style={{ background: "rgba(250,246,240,0.06)", borderColor: "rgba(250,246,240,0.15)", color: "#faf6f0" }}
            />
            <button
              type="submit"
              disabled={zip.length !== 5}
              className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-lg font-black text-sm disabled:opacity-40 transition-opacity"
              style={{ background: "#f59e0b", color: "#1a1512" }}
            >
              Check
              <ArrowIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
