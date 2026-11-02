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
      "Ultramicronized PEA at 1,200 mg a day in the ZebraThrive Daily Powder: how it works, why particle size matters, the human trial evidence, and safety.",
  },
  "luteolin": {
    title: "Luteolin Supplement: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Luteolin at 140 mg a day from Sophora japonica in the ZebraThrive Daily Powder: what it is, what lab and human studies show, form choice, and safety.",
  },
  "magnesium-bisglycinate": {
    title: "Magnesium Bisglycinate: Dose, Evidence, Safety | ZebraThrive",
    description:
      "Magnesium bisglycinate, a true chelate, at about 300 mg elemental magnesium a day: why this form, absorption and gut tolerance, evidence, and safety.",
  },
  "taurine": {
    title: "Taurine Supplement: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Taurine at 1,500 mg a day in the ZebraThrive Daily Powder: what this amino acid does, why synthetic non-fermented sourcing, the evidence, and safety.",
  },
  "vitamin-c": {
    title: "Vitamin C (Sodium Ascorbate): Dose and Evidence | ZebraThrive",
    description:
      "Buffered sodium ascorbate providing about 1,500 mg vitamin C a day: its role in collagen formation, why this form, the evidence, and interactions.",
  },
  "nicotinamide-riboside": {
    title: "Nicotinamide Riboside (NR): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Nicotinamide riboside (NR) at 500 mg a day, split AM and PM: how it raises NAD+, why NR chloride was chosen over NMN, the evidence, and safety notes.",
  },
  "pine-bark-extract": {
    title: "Pine Bark Extract (OPCs): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Pine bark extract standardized to 65-75% OPCs at 200 mg a day: what procyanidins do, how the extract is verified, the evidence, and safety notes.",
  },
  "grape-seed-extract": {
    title: "Grape Seed Extract (OPCs): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Non-fermented grape seed extract at 95%+ OPCs, 170 mg a day: how it complements pine bark, what the evidence shows, sourcing, and safety notes.",
  },
  "quercetin-phytosome": {
    title: "Quercetin Phytosome (Quercefit): Dose, Evidence | ZebraThrive",
    description:
      "Quercefit quercetin phytosome at 300 mg a day: why plain quercetin absorbs poorly, the human absorption data for this form, the evidence, and safety.",
  },
  "chlorogenic-acid": {
    title: "Chlorogenic Acid (Green Coffee): Dose, Evidence | ZebraThrive",
    description:
      "Chlorogenic acid at 200 mg a day from decaffeinated green coffee bean extract, caffeine under 0.1%: what it does, the evidence, and safety notes.",
  },
  "l-theanine": {
    title: "L-Theanine: Dose, Evidence and Safety | ZebraThrive",
    description:
      "L-theanine at 200 mg in the ZebraThrive PM capsule: calm without sedation, how it works, the human evidence, the purity spec, and safety notes.",
  },
  "zinc-carnosine": {
    title: "Zinc Carnosine: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Zinc carnosine at 75 mg a day, split AM and PM: the human evidence on gut lining support, the 1:1 chelate form, safety, and medication timing.",
  },
  "astaxanthin": {
    title: "Astaxanthin: Dose, Form, Evidence and Safety | ZebraThrive",
    description:
      "Natural astaxanthin at 4 mg in the PM capsule from a cracked-cell algae beadlet: its antioxidant role, the isomer spec, evidence, and how to take it.",
  },
  "benfotiamine": {
    title: "Benfotiamine (Vitamin B1): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Benfotiamine, a fat-soluble vitamin B1, at 150 mg a day: why it absorbs better than thiamine, its role in energy production, evidence, and safety.",
  },
  "niacinamide": {
    title: "Niacinamide (Vitamin B3): Dose, Evidence, Safety | ZebraThrive",
    description:
      "Niacinamide (vitamin B3) at 50 mg in the ZebraThrive AM capsule: why the non-flushing form, why the dose is capped low, the evidence, and safety.",
  },
  "p5p": {
    title: "P5P (Active Vitamin B6): Dose, Evidence, Safety | ZebraThrive",
    description:
      "P5P, the active coenzyme form of vitamin B6, at 50 mg (31.9 mg B6) a day: why this form, the B6 upper limit, what the evidence shows, and safety.",
  },
  "r5p": {
    title: "R5P (Active Vitamin B2): Dose, Evidence, Safety | ZebraThrive",
    description:
      "R5P, the activated form of vitamin B2, at 25 mg in the ZebraThrive AM capsule: why it skips the conversion step, its cofactor roles, evidence, safety.",
  },
  "methylfolate": {
    title: "Methylfolate (5-MTHF): Dose, Form, Evidence | ZebraThrive",
    description:
      "Methylfolate as (6S)-5-MTHF calcium salt at 800 mcg a day: why not folic acid or the glucosamine salt, the MTHFR context, evidence, and safety.",
  },
  "vitamin-b12": {
    title: "Methylcobalamin (Vitamin B12): Dose, Evidence | ZebraThrive",
    description:
      "Methylcobalamin (vitamin B12) at 1,000 mcg in the ZebraThrive AM capsule: why the methyl form, what deficiency studies show, evidence, and safety.",
  },
  "vitamin-d3": {
    title: "Vitamin D3 (Vegan, Lichen): Dose, Evidence | ZebraThrive",
    description:
      "Vegan vitamin D3 from lichen at 2,000 IU a day, paired with K2: what it does, what the studies show and their limits, sourcing, and safety notes.",
  },
  "vitamin-k2": {
    title: "Vitamin K2 (MK-7): Dose, Evidence and Safety | ZebraThrive",
    description:
      "Vitamin K2 as all-trans MK-7 at 100 mcg a day, not natto or soy derived: how it pairs with D3 to route calcium, the evidence, and safety notes.",
  },
  "copper-bisglycinate": {
    title: "Copper Bisglycinate: Dose, Evidence and Safety | ZebraThrive",
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
      "Chromium picolinate at 200 mcg in the ZebraThrive AM capsule: its role in insulin response and steady blood sugar, the evidence, and safety notes.",
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
      "Boron glycinate at 2 mg elemental boron a day: its roles in bone metabolism and in vitamin D and magnesium use, what the evidence shows, and safety.",
  },
  "molybdenum": {
    title: "Molybdenum Glycinate: Dose, Evidence and Safety | ZebraThrive",
    description:
      "Molybdenum glycinate at 150 mcg a day: its role in the enzymes that clear sulfites, why most multivitamins skip it, the evidence, and safety notes.",
  },
};
