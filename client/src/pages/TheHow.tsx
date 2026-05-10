/* client/src/pages/TheHow.tsx */
import Navigation from "@/components/Navigation";
import ConditionScienceTabs from "@/components/ConditionScienceTab"; 
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SampleRequestModal from "@/components/SampleRequestModal";

export default function TheHow() {
  return (
    <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
      {/* 1. Global Nav */}
      <Navigation />

      <main id="main-content" className="pt-24">
        {/* 2. The Deep Dive Science Component */}
        <ConditionScienceTabs />
      </main>

      {/* 3. Footer & Sticky Elements */}
      <Footer />
      <FloatingCTA />
      <SampleRequestModal />
    </div>
  );
}