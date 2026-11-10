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
  "Excipients are the inactive ingredients packed around the active: fillers, binders, coatings, flow agents, colorants and flavors. They are chosen for manufacturing convenience, not for your gut. ZebraThrive leaves out the eight excipients our community reports reacting to most, lists the handful it does use, and discloses the carriers that arrive with raw materials.";

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
      "Commercial citric acid is produced almost entirely by Aspergillus niger fermentation, usually on a corn-derived sugar substrate, not extracted from citrus. It is the single excipient our community reports reacting to most often, and the fermentation source is the usual explanation given. Non-fermented pharmaceutical citric acid is not available at supplement scale, so citrate mineral forms (magnesium citrate, trisodium citrate) are out as well.",
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
      "A lubricant and flow agent that keeps powder moving through capsule-filling and tableting machines. Present in most capsules and tablets, usually under 1 percent of the fill.",
    whyExcluded:
      "It is a manufacturing convenience with no nutritional role, and it is one of the excipients our community most often names when a magnesium or multivitamin product \"never agreed with\" them. If a magnesium supplement has never sat well, it is worth asking whether it was the magnesium or the magnesium stearate.",
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
      "Animal and cell studies have linked degraded carrageenan to intestinal inflammation; whether food-grade carrageenan does the same in people is debated. Our community reports GI reactions to it, and a capsule-and-powder formula has no use for a thickener, so it is out.",
    instead: "Not used anywhere in the system. Capsule shells are HPMC without carrageenan.",
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
      "Color has no function in a supplement. Yellow No. 5 is the one additive the FDA requires to be declared by name on labels because it causes allergic-type reactions in some people, and our community reports reactions to synthetic dyes more broadly, including dyes in antihistamine tablets.",
    instead: "No colorants. Clear AM capsules, calcium-carbonate-white PM capsules, unflavored and uncolored powder.",
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
      "Soy is one of the major food allergens the FDA requires to be declared, and it is a common reported trigger in our community. It also hides in places people do not expect, such as the lecithin inside a phytosome or the tocopherols protecting an oil.",
    instead:
      "The quercetin phytosome is made with sunflower lecithin. There are no softgels, so no soybean oil.",
    links: [{ label: "Quercetin phytosome", href: "/ingredients/quercetin-phytosome" }],
  },
];

export const USED_EXCIPIENTS: Array<{ role: string; excipient: string; where: string }> = [
  { role: "Capsule shell", excipient: "HPMC (hypromellose), plant-derived", where: "AM and PM capsules" },
  { role: "Opacifier and filler", excipient: "Calcium carbonate", where: "PM capsules (white shell and about 20 mg of fill a day)" },
  { role: "Filler", excipient: "Microcrystalline cellulose", where: "AM capsules (about 29 mg a day, added by our manufacturer)" },
  { role: "Flow agent", excipient: "Rice hull concentrate", where: "AM and PM capsules" },
  { role: "Lubricant", excipient: "L-leucine", where: "AM and PM capsules" },
  { role: "Emulsifier", excipient: "Sunflower lecithin", where: "Quercetin phytosome, Daily Powder" },
];

export const CARRIERS: Array<{ carrier: string; arrivesWith: string; amount: string; href?: string }> = [
  { carrier: "Maltodextrin", arrivesWith: "Vitamin D3 (lichen)", amount: "about 17 mg a day; source unconfirmed", href: "/ingredients/vitamin-d3" },
  { carrier: "Microcrystalline cellulose", arrivesWith: "Vitamin K2 (MK-7)", amount: "about 10 mg a day", href: "/ingredients/vitamin-k2" },
  { carrier: "Sunflower lecithin", arrivesWith: "Quercetin phytosome", amount: "part of the phytosome complex", href: "/ingredients/quercetin-phytosome" },
  { carrier: "Maltodextrin", arrivesWith: "Quercetin phytosome", amount: "part of the phytosome complex; amount and source being confirmed", href: "/ingredients/quercetin-phytosome" },
  { carrier: "Dicalcium phosphate", arrivesWith: "Biotin", amount: "about 31 mg a day; identity being confirmed", href: "/ingredients/biotin" },
  { carrier: "Maltodextrin and silica", arrivesWith: "Molybdenum glycinate", amount: "under 6 mg a day; source being confirmed", href: "/ingredients/molybdenum" },
  { carrier: "Silica", arrivesWith: "Taurine", amount: "up to 7.5 mg a day", href: "/ingredients/taurine" },
  { carrier: "Being confirmed", arrivesWith: "Astaxanthin beadlet, selenium premix, boron glycinate", amount: "listed before launch", href: "/ingredients/astaxanthin" },
];

export const CARRIERS_NOTE =
  "Some vitamins and actives arrive from the raw-material supplier already on a carrier. These are not ingredients we add, but they are in the bottle, so they are listed. Corn and wheat derivatives are not on the excluded list until the maltodextrin sources are confirmed.";

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
    a: "The formula is made without dairy, soy, gelatin, magnesium stearate, titanium dioxide, citric acid, carrageenan and artificial dyes. Corn and wheat are not yet on the excluded list: small amounts of maltodextrin arrive with the vitamin D3, the quercetin phytosome and the molybdenum, and their sources are unconfirmed. We will say so plainly until they are.",
  },
  {
    q: "Why list carriers of 10 or 20 milligrams?",
    a: "Because reactions in this community do not scale neatly with milligrams. A carrier you react to matters at 10 mg. Listing every carrier lets you make the call with the full picture instead of trusting a \"clean label\" claim.",
  },
  {
    q: "Are the capsules vegetarian?",
    a: "Yes. Every capsule shell is HPMC (hypromellose), a plant-derived cellulose, with calcium carbonate as the only opacifier on the PM capsules.",
  },
];
