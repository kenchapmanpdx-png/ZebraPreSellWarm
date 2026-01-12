/* client/src/components/WhyZebra.tsx */
import { Check } from 'lucide-react';

export default function WhyZebraWell() {
  return (
    <section className="py-20 px-4 bg-[#F6F0E6]"> 
      <div className="max-w-7xl mx-auto">

        {/* The Physician Claim Callout */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white/60 backdrop-blur-md border-2 border-[#262321] rounded-3xl p-8 md:p-10 text-center shadow-xl shadow-black/5">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#262321] mb-4">
              Why <span className="text-[#B36B4D] italic font-normal">ZebraWell</span>?
            </h2>
            <p className="text-lg text-[#4A4540] leading-relaxed">
              We don't just make supplements. We engineer stability for the complex 
              interplay of <span className="font-bold">Autonomic, Mast Cell, and Connective Tissue</span> health.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Physician Grade" 
            desc="Sourced and manufactured to the highest clinical standards." 
          />
          <FeatureCard 
            title="Histamine Friendly" 
            desc="Every ingredient screened for biogenic amines and MCAS triggers." 
          />
          <FeatureCard 
            title="Bioavailable" 
            desc="Optimized delivery systems for patients with GI motility challenges." 
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#BCC2BB] hover:shadow-lg transition-shadow duration-300 group">
      <div className="w-12 h-12 rounded-full bg-[#9BA69C] flex items-center justify-center text-white mb-6 group-hover:bg-[#B36B4D] transition-colors">
        <Check size={24} strokeWidth={3} />
      </div>
      <h3 className="text-xl font-bold text-[#262321] mb-3">{title}</h3>
      <p className="text-[#5D5752] leading-relaxed">{desc}</p>
    </div>
  );
}