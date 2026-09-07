export default function UrgencyBanner() {
  return (
    <div className="relative px-4 py-2.5 text-center text-sm font-semibold flex items-center justify-center gap-2"
      style={{ background: "rgba(232,89,12,0.12)", borderTop: "1px solid rgba(232,89,12,0.2)", borderBottom: "1px solid rgba(232,89,12,0.2)", color: "#ffd8b8" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flicker flex-shrink-0" />
      <span>Limited weekend delivery slots — order today before the next cold snap.</span>
    </div>
  );
}
