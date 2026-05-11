---
date: 2026-05-10
scope: wire-to-wire full-site audit
commit_at_audit: 63a536a (origin/main)
deployed_url: https://www.wellnessforzebras.com
verdict_summary: Pre-launch site is functionally solid. Critical: FTC supplement disclosure missing. High: heading hierarchy violations on 31 of 34 pages; placeholder legal links. Medium: 26 SVGs without aria-hidden; one ingredient page uses banned vocabulary; copyright year drift; no rate limiting; tsc doesn't validate api/.
---

# Audit Method

Combined static analysis of the codebase, live-site probing of the deployed Vercel build, prerendered-HTML inspection of every published route, real API calls against all four serverless endpoints (with invalid + valid payloads + method-guard tests), dependency security scan, and cross-page consistency checks. Pulled Vercel runtime logs via MCP to verify production behavior matches local expectations.

---

# Findings by severity

## P0 — Critical / launch-blocking risk

### P0-1. NO FTC supplement disclosure on the live site
The footer has no required disclosure language. For a dietary-supplement brand, this is FTC/FDA exposure on every page. Required text patterns:
- *"These statements have not been evaluated by the Food and Drug Administration."*
- *"This product is not intended to diagnose, treat, cure, or prevent any disease."*

Note: the body copy on `/our-promise` already says *"We don't claim to treat, cure, or prevent anything"* — that's correct positioning but doesn't substitute for the FTC-mandated disclosure in the global footer.

**Fix:** add a `<small>` block to `Footer.tsx` above the copyright line.

### P0-2. Placeholder legal links — Privacy Policy, Terms of Service, Shipping & Returns, Contact Support all `href="#"`
The footer Legal column links to nowhere. For a brand collecting emails (Resend integration is now live), having no real privacy policy is GDPR/CCPA exposure and reads as unprofessional. Even a basic boilerplate that says "We use your email only to notify you about ZebraWell, never share with third parties, unsubscribe anytime" is better than `href="#"`.

**Fix path options:**
- Write minimal `/privacy`, `/terms`, `/shipping`, `/contact` pages (we have content briefs ready).
- Or use a service like Termly to generate templates and link them out.

### P0-3. Social media links also placeholder `href="#"`
Same issue with Twitter / Instagram / LinkedIn footer icons — they go nowhere. Either link to real accounts or remove the icons until accounts exist.

## P1 — High / fix before driving traffic

### P1-1. Heading hierarchy violates WCAG 2.1 AA on 31 of 34 pages
Ingredient pages skip from `<h1>` to `<h4>` and `<h2>` to `<h4>` repeatedly. Sample from `/ingredients/luteolin`:
```
h1: Luteolin
h4: What It Is              <-- SKIP (1→4)
h4: Why We Include It
h4: Daily Dose
h4: Key Benefits
h2: How It Works
...
h2: Why We Chose This Form
h4: Form Comparison         <-- SKIP (2→4)
```

Source: `IngredientDetail.tsx` uses `<h4>` for the "At a Glance" subsection labels and "Form Comparison" header. They should be `<h2>` or `<h3>` to keep the outline monotone.

**Why it matters:** screen reader navigation by heading is now broken on every ingredient page. AudioEye flagged the same pattern on the homepage; we fixed homepage but the systemic component-level issue remained on ingredient detail pages.

**Fix:** change `<h4>` in the "At a Glance" grid and "Form Comparison" sections of `IngredientDetail.tsx` to `<h3>`. Single component update; cascades to all 29 ingredient pages on next build.

### P1-2. 26 SVGs missing `aria-hidden` post un-lazy
After un-lazying `QualityStandards`, `CollagenScienceSection`, `Testimonials`, `FAQ`, new SVG elements entered the prerendered HTML that don't have aria-hidden. Breakdown:
- `/index.html`: 14 / 79 SVGs missing
- `/the-how/index.html`: 8 / 18 missing
- `/our-promise/index.html`: 4 / 15 missing

These are likely decorative SVGs in the now-static-rendered components (`CollagenScienceSection` has decorative ornaments, `ConditionScienceTab` icons, etc.) that my earlier sweep didn't touch because they weren't prerendered when I ran the sweep.

**Fix:** re-run the aria-hidden bulk sweep on these specific components. Quick.

### P1-3. Banned vocabulary on Molybdenum ingredient page
Per the Master Marketing & POD Guide §7.2, the words "detox" and "die-off" are explicitly off-limits for this audience (wellness-theater triggers). Found on `/ingredients/molybdenum/`:

> "Low risk. Initial **detox** surge ('sulfite **die-off**') possible. Stabilizes mast cells."

**Fix:** rewrite the side-effects line to use neutral clinical language. Suggested rewrite: *"Low risk. Some users report mild GI changes during the first 1–2 weeks as sulfite-processing pathways recalibrate."* Send to the project chat or I can patch directly.

False-positive hits I cleared while auditing:
- Homepage FAQ: *"not promising a miracle cure"* — negative claim, ✓ compliant
- Our Promise: *"Never exploit your desperation. No miracle claims."* — negative claim, ✓ compliant
- Our Promise: *"We don't claim to treat, cure, or prevent anything"* — required FTC pattern, ✓ compliant

### P1-4. Copyright year drift
Footer says "© 2025 ZebraWell." Current date is May 2026. Should be "© 2026" or "© 2025–2026". Easy fix: make it dynamic with `new Date().getFullYear()`.

## P2 — Medium / cleanup before scale

### P2-1. /api/contact and /api/request-sample are NOT wired to Resend
Only `/api/waitlist` and `/api/preorder` write to Resend. The other two endpoints fall through to log-only (return 202 in current state). Two interpretations:

(a) Intentional — those endpoints aren't user-facing yet (see P2-2).
(b) Oversight — should be wired same as preorder for consistency.

### P2-2. Dead UI: `SampleRequestModal` is rendered but never triggered
`SampleRequestModal.tsx` is included in `Home`, `TheHow`, and `Ingredients` pages but no button anywhere calls `showModal()`. The modal is invisible because of its initial `hidden` class. Either:
- Wire a "Request Sample" CTA somewhere and the modal becomes functional, or
- Delete the component and its three page-level inclusions.

### P2-3. Dead endpoint: /api/contact has no client-side caller
`/api/contact` exists, validates input, accepts posts. Nothing in `client/src` ever calls it. Same disposition as P2-2.

### P2-4. No rate limiting on any API endpoint
The waitlist endpoint accepts unlimited POSTs. A bored bot can fill your Resend audience with junk. Resend's free tier is 3,000 contacts but the abuse vector matters more than the number cap.

**Fix options:**
- Add `@upstash/ratelimit` + Upstash Redis free tier (5 lines of code).
- Or use Vercel's Edge Config rate-limit pattern.
- Or use a honeypot field (hidden input that real users won't fill, bots will).
- Or rely on Cloudflare Turnstile / hCaptcha on the form.

### P2-5. /api/diagnostic endpoint is live in production
The debug endpoint I added when troubleshooting is still reachable at `https://www.wellnessforzebras.com/api/diagnostic`. It returns:
- Which env-var **names** are set (not values, but knowledge of "RESEND_API_KEY is set" is itself information)
- Module-load probe results (Node version, deps available)
- Path-style information about the bundle structure

Not a critical leak but it's information disclosure. Either:
- Delete it (we know things work now).
- Or gate it behind an admin token.

### P2-6. tsconfig.json doesn't include `api/`
```json
"include": ["client/src/**/*", "shared/**/*", "server/**/*"]
```
`api/` is missing. `npm run check` (i.e., `tsc`) doesn't validate the serverless function code. That's how the ERR_MODULE_NOT_FOUND issue slipped through — TypeScript was happy but runtime ESM resolution failed. A TS check covering `api/` would have caught the extensionless imports earlier.

**Fix:** add `"api/**/*"` to the include array. Verify build is still clean.

### P2-7. 6 unused runtime dependencies (legacy Express auth stack)
- `@octokit/rest`
- `connect-pg-simple`
- `passport`
- `passport-local`
- `express-session`
- `memorystore`

These were for the original Express server which is no longer used in production (everything's Vercel serverless). They add ~5–10 MB of node_modules weight and one CVE-attack surface for nothing.

**Fix:** `npm uninstall` all six. Verify build still passes.

### P2-8. ZebraLogo.tsx is dead code
File exists in `client/src/components/`. Nothing imports it. Either restore intended usage or delete.

### P2-9. Six orphan-but-rendered-on-/showcase components
`ClinicalRationale`, `DifferenceSection`, `InteractiveIngredientMap`, `PreorderReservation`, `WhatYouGet`, `WhyZebra` are only reachable via the noindex `/showcase` review page. They ship in the bundle (Showcase chunk is 48 KB gzipped). Decision needed:
- Wire one or more back into production (the previous audit recommended `PreorderReservation` for the `/preorder` route and `ClinicalRationale`+`InteractiveIngredientMap` for the homepage science section).
- Or delete them (with the Showcase page) once you've reviewed.

## P3 — Low / quality-of-life

### P3-1. .env.example out of date
Current file documents only `DATABASE_URL`. Missing the now-required `RESEND_API_KEY`, optional `RESEND_WAITLIST_SEGMENT_ID`, `RESEND_PREORDER_SEGMENT_ID`. New devs (or future-you) will be confused about what to set.

### P3-2. No error tracking
No Sentry, no LogRocket, no anything. Vercel function logs are searchable but ephemeral and don't capture client-side errors. If a hero waitlist form silently fails for one user, you'll never know.

**Fix:** Sentry has a generous free tier and a Vercel integration that takes 5 minutes.

### P3-3. Main bundle grew significantly after un-lazying
- Before un-lazy: 295 KB main bundle (87 KB gzip)
- After un-lazy: 478 KB main bundle

The trade was worth it (gained SEO indexing of 8 FAQs + science section + 3 more components). But the bundle is now larger than the Vite warning threshold. Could revisit: keep the LCP-critical content un-lazy, re-lazy the below-fold pieces (FAQ in particular is below-fold and lazy-loads fine when there).

### P3-4. Build cache restoration without dependency change makes `npm install` skip work
Vercel's build cache restoration is currently aggressive — when no new packages added, `npm install` reports "up to date in <1s." I forced explicit `installCommand: "npm install --no-audit --no-fund"` to make it always run, but the install is still mostly cached. Fine for now; flag if you see drift again.

### P3-5. Vercel Analytics + Speed Insights wired but unverified
Both packages are imported in `App.tsx` and should be sending data. Worth opening Vercel → Project → Analytics tab post-launch to verify events are flowing. If empty after a few days of real traffic, debug.

### P3-6. JSON-LD Product schema declares price = "0"
In `client/index.html` JSON-LD:
```json
"price": "0"
```
That's technically valid for a PreOrder availability state, but Google may flag it as "questionable price" in Search Console. Consider removing the `priceCurrency` + `price` fields entirely for preorder state, or set to actual planned price.

### P3-7. Footer "Back to Top" button has unverified handler
Footer renders a `<button>` with text "Back to Top" — code inspection shows it calls `window.scrollTo(...)` on click. Should work; just hasn't been verified live.

---

# What's solid (confirmed working)

This is what's NOT broken — confidence builders:

- **API endpoints**: All four POST endpoints (`/api/waitlist`, `/api/preorder`, `/api/contact`, `/api/request-sample`) return correct HTTP codes for valid + invalid input + wrong method. Zod validation produces clear error responses.
- **Resend integration**: Verified end-to-end. Real test emails land in Resend Audience. Validation works (rejects bad emails with 400). Method guard works (405 for GET).
- **Sitemap accuracy**: 34/34 URLs in sitemap resolve to real prerendered HTML files.
- **Meta coverage**: 0 missing titles, descriptions, canonicals, or OG titles across all 34 pages. 0 duplicate titles.
- **Internal links**: 33/33 unique route hrefs across the build resolve to existing built pages. 0 broken internal links.
- **Hash anchors**: All 6 hash anchors on the homepage (`#main-content`, `#products`, `#quality`, `#science`, `#story`, `#waitlist`) resolve to real elements with those IDs.
- **Forms**: Hero waitlist, FloatingCTA popup, Nav header popup — all three open the same modal and submit to `/api/waitlist`. Verified.
- **Routing**: All declared routes prerender. `/showcase` correctly excluded from sitemap (noindex by design).
- **Cross-page consistency**: Nav + Footer render on every page.
- **Accessibility (post-Phase 2 sweep)**: 0 images missing alt text. 0 unnamed buttons on homepage. Skip-to-main-content link present and keyboard-only-visible. Mobile menu has proper `aria-expanded` + `aria-label`. Form fields have `<label>` associations.
- **Security**: 0 dependency vulnerabilities (npm audit clean). 0 secrets accidentally committed (grep clean). CORS configured for cross-origin form posts.
- **Cache strategy**: 1-year immutable cache on hashed assets and images. `must-revalidate` on sitemap.xml and robots.txt.
- **Mobile responsiveness**: 286 responsive class hits across components (sm:/md:/lg:/xl:). Viewport meta is correct.
- **Content depth**: All 29 ingredient pages have full patient content (summary, FAQ, plain-language triad, why-this-form). 0 placeholder/stub text remaining.
- **Domain + SEO**: Custom domain wired. Resend's primary domain redirect present. Google Search Console verified. Sitemap submitted. JSON-LD structured data present.

---

# Recommended next-push punch list (in order of leverage)

Pick whichever batch you have appetite for; each is its own commit.

**Batch A — compliance & legal (1 commit, ~30 min):**
1. FTC disclosure footer (P0-1)
2. Privacy / Terms / Shipping / Contact placeholder pages or external links (P0-2)
3. Either link social icons or remove them (P0-3)
4. Dynamic copyright year (P1-4)
5. Update .env.example with RESEND vars (P3-1)

**Batch B — accessibility (1 commit, ~20 min):**
1. Fix heading hierarchy in `IngredientDetail.tsx` (P1-1)
2. Re-sweep aria-hidden on lazy-loaded SVGs (P1-2)

**Batch C — content (1 commit, ~5 min):**
1. Rewrite molybdenum side-effects line (P1-3)

**Batch D — production hygiene (1 commit, ~15 min):**
1. Add `api/` to tsconfig.json include (P2-6)
2. Remove 6 unused deps (P2-7)
3. Delete `ZebraLogo.tsx` (P2-8)
4. Delete or gate `/api/diagnostic` (P2-5)

**Batch E — safety net (1 commit, ~30 min):**
1. Add rate limiting (P2-4) — honeypot field is the lowest-effort option
2. Wire Sentry for error tracking (P3-2)

**Batch F — orphan-component decisions (1 commit, varies):**
1. For each of the 6 components on /showcase, decide: wire-back or delete. The previous audit suggested wiring `PreorderReservation` into `/preorder` and putting `ClinicalRationale`+`InteractiveIngredientMap` on the homepage. Once decisions are made, this can ship.

I can execute any combination of A through F in one push session if you want. Tell me which batches to run and I'll start.
