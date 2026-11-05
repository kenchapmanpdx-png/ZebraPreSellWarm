/* scripts/generate-md-pages.ts
 *
 * Postbuild: emits a token-efficient Markdown companion at /<slug>.md for
 * every prerendered route, plus /llms-routes.txt for AI assistant discovery.
 *
 * Why: AI assistants (ChatGPT search, Perplexity, Claude) pay per token and
 * latency-sensitively when fetching pages mid-conversation. A clean Markdown
 * surface drops 80-90% of the HTML weight (no React tree, no Tailwind, no
 * navigation chrome), making real-time citation cheaper and more likely.
 *
 * Generates:
 *   dist/public/ingredients/{slug}.md   - per-ingredient deep markdown
 *   dist/public/the-how.md              - core page markdown
 *   dist/public/ingredients.md          - index of all ingredient pages
 *   dist/public/our-promise.md          - core page markdown
 *   etc.
 *
 * Vercel serves .md files with Content-Type: text/markdown automatically.
 * The vercel.json rewrite rule excludes paths with "." so these are served
 * as static files, not rewritten to the SPA shell.
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { ingredients } from "../client/src/data/ingredients.ts";
import type { IngredientData } from "../client/src/data/ingredients.ts";
import ingredientList from "./ingredient-routes.json" with { type: "json" };
import { datesFor } from "../client/src/data/pageDates.ts";
import {
  EXCIPIENTS_INTRO,
  EXCIPIENT_DEFINITION,
  EXCLUDED_EXCIPIENTS,
  USED_EXCIPIENTS,
  CARRIERS,
  CARRIERS_NOTE,
  LABEL_CHECKS,
  EXCIPIENT_FAQ,
} from "../client/src/data/excipients.ts";
import { buildReferences, citationText } from "../client/src/data/references.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = resolve(__dirname, "../dist/public");
const BASE = "https://www.wellnessforzebras.com";
// Per-page dates come from client/src/data/pageDates.ts (same source as the
// HTML pages and the sitemap). Pages without an entry (noindex /the-how and
// /preorder) keep the last site-wide review date.
const LEGACY_REVIEWED = "2026-10-07";
const updatedFor = (path: string) => datesFor(path)?.modified ?? LEGACY_REVIEWED;
const FDA_DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.";

function scrubEmDashes(s: string): string {
  return s.replace(/\u2014/g, "-").replace(/\u2013/g, "-");
}

function ingredientMarkdown(slug: string, ing: IngredientData): string {
  const url = `${BASE}/ingredients/${slug}`;
  const name = ing.name;
  const out: string[] = [];

  // BLUF answer capsule (40-60 word target per §5 of master GEO doc).
  out.push(`# ${name}`);
  out.push("");
  // Lead with the BLUF answer capsule when present (master GEO doc §5).
  // patientSummary is the longer plain-language layer, included below.
  if (ing.bluf) {
    out.push(`> ${ing.bluf}`);
  } else if (ing.patientSummary) {
    out.push(`> ${ing.patientSummary}`);
  } else if (ing.atAGlance?.whyWeIncludeIt) {
    out.push(`> ${ing.atAGlance.whatItIs}. ${ing.atAGlance.whyWeIncludeIt}.`);
  }
  out.push("");
  out.push(`**Page:** ${url}`);
  out.push(`**Brand:** ZebraThrive`);
  out.push(`**Author:** Ken Chapman, Founder of ZebraThrive`);
  out.push(`**Last updated:** ${updatedFor(`/ingredients/${slug}`)}`);
  if (ing.scientificName) out.push(`**Scientific name:** ${ing.scientificName}`);
  if (ing.atAGlance?.dose) out.push(`**Daily dose:** ${ing.atAGlance.dose}`);
  if (ing.whyThisForm?.form) out.push(`**Form used:** ${ing.whyThisForm.form}`);
  out.push(`**Target population:** Adults 18+ with hypermobile Ehlers-Danlos Syndrome (hEDS), Postural Orthostatic Tachycardia Syndrome (POTS), or Mast Cell Activation Syndrome (MCAS).`);
  out.push(`**Regulatory framing:** US DSHEA dietary supplement. ${FDA_DISCLAIMER}`);
  out.push("");

  if (ing.atAGlance?.keyBenefits?.length) {
    out.push("## Key benefits");
    out.push("");
    for (const b of ing.atAGlance.keyBenefits) out.push(`- ${b}`);
    out.push("");
  }

  if (ing.atAGlance?.whatItIs) {
    out.push("## What it is");
    out.push("");
    out.push(ing.atAGlance.whatItIs);
    out.push("");
  }

  if (ing.atAGlance?.whyWeIncludeIt) {
    out.push("## Why we include it");
    out.push("");
    out.push(ing.atAGlance.whyWeIncludeIt);
    out.push("");
  }

  // If a BLUF was the lead and a longer patientSummary exists, surface
  // the patientSummary as a second-paragraph "Plain-language summary"
  // section so the .md retains the deeper content.
  if (ing.bluf && ing.patientSummary) {
    out.push("## Plain-language summary");
    out.push("");
    out.push(ing.patientSummary);
    out.push("");
  }

  if (ing.howItWorks) {
    out.push("## Mechanism");
    out.push("");
    out.push(ing.howItWorks);
    out.push("");
  }

  if (ing.triad) {
    out.push("## Condition-specific notes");
    out.push("");
    if (ing.triad.mcas) {
      out.push("### MCAS (Mast Cell Activation Syndrome)");
      out.push("");
      out.push(ing.triad.mcas);
      out.push("");
    }
    if (ing.triad.heds) {
      out.push("### hEDS (hypermobile Ehlers-Danlos Syndrome)");
      out.push("");
      out.push(ing.triad.heds);
      out.push("");
    }
    if (ing.triad.pots) {
      out.push("### POTS (Postural Orthostatic Tachycardia Syndrome)");
      out.push("");
      out.push(ing.triad.pots);
      out.push("");
    }
  }

  if (ing.whyThisForm) {
    out.push("## Why this form");
    out.push("");
    out.push(`**Selected form:** ${ing.whyThisForm.form}`);
    out.push("");
    out.push(ing.whyThisForm.rationale);
    out.push("");
    if (ing.whyThisForm.comparison?.length) {
      out.push("**Form comparison:**");
      out.push("");
      out.push("| Form | Notes | Selected |");
      out.push("|---|---|---|");
      for (const c of ing.whyThisForm.comparison) {
        out.push(`| ${c.form} | ${c.difference} | ${c.selected ? "Yes" : "No"} |`);
      }
      out.push("");
    }
  }

  if (ing.howToStart?.protocol?.length) {
    out.push("## Dose protocol");
    out.push("");
    out.push("| Step | Dosage | Notes |");
    out.push("|---|---|---|");
    for (const p of ing.howToStart.protocol) {
      out.push(`| ${p.step} | ${p.dosage} | ${p.notes} |`);
    }
    out.push("");
    if (ing.howToStart.timeline) {
      out.push(`**Timeline to effect:** ${ing.howToStart.timeline}`);
      out.push("");
    }
  }

  // Same numbered list as the page (client/src/data/references.ts).
  const { refs: refList, numberFor: refFor } = buildReferences(ing);

  if (ing.research?.length) {
    out.push("## Evidence summary");
    out.push("");
    for (const block of ing.research) {
      out.push(`### ${block.outcome}`);
      out.push("");
      out.push(block.summary);
      out.push("");
      for (const s of block.studies) {
        const refN = refFor(s.pmid);
        const ref = refN !== undefined ? `[${refN}] ` : "";
        const pmid = s.pmid ? ` PMID: ${s.pmid}.` : "";
        const design = s.design ? ` Design: ${s.design}.` : "";
        out.push(`- ${ref}**${s.source}.**${design} Finding: ${s.finding.replace(/\.$/, "")}.${pmid}`);
      }
      out.push("");
    }
  }

  if (ing.evidenceGaps) {
    out.push("## Evidence gaps");
    out.push("");
    out.push(ing.evidenceGaps);
    out.push("");
  }

  if (ing.safety) {
    out.push("## Safety");
    out.push("");
    if (ing.safety.sideEffects) {
      out.push(`**Side effects:** ${ing.safety.sideEffects}`);
      out.push("");
    }
    if (ing.safety.interactions) {
      out.push(`**Interactions:** ${ing.safety.interactions}`);
      out.push("");
    }
    if (ing.safety.cautions) {
      out.push(`**Cautions:** ${ing.safety.cautions}`);
      out.push("");
    }
    if (ing.safety.excipientConcerns?.avoid?.length) {
      out.push(`**Excipients to avoid:** ${ing.safety.excipientConcerns.avoid.join(", ")}`);
      out.push("");
    }
    if (ing.safety.excipientConcerns?.safe?.length) {
      out.push(`**Excipients that are safe:** ${ing.safety.excipientConcerns.safe.join(", ")}`);
      out.push("");
    }
  }

  if (ing.faq?.length) {
    out.push("## Frequently asked questions");
    out.push("");
    for (const f of ing.faq) {
      out.push(`### ${f.q}`);
      out.push("");
      out.push(f.a);
      out.push("");
    }
  }

  if (refList.length) {
    out.push("## References");
    out.push("");
    out.push("Authors, journals, dates and study types as indexed by PubMed.");
    out.push("");
    for (const r of refList) {
      let line = `[${r.n}] ${citationText(r)}`;
      if (r.studyType) line += `. Study type: ${r.studyType}`;
      if (r.pmid) line += `. PMID: ${r.pmid}. https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`;
      else if (r.link) line += ` ${r.link}`;
      if (r.pmc) line += ` Free full text: https://pmc.ncbi.nlm.nih.gov/articles/${r.pmc}/`;
      out.push(line);
    }
    out.push("");
  }

  return scrubEmDashes(out.join("\n"));
}

function ingredientsIndexMarkdown(): string {
  const out: string[] = [];
  out.push("# ZebraThrive Ingredients");
  out.push("");
  out.push("> Every ingredient in ZebraThrive's three-part system (AM capsules, PM capsules, and Daily Powder) with doses, SKU placement, mechanisms, evidence, and the reasoning for inclusion. Each ingredient links to a full markdown summary with PMID citations.");
  out.push("");
  out.push(`**Brand:** ZebraThrive. **Last updated:** ${updatedFor("/ingredients")}.`);
  out.push("");
  out.push("## Ingredients");
  out.push("");
  for (const r of ingredientList as Array<{ slug: string; display_name: string }>) {
    const ing = (ingredients as Record<string, IngredientData>)[r.slug];
    const summary =
      ing?.atAGlance?.whatItIs?.replace(/\u2014|\u2013/g, "-").trim() ||
      "";
    const dose = ing?.atAGlance?.dose ? ` Dose: ${ing.atAGlance.dose}.` : "";
    out.push(`- [${r.display_name}](${BASE}/ingredients/${r.slug}.md): ${summary}${dose}`);
  }
  out.push("");
  out.push(`**Regulatory framing:** ${FDA_DISCLAIMER}`);
  out.push("");
  return scrubEmDashes(out.join("\n"));
}

function excipientsMarkdown(): string {
  const lines: string[] = [];
  lines.push("# Excipients: what ZebraThrive leaves out, and what it uses instead", "");
  lines.push(`> ${EXCIPIENTS_INTRO}`, "");
  lines.push(`**Page:** ${BASE}/excipients`, "**Brand:** ZebraThrive", "**Author:** Ken Chapman, Founder of ZebraThrive", `**Last updated:** ${updatedFor("/excipients")}`, "");
  lines.push("## What is an excipient?", "", EXCIPIENT_DEFINITION, "");
  lines.push("## The eight excipients ZebraThrive excludes", "");
  for (const e of EXCLUDED_EXCIPIENTS) {
    lines.push(`### ${e.question}`, "");
    lines.push(`- **What it is:** ${e.whatItIs}`);
    lines.push(`- **Why it is out:** ${e.whyExcluded}`);
    lines.push(`- **What ZebraThrive uses instead:** ${e.instead}`);
    if (e.links?.length) lines.push(`- Related: ${e.links.map((l) => `[${l.label}](${BASE}${l.href}.md)`).join(", ")}`);
    lines.push("");
  }
  lines.push("## The excipients ZebraThrive does use", "", "| Role | Excipient | Where |", "|---|---|---|");
  for (const u of USED_EXCIPIENTS) lines.push(`| ${u.role} | ${u.excipient} | ${u.where} |`);
  lines.push("");
  lines.push("## Carriers that arrive with the raw materials", "", CARRIERS_NOTE, "", "| Carrier | Arrives with | Amount |", "|---|---|---|");
  for (const c of CARRIERS) lines.push(`| ${c.carrier} | ${c.arrivesWith} | ${c.amount} |`);
  lines.push("");
  lines.push("## How to check any supplement label for these excipients", "");
  LABEL_CHECKS.forEach((l, i) => lines.push(`${i + 1}. ${l}`));
  lines.push("");
  lines.push("## Common questions about excipients", "");
  for (const f of EXCIPIENT_FAQ) lines.push(`**${f.q}**`, "", f.a, "");
  lines.push("## Regulatory framing", "", FDA_DISCLAIMER, "");
  return lines.join("\n");
}

function corePagesMarkdown(): Array<{ path: string; content: string }> {
  // Each entry: path inside dist/public, file content.
  const pages = [
    { path: "excipients.md", content: excipientsMarkdown() },
    {
      path: "the-how.md",
      content: `# The How: ZebraThrive's Three-Part System

> ZebraThrive is a three-part system: AM capsules, PM capsules, and a Daily Powder. Together they provide structure/function support in three areas relevant to people living with hEDS, POTS, and MCAS: autonomic balance (HRV, a calm stress response), mast cell support (stability, DAO and HNMT cofactors), and ECM preservation (support for a healthy MMP balance, LOX/copper-dependent cross-linking, antioxidant protection of existing collagen).

**Page:** ${BASE}/the-how
**Brand:** ZebraThrive
**Author:** Ken Chapman, Founder of ZebraThrive
**Last reviewed:** ${updatedFor("/the-how")}

## Core thesis

ZebraThrive is a collagen-protection brand, not a collagen-building brand. Adding more collagen does not address how quickly existing collagen is broken down. The formula focuses on supporting a healthy balance of matrix metalloproteinases (MMPs, the enzymes that break collagen down), lysyl oxidase (LOX) and copper-dependent cross-linking for the quality of new collagen, and normal mast cell stability. This is structure/function support; the product is not intended to diagnose, treat, cure, or prevent any disease.

## AM capsules

Three Size 1 clear HPMC capsules per serving, 90 per bottle (30 servings). Contents: nicotinamide riboside (250 mg), pine bark extract (130 mg), grape seed extract (100 mg), benfotiamine (150 mg), niacinamide (50 mg), P5P (50 mg), R5P (25 mg), zinc carnosine (37.5 mg), chromium picolinate (200 mcg), methylfolate as (6S)-5-MTHF calcium salt (800 mcg), manganese bisglycinate (4 mg elemental), copper bisglycinate (2 mg elemental), vitamin K2 as synthetic all-trans MK-7 (100 mcg), vegan vitamin D3 from lichen (50 mcg, 2,000 IU), and methylcobalamin (1,000 mcg). Focus: B-vitamin and methylation cofactors, energy metabolism, and collagen cross-linking cofactors.

## PM capsules

Three Size 1 white HPMC capsules per serving (titanium-dioxide-free), 90 per bottle (30 servings). Contents: nicotinamide riboside (250 mg), pine bark extract (70 mg), grape seed extract (70 mg), L-theanine (200 mg), zinc carnosine (37.5 mg), astaxanthin as a 5% cracked-cell beadlet (4 mg), calcium pantothenate (5 mg), boron glycinate (2 mg elemental), molybdenum glycinate (150 mcg), synthetic L-selenomethionine (100 mcg), and D-biotin (300 mcg). Focus: a calm evening stress response, antioxidant and ECM support, and trace minerals.

## Daily Powder

Unflavored, about 7.7 g per day taken as two one-scoop servings (AM and PM), 60 servings per jar (30-day supply). Contents: magnesium bisglycinate (2,400 mg, about 300 mg elemental), sodium ascorbate (1,686 mg, about 1,500 mg vitamin C), taurine (1,500 mg), ultramicronized PEA (1,200 mg), Quercefit quercetin phytosome (300 mg), chlorogenic acid from decaffeinated green coffee bean (200 mg), and luteolin from Sophora japonica (140 mg). These are the gram-scale ingredients that would need too many capsules.

## Why three parts

Some ingredients fit better at different times of day, and gram-scale ingredients would need too many capsules. Splitting the formula keeps the capsule count to three per serving, which matters for people with gastroparesis or slow gastric transit, and the powder can be started at a fraction of a scoop for sensitive users.

## Regulatory framing

${FDA_DISCLAIMER}
`,
    },
    {
      path: "our-promise.md",
      content: `# Our Promise: ZebraThrive's Constitution

> ZebraThrive's formal commitment to the Zebra community: full ingredient transparency, documented ingredient decisions, COA-based testing, and accountability when we get something wrong.

**Page:** ${BASE}/our-promise
**Brand:** ZebraThrive
**Author:** Ken Chapman, Founder of ZebraThrive
**Last updated:** ${updatedFor("/our-promise")}

## Commitments

1. **Ingredient transparency.** Every ingredient page lists exact form, dose, scientific name, mechanism, and primary-literature citations. No proprietary blends. No hidden excipients.
2. **Documented decisions.** Each ingredient page explains why it is in the formula, the forms we considered, and the human studies we relied on.
3. **Testing.** Raw materials are qualified by Certificate of Analysis against our specifications, and every production lot is checked by our cGMP manufacturer for identity, potency, heavy metals, and microbial limits.
4. **Patient-first formulation.** Excipients are screened against mast-cell triggers known in the MCAS literature.
5. **No disease claims.** All statements are DSHEA structure/function claims, not treatment or cure claims.
6. **Accountability.** When we change a formulation, we publish the change and the reason.

## Regulatory framing

${FDA_DISCLAIMER}
`,
    },
    {
      path: "preorder.md",
      content: `# ZebraThrive Preorder

> Reserve your spot in line for the ZebraThrive three-part system: AM capsules, PM capsules, and Daily Powder. Pre-launch reservation list, no charge until launch.

**Page:** ${BASE}/preorder
**Brand:** ZebraThrive
**Author:** Ken Chapman, Founder of ZebraThrive
**Last reviewed:** ${updatedFor("/preorder")}

## Product

ZebraThrive is a three-part supplement system: AM capsules (3 Size 1 HPMC capsules per serving, 90 count), PM capsules (3 Size 1 white HPMC capsules per serving, 90 count), and a Daily Powder (about 7.7 g per day in two scoops). It is formulated for adults living with hypermobile Ehlers-Danlos Syndrome, POTS, or MCAS, with structure/function support for autonomic balance, mast cell stability, and connective tissue, and strict excipient exclusions. It is not intended to diagnose, treat, cure, or prevent any disease.

## How preorder works

Join the reservation list with your email. When manufacturing is complete you will be notified before the public launch and given first access to inventory. No charge at reservation.

## Regulatory framing

${FDA_DISCLAIMER}
`,
    },
    {
      path: "contact.md",
      content: `# Contact ZebraThrive

> Support, partnerships, press, and formulation feedback. Two-business-day response window.

**Page:** ${BASE}/contact
**Email:** ken@wellnessforzebras.com
**Brand:** ZebraThrive
**Author:** Ken Chapman, Founder of ZebraThrive
**Last updated:** ${updatedFor("/contact")}

## How to reach us

For product questions, formulation feedback, partnership inquiries, or press, email ken@wellnessforzebras.com. We respond within two business days.
`,
    },
  ];
  return pages.map((p) => ({ path: p.path, content: scrubEmDashes(p.content) }));
}

function llmsRoutesIndex(): string {
  const lines: string[] = [];
  lines.push("# LLM Markdown route index");
  lines.push("");
  lines.push("Every page on wellnessforzebras.com has a token-efficient Markdown companion at <path>.md. Use these when fetching content for AI-assisted research; they exclude navigation, scripts, and styling.");
  lines.push("");
  lines.push("## Core pages");
  for (const p of ["the-how", "our-promise", "excipients", "preorder", "contact", "ingredients"]) {
    lines.push(`- ${BASE}/${p}.md`);
  }
  lines.push("");
  lines.push("## Ingredient pages");
  for (const r of ingredientList as Array<{ slug: string }>) {
    lines.push(`- ${BASE}/ingredients/${r.slug}.md`);
  }
  lines.push("");
  return lines.join("\n");
}

// /llms.txt and /llms-full.txt are generated here from the same data as the
// HTML pages, so they cannot drift (2026-11-01 audit G18; a hand-kept
// llms-full.txt went stale once already). Curated header and footer text
// lives in scripts/llms/*.md; edit those, not dist output.
// Note: no AI vendor documents reading llms.txt and Google ignores it; the
// files are kept for any assistant that does fetch them, served noindex.
const LLMS_DIR = resolve(__dirname, "llms");
const readTpl = (f: string) => readFileSync(resolve(LLMS_DIR, f), "utf8").trimEnd();

function llmsTxt(): string {
  const out: string[] = [readTpl("llms-header.md"), "", "## Ingredient deep dives", ""];
  for (const r of ingredientList as Array<{ slug: string; display_name: string }>) {
    const ing = (ingredients as Record<string, IngredientData>)[r.slug];
    if (!ing) continue;
    // BLUF capsule (carries the page's headline facts), then form and dose.
    const lead = (ing.bluf || ing.atAGlance?.whatItIs || "").trim().replace(/\.$/, "");
    const form = ing.whyThisForm?.form?.trim().replace(/\.$/, "") ?? "";
    const dose = ing.atAGlance?.dose?.trim().replace(/\.$/, "") ?? "";
    const parts = [lead, form && `Form: ${form}`, dose && `Dose: ${dose}`].filter(Boolean);
    out.push(`- [${r.display_name}](${BASE}/ingredients/${r.slug}.md): ${parts.join(". ")}.`);
  }
  out.push("", readTpl("llms-footer.md"), "");
  return scrubEmDashes(out.join("\n"));
}

function llmsFullTxt(ingredientMds: string[]): string {
  const out: string[] = [readTpl("llms-full-header.md"), ""];
  for (const md of ingredientMds) {
    // Demote each page's H1 to H2 so the file has one H1.
    out.push("---", "", md.replace(/^# /m, "## ").trimEnd(), "");
  }
  out.push("---", "", readTpl("llms-full-footer.md"), "");
  return scrubEmDashes(out.join("\n"));
}

function main() {
  mkdirSync(resolve(OUT_ROOT, "ingredients"), { recursive: true });

  let count = 0;
  const ingredientMds: string[] = [];

  // Per-ingredient .md
  for (const r of ingredientList as Array<{ slug: string; display_name: string }>) {
    const ing = (ingredients as Record<string, IngredientData>)[r.slug];
    if (!ing) {
      console.warn(`[md] no data for ${r.slug}`);
      continue;
    }
    const md = ingredientMarkdown(r.slug, ing);
    writeFileSync(resolve(OUT_ROOT, "ingredients", `${r.slug}.md`), md);
    ingredientMds.push(md);
    count++;
  }

  // Ingredients index
  writeFileSync(resolve(OUT_ROOT, "ingredients.md"), ingredientsIndexMarkdown());

  // Core pages
  for (const page of corePagesMarkdown()) {
    writeFileSync(resolve(OUT_ROOT, page.path), page.content);
  }

  // Discovery indexes for AI assistants
  writeFileSync(resolve(OUT_ROOT, "llms-routes.txt"), llmsRoutesIndex());
  writeFileSync(resolve(OUT_ROOT, "llms.txt"), llmsTxt());
  writeFileSync(resolve(OUT_ROOT, "llms-full.txt"), llmsFullTxt(ingredientMds));

  console.log(`[md] wrote ${count} ingredient .md files + 6 core + 1 index + llms-routes.txt + llms.txt + llms-full.txt`);
}

main();
