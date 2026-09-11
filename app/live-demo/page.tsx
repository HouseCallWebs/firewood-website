import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LiveDemo from "./LiveDemo";

export const metadata = {
  title: "Live Demo — See the Ordering Machine in Action | Firewood Website",
  description:
    "Click through a real order — species, quantity, delivery, and the text messages your customers would get. No signup required.",
};

export default function LiveDemoPage() {
  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <div className="pricing-orbs fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b1a0f 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="pricing-orbs fixed bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3f6b4a 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="grain-pattern fixed inset-0 pointer-events-none" />

      <Nav />
      <LiveDemo />
      <Footer />
    </div>
  );
}
