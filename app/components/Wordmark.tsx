// The Firewood Website brand's own signature-style wordmark — separate from
// the client business logos used on /demo pages (see
// app/demo/[slug]/components/Logo.tsx, which stays a bold crossed-axes mark).
// Built as a single scalable SVG: a small ember accent beside a script
// wordmark, so it works small in the header and large as a standalone mark.
export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Firewood Website"
    >
      <path
        d="M20 6c1.3 4.3-3.3 5.8-3.3 10.3 0 2.4 1.8 4 3.7 4s3.6-1.4 3.6-3.4c0-1.2-.6-2.2-1.3-2.9.8 1.9 3.4 3.1 3.4 6.4 0 4.1-3 6.9-6.8 6.9S12.5 25 12.5 20.8c0-5.8 4.6-7 5.9-14.8z"
        fill="url(#wordmarkFlame)"
      />
      <text
        x="34"
        y="40"
        fontFamily="var(--font-script), cursive"
        fontSize="38"
        fill="#f5ede4"
      >
        Firewood Website
      </text>
      <defs>
        <linearGradient id="wordmarkFlame" x1="12" y1="6" x2="26" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9432c" />
          <stop offset="1" stopColor="#8b1a0f" />
        </linearGradient>
      </defs>
    </svg>
  );
}
