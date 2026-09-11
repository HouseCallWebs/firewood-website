import { StarIcon } from "./icons";
import { REVIEWS, HEADLINE_FONT } from "../lib/data";

export default function Reviews() {
  return (
    <section id="reviews" className="px-5 py-16 sm:py-20" style={{ background: "#1a1512" }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-black uppercase tracking-tight text-3xl sm:text-4xl text-center mb-12"
          style={{ color: "#faf6f0", fontFamily: HEADLINE_FONT }}
        >
          What Folks Are Saying
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border p-6"
              style={{ borderColor: "rgba(250,246,240,0.1)", background: "rgba(250,246,240,0.03)" }}
            >
              <div className="flex gap-0.5 mb-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="w-4 h-4 text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(250,246,240,0.75)" }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <p className="text-sm font-black" style={{ color: "#faf6f0" }}>
                {r.name} <span className="font-normal" style={{ color: "rgba(250,246,240,0.4)" }}>· {r.town}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
