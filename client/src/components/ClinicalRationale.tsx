import React from 'react';
import { Brain, Heart, Activity, Shield, Zap, Droplets } from 'lucide-react';

export default function ClinicalRationale() {
  const benefits = [
    {
      icon: <Activity className="w-8 h-8 text-[#B36B4D]" />, // NEW: Muted Copper
      title: "Autonomic Balance",
      description: "Supports the nervous system to help manage heart rate and blood pressure fluctuations common in POTS."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#262321]" />, // NEW: Deep Umber
      title: "Mast Cell Stabilization",
      description: "Ingredients selected to be low-histamine and gentle, avoiding triggers for MCAS patients."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#B36B4D]" />, // NEW: Muted Copper
      title: "Connective Tissue Support",
      description: "Nutrients that aid in collagen synthesis and joint stability for Ehlers-Danlos Syndrome."
    },
    {
      icon: <Brain className="w-8 h-8 text-[#262321]" />, // NEW: Deep Umber
      title: "Brain Fog Reduction",
      description: "Targeted support for cognitive clarity and mental energy levels."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#B36B4D]" />, // NEW: Muted Copper
      title: "Cardiovascular Health",
      description: "Promotes healthy blood flow and circulation to reduce dizziness and fatigue."
    },
    {
      icon: <Droplets className="w-8 h-8 text-[#262321]" />, // NEW: Deep Umber
      title: "Optimal Absorption",
      description: "Bioavailable forms of vitamins and minerals to ensure your body actually uses them."
    }
  ];

  return (
    <section className="py-20 bg-[#DED9D0] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#B36B4D] font-bold tracking-widest uppercase text-sm mb-2 block">
            The Science
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#262321] mb-4">
            Why Each Ingredient Matters
          </h2>
          <p className="text-lg text-[#5D5752]">
            We don't do "fairy dusting." Every ingredient is included at a therapeutic dose to target specific mechanisms in POTS, EDS, and MCAS.
          </p>
        </div>

        {/* GRID LAYOUT - Preserved Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-white border border-[#BCC2BB] hover:border-[#B36B4D]/40 hover:shadow-xl transition-all duration-300 group" // NEW: Cool Gray-Green Border
            >
              <div className="mb-4 p-3 bg-[#F7F8F7] rounded-xl inline-block shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#262321] mb-3">
                {item.title}
              </h3>
              <p className="text-[#5D5752] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}