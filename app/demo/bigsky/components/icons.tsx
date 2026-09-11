// Inline SVG icon set for the Big Sky Firewood demo — no external image or
// icon-font dependencies, so nothing here can ever 404.

export function AxeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3l6 6-7 7-2-2 5-5-2-2-5 5-2-2 7-7z" fill="currentColor" />
      <rect x="3.5" y="13.5" width="3" height="9" rx="1" transform="rotate(-45 5 18)" fill="currentColor" />
    </svg>
  );
}

export function LogIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="5" cy="12" rx="3.2" ry="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="5" cy="12" r="1.1" fill="currentColor" />
      <path d="M7.8 9.3L19 8.2a2.8 2.8 0 012.5 4.4L19 14.7l-11.2-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="19.4" cy="11.6" rx="2.1" ry="2.6" transform="rotate(6 19.4 11.6)" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function TruckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5h11v9H2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 10h4.5l3 3.2v2.3H13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="6.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PhoneIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12.5l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s7-7.2 7-12.5A7 7 0 005 9.5C5 14.8 12 22 12 22z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function StarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.5l2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17.5l-6.1 3.3 1.5-6.7-5.1-4.6 6.8-.7L12 2.5z" />
    </svg>
  );
}

export function ChevronIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
