"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Wordmark from "./Wordmark";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(19,13,10,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,237,213,0.06)" : "none",
          paddingTop: scrolled ? "12px" : "20px",
          paddingBottom: scrolled ? "12px" : "20px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Wordmark className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href}
                className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact"
              className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}>
              Check Availability
            </Link>
          </div>

          <button className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <motion.span className="block w-5 h-0.5 bg-white rounded-full"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-0.5 bg-white rounded-full"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-0.5 bg-white rounded-full"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 mx-4 mt-2 rounded-2xl border border-white/8 p-5 flex flex-col gap-1"
            style={{ background: "rgba(27,19,14,0.98)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              className="mt-1 text-center text-sm font-bold px-5 py-3 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg, #8b1a0f, #c9432c)" }}>
              Check Availability
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
