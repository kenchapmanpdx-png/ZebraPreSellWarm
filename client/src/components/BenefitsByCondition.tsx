/* client/src/components/BenefitsByCondition.tsx
 *
 * "Benefits by condition" explorer. Goal: a visitor with only ONE of the three
 * conditions sees how much of the 29-ingredient system is already working for
 * them, so they never feel the product is "only for people with all three."
 *
 * Honesty model (from Ingredient_Benefit_Framing_v7.8): a weighted three-tier
 * hierarchy, never a 29x3 grid of equal checkmarks.
 *   PRIMARY    -> targets this condition directly (prominent cards)
 *   SUPPORTING -> indirect / secondary role (subordinate rows)
 *   GENERAL    -> whole-body nutrient, explicitly NOT condition-specific
 *                 (summarized + muted name chips, no condition claim)
 *   omit       -> no defensible link, not shown for that condition
 *
 * DRAFT: condition-specific lines are structure-function copy pending PMID
 * substantiation + attorney review (see the review doc). Audit corrections
 * already applied: NR/MCAS kept general; P5P/MCAS DAO downgraded to supporting;
 * Taurine/hEDS MMP-9 line softened.
 */
import { useState } from 'react';
import { Link } from 'wouter';
import { ingredients } from '@/data/ingredients';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Tier = 'P' | 'S' | 'G';
type Info = { tier: Tier; line?: string };
type Ingredient = {
  slug: string;
  name: string;
  pots?: Info;
  mcas?: Info;
  heds?: Info;
};

type CondKey = 'pots' | 'mcas' | 'heds';

const CONDITIONS: { key: CondKey; label: string; full: string }[] = [
  { key: 'pots', label: 'POTS', full: 'POTS and Dysautonomia' },
  { key: 'mcas', label: 'MCAS', full: 'MCAS and Histamine Sensitivity' },
  { key: 'heds', label: 'hEDS', full: 'hEDS and Hypermobility' },
];

const INGREDIENTS: Ingredient[] = [
  {
    slug: 'palmitoylethanolamide', name: 'PEA',
    mcas: { tier: 'P', line: 'A molecule your body makes to calm mast cells. We provide more.' },
    heds: { tier: 'S', line: 'Helps calm the mast-cell-driven inflammation that can accelerate connective tissue breakdown.' },
    pots: { tier: 'S', line: 'Supports a calmer neuroinflammatory baseline, studied in relation to pain and brain fog.' },
  },
  {
    slug: 'luteolin', name: 'Luteolin',
    mcas: { tier: 'P', line: 'One of the most potent natural mast cell stabilizers studied.' },
    heds: { tier: 'S', line: 'Helps limit ADAMTS enzyme activity that degrades the cushioning proteins in connective tissue.' },
    pots: { tier: 'S', line: 'Crosses into brain tissue and calms microglial activation, studied in relation to cognitive symptoms.' },
  },
  {
    slug: 'magnesium-bisglycinate', name: 'Magnesium Bisglycinate',
    pots: { tier: 'P', line: 'Supports nerve and muscle function and a calm autonomic baseline.' },
    heds: { tier: 'S', line: 'Supports muscle and connective tissue function and eases cramping.' },
    mcas: { tier: 'S', line: 'A calmer nervous system means fewer stress-driven flares.' },
  },
  {
    slug: 'taurine', name: 'Taurine',
    pots: { tier: 'P', line: 'Supports cardiac rhythm, autonomic balance, and acts as an osmolyte.' },
    heds: { tier: 'S', line: 'Cellular osmolyte and antioxidant support for connective tissue under stress.' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'vitamin-c', name: 'Vitamin C',
    heds: { tier: 'P', line: 'The cofactor your body requires to build strong collagen.' },
    mcas: { tier: 'P', line: 'Helps the body break down histamine.' },
    pots: { tier: 'S', line: 'A cofactor in norepinephrine synthesis, part of normal blood pressure regulation.' },
  },
  {
    slug: 'nicotinamide-riboside', name: 'Nicotinamide Riboside',
    heds: { tier: 'S', line: 'Fibroblasts need robust NAD+ for the energy-intensive work of building tissue.' },
    pots: { tier: 'S', line: 'Supports cellular energy, with human data on arterial function.' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'pine-bark-extract', name: 'Pine Bark Extract',
    heds: { tier: 'S', line: 'OPCs that help protect connective tissue from enzymatic breakdown.' },
    pots: { tier: 'S', line: 'Studied for venous tone and microcirculation in related vascular conditions.' },
    mcas: { tier: 'S', line: 'Some evidence for calming histamine release.' },
  },
  {
    slug: 'grape-seed-extract', name: 'Grape Seed Extract',
    heds: { tier: 'S', line: 'Procyanidins that support connective tissue protection.' },
    pots: { tier: 'S', line: 'Vascular and venous tone support, from related-condition evidence.' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'quercetin-phytosome', name: 'Quercetin Phytosome',
    mcas: { tier: 'P', line: 'A classic mast cell stabilizer in an absorbable phytosome form.' },
    heds: { tier: 'S', line: 'Anti-inflammatory support that helps limit enzyme-driven tissue stress.' },
    pots: { tier: 'S', line: 'Vascular anti-inflammatory protection.' },
  },
  {
    slug: 'chlorogenic-acid', name: 'Chlorogenic Acid',
    heds: { tier: 'S', line: 'Polyphenol support for connective tissue protection.' },
    pots: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'l-theanine', name: 'L-Theanine',
    pots: { tier: 'P', line: 'Supports parasympathetic tone against sympathetic overdrive.' },
    mcas: { tier: 'S', line: 'Reduces the anxiety that can set off flares.' },
    heds: { tier: 'G' },
  },
  {
    slug: 'zinc-carnosine', name: 'Zinc Carnosine',
    heds: { tier: 'S', line: 'Supports wound healing and the gut barrier behind nutrient absorption.' },
    mcas: { tier: 'S', line: 'Supports gut barrier integrity relevant to sensitivity.' },
    pots: { tier: 'G' },
  },
  {
    slug: 'astaxanthin', name: 'Astaxanthin',
    heds: { tier: 'S', line: 'Protects the cells that build collagen from oxidative stress.' },
    pots: { tier: 'S', line: 'Cardiovascular antioxidant, studied for blood flow.' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'benfotiamine', name: 'Benfotiamine',
    heds: { tier: 'S', line: 'Reduces AGE formation that can damage collagen.' },
    pots: { tier: 'S', line: 'Supports nerve function and energy metabolism, relevant to small-fiber involvement.' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'niacinamide', name: 'Niacinamide',
    pots: { tier: 'S', line: 'Supports energy metabolism.' },
    heds: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'p5p', name: 'P5P (B6)',
    mcas: { tier: 'S', line: 'Active B6 that supports the body histamine-clearance pathways.' },
    heds: { tier: 'S', line: 'Supports homocysteine balance relevant to cross-linking.' },
    pots: { tier: 'S', line: 'Cofactor in neurotransmitter synthesis, part of autonomic signaling.' },
  },
  {
    slug: 'r5p', name: 'R5P (B2)',
    pots: { tier: 'S', line: 'Supports mitochondrial energy at Complex II.' },
    heds: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'methylfolate', name: 'Methylfolate',
    mcas: { tier: 'S', line: 'Methylation supports histamine clearance via HNMT.' },
    heds: { tier: 'S', line: 'Supports homocysteine balance and healthy enzyme regulation.' },
    pots: { tier: 'S', line: 'B-vitamin support for the nervous system.' },
  },
  {
    slug: 'vitamin-b12', name: 'Vitamin B12',
    pots: { tier: 'P', line: 'Supports the autonomic nervous system. Deficiency is common in people with orthostatic symptoms.' },
    heds: { tier: 'S', line: 'Homocysteine balance relevant to cross-linking.' },
    mcas: { tier: 'S', line: 'Methylation supports histamine clearance.' },
  },
  {
    slug: 'vitamin-d3', name: 'Vitamin D3',
    mcas: { tier: 'P', line: 'Supports mast cell stability and immune regulation.' },
    heds: { tier: 'S', line: 'Musculoskeletal support. Deficiency is linked to more pain.' },
    pots: { tier: 'S', line: 'Immune regulation. Deficiency is common.' },
  },
  {
    slug: 'vitamin-k2', name: 'Vitamin K2',
    heds: { tier: 'S', line: 'Directs calcium to bone (osteoporosis risk) and supports vascular health.' },
    pots: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'copper-bisglycinate', name: 'Copper Bisglycinate',
    heds: { tier: 'P', line: 'The cofactor for lysyl oxidase, the enzyme that cross-links collagen.' },
    mcas: { tier: 'S', line: 'DAO is a copper-dependent enzyme involved in histamine clearance.' },
    pots: { tier: 'G' },
  },
  {
    slug: 'manganese-bisglycinate', name: 'Manganese Bisglycinate',
    heds: { tier: 'S', line: 'Cofactor for enzymes that build connective tissue proteoglycans.' },
    pots: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'chromium', name: 'Chromium',
    heds: { tier: 'G' },
    pots: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'selenium', name: 'Selenium',
    heds: { tier: 'S', line: 'Antioxidant protection for connective tissue.' },
    pots: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'pantothenic-acid', name: 'Pantothenic Acid',
    pots: { tier: 'S', line: 'Supports adrenal and energy metabolism.' },
    heds: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'biotin', name: 'Biotin',
    heds: { tier: 'G' },
    pots: { tier: 'G' },
    mcas: { tier: 'G' },
  },
  {
    slug: 'boron', name: 'Boron',
    heds: { tier: 'S', line: 'Supports bone metabolism and the body use of calcium, magnesium, and vitamin D.' },
    // POTS and MCAS: no defensible link, omitted.
  },
  {
    slug: 'molybdenum', name: 'Molybdenum',
    mcas: { tier: 'P', line: 'Cofactor for sulfite oxidase, which processes sulfites that many sensitive people react to.' },
    // hEDS and POTS: no defensible link, omitted.
  },
];

const TOTAL = INGREDIENTS.length; // 29

function entriesFor(cond: CondKey, tier: Tier) {
  return INGREDIENTS.filter((ing) => ing[cond] && ing[cond]!.tier === tier);
}

// Pull up to 3 verified PMIDs for an ingredient from its existing sources[]
// bibliography in the ingredient data. No new research; these are the same
// citations rendered on the ingredient's own page.
function pmidsFor(slug: string): string[] {
  const ing = (ingredients as Record<string, { sources?: { pmid?: string }[] }>)[slug];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const src of ing?.sources ?? []) {
    if (src.pmid && !seen.has(src.pmid)) {
      seen.add(src.pmid);
      out.push(src.pmid);
    }
    if (out.length >= 3) break;
  }
  return out;
}

function IngredientLink({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      href={`/ingredients/${slug}`}
      className="font-bold text-[#3D3733] hover:text-[#B36B4D] underline decoration-[#B36B4D]/30 underline-offset-2 transition-colors"
    >
      {name}
    </Link>
  );
}

export default function BenefitsByCondition() {
  const [active, setActive] = useState<CondKey>('pots');
  const activeMeta = CONDITIONS.find((c) => c.key === active)!;

  const primary = entriesFor(active, 'P');
  const supporting = entriesFor(active, 'S');
  const general = entriesFor(active, 'G');
  const relevant = primary.length + supporting.length;
  const conditionItems = [...primary, ...supporting]; // lead actives first, then supporting
  const doingSomething = relevant + general.length;

  return (
    <section id="benefits-by-condition" className="px-6 py-20 md:py-28 bg-[#F2F0EA] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            Benefits by condition
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight mb-6">
            Have one of the three?{' '}
            <span className="text-[#B36B4D] italic font-normal">Most of the formula still works for you.</span>
          </h2>
          <p className="text-[#5D5752] text-base md:text-lg leading-relaxed font-medium">
            You do not need all three diagnoses to benefit. Pick the condition that brought you here and see how much of the 29-ingredient system is already pointed at it. A few lead actives do the targeted work, a wider supporting cast backs them up, and a foundation of whole-body nutrients supports everyone.
          </p>
        </div>

        {/* Condition toggle */}
        <div role="tablist" aria-label="Choose a condition" className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-[#3D3733]/10 shadow-sm mb-10">
          {CONDITIONS.map((c) => {
            const isOn = c.key === active;
            return (
              <button
                key={c.key}
                role="tab"
                aria-selected={isOn}
                onClick={() => setActive(c.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                  isOn
                    ? 'bg-[#0F2A22] text-white shadow'
                    : 'text-[#5D5752] hover:text-[#0F2A22] hover:bg-[#0F2A22]/5'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div role="tabpanel" aria-label={activeMeta.full}>
          {/* Inclusive stat: condition count + near-full segmented bar (no deficit fraction) */}
          <div className="mb-12 pb-8 border-b border-[#3D3733]/10 max-w-2xl">
            <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
              <div className="flex items-end gap-x-3">
                <span className="font-serif font-bold text-[#0F2A22] leading-none" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}>
                  {relevant}
                </span>
                <span className="text-[#5D5752] text-base md:text-lg font-medium pb-2">
                  actives work on your {activeMeta.label}
                </span>
              </div>
              <div className="flex items-end gap-x-2 pb-2">
                <span className="font-serif font-bold text-2xl text-[#3D3733] leading-none">+{general.length}</span>
                <span className="text-[#6B655F] text-sm font-medium">whole-body foundation</span>
              </div>
            </div>

            {/* Condition-targeted + whole-body together fill nearly the whole formula */}
            <div className="mt-5 flex h-2.5 w-full rounded-full bg-[#0F2A22]/10 overflow-hidden" aria-hidden="true">
              <div className="h-full bg-[#B36B4D] transition-all duration-500" style={{ width: `${(relevant / TOTAL) * 100}%` }} />
              <div className="h-full bg-[#B36B4D]/35 transition-all duration-500" style={{ width: `${(general.length / TOTAL) * 100}%` }} />
            </div>
            <p className="mt-3 text-[#5D5752] text-sm font-medium max-w-xl">
              That is {doingSomething} of {TOTAL} ingredients doing something for you. With one condition you are far from a bystander to your own formula.
            </p>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* WORKING ON YOUR CONDITION (lead actives + supporting, consolidated into one group) */}
            {conditionItems.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0F2A22] mb-5">
                  Working on your {activeMeta.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {conditionItems.map((ing) => {
                    const lead = ing[active]!.tier === 'P';
                    const pmids = pmidsFor(ing.slug);
                    return (
                      <div key={ing.slug} className="flex gap-3 pb-4 border-b border-[#3D3733]/8">
                        <span className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${lead ? 'bg-[#B36B4D]' : 'bg-[#B36B4D]/40'}`} aria-hidden="true" />
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed text-[#5D5752]">
                            <IngredientLink slug={ing.slug} name={ing.name} />
                            {lead && (
                              <span className="ml-2 align-middle inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#B36B4D]/12 text-[#B36B4D]">Lead</span>
                            )}
                            <span className="text-[#6B655F]"> {' '} {ing[active]!.line}</span>
                          </p>
                          {pmids.length > 0 && (
                            <p className="mt-1.5 text-[11px] leading-relaxed">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#6B655F] mr-1.5">Studies</span>
                              {pmids.map((pmid, i) => (
                                <span key={pmid}>
                                  {i > 0 && <span className="text-[#6B655F]">, </span>}
                                  <a
                                    href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B36B4D] hover:underline"
                                  >
                                    PMID {pmid}
                                  </a>
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GENERAL (summarized, explicitly not condition-specific) */}
            {general.length > 0 && (
              <div className="rounded-2xl bg-[#EBE8E1] border border-[#3D3733]/8 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#6B655F] mb-2">
                  Whole-body foundation
                </h3>
                <p className="text-[#5D5752] text-sm leading-relaxed mb-4 max-w-2xl">
                  Plus {general.length} foundational nutrients your whole body uses, for energy, antioxidant defense, and nutrient status. These support everyone, not {activeMeta.label} specifically.
                </p>
                <div className="flex flex-wrap gap-2">
                  {general.map((ing) => (
                    <Link
                      key={ing.slug}
                      href={`/ingredients/${ing.slug}`}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#3D3733]/10 text-xs font-medium text-[#5D5752] hover:text-[#B36B4D] hover:border-[#B36B4D]/30 transition-colors"
                    >
                      {ing.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Footnote + path to evidence */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[#6B655F] text-xs leading-relaxed max-w-2xl">
              Lead actives do the targeted work. The rest is supporting cast and whole-body foundation, not equal claims. Each PMID links to the study on PubMed; the full, per-condition evidence lives on every ingredient's page.
            </p>
            <Link
              href="/ingredients"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B36B4D] text-white font-bold text-[10px] uppercase tracking-widest shadow-md hover:bg-[#0F2A22] transition-colors active:scale-95 flex-shrink-0"
            >
              See every ingredient
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
