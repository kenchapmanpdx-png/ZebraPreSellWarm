/* client/src/data/clusterHubs.ts
 *
 * Cluster hub pages (SEO/GEO audit A13 items 2 and 3; keyword master v3
 * section 10, priorities 6 and 7). Each hub indexes the ingredient pages for
 * one topic and shows each ingredient's existing plain-language paragraph for
 * that topic (triadPlain in ingredients.ts). The hubs add no efficacy claims
 * of their own: only the framing copy in this file is new.
 *
 * DRAFT GATE: each hub has its own `published` flag, false until the attorney
 * pass on condition wording (owner item L3) clears that hub. While false the
 * hub is built but served noindex, left out of the sitemap, and not linked
 * from the footer. To publish one: set its flag to true and bump its dates in
 * pageDates.ts in the same commit.
 *
 * Grouping is editorial: it follows what each ingredient page says about its
 * own evidence (direct data, cofactor role, or indirect). It is not a ranking
 * of how well anything works. If an ingredient is added to or removed from
 * ingredients.ts, add or remove its id here in the same commit (the build
 * check in ClusterHubPage logs any id that is missing or listed twice).
 *
 * No em or en dashes (brand voice).
 */

export type HubGroup = { heading: string; note: string; ids: string[] };

export type ClusterHub = {
  published: boolean;
  path: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  bluf: string;
  intro: string;
  limits: string;
  triadKey: "mcas" | "heds" | "pots";
  groups: HubGroup[];
  faq: { q: string; a: string }[];
};

const EXCIPIENT_FAQ_ITEM = {
  q: "Why do inactive ingredients matter here?",
  a: "A supplement can carry the right active ingredient and still include excipients that some people do not tolerate. The ZebraThrive excipients page lists what the formula leaves out and what it uses instead.",
};

export const CLUSTER_HUBS: ClusterHub[] = [
  {
    published: false,
    path: "/natural-mast-cell-stabilizers",
    crumb: "Natural mast cell stabilizers",
    eyebrow: "Evidence index",
    h1: "Natural mast cell stabilizers: what the supplement evidence shows",
    title: "Natural Mast Cell Stabilizers: The Evidence | ZebraThrive",
    description:
      "Which supplement ingredients have mast cell research, what kind of study it comes from, and where it stops. Every ZebraThrive ingredient, sorted by role.",
    bluf:
      "No supplement is an approved mast cell stabilizer. That term belongs to medicines such as cromolyn. Several nutrients and plant compounds do have mast cell research, mostly from cell and animal studies, with few human trials. This page sorts every ZebraThrive ingredient by how direct that research is and links to the full evidence for each.",
    intro:
      "Lists of natural mast cell stabilizers usually come with no doses and no sources. Each entry below gives the dose in the ZebraThrive system and what that ingredient's own evidence page says about mast cells, in plain language. The entries are grouped by how direct the mast cell research is, not by how well anything works.",
    limits:
      "None of these ingredients is approved to diagnose, treat, cure, or prevent any disease. A result in a cell dish or an animal does not show the same effect in a person, and doses used in studies often differ from the doses listed here. Each ingredient page lists the studies behind it with PubMed IDs, and most state where the evidence is thin. Talk with your clinician before adding anything, especially if you take prescription medication.",
    triadKey: "mcas",
    groups: [
      {
        heading: "Ingredients with direct mast cell research",
        note:
          "Studies on these ingredients measured mast cells themselves: degranulation, histamine release, or mast cell signaling. Most of that work is in cell and animal models.",
        ids: [
          "palmitoylethanolamide",
          "luteolin",
          "quercetin-phytosome",
          "chlorogenic-acid",
          "taurine",
          "astaxanthin",
          "zinc-carnosine",
          "nicotinamide-riboside",
          "pine-bark-extract",
          "grape-seed-extract",
          "vitamin-d3",
          "vitamin-k2",
        ],
      },
      {
        heading: "Histamine clearance cofactors",
        note:
          "These nutrients are cofactors for the enzymes and pathways that break down histamine (DAO, HNMT, methylation) or clear sulfites. They act on what mast cells release, not on the mast cell itself.",
        ids: ["vitamin-c", "copper-bisglycinate", "p5p", "methylfolate", "vitamin-b12", "r5p", "molybdenum"],
      },
      {
        heading: "Indirect and foundational roles",
        note:
          "These ingredients are in the formula for other reasons. Their evidence pages describe an indirect link to mast cell activity, or say plainly that there is none.",
        ids: [
          "magnesium-bisglycinate",
          "benfotiamine",
          "niacinamide",
          "manganese-bisglycinate",
          "selenium",
          "boron",
          "l-theanine",
          "chromium",
          "biotin",
          "pantothenic-acid",
        ],
      },
    ],
    faq: [
      {
        q: "Is any supplement an approved mast cell stabilizer?",
        a: "No. Mast cell stabilizer is a drug class that includes medicines such as cromolyn sodium. No dietary supplement is approved for that use, and nothing on this page is intended to diagnose, treat, cure, or prevent any disease. The ingredients here have research on mast cell activity, most of it in cells and animals.",
      },
      {
        q: "Does a result in a lab study mean it works in people?",
        a: "Not on its own. Cell and animal studies show that a mechanism exists. They do not show the size of any effect in a person, and the concentrations used in a dish are sometimes higher than a supplement can reach in the blood. Each ingredient page states what kind of study each finding comes from.",
      },
      {
        q: "Does ZebraThrive contain DAO?",
        a: "No. DAO supplements address histamine intolerance from low DAO enzyme activity, which is a different problem from mast cell activation. Most DAO products are also made from pork kidney. The formula does include copper and vitamin C, listed under histamine clearance cofactors above.",
      },
      EXCIPIENT_FAQ_ITEM,
    ],
  },
  {
    published: false,
    path: "/supplements-for-hypermobility",
    crumb: "Supplements for hypermobility",
    eyebrow: "Evidence index",
    h1: "Supplements for hypermobility: what the evidence shows",
    title: "Supplements for Hypermobility: The Evidence | ZebraThrive",
    description:
      "What research says about nutrients and connective tissue in hypermobility and Ehlers-Danlos syndromes: collagen cofactors, matrix enzymes, and the limits.",
    bluf:
      "No supplement corrects joint hypermobility or changes how connective tissue is built. Research does describe nutrients that collagen formation depends on, and compounds that affect the enzymes that break collagen down, mostly in cell and animal studies. This page sorts every ZebraThrive ingredient by its connective tissue role and links to the full evidence for each.",
    intro:
      "Lists of supplements for hypermobility rarely say what each one is supposed to do or how strong the evidence is. Each entry below gives the dose in the ZebraThrive system and what that ingredient's own evidence page says about connective tissue in hypermobile Ehlers-Danlos syndrome (hEDS) and hypermobility spectrum disorder, in plain language. The entries are grouped by role, not by how well anything works.",
    limits:
      "None of these ingredients is approved to diagnose, treat, cure, or prevent any disease. Very little of this research was done in people with hypermobility: most comes from cells, animals, or other groups of people, and doses used in studies often differ from the doses listed here. Each ingredient page lists the studies behind it with PubMed IDs, and most state where the evidence is thin. Talk with your clinician before adding anything, especially if you take prescription medication.",
    triadKey: "heds",
    groups: [
      {
        heading: "Collagen formation and cross-linking cofactors",
        note: "Nutrients that the enzymes building and cross-linking collagen require.",
        ids: ["vitamin-c", "copper-bisglycinate", "manganese-bisglycinate"],
      },
      {
        heading: "Homocysteine and methylation pathway",
        note:
          "B vitamins that run the folate and homocysteine pathways. Their evidence pages explain the proposed link to collagen cross-linking and the MTHFR variants reported in hypermobile groups.",
        ids: ["p5p", "methylfolate", "vitamin-b12", "r5p"],
      },
      {
        heading: "Ingredients with matrix enzyme (MMP) research",
        note:
          "Matrix metalloproteinases (MMPs) are enzymes that break down collagen. Studies on these ingredients measured MMPs or related markers, mostly in cells and animals, with a few human trials in other groups of people.",
        ids: [
          "pine-bark-extract",
          "taurine",
          "astaxanthin",
          "grape-seed-extract",
          "quercetin-phytosome",
          "chlorogenic-acid",
          "luteolin",
          "magnesium-bisglycinate",
          "nicotinamide-riboside",
        ],
      },
      {
        heading: "Bone, tendon, and joint support",
        note: "Nutrients studied for bone mineralization, tendon repair, or joint support.",
        ids: ["vitamin-d3", "vitamin-k2", "boron"],
      },
      {
        heading: "Indirect and foundational roles",
        note:
          "These ingredients are in the formula for other reasons. Their evidence pages describe an indirect link to connective tissue, or say plainly that there is none.",
        ids: [
          "palmitoylethanolamide",
          "zinc-carnosine",
          "niacinamide",
          "benfotiamine",
          "selenium",
          "molybdenum",
          "l-theanine",
          "chromium",
          "biotin",
          "pantothenic-acid",
        ],
      },
    ],
    faq: [
      {
        q: "Can supplements fix hypermobility?",
        a: "No. Joint hypermobility reflects how connective tissue is built, and no supplement changes that. Nothing on this page is intended to diagnose, treat, cure, or prevent any disease. The research here concerns nutrients that collagen formation requires and compounds studied for their effect on the enzymes that break collagen down.",
      },
      {
        q: "Was this research done in people with hypermobility?",
        a: "Mostly not. Most studies were done in cells, animals, or people without a hypermobility diagnosis. Each ingredient page states what kind of study each finding comes from.",
      },
      EXCIPIENT_FAQ_ITEM,
    ],
  },
  {
    published: false,
    path: "/supplements-for-pots",
    crumb: "Supplements for POTS",
    eyebrow: "Evidence index",
    h1: "Supplements for POTS: what the evidence shows",
    title: "Supplements for POTS: The Evidence | ZebraThrive",
    description:
      "What research says about nutrients and POTS: circulation, energy production and nervous system cofactors, where each study was done, and the limits.",
    bluf:
      "No supplement treats postural orthostatic tachycardia syndrome (POTS). Research does describe nutrients studied for circulation, energy production, and the nervous system, but mostly in people without POTS, in animals, or in cells. This page sorts every ZebraThrive ingredient by the role its evidence page describes and links to the full evidence for each.",
    intro:
      "Lists of supplements for POTS rarely say what each one is supposed to do or where the evidence comes from. Each entry below gives the dose in the ZebraThrive system and what that ingredient's own evidence page says about POTS, in plain language. The entries are grouped by role, not by how well anything works.",
    limits:
      "None of these ingredients is approved to diagnose, treat, cure, or prevent any disease. Very little of this research was done in people with POTS: most comes from other groups of people, animals, or cells, and doses used in studies often differ from the doses listed here. If you take medication for POTS, such as a beta-blocker or ivabradine, check the interactions section on each ingredient page and talk with your clinician before adding anything.",
    triadKey: "pots",
    groups: [
      {
        heading: "Ingredients with circulation or POTS-specific research",
        note:
          "Studies on these ingredients measured circulation outcomes such as leg swelling, venous return, heart rate variability, or blood vessel function, or looked at POTS directly. Most were done in people without POTS.",
        ids: ["magnesium-bisglycinate", "pine-bark-extract", "grape-seed-extract", "taurine", "vitamin-c", "vitamin-d3"],
      },
      {
        heading: "Energy production and blood sugar",
        note:
          "Nutrients involved in mitochondrial energy production and steady blood sugar. Their evidence pages relate these to the fatigue and post-meal symptoms that often accompany POTS.",
        ids: [
          "benfotiamine",
          "nicotinamide-riboside",
          "niacinamide",
          "r5p",
          "manganese-bisglycinate",
          "chromium",
          "biotin",
        ],
      },
      {
        heading: "Autonomic nervous system and neurotransmitters",
        note:
          "Cofactors for making and clearing the neurotransmitters involved in autonomic signaling, plus L-theanine, which acts on the nervous system directly.",
        ids: ["l-theanine", "p5p", "methylfolate", "vitamin-b12", "pantothenic-acid"],
      },
      {
        heading: "Indirect and foundational roles",
        note:
          "These ingredients are in the formula for other reasons. Their evidence pages describe an indirect link to POTS, or say plainly that there is little.",
        ids: [
          "palmitoylethanolamide",
          "luteolin",
          "quercetin-phytosome",
          "astaxanthin",
          "zinc-carnosine",
          "chlorogenic-acid",
          "vitamin-k2",
          "copper-bisglycinate",
          "molybdenum",
          "selenium",
          "boron",
        ],
      },
    ],
    faq: [
      {
        q: "Can supplements treat POTS?",
        a: "No. No supplement is approved to treat POTS, and nothing on this page is intended to diagnose, treat, cure, or prevent any disease. The research here concerns nutrients studied for circulation, energy production, and nervous system function, mostly in people without POTS.",
      },
      {
        q: "Is this an electrolyte or salt supplement?",
        a: "No. ZebraThrive is a capsule and powder system of vitamins, minerals, and plant compounds, not an electrolyte drink mix. Fluid and salt intake for POTS is something to set with your clinician.",
      },
      EXCIPIENT_FAQ_ITEM,
    ],
  },
];

export function hubForPath(path: string): ClusterHub | undefined {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return CLUSTER_HUBS.find((h) => h.path === clean);
}
