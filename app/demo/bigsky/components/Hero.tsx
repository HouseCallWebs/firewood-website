import Link from "next/link";
import { StarIcon } from "./icons";
import { HEADLINE_FONT } from "../lib/data";

export default function Hero() {
  return (
    <section className="px-5 pt-16 pb-14 sm:pt-24 sm:pb-20" style={{ background: "#1a1512" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="font-black uppercase tracking-tight leading-[0.98] text-4xl sm:text-6xl mb-5"
          style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
        >
          Firewood Delivered.
          <br />
          <span style={{ color: "#f59e0b" }}>Ordered in 60 Seconds.</span>
        </h1>
        <p className="text-base sm:text-lg mb-9 max-w-xl mx-auto" style={{ color: "rgba(250,246,240,0.6)" }}>
          Pick your wood, pick your day, we handle the rest.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/demo/bigsky/order"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-black tracking-tight transition-transform hover:scale-105"
            style={{ background: "#f59e0b", color: "#1a1512" }}
          >
            Order Firewood
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-bold border-2 transition-colors"
            style={{ borderColor: "rgba(250,246,240,0.2)", color: "#faf6f0" }}
          >
            See Pricing
          </a>
        </div>

        <div
          className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold px-5 py-3 rounded-xl"
          style={{ background: "rgba(92,61,46,0.35)", color: "rgba(250,246,240,0.8)" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="w-4 h-4 text-[#f59e0b]" />
              ))}
            </span>
            4.9 stars
          </span>
          <span style={{ color: "rgba(250,246,240,0.25)" }}>•</span>
          <span>2,300+ cords delivered</span>
          <span style={{ color: "rgba(250,246,240,0.25)" }}>•</span>
          <span>Bozeman, MT</span>
        </div>
      </div>
    </section>
  );
}
