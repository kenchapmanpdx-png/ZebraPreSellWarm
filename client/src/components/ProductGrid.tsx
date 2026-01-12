import { Moon, Sun, ShieldCheck } from "lucide-react";

// Data constants preserved exactly
const amBenefits = [
  "Mitochondrial Energy",
  "Methylation Support",
  "Mast Cell Stabilization",
  "Connective Tissue",
];
const pmBenefits = [
  "Collagen Cross-linking",
  "Overnight Repair",
  "Histamine Metabolism",
  "Relaxation Support",
];
const powderBenefits = [
  "Mast Cell Stabilization",
  "Collagen Substrates",
  "MMP Inhibition",
  "ECM Protection",
];

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 md:py-36 bg-[#F4F2ED]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#B36B4D] font-bold tracking-[0.5em] text-[10px] uppercase mb-5 block ml-[0.5em]">
            The Collection
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-[#262321] mb-6 leading-[1.1]">
            Engineered for{" "}
            <span className="italic font-light opacity-60">Stability</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B36B4D] mx-auto mb-6" />
          <p className="text-xl text-[#5D5752] max-w-3xl mx-auto font-light leading-relaxed">
            Targeted support for the unique physiology of EDS and POTS.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* AM Formula */}
          <div className="group relative rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-[0_26px_55px_-16px_rgba(0,0,0,0.38)] transition-all duration-700 hover:scale-[1.01] bg-gradient-to-b from-[#45545E] to-[#36424A]">
            {/* Copper edge accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[#A4613A]/80" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <span className="border border-[#E6C7B3]/40 text-[#F4EDE6] text-[9px] font-semibold tracking-[0.35em] px-4 py-2 rounded-full uppercase">
                  Morning
                </span>
                <Sun size={22} className="text-[#E6C7B3] opacity-70" />
              </div>

              <h3 className="text-4xl font-serif text-white mb-4">AM Formula</h3>

              <p className="text-[#EDE6DE] text-lg font-light leading-relaxed mb-8 opacity-85">
                Strategic mitochondrial support for sustained autonomic clarity.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {amBenefits.map((b, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-widest uppercase text-white/75 border-b border-white/15 pb-1"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* PM Formula */}
          <div className="group relative rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-[0_26px_55px_-16px_rgba(0,0,0,0.38)] transition-all duration-700 hover:scale-[1.01] bg-gradient-to-b from-[#45545E] to-[#36424A]">
            {/* Copper edge accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[#A4613A]/80" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <span className="border border-white/25 text-white/85 text-[9px] font-medium tracking-[0.32em] px-4 py-2 rounded-full uppercase">
                  Evening
                </span>
                <Moon size={22} className="text-white/60" />
              </div>

              <h3 className="text-4xl font-serif text-white mb-4">PM Formula</h3>

              <p className="text-[#EDE6DE] text-lg font-light leading-relaxed mb-8 opacity-80">
                Overnight connective tissue repair and histamine modulation.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {pmBenefits.map((b, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-widest uppercase text-white/65 border-b border-white/12 pb-1"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Foundation Powder */}
          <div className="md:col-span-2 group relative bg-[#F4F2ED] rounded-[2.5rem] p-10 md:p-14 shadow-[0_18px_44px_rgba(0,0,0,0.045)] border border-[#BCC2BB]/25 overflow-hidden transition-all duration-700">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-20 h-20 rounded-[1.5rem] bg-[#F4F2ED] border border-[#BCC2BB]/25 flex items-center justify-center text-[#B36B4D] shrink-0">
                <ShieldCheck size={36} />
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="text-[#B36B4D] font-bold tracking-[0.4em] text-[9px] uppercase mb-4 block">
                  The Clinical Baseline
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#262321] mb-4">
                  Daily Foundation Powder
                </h3>
                <p className="text-[#5D5752] text-lg font-light leading-relaxed mb-7 max-w-2xl">
                  Precision-dosed nutrients crafted for high-sensitivity systems.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
                  {powderBenefits.map((b, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-widest uppercase text-[#7A8691] border-b border-[#BCC2BB]/25 pb-1"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <button className="bg-[#0F2A22] text-white px-10 py-4 rounded-xl font-bold tracking-widest text-[11px] uppercase shadow-xl hover:bg-[#14372D] active:bg-[#1A4639] transition-all focus-visible:ring-2 focus-visible:ring-[rgba(15,42,34,0.28)] shrink-0">
                View Facts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
