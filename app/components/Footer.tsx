import Link from "next/link";
import Wordmark from "./Wordmark";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Firewood Delivery Websites", href: "/#services" },
      { label: "Cordwood & Wholesale", href: "/#services" },
      { label: "Seasonal Pre-Order Sites", href: "/#services" },
      { label: "Pricing & Add-ons", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0f0a07" }} className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-5 w-fit">
              <Wordmark className="h-9 w-auto" />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
              Premium, high-converting websites built exclusively for firewood
              delivery and cordwood businesses across the USA.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/30">
              <span>📧 hello@firewoodwebsite.com</span>
              <span>🇺🇸 Built in the USA</span>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-white text-sm font-bold mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}
                      className="text-sm text-white/30 hover:text-white transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Firewood Website. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-white/20 hover:text-white/50 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-xs text-white/20 hover:text-white/50 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
