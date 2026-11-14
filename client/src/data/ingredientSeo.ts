/* client/src/data/ingredientSeo.ts
 *
 * Hand-written <title> and meta description per ingredient page.
 * Replaces the auto-built description that truncated mid-word with "..."
 * on 17 of 29 pages (2026-11-01 SEO/GEO gap audit, G9/G10).
 *
 * Rules:
 *   - title: under ~65 characters including " | ZebraThrive".
 *   - description: 130-158 characters, no truncation, unique per page.
 *   - No condition names (EDS, POTS, MCAS) and no treat/cure/prevent wording:
 *     these strings show in search results without the page's context and
 *     disclaimers. Condition copy stays on the page, pending attorney review.
 *   - No em or en dashes (brand voice).
 *   - If dose, form, or product placement changes in ingredients.ts, update
 *     the matching line here in the same commit.
 */

export type IngredientSeo = { title: string; description: string };

export const INGREDIENT_SEO: Record<string, IngredientSeo> = {
  "palmitoylethanolamide": {
    title: "Palmitoylethanolamide (PEA): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Micronized PEA at 1,200 mg a day in the ZebraThrive Daily Powder: how it works, what is known about particle size, the human trial evidence, and safety.",
  },
  "luteolin": {
    title: "Luteolin Supplement: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Luteolin at 140 mg a day from Sophora japonica in the ZebraThrive Daily Powder: what it is, what lab and human studies show, form choice, and safety.",
  },
  "magnesium-bisglycinate": {
    title: "Magnesium Bisglycinate (Glycinate): Dose, Evidence | ZebraThrive",
    description:
      "Magnesium bisglycinate at about 300 mg elemental magnesium a day: why this form, absorption and gut tolerance, how chelate identity is checked, the evidence, and safety.",
  },
  "taurine": {
    title: "Taurine Supplement: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Taurine at 1,500 mg a day in the ZebraThrive Daily Powder: what this amino acid does, why synthetic non-fermented sourcing, the evidence, and safety.",
  },
  "vitamin-c": {
    title: "Buffered Vitamin C (Sodium Ascorbate): Evidence | ZebraThrive",
    description:
      "Buffered sodium ascorbate providing about 1,500 mg vitamin C a day: its role in collagen formation, why this form, the evidence, and interactions.",
  },
  "nicotinamide-riboside": {
    title: "Nicotinamide Riboside (NR): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Nicotinamide riboside (NR) at 500 mg a day, split AM and PM: how it raises NAD+, how each batch is checked, the evidence, and safety notes.",
  },
  "pine-bark-extract": {
    title: "Pine Bark Extract (OPCs): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Pine bark extract standardized to 65 to 75% OPCs at 200 mg a day: what procyanidins are, how the extract is checked, what the evidence does and does not show, and safety notes.",
  },
  "grape-seed-extract": {
    title: "Grape Seed Extract (OPCs): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Grape seed extract at 95%+ OPCs, 170 mg a day: how it complements pine bark, what the evidence shows, sourcing, and safety notes.",
  },
  "quercetin-phytosome": {
    title: "Quercetin Phytosome (Quercefit): Dose, Evidence | ZebraThrive",
    description:
      "Quercefit quercetin phytosome at 300 mg a day: why plain quercetin absorbs poorly, the human absorption data for this form, the evidence, and safety.",
  },
  "chlorogenic-acid": {
    title: "Chlorogenic Acid (Green Coffee): Dose, Evidence | ZebraThrive",
    description:
      "Chlorogenic acids at 200 mg a day from green coffee bean extract (444 mg): what they do, the evidence, caffeine content, and safety notes.",
  },
  "l-theanine": {
    title: "L-Theanine: Dose, Evidence and Safety | ZebraThrive",
    description:
      "L-theanine at 200 mg in the ZebraThrive PM capsule: what small human studies show for relaxation and sleep, how it works, the purity spec, and safety notes.",
  },
  "zinc-carnosine": {
    title: "Zinc Carnosine: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Zinc carnosine at 75 mg a day, split AM and PM: the small human studies on the gut lining, the zinc L-carnosine complex, copper balance and safety, and medication timing.",
  },
  "astaxanthin": {
    title: "Astaxanthin: Dose, Form, Evidence and Safety | ZebraThrive",
    description:
      "Natural astaxanthin at 4 mg in the PM capsule from an algae beadlet: what it is, what human studies of other forms show and their limits, the isomer spec, and how to take it.",
  },
  "benfotiamine": {
    title: "Benfotiamine (Vitamin B1): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Benfotiamine, a fat-soluble vitamin B1, at 150 mg a day: why it absorbs better than thiamine, its role in energy production, evidence, and safety.",
  },
  "niacinamide": {
    title: "Niacinamide (Vitamin B3): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Niacinamide (vitamin B3) in the ZebraThrive AM capsule: why the non-flushing form, why the dose is kept low, the evidence, and safety. The daily amount will be shown here once it is final.",
  },
  "p5p": {
    title: "P5P (Active Vitamin B6): Dose, Evidence, Safety | ZebraThrive",
    description:
      "P5P, the coenzyme form of vitamin B6, in the ZebraThrive AM capsule: why this form, how the dose relates to the B6 upper limit, what the evidence shows, and safety. The AM capsule provides 3 to 4 mg of vitamin B6 (final amount being set).",
  },
  "r5p": {
    title: "R5P (Active Vitamin B2): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Riboflavin at 18.3 mg a day as riboflavin 5'-phosphate (R5P) in the ZebraThrive AM capsule: what this form is, its cofactor roles, the evidence, and safety.",
  },
  "methylfolate": {
    title: "Methylfolate (5-MTHF): Dose, Form, Evidence | ZebraThrive",
    description:
      "L-methylfolate as (6S)-5-MTHF calcium salt at 800 mcg a day: why not folic acid or the glucosamine salt, the MTHFR context, evidence, and safety.",
  },
  "vitamin-b12": {
    title: "Methylcobalamin (Vitamin B12): Dose, Evidence | ZebraThrive",
    description:
      "Methylcobalamin (vitamin B12) at 1,000 mcg in the ZebraThrive AM capsule: why the methyl form, what deficiency studies show, evidence, and safety.",
  },
  "vitamin-d3": {
    title: "Vegan Vitamin D3 from Lichen: Dose, Evidence | ZebraThrive",
    description:
      "Vegan vitamin D3 from lichen at 2,000 IU a day, paired with K2: what it does, what the studies show and their limits, sourcing, and safety notes.",
  },
  "vitamin-k2": {
    title: "Vitamin K2 (MK-7): Dose, Evidence and Safety | ZebraThrive",
    description:
      "Vitamin K2 as all-trans MK-7 at 100 mcg a day, not natto or soy derived: how it pairs with D3 to route calcium, the evidence, and safety notes.",
  },
  "copper-bisglycinate": {
    title: "Copper Bisglycinate (Glycinate): Dose, Evidence | ZebraThrive",
    description:
      "Copper bisglycinate at 2 mg elemental copper a day: its role as the lysyl oxidase cofactor for collagen cross-linking, the evidence, and safety.",
  },
  "manganese-bisglycinate": {
    title: "Manganese Bisglycinate: Dose, Evidence, Safety | ZebraThrive",
    description:
      "Manganese bisglycinate at 4 mg elemental a day: its cofactor roles in connective tissue and antioxidant enzymes, copper balance, evidence, and safety.",
  },
  "chromium": {
    title: "Chromium Picolinate: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Chromium picolinate at 200 mcg in the ZebraThrive AM capsule: what it is, what the evidence does and does not show, and safety notes.",
  },
  "selenium": {
    title: "Selenium (Selenomethionine): Dose, Evidence | ZebraThrive",
    description:
      "Selenium as synthetic L-selenomethionine at 100 mcg a day, not selenium yeast: its antioxidant and thyroid cofactor roles, evidence, and safety.",
  },
  "pantothenic-acid": {
    title: "Pantothenic Acid (Vitamin B5): Dose, Evidence | ZebraThrive",
    description:
      "Pantothenic acid (vitamin B5) as calcium pantothenate at 5 mg a day: its role in coenzyme A and energy production, the evidence, and safety notes.",
  },
  "biotin": {
    title: "Biotin (Vitamin B7): Dose, Evidence and Safety | ZebraThrive",
    description:
      "Biotin (vitamin B7) at 300 mcg in the ZebraThrive PM capsule: its role as a cofactor for energy-producing enzymes, the form, evidence, and safety.",
  },
  "boron": {
    title: "Boron Glycinate: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Boron glycinate at 2 mg elemental boron a day: what boron is, what the limited human research shows, and safety.",
  },
  "molybdenum": {
    title: "Molybdenum Glycinate: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Molybdenum glycinate at 150 mcg a day: its role in the enzyme that processes sulfites, the evidence, and safety notes.",
  },
};
