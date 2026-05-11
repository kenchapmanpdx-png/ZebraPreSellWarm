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
                <strong>For hEDS,</strong> the underlying problem isn't a lack of collagen - it's excessive matrix degradation. Multiple matrix metalloproteinases (MMPs) run elevated in hEDS fibroblasts, breaking down collagen faster than the body can replace it. Instead of pushing more collagen into a system that can't hold onto it, we focus on protection: inhibiting the MMPs that drive the breakdown (pine bark, grape seed, quercetin, astaxanthin, chlorogenic acid), supporting the natural enzymes that cross-link collagen properly (copper as the LOX cofactor, manganese for collagen-modifying enzymes), and quieting the chronic inflammation that amplifies MMP expression.
              </p>
              <p>
                <strong>For MCAS,</strong> we cover multiple mast cell stabilization mechanisms because no single pathway is sufficient. PEA hits the PPAR-α and ALIAmide pathways. Luteolin and quercetin block calcium influx and cytokine release. Astaxanthin disrupts FcεRI signaling. Vitamin C supports DAO directly. P5P, copper, and the methylation B-vitamins keep histamine clearance functional from the back end. Each ingredient covers a different pathway; the redundancy is the point.
              </p>
              <p>
                <strong>For POTS,</strong> the strategy is mostly indirect - supporting mitochondrial energy (NR, benfotiamine, taurine), stabilizing autonomic tone (L-theanine, the methylation stack), and reducing the mast cell and inflammatory overlap that drives so much of the dysautonomia picture. Vitamin D3 has the strongest direct POTS evidence on the list - a 2025 pediatric POTS RCT showed 74% symptom improvement at 800 IU daily.
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
