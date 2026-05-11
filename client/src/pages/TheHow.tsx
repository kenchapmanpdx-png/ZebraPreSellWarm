/* client/src/pages/TheHow.tsx */
import Navigation from "@/components/Navigation";
import ConditionScienceTabs from "@/components/ConditionScienceTab";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SampleRequestModal from "@/components/SampleRequestModal";

export default function TheHow() {
  return (
    <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
      <Navigation />

      <main id="main-content" className="pt-24">
        {/* Patient-language intro - explains the three-layer formulation strategy */}
        <section className="px-6 py-16 md:py-24 bg-[#F2F0EA]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-10 leading-tight">
              The How
            </h1>
            <div className="space-y-6 text-lg md:text-xl text-[#3D3733] leading-relaxed">
              <p className="text-xl md:text-2xl font-serif text-[#0F2A22]">
                The formulation works at three layers because the triad pathologies overlap at three layers.
              </p>
              <p>
                <strong>For hEDS,</strong> the real problem isn't running low on collagen - it's that your body breaks it down too fast. Enzymes called MMPs go into overdrive and shred the collagen you've already built. So instead of just adding more, we focus on protecting what's there: ingredients that slow those enzymes down (pine bark, grape seed, quercetin, astaxanthin), nutrients that help collagen weave together correctly (copper, manganese), and compounds that calm the inflammation behind it all.
              </p>
              <p>
                <strong>For MCAS,</strong> no single ingredient is enough - mast cells fire through too many different switches. So we layer ingredients that calm them through different mechanisms: PEA, luteolin, quercetin, and astaxanthin each block a different trigger. Vitamin C, P5P, copper, and the methylation B-vitamins help your body clear histamine after it's released. The overlap is intentional - it's how we cover the whole pathway instead of just one piece.
              </p>
              <p>
                <strong>For POTS,</strong> most of the help comes indirectly. We support cellular energy production (NR, benfotiamine, taurine), help calm the overactive autonomic nervous system (L-theanine, the methylation B-vitamins), and reduce the mast cell and inflammation activity that drives so many POTS symptoms. Vitamin D3 has the most direct POTS evidence on the list - a 2025 study in young patients showed 74% symptom improvement at 800 IU daily.
              </p>
              <p className="border-l-4 border-[#B36B4D]/60 pl-6 py-2 bg-white/40 rounded-r-xl">
                <strong>Underneath all three layers: ruthless excipient discipline.</strong> No magnesium stearate, no titanium dioxide, no citric acid, no carrageenan, no FD&amp;C dyes, no fermented ingredients, no corn or soy derivatives. HPMC capsules. Rice hull and L-leucine as flow agents. Sodium ascorbate buffered for MCAS guts. Quality before convenience, on every line.
              </p>
            </div>
          </div>
        </section>

        {/* Deep-dive science tabs (existing clinical content) */}
        <ConditionScienceTabs />
      </main>

      <Footer />
      <FloatingCTA />
      <SampleRequestModal />
    </div>
  );
}
