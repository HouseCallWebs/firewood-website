import Link from "next/link";
import PhoneMockup, { type MockMessage } from "./PhoneMockup";

const EXAMPLE_BUSINESS = "Riverbend Firewood Co.";

const MESSAGES: MockMessage[] = [
  { text: "Hey Dana — fall's here. Ready for your usual half cord of oak? Reply YES and we'll get you on the schedule.", time: "Sep 12, 9:03 AM" },
  { text: "YES", time: "Sep 12, 9:14 AM" },
  { text: "You're set for Sat, Sep 20. We'll text the day before. Thanks for being a repeat customer!", time: "Sep 12, 9:14 AM" },
];

export default function FallReorderEngine() {
  return (
    <section className="py-28 px-6" style={{ background: "#1b130e" }}>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal-left">
          <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-4">The Fall Reorder Engine</p>
          <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Your Old Customers <span className="gradient-text">Rebuy Themselves.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-6">
            Every customer who&apos;s ever bought from you gets a one-tap reorder
            text when the season turns. They reply YES, they&apos;re on the
            schedule. You didn&apos;t make a single call.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Texts go out to your whole customer list automatically",
              "One reply books the order — no app, no login",
              "Works while you're on the road or off the clock",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[#b0271a] text-xs font-bold"
                  style={{ background: "rgba(139,26,15,0.12)" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/live-demo"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-xl"
            style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 30px rgba(139,26,15,0.25)" }}
          >
            See It In the Live Demo →
          </Link>
        </div>

        <div className="reveal-right">
          <PhoneMockup senderName={EXAMPLE_BUSINESS} messages={MESSAGES} />
          <p className="text-white/20 text-xs text-center mt-4 max-w-[300px] mx-auto">
            Example texts for illustration. Activates once your account is set up.
          </p>
        </div>
      </div>
    </section>
  );
}
