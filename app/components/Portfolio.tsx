const liveSites = [
  {
    name: "BlueFlow Plumbing",
    trade: "Plumbing",
    location: "Phoenix, AZ",
    url: "https://blueflow-plumbing.housecallwebs.com",
  },
  {
    name: "Peak Comfort HVAC",
    trade: "HVAC",
    location: "Phoenix, AZ",
    url: "https://peak-comfort-hvac.housecallwebs.com",
  },
  {
    name: "Reliable Hand Handyman",
    trade: "Handyman Services",
    location: "Sacramento, CA",
    url: "https://reliable-hand-handyman.housecallwebs.com",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6" style={{ background: "#1b130e" }}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal-up text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">See it&apos;s real</p>
          <h2 className="display-font text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            This Isn&apos;t a <span className="gradient-text">Template Mockup.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Firewood Website is built by HouseCall Webs — the same team and platform
            already running live sites for home service businesses across the country.
            Here&apos;s real, live work:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {liveSites.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/6 hover:border-orange-500/25 transition-all overflow-hidden block"
              style={{ background: "rgba(255,237,213,0.03)" }}
            >
              {/* Browser-chrome header */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5" style={{ background: "rgba(0,0,0,0.2)" }}>
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[11px] text-white/25 truncate">{site.url.replace("https://", "")}</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-base font-bold text-white group-hover:text-orange-100 transition-colors">{site.name}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "rgba(232,89,12,0.14)", color: "#f2994a" }}>
                    {site.trade}
                  </span>
                </div>
                <p className="text-white/35 text-sm mb-4">{site.location}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                  View live site
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Firewood-specific preview teaser */}
        <div className="reveal-up rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "rgba(232,89,12,0.05)", borderColor: "rgba(232,89,12,0.2)" }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Coming to every client</p>
            <h3 className="text-xl font-bold text-white mb-2">
              Your Own Personalized Preview
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg">
              Every prospect will soon get a live, personalized demo of their own site —
              something like <span className="text-white/70 font-mono text-xs">bobsfirewood.firewoodwebsite.com</span> —
              built automatically before you ever sign up. That system is on the way.
              For now, book a call and we&apos;ll walk you through a live build.
            </p>
          </div>
          <span className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full"
            style={{ background: "rgba(63,107,74,0.18)", color: "#8ec49b", border: "1px solid rgba(63,107,74,0.35)" }}>
            🌲 In development
          </span>
        </div>
      </div>
    </section>
  );
}
