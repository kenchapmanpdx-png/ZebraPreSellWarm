/* client/src/pages/TheHow.tsx */
import Navigation from "@/components/Navigation";
import ConditionScienceTabs from "@/components/ConditionScienceTab";
import IngredientByCondition from "@/components/IngredientByCondition";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

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
                The formulation is organized in three layers because the biology behind the triad overlaps in three places.
              </p>
              <p>
                <strong>For hEDS,</strong> our focus is protecting the collagen you have, not just adding more. Enzymes called MMPs break collagen down as part of normal turnover, so we include ingredients studied for supporting a healthy MMP balance (pine bark, grape seed, quercetin, astaxanthin), nutrients that help collagen cross-link correctly (copper, manganese), and compounds that support a calm inflammatory response.
              </p>
              <p>
                <strong>For MCAS,</strong> mast cells respond to many different signals, so we layer ingredients that support mast cell stability through different mechanisms: in lab research, PEA, luteolin, quercetin, and astaxanthin each act on a different pathway. Copper, vitamin C, and the methylation B-vitamins (with P5P) support the body's normal histamine breakdown. The overlap is intentional.
              </p>
              <p>
                <strong>For POTS,</strong> the support is indirect. We support cellular energy production (NR, benfotiamine, taurine), a balanced stress response (L-theanine, magnesium, the methylation B-vitamins), and normal mast cell and inflammatory balance. Vitamin D3 is the ingredient with the most POTS-specific research: a 2025 retrospective study of 65 children with POTS (no placebo group) reported that about three in four had improved symptom scores after two months of 800 IU daily vitamin D. That is an observational finding in children, not a result for this formula.
              </p>
              <p className="border-l-4 border-[#B36B4D]/60 pl-6 py-2 bg-white/40 rounded-r-xl">
                <strong>Underneath all three layers: ruthless excipient discipline.</strong> No magnesium stearate, no titanium dioxide, no citric acid, no carrageenan, no FD&amp;C dyes, no soy derivatives, and no fermentation-derived ingredients where a non-fermented form exists. HPMC capsules. Rice hull concentrate and L-leucine as flow agents. Every carrier we have confirmed is listed, down to the milligram. Sodium ascorbate buffered for MCAS guts. Quality before convenience, on every line.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive condition-filter explorer (new) */}
        <IngredientByCondition />

        {/* Deep-dive science tabs (existing clinical content) */}
        <ConditionScienceTabs />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
