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
import { INGREDIENT_SEO } from "./data/ingredientSeo";
import { datesFor, isoDateTime } from "./data/pageDates";
import { buildReferences } from "./data/references";
import { EXCIPIENT_FAQ } from "./data/excipients";
import { HUBS_PUBLISHED, hubForPath } from "./data/clusterHubs";

const BASE = "https://www.wellnessforzebras.com";
const BRAND_NAME = "ZebraThrive";
const LOGO = `${BASE}/zebra-logo.svg`;
const HERO_IMAGE = `${BASE}/images/zebrathrive-bottles-og.jpg`;
// Per-ingredient 1200x630 card (client/public/images/og/<slug>.jpg), generated
// from the ingredient's name, form and dose. Declared as both og:image and
// Article.image (Google reads either as the thumbnail source) and rendered
// visibly on the page in the "Where X fits" block.
const ingredientImage = (slug: string) => `${BASE}/images/og/${slug}.jpg`;
// Per-page dates (datePublished, dateModified, lastReviewed) come from
// client/src/data/pageDates.ts, the same source as the sitemap and the
// visible "Last updated" line.
// Named author on every educational page. YMYL E-E-A-T pattern:
// AI assistants weight content with named credentialed humans much higher
// than anonymous content. reviewedBy is intentionally absent until a
// licensed clinician signs on - do not fabricate a reviewer.
// WebSite node (homepage only). Google's site-name system reads WebSite
// name/alternateName on the home page; the domain (wellnessforzebras.com)
// differs from the brand, so the brand is stated explicitly. Articles point
// isPartOf here (an Article is part of a website, not of an Organization).
const WEBSITE_ID = `${BASE}/#website`;
const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BRAND_NAME,
  alternateName: ["Wellness for Zebras", "wellnessforzebras.com"],
  url: `${BASE}/`,
  inLanguage: "en-US",
  publisher: { "@id": `${BASE}/#organization` },
};

function articleDates(d: { published: string; modified: string }, withReviewed = false) {
  return {
    datePublished: isoDateTime(d.published),
    dateModified: isoDateTime(d.modified),
    ...(withReviewed ? { lastReviewed: isoDateTime(d.modified) } : {}),
  };
}

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
    title: `All ${Object.keys(ingredientData).length} Ingredients: Doses, Forms and Evidence | ZebraThrive`,
    description:
      "Every ingredient in ZebraThrive's AM capsules, PM capsules, and Daily Powder, with doses, forms, evidence, and the reason each one is included.",
  },
  "/our-promise": {
    title: "Our Promise: Constitution | ZebraThrive",
    description:
      "ZebraThrive's commitments: disclosed ingredients and excipients, lot-verified ingredient COAs, cited evidence, and honest limits on what we claim.",
  },
  "/excipients": {
    title: "Excipients ZebraThrive Leaves Out, and What It Uses Instead",
    description:
      "Why ZebraThrive excludes citric acid, magnesium stearate, titanium dioxide, carrageenan, gelatin, dyes, flavors and soy, and what it uses instead.",
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

  // Cluster hubs (client/src/data/clusterHubs.ts)
  const hub = hubForPath(url);
  if (hub) return { title: hub.title, description: hub.description };

  // /ingredients/:slug
  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (ingMatch) {
    const slug = ingMatch[1];
    // Hand-written title + description (client/src/data/ingredientSeo.ts).
    const seo = INGREDIENT_SEO[slug];
    if (seo) return { title: seo.title, description: seo.description };

    // Fallback for an ingredient without an INGREDIENT_SEO entry.
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
      // Cut at a sentence end, else at a word boundary. Never mid-word.
      const cut = desc.slice(0, 160);
      const lastDot = cut.lastIndexOf(". ");
      desc = lastDot > 100 ? cut.slice(0, lastDot + 1) : cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + ".";
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

// BreadcrumbList only for routes that render a visible trail
// (components/Breadcrumbs.tsx): /ingredients and /ingredients/:slug.
// Names match the visible trail. Returns null elsewhere.
function breadcrumbList(url: string, currentName: string): Record<string, unknown> | null {
  const items: Array<Record<string, unknown>> = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
  ];

  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (url === "/ingredients") {
    items.push({ "@type": "ListItem", position: 2, name: "Ingredients" });
  } else if (url === "/excipients") {
    items.push({ "@type": "ListItem", position: 2, name: "Excipients" });
  } else if (hubForPath(url)) {
    items.push({ "@type": "ListItem", position: 2, name: currentName });
  } else if (ingMatch) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Ingredients",
      item: `${BASE}/ingredients`,
    });
    items.push({ "@type": "ListItem", position: 3, name: currentName });
  } else {
    return null;
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

  // Citation list: same numbered references the page shows, with
  // bibliographic fields from PubMed (client/src/data/references.ts).
  const citations = buildReferences(ing).refs.map((r) => {
    const cit: Record<string, unknown> = {
      "@type": "ScholarlyArticle",
      name: r.title,
      // Google reads every ScholarlyArticle as an Article item; without a
      // headline each citation showed as "Unnamed item" in Rich Results Test.
      headline: r.title,
    };
    if (r.authors) cit.author = r.authors;
    if (r.year) cit.datePublished = r.year;
    if (r.journalFull) cit.isPartOf = { "@type": "Periodical", name: r.journalFull };
    if (r.pmid) {
      cit.identifier = [
        { "@type": "PropertyValue", propertyID: "PMID", value: r.pmid },
        ...(r.doi ? [{ "@type": "PropertyValue", propertyID: "DOI", value: r.doi }] : []),
      ];
      cit.url = `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`;
      if (r.doi) cit.sameAs = `https://doi.org/${r.doi}`;
    } else if (r.link) {
      cit.url = r.link;
    }
    return cit;
  });

  const dates = datesFor(`/ingredients/${slug}`);

  // `about` is typed Substance, not DietarySupplement: schema.org
  // DietarySupplement is a Product subtype, and Google's Rich Results Test
  // flagged it as an invalid Product snippet (no offers/review/rating) on
  // every ingredient page (verified 2026-11-01). Dose and safety stay in the
  // visible page and the .md companion.
  const about: Record<string, unknown> = {
    "@type": "Substance",
    name: cleanName,
  };
  if (ing.scientificName) about.alternateName = ing.scientificName;
  if (ing.atAGlance?.whatItIs) about.description = ing.atAGlance.whatItIs;

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
    about,
    isPartOf: { "@id": WEBSITE_ID },
    author: AUTHOR,
    publisher: { "@id": `${BASE}/#organization` },
    ...(dates ? articleDates(dates, true) : {}),
    image: ingredientImage(slug),
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

// /our-promise is an 800-word editorial page with a visible byline and date,
// so it carries Article markup like the ingredient pages (handbook §7).
function articleForOurPromise(description: string): Record<string, unknown> {
  const url = `${BASE}/our-promise`;
  const dates = datesFor("/our-promise");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: "Our Constitution: what ZebraThrive commits to",
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    author: AUTHOR,
    publisher: { "@id": `${BASE}/#organization` },
    ...(dates ? articleDates(dates) : {}),
    image: HERO_IMAGE,
  };
}

// /excipients: editorial hub with a visible byline, date and FAQ.
function articleForExcipients(description: string): Record<string, unknown> {
  const url = `${BASE}/excipients`;
  const dates = datesFor("/excipients");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: "Excipients: what ZebraThrive leaves out, and what it uses instead",
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    author: AUTHOR,
    publisher: { "@id": `${BASE}/#organization` },
    ...(dates ? articleDates(dates) : {}),
    image: HERO_IMAGE,
  };
}

// Cluster hubs: same editorial shape as /excipients (byline, date, FAQ).
function articleForHub(path: string, headline: string, description: string): Record<string, unknown> {
  const url = `${BASE}${path}`;
  const dates = datesFor(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    author: AUTHOR,
    publisher: { "@id": `${BASE}/#organization` },
    ...(dates ? articleDates(dates) : {}),
    image: HERO_IMAGE,
  };
}

function schemaElementsForRoute(url: string): HeadElement[] {
  const out: HeadElement[] = [];

  if (url === "/") {
    out.push(jsonLdElement(WEBSITE));
  }
  if (url === "/our-promise") {
    out.push(jsonLdElement(articleForOurPromise(metaForRoute(url).description)));
  }
  if (url === "/excipients") {
    const bc = breadcrumbList(url, "Excipients");
    if (bc) out.push(jsonLdElement(bc));
    out.push(jsonLdElement(articleForExcipients(metaForRoute(url).description)));
    out.push(
      jsonLdElement({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: EXCIPIENT_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    );
  }

  const hub = hubForPath(url);
  if (hub) {
    const bc = breadcrumbList(url, hub.crumb);
    if (bc) out.push(jsonLdElement(bc));
    out.push(jsonLdElement(articleForHub(hub.path, hub.h1, hub.description)));
    out.push(
      jsonLdElement({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: hub.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    );
  }

  const ingMatch = url.match(/^\/ingredients\/([a-z0-9-]+)\/?$/);
  if (url === "/ingredients") {
    const bc = breadcrumbList(url, "Ingredients");
    if (bc) out.push(jsonLdElement(bc));
  }
  if (ingMatch) {
    const slug = ingMatch[1];
    const ing = (ingredientData as Record<string, IngredientData>)[slug];
    if (ing) {
      const bc = breadcrumbList(url, ing.name);
      if (bc) out.push(jsonLdElement(bc));
      const description = metaForRoute(url).description;
      out.push(jsonLdElement(medicalWebPageForIngredient(slug, ing.name, ing, description)));
      const faq = faqPageForIngredient(ing);
      if (faq) out.push(jsonLdElement(faq));
      // HowTo removed 2026-11-01: Google retired HowTo rich results
      // (2023-09-14). The visible "How to Start" table stays on the page.
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
    url === "/preorder" || // 2026-10-07: reservation page kept live but out of search until rebuilt
    (Boolean(hubForPath(url)) && !HUBS_PUBLISHED); // cluster hubs: noindex until the attorney pass (clusterHubs.ts)

  const elements = new Set<HeadElement>();
  if (!isNotFound) {
    elements.add({ type: "link", props: { rel: "canonical", href: canonical } });
  }
  // Markdown companion (scripts/generate-md-pages.ts) for AI agents. Only routes
  // that actually emit a .md; keep in sync with that script.
  const hasMarkdownMirror =
    /^\/ingredients\/[a-z0-9-]+\/?$/.test(url) ||
    ["/ingredients", "/our-promise", "/excipients", "/contact"].includes(url);
  if (hasMarkdownMirror && !isHidden) {
    elements.add({ type: "link", props: { rel: "alternate", type: "text/markdown", href: `${BASE}${url.replace(/\/$/, "")}.md` } });
  }
  elements.add({ type: "meta", props: { name: "description", content: meta.description } });
  elements.add({ type: "meta", props: { property: "og:title", content: meta.title } });
  elements.add({ type: "meta", props: { property: "og:description", content: meta.description } });
  if (!isNotFound) {
    elements.add({ type: "meta", props: { property: "og:url", content: canonical } });
  }
  const isIngredientPage = /^\/ingredients\/[a-z0-9-]+\/?$/.test(url);
  // Pages carrying Article JSON-LD are articles for Open Graph too.
  const isArticlePage = isIngredientPage || url === "/our-promise" || url === "/excipients" || Boolean(hubForPath(url));
  elements.add({ type: "meta", props: { property: "og:type", content: isArticlePage ? "article" : "website" } });
  const ingSlug = isIngredientPage ? url.match(/^\/ingredients\/([a-z0-9-]+)/)![1] : null;
  const shareImage = ingSlug ? ingredientImage(ingSlug) : HERO_IMAGE;
  const shareAlt = ingSlug
    ? `${(ingredientData as Record<string, IngredientData>)[ingSlug]?.name || ingSlug}: dose and form in ZebraThrive`
    : "ZebraThrive AM capsules, PM capsules and Daily Powder";
  elements.add({ type: "meta", props: { property: "og:image", content: shareImage } });
  elements.add({ type: "meta", props: { property: "og:image:width", content: "1200" } });
  elements.add({ type: "meta", props: { property: "og:image:height", content: "630" } });
  elements.add({ type: "meta", props: { property: "og:image:alt", content: shareAlt } });
  elements.add({ type: "meta", props: { name: "twitter:image", content: shareImage } });
  const pageDates = datesFor(url);
  if (isArticlePage && pageDates) {
    elements.add({ type: "meta", props: { property: "article:published_time", content: isoDateTime(pageDates.published) } });
    elements.add({ type: "meta", props: { property: "article:modified_time", content: isoDateTime(pageDates.modified) } });
  }
  elements.add({ type: "meta", props: { name: "twitter:title", content: meta.title } });
  elements.add({ type: "meta", props: { name: "twitter:description", content: meta.description } });
  if (isShowcase || isHidden || isNotFound) {
    elements.add({ type: "meta", props: { name: "robots", content: "noindex, nofollow" } });
  } else {
    // Large image previews in Search and Discover (Google robots meta doc).
    elements.add({ type: "meta", props: { name: "robots", content: "max-image-preview:large" } });
    // Per-route JSON-LD: BreadcrumbList (/ingredients and ingredient pages,
    // which show a visible trail) and MedicalWebPage + FAQPage (ingredient
    // pages). Site-wide Organization schema stays in
    // client/index.html and ships on every page automatically.
    for (const el of schemaElementsForRoute(url)) {
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
