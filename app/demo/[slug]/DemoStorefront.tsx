import Logo from "./components/Logo";
import TrustBarStrip from "./components/TrustBarStrip";
import UrgencyBanner from "./components/UrgencyBanner";
import WoodQuality from "./components/WoodQuality";
import PhotoGallery from "./components/PhotoGallery";
import DeliveryArea from "./components/DeliveryArea";
import Reviews from "./components/Reviews";
import OrderFlow from "./OrderFlow";
import { PhoneIcon } from "./components/icons";

// Reserved fictional number range (555-0100 to 555-0199) — safe to display,
// never rings a real line. Swap in the client's real number per demo later.
const PLACEHOLDER_PHONE = { display: "(555) 010-3070", tel: "+15550103070" };

// Established-business framing — placeholder history in the same spirit as
// the placeholder reviews and service towns below. Swap for the real story
// once a client is on board.
const YEARS_SERVING = 15;
const HOME_REGION = "the Millbrook area";

interface Props {
  slug: string;
  businessName: string;
}

export default function DemoStorefront({ businessName }: Props) {
  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b1a0f 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="fixed bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7a4a24 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      {/* Header — this business's own branding, not Firewood Website's */}
      <header className="sticky top-0 z-50 border-b border-white/5 px-6 py-4" style={{ background: "rgba(19,13,10,0.92)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo businessName={businessName} />
          <a
            href="#quote"
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}
          >
            Order Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        {/* Background video — muted/looping footage of firewood being stacked,
            with a static fallback poster (shown until the video can play, and
            permanently if it can't) so the hero never shows blank. */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/4203738/4203738-sd_640_360_30fps.mp4"
            poster="/images/demo/log-truck.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, rgba(19,13,10,0.78) 0%, rgba(19,13,10,0.6) 45%, rgba(19,13,10,0.92) 100%)",
          }} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase text-[#c9432c] mb-8"
            style={{ background: "rgba(139,26,15,0.10)", borderColor: "rgba(139,26,15,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b0271a] flicker" />
            Family-Owned &amp; Operated
          </span>
          <h1 className="display-font text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight text-white mb-6">
            {businessName}
          </h1>
          <p className="text-base sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed mb-8">
            Serving {HOME_REGION} for {YEARS_SERVING}+ years. Every cord is split and
            seasoned — never green — and delivered on your schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-xl"
              style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 30px rgba(139,26,15,0.3)" }}
            >
              Get Firewood Delivered This Week
            </a>
            <a
              href={`tel:${PLACEHOLDER_PHONE.tel}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border-2 border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
            >
              <PhoneIcon className="w-4 h-4" />
              Call {PLACEHOLDER_PHONE.display}
            </a>
          </div>
        </div>
      </section>

      <TrustBarStrip />
      <UrgencyBanner />

      {/* Order flow — same multi-step structure as the Big Sky Firewood
          flagship demo (species, quantity, delivery/pickup, window, add-ons,
          details, mock deposit, animated confirmation + reorder preview),
          reskinned to this business's own name and using this demo's own
          established species pricing. See ./OrderFlow.tsx. */}
      <section id="quote" className="relative px-6 pb-24">
        <p className="text-xs font-bold uppercase tracking-widest text-[#b0271a] mb-2 text-center">Order online</p>
        <h2 className="display-font text-white font-bold text-2xl sm:text-3xl mb-7 text-center">Get Your Firewood Delivered</h2>
        <OrderFlow businessName={businessName} />
      </section>

      <WoodQuality />
      <PhotoGallery />
      <DeliveryArea />
      <Reviews businessName={businessName} />

      {/* Closing CTA */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="display-font text-3xl sm:text-4xl font-bold text-white mb-4">
            Firewood You Can Count On.
          </h2>
          <p className="text-white/55 mb-8">
            Family-owned, locally operated, and ready to deliver — this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-xl"
              style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)", boxShadow: "0 0 30px rgba(139,26,15,0.3)" }}
            >
              Get Firewood Delivered This Week
            </a>
            <a
              href={`tel:${PLACEHOLDER_PHONE.tel}`}
              className="inline-flex flex-col items-center justify-center gap-0.5 px-8 py-3 rounded-xl text-base font-bold text-white border-2 border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
            >
              <span className="inline-flex items-center gap-1.5"><PhoneIcon className="w-4 h-4" /> Call Now</span>
              <span className="text-sm font-normal text-white/60">{PLACEHOLDER_PHONE.display}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 px-6 py-10 text-center">
        <p className="text-white/40 text-sm mb-1.5">
          Family-owned and operated, proudly serving {HOME_REGION}.
        </p>
        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
