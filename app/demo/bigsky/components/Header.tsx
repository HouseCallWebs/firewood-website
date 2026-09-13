"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MenuIcon, CloseIcon } from "./icons";

const sectionLinks = [
  { label: "Pricing", section: "pricing" },
  { label: "Delivery Area", section: "delivery" },
  { label: "Reviews", section: "reviews" },
  { label: "FAQ", section: "faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // These links point at sections that only exist on the homepage. A bare
  // "#pricing" only works if you're already on /demo/bigsky — from any other
  // page (e.g. /order) it silently does nothing, since the browser has
  // nothing to scroll to. Prefix with the homepage path everywhere else.
  const onHomepage = pathname === "/demo/bigsky";
  const navLinks = sectionLinks.map((l) => ({
    label: l.label,
    href: onHomepage ? `#${l.section}` : `/demo/bigsky#${l.section}`,
  }));

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "#1a1512", borderColor: "rgba(250,246,240,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/demo/bigsky" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors"
              style={{ color: "rgba(250,246,240,0.65)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/demo/bigsky/order"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-black tracking-tight transition-transform hover:scale-105"
            style={{ background: "#f59e0b", color: "#1a1512" }}
          >
            Order Now
          </Link>
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#faf6f0" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-5 py-4 flex flex-col gap-1" style={{ borderColor: "rgba(250,246,240,0.08)", background: "#1a1512" }}>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-semibold rounded-lg"
              style={{ color: "rgba(250,246,240,0.75)" }}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/demo/bigsky/order"
            className="mt-2 sm:hidden inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-black"
            style={{ background: "#f59e0b", color: "#1a1512" }}
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
