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
import { CONTENT_LAST_REVIEWED } from "./lib/siteDates";

const BASE = "https://www.wellnessforzebras.com";
const BRAND_NAME = "ZebraThrive";
const LOGO = `${BASE}/zebra-logo.svg`;
const HERO_IMAGE = `${BASE}/images/zebrathrive-bottles-og.jpg`;
// Site-wide last-reviewed date for educational content. Bump in
// client/src/lib/siteDates.ts when you do a content pass. Used for
// MedicalWebPage.lastReviewed and dateModified.
const LAST_REVIEWED = CONTENT_LAST_REVIEWED;
// Named author on every educational page. YMYL E-E-A-T pattern:
// AI assistants weight content with named credentialed humans much higher
// than anonymous content. reviewedBy is intentionally absent until a
// licensed clinician signs on - do not fabricate a reviewer.
const AUTHOR = {
  "@type": "Person",
  name: "Ken Chapman",
  jobTitle: "Founder, ZebraThrive",
  worksFor: { "@id": "https://www.wellnessforzebras.com/#organization" },
};

type RouteMeta = {
  title: string;
  description: string;
};

const STATIC_ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "ZebraThrive | Supplements for the EDS, POTS & MCAS Community",
    description:
      "Research-driven AM capsules, PM capsules, and Daily Powder built around the sensitivities of the zebra community. Forms, doses, and excipients disclosed.",
  },
  "/the-how": {
    title: "The How: Formulation Rationale | ZebraThrive",
    description:
      "How ZebraThrive's AM capsules, PM capsules, and Daily Powder are organized, and the published research behind each layer of the formulation.",
  },
  "/ingredients": {
    title: "All Ingredients | ZebraThrive",
    description:
      "Every ingredient in ZebraThrive's AM capsules, PM capsules, and Daily Powder, with doses, forms, evidence, and the reason each one is included.",
  },
  "/our-promise": {
    title: "Our Promise: Constitution | ZebraThrive",
    description:
      "ZebraThrive's commitments: disclosed ingredients and excipients, lot-verified ingredient COAs, cited evidence, and honest limits on what we claim.",
  },
  "/preorder": {
    title: "Reserve: Coming Soon | ZebraThrive",
    description:
      "Join the reservation list to hear when ZebraThrive's AM capsules, PM capsules, and Daily Powder open for order.",
  },
  "/privacy": {
    title: "Privacy Policy | ZebraThrive",
    description:
      "What ZebraThrive collects through its forms, who processes it, the analytics and advertising tools on this site, and how to opt out or request deletion.",
  },
  "/terms": {
    title: "Terms of Service | ZebraThrive",
    description:
      "Terms governing your use of wellnessforzebras.com. Medical disclaimer, waitlist terms, intellectual property, and liability.",
  },
  "/shipping": {
    title: "Shipping & Returns | ZebraThrive",
    description:
      "Pre-launch shipping policy and what to expect when ZebraThrive becomes available. 30-day satisfaction guarantee planned at launch.",
  },
  "/404": {
    title: "Page Not Found | ZebraThrive",
    description: "This page does not exist on wellnessforzebras.com.",
  },
  "/contact": {
    title: "Contact Support | ZebraThrive",
    description:
      "Reach the ZebraThrive team. Product questions, formulation feedback, partnerships, press. We respond within two business days.",
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
      bluf?: string;
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
    // Prefer the BLUF answer capsule when present - it's the curated 40-60 word
    // summary that was reviewed against v7.8 RFQ for accuracy.
    const ag = item?.atAGlance;
    const parts: string[] = [];
    const itemAny = item as { bluf?: string; patientSummary?: string } | undefined;
    if (itemAny?.bluf) parts.push(itemAny.bluf);
    if (itemAny?.patientSummary && !itemAny.bluf) parts.push(itemAny.patientSummary);
    if (ag?.whatItIs) parts.push(ag.whatItIs);
    if (ag?.whyWeIncludeIt) parts.push(ag.whyWeIncludeIt);
    if (ag?.keyBenefits && ag.keyBenefits.length) parts.push(ag.keyBenefits.slice(0, 3).join(". "));
    let desc = parts.join(" ").trim();
    if (desc.length < 80) {
      desc = `${name}: dose rationale, mechanism, and evidence for its place in the ZebraThrive formula. ${desc}`.trim();
    }
    if (desc.length > 160) {
      const cut = desc.slice(0, 160);
      const lastDot = cut.lastIndexOf(". ");
      desc = lastDot > 100 ? cut.slice(0, lastDot + 1) : cut.slice(0, 157) + "...";
    }

    return {
      title: `${name} | ZebraThrive`,
      description: desc,
    };
  }

  // Fallback (e.g., /showcase or unknown routes - handled but noindex)
  return {
    title: "ZebraThrive",
    description: "Research-driven supplements for the zebra community.",
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

  return {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Article"],
    "@id": url,
    url,
    name: `${cleanName}: Evidence, Mechanism, Dose, and Safety`,
    headline: `${cleanName}: Evidence, Mechanism, Dose, and Safety`,
    description,
    inLanguage: "en-US",
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    mainContentOfPage: [
      "What it is",
      "Mechanism",
      "Condition-specific notes (MCAS, hEDS, POTS)",
      "Form selection rationale",
      "Dose protocol",
      "Evidence summary",
      "Safety and interactions",
      "Frequently asked questions",
      "References",
    ],
    about,
    isPartOf: { "@id": `${BASE}/#organization` },
    author: AUTHOR,
    publisher: { "@id": `${BASE}/#organization` },
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

function howToForIngredient(
  slug: string,
  name: string,
  ing: IngredientData,
): Record<string, unknown> | null {
  const protocol = ing.howToStart?.protocol;
  if (!protocol || protocol.length === 0) return null;
  const cleanName = name.split(" (")[0];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to start ${cleanName}`,
    description: `A gradual, step-by-step way to introduce ${cleanName}, from the ZebraThrive ingredient page.`,
    url: `${BASE}/ingredients/${slug}#how-to-start`,
    totalTime: ing.howToStart?.timeline || undefined,
    step: protocol.map((p, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: p.step,
      text: `${p.dosage}. ${p.notes}`.trim(),
    })),
  };
}

function schemaElementsForRoute(url: string, title: string): HeadElement[] {
  const out: HeadElement[] = [];
  // Breadcrumbs on every page.
  out.push(jsonLdElement(breadcrumbList(url, title.replace(" | ZebraThrive", ""))));

  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (ingMatch) {
    const slug = ingMatch[1];
    const ing = (ingredientData as Record<string, IngredientData>)[slug];
    if (ing) {
      const description = metaForRoute(url).description;
      out.push(jsonLdElement(medicalWebPageForIngredient(slug, ing.name, ing, description)));
      const faq = faqPageForIngredient(ing);
      if (faq) out.push(jsonLdElement(faq));
      const howTo = howToForIngredient(slug, ing.name, ing);
      if (howTo) out.push(jsonLdElement(howTo));
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
  const isNotFound = url === "/404"; // copied to dist/public/404.html at build; served with HTTP 404
  const isHidden =
    url === "/the-how" || // 2026-05-12: hidden until ready, unindexed if URL is visited directly
    url === "/preorder"; // 2026-10-07: reservation page kept live but out of search until rebuilt

  const elements = new Set<HeadElement>();
  if (!isNotFound) {
    elements.add({ type: "link", props: { rel: "canonical", href: canonical } });
  }
  elements.add({ type: "meta", props: { name: "description", content: meta.description } });
  elements.add({ type: "meta", props: { property: "og:title", content: meta.title } });
  elements.add({ type: "meta", props: { property: "og:description", content: meta.description } });
  if (!isNotFound) {
    elements.add({ type: "meta", props: { property: "og:url", content: canonical } });
  }
  elements.add({ type: "meta", props: { property: "og:type", content: "website" } });
  elements.add({ type: "meta", props: { name: "twitter:title", content: meta.title } });
  elements.add({ type: "meta", props: { name: "twitter:description", content: meta.description } });
  if (isShowcase || isHidden || isNotFound) {
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
