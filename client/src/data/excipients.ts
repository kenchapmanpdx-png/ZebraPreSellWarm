/* client/src/data/excipients.ts
 *
 * Content for /excipients (the excipient hub) and its Markdown companion.
 * One source so the page, the .md file and llms.txt cannot drift.
 *
 * Scope rule: every statement here is either (a) already published on this
 * site (homepage exclusions block, /our-promise, ingredient pages), (b) a
 * plainly verifiable regulatory or manufacturing fact, or (c) framed as what
 * the community reports. No treatment or disease claims.
 */

export type ExcludedExcipient = {
  slug: string;
  name: string;
  question: string; // H3, question form
  whatItIs: string;
  whyExcluded: string;
  instead: string;
  links?: Array<{ label: string; href: string }>;
};

export const EXCIPIENTS_INTRO =
  "Excipients are the inactive ingredients packed around the active: fillers, binders, coatings, flow agents, colorants and flavors. Excipients are chosen mainly to make manufacturing work, not to suit a sensitive gut. ZebraThrive leaves out eight excipients that people in our community often say they avoid, lists the ones it does use, and lists the carriers that arrive with raw materials as each one is confirmed.";

export const EXCIPIENT_DEFINITION =
  "An excipient is any ingredient in a supplement that is not there for its own effect: it carries, binds, lubricates, colors, flavors, preserves or encapsulates the actives. In a capsule the fill may be only a few percent excipient; a flavored powder or gummy can be mostly excipient. The label lists them under \"Other ingredients\".";

export const EXCLUDED_EXCIPIENTS: ExcludedExcipient[] = [
  {
    slug: "citric-acid",
    name: "Citric acid",
    question: "Why does ZebraThrive leave out citric acid?",
    whatItIs:
      "An acidulant used for tartness, flavor balance and preservation in powders, drink mixes, gummies and some capsule fills. It is not vitamin C.",
    whyExcluded:
      "Most commercial citric acid is made by fermentation with the mold Aspergillus niger on sugar feedstocks, which can include corn, rather than extracted from citrus. It is one of the excipients our community most often says it avoids, and its fermentation source is the usual reason given. Citric acid made without fermentation is not commercially available at supplement scale, so we also avoid citrate mineral forms such as magnesium citrate and trisodium citrate.",
    instead:
      "No acidulant in the Daily Powder. Vitamin C is supplied as sodium ascorbate, and magnesium as bisglycinate rather than citrate.",
    links: [
      { label: "Vitamin C (sodium ascorbate)", href: "/ingredients/vitamin-c" },
      { label: "Magnesium bisglycinate", href: "/ingredients/magnesium-bisglycinate" },
    ],
  },
  {
    slug: "magnesium-stearate",
    name: "Magnesium stearate",
    question: "Why does ZebraThrive leave out magnesium stearate?",
    whatItIs:
      "A lubricant and flow agent that keeps powder moving through capsule-filling and tableting machines. It is common in capsules and tablets, where it makes up a small share of the fill.",
    whyExcluded:
      "It is a manufacturing aid with no nutritional role, and it is one of the excipients our community names most often. If a magnesium supplement has not agreed with you, the form, the dose and the other ingredients can all play a part, so it helps to check the full ingredient list.",
    instead:
      "Rice hull concentrate and L-leucine do the same job in the capsule lines.",
    links: [{ label: "Magnesium bisglycinate", href: "/ingredients/magnesium-bisglycinate" }],
  },
  {
    slug: "titanium-dioxide",
    name: "Titanium dioxide",
    question: "Why does ZebraThrive leave out titanium dioxide?",
    whatItIs:
      "A white pigment used to make capsule shells and tablet coatings opaque. Its only job is appearance.",
    whyExcluded:
      "In 2021 the European Food Safety Authority concluded titanium dioxide could no longer be considered safe as a food additive, and the EU removed it (E171) from the permitted list in 2022. It adds nothing to a formula, so there is no trade-off in leaving it out.",
    instead:
      "AM capsules are clear. PM capsules are whitened with calcium carbonate instead.",
  },
  {
    slug: "carrageenan",
    name: "Carrageenan",
    question: "Why does ZebraThrive leave out carrageenan?",
    whatItIs:
      "A seaweed-derived thickener and gelling agent used in liquids, softgels and some vegetarian capsule shells.",
    whyExcluded:
      "Lab and animal studies have linked carrageenan to gut inflammation, and one small trial in people with a bowel condition reported earlier flares; the human evidence is limited and still debated. Some in our community report gut reactions to it, and a capsule-and-powder formula does not need a thickener, so we do not add it.",
    instead: "We do not add carrageenan anywhere in the system, and we are confirming with our capsule supplier that the shells are made without it. Capsule shells are HPMC, and we are confirming that the shell supplier uses no carrageenan as a gelling aid.",
  },
  {
    slug: "gelatin",
    name: "Gelatin",
    question: "Why does ZebraThrive leave out gelatin?",
    whatItIs:
      "The standard capsule shell material, made from bovine or porcine collagen.",
    whyExcluded:
      "Some of our community avoid animal-derived products; others report reacting to gelatin capsules specifically. A plant-based shell removes both concerns without changing what is inside the capsule.",
    instead: "Every capsule is HPMC (hypromellose), a plant-derived cellulose shell.",
  },
  {
    slug: "fdc-dyes",
    name: "FD&C dyes",
    question: "Why does ZebraThrive leave out FD&C dyes?",
    whatItIs:
      "Synthetic colorants such as FD&C Yellow No. 5 (tartrazine) and Red No. 40, used for appearance only.",
    whyExcluded:
      "Color adds nothing to how a supplement works. FDA requires certified color additives, including Yellow No. 5, to be declared by name on food labels, and our community reports reactions to synthetic dyes more broadly.",
    instead: "No dyes or added colors; the PM shells are whitened with calcium carbonate. Clear AM capsules, calcium-carbonate-white PM capsules, unflavored and uncolored powder.",
  },
  {
    slug: "artificial-flavors",
    name: "Artificial flavors",
    question: "Why does ZebraThrive leave out artificial flavors?",
    whatItIs:
      "Synthetic flavor systems used to mask bitterness in powders, gummies and chewables. Their components are rarely listed.",
    whyExcluded:
      "An unspecified flavor system cannot be checked against anyone's trigger list. Capsules need no flavor, and we chose to keep the Daily Powder unflavored rather than add a flavor whose contents we could not disclose.",
    instead: "Unflavored Daily Powder; no flavor system in any SKU.",
  },
  {
    slug: "soy-derivatives",
    name: "Soy derivatives",
    question: "Why does ZebraThrive leave out soy derivatives?",
    whatItIs:
      "Soy lecithin (emulsifier), soybean oil (softgel fill) and soy-derived mixed tocopherols (vitamin E used as an antioxidant stabilizer).",
    whyExcluded:
      "Soy is one of the major food allergens that must be declared on US labels, and many people in our community avoid it. It also hides in places people do not expect, such as the lecithin inside a phytosome or the tocopherols protecting an oil.",
    instead:
      "The quercetin phytosome is made with sunflower lecithin. There are no softgels, so no soybean oil.",
    links: [{ label: "Quercetin phytosome", href: "/ingredients/quercetin-phytosome" }],
  },
];

export const USED_EXCIPIENTS: Array<{ role: string; excipient: string; where: string }> = [
  { role: "Capsule shell", excipient: "HPMC (hypromellose), plant-derived", where: "AM and PM capsules" },
  { role: "Opacifier and filler", excipient: "Calcium carbonate", where: "PM capsules (white shell and about 20 mg of fill a day)" },
  { role: "Filler", excipient: "Microcrystalline cellulose", where: "AM capsules (about 29 mg a day, added by our manufacturer)" },
  { role: "Flow agent", excipient: "Rice hull concentrate", where: "AM and PM capsules, and the Daily Powder" },
  { role: "Lubricant", excipient: "L-leucine", where: "AM and PM capsules" },
  { role: "Emulsifier", excipient: "Sunflower lecithin", where: "Quercetin phytosome, Daily Powder" },
];

export const CARRIERS: Array<{ carrier: string; arrivesWith: string; amount: string; href?: string }> = [
  { carrier: "Maltodextrin", arrivesWith: "Vitamin D3 (lichen)", amount: "about 18 mg a day; source unconfirmed", href: "/ingredients/vitamin-d3" },
  { carrier: "Microcrystalline cellulose", arrivesWith: "Vitamin K2 (MK-7)", amount: "about 10 mg a day", href: "/ingredients/vitamin-k2" },
  { carrier: "Sunflower lecithin", arrivesWith: "Quercetin phytosome", amount: "part of the phytosome complex", href: "/ingredients/quercetin-phytosome" },
  { carrier: "Maltodextrin", arrivesWith: "Quercetin phytosome", amount: "part of the phytosome complex; amount and source being confirmed", href: "/ingredients/quercetin-phytosome" },
  { carrier: "Dicalcium phosphate", arrivesWith: "Biotin", amount: "about 31 mg a day; identity being confirmed", href: "/ingredients/biotin" },
  { carrier: "Maltodextrin and silica", arrivesWith: "Molybdenum glycinate", amount: "under 6 mg a day; source being confirmed", href: "/ingredients/molybdenum" },
  { carrier: "Silica", arrivesWith: "Taurine", amount: "up to 7.5 mg a day", href: "/ingredients/taurine" },
  { carrier: "Being confirmed", arrivesWith: "Astaxanthin beadlet, selenium premix, boron glycinate, capsule shell gelling aid, and the antioxidants in the vitamin D3", amount: "listed before launch", href: "/ingredients/astaxanthin" },
];

export const CARRIERS_NOTE =
  "Some vitamins and actives arrive from the raw-material supplier already on a carrier. These are not ingredients we add, but they are in the bottle, so we list each one as its identity is confirmed, including the trace antioxidants that protect the vitamin D3. Corn and wheat derivatives are not on the excluded list until the maltodextrin sources are confirmed.";

export const LABEL_CHECKS: string[] = [
  "Read the \"Other ingredients\" line, not just the Supplement Facts panel.",
  "Powders, gummies and chewables: look for citric acid, natural or artificial flavors, and colors.",
  "Capsules: \"gelatin\" versus \"hypromellose\" or \"vegetable capsule\"; \"titanium dioxide\" or \"color added\" on white shells.",
  "Softgels: the fill oil (often soybean) and the antioxidant (mixed tocopherols, often soy-derived).",
  "\"Lecithin\" without a source is usually soy. Sunflower lecithin is normally named as such.",
  "Flow agents: magnesium stearate, stearic acid and silicon dioxide are the common ones.",
];

export const EXCIPIENT_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Is citric acid the same as vitamin C?",
    a: "No. Vitamin C is ascorbic acid, or a mineral ascorbate such as sodium ascorbate. Citric acid is a different molecule used for tartness and preservation. A product can contain citric acid and no vitamin C, or vitamin C and no citric acid. ZebraThrive's vitamin C is buffered sodium ascorbate.",
  },
  {
    q: "Does ZebraThrive contain gluten, dairy, soy or corn?",
    a: "The formula is made without added gelatin, magnesium stearate, titanium dioxide, artificial dyes, citric acid or soy, and we are confirming with suppliers that no raw-material carrier contains citric acid, soy, dairy or carrageenan. We will update this answer as each confirmation comes in. Corn and wheat are not yet on the excluded list: small amounts of maltodextrin arrive with the vitamin D3, the quercetin phytosome and the molybdenum, and their sources are unconfirmed. We will say so plainly until they are.",
  },
  {
    q: "Why list carriers of 10 or 20 milligrams?",
    a: "Because some people in this community report reactions to very small amounts. A carrier you react to matters at 10 mg. Listing each carrier as it is confirmed lets you make the call with the full picture instead of trusting a 'clean label' claim.",
  },
  {
    q: "Are the capsules vegetarian?",
    a: "Yes. Every capsule shell is HPMC (hypromellose), a plant-derived cellulose, and the PM shells use calcium carbonate instead of titanium dioxide to make them white.",
  },
];
