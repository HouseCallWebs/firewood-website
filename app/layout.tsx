import type { Metadata } from "next";
import { Fraunces, Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Fraunces({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "900"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
// Bold condensed sans used only for the site's own wordmark logo (see
// app/components/Wordmark.tsx) — not used for body/heading copy.
const wordmark = Oswald({ variable: "--font-wordmark", subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Firewood Website — Websites Built for Firewood Delivery Businesses",
  description:
    "Professional, high-converting websites built exclusively for firewood delivery and cordwood businesses. Custom design, 7-day delivery, built in the USA.",
  keywords: "firewood website, firewood delivery website, cordwood business website, firewood marketing",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${wordmark.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
