export interface IngredientInfo {
  name: string;
  dosage: string;
  description: string;
  benefits?: string[];
  timing?: string;
  researchNotes?: string;
  sourcing?: string; // "Generic OK", "Preferred: Albion TRAACS", "Mandatory: Quercefit® (Indena)"
}

// v7.8 AM CAPSULES (15 ingredients) — Size 0 HPMC clear, 3 caps/serving, 90ct bottle
export const amFormulaIngredients: IngredientInfo[] = [
  { name: "Nicotinamide Riboside", dosage: "250 mg", description: "NR Chloride ≥99% purity; NAD+ precursor for cellular energy and mast cell stabilization", sourcing: "Generic OK" },
  { name: "Pine Bark Extract", dosage: "130 mg", description: "65–75% OPCs (HPLC); multi-species pine. Supports MMP inhibition and collagen protection", sourcing: "Generic OK" },
  { name: "Grape Seed Extract", dosage: "100 mg", description: "≥95% OPCs (DMAC); Vitis vinifera, non-fermented. Synergistic OPC source with Pine Bark", sourcing: "Generic OK" },
  { name: "Benfotiamine (B1)", dosage: "150 mg", description: "Fat-soluble B1 with 5× bioavailability; supports nerve health and autonomic function", sourcing: "Generic OK" },
  { name: "Niacinamide (B3)", dosage: "50 mg", description: "Flush-free NAD+ precursor at conservative dose to avoid histamine elevation", sourcing: "Generic OK" },
  { name: "Vitamin B6 (P5P)", dosage: "50 mg", description: "Active pyridoxal-5-phosphate form; cofactor for DAO histamine degradation and neurotransmitter synthesis", sourcing: "Generic OK" },
  { name: "Vitamin B2 (R5P)", dosage: "25 mg", description: "Active riboflavin-5-phosphate; FAD cofactor for mitochondrial electron transport", sourcing: "Generic OK" },
  { name: "Zinc Carnosine", dosage: "37.5 mg", description: "GI mucosal healing compound; reduces gut permeability", sourcing: "Generic OK" },
  { name: "Chromium", dosage: "200 mcg", description: "Chromium picolinate; supports glucose metabolism and energy regulation", sourcing: "Generic OK" },
  { name: "Methylfolate (5-MTHF)", dosage: "800 mcg", description: "(6S)-5-MTHF active folate; bypasses MTHFR polymorphisms common in hEDS", sourcing: "Generic OK" },
  { name: "Manganese Bisglycinate", dosage: "4 mg elem", description: "SOD2 antioxidant enzyme cofactor; supports glycosyltransferase function", sourcing: "Preferred: Albion TRAACS" },
  { name: "Copper Bisglycinate", dosage: "2 mg elem", description: "Essential lysyl oxidase cofactor for collagen cross-linking; separated from zinc by formulation timing", sourcing: "Preferred: Albion TRAACS" },
  { name: "Vitamin K2 (MK-7)", dosage: "100 mcg", description: "Activates osteocalcin for bone health; synergistic with D3. ⚠️ Contraindicated with warfarin", sourcing: "Generic OK" },
  { name: "Vitamin D3", dosage: "50 mcg", description: "Supports mast cell stabilization and immune modulation; paired with K2", sourcing: "Generic OK" },
  { name: "Vitamin B12 (Methylcobalamin)", dosage: "1000 mcg", description: "Active methylated form supporting methylation pathways and neurological function", sourcing: "Generic OK" }
];

// v7.8 PM CAPSULES (11 ingredients) — Size 0 HPMC white (TiO₂-free, CaCO₃ opacifier), 3 caps/serving, 90ct bottle
export const pmFormulaIngredients: IngredientInfo[] = [
  { name: "Nicotinamide Riboside", dosage: "250 mg", description: "Evening dose maintains stable NAD+ elevation due to short 2.7-hour half-life", sourcing: "Generic OK" },
  { name: "Pine Bark Extract", dosage: "70 mg", description: "Evening dose provides sustained MMP inhibition", sourcing: "Generic OK" },
  { name: "Grape Seed Extract", dosage: "70 mg", description: "Synergistic OPC source with Pine Bark; supports vascular and connective tissue integrity", sourcing: "Generic OK" },
  { name: "L-Theanine", dosage: "200 mg", description: "≥98% L-isomer; promotes calm relaxation without drowsiness via GABA-A modulation", sourcing: "Generic OK" },
  { name: "Zinc Carnosine", dosage: "37.5 mg", description: "GI mucosal healing; reduces gut permeability", sourcing: "Generic OK" },
  { name: "Astaxanthin", dosage: "4 mg active", description: "H. pluvialis 4% extract; All-E >60%, 9-cis ≤17.3%. Powerful antioxidant with MMP inhibition", sourcing: "Generic OK" },
  { name: "Pantothenic Acid (B5)", dosage: "5 mg", description: "Calcium pantothenate; supports Coenzyme A synthesis for Krebs cycle energy metabolism", sourcing: "Generic OK" },
  { name: "Boron Glycinate", dosage: "2 mg elem", description: "Supports bone metabolism and proper mineral utilization", sourcing: "Generic OK" },
  { name: "Molybdenum Glycinate", dosage: "150 mcg", description: "Sulfite oxidase cofactor supporting detoxification pathways", sourcing: "Generic OK" },
  { name: "Selenium (Selenomethionine)", dosage: "100 mcg", description: "Glutathione peroxidase cofactor; thyroid function support", sourcing: "Generic OK" },
  { name: "Biotin (B7)", dosage: "300 mcg", description: "Carboxylase cofactor supporting energy metabolism", sourcing: "Generic OK" }
];

// v7.8 DAILY POWDER (7 ingredients) — HDPE tub with scoop, 30 servings split AM+PM
export const powderIngredients: IngredientInfo[] = [
  { name: "Magnesium Bisglycinate", dosage: "2400 mg (300 mg elem)", description: "MCAS-safe chelated form; supports muscle relaxation, DAO cofactor function, and autonomic stability", sourcing: "Preferred: Albion TRAACS" },
  { name: "Vitamin C (Sodium Ascorbate)", dosage: "1686 mg (delivers 1500 mg vitamin C)", description: "Essential collagen synthesis cofactor; non-acidic form; provides sodium beneficial for POTS", sourcing: "Generic OK" },
  { name: "Taurine", dosage: "1500 mg", description: "Synthetic non-fermentation source; MMP-9 transcriptional suppression, mast cell stabilization, GABA-A modulation", sourcing: "Generic OK" },
  { name: "PEA (Ultramicronized)", dosage: "1200 mg", description: "≤10µm D90 particle size, ≥99% purity, synthetic. CB2/PPAR-α agonist for mast cell stabilization and chronic pain", sourcing: "Generic OK" },
  { name: "Quercetin Phytosome (Quercefit®)", dosage: "300 mg", description: "20× higher bioavailability than standard quercetin; sustained mast cell stabilization and antioxidant support", sourcing: "Mandatory: Quercefit® (Indena)" },
  { name: "Chlorogenic Acid", dosage: "200 mg CGA", description: "Green coffee bean ≥45% CGA, decaf preferred; mitochondrial and metabolic support", sourcing: "Generic OK" },
  { name: "Luteolin (Micronized)", dosage: "140 mg", description: "≤25µm particle size; plant flavonoid with potent mast cell stabilization", sourcing: "Generic OK" }
];

// Global excipient rules — v7.8
export const formulationStandards = {
  capsuleShell: "HPMC (vegan)",
  amCapsule: "Clear",
  pmCapsule: "White; CaCO₃ opacifier; TiO₂-free confirmed on COA",
  capsuleFlowAgents: "Rice hull concentrate + L-leucine",
  powderFlowAgent: "Rice hull concentrate",
  prohibited: [
    "Magnesium stearate",
    "Titanium dioxide",
    "FD&C dyes / artificial colors",
    "Citric acid",
    "Carrageenan",
    "Gelatin",
    "Artificial flavors / sweeteners",
    "Corn-derived ingredients",
    "Soy-derived ingredients"
  ]
};
