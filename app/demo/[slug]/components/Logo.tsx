import { CrossedAxesMark } from "./icons";

export default function Logo({ businessName }: { businessName: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(232,89,12,0.12)", border: "1px solid rgba(232,89,12,0.3)" }}
      >
        <CrossedAxesMark className="w-6 h-6" />
      </div>
      <div className="leading-tight">
        <span className="display-font font-bold text-lg text-white tracking-tight block">{businessName}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-400/70">Firewood &amp; Delivery</span>
      </div>
    </div>
  );
}
