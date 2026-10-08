/* scripts/generate-sitemap.ts
 *
 * Postbuild: emits a real-per-URL-lastmod sitemap.xml.
 *
 * Why: Google deprioritizes sitemaps where every <lastmod> is identical
 * (build-time stamping). Each route gets the latest git commit date of
 * its underlying source files - that's the real content-modification date.
 *
 * Falls back to today's date for routes whose source file lookup fails,
 * so the build never breaks if a source path moves.
 */
import { execSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import ingredientList from "./ingredient-routes.json" with { type: "json" };
import { CONTENT_LAST_REVIEWED } from "../client/src/lib/siteDates";

const HOST = "https://www.wellnessforzebras.com";

// Vercel builds from a shallow clone, where `git log -- <file>` returns the
// deploy commit's date for every file. In that case use the maintained
// content-review date instead of a fake "everything changed today".
function isShallowClone(): boolean {
  try {
    return (
      execSync("git rev-parse --is-shallow-repository", { encoding: "utf8" }).trim() === "true"
    );
  } catch {
    return true;
  }
}
const SHALLOW = isShallowClone();

function gitDateFor(...paths: string[]): string {
  if (SHALLOW) return CONTENT_LAST_REVIEWED;
  let latest = "";
  for (const p of paths) {
    const full = resolve(p);
    if (!existsSync(full)) continue;
    try {
      const out = execSync(`git log -1 --format=%cs -- "${p}"`, {
        cwd: resolve("."),
        encoding: "utf8",
      }).trim();
      if (out && out > latest) latest = out;
    } catch {
      // ignore - file not tracked or git not available
    }
  }
  return latest || CONTENT_LAST_REVIEWED;
}

type Route = {
  loc: string;
  sources: string[];
  changefreq: string;
  priority: string;
  hasMd?: boolean;
};

const CORE_ROUTES: Route[] = [
  {
    loc: "/",
    sources: [
      "client/src/pages/Home.tsx",
      "client/src/components/Hero.tsx",
      "client/src/components/OurStory.tsx",
      "client/src/components/WhyZebraMascot.tsx",
      "client/src/components/QualityStandards.tsx",
      "client/src/components/FAQ.tsx",
      "client/src/components/ProductGrid.tsx",
      "client/src/components/ExclusionsBlock.tsx",
      "client/src/components/CollagenScienceSection.tsx",
    ],
    changefreq: "weekly",
    priority: "1.0",
  },
  // /preorder is noindex (2026-10-07) and /the-how is noindex (2026-05-12):
  // neither belongs in the sitemap.
  {
    loc: "/ingredients",
    sources: ["client/src/pages/Ingredients.tsx", "client/src/data/ingredients.ts"],
    changefreq: "monthly",
    priority: "0.8",
    hasMd: true,
  },
  {
    loc: "/our-promise",
    sources: ["client/src/pages/OurPromise.tsx"],
    changefreq: "monthly",
    priority: "0.7",
    hasMd: true,
  },
  {
    loc: "/contact",
    sources: ["client/src/pages/Contact.tsx"],
    changefreq: "yearly",
    priority: "0.3",
    hasMd: true,
  },
  {
    loc: "/privacy",
    sources: ["client/src/pages/Privacy.tsx"],
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    loc: "/terms",
    sources: ["client/src/pages/Terms.tsx"],
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    loc: "/shipping",
    sources: ["client/src/pages/Shipping.tsx"],
    changefreq: "yearly",
    priority: "0.3",
  },
];

function xmlEntry(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url><loc>${HOST}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

const entries: string[] = [];

for (const r of CORE_ROUTES) {
  const lastmod = gitDateFor(...r.sources);
  entries.push(xmlEntry(r.loc, lastmod, r.changefreq, r.priority));
}

// Ingredient detail pages - each gets its own date based on the ingredient
// data file's mtime (all ingredients live in one TS file, so they share
// that date until we shard, which is more accurate than build time).
const ingredientDataDate = gitDateFor("client/src/data/ingredients.ts");
const ingredientPageDate = gitDateFor("client/src/pages/IngredientPage.tsx", "client/src/components/IngredientDetail.tsx");
const ingredientLastmod = ingredientDataDate > ingredientPageDate ? ingredientDataDate : ingredientPageDate;

for (const ing of ingredientList as Array<{ slug: string }>) {
  entries.push(xmlEntry(`/ingredients/${ing.slug}`, ingredientLastmod, "monthly", "0.6"));
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
console.log(
  `[sitemap] wrote ${outPath} with ${entries.length} URLs (lastmod: ${SHALLOW ? `content review date ${CONTENT_LAST_REVIEWED}` : "per-URL git dates"})`,
);
