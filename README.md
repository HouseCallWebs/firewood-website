# Firewood Website

Sales storefront for [firewoodwebsite.com](https://firewoodwebsite.com) — HouseCall Webs's
niche site for the firewood delivery trade. Independent Next.js project: own repo, own
Vercel project, own domain. Shares backend accounts (Square, Resend) with
housecallwebs.com but calls its own `/api/*` routes — no cross-project API calls.

## Before first deploy

This project needs two groups of environment variables set in **this project's own**
Vercel settings (Project → Settings → Environment Variables). See
[`.env.local.example`](.env.local.example) for the full list with comments.

1. **Square (checkout)** — `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`,
   `SQUARE_ENVIRONMENT=production`. Same production Square account as
   housecallwebs.com, so payments land in the same place, but configured
   independently here.
2. **Resend (contact form)** — `RESEND_API_KEY`. Leads are emailed to
   `hello@housecallwebs.com` by default; the from-address falls back to
   `noreply@housecallwebs.com` until `noreply@firewoodwebsite.com` is a
   verified sending domain in Resend (then set `CONTACT_FROM_ADDRESS`).

Copy `.env.local.example` to `.env.local` for local development.

## Pricing

`lib/pricing.ts` is the single source of truth for the base price, add-ons, and
bundles — both `/pricing` (display) and `/api/checkout/create-subscription`
(billing) import from it, so they can't drift out of sync.

## Wildcard subdomain demo previews

Any subdomain other than `www` (e.g. `bobsfirewood.firewoodwebsite.com`) is
rewritten by `proxy.ts` to `/demo/[slug]`, which renders a personalized
storefront preview — business name, instant quote calculator, and a mock AI
receptionist transcript — derived entirely from the slug via
`lib/subdomain.ts`. No database lookup, so any subdomain works with zero
manual setup. `firewoodwebsite.com`, `www`, and `localhost` all continue to
the normal site; `/api/*` is excluded from the rewrite so checkout and
contact keep working regardless of hostname.

**To go live**: add a wildcard domain (`*.firewoodwebsite.com`) in this
project's Vercel domain settings, pointed at this same deployment.

**Local testing**: add an entry like `127.0.0.1 bobsfirewood.localhost` to
`/etc/hosts`, then visit `http://bobsfirewood.localhost:3070` — or just visit
`http://localhost:3070/demo/bobsfirewood` directly, since it's a real route.

## Development

```bash
npm install
npm run dev
```

Runs on [http://localhost:3070](http://localhost:3070) (see `.claude/launch.json`).

## Deploy

Push to GitHub (HouseCallWebs org), import into Vercel, set the env vars above,
add `firewoodwebsite.com` as a custom domain.
