import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Problem from "./components/Problem";
import FallReorderEngine from "./components/FallReorderEngine";
import HowItWorks from "./components/HowItWorks";
import PricingBanner from "./components/PricingBanner";
import WhyUs from "./components/WhyUs";
import AIReceptionistPitch from "./components/AIReceptionistPitch";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Problem />
      <FallReorderEngine />
      <HowItWorks />
      <PricingBanner />
      <WhyUs />
      <AIReceptionistPitch />
      <FinalCTA />
      <Footer />
    </>
  );
}
