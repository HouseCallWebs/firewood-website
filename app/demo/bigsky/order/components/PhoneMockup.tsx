"use client";
import { motion } from "framer-motion";

export interface ThreadMessage {
  text: string;
  time: string;
  from: "business" | "customer";
}

// iPhone-style message thread mockup. Purely visual — no real messages are
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
      style={{ background: "#0e0a08", borderColor: "rgba(250,246,240,0.1)" }}
    >
      <div className="rounded-[1.75rem] overflow-hidden" style={{ background: "#1a1512" }}>
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold" style={{ color: "rgba(250,246,240,0.7)" }}>
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span>●●●</span>
            <span>🔋</span>
          </span>
        </div>

        <div className="flex flex-col items-center pt-1 pb-3 border-b" style={{ borderColor: "rgba(250,246,240,0.06)" }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black mb-1.5"
            style={{ background: "#5c3d2e", color: "#f59e0b" }}
          >
            {contactName.charAt(0)}
          </div>
          <p className="text-xs font-semibold" style={{ color: "#faf6f0" }}>{contactName}</p>
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
                  m.from === "customer" ? "rounded-br-md" : "rounded-bl-md"
                }`}
                style={
                  m.from === "customer"
                    ? { background: "#f59e0b", color: "#1a1512", fontWeight: 700 }
                    : { background: "rgba(250,246,240,0.09)", color: "rgba(250,246,240,0.9)" }
                }
              >
                {m.text}
              </div>
              <span className={`text-[10px] mt-1 ${m.from === "customer" ? "mr-1" : "ml-1"}`} style={{ color: "rgba(250,246,240,0.3)" }}>
                {m.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
