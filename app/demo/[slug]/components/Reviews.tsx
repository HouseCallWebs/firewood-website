interface Props {
  businessName: string;
}

const REVIEWS = (businessName: string) => [
  {
    name: "Sarah M.",
    quote: `Ordered on a Tuesday and had a full cord stacked in my garage by Thursday. ${businessName} made it so easy.`,
  },
  {
    name: "Mike D.",
    quote: "Wood was bone dry and split perfectly — no smoke, no hassle starting fires all winter.",
  },
  {
    name: "Jennifer K.",
    quote: "The stacking service alone is worth it. They stacked it neater than I ever could have.",
  },
  {
    name: "Tom R.",
    quote: "Been ordering every fall for three years now. Always on time, always good wood.",
  },
  {
    name: "Amanda P.",
    quote: "Quality oak, fast delivery, and the crew was super friendly. Highly recommend.",
  },
  {
    name: "Chris B.",
    quote: "Called in the afternoon and had a full cord dropped off before dinner. Fastest delivery I've ever seen for firewood.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ businessName }: Props) {
  return (
    <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Customer reviews</p>
          <h2 className="display-font text-2xl sm:text-3xl font-bold text-white">What Customers Are Saying</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS(businessName).map((r) => (
            <div key={r.name} className="rounded-2xl p-6 border border-white/5 flex flex-col"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <Stars />
              <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 italic">&ldquo;{r.quote}&rdquo;</p>
              <p className="font-bold text-white text-sm">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
