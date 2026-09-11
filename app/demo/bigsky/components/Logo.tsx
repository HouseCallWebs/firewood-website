import { AxeIcon } from "./icons";
import { BUSINESS_NAME } from "../lib/data";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <span
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "#5c3d2e" }}
      >
        <AxeIcon className="w-5 h-5 text-[#f59e0b]" />
      </span>
      <span className="font-sans font-black tracking-tight text-lg leading-none" style={{ color: "#faf6f0" }}>
        {BUSINESS_NAME}
      </span>
    </span>
  );
}
