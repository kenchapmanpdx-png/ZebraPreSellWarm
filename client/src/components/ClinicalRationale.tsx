import React, { useState, Suspense, lazy } from 'react';
import { ShieldCheck, Zap, Activity, ChevronDown, Microscope, Award, HeartHandshake, Scissors } from 'lucide-react';

const InteractiveIngredientMap = lazy(() => import('./InteractiveIngredientMap'));

export default function ClinicalRationale() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const pillars = [
    {
      number: "01",
      title: "Stop the 'Collagen Shredder'",
      desc: "If you have EDS, your body produces enzymes (MMPs) that act like a shredder, eating your collagen as fast as you can build it. We don't just give you collagen 'bricks'; we include ingredients designed to turn off the shredder so your tissue stays strong.",
      icon: <Scissors className="w-5 h-5 text-[#B36B4D]" />
    },
    {
      number: "02",
      title: "Cellular 'Backdoor' Hydration",
      desc: "Standard salt pills often sit in your stomach causing nausea. We use a biological 'backdoor' (the SGLT1 pathway) to flood your cells with hydration instantly, skipping the gastric distress common with POTS.",
      icon: <Zap className="w-5 h-5 text-[#BCC2BB]" />
    },
    {
      number: "03",
      title: "The Zero-Trigger Guarantee",
      desc: "Standard 'health' supplements use fillers like fermented yeast or bovine triggers that cause mast cell flares. We manually screen every speck of our formula to ensure it is 100% free of biogenic amines and hidden histamine triggers.",
      icon: <ShieldCheck className="w-5 h-5 text-[#0F2A22]" />
    },
    {
      number: "04",
      title: "Nervous System Synchronization",
      desc: "You shouldn't have to choose between 'brain fog' and 'jitters.' Our AM/PM system stabilizes your autonomic rhythm, calming adrenaline surges in the morning and clearing histamine 'heaviness' while you sleep.",
      icon: <Activity className="w-5 h-5 text-[#A4613A]" />
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#DED9D0] fade-in">
      <div className="max-w-7xl mx-auto">

        {/* Punchier Editorial Header */}
        <div className="max-w-4xl mb-24">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#5A3E2B] mb-8 leading-[1.05]">
            Engineered for <br />
            <span className="text-[#A4613A] italic font-normal">Biological Stability.</span>
          </h2>
          <div className="max-w-xl border-l-4 border-[#A4613A] pl-8">
            <p className="text-xl md:text-2xl text-[#4A4540] leading-relaxed font-medium italic">
              "We didn't just build a supplement. We built a system to stop the flare-ups, the fog, and the collagen breakdown that others ignore."
            </p>
          </div>
        </div>

        {/* High-Impact Numerical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 mb-32">
          {pillars.map((pillar, index) => (
            <div key={index} className="relative group">
              <span className="absolute -top-12 -left-4 text-8xl font-serif font-bold text-[#A4613A]/10 group-hover:text-[#A4613A]/20 transition-colors duration-500">
                {pillar.number}
              </span>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border border-[#BCC2BB]/50">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#262321]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-[#4A4540] text-lg md:text-xl leading-relaxed max-w-md font-medium">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* THE "CLICK HERE" SCIENCE DRAWER */}
        <div className="mt-20">
          <button 
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            className={`w-full py-10 flex flex-col md:flex-row items-center justify-between px-10 rounded-[2.5rem] transition-all duration-700 border-2
                       ${isMapExpanded 
                         ? 'bg-white border-[#A4613A] shadow-2xl' 
                         : 'bg-[#BCC2BB]/30 border-[#7A8691]/20 hover:border-[#A4613A] hover:bg-white hover:shadow-xl'}`}
          >
            <div className="flex items-center gap-8 text-left mb-6 md:mb-0">
              <div className={`p-4 rounded-full border-2 border-[#A4613A] transition-all duration-500 ${isMapExpanded ? 'bg-[#A4613A] rotate-180' : 'bg-white shadow-sm'}`}>
                <ChevronDown className={`w-8 h-8 transition-colors ${isMapExpanded ? 'text-white' : 'text-[#A4613A]'}`} />
              </div>

              <div>
                <span className="block text-2xl md:text-4xl font-serif font-bold text-[#262321]">
                  Click here to see the science for yourself.
                </span>
                <span className="text-[#A4613A] text-sm uppercase tracking-[0.4em] font-bold mt-2 block">
                  Explore our Clinical Ingredient-to-Benefit Map
                </span>
              </div>
            </div>

            <div className={`hidden md:flex p-4 rounded-full border-2 border-[#A4613A] transition-all duration-500 ${isMapExpanded ? 'bg-[#A4613A] rotate-180' : 'bg-white shadow-sm'}`}>
              <ChevronDown className={`w-8 h-8 transition-colors ${isMapExpanded ? 'text-white' : 'text-[#A4613A]'}`} />
            </div>
          </button>

          {isMapExpanded && (
            <div className="py-12 animate-in fade-in zoom-in-95 duration-700">
              <div className="bg-white rounded-[4rem] p-4 md:p-16 shadow-2xl border-4 border-[#EBE8E1]">
                <Suspense fallback={
                  <div className="h-96 flex flex-col items-center justify-center font-serif italic text-2xl text-[#4A4540] gap-4 text-center">
                    <div className="w-12 h-12 border-4 border-[#A4613A] border-t-transparent rounded-full animate-spin"></div>
                    Accessing Clinical Rationale...
                  </div>
                }>
                   <InteractiveIngredientMap />
                </Suspense>
              </div>
            </div>
          )}
        </div>

        {/* TRUST CARDS */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] border border-white text-center hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-[#0F2A22] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A4613A] transition-colors shadow-lg">
                    <Microscope className="text-white w-8 h-8" />
                </div>
                <p className="text-[#A4613A] font-bold uppercase tracking-widest text-xs mb-2">Purity</p>
                <p className="text-[#262321] font-serif font-bold text-2xl mb-2">Third-Party Tested</p>
                <p className="text-[#5D5752] text-sm leading-relaxed">Every batch verified for potency and zero contaminants.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] border border-white text-center hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-[#0F2A22] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A4613A] transition-colors shadow-lg">
                    <Award className="text-white w-8 h-8" />
                </div>
                <p className="text-[#A4613A] font-bold uppercase tracking-widest text-xs mb-2">Expertise</p>
                <p className="text-[#262321] font-serif font-bold text-2xl mb-2">Physician Formulated</p>
                <p className="text-[#5D5752] text-sm leading-relaxed">Built on clinical research specifically for POTS & EDS.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] border border-white text-center hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-[#0F2A22] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A4613A] transition-colors shadow-lg">
                    <HeartHandshake className="text-white w-8 h-8" />
                </div>
                <p className="text-[#A4613A] font-bold uppercase tracking-widest text-xs mb-2">Safety</p>
                <p className="text-[#262321] font-serif font-bold text-2xl mb-2">Trigger-Free Guarantee</p>
                <p className="text-[#5D5752] text-sm leading-relaxed">Screened for biogenic amines and all mast cell triggers.</p>
            </div>
        </div>

      </div>
    </section>
  );
}