import Link from "next/link";
import { PhoneIcon } from "./icons";
import { BUSINESS_PHONE, HEADLINE_FONT } from "../lib/data";

export default function FinalCTA() {
  return (
    <section className="px-5 py-16 sm:py-20 text-center" style={{ background: "#1a1512" }}>
      <div className="max-w-xl mx-auto">
        <h2
          className="font-black uppercase tracking-tight text-3xl sm:text-4xl mb-4"
          style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
        >
          Ready When You Are.
        </h2>
        <p className="text-sm mb-8" style={{ color: "rgba(250,246,240,0.55)" }}>
          Order online in under a minute, or give us a call.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/demo/bigsky/order"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-black tracking-tight transition-transform hover:scale-105"
            style={{ background: "#f59e0b", color: "#1a1512" }}
          >
            Order Firewood
          </Link>
          <a
            href={`tel:${BUSINESS_PHONE.tel}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-base font-bold border-2"
            style={{ borderColor: "rgba(250,246,240,0.2)", color: "#faf6f0" }}
          >
            <PhoneIcon className="w-4 h-4" />
            {BUSINESS_PHONE.display}
          </a>
        </div>
      </div>
    </section>
  );
}
