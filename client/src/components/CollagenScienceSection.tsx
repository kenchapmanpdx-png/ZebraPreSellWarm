/* client/src/components/CollagenScienceSection.tsx */
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
  AlertTriangle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import ViciousCycle from '@/components/ViciousCycle';

export default function CollagenScienceSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const pathways = [
    {
      id: 'mmp-inhibition',
      icon: Shield,
      title: "Support Normal Collagen Turnover",
      subtitle: "MMP Inhibition",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      gradient: "from-blue-500/10 to-transparent",
      summary: "Your body has enzymes (MMPs) that act like a shredder. Some of our ingredients have been studied in lab research for effects on these enzymes.",
      problem: "Lab studies of skin cells from people with hEDS have found higher MMP-1 activity than in cells from people without hEDS. It's like trying to fill a bathtub with the drain open.",
      solution: "We include compounds that have been studied in lab research for effects on several of these enzymes.",
      mechanisms: [
        { name: "MMP-1", role: "Cuts the main collagen fibers", ingredients: ["Pine Bark Extract", "Grape Seed Extract"] },
        { name: "MMP-3", role: "The 'master switch' that activates other MMPs", ingredients: ["PEA", "Luteolin"] },
        { name: "MMP-9", role: "Released and activated by mast cells", ingredients: ["Pine Bark Extract", "Grape Seed Extract"] }
      ],
      keyInsight: "Pine bark and grape seed procyanidins are converted by gut bacteria into valerolactone metabolites, which reduced MMP-9 release from immune cells in lab studies."
    },
    {
      id: 'timps',
      icon: Shield,
      title: "Natural Enzyme Balance",
      subtitle: "TIMP Research",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      gradient: "from-indigo-500/10 to-transparent",
      summary: "Your body has natural collagen bodyguards called TIMPs. Some of our ingredients raised TIMP levels in lab and animal studies; this has not been tested in people.",
      problem: "When TIMPs are low relative to MMPs, the balance tips toward breakdown. You need both less attack AND more defense.",
      solution: "We include compounds that increased TIMP production in lab and animal studies.",
      mechanisms: [
        { name: "TIMP-1", role: "Blocks MMP-1, MMP-3, and MMP-9", ingredients: ["Luteolin", "PEA"] }
      ],
      keyInsight: "Collagen turnover depends on the balance between MMPs and TIMPs, and our ingredient choices were guided by lab research on both."
    },
    {
      id: 'transcription',
      icon: Dna,
      title: "Inflammation Signaling",
      subtitle: "Inflammation Signaling",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      gradient: "from-purple-500/10 to-transparent",
      summary: "Pine bark, PEA and luteolin have been studied in lab research for effects on NF-kB, a signal that helps switch on MMP production.",
      problem: "Ongoing inflammation can increase the signals that switch on MMP production.",
      solution: "We include ingredients studied in lab research for effects on the signals that control MMP production.",
      mechanisms: [
        { name: "NF-kB Pathway", role: "Master inflammatory switch", ingredients: ["PEA", "Pine Bark Extract", "Luteolin"] },
        { name: "AP-1 Pathway", role: "Stress-response transcription factor", ingredients: ["Pine Bark Extract"] }
      ],
      keyInsight: "In a small lab study, blood from volunteers who took a pine bark extract reduced inflammatory signaling in immune cells."
    },
    {
      id: 'vicious-cycle',
      icon: RefreshCcw,
      title: "Collagen and Mast Cell Research",
      subtitle: "Matrikine/DAMP Cycle",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      gradient: "from-red-500/10 to-transparent",
      summary: "Collagen fragments can trigger mast cells, which release more enzymes. Several of our ingredients have been studied in lab research at different points of this process.",
      problem: "Lab research suggests a possible loop: collagen fragments can activate mast cells, and mast cell enzymes can activate collagen-degrading enzymes.",
      solution: "We include ingredients studied in lab research on signaling pathways and mast cells.",
      mechanisms: [
        { name: "TLR4 Blockade", role: "Lab studies suggest collagen fragments can activate mast cells through this receptor", ingredients: ["Quercetin Phytosome", "Luteolin"] },
        { name: "Mast Cell Stabilization", role: "Studied in lab research for effects on mast cell mediator release", ingredients: ["PEA"] }
      ],
      keyInsight: "Some researchers have proposed that collagen breakdown products and inflammation may feed each other. hEDS and mast cell issues are commonly co-reported, although a recent study did not find more MCAS in people with hEDS or POTS."
    },
    {
      id: 'adamts',
      icon: AlertTriangle,
      title: "Proteoglycan Research",
      subtitle: "ADAMTS Research",
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      gradient: "from-teal-500/10 to-transparent",
      summary: "ADAMTS enzymes destroy your 'cushioning' proteins. In lab studies, luteolin blocked ADAMTS enzymes that break down cartilage proteins.",
      problem: "ADAMTS-4 and ADAMTS-5 break down aggrecan, a protein that helps cartilage resist compression.",
      solution: "In lab studies, luteolin blocked ADAMTS enzymes more than it blocked MMPs.",
      mechanisms: [
        { name: "ADAMTS-4/5", role: "Primary aggrecanases in inflammation", ingredients: ["Luteolin"] }
      ],
      keyInsight: "Luteolin is one of the few natural compounds tested in lab studies for blocking ADAMTS-4 and ADAMTS-5."
    },
    {
      id: 'synthesis',
      icon: Factory,
      title: "Build New Collagen",
      subtitle: "Collagen Synthesis",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      gradient: "from-emerald-500/10 to-transparent",
      summary: "We provide the cofactors collagen needs to assemble correctly, even when amino acids are intact.",
      problem: "Collagen formation depends on vitamin C and copper as cofactors.",
      solution: "Buffered Sodium Ascorbate for hydroxylation plus Copper Bisglycinate for cross-linking.",
      mechanisms: [
        { name: "Hydroxylation", role: "Vitamin C stabilizes the collagen helix", ingredients: ["Vitamin C (Sodium Ascorbate)"] },
        { name: "Cross-linking", role: "Copper-dependent LOX bonds fibers together", ingredients: ["Copper Bisglycinate"] }
      ],
      keyInsight: "Without vitamin C, collagen cannot form a stable triple helix."
    },
    {
      id: 'crosslinking',
      icon: LinkIcon,
      title: "Support Normal Cross-Linking",
      subtitle: "LOX Cross-Linking",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      gradient: "from-amber-500/10 to-transparent",
      summary: "Cross-linking turns weak collagen into strong tissue. We provide the essential Copper.",
      problem: "LOX absolutely requires copper. Without enough copper, collagen cross-linking cannot work normally.",
      solution: "We include 2 mg of copper, the cofactor the LOX enzyme needs, and balance it against the zinc in the formula.",
      mechanisms: [
        { name: "Copper", role: "Essential LOX cofactor", ingredients: ["Copper Bisglycinate"] },
        { name: "Homocysteine", role: "Supports normal homocysteine metabolism", ingredients: ["P5P", "Methyl B12/Folate"] }
      ],
      keyInsight: "Elevated homocysteine can inhibit LOX; B vitamins support normal homocysteine metabolism."
    },
    {
      id: 'fibroblasts',
      icon: Zap,
      title: "Energy for the Cells That Build Collagen",
      subtitle: "Energy Nutrients",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
      gradient: "from-violet-500/10 to-transparent",
      summary: "Fibroblasts are the cells that build collagen. We include B-vitamins and NR that support normal energy metabolism, plus vitamin C and manganese, which are part of the body's antioxidant systems.",
      problem: "",
      solution: "B-vitamins and NR support normal cellular energy metabolism, and vitamin C supports the body's antioxidant defenses.",
      mechanisms: [
        { name: "NAD+ / Mitochondrial Fuel", role: "Fuels ATP synthesis", ingredients: ["Nicotinamide Riboside", "Benfotiamine", "R5P"] },
        { name: "Antioxidant Defense", role: "Part of the body's antioxidant systems", ingredients: ["Vitamin C", "Manganese Bisglycinate"] }
      ],
      keyInsight: "NR is split between the AM and PM capsules."
    },
    {
      id: 'mitochondria',
      icon: Battery,
      title: "Power the Cells",
      subtitle: "Mitochondrial ETC",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      gradient: "from-orange-500/10 to-transparent",
      summary: "Most cells rely on mitochondria for energy. We include cofactors used at several steps of energy production.",
      problem: "Without cellular energy, nothing else works properly.",
      solution: "Provide the B-vitamin cofactors that mitochondrial energy production depends on.",
      mechanisms: [
        { name: "Complex I/II", role: "FMN and FAD cofactors for electron transport", ingredients: ["R5P"] },
        { name: "Pyruvate Dehydrogenase", role: "Thiamine-dependent entry into the Krebs cycle", ingredients: ["Benfotiamine"] },
        { name: "NAD+ Regeneration", role: "Fuel for the system", ingredients: ["Nicotinamide Riboside", "Niacinamide"] }
      ],
      keyInsight: "Benfotiamine is a form of vitamin B1 that raises blood thiamine levels more than standard thiamine; the gain in the active form inside red blood cells is about twofold."
    },
    {
      id: 'mast-cells',
      icon: FlaskConical,
      title: "Mast Cell Research",
      subtitle: "Mast Cell Stabilization",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      gradient: "from-rose-500/10 to-transparent",
      summary: "Several ingredients have been studied in lab research for effects on mast cells.",
      problem: "Overactive mast cells release mediators, including enzymes that can affect connective tissue.",
      solution: "In lab research, PEA and luteolin act on different mast cell pathways.",
      mechanisms: [
        { name: "PPAR-alpha Activation", role: "Studied in lab research for effects on mast cell mediator release", ingredients: ["PEA (Micronized)"] },
        { name: "Membrane Stability", role: "Studied in lab research on mast cell degranulation", ingredients: ["Luteolin"] }
      ],
      keyInsight: "Quercetin Phytosome (Quercefit®) reaches plasma concentrations roughly 20x higher than plain quercetin."
    },
    {
      id: 'histamine',
      icon: Pill,
      title: "Histamine Metabolism",
      subtitle: "Clearance Pathways",
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-200",
      gradient: "from-pink-500/10 to-transparent",
      summary: "We include copper, a part of the DAO enzyme, and B-vitamins involved in methylation, which the body uses in normal histamine metabolism.",
      problem: "When histamine breakdown is slow, even normal amounts can build up.",
      solution: "Provide copper, a structural part of DAO, and methylation B-vitamins that support the body's supply of SAM, which HNMT uses.",
      mechanisms: [
        { name: "DAO Enzyme", role: "Gut histamine breakdown", ingredients: ["Copper"] },
        { name: "Methylation", role: "Intracellular breakdown", ingredients: ["Methylfolate", "B12"] }
      ],
      keyInsight: "DAO requires the same copper needed for collagen cross-linking."
    },
    {
      id: 'autonomic',
      icon: Brain,
      title: "Nervous System Support",
      subtitle: "Nervous System Support",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      gradient: "from-cyan-500/10 to-transparent",
      summary: "L-theanine has been studied in small trials for short-term stress, and magnesium supports normal nervous system function.",
      problem: "The nervous system balances 'fight-or-flight' (sympathetic) and 'rest-and-digest' (parasympathetic) signals.",
      solution: "We include L-theanine, taurine and magnesium, which have been studied for their roles in normal nerve signaling.",
      mechanisms: [
        { name: "GABA-A", role: "Inhibitory system", ingredients: ["L-Theanine", "Magnesium"] },
        { name: "Sympathetic Dampening", role: "Supports normal nervous system function", ingredients: ["Magnesium"] }
      ],
      keyInsight: ""
    },
    {
      id: 'cardiovascular',
      icon: Heart,
      title: "Blood Pressure Awareness",
      subtitle: "Blood Pressure Awareness",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      gradient: "from-red-500/10 to-transparent",
      summary: "Some ingredients, such as taurine, grape seed and quercetin, can lower blood pressure slightly, and together the effect may add up. If you have low blood pressure or take midodrine or fludrocortisone, talk with your doctor before starting.",
      problem: "Many people in this community have low blood pressure, so we tracked the blood pressure effect of every ingredient and disclose the ones that can lower it.",
      solution: "Most ingredients have small or no effects on blood pressure on their own, but a few can lower it slightly and the effects may add up.",
      mechanisms: [
        { name: "Sodium", role: "Small sodium contribution", ingredients: ["Sodium Ascorbate"] },
        { name: "Vascular Tone", role: "Vitamin C supports normal collagen formation in blood vessels", ingredients: ["Vitamin C", "Magnesium"] }
      ],
      keyInsight: "Sodium ascorbate adds about 210 mg of sodium per day (105 mg per scoop) alongside the vitamin C."
    },
    {
      id: 'gi-protection',
      icon: Pill,
      title: "Gut Lining Support",
      subtitle: "GI Integrity",
      color: "text-lime-600",
      bg: "bg-lime-50",
      border: "border-lime-200",
      gradient: "from-lime-500/10 to-transparent",
      summary: "Zinc carnosine has been studied in small human trials for supporting the stomach and gut lining.",
      problem: "A healthy gut lining supports normal nutrient absorption.",
      solution: "Protect mucosa and use gentle forms of nutrients.",
      mechanisms: [
        { name: "Mucosal Protection", role: "Studied for supporting the stomach and gut lining", ingredients: ["Zinc Carnosine"] },
        { name: "Buffered Forms", role: "Reduces irritation", ingredients: ["Sodium Ascorbate"] }
      ],
      keyInsight: "Zinc carnosine has been studied in human trials in Japan for supporting the stomach lining."
    }
  ];

  // Cluster the 14 pathways into 4 thematic groups for visual rhythm.
  const clusters: Array<{
    id: string;
    label: string;
    title: string;
    subtitle: string;
    accent: string;
    pathwayIds: string[];
  }> = [
    {
      id: 'protect',
      label: 'Cluster 01',
      title: 'Collagen Turnover',
      subtitle: 'Ingredients studied in lab research for effects on the enzymes that break down connective tissue.',
      accent: '#0F2A22',
      pathwayIds: ['mmp-inhibition', 'timps', 'transcription', 'adamts']
    },
    {
      id: 'build',
      label: 'Cluster 02',
      title: 'Support New Collagen Formation',
      subtitle: 'Provide the cofactors and energy nutrients the body uses for collagen formation and cross-linking.',
      accent: '#2D6B52',
      pathwayIds: ['synthesis', 'crosslinking', 'fibroblasts', 'vicious-cycle']
    },
    {
      id: 'calm',
      label: 'Cluster 03',
      title: 'Mast Cells and Histamine',
      subtitle: 'Ingredients studied in lab research on mast cells, plus copper and B-vitamins involved in normal histamine metabolism.',
      accent: '#B36B4D',
      pathwayIds: ['mast-cells', 'histamine']
    },
    {
      id: 'power',
      label: 'Cluster 04',
      title: 'Power the System',
      subtitle: 'Mitochondria, autonomic balance, cardiovascular support, and gut integrity.',
      accent: '#A0825A',
      pathwayIds: ['mitochondria', 'autonomic', 'cardiovascular', 'gi-protection']
    }
  ];

  const pathwayById = Object.fromEntries(pathways.map((p) => [p.id, p]));

  return (
    <>
      {/* SECTION 1: VICIOUS CYCLE - pinned scroll-scrubbed sequence */}
      <ViciousCycle />

      {/* SECTION 2: DARK BAND - "14 Pathways" intro */}
      <section className="bg-[#0F2A22] py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B36B4D]/10 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D6B52]/15 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#D4A373] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
            The ZebraThrive Solution
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            One system built around 14 biological pathways in <span className="text-[#D4A373] italic font-normal">collagen and mast cell research</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Rather than focusing on one thing, the formula includes ingredients chosen from research on many pathways in collagen and mast cell biology, organized into four clusters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-10">
            {clusters.map((c, i) => (
              <div
                key={c.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: c.accent === '#0F2A22' ? '#D4A373' : c.accent }}
                  aria-hidden="true"
                />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/90">
                  {(i + 1).toString().padStart(2, '0')} {c.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CLUSTERED 14-PATHWAY GRID */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-[#EBE8E1]">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">

          {clusters.map((cluster, ci) => {
            const clusterPathways = cluster.pathwayIds.map((id) => pathwayById[id]).filter(Boolean);

            return (
              <div key={cluster.id}>
                <div className="mb-8 pb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b" style={{ borderColor: cluster.accent + '33' }}>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: ({ '#B36B4D': '#8F5238', '#A0825A': '#7A6240' } as Record<string, string>)[cluster.accent] ?? cluster.accent }}>
                      {cluster.label}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] leading-tight">
                      {cluster.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-[#5D5752] md:max-w-md leading-relaxed">
                    {cluster.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {clusterPathways.map((pathway, index) => (
                    <motion.div
                      key={pathway.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (ci * 0.05) + (index * 0.05) }}
                      className={`relative bg-white rounded-2xl border ${pathway.border} overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
                      style={{ borderLeftWidth: '4px', borderLeftColor: cluster.accent }}
                    >
                      <button
                        onClick={() => toggleSection(pathway.id)}
                        className="w-full p-6 flex items-start gap-4 text-left transition-colors relative z-10"
                      >
                        <div className={`w-12 h-12 rounded-lg ${pathway.bg} flex items-center justify-center flex-shrink-0 mt-1`}>
                          <pathway.icon className={`w-6 h-6 ${pathway.color}`} aria-hidden="true" />
                        </div>

                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-[#3D3733] text-lg leading-tight">{pathway.title}</div>
                              <span className={`text-[10px] font-bold ${pathway.color} uppercase tracking-wider block mt-1`}>
                                {pathway.subtitle}
                              </span>
                            </div>
                            {expandedSection === pathway.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            )}
                          </div>

                          {expandedSection !== pathway.id && (
                            <p className="text-[#6B655F] text-xs mt-3 line-clamp-2 leading-relaxed font-medium">
                              {pathway.summary}
                            </p>
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedSection === pathway.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden relative z-10"
                          >
                            <div className="px-6 pb-6 pt-0">
                              <div className="bg-[#F8F7F4] rounded-xl p-4 mb-4 text-sm space-y-3">
                                {pathway.problem && (
                                <div>
                                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                    <AlertCircle size={12} aria-hidden="true" /> The Problem
                                  </span>
                                  <p className="text-[#5D5752] mt-1 text-xs leading-relaxed">{pathway.problem}</p>
                                </div>
                                )}
                                <div>
                                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle2 size={12} aria-hidden="true" /> Our Solution
                                  </span>
                                  <p className="text-[#5D5752] mt-1 text-xs leading-relaxed">{pathway.solution}</p>
                                </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                {pathway.mechanisms.map((mech, i) => (
                                  <div key={i} className="flex flex-col sm:flex-row gap-2 text-xs border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                    <span className="font-bold text-[#3D3733] sm:w-1/3">{mech.name}</span>
                                    <div className="sm:w-2/3">
                                      <span className="block text-[#6B655F] mb-1">{mech.role}</span>
                                      <div className="flex flex-wrap gap-1">
                                        {mech.ingredients.map((ing, j) => (
                                          <span key={j} className={`px-1.5 py-0.5 rounded-sm ${pathway.bg} ${pathway.color} font-bold text-[9px] uppercase`}>
                                            {ing}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {pathway.keyInsight && (
                              <div className={`p-4 rounded-lg ${pathway.bg} border ${pathway.border}`}>
                                <p className={`text-[9px] font-black ${pathway.color} uppercase mb-1 tracking-widest`}>Research Note</p>
                                <p className="text-[#3D3733] text-xs italic font-medium leading-relaxed">"{pathway.keyInsight}"</p>
                              </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="text-center pt-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 max-w-[92vw] px-5 sm:px-6 py-3 bg-[#3D3733] text-white rounded-2xl sm:rounded-full shadow-xl hover:scale-105 transition-transform cursor-default">
              <Zap className="w-4 h-4 text-[#B36B4D] flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase">29 Ingredients, 14 Research Pathways, 1 System</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
