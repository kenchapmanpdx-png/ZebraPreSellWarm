/* client/src/data/pageDates.ts
 *
 * Single source of truth for page dates. Feeds:
 *   - sitemap <lastmod>                 (scripts/generate-sitemap.ts)
 *   - JSON-LD datePublished / dateModified / lastReviewed (client/src/prerender.tsx)
 *   - visible "Last updated" lines      (IngredientDetail, Footer)
 *   - Markdown companions + llms files  (scripts/generate-md-pages.ts)
 *   - IndexNow pings, indirectly        (scripts/indexnow-ping.ts diffs sitemap lastmod)
 *
 * Why hand-maintained: Vercel builds from a shallow git clone, so `git log`
 * returns the deploy date for every file and every <lastmod> came out
 * identical (2026-11-01 SEO/GEO gap audit, G4/G5).
 *
 * RULES (bump in the same commit as the change):
 *   modified   = last change to the page's main content (body copy or the
 *                ingredient's data block). Drives dateModified, lastReviewed
 *                and the visible date.
 *   structural = last significant non-content change (structured data, links,
 *                title/description). Sitemap only.
 *   INGREDIENT_TEMPLATE_CHANGED = same idea for changes to the shared
 *                ingredient template (IngredientDetail / IngredientPage / prerender).
 *   Never bump a date for a cosmetic change (styling, copyright year).
 *
 * Initial values (2026-11-01) come from `git log -L` on each ingredient's block
 * in ingredients.ts and `git log` on each page file, full-history clone.
 * published = first public date, clamped to the domain launch (2026-05-10).
 */

export type PageDate = {
  published: string;
  modified: string;
  structural?: string;
};

export const SITE_LAUNCH = "2026-05-10";

// Last significant change to the shared ingredient template.
// 2026-11-01: titles, descriptions, visible breadcrumbs, end-of-page CTA,
// HowTo markup removed, datePublished added.
export const INGREDIENT_TEMPLATE_CHANGED = "2026-11-01";

export const CORE_PAGE_DATES: Record<string, PageDate> = {
  // 2026-11-01: homepage FAQ answers now rendered in the page HTML.
  "/": { published: SITE_LAUNCH, modified: "2026-11-01" },
  // 2026-11-01: visible breadcrumbs, card headings H3 -> H2.
  "/ingredients": { published: SITE_LAUNCH, modified: "2026-10-07", structural: "2026-11-01" },
  "/our-promise": { published: SITE_LAUNCH, modified: "2026-10-07" },
  "/contact": { published: SITE_LAUNCH, modified: "2026-10-07" },
  "/privacy": { published: SITE_LAUNCH, modified: "2026-10-07" },
  "/terms": { published: SITE_LAUNCH, modified: "2026-10-07" },
  "/shipping": { published: SITE_LAUNCH, modified: "2026-10-07" },
};

export const INGREDIENT_DATES: Record<string, PageDate> = {
  "palmitoylethanolamide": { published: "2026-05-11", modified: "2026-10-08" },
  "luteolin": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "magnesium-bisglycinate": { published: "2026-05-11", modified: "2026-10-08" },
  "taurine": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "vitamin-c": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "nicotinamide-riboside": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "pine-bark-extract": { published: "2026-05-11", modified: "2026-10-08" },
  "grape-seed-extract": { published: "2026-05-11", modified: "2026-10-08" },
  "quercetin-phytosome": { published: "2026-05-11", modified: "2026-10-08" },
  "chlorogenic-acid": { published: "2026-05-11", modified: "2026-10-08" },
  "l-theanine": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "zinc-carnosine": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "astaxanthin": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "benfotiamine": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "niacinamide": { published: "2026-05-11", modified: "2026-10-08" },
  "p5p": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "r5p": { published: "2026-05-11", modified: "2026-10-07" },
  "methylfolate": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "vitamin-b12": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "vitamin-d3": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "vitamin-k2": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "copper-bisglycinate": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "manganese-bisglycinate": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "chromium": { published: "2026-05-11", modified: "2026-10-08" },
  "selenium": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "pantothenic-acid": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "biotin": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "boron": { published: SITE_LAUNCH, modified: "2026-10-08" },
  "molybdenum": { published: SITE_LAUNCH, modified: "2026-10-08" },
};

/** Dates for a route path ("/", "/privacy", "/ingredients/niacinamide"). */
export function datesFor(path: string): PageDate | undefined {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  const ing = clean.match(/^\/ingredients\/([a-z0-9-]+)$/);
  if (ing) return INGREDIENT_DATES[ing[1]];
  return CORE_PAGE_DATES[clean];
}

/** Sitemap <lastmod>: latest of content, structural, and template dates. */
export function sitemapLastmod(path: string): string | undefined {
  const d = datesFor(path);
  if (!d) return undefined;
  const isIngredient = /^\/ingredients\/[a-z0-9-]+$/.test(path);
  return [d.modified, d.structural, isIngredient ? INGREDIENT_TEMPLATE_CHANGED : undefined]
    .filter((x): x is string => Boolean(x))
    .sort()
    .pop();
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-10-08" -> "October 8, 2026". Pure string math: identical on server and client. */
export function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
