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

## Wildcard subdomain demo previews (not built yet)

The eventual goal is a personalized demo preview per prospect, e.g.
`joesfirewood.firewoodwebsite.com`. `proxy.ts` has the scaffolding
(subdomain extraction, matcher config) commented in place — see the comment
block at the top of that file for the remaining steps once this is ready to
build.

## Development

```bash
npm install
npm run dev
```

Runs on [http://localhost:3070](http://localhost:3070) (see `.claude/launch.json`).

## Deploy

Push to GitHub (HouseCallWebs org), import into Vercel, set the env vars above,
add `firewoodwebsite.com` as a custom domain.
