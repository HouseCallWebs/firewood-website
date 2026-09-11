import { LogIcon, TruckIcon, AxeIcon } from "./icons";
import { HEADLINE_FONT } from "../lib/data";

const steps = [
  { icon: LogIcon, title: "Choose your wood", desc: "Pick a species and how much you need — full, half, or face cord." },
  { icon: TruckIcon, title: "Pick a delivery window", desc: "Grab a day and time that works, or swing by our yard for pickup." },
  { icon: AxeIcon, title: "We stack it at your door", desc: "We show up in your window, unload, and stack it right where you want it." },
];

export default function HowItWorks() {
  return (
    <section className="px-5 py-16 sm:py-20" style={{ background: "#150f0c" }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-black uppercase tracking-tight text-3xl sm:text-4xl text-center mb-12"
          style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
        >
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "#5c3d2e" }}
              >
                <s.icon className="w-7 h-7 text-[#f59e0b]" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#f59e0b" }}>
                Step {i + 1}
              </p>
              <h3 className="font-black text-lg mb-2" style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "rgba(250,246,240,0.5)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
