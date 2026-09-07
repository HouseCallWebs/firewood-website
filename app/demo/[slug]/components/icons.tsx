// A small, consistent line-icon set for the /demo storefront — replaces
// ad-hoc emoji so the page reads as one designed system rather than a
// collection of mismatched glyphs. All icons share the same stroke weight
// and inherit color via `currentColor`, so sizing/coloring is just className.

type IconProps = { className?: string };

export function CrossedAxesMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(45 12 12)">
        <rect x="10.8" y="3" width="2.4" height="17" rx="1.2" fill="url(#axesMarkGrad)" />
        <path d="M6.5 3.2h11l-2.6 5.3h-5.8z" fill="url(#axesMarkGrad)" />
      </g>
      <g transform="rotate(-45 12 12)">
        <rect x="10.8" y="3" width="2.4" height="17" rx="1.2" fill="url(#axesMarkGrad)" />
        <path d="M6.5 3.2h11l-2.6 5.3h-5.8z" fill="url(#axesMarkGrad)" />
      </g>
      <defs>
        <linearGradient id="axesMarkGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#e8590c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 4.5c0-.8.7-1.5 1.5-1.5h1.8l1.3 3.6-1.4 1.5c.8 2.1 2.6 3.9 4.7 4.7l1.5-1.4 3.6 1.3v1.8c0 .8-.7 1.5-1.5 1.5C10.5 16 5 10.5 5 4.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DropletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3.2s5.8 6.4 5.8 10.6a5.8 5.8 0 11-11.6 0C6.2 9.6 12 3.2 12 3.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.8 14.2l2 2 4.4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BanIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.6 6.6l10.8 10.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21s7-7.4 7-12.2a7 7 0 10-14 0C5 13.6 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8.8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2.3l2 1.2 2.3-.3.9 2.1 2.1.9-.3 2.3 1.2 2-1.2 2 .3 2.3-2.1.9-.9 2.1-2.3-.3-2 1.2-2-1.2-2.3.3-.9-2.1-2.1-.9.3-2.3-1.2-2 1.2-2-.3-2.3 2.1-.9.9-2.1 2.3.3z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8.3 12.2l2.2 2.2 4.4-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
