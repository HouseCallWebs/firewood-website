import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const sections = [
  {
    title: "1. Agreement & Services",
    body: "These Terms govern website design, hosting, and maintenance services provided by Firewood Website, a HouseCall Webs company.",
  },
  {
    title: "2. Ownership & Hosting",
    body: "All websites remain property of Firewood Website until the client exercises a full buyout. Monthly service includes hosting, security updates, and maintenance.",
  },
  {
    title: "3. Monthly Billing",
    body: "You authorize recurring monthly charges. Billing begins 30 days after site launch. Cancel anytime.",
  },
  {
    title: "4. Site Buyout",
    body: "You may request full ownership transfer at any time. Buyout fee is the greater of 6× your monthly rate or $1,500. Upon payment we transfer all files and access.",
  },
  {
    title: "5. Cancellation",
    body: "Cancel anytime. Hosting and support end at the close of the paid period. No refunds for partial months.",
  },
  {
    title: "6. Acceptable Use",
    body: "You agree not to use the website for illegal activities or prohibited content.",
  },
  {
    title: "7. Limitation of Liability",
    body: "Firewood Website's liability shall not exceed the amount paid in the last 12 months.",
  },
  {
    title: "8. Governing Law",
    body: "Governed by the laws of the State of California.",
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8590c 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      <Nav />

      <main className="relative pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">Legal</p>
            <h1 className="display-font text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-white/35 text-sm">
              Firewood Website &nbsp;·&nbsp; Effective Date: 2026
            </p>
          </div>

          <div className="rounded-2xl p-6 mb-10 border border-white/6"
            style={{ background: "rgba(232,89,12,0.04)", borderColor: "rgba(232,89,12,0.15)" }}>
            <p className="text-white/60 text-sm leading-relaxed">
              Please read these Terms of Service carefully before using any services provided by Firewood Website.
              By engaging our services you agree to be bound by the terms below.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title} className="border-b border-white/5 pb-8 last:border-0">
                <h2 className="text-white font-bold text-base mb-3">{s.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white/25 text-xs">
              Questions? Email us at{" "}
              <a href="mailto:hello@housecallwebs.com"
                className="text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2">
                hello@housecallwebs.com
              </a>
            </p>
            <Link
              href="/"
              className="text-xs font-semibold text-white/40 hover:text-white transition-colors"
            >
              ← Back to home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
