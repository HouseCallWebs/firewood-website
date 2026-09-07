const EXAMPLE_BUSINESS = "Big Sky Firewood";

const TRANSCRIPT = [
  { speaker: "caller", text: "Hi, do you guys deliver firewood out to Millbrook?" },
  {
    speaker: "ai",
    text: `Yes we do! Thanks for calling ${EXAMPLE_BUSINESS} — we deliver to Millbrook and most of the surrounding area. Are you looking for a half cord or a full cord?`,
  },
  { speaker: "caller", text: "Probably a half cord. Do you stack it too?" },
  {
    speaker: "ai",
    text: "We do — stacking is a flat $40 add-on. I can get you on the schedule for this week. Can I grab your name and address?",
  },
  { speaker: "caller", text: "Sure, it's Dana Ruiz, 214 Millbrook Rd." },
  {
    speaker: "ai",
    text: `Got it, Dana — I've texted you a confirmation and a link to finalize payment. Thanks for calling ${EXAMPLE_BUSINESS}!`,
  },
];

export default function AIReceptionistPitch() {
  return (
    <section className="py-28 px-6" style={{ background: "#1b130e" }}>
      <div className="max-w-2xl mx-auto">
        <div className="reveal-up text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">AI phone receptionist add-on</p>
          <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            See What Your <span className="gradient-text">AI Receptionist</span> Could Sound Like.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Every missed call is a missed cord. Add a 24/7 AI receptionist that answers,
            quotes, and books the job — sounding like it&apos;s really part of your team.
            Here&apos;s a sample call.
          </p>
        </div>

        <div className="reveal-up rounded-3xl border border-white/8 p-6 space-y-3" style={{ background: "rgba(255,237,213,0.03)" }}>
          <div className="flex items-center gap-2 pb-3 mb-1 border-b border-white/6">
            <span className="w-2 h-2 rounded-full bg-green-400 flicker" />
            <span className="text-xs text-white/40 font-mono">Incoming call transcript — simulated</span>
          </div>
          {TRANSCRIPT.map((line, i) => (
            <div key={i} className={`flex ${line.speaker === "ai" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  line.speaker === "ai" ? "text-black" : "text-white/75"
                }`}
                style={
                  line.speaker === "ai"
                    ? { background: "linear-gradient(135deg, #e8590c, #fbbf24)" }
                    : { background: "rgba(255,255,255,0.06)" }
                }
              >
                <p className="text-[10px] font-bold uppercase tracking-wide opacity-60 mb-1">
                  {line.speaker === "ai" ? `${EXAMPLE_BUSINESS} AI Receptionist` : "Caller"}
                </p>
                {line.text}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          Sample transcript for illustration — your AI receptionist is personalized to your
          business name, hours, and pricing.
        </p>
      </div>
    </section>
  );
}
