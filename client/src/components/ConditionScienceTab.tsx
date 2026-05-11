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
      name: "hEDS",
      fullName: "Hypermobile Ehlers-Danlos Syndrome",
      tagline: "Collagen Protection & Repair",
      description: "Addressing up to 53x higher levels of collagen-degrading enzymes found in hEDS patients.",
      color: "text-emerald-800",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: LinkIcon,
      stats: { pathways: 8, ingredients: 20 }
    },
    pots: {
      name: "POTS", 
      fullName: "Postural Orthostatic Tachycardia",
      tagline: "Autonomic & Cardiovascular Balance",
      description: "Restoring the equilibrium between sympathetic overdrive and parasympathetic insufficiency.",
      color: "text-blue-800",
      bg: "bg-blue-50", 
      border: "border-blue-200",
      icon: Heart,
      stats: { pathways: 6, ingredients: 16 }
    },
    mcas: {
      name: "MCAS",
      fullName: "Mast Cell Activation Syndrome", 
      tagline: "Cellular Stabilization & Histamine Clearance",
      description: "Calming hyper-reactive immune cells to stop the chronic inflammatory cascade.",
      color: "text-rose-800",
      bg: "bg-rose-50",
      border: "border-rose-200", 
      icon: FlaskConical,
      stats: { pathways: 6, ingredients: 18 }
    }
  };

  const hedsPathways: Pathway[] = [
    {
      id: 'mmp-inhibition',
      icon: Shield,
      title: "Stop the Breakdown",
      subtitle: "MMP Inhibition",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      summary: "In hEDS, enzymes called MMPs can be up to 53x normal, shredding collagen faster than you can build it.",
      problem: "MMP-1, 3, 8, and 9 are actively cutting your collagen fibers. It's like trying to fill a bathtub with the drain wide open.",
      solution: "We include compounds like Pycnogenol® that inhibit these enzymes at the genetic level.",
      mechanisms: [
        { name: "MMP-1 (Collagenase)", role: "Cuts main fibers; 53x elevated in hEDS", ingredients: ["Pycnogenol", "Astaxanthin", "PQQ"] },
        { name: "MMP-3 (Stromelysin)", role: "The 'master switch' activating other MMPs", ingredients: ["PEA", "Luteolin"] }
      ],
      keyInsight: "Pycnogenol's metabolites achieve 37x cellular accumulation, overcoming the absorption limits of most polyphenols."
    },
    {
      id: 'timps',
      icon: Shield,
      title: "Boost Defenses",
      subtitle: "TIMP Enhancement",
      color: "text-teal-700",
      bg: "bg-teal-50",
      border: "border-teal-200",
      summary: "Upregulating natural collagen 'bodyguards' to restore balance to your tissue matrix.",
      problem: "Connective tissue fails when TIMPs are too low relative to destructive enzymes.",
      solution: "Compounds that signal your cells to produce more Tissue Inhibitors of Metalloproteinases (TIMPs).",
      mechanisms: [
        { name: "TIMP-1", role: "Blocks MMP-1, 3, and 9", ingredients: ["Luteolin", "Astaxanthin", "PEA"] },
        { name: "TIMP-2", role: "Specifically inhibits MMP-2", ingredients: ["Curcumin Phytosome"] }
      ],
      keyInsight: "Healing requires both reducing the 'shredder' and increasing the 'bodyguards'."
    },
    {
      id: 'synthesis',
      icon: Factory,
      title: "Build New Matrix",
      subtitle: "Collagen Synthesis",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      summary: "Providing the repeating 'Gly-X-Y' pattern building blocks your body is missing.",
      problem: "Most patients have a 10g/day functional glycine deficit, leading to fragile tissue assembly.",
      solution: "Therapeutic precursors plus buffered Sodium Ascorbate for triple-helix stability.",
      mechanisms: [
        { name: "Glycine", role: "Makes up 33% of every collagen molecule", ingredients: ["Therapeutic Glycine"] },
        { name: "Hydroxylation", role: "Vitamin C stabilizes the helix structure", ingredients: ["Sodium Ascorbate"] }
      ],
      keyInsight: " Without Vitamin C, the helix falls apart-this is why scurvy causes tissue collapse."
    },
    {
      id: 'crosslinking',
      icon: LinkIcon,
      title: "Add Tensile Strength",
      subtitle: "LOX System Support",
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      summary: "Raw collagen is weak. We provide the Copper 'glue' required for the LOX enzyme to function.",
      problem: "LOX cannot work without Copper. Homocysteine (MTHFR) directly destroys the LOX enzyme.",
      solution: "Precise Copper Bisglycinate plus methylated B-vitamins to clear homocysteine.",
      mechanisms: [
        { name: "Copper", role: "The essential LOX cofactor for bonding", ingredients: ["Copper Bisglycinate"] },
        { name: "Methylation", role: "Protects LOX from homocysteine damage", ingredients: ["Methylfolate", "P5P"] }
      ],
      keyInsight: "B-vitamin deficiency creates a 'double hit'-direct enzyme inhibition and genetic silencing."
    }
  ];

  const potsPathways: Pathway[] = [
    {
      id: 'autonomic-modulation',
      icon: Brain,
      title: "Dampen Overdrive",
      subtitle: "Autonomic Balance",
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      summary: "Stabilizing the nervous system to stop heart rate spikes during position changes.",
      problem: "Sympathetic overdrive (fight-or-flight) stuck 'ON' while parasympathetic signals are too weak.",
      solution: "Inhibitory neurotransmitter support using Suntheanine® and Taurine.",
      mechanisms: [
        { name: "GABA-A Receptor", role: "Primary inhibitory calming system", ingredients: ["L-Theanine", "Magnesium"] },
        { name: "Cardiac Rhythm", role: "Heart rate regulation and flexibility", ingredients: ["Taurine", "CoQ10"] }
      ],
      keyInsight: "Taurine shows ~3.6 bpm heart rate reduction in human studies-meaningful for baseline tachycardia."
    },
    {
      id: 'mitochondrial-etc',
      icon: Battery,
      title: "End Chronic Fatigue",
      subtitle: "Mitochondrial Support",
      color: "text-orange-700",
      bg: "bg-orange-50",
      border: "border-orange-200",
      summary: "Fueling the energy transport chain to power the cells that regulate your heart.",
      problem: "Mitochondrial dysfunction is a hallmark of dysautonomia; without ATP, nothing works.",
      solution: "Supporting every complex of the transport chain plus BiPQQ® for new biogenesis.",
      mechanisms: [
        { name: "Complex I", role: "The first step of electron transport", ingredients: ["Benfotiamine", "R5P"] },
        { name: "Biogenesis", role: "Creating NEW mitochondria (PGC-1α)", ingredients: ["PQQ"] }
      ],
      keyInsight: "We use Ubiquinol (reduced CoQ10)-it is 8x more bioavailable than standard forms."
    }
  ];

  const mcasPathways: Pathway[] = [
    {
      id: 'mast-cell-stabilization',
      icon: FlaskConical,
      title: "Stop the Flare",
      subtitle: "Membrane Stabilization",
      color: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      summary: "Blocking the release of histamine and tryptase before they damage your collagen.",
      problem: "Hyper-reactive mast cells degranulate in response to benign triggers.",
      solution: "Redundant coverage using six different stabilization mechanisms.",
      mechanisms: [
        { name: "PPARα", role: "Nuclear switch to suppress mediator release", ingredients: ["PEA (Micronized)"] },
        { name: "ORAI Channel", role: "Block the calcium influx that triggers flares", ingredients: ["Quercetin Phytosome"] }
      ],
      keyInsight: "Quercetin inhibits up to 87% of histamine release-but only in bioavailable Phytosome or EMIQ forms."
    },
    {
      id: 'histamine-clearance',
      icon: Pill,
      title: "Clear the 'Bucket'",
      subtitle: "DAO & HNMT Metabolism",
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200",
      summary: "Providing the enzymes your body needs to process and remove histamine safely.",
      problem: "Impaired histamine clearance makes even normal levels toxic to the system.",
      solution: "Cofactors for both gut (DAO) and intracellular (HNMT) pathways.",
      mechanisms: [
        { name: "DAO Pathway", role: "Gut-level histamine breakdown", ingredients: ["Copper", "P5P", "Vitamin C"] },
        { name: "Methylation", role: "SAMe production for HNMT function", ingredients: ["Methylfolate", "B12"] }
      ],
      keyInsight: "Copper is a DAO cofactor-the same mineral required for collagen cross-linking. One mineral, two massive jobs."
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
          <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.4em] mb-4">The Clinical Logic</p>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#3D3733] mb-8 leading-tight">THE HOW.</h2>
          <p className="text-xl text-[#5D5752] max-w-2xl mx-auto font-medium">One integrated formula. 28 clinical actives. Targeting the root pathways of the EDS/POTS/MCAS triad.</p>
        </motion.div>

        {/* TABS - Holographic Style */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/40 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-white/50">
            {(Object.keys(conditions) as Condition[]).map((key) => {
              const cond = conditions[key];
              const isActive = activeCondition === key;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveCondition(key); setExpandedSection(null); }}
                  className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${isActive ? `${cond.bg} ${cond.color} shadow-md` : 'text-[#8A857C] hover:text-[#5D5752] hover:bg-white/30'}`}
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
                  <p className="text-[10px] text-[#8A857C] font-black uppercase tracking-[0.2em]">Clinical Pathways</p>
                </div>
                <div className="text-center md:text-right">
                  <p className={`text-5xl font-serif font-bold ${currentCondition.color}`}>{currentCondition.stats.ingredients}</p>
                  <p className="text-[10px] text-[#8A857C] font-black uppercase tracking-[0.2em]">Targeted Actives</p>
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
                    {!expandedSection && <p className="text-[#8A857C] text-sm mt-4 line-clamp-2 font-medium">{pathway.summary}</p>}
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
                                  <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Biological Problem</p>
                                  <p className="text-sm text-[#5D5752] font-medium leading-relaxed">{pathway.problem}</p>
                                </div>
                            </div>
                            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex gap-4">
                                <CheckCircle2 className="text-emerald-600 flex-shrink-0" aria-hidden="true" />
                                <div>
                                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Our Strategy</p>
                                  <p className="text-sm text-[#5D5752] font-medium leading-relaxed">{pathway.solution}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F8F7F4] rounded-2xl p-6">
                            <p className="text-[10px] font-black text-[#8A857C] uppercase mb-4">Mechanism of Action</p>
                            <div className="space-y-4">
                                {pathway.mechanisms.map((mech, i) => (
                                    <div key={i} className="text-xs border-b border-black/5 pb-4 last:border-0 last:pb-0">
                                        <div className="font-black text-[#3D3733] mb-1">{mech.name}</div>
                                        <div className="text-[#8A857C] mb-2">{mech.role}</div>
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

        <div className="mt-20 text-center"><div className="inline-flex items-center gap-4 px-8 py-4 bg-[#3D3733] text-white rounded-full shadow-2xl"><Zap size={20} className="text-[#B36B4D]" aria-hidden="true" /><span className="text-xs font-black tracking-widest uppercase">28 CLINICAL ACTIVES • 20 PATHWAYS • 1 INTEGRATED FORMULA</span></div></div>
      </div>
    </section>
  );
}