/* scripts/generate-sitemap.ts
 *
 * Postbuild: emits sitemap.xml with a real per-URL <lastmod>.
 *
 * Dates come from client/src/data/pageDates.ts (sitemapLastmod), the same
 * source as JSON-LD dateModified and the visible "Last updated" line.
 *
 * Why not git: Vercel builds from a shallow clone, so `git log` returned the
 * deploy date for every file and every <lastmod> came out identical
 * (2026-11-01 SEO/GEO gap audit, G4). Google deprioritizes sitemaps whose
 * lastmod values are uniform or untrue.
 *
 * The build fails if a sitemap route has no date entry, so a new page cannot
 * ship without one.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import ingredientList from "./ingredient-routes.json" with { type: "json" };
import { sitemapLastmod } from "../client/src/data/pageDates";

const HOST = "https://www.wellnessforzebras.com";

type Route = {
  loc: string;
  changefreq: string;
  priority: string;
};

// /preorder is noindex (2026-10-07) and /the-how is noindex (2026-05-12):
// neither belongs in the sitemap.
const CORE_ROUTES: Route[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/ingredients", changefreq: "monthly", priority: "0.8" },
  { loc: "/our-promise", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "yearly", priority: "0.3" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
  { loc: "/shipping", changefreq: "yearly", priority: "0.3" },
];

const routes: Route[] = [
  ...CORE_ROUTES,
  ...(ingredientList as Array<{ slug: string }>).map((i) => ({
    loc: `/ingredients/${i.slug}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
];

const missing: string[] = [];
const entries = routes.map((r) => {
  const lastmod = sitemapLastmod(r.loc);
  if (!lastmod) missing.push(r.loc);
  return `  <url><loc>${HOST}${r.loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`;
});

if (missing.length) {
  console.error(`[sitemap] no date in client/src/data/pageDates.ts for: ${missing.join(", ")}`);
  process.exit(1);
}

// .md companion pages are NOT listed: they duplicate the HTML pages. They stay
// reachable for AI assistants through /llms.txt.

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const outPath = resolve("dist/public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");
const distinct = new Set(routes.map((r) => sitemapLastmod(r.loc))).size;
console.log(`[sitemap] wrote ${outPath}: ${entries.length} URLs, ${distinct} distinct lastmod values`);
