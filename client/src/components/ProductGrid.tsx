import { useMemo } from 'react';
import { Sparkles, Moon, Zap, ShieldCheck } from 'lucide-react'; // FIXED: All icons now correctly imported

// Data constants preserved exactly
const amBenefits = ["Mitochondrial Energy", "Methylation Support", "Mast Cell Stabilization", "Connective Tissue"];
const pmBenefits = ["Collagen Cross-linking", "Overnight Repair", "Histamine Metabolism", "Relaxation Support"];
const powderBenefits = ["Mast Cell Stabilization", "Collagen Substrates", "MMP Inhibition", "ECM Protection"];

export default function ProductGrid() {
  return (
    <section id="products" className="py-32 md:py-48 bg-[#F7F8F7]"> {/* LUXE: Increased Breathing Room */}
      <div className="container mx-auto px-6">

        {/* Header: High-End Tracking & Minimalist Depth */}
        <div className="text-center mb-24">
          <span className="text-[#B36B4D] font-bold tracking-[0.5em] text-[10px] uppercase mb-6 block ml-[0.5em]">
            The Collection
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-[#262321] mb-8 leading-[1.1]">
            Engineered for <span className="italic font-light opacity-60">Stability</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B36B4D] mx-auto mb-8" />
          <p className="text-xl text-[#5D5752] max-w-3xl mx-auto font-light leading-relaxed">
            Targeted support for the unique physiology of EDS and POTS. 
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* AM Formula: Deep Charcoal Slate with Luxe Spacing */}
          <div className="group relative bg-[#3E4B57] rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.01]">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-12">
                <span className="border border-white/20 text-white text-[9px] font-bold tracking-[0.3em] px-4 py-2 rounded-full uppercase">
                  Morning
                </span>
                <Zap size={24} className="text-[#EDE6DE] opacity-50" />
              </div>
              <h3 className="text-4xl font-serif text-white mb-4">AM Formula</h3>
              <p className="text-[#EDE6DE] text-lg font-light leading-relaxed mb-10 opacity-80">
                Strategic mitochondrial support for sustained autonomic clarity.
              </p>
              <div className="flex flex-wrap gap-3">
                {amBenefits.map((b, i) => (
                  <span key={i} className="text-[10px] tracking-widest uppercase text-white/60 border-b border-white/10 pb-1">{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* PM Formula: Muted Graphite with Luxe Spacing */}
          <div className="group relative bg-[#4A5560] rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.01]">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-12">
                <span className="border border-white/20 text-white text-[9px] font-bold tracking-[0.3em] px-4 py-2 rounded-full uppercase">
                  Evening
                </span>
                <Moon size={24} className="text-[#A68D7E] opacity-50" />
              </div>
              <h3 className="text-4xl font-serif text-white mb-4">PM Formula</h3>
              <p className="text-[#A68D7E] text-lg font-light leading-relaxed mb-10 opacity-90">
                Overnight connective tissue repair and histamine modulation.
              </p>
              <div className="flex flex-wrap gap-3">
                {pmBenefits.map((b, i) => (
                  <span key={i} className="text-[10px] tracking-widest uppercase text-white/60 border-b border-white/10 pb-1">{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Foundation Powder: Alabaster Luxe */}
          <div className="md:col-span-2 group relative bg-white rounded-[3rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#BCC2BB]/30 overflow-hidden transition-all duration-700">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="w-20 h-20 rounded-[1.5rem] bg-[#F7F8F7] border border-[#BCC2BB]/30 flex items-center justify-center text-[#B36B4D]">
                  <ShieldCheck size={36} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[#B36B4D] font-bold tracking-[0.4em] text-[9px] uppercase mb-4 block">The Clinical Baseline</span>
                  <h3 className="text-3xl font-serif font-bold text-[#262321] mb-4">Daily Foundation Powder</h3>
                  <p className="text-[#5D5752] text-lg font-light leading-relaxed mb-8 max-w-2xl">
                      Precision-dosed nutrients crafted for high-sensitivity systems.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {powderBenefits.map((b, i) => (
                      <span key={i} className="text-[10px] tracking-widest uppercase text-[#7A8691] border-b border-[#BCC2BB]/30 pb-1">{b}</span>
                    ))}
                  </div>
                </div>
                <button className="bg-[#262321] text-white px-10 py-4 rounded-xl font-bold tracking-widest text-[11px] uppercase shadow-xl hover:bg-[#B36B4D] transition-all">
                  View Facts
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}