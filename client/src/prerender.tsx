/* client/src/prerender.tsx
 *
 * Prerender entry. Called at build time by vite-prerender-plugin for each
 * route in the queue. Returns rendered HTML + per-page head metadata so each
 * static file has its own title, canonical, description, and OG tags.
 *
 * Not loaded at runtime — only imported during build.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import ingredientList from "../../scripts/ingredient-routes.json";
import { ingredients as ingredientData } from "./data/ingredients";

const BASE = "https://www.wellnessforzebras.com";

type RouteMeta = {
  title: string;
  description: string;
};

const STATIC_ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "ZebraWell | Clinical Support for POTS, EDS & MCAS",
    description:
      "Advanced autonomic, mast cell, and connective tissue support. Research-driven supplements for the Zebra community. Zero fillers. 100% transparent.",
  },
  "/the-how": {
    title: "The How — Condition Science | ZebraWell",
    description:
      "How ZebraWell's AM/PM formulas address the specific biology of POTS, EDS, and MCAS — autonomic stability, mast cell modulation, and ECM preservation.",
  },
  "/ingredients": {
    title: "All Ingredients | ZebraWell",
    description:
      "Every ingredient in ZebraWell's AM and PM formulas. Doses, mechanisms, evidence, and the reasoning for inclusion in a hEDS/POTS/MCAS protocol.",
  },
  "/our-promise": {
    title: "Our Promise — Constitution | ZebraWell",
    description:
      "ZebraWell's formal commitment: transparent ingredients, decision logs, third-party testing, and accountability for the Zebra community.",
  },
  "/preorder": {
    title: "Reserve — Coming Soon | ZebraWell",
    description:
      "Join the reservation list to be notified when ZebraWell's clinical-grade AM/PM formulas open for preorder.",
  },
};

function metaForRoute(url: string): RouteMeta {
  if (STATIC_ROUTES[url]) return STATIC_ROUTES[url];

  // /ingredients/:slug
  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (ingMatch) {
    const slug = ingMatch[1];
    const item = (ingredientData as Record<string, {
      name: string;
      atAGlance?: { whatItIs?: string; whyWeIncludeIt?: string; keyBenefits?: string[] };
    }>)[slug];
    const listed = ingredientList.find((i: { slug: string; display_name: string }) => i.slug === slug);
    const rawName = item?.name || listed?.display_name || slug;
    // Strip trademark/brand parenthetical for cleaner titles
    const name = rawName.split(" (")[0];

    // Build 120-160 char description from available fields.
    const ag = item?.atAGlance;
    const parts: string[] = [];
    if (ag?.whatItIs) parts.push(ag.whatItIs);
    if (ag?.whyWeIncludeIt) parts.push(ag.whyWeIncludeIt);
    if (ag?.keyBenefits && ag.keyBenefits.length) parts.push(ag.keyBenefits.slice(0, 3).join(". "));
    let desc = parts.join(" ").trim();
    if (desc.length < 80) {
      desc = `${name}: evidence-based dose rationale and mechanism for ZebraWell's hEDS, POTS, and MCAS protocol. ${desc}`.trim();
    }
    if (desc.length > 160) {
      const cut = desc.slice(0, 160);
      const lastDot = cut.lastIndexOf(". ");
      desc = lastDot > 100 ? cut.slice(0, lastDot + 1) : cut.slice(0, 157) + "...";
    }

    return {
      title: `${name} | ZebraWell`,
      description: desc,
    };
  }

  // Fallback (e.g., /showcase or unknown routes — handled but noindex)
  return {
    title: "ZebraWell",
    description: "Research-driven supplements for EDS, POTS, and MCAS.",
  };
}

export async function prerender(data: { url: string }) {
  const url = data.url;
  const meta = metaForRoute(url);
  const helmetContext: Record<string, unknown> = {};

  const app = (
    <HelmetProvider context={helmetContext}>
      <Router ssrPath={url}>
        <App />
      </Router>
    </HelmetProvider>
  );

  let html = "";
  try {
    html = renderToString(app);
  } catch (err) {
    console.warn(`[prerender] ${url}: render error, falling back to empty body`, err);
    html = "";
  }

  // Build head elements. Per-page canonical, title, description, OG, Twitter.
  const canonical = `${BASE}${url === "/" ? "/" : url}`;
  const isShowcase = url === "/showcase";

  const elements = new Set<{ type: string; props: Record<string, string> }>();
  elements.add({ type: "link", props: { rel: "canonical", href: canonical } });
  elements.add({ type: "meta", props: { name: "description", content: meta.description } });
  elements.add({ type: "meta", props: { property: "og:title", content: meta.title } });
  elements.add({ type: "meta", props: { property: "og:description", content: meta.description } });
  elements.add({ type: "meta", props: { property: "og:url", content: canonical } });
  elements.add({ type: "meta", props: { property: "og:type", content: "website" } });
  elements.add({ type: "meta", props: { name: "twitter:title", content: meta.title } });
  elements.add({ type: "meta", props: { name: "twitter:description", content: meta.description } });
  if (isShowcase) {
    elements.add({ type: "meta", props: { name: "robots", content: "noindex, nofollow" } });
  }

  return {
    html,
    head: {
      lang: "en",
      title: meta.title,
      elements,
    },
  };
}
