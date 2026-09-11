"use client";
import { useState } from "react";
import { ChevronIcon } from "./icons";
import { FAQS, HEADLINE_FONT } from "../lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-16 sm:py-20" style={{ background: "#150f0c" }}>
      <div className="max-w-2xl mx-auto">
        <h2
          className="font-black uppercase tracking-tight text-3xl sm:text-4xl text-center mb-10"
          style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
        >
          Frequently Asked
        </h2>
        <div className="flex flex-col gap-2.5">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "rgba(250,246,240,0.1)", background: "rgba(250,246,240,0.03)" }}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-bold text-sm" style={{ color: "#faf6f0" }}>{item.q}</span>
                  <ChevronIcon
                    className={`w-5 h-5 flex-shrink-0 text-[#f59e0b] transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "rgba(250,246,240,0.55)" }}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
