/* client/src/components/ConditionScienceTabs.tsx */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Link as LinkIcon, 
  Zap, 
  FlaskConical, 
  Factory, 
  ChevronDown, 
  ChevronUp, 
  RefreshCcw, 
  Dna, 
  Battery, 
  Brain, 
  Heart, 
  Pill, 
  Activity, 
  Droplets, 
  Sparkles, 
  Target, 
  Flame, 
  Beaker,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

type Condition = 'heds' | 'pots' | 'mcas';

interface Mechanism {
  name: string;
  role: string;
  ingredients: string[];
}

interface Pathway {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  border: string;
  summary: string;
  problem: string;
  solution: string;
  mechanisms: Mechanism[];
  keyInsight: string;
}

export default function ConditionScienceTabs() {
  const [activeCondition, setActiveCondition] = useState<Condition>('heds');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const conditions = {
    heds: {
      name: "Tissue",
      fullName: "Connective Tissue",
      tagline: "Collagen Formation and Turnover",
      description: "Vitamin C supports normal collagen formation, and other ingredients were chosen from lab research on collagen turnover.",
      color: "text-emerald-800",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: LinkIcon,
      stats: { pathways: 2, ingredients: 16 }
    },
    pots: {
      name: "Energy", 
      fullName: "Energy and Nervous System",
      tagline: "Nerve Signaling and Energy Metabolism",
      description: "Nutrients for normal nervous system function and energy metabolism.",
      color: "text-blue-800",
      bg: "bg-blue-50", 
      border: "border-blue-200",
      icon: Heart,
      stats: { pathways: 2, ingredients: 14 }
    },
    mcas: {
      name: "Mast Cells",
      fullName: "Mast Cells and Histamine", 
      tagline: "Mast Cell Research and Histamine Metabolism",
      description: "B-vitamins involved in methylation support normal histamine metabolism, and other ingredients were chosen from lab research on mast cells.",
      color: "text-rose-800",
      bg: "bg-rose-50",
      border: "border-rose-200", 
      icon: FlaskConical,
      stats: { pathways: 2, ingredients: 18 }
    }
  };

  const hedsPathways: Pathway[] = [
    {
      id: 'mmp-inhibition',
      icon: Shield,
      title: "Collagen Turnover",
      subtitle: "MMP Inhibition",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      summary: "MMPs are the enzymes that break collagen down during normal collagen turnover.",
      problem: "Collagen turnover is a balance between breakdown and building.",
      solution: "We include pine bark and grape seed, which have been studied in lab research for effects on MMPs. These effects have not been shown in people.",
      mechanisms: [
        { name: "MMP-1 (Collagenase)", role: "Cuts the main collagen fibers", ingredients: ["Pine Bark Extract", "Grape Seed Extract"] }
      ],
      keyInsight: "Pine bark and grape seed procyanidins are converted by gut bacteria into valerolactone metabolites, which reduced MMP-9 release from immune cells in lab studies."
    },
    {
      id: 'synthesis',
      icon: Factory,
      title: "Collagen Formation",
      subtitle: "Collagen Synthesis",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      summary: "Vitamin C supports normal collagen formation.",
      problem: "Collagen formation depends on vitamin C for triple-helix stability and on copper for cross-linking.",
      solution: "Buffered sodium ascorbate, 1,000 mg of vitamin C a day, for triple-helix hydroxylation.",
      mechanisms: [
        { name: "Hydroxylation", role: "Vitamin C stabilizes the collagen helix structure", ingredients: ["Vitamin C (Sodium Ascorbate)"] }
      ],
      keyInsight: "Without Vitamin C the helix cannot stabilize; this is why scurvy causes tissue collapse."
    },
  ];

  const potsPathways: Pathway[] = [
    {
      id: 'autonomic-modulation',
      icon: Brain,
      title: "Nervous System Support",
      subtitle: "Nervous System",
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      summary: "Magnesium supports normal nervous system function, and L-theanine has been studied in small trials for short-term stress.",
      problem: "The nervous system balances 'fight-or-flight' (sympathetic) and 'rest-and-digest' (parasympathetic) signals.",
      solution: "L-theanine and magnesium bisglycinate, nutrients studied for their roles in normal nerve signaling.",
      mechanisms: [
        { name: "GABA-A Receptor", role: "Primary inhibitory calming system", ingredients: ["L-Theanine", "Magnesium Bisglycinate"] }
      ],
      keyInsight: "If you take a beta-blocker or ivabradine, ask your doctor before starting, because taurine may lower resting heart rate slightly and the effects may add up."
    },
    {
      id: 'mitochondrial-etc',
      icon: Battery,
      title: "Energy Metabolism",
      subtitle: "Mitochondrial Cofactors",
      color: "text-orange-700",
      bg: "bg-orange-50",
      border: "border-orange-200",
      summary: "B-vitamins that support normal energy metabolism in every cell.",
      problem: "Every cell runs on ATP made in mitochondria, and energy production depends on B-vitamin cofactors.",
      solution: "Cofactors at several points of energy production: R5P (as FMN and FAD) for Complexes I and II, benfotiamine for the thiamine-dependent entry into the Krebs cycle, and NR for NAD+.",
      mechanisms: [
        { name: "Complex I/II", role: "FMN and FAD cofactors for electron transport", ingredients: ["R5P"] },
        { name: "Pyruvate dehydrogenase", role: "Thiamine-dependent entry into the Krebs cycle", ingredients: ["Benfotiamine"] },
        { name: "NAD+ Cycling", role: "Supports NAD+ levels", ingredients: ["Nicotinamide Riboside", "Niacinamide"] }
      ],
      keyInsight: "Benfotiamine is a form of vitamin B1 that raises blood thiamine levels more than standard thiamine; the gain in the active form inside red blood cells is about twofold."
    }
  ];

  const mcasPathways: Pathway[] = [
    {
      id: 'mast-cell-stabilization',
      icon: FlaskConical,
      title: "Mast Cell Research",
      subtitle: "Mast Cell Pathways",
      color: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      summary: "Ingredients studied in lab research on mast cells; these effects have not been tested in people taking this formula.",
      problem: "When mast cells are activated, they release histamine and other mediators.",
      solution: "In lab research, PEA has been studied for effects on mast cell signaling. These effects have not been confirmed in people.",
      mechanisms: [
        { name: "PPARα", role: "Studied in lab research for effects on mast cell mediator release", ingredients: ["PEA (Micronized)"] }
      ],
      keyInsight: "These are lab findings. None has been confirmed in people at the amounts in this formula."
    },
    {
      id: 'histamine-clearance',
      icon: Pill,
      title: "Histamine Metabolism",
      subtitle: "DAO & HNMT Metabolism",
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200",
      summary: "B-vitamins involved in methylation support the body's normal supply of SAM, which the body uses in histamine metabolism.",
      problem: "Histamine is broken down by DAO in the gut and by HNMT inside cells.",
      solution: "Methylation B-vitamins that support the body's normal supply of SAM.",
      mechanisms: [
        { name: "Methylation", role: "SAMe production for HNMT function", ingredients: ["Methylfolate", "B12"] }
      ],
      keyInsight: "Histamine is broken down by DAO in the gut and by HNMT inside cells."
    }
  ];

  const getPathways = (condition: Condition): Pathway[] => {
    switch (condition) {
      case 'heds': return hedsPathways;
      case 'pots': return potsPathways;
      case 'mcas': return mcasPathways;
    }
  };

  const currentCondition = conditions[activeCondition];
  const currentPathways = getPathways(activeCondition);

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#EBE8E1] min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[10px] font-black text-[#8F5238] uppercase tracking-[0.4em] mb-4">Going Deeper</p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#3D3733] mb-6 leading-tight">Pathways We Target</h2>
          <p className="text-lg md:text-xl text-[#5D5752] max-w-2xl mx-auto font-medium">The mechanisms behind the ingredients above. 26 active ingredients across AM capsules, PM capsules, and the Daily Powder, grouped into the three body systems described at the top of this page.</p>
        </motion.div>

        {/* TABS - Holographic Style */}
        <div className="flex justify-center mb-12">
          <div className="flex w-full max-w-md sm:inline-flex sm:w-auto sm:max-w-none bg-white/40 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-white/50">
            {(Object.keys(conditions) as Condition[]).map((key) => {
              const cond = conditions[key];
              const isActive = activeCondition === key;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveCondition(key); setExpandedSection(null); }}
                  className={`relative flex-1 sm:flex-initial justify-center px-2 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-3 ${isActive ? `${cond.bg} ${cond.color} shadow-md` : 'text-[#6B655F] hover:text-[#5D5752] hover:bg-white/30'}`}
                >
                  <cond.icon size={18} aria-hidden="true" />
                  <span className="hidden sm:inline tracking-wide">{cond.fullName}</span>
                  <span className="sm:hidden">{cond.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONDITION OVERVIEW CARD */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCondition} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`${currentCondition.bg} rounded-[3rem] p-10 md:p-14 shadow-sm border ${currentCondition.border} mb-12 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center gap-12 relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <currentCondition.icon className={`w-12 h-12 ${currentCondition.color}`} aria-hidden="true" />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-4xl font-bold text-[#3D3733] mb-2">{currentCondition.fullName}</h3>
                <p className={`text-sm font-black uppercase tracking-[0.2em] ${currentCondition.color} mb-6`}>{currentCondition.tagline}</p>
                <p className="text-[#5D5752] font-medium text-xl leading-relaxed">{currentCondition.description}</p>
              </div>
              <div className="flex gap-10 md:flex-col md:gap-4 md:items-end border-t md:border-t-0 md:border-l border-black/5 pt-8 md:pt-0 md:pl-10">
                <div className="text-center md:text-right">
                  <p className={`text-5xl font-serif font-bold ${currentCondition.color}`}>{currentCondition.stats.pathways}</p>
                  <p className="text-[10px] text-[#6B655F] font-black uppercase tracking-[0.2em]">Pathways</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* PATHWAYS LIST */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCondition} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPathways.map((pathway, index) => (
              <motion.div key={pathway.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-[2rem] border border-[#3D3733]/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <button onClick={() => toggleSection(pathway.id)} className="w-full p-8 flex items-start gap-6 text-left group">
                  <div className={`w-14 h-14 rounded-2xl ${pathway.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <pathway.icon className={`w-7 h-7 ${pathway.color}`} aria-hidden="true" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#3D3733] text-xl leading-tight mb-2">{pathway.title}</h3>
                    <span className={`text-[10px] font-black ${pathway.color} uppercase tracking-widest bg-white border border-black/5 px-2 py-1 rounded-md shadow-sm`}>{pathway.subtitle}</span>
                    {!expandedSection && <p className="text-[#6B655F] text-sm mt-4 line-clamp-2 font-medium">{pathway.summary}</p>}
                  </div>
                  <div className="mt-2"><ChevronDown className={`transition-transform duration-300 ${expandedSection === pathway.id ? 'rotate-180' : ''}`} aria-hidden="true" /></div>
                </button>

                <AnimatePresence>
                  {expandedSection === pathway.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-8 pb-10 pt-2 border-t border-gray-50">
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 flex gap-4">
                                <AlertTriangle className="text-rose-600 flex-shrink-0" aria-hidden="true" />
                                <div>
                                  <p className="text-[10px] font-black text-rose-600 uppercase mb-1">The Biology</p>
                                  <p className="text-sm text-[#5D5752] font-medium leading-relaxed">{pathway.problem}</p>
                                </div>
                            </div>
                            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex gap-4">
                                <CheckCircle2 className="text-emerald-600 flex-shrink-0" aria-hidden="true" />
                                <div>
                                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">What We Include</p>
                                  <p className="text-sm text-[#5D5752] font-medium leading-relaxed">{pathway.solution}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F8F7F4] rounded-2xl p-6">
                            <p className="text-[10px] font-black text-[#6B655F] uppercase mb-4">Mechanism of Action</p>
                            <div className="space-y-4">
                                {pathway.mechanisms.map((mech, i) => (
                                    <div key={i} className="text-xs border-b border-black/5 pb-4 last:border-0 last:pb-0">
                                        <div className="font-black text-[#3D3733] mb-1">{mech.name}</div>
                                        <div className="text-[#6B655F] mb-2">{mech.role}</div>
                                        <div className="flex flex-wrap gap-1.5">{mech.ingredients.map((ing, j) => <span key={j} className="px-2 py-0.5 bg-white rounded border border-black/5 text-[9px] font-bold text-[#3D3733]">{ing}</span>)}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-black/5 flex gap-4">
                                <Sparkles className="text-[#B36B4D] flex-shrink-0" aria-hidden="true" />
                                <p className="text-sm text-[#3D3733] italic font-medium leading-relaxed">"{pathway.keyInsight}"</p>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 text-center"><div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 max-w-[92vw] px-6 sm:px-8 py-4 bg-[#3D3733] text-white rounded-2xl sm:rounded-full shadow-2xl"><Zap size={20} className="text-[#B36B4D] flex-shrink-0" aria-hidden="true" /><span className="text-[11px] sm:text-xs font-black tracking-wide sm:tracking-widest uppercase">26 ACTIVE INGREDIENTS, 6 FOCUS AREAS, 1 FORMULA</span></div></div>
      </div>
    </section>
  );
}