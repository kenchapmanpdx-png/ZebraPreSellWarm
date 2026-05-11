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
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function CollagenScienceSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const pathways = [
    {
      id: 'mmp-inhibition',
      icon: Shield,
      title: "Stop the Breakdown",
      subtitle: "MMP Inhibition",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      gradient: "from-blue-500/10 to-transparent",
      summary: "Your body has enzymes (MMPs) that act like a shredder. We inhibit them.",
      problem: "Research shows hEDS patients can have up to 53x higher levels of MMP-1. It's like trying to fill a bathtub with the drain open.",
      solution: "We include natural compounds that inhibit these enzymes at multiple points-not just one.",
      mechanisms: [
        { name: "MMP-1", role: "Cuts the main collagen fibers", ingredients: ["Pycnogenol", "Astaxanthin", "Taurine"] },
        { name: "MMP-3", role: "The 'master switch'-activates other MMPs", ingredients: ["PEA", "Luteolin", "PQQ"] },
        { name: "MMP-9", role: "Released by mast cells during flares", ingredients: ["Chlorogenic Acid", "Pycnogenol"] }
      ],
      keyInsight: "Pycnogenol is the only natural compound with human clinical trial evidence showing >50% reduction in MMP gene expression."
    },
    {
      id: 'timps',
      icon: Shield,
      title: "Boost Natural Defenses",
      subtitle: "TIMP Enhancement",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      gradient: "from-indigo-500/10 to-transparent",
      summary: "Your body has natural collagen bodyguards called TIMPs. We help you make more.",
      problem: "When TIMPs are low relative to MMPs, the balance tips toward breakdown. You need both less attack AND more defense.",
      solution: "We include compounds that upregulate your body's own TIMP production.",
      mechanisms: [
        { name: "TIMP-1", role: "Blocks MMP-1, MMP-3, and MMP-9", ingredients: ["Luteolin", "Astaxanthin", "PEA"] },
        { name: "TIMP-2", role: "Specifically inhibits MMP-2", ingredients: ["Curcumin (Phytosome)"] }
      ],
      keyInsight: "The goal isn't just blocking enzymes-it's restoring the biological MMP/TIMP balance."
    },
    {
      id: 'transcription',
      icon: Dna,
      title: "Turn Off Destruction",
      subtitle: "Transcriptional Suppression",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      gradient: "from-purple-500/10 to-transparent",
      summary: "We target the upstream genetic switches (NF-kB) that trigger enzyme production.",
      problem: "Chronic inflammation keeps these genetic switches stuck 'on,' constantly producing collagen-destroying enzymes.",
      solution: "We target the upstream signaling pathways that control MMP production at the genetic level.",
      mechanisms: [
        { name: "NF-kB Pathway", role: "Master inflammatory switch", ingredients: ["PEA", "Pycnogenol", "Luteolin"] },
        { name: "AP-1 Pathway", role: "Stress-response transcription factor", ingredients: ["Pycnogenol", "Astaxanthin"] }
      ],
      keyInsight: "Pycnogenol provides genetic-level suppression, preventing the enzymes from being created in the first place."
    },
    {
      id: 'vicious-cycle',
      icon: RefreshCcw,
      title: "Break the Feedback Loop",
      subtitle: "Matrikine/DAMP Cycle",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      gradient: "from-red-500/10 to-transparent",
      summary: "Collagen fragments trigger mast cells, which release more enzymes. We stop this cycle.",
      problem: "ECM degradation triggers matrikine release; matrikines activate mast cells; mast cells drive more ECM degradation.",
      solution: "We interrupt this loop at multiple points-blocking signals and stabilizing mast cells.",
      mechanisms: [
        { name: "TLR4 Blockade", role: "Matrikines activate mast cells here", ingredients: ["Quercetin", "Luteolin"] },
        { name: "Tryptase Inhibition", role: "Mast cell enzyme that activates MMPs", ingredients: ["Lactoferrin (150mg)"] }
      ],
      keyInsight: "This feedback loop explains why hEDS patients so often develop MCAS."
    },
    {
      id: 'adamts',
      icon: AlertTriangle,
      title: "Protect Proteoglycans",
      subtitle: "ADAMTS Inhibition",
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      gradient: "from-teal-500/10 to-transparent",
      summary: "ADAMTS enzymes destroy your 'cushioning' proteins. Luteolin blocks them.",
      problem: "ADAMTS-4 and -5 degrade aggrecan and decorin, crucial for cartilage and ligament structure.",
      solution: "Luteolin provides selective ADAMTS inhibition without blocking beneficial activity.",
      mechanisms: [
        { name: "ADAMTS-4/5", role: "Primary aggrecanases in inflammation", ingredients: ["Luteolin"] }
      ],
      keyInsight: "Luteolin is uniquely valuable for inhibiting ADAMTS-4/5 selectively."
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
      summary: "We provide therapeutic doses of Glycine, Proline, and Lysine to weave new fibers.",
      problem: "Most people have a functional glycine deficit. Without building blocks, production suffers.",
      solution: "Therapeutic doses of precursors plus essential cofactors.",
      mechanisms: [
        { name: "Glycine", role: "33% of the collagen molecule", ingredients: ["Glycine (Therapeutic)"] },
        { name: "Hydroxylation", role: "Vitamin C stabilizes the helix", ingredients: ["Sodium Ascorbate"] }
      ],
      keyInsight: "Without vitamin C, collagen cannot form a stable triple helix."
    },
    {
      id: 'crosslinking',
      icon: LinkIcon,
      title: "Strengthen the Weave",
      subtitle: "LOX Cross-Linking",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      gradient: "from-amber-500/10 to-transparent",
      summary: "Cross-linking turns weak collagen into strong tissue. We provide the essential Copper.",
      problem: "LOX absolutely requires copper. No copper = no strength.",
      solution: "We ensure the LOX system has its essential copper cofactor.",
      mechanisms: [
        { name: "Copper", role: "Essential LOX cofactor", ingredients: ["Copper Bisglycinate"] },
        { name: "Homocysteine", role: "Clearing it prevents LOX damage", ingredients: ["P5P", "Methyl B12/Folate"] }
      ],
      keyInsight: "B-vitamin deficiency destroys the LOX enzyme via homocysteine."
    },
    {
      id: 'fibroblasts',
      icon: Zap,
      title: "Energize the Builders",
      subtitle: "Fibroblast Support",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
      gradient: "from-violet-500/10 to-transparent",
      summary: "Fibroblasts are the cells that build collagen. We feed their mitochondria to keep them working.",
      problem: "hEDS fibroblasts often show signs of cellular fatigue.",
      solution: "Support fibroblast energy production and provide antioxidant defense.",
      mechanisms: [
        { name: "Mitochondrial ATP", role: "Fuel for synthesis", ingredients: ["CoQ10", "PQQ", "NR"] },
        { name: "Gene Expression", role: "Turning on collagen genes", ingredients: ["Centella Asiatica"] }
      ],
      keyInsight: "NR is dosed twice daily due to its short half-life."
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
      summary: "POTS is a mitochondrial issue. We support every step of the electron transport chain.",
      problem: "Without cellular energy, nothing else works properly.",
      solution: "Support each complex of the electron transport chain for maximum ATP.",
      mechanisms: [
        { name: "Complex I", role: "First step of ETC", ingredients: ["Benfotiamine", "R5P"] },
        { name: "NAD+ Regen", role: "Fuel for the system", ingredients: ["Nicotinamide Riboside"] }
      ],
      keyInsight: "PQQ stimulates the creation of NEW mitochondria (biogenesis)."
    },
    {
      id: 'mast-cells',
      icon: FlaskConical,
      title: "Calm Mast Cells",
      subtitle: "Mast Cell Stabilization",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      gradient: "from-rose-500/10 to-transparent",
      summary: "We use 6 compounds to stop mast cells from releasing tissue-destroying enzymes.",
      problem: "MCAS creates constant low-grade inflammation that damages tissue.",
      solution: "Six compounds with different stabilizing mechanisms.",
      mechanisms: [
        { name: "PPAR-alpha Activation", role: "Suppresses mediator release", ingredients: ["PEA (Micronized)"] },
        { name: "Membrane Stability", role: "Prevents degranulation", ingredients: ["Luteolin"] }
      ],
      keyInsight: "EMIQ offers 17x better absorption than regular quercetin."
    },
    {
      id: 'histamine',
      icon: Pill,
      title: "Process Histamine",
      subtitle: "Clearance Pathways",
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-200",
      gradient: "from-pink-500/10 to-transparent",
      summary: "We provide cofactors for DAO and HNMT to clear histamine from your system.",
      problem: "Impaired clearance makes even normal histamine levels toxic.",
      solution: "Provide essential cofactors for DAO and HNMT enzymes.",
      mechanisms: [
        { name: "DAO Enzyme", role: "Gut histamine breakdown", ingredients: ["P5P", "Copper", "Vit C"] },
        { name: "Methylation", role: "Intracellular breakdown", ingredients: ["Methylfolate", "B12"] }
      ],
      keyInsight: "DAO requires the same copper needed for collagen cross-linking."
    },
    {
      id: 'autonomic',
      icon: Brain,
      title: "Balance the Nerves",
      subtitle: "Autonomic Modulation",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      gradient: "from-cyan-500/10 to-transparent",
      summary: "We use Taurine and Magnesium to dampen the 'fight-or-flight' overdrive of POTS.",
      problem: "POTS is 'fight-or-flight' stuck in the ON position.",
      solution: "Support inhibitory neurotransmitters to restore balance.",
      mechanisms: [
        { name: "GABA-A", role: "Inhibitory system", ingredients: ["L-Theanine", "Taurine"] },
        { name: "Sympathetic Dampening", role: "Calms adrenaline", ingredients: ["Magnesium"] }
      ],
      keyInsight: "Taurine calms without sedation."
    },
    {
      id: 'cardiovascular',
      icon: Heart,
      title: "Support the Heart",
      subtitle: "Cardiovascular Function",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      gradient: "from-red-500/10 to-transparent",
      summary: "We support blood volume and vascular tone without worsening orthostatic issues.",
      problem: "Supplements must not lower blood pressure too much in POTS patients.",
      solution: "Support vascular tone and blood volume safely.",
      mechanisms: [
        { name: "Blood Volume", role: "Critical for POTS", ingredients: ["Sodium Ascorbate"] },
        { name: "Vascular Tone", role: "Vessel health", ingredients: ["Vitamin C", "Magnesium"] }
      ],
      keyInsight: "Sodium Ascorbate provides beneficial sodium for POTS patients."
    },
    {
      id: 'gi-protection',
      icon: Pill,
      title: "Protect the Gut",
      subtitle: "GI Integrity",
      color: "text-lime-600",
      bg: "bg-lime-50",
      border: "border-lime-200",
      gradient: "from-lime-500/10 to-transparent",
      summary: "Zinc Carnosine protects your gut lining so you can actually absorb these nutrients.",
      problem: "Damaged gut lining impairs absorption and increases inflammation.",
      solution: "Protect mucosa and use gentle forms of nutrients.",
      mechanisms: [
        { name: "Mucosal Protection", role: "Maintains lining", ingredients: ["Zinc Carnosine"] },
        { name: "Buffered Forms", role: "Reduces irritation", ingredients: ["Sodium Ascorbate"] }
      ],
      keyInsight: "Zinc Carnosine is clinically proven to protect gastric mucosa."
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
      title: 'Protect Existing Collagen',
      subtitle: 'Stop the enzymes that shred connective tissue before they can do damage.',
      accent: '#0F2A22',
      pathwayIds: ['mmp-inhibition', 'timps', 'transcription', 'adamts']
    },
    {
      id: 'build',
      label: 'Cluster 02',
      title: 'Build and Strengthen the New',
      subtitle: 'Provide the building blocks, cofactors, and cellular energy for synthesis and cross-linking.',
      accent: '#2D6B52',
      pathwayIds: ['synthesis', 'crosslinking', 'fibroblasts', 'vicious-cycle']
    },
    {
      id: 'calm',
      label: 'Cluster 03',
      title: 'Calm the Triggers',
      subtitle: 'Stabilize mast cells and clear histamine so the loop has nothing to feed.',
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
      {/* SECTION 1: VICIOUS CYCLE (cream) */}
      <section id="science" className="py-16 px-4 sm:px-6 bg-[#EBE8E1] scroll-mt-24">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-[#B36B4D]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B36B4D]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2D6B52]/5 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex p-3 bg-[#B36B4D]/10 rounded-2xl mb-6">
                  <RefreshCw className="w-8 h-8 text-[#B36B4D] animate-spin-slow" aria-hidden="true" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#3D3733] mb-4">The "Vicious Cycle" of hEDS &amp; MCAS</h3>
                <p className="text-[#8A857C] text-lg font-medium max-w-xl mx-auto">Understanding this biological feedback loop is key to breaking the cascade of destruction.</p>
              </div>

              {/* DESKTOP LAYOUT - THE "X" CONFIGURATION */}
              <div className="relative w-full max-w-[500px] mx-auto aspect-square hidden md:block">
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-0 rotate-45 opacity-20">
                  <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#B36B4D" strokeWidth="2" strokeDasharray="8 8" />
                </svg>

                {[
                  { id: 1, number: "1", title: "Collagen Breaks Down", desc: "Weak connective tissue degrades due to genetic/stress factors.", theme: "brown", pos: "top-0 left-0" },
                  { id: 2, number: "2", title: "Fragments Trigger Inflammation", desc: "Biological debris activates aggressive immune responses.", theme: "green", pos: "top-0 right-0" },
                  { id: 3, number: "3", title: "Mast Cells Activate", desc: "Hyper-sensitive cells release histamine and toxic chemicals.", theme: "brown", pos: "bottom-0 right-0" },
                  { id: 4, number: "4", title: "Enzymes Attack Collagen", desc: "Destructive enzymes shred remaining tissue, repeating the cycle.", theme: "green", pos: "bottom-0 left-0" }
                ].map((step) => {
                  const styles = step.theme === 'brown'
                    ? { badge: 'bg-[#B47F65] text-white', text: 'text-[#8B5E4B]' }
                    : { badge: 'bg-[#2E5C55] text-white', text: 'text-[#1F443E]' };

                  return (
                    <div key={step.id} className={`absolute w-48 h-48 flex items-center justify-center ${step.pos}`}>
                      <div className="relative w-full h-full rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center p-6 z-10 border border-gray-50 overflow-visible transition-transform hover:scale-105 duration-300">
                        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${styles.badge}`}>
                          {step.number}
                        </div>
                        <h4 className={`font-serif font-bold text-sm leading-tight mb-2 ${styles.text}`}>{step.title}</h4>
                        <p className="text-[11px] text-[#5D5752] leading-snug font-semibold">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center z-20 border border-gray-100">
                  <RefreshCw className="w-8 h-8 text-[#B36B4D]/30 animate-spin-slow" aria-hidden="true" />
                </div>
              </div>

              {/* MOBILE LAYOUT - VERTICAL STACK */}
              <div className="flex flex-col gap-6 w-full max-w-sm mx-auto md:hidden">
                {[
                  { id: 1, number: "1", title: "Collagen Breaks Down", desc: "Weak connective tissue degrades due to genetic/stress factors.", theme: "brown" },
                  { id: 2, number: "2", title: "Fragments Trigger Inflammation", desc: "Biological debris activates aggressive immune responses.", theme: "green" },
                  { id: 3, number: "3", title: "Mast Cells Activate", desc: "Hyper-sensitive cells release histamine and toxic chemicals.", theme: "brown" },
                  { id: 4, number: "4", title: "Enzymes Attack Collagen", desc: "Destructive enzymes shred remaining tissue, repeating the cycle.", theme: "green" }
                ].map((step) => {
                  const styles = step.theme === 'brown'
                    ? { badge: 'bg-[#B47F65] text-white', text: 'text-[#8B5E4B]' }
                    : { badge: 'bg-[#2E5C55] text-white', text: 'text-[#1F443E]' };

                  return (
                    <div key={step.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center relative transition-transform hover:scale-102 duration-300">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3 shadow-sm ${styles.badge}`}>
                        {step.number}
                      </div>
                      <h3 className={`font-serif font-bold text-lg mb-2 ${styles.text}`}>{step.title}</h3>
                      <p className="text-sm text-[#5D5752] leading-relaxed font-semibold">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-12 md:mt-20">
                <div className="flex items-center gap-3 px-8 py-3 rounded-full bg-[#B36B4D]/10 text-[#B36B4D] border border-[#B36B4D]/10">
                  <RefreshCw className="w-5 h-5 animate-spin-slow" aria-hidden="true" />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">The cycle repeats indefinitely</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full flex flex-col items-center justify-center pt-12 pb-4 z-20">
            <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-[#D4A373] to-[#D4A373]" aria-hidden="true" />
            <div className="bg-white border border-[#D4A373]/30 px-6 py-2 rounded-full shadow-sm text-[#8B5E4B] font-serif italic text-lg z-10 -mt-4">
              Intervention is possible
            </div>
            <div className="h-10 w-0.5 bg-[#D4A373]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* SECTION 2: DARK BAND - "14 Pathways" intro */}
      <section className="bg-[#0F2A22] py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B36B4D]/10 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D6B52]/15 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#D4A373] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
            The ZebraWell Solution
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            14 Pathways. <span className="text-[#D4A373] italic font-normal">One System.</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            We don't just patch one symptom. We flood the body with support across every major biological pathway involved in the collagen-mast cell loop, organized into four clusters of action.
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
                    <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: cluster.accent }}>
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
                              <h3 className="font-bold text-[#3D3733] text-lg leading-tight">{pathway.title}</h3>
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
                            <p className="text-[#8A857C] text-xs mt-3 line-clamp-2 leading-relaxed font-medium">
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
                                <div>
                                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                    <AlertCircle size={12} aria-hidden="true" /> The Problem
                                  </span>
                                  <p className="text-[#5D5752] mt-1 text-xs leading-relaxed">{pathway.problem}</p>
                                </div>
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
                                      <span className="block text-[#8A857C] mb-1">{mech.role}</span>
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

                              <div className={`p-4 rounded-lg ${pathway.bg} border ${pathway.border}`}>
                                <p className={`text-[9px] font-black ${pathway.color} uppercase mb-1 tracking-widest`}>Clinical Insight</p>
                                <p className="text-[#3D3733] text-xs italic font-medium leading-relaxed">"{pathway.keyInsight}"</p>
                              </div>
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#3D3733] text-white rounded-full shadow-xl hover:scale-105 transition-transform cursor-default">
              <Zap className="w-4 h-4 text-[#B36B4D]" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest uppercase">28 Ingredients - 14 Pathways - 1 System</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
