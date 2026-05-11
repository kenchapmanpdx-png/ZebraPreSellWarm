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
 *   dist/public/ingredients/{slug}.md   — per-ingredient deep markdown
 *   dist/public/the-how.md              — core page markdown
 *   dist/public/ingredients.md          — index of all ingredient pages
 *   dist/public/our-promise.md          — core page markdown
 *   etc.
 *
 * Vercel serves .md files with Content-Type: text/markdown automatically.
 * The vercel.json rewrite rule excludes paths with "." so these are served
 * as static files, not rewritten to the SPA shell.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { ingredients } from "../client/src/data/ingredients.ts";
import type { IngredientData } from "../client/src/data/ingredients.ts";
import ingredientList from "./ingredient-routes.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = resolve(__dirname, "../dist/public");
const BASE = "https://www.wellnessforzebras.com";
const LAST_REVIEWED = "2026-05-11";
const FDA_DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.";

function scrubEmDashes(s: string): string {
  return s.replace(/—/g, "-").replace(/–/g, "-");
}

function ingredientMarkdown(slug: string, ing: IngredientData): string {
  const url = `${BASE}/ingredients/${slug}`;
  const name = ing.name;
  const out: string[] = [];

  // BLUF answer capsule (40-60 word target per §5 of master GEO doc).
  out.push(`# ${name}`);
  out.push("");
  if (ing.patientSummary) {
    out.push(`> ${ing.patientSummary}`);
  } else if (ing.atAGlance?.whyWeIncludeIt) {
    out.push(`> ${ing.atAGlance.whatItIs}. ${ing.atAGlance.whyWeIncludeIt}.`);
  }
  out.push("");
  out.push(`**Page:** ${url}`);
  out.push(`**Brand:** ZebraWell`);
  out.push(`**Author:** Ken Chapman, Founder of ZebraWell`);
  out.push(`**Last reviewed:** ${LAST_REVIEWED}`);
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

  if (ing.research?.length) {
    out.push("## Evidence summary");
    out.push("");
    for (const block of ing.research) {
      out.push(`### ${block.outcome}`);
      out.push("");
      out.push(block.summary);
      out.push("");
      for (const s of block.studies) {
        const pmid = s.pmid ? ` PMID: ${s.pmid}` : "";
        const design = s.design ? ` Design: ${s.design}.` : "";
        out.push(`- **${s.source}.**${design} Finding: ${s.finding}.${pmid}`);
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

  if (ing.sources?.length) {
    out.push("## References");
    out.push("");
    let n = 1;
    for (const s of ing.sources) {
      const bits: string[] = [];
      if (s.authors) bits.push(s.authors);
      if (s.year) bits.push(`(${s.year})`);
      if (s.title) bits.push(s.title);
      let line = `${n}. ${bits.join(". ")}`;
      if (s.pmid) line += `. PMID: ${s.pmid}. https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`;
      else if (s.link) line += `. ${s.link}`;
      out.push(line);
      n++;
    }
    out.push("");
  }

  return scrubEmDashes(out.join("\n"));
}

function ingredientsIndexMarkdown(): string {
  const out: string[] = [];
  out.push("# ZebraWell Ingredients");
  out.push("");
  out.push("> Every ingredient in ZebraWell's AM and PM formulas with doses, mechanisms, evidence, and the reasoning for inclusion in a hEDS/POTS/MCAS protocol. Each ingredient links to a full markdown summary with PMID citations.");
  out.push("");
  out.push(`**Brand:** ZebraWell. **Last reviewed:** ${LAST_REVIEWED}.`);
  out.push("");
  out.push("## Ingredients");
  out.push("");
  for (const r of ingredientList as Array<{ slug: string; display_name: string }>) {
    const ing = (ingredients as Record<string, IngredientData>)[r.slug];
    const summary =
      ing?.atAGlance?.whatItIs?.replace(/—|–/g, "-").trim() ||
      "";
    const dose = ing?.atAGlance?.dose ? ` Dose: ${ing.atAGlance.dose}.` : "";
    out.push(`- [${r.display_name}](${BASE}/ingredients/${r.slug}.md): ${summary}${dose}`);
  }
  out.push("");
  out.push(`**Regulatory framing:** ${FDA_DISCLAIMER}`);
  out.push("");
  return scrubEmDashes(out.join("\n"));
}

function corePagesMarkdown(): Array<{ path: string; content: string }> {
  // Each entry: path inside dist/public, file content.
  const pages = [
    {
      path: "the-how.md",
      content: `# The How: ZebraWell's Clinical Trinity

> ZebraWell's AM and PM formulas address the specific biology of hEDS, POTS, and MCAS through three pillars: autonomic stability (HRV, sympathetic dampening), mast cell modulation (stabilization, DAO support, histamine clearance), and ECM preservation (MMP inhibition, LOX/copper-driven crosslinking, antioxidant protection of existing collagen).

**Page:** ${BASE}/the-how
**Brand:** ZebraWell
**Author:** Ken Chapman, Founder of ZebraWell
**Last reviewed:** ${LAST_REVIEWED}

## Core thesis

ZebraWell is a collagen-protection brand, not a collagen-building brand. In hypermobile Ehlers-Danlos Syndrome the underlying defect is structural and genetic; pumping more collagen into a body that cannot crosslink it correctly does not fix the problem. The biology that ZebraWell targets is upstream of structure: matrix metalloproteinase (MMP) inhibition to slow collagen breakdown, lysyl oxidase (LOX) and copper-dependent crosslinking to improve the quality of new collagen, and mast-cell stabilization to lower the chronic inflammatory load that drives MMP upregulation in the first place.

## The AM formula

AM targets autonomic stability and daytime function. The dominant levers are heart-rate-variability (HRV) support, sympathetic dampening, and energy/cognitive support so the user can stand up, work, and tolerate stimulus.

## The PM formula

PM targets recovery, mast-cell calming, and ECM repair. The dominant levers are parasympathetic recovery, glycine and magnesium for sleep architecture, and ingredients with overnight tissue-repair signaling.

## Why split AM and PM

Some ingredients work against each other in a single bottle: stimulating polyphenols belong in the morning, glycine and magnesium belong before bed. Splitting also keeps the per-dose capsule count low enough to be tolerable for patients with gastroparesis or slow gastric transit, which is common in this population.

## Regulatory framing

${FDA_DISCLAIMER}
`,
    },
    {
      path: "our-promise.md",
      content: `# Our Promise: ZebraWell's Constitution

> ZebraWell's formal commitment to the Zebra community: full ingredient transparency, decision logs, third-party testing posture, and accountability when we get something wrong.

**Page:** ${BASE}/our-promise
**Brand:** ZebraWell
**Author:** Ken Chapman, Founder of ZebraWell
**Last reviewed:** ${LAST_REVIEWED}

## Commitments

1. **Ingredient transparency.** Every ingredient page lists exact form, dose, scientific name, mechanism, and primary-literature citations. No proprietary blends. No hidden excipients.
2. **Decision logs.** We publish why each ingredient is in the formula, including the alternatives we considered and rejected, and the human studies we relied on.
3. **Third-party testing posture.** Every batch tested by a third-party lab for identity, potency, heavy metals, and microbial contamination.
4. **Patient-first formulation.** Excipients are screened against mast-cell triggers known in the MCAS literature.
5. **No disease claims.** All statements are DSHEA structure/function claims, not treatment or cure claims.
6. **Accountability.** When we change a formulation, we publish the change and the reason.

## Regulatory framing

${FDA_DISCLAIMER}
`,
    },
    {
      path: "preorder.md",
      content: `# ZebraWell Preorder

> Reserve your spot in line for the ZebraWell AM and PM Clinical Trinity. Pre-launch reservation list, no charge until launch.

**Page:** ${BASE}/preorder
**Brand:** ZebraWell
**Author:** Ken Chapman, Founder of ZebraWell
**Last reviewed:** ${LAST_REVIEWED}

## Product

ZebraWell AM and PM Clinical Trinity is a paired supplement system providing autonomic, mast cell, and connective-tissue support for adults with hypermobile Ehlers-Danlos Syndrome, POTS, or MCAS.

## How preorder works

Join the reservation list with your email. When manufacturing is complete you will be notified before the public launch and given first access to inventory. No charge at reservation.

## Regulatory framing

${FDA_DISCLAIMER}
`,
    },
    {
      path: "contact.md",
      content: `# Contact ZebraWell

> Support, partnerships, press, and formulation feedback. Two-business-day response window.

**Page:** ${BASE}/contact
**Email:** ken@wellnessforzebras.com
**Brand:** ZebraWell
**Author:** Ken Chapman, Founder of ZebraWell
**Last reviewed:** ${LAST_REVIEWED}

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
  for (const p of ["the-how", "our-promise", "preorder", "contact", "ingredients"]) {
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

function main() {
  mkdirSync(resolve(OUT_ROOT, "ingredients"), { recursive: true });

  let count = 0;

  // Per-ingredient .md
  for (const r of ingredientList as Array<{ slug: string; display_name: string }>) {
    const ing = (ingredients as Record<string, IngredientData>)[r.slug];
    if (!ing) {
      console.warn(`[md] no data for ${r.slug}`);
      continue;
    }
    const md = ingredientMarkdown(r.slug, ing);
    writeFileSync(resolve(OUT_ROOT, "ingredients", `${r.slug}.md`), md);
    count++;
  }

  // Ingredients index
  writeFileSync(resolve(OUT_ROOT, "ingredients.md"), ingredientsIndexMarkdown());

  // Core pages
  for (const page of corePagesMarkdown()) {
    writeFileSync(resolve(OUT_ROOT, page.path), page.content);
  }

  // Discovery index for AI assistants
  writeFileSync(resolve(OUT_ROOT, "llms-routes.txt"), llmsRoutesIndex());

  console.log(`[md] wrote ${count} ingredient .md files + 5 core + 1 index + llms-routes.txt`);
}

main();
