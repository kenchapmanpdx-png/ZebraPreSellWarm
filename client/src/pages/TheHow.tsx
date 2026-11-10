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
                The formula is organized in three layers that reflect body systems often discussed together in this community: connective tissue, mast cells, and energy and nervous system balance.
              </p>
              <p>
                <strong>Connective tissue.</strong> Our approach looks at both sides of normal collagen turnover: breakdown and building. Enzymes called MMPs break collagen down as part of normal turnover. Pine bark, grape seed and quercetin have been studied for effects on MMPs in lab studies, copper is needed by the enzyme that cross-links collagen, manganese is used by enzymes involved in collagen formation, and we include compounds studied for a balanced inflammatory response.
              </p>
              <p>
                <strong>Mast cells.</strong> Mast cells respond to many different signals. In lab studies, PEA and luteolin act on different mast cell pathways; these effects have not been confirmed in people at the amounts in this formula. Copper is part of DAO, an enzyme the body uses to break down histamine, and vitamin C, vitamin B6 and the methylation B-vitamins are involved in normal histamine metabolism. The overlap is intentional.
              </p>
              <p>
                <strong>Energy and nervous system.</strong> Benfotiamine, riboflavin and other B-vitamins contribute to normal energy metabolism, and NR supports NAD+ levels. L-theanine has been studied in small trials for short-term stress. Vitamin D3 supports normal immune and muscle function. We include 2,000 IU because many people do not get enough vitamin D; ask your doctor whether your levels should be checked.
              </p>
              <p className="border-l-4 border-[#B36B4D]/60 pl-6 py-2 bg-white/40 rounded-r-xl">
                <strong>Underneath all three layers: ruthless excipient discipline.</strong> We formulate without magnesium stearate, titanium dioxide, carrageenan or FD&amp;C dyes. We are still confirming with suppliers that no carrier contains citric acid or soy-derived tocopherols, and we avoid fermentation-made ingredients where a practical alternative exists. Vitamin C, vitamin B2 and vitamin B12 are made commercially with a fermentation step, so we say so on their ingredient pages. HPMC capsules. Rice hull concentrate and L-leucine as flow agents (L-leucine is usually made by fermentation; we are confirming our supplier's process). We list every carrier we have confirmed, and we mark the ones still being confirmed with our suppliers. Vitamin C as buffered sodium ascorbate, which is less acidic than ascorbic acid. Quality before convenience, on every line.
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
