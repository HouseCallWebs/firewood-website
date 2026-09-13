// The Firewood Website brand's own logo lockup — separate from the client
// business logos used on /demo pages (see app/demo/[slug]/components/Logo.tsx
// and app/demo/bigsky/components/Logo.tsx, which stay their own marks).
// A single scalable SVG: a geometric axe-head icon beside a bold condensed
// wordmark, sized off one viewBox so it holds up from favicon-small header
// use up to a large standalone mark.
export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Firewood Website"
    >
      {/* Axe head: an angular wedge (flat poll, single curved cutting edge) on a short diagonal handle. */}
      <path
        d="M14 52 L28 27"
        stroke="#b0271a"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M28 27
           L 25 8
           L 55 17
           Q 45 24 28 27
           Z"
        fill="#b0271a"
      />
      <text
        x="62"
        y="41"
        fontFamily="var(--font-wordmark), 'Arial Narrow', sans-serif"
        fontWeight={700}
        fontSize="30"
        textLength="224"
        lengthAdjust="spacingAndGlyphs"
        fill="#f5ede4"
      >
        FIREWOOD WEBSITE
      </text>
    </svg>
  );
}
