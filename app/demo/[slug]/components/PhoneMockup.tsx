"use client";
import { motion } from "framer-motion";

export interface ThreadMessage {
  text: string;
  time: string;
  from: "business" | "customer";
}

// iPhone-style message thread mockup, styled to this demo's own ember-red
// palette (see DemoStorefront.tsx). Purely visual — no real messages are
// ever sent. Each bubble stagger-animates in based on its index so the
// thread feels like it's arriving live, not just appearing.
export default function PhoneMockup({
  contactName,
  messages,
  startDelay = 0,
}: {
  contactName: string;
  messages: ThreadMessage[];
  startDelay?: number;
}) {
  return (
    <div
      className="mx-auto w-full max-w-[320px] rounded-[2.25rem] border-4 p-2"
      style={{ background: "#0a0705", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="rounded-[1.75rem] overflow-hidden" style={{ background: "#130d0a" }}>
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-white/70">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span>●●●</span>
            <span>🔋</span>
          </span>
        </div>

        <div className="flex flex-col items-center pt-1 pb-3 border-b border-white/6">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white mb-1.5"
            style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
          >
            {contactName.charAt(0)}
          </div>
          <p className="text-xs font-semibold text-white">{contactName}</p>
        </div>

        <div className="px-3 py-4 space-y-3 min-h-[160px]">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: startDelay + i * 0.55, duration: 0.35, ease: "easeOut" }}
              className={`flex flex-col ${m.from === "customer" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                  m.from === "customer" ? "rounded-br-md text-white font-bold" : "rounded-bl-md text-white/90"
                }`}
                style={
                  m.from === "customer"
                    ? { background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }
                    : { background: "rgba(255,255,255,0.08)" }
                }
              >
                {m.text}
              </div>
              <span className={`text-[10px] mt-1 text-white/30 ${m.from === "customer" ? "mr-1" : "ml-1"}`}>
                {m.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
