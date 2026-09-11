import Logo from "./Logo";
import { PhoneIcon, PinIcon } from "./icons";
import { BUSINESS_PHONE, BUSINESS_CITY, PICKUP_YARD } from "../lib/data";

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "#150f0c", borderColor: "rgba(250,246,240,0.08)" }}>
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          <div>
            <Logo />
            <p className="text-sm mt-3 max-w-xs" style={{ color: "rgba(250,246,240,0.45)" }}>
              Seasoned firewood, delivered to your door across the Gallatin Valley.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(250,246,240,0.6)" }}>
            <span className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 flex-shrink-0 text-[#f59e0b]" />
              {BUSINESS_PHONE.display}
            </span>
            <span className="flex items-center gap-2">
              <PinIcon className="w-4 h-4 flex-shrink-0 text-[#f59e0b]" />
              {PICKUP_YARD.address}
            </span>
            <span style={{ color: "rgba(250,246,240,0.4)" }}>{BUSINESS_CITY}</span>
          </div>
        </div>
        <div className="pt-6 border-t text-xs" style={{ borderColor: "rgba(250,246,240,0.08)", color: "rgba(250,246,240,0.3)" }}>
          This is a fictional demo storefront built to showcase an ordering system for firewood delivery businesses.
        </div>
      </div>
    </footer>
  );
}
