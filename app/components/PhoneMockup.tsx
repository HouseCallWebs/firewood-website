// Reusable iPhone-style message-thread mockup — used on the homepage Fall
// Reorder Engine pitch and on the /live-demo confirmation screen. Purely
// visual; no real messages are ever sent.
export interface MockMessage {
  text: string;
  time: string;
}

export default function PhoneMockup({
  senderName,
  messages,
}: {
  senderName: string;
  messages: MockMessage[];
}) {
  return (
    <div
      className="mx-auto w-full max-w-[300px] rounded-[2.25rem] border-4 p-2"
      style={{ background: "#0c0805", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="rounded-[1.75rem] overflow-hidden" style={{ background: "#1b130e" }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-white/70">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span>●●●</span>
            <span>🔋</span>
          </span>
        </div>

        {/* Contact header */}
        <div className="flex flex-col items-center pt-1 pb-3 border-b border-white/5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white mb-1.5"
            style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}>
            {senderName.charAt(0)}
          </div>
          <p className="text-white text-xs font-semibold">{senderName}</p>
        </div>

        {/* Messages */}
        <div className="px-3 py-4 space-y-3 min-h-[220px]">
          {messages.map((m, i) => (
            <div key={i} className="flex flex-col items-start">
              <div
                className="max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13px] leading-snug text-white/85"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-white/25 mt-1 ml-1">{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
