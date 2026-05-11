/* client/src/prerender.tsx
 *
 * Prerender entry. Called at build time by vite-prerender-plugin for each
 * route in the queue. Returns rendered HTML + per-page head metadata so each
 * static file has its own title, canonical, description, OG tags, and
 * JSON-LD structured data.
 *
 * Not loaded at runtime - only imported during build.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import ingredientList from "../../scripts/ingredient-routes.json";
import { ingredients as ingredientData } from "./data/ingredients";
import type { IngredientData } from "./data/ingredients";

const BASE = "https://www.wellnessforzebras.com";
const BRAND_NAME = "ZebraWell";
const LOGO = `${BASE}/zebra-logo.svg`;
const HERO_IMAGE = `${BASE}/images/zebrawell-bottles-final2.jpg`;
// Site-wide last-reviewed date for educational content. Bump when you do a
// pass through ingredients.ts content. Used for MedicalWebPage.lastReviewed.
const LAST_REVIEWED = "2026-05-11";

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
    title: "The How - Condition Science | ZebraWell",
    description:
      "How ZebraWell's AM/PM formulas address the specific biology of POTS, EDS, and MCAS - autonomic stability, mast cell modulation, and ECM preservation.",
  },
  "/ingredients": {
    title: "All Ingredients | ZebraWell",
    description:
      "Every ingredient in ZebraWell's AM and PM formulas. Doses, mechanisms, evidence, and the reasoning for inclusion in a hEDS/POTS/MCAS protocol.",
  },
  "/our-promise": {
    title: "Our Promise - Constitution | ZebraWell",
    description:
      "ZebraWell's formal commitment: transparent ingredients, decision logs, third-party testing, and accountability for the Zebra community.",
  },
  "/preorder": {
    title: "Reserve - Coming Soon | ZebraWell",
    description:
      "Join the reservation list to be notified when ZebraWell's clinical-grade AM/PM formulas open for preorder.",
  },
  "/privacy": {
    title: "Privacy Policy | ZebraWell",
    description:
      "How ZebraWell collects, uses, and protects your information. Email-only data collection, no third-party sharing, full delete-on-request.",
  },
  "/terms": {
    title: "Terms of Service | ZebraWell",
    description:
      "Terms governing your use of wellnessforzebras.com. Medical disclaimer, waitlist terms, intellectual property, and liability.",
  },
  "/shipping": {
    title: "Shipping & Returns | ZebraWell",
    description:
      "Pre-launch shipping policy and what to expect when ZebraWell becomes available. 30-day satisfaction guarantee planned at launch.",
  },
  "/contact": {
    title: "Contact Support | ZebraWell",
    description:
      "Reach the ZebraWell team. Product questions, formulation feedback, partnerships, press. We respond within two business days.",
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
      patientSummary?: string;
      atAGlance?: { whatItIs?: string; whyWeIncludeIt?: string; keyBenefits?: string[] };
    }>)[slug];
    const listed = ingredientList.find((i: { slug: string; display_name: string }) => i.slug === slug);
    const rawName = item?.name || listed?.display_name || slug;
    // Strip trademark/brand parenthetical for cleaner titles
    const name = rawName.split(" (")[0];

    // Build 120-160 char description from available fields. Patient summary
    // is preferred when present - it's plain-language and matches how people
    // actually search.
    const ag = item?.atAGlance;
    const parts: string[] = [];
    if (item?.patientSummary) parts.push(item.patientSummary);
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

  // Fallback (e.g., /showcase or unknown routes - handled but noindex)
  return {
    title: "ZebraWell",
    description: "Research-driven supplements for EDS, POTS, and MCAS.",
  };
}

// JSON-LD must escape "<" to "<" so a stray "</script>" in a string can
// never break out of the script tag. Standard practice for inline JSON-LD.
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

type HeadElement = {
  type: string;
  props: Record<string, string>;
};

function jsonLdElement(obj: unknown): HeadElement {
  return {
    type: "script",
    props: {
      type: "application/ld+json",
      children: safeJsonLd(obj),
    },
  };
}

function breadcrumbList(url: string, title: string): Record<string, unknown> {
  const items: Array<Record<string, unknown>> = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
  ];

  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (url === "/ingredients") {
    items.push({ "@type": "ListItem", position: 2, name: "Ingredients" });
  } else if (ingMatch) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Ingredients",
      item: `${BASE}/ingredients`,
    });
    items.push({ "@type": "ListItem", position: 3, name: title });
  } else if (url !== "/") {
    items.push({ "@type": "ListItem", position: 2, name: title });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function medicalWebPageForIngredient(
  slug: string,
  name: string,
  ing: IngredientData,
  description: string,
): Record<string, unknown> {
  const url = `${BASE}/ingredients/${slug}`;
  const cleanName = name.split(" (")[0];

  // Citation list from sources (cap at 12 to keep schema lean).
  const citations = (ing.sources || []).slice(0, 12).map((s) => {
    const cit: Record<string, unknown> = {
      "@type": "ScholarlyArticle",
      name: s.title,
    };
    if (s.pmid) {
      cit.identifier = `PMID:${s.pmid}`;
      cit.url = s.link || `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`;
    } else if (s.link) {
      cit.url = s.link;
    }
    if (s.authors) cit.author = s.authors;
    if (s.year) cit.datePublished = s.year;
    return cit;
  });

  const about: Record<string, unknown> = {
    "@type": "DietarySupplement",
    name: cleanName,
  };
  if (ing.scientificName) about.alternateName = ing.scientificName;
  if (ing.atAGlance?.dose) about.recommendedIntake = ing.atAGlance.dose;
  if (ing.atAGlance?.whatItIs) about.description = ing.atAGlance.whatItIs;
  const safetyParts = [
    ing.safety?.cautions,
    ing.safety?.sideEffects,
    ing.safety?.interactions ? `Interactions: ${ing.safety.interactions}` : "",
  ].filter(Boolean);
  if (safetyParts.length) about.safetyConsideration = safetyParts.join(" ");
  about.targetPopulation = "Adults 18+ with hypermobile Ehlers-Danlos Syndrome, POTS, or Mast Cell Activation Syndrome";
  about.legalStatus = {
    "@type": "DrugLegalStatus",
    name: "Dietary supplement, US DSHEA",
  };

  return {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Article"],
    "@id": url,
    url,
    name: `${cleanName}: Evidence, Mechanism, Dose, and Safety`,
    headline: `${cleanName}: Evidence, Mechanism, Dose, and Safety for hEDS, POTS, and MCAS`,
    description,
    inLanguage: "en-US",
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    about,
    isPartOf: { "@id": `${BASE}/#website` },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: `${BASE}/`,
      logo: { "@type": "ImageObject", url: LOGO },
    },
    lastReviewed: LAST_REVIEWED,
    dateModified: LAST_REVIEWED,
    image: HERO_IMAGE,
    ...(citations.length ? { citation: citations } : {}),
  };
}

function faqPageForIngredient(ing: IngredientData): Record<string, unknown> | null {
  if (!ing.faq || ing.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ing.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function schemaElementsForRoute(url: string, title: string): HeadElement[] {
  const out: HeadElement[] = [];
  // Breadcrumbs on every page.
  out.push(jsonLdElement(breadcrumbList(url, title.replace(" | ZebraWell", ""))));

  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (ingMatch) {
    const slug = ingMatch[1];
    const ing = (ingredientData as Record<string, IngredientData>)[slug];
    if (ing) {
      const description = metaForRoute(url).description;
      out.push(jsonLdElement(medicalWebPageForIngredient(slug, ing.name, ing, description)));
      const faq = faqPageForIngredient(ing);
      if (faq) out.push(jsonLdElement(faq));
    }
  }

  return out;
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

  // Build head elements. Per-page canonical, title, description, OG, Twitter,
  // and structured data.
  const canonical = `${BASE}${url === "/" ? "/" : url}`;
  const isShowcase = url === "/showcase";

  const elements = new Set<HeadElement>();
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
  } else {
    // Per-route JSON-LD: BreadcrumbList (all pages) and MedicalWebPage +
    // FAQPage (ingredient pages). Site-wide Organization + Product schema
    // stays in client/index.html and ships on every page automatically.
    for (const el of schemaElementsForRoute(url, meta.title)) {
      elements.add(el);
    }
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
