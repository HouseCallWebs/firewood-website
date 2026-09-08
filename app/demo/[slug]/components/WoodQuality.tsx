import { DropletIcon, CalendarCheckIcon, BanIcon } from "./icons";

const POINTS = [
  { Icon: DropletIcon, text: "Moisture tested below 20% before every delivery" },
  { Icon: CalendarCheckIcon, text: "Split & seasoned a minimum of 6 months" },
  { Icon: BanIcon, text: "100% no green wood — guaranteed" },
];

export default function WoodQuality() {
  return (
    <section className="relative px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-2">Wood quality</p>
        <h2 className="display-font text-2xl sm:text-3xl font-bold text-white mb-3">Properly Seasoned. Every Time.</h2>
        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          We don&apos;t rush wood to your driveway. Every load is split, stacked, and
          seasoned before it&apos;s ready to burn.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {POINTS.map(({ Icon, text }) => (
            <div key={text} className="rounded-2xl border border-white/8 p-5"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-4 mx-auto"
                style={{ background: "rgba(139,26,15,0.12)" }}>
                <Icon className="w-[18px] h-[18px] text-[#b0271a]" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
