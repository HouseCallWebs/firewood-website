import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export const metadata = {
  title: "Contact — Firewood Website",
  description: "Get a free quote for your firewood delivery business website.",
};

export default function ContactPage() {
  return (
    <div style={{ background: "#130d0a", minHeight: "100vh" }}>
      <Nav />
      <div className="pt-16">
        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
}
