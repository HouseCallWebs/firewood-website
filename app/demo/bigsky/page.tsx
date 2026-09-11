import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import PricingTable from "./components/PricingTable";
import DeliveryArea from "./components/DeliveryArea";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export const metadata = {
  title: "Big Sky Firewood — Firewood Delivered to Bozeman, MT",
  description:
    "Seasoned firewood delivered across Bozeman, Belgrade, Livingston, Big Sky, and Ennis. Order online in 60 seconds.",
};

export default function BigSkyHomePage() {
  return (
    <div style={{ background: "#1a1512", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <HowItWorks />
      <PricingTable />
      <DeliveryArea />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
