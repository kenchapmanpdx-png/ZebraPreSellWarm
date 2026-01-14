/* client/src/components/ClinicalRationale.tsx */
import React, { useState, Suspense, lazy } from 'react';
import { ShieldCheck, Zap, Activity, ChevronDown, Scissors, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load the map to keep the page fast
const InteractiveIngredientMap = lazy(() => import('./InteractiveIngredientMap'));

export default function ClinicalRationale() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const pillars = [
    {
      id: "shredder",
      number: "01",
      title: "Halt the 'Collagen Shredder'",
      desc: "In hEDS, your body overproduces enzymes (MMPs) that act like a shredder, breaking down collagen faster than you can build it. We don't just add fuel; we unplug the shredder.",
      icon: <Scissors className="w-8 h-8 text-white" />,
      color: "bg-rose-500", // Visually signaling 'stopping' the damage
      gradient: "from-rose-500/20 to-transparent"
    },
    {
      id: "hydration",
      number: "02",
      title: "Cellular 'Backdoor' Hydration",
      desc: "Salt pills often sit in the stomach, causing nausea. We use a glucose-transport mechanism to open a biological 'backdoor,' flooding cells with hydration instantly without the gastric distress.",
      icon: <Zap className="w-8 h-8 text-white" />,
      color: "bg-blue-500",
      gradient: "from-blue-500/20 to-transparent"
    },
    {
      id: "trigger",
      number: "03",
      title: "The Zero-Trigger Guarantee",
      desc: "Mast cells are finicky. We manually screen every milligram for biogenic amines and hidden histamine. No fermented fillers. No bovine gelatin. Just pure stability.",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      color: "bg-emerald-500",
      gradient: "from-emerald-500/20 to-transparent"
    },
    {
      id: "sync",
      number: "04",
      title: "Autonomic Synchronization",
      desc: "You shouldn't have to choose between 'brain fog' and 'jitters.' Our AM/PM system is timed to your circadian rhythm—calming adrenaline in the morning, repairing tissue at night.",
      icon: <Activity className="w-8 h-8 text-white" />,
      color: "bg-violet-500",
      gradient: "from-violet-500/20 to-transparent"
    }
  ];

  return (
    // Updated background to #EBE8E1 (Greige) to match your preference
    <section id="ingredients" className="py-24 md:py-32 px-4 sm:px-6 bg-[#EBE8E1] scroll-mt-24 overflow-hidden relative">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#B36B4D]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-[#0F2A22]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- THE HEADLINE: PUNCHY & COHESIVE --- */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#3D3733]/10 bg-white/50 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#B36B4D] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3D3733]">Clinical Intelligence</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-5xl md:text-8xl font-serif font-bold text-[#3D3733] leading-[0.9] tracking-tight"
          >
            One System. <br />
            <span className="text-[#B36B4D] italic">Every Pathway.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-lg md:text-2xl text-[#5D5752] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            We didn't just build a supplement. We engineered a biological intervention to interrupt the cycle of instability.
          </motion.p>
        </div>

        {/* --- THE 4-PART SYSTEM (Holographic Depth) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden group rounded-[2.5rem] bg-white border border-[#3D3733]/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(90,62,43,0.15)] transition-all duration-500"
            >
              {/* Dynamic Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

              <div className="p-8 md:p-12 relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${pillar.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {pillar.icon}
                  </div>
                  <span className="text-6xl font-serif font-bold text-[#3D3733]/5 group-hover:text-[#3D3733]/10 transition-colors">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4 group-hover:text-[#B36B4D] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-[#8A857C] text-base md:text-lg leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- THE INTERACTIVE MAP REVEAL --- */}
        <motion.div layout className="relative z-20">
          <button 
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            className={`w-full relative overflow-hidden group rounded-[3rem] transition-all duration-700 ${isMapExpanded ? 'p-0 shadow-none' : 'p-[2px] shadow-2xl hover:shadow-[0_40px_80px_-20px_rgba(15,42,34,0.3)]'}`}
          >
            {/* Animate the border gradient */}
            {!isMapExpanded && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A22] via-[#B36B4D] to-[#0F2A22] animate-shimmer" />
            )}

            <div className={`relative bg-[#0F2A22] rounded-[3rem] px-8 py-12 md:py-16 md:px-20 text-center transition-all duration-500 ${isMapExpanded ? 'bg-transparent' : 'bg-[#0F2A22]'}`}>
              {!isMapExpanded ? (
                <div className="flex flex-col items-center gap-6">
                  <Sparkles className="w-10 h-10 text-[#B36B4D] animate-pulse" />
                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                    Explore the Clinical Logic
                  </h3>
                  <p className="text-[#EDEAE3]/80 text-sm md:text-lg max-w-xl mx-auto">
                    Click to reveal the ingredient-to-benefit map. See exactly how we target mitochondrial health, mast cell stability, and collagen protection.
                  </p>
                  <div className="mt-4 px-8 py-3 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md group-hover:bg-white group-hover:text-[#0F2A22] transition-all">
                    Open Intelligence Map
                  </div>
                </div>
              ) : (
                // This is the container for the map once expanded
                <div className="bg-white rounded-[3rem] border border-[#3D3733]/10 shadow-2xl overflow-hidden p-8 md:p-12">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-serif font-bold text-[#3D3733]">Clinical Formulation Map</h3>
                      <div 
                        onClick={(e) => { e.stopPropagation(); setIsMapExpanded(false); }}
                        className="cursor-pointer px-6 py-2 bg-[#F2F0EA] hover:bg-[#E5E0D6] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3D3733] transition-colors"
                      >
                        Close Map
                      </div>
                   </div>
                   <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Data...</div>}>
                      <InteractiveIngredientMap />
                   </Suspense>
                </div>
              )}
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}