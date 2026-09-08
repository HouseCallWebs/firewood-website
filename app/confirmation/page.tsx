import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Confirmation() {
  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b1a0f 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="fixed bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      <Nav />

      <div className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full text-center">

          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-8"
            style={{ background: "rgba(139,26,15,0.12)", border: "1px solid rgba(139,26,15,0.2)" }}>
            ✅
          </div>

          <h1 className="display-font text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            You&apos;re in.
          </h1>

          <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-sm mx-auto">
            We&apos;ll be in touch within <strong className="text-white">1 business hour</strong> to
            kick things off and get your site started.
          </p>

          <div className="rounded-2xl p-6 mb-10 text-left space-y-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-4">What happens next</p>
            {[
              { step: "1", text: "We'll email you a short intake form — takes 5 minutes." },
              { step: "2", text: "We start building your custom site." },
              { step: "3", text: "You're live within 7 days of sending us your info." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}>
                  {s.step}
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-105 hover:brightness-110 shadow-xl"
            style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 30px rgba(139,26,15,0.2)" }}
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
