---
project: ZebraPreSellWarm
repo: github.com/kenchapmanpdx-png/ZebraPreSellWarm
deploy: zebra-pre-sell-warm.vercel.app
audit_date: 2026-05-10
audit_scope: code-only static audit (no deployed-site fetch verification)
---

# Stack Snapshot

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript + Vite 5 |
| Styling | Tailwind 3.4 + shadcn/ui (Radix primitives) |
| Routing | wouter (SPA) |
| State | TanStack Query |
| Backend (dev) | Express + tsx |
| ORM | Drizzle (Neon serverless Postgres configured) |
| Deploy | Vercel (no `vercel.json` present) |
| Other | framer-motion, AOS, react-hook-form, zod |

# P0 — Blocking / Conversion-Critical

## P0-1. Waitlist email capture is broken in production
- **Evidence**: `client/src/components/Hero.tsx:30` and `client/src/components/PreorderReservation.tsx:15` POST to `/api/waitlist`. Backend route exists in `server/routes.ts:86` (Express). No `vercel.json`, no `api/` directory, Vercel project deploys static client only.
- **Impact**: Every email submitted on production is dropped silently. The site's primary conversion goal — pre-sell waitlist — captures nothing.
- **Fix options**:
  - **A (fastest)**: Replace fetch target with a hosted form provider (ConvertKit / Mailchimp / Resend Audiences / Loops / Beehiiv). 30-min change.
  - **B**: Convert `server/routes.ts` handlers into Vercel Serverless Functions under `/api/*.ts` + add Neon Postgres or Supabase. ~2–3 hr.
  - **C**: Deploy Express on Vercel via `vercel.json` rewrites + serverless adapter. Heavier; not recommended for a marketing site.
- **Recommended**: B if you want to own the list; A if you want it live in 30 minutes.

## P0-2. Storage is in-memory even on the dev server
- **Evidence**: `server/storage.ts:33` `class MemStorage`, `server/storage.ts:136` `export const storage = new MemStorage()`. `drizzle.config.ts` exists but no DB-backed storage class is wired in.
- **Impact**: Even when running locally, every restart loses all submissions. There's no real persistence path even if P0-1 is solved by spinning up Express.
- **Fix**: Implement `DbStorage implements IStorage` using Drizzle + Neon, swap export. Pairs with P0-1 fix B.

## P0-3. Orphaned pages — preorder funnel exists but is unreachable
- **Evidence**: `client/src/App.tsx` registers only `/`, `/the-how`, `/ingredients`, `/ingredients/:id`. These page files exist and are not imported anywhere:
  - `client/src/pages/PreorderPage.tsx`
  - `client/src/pages/OurPromise.tsx`
- **Impact**: A dedicated preorder page (likely your highest-intent funnel) exists in the code but no user can reach it. Same for OurPromise (likely a guarantees / brand-trust page).
- **Fix**:
  ```tsx
  // client/src/App.tsx — add to <Switch>
  <Route path="/preorder" component={PreorderPage} />
  <Route path="/our-promise" component={OurPromise} />
  ```
  + add nav links in `Navigation.tsx`.

# P1 — Build / Deploy Hygiene

## P1-1. TypeScript check fails on `npm run check`
- **Evidence**: `server/vite.ts:39` — `allowedHosts: boolean` not assignable to `true | string[] | undefined`.
- **Impact**: `tsc` exits non-zero. Any CI gate that runs `npm run check` will fail. Production build (`vite build`) currently succeeds because it doesn't run tsc.
- **Fix**: Change `allowedHosts: true` (literal) or `allowedHosts: ["*"]`.

## P1-2. No `vercel.json` for SPA fallback
- **Evidence**: No file present; routing relies on Vercel auto-detection.
- **Impact**: Deep links like `/the-how`, `/ingredients/quercetin` may 404 on hard refresh depending on Vercel's framework detection. Confirm by reloading any non-root route on production.
- **Fix**: Add `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/((?!api/).*)", "destination": "/" }]
  }
  ```

## P1-3. 1.87 MB unoptimized hero image
- **Evidence**: Build output: `ChatGPT_Image_Jan_14__2026__01_05_39_PM_1768460138850-Bf0Cp9UW.png  1,872.84 kB`. Imported in `Hero.tsx:7`.
- **Impact**: This single image is ~3× the size of the JS bundle. Hurts LCP, mobile experience, and Lighthouse score.
- **Fix**: Compress + convert to WebP/AVIF. Target <300 KB. Tools: `sharp`, squoosh.app. Add `<picture>` fallback or use Vite's image-optimization plugin.

## P1-4. Main bundle 575 KB (177 KB gzip), no manual chunking
- **Evidence**: Build output `index-*.js  575.15 kB`. Vite warns: "Some chunks larger than 500 kB."
- **Impact**: Slower initial paint; suboptimal but not blocking.
- **Fix**: Already lazy-loading 4 components. Add `manualChunks` in `vite.config.ts` (split radix-ui, framer-motion, recharts).

## P1-5. Tailwind ambiguous-class warnings
- **Evidence**: Build warns on `duration-[2s]` and `duration-[650ms]`.
- **Impact**: Cosmetic, but could surface as broken animations on Tailwind upgrades.
- **Fix**: Replace with `duration-[2000ms]` / `duration-[650ms]` (already correct format) — find the offending file via `grep -rn "duration-\[2s\]" client/src/`.

## P1-6. Browserslist data 13 months stale
- **Evidence**: Build output: "browsers data (caniuse-lite) is 13 months old."
- **Fix**: `npx update-browserslist-db@latest`.

# P2 — Dead Code / Tech Debt

## P2-1. Six components imported by no page
- `ClinicalRationale.tsx` — 0 page imports
- `DifferenceSection.tsx` — 0 page imports
- `WhyZebra.tsx` — 0 page imports (separate from `WhyZebraMascot` which IS used)
- `InteractiveIngredientMap.tsx` — 0 page imports
- `PreorderReservation.tsx` — 0 page imports (only used by orphan PreorderPage)
- `WhatYouGet.tsx` — 0 page imports
- **Action**: Decide each: wire into a page or delete. The replit.md changelog (June 23, 2025) describes adding "InteractiveIngredientMap after Ava story section" — this was apparently reverted. Same for "PreorderReservation form".

## P2-2. `build-static.sh` produces broken HTML
- **Evidence**: The heredoc-generated `static-site/index.html` references `./assets/index.css` and `./assets/index.js` (literal names) but Vite emits hashed names like `index-CDT_5m3A.css`. Anyone running this script gets a blank page.
- **Action**: Delete or fix to copy `dist/public/index.html` instead of regenerating.

## P2-3. Replit-era artifacts checked in
- `.replit` config file
- `replit.md` (could move to `docs/`)
- `attached_assets/` directory (large)
- **Action**: Decide what to keep. `.replit` can stay if Ken still uses Replit; otherwise remove.

## P2-4. Two hero-bottle image variants
- `client/public/images/zebrawell-hero-bottles.png` AND `.jpg` AND multiple "final/final2/latest/newest" variants of bottle images (~7 files).
- **Action**: Pick one canonical asset, delete the rest.

## P2-5. `@octokit/rest` in dependencies
- **Evidence**: `package.json` lists `@octokit/rest` ^22.0.0.
- **Action**: Grep for usage. If unused (likely — this is a static marketing site), remove. Saves install time.

# P3 — SEO / Meta / Accessibility

## P3-1. OG and canonical URL hard-coded to `zebrawell.com`
- **Evidence**: `client/index.html` `<meta property="og:url" content="https://zebrawell.com/" />` — but production is `zebra-pre-sell-warm.vercel.app`.
- **Impact**: Social shares of the live URL claim a different canonical, hurting indexing/sharing.
- **Fix**: Either point the meta to the real production URL, or set up the `zebrawell.com` domain on Vercel.

## P3-2. No `robots.txt`, no `sitemap.xml`
- **Action**: Add both. For SPA, sitemap should list `/`, `/the-how`, `/ingredients`, every `/ingredients/:slug`, `/preorder`, `/our-promise`.

## P3-3. No structured data (JSON-LD)
- **Action**: Add `Organization` + `Product` (for AM/PM formula) + `FAQPage` (for FAQ section) JSON-LD blocks. Pre-launch SEO win.

## P3-4. No accessibility audit run
- **Action**: Trigger `design:accessibility-review` skill against the production site once redeployed. Likely findings: color contrast on the `#B36B4D` hover states against `#EBE8E1` background, focus rings on custom buttons.

# P4 — Conversion / Content

## P4-1. Single CTA path (waitlist) — no preorder option
- The hero offers waitlist signup only; the preorder funnel is dark (P0-3). For a "warm" pre-sell page, you want both: low-commit (email) and high-intent (preorder/reserve).

## P4-2. No analytics
- **Evidence**: No Vercel Analytics, GA4, Plausible, PostHog, or Fathom snippet in `index.html`.
- **Impact**: Zero visibility into traffic, sources, scroll depth, CTA click-through.
- **Recommended**: Vercel Web Analytics (one-click) + PostHog for events.

## P4-3. No exit-intent or scroll-triggered CTA capture
- `FloatingCTA.tsx` exists. Verify it actually fires.

## P4-4. Hero "rotating word" cycle includes negatively-framed words
- **Evidence**: `Hero.tsx:18` words list includes `Disbelieved`, `Dismissed`, `Frustrated`, `Fighting Alone`, `Overlooked`, mixed with `Rare`, `Resilient`. This is intentional brand voice — speaking to lived experience — but worth A/B testing whether negative framing dampens conversion.

## P4-5. No FTC supplement disclosures visible (statement / "not evaluated by the FDA")
- **Action**: Verify `Footer.tsx` includes the standard disclosure for dietary supplements. If not, add it. Required for compliance.

# P5 — Brand / Research Alignment

## P5-1. Product positioning vs. ZebraWell Reasoning Protocol
- The project's research protocol (in your knowledge base) emphasizes **collagen PROTECTION via ECM preservation, NOT collagen synthesis**. Spot-check whether marketing copy on `Home.tsx` / `ProductGrid.tsx` / `ClinicalRationale.tsx` says "boosts collagen" or "supports collagen synthesis" — these would contradict the science framing.
- **Action**: Run brand-voice / copy audit against the research protocol's "53-fold MMP-1 upregulation" framing.

## P5-2. Ingredient pages — verify against protocol
- 32 ingredients with dedicated pages (per latest commit). Each ingredient page should be consistent with the protocol's evidence rules:
  - cite PMIDs with author + title snippet
  - flag tissue relevance (HIGH/MED/LOW for hEDS)
  - flag TGF-β paradox where applicable
  - state achievable plasma vs. effect threshold
- **Action**: Sample 3–5 random ingredient pages, check fidelity. May need a verification pass.

# Suggested Next Steps (Pick One)

1. **Fix P0-1 + P0-3 today** — wire ConvertKit/Loops, restore preorder route. ~1 hr. Site starts capturing emails. Highest ROI.
2. **Build the proper backend (P0-1 option B + P0-2)** — Vercel serverless + Neon + Drizzle. ~3 hr. Owns the list, no third party.
3. **Pre-launch polish pass** — P1-1 through P1-3 + P3-1/P3-2. ~2 hr. Cleaner technical foundation.
4. **Content/copy fidelity audit (P5)** — sample ingredient pages against research protocol. ~1–2 hr.
5. **Full sweep** — execute all P0/P1 in one pass. ~5 hr.

# Files to Read for Deeper Context

- `client/src/pages/Home.tsx` — landing layout
- `client/src/components/Hero.tsx` — primary CTA
- `client/src/components/ProductGrid.tsx` — AM/PM formula display
- `client/src/data/ingredientData.ts` + `ingredients.ts` — ingredient source
- `server/routes.ts` — API surface to port
- `shared/schema.ts` — DB schema (already Drizzle-ready)
