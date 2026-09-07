import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Portfolio from "./components/Portfolio";
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
      <HowItWorks />
      <Portfolio />
      <PricingBanner />
      <WhyUs />
      <AIReceptionistPitch />
      <FinalCTA />
      <Footer />
    </>
  );
}
