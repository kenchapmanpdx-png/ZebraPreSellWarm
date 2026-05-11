/* client/src/pages/Home.tsx */
import { useEffect } from 'react';
import { Link } from "wouter"; // Added for the button link
import { ArrowRight } from "lucide-react"; // Added for the button icon
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhyZebraMascot from '@/components/WhyZebraMascot';
import OurStory from '@/components/OurStory';
import ProductGrid from '@/components/ProductGrid';
import ExclusionsBlock from '@/components/ExclusionsBlock';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import SampleRequestModal from '@/components/SampleRequestModal';

// Direct imports - these were lazy-loaded but the prerender engine ships
// the Suspense fallback (empty div) for them, so 8 FAQs, the Collagen
// Shredder science framing, Quality Standards, and Testimonials were
// invisible to Google/Ahrefs/AudioEye. Loading directly ensures they
// appear in the prerendered HTML.
import CollagenScienceSection from '@/components/CollagenScienceSection';
import QualityStandards from '@/components/QualityStandards';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function Home() {
  // Scroll observer for fade-in animations
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
      {/* GLOBAL NAVIGATION */}
      <Navigation />

      <main id="main-content">
        {/* ... (Hero) */}
        <Hero />

        {/* 1.5. WHY ZEBRA - Brand Mascot Block */}
        <div className="px-6 py-12 bg-[#EBE8E1] relative z-20 -mt-12 md:-mt-20 mb-8">
          <WhyZebraMascot />
        </div>

        {/* 2. OUR STORY - Ken & Ava (Heart of the brand) */}
        <OurStory />

        {/* 2.5. EXCLUSIONS - what's NOT in the formula. Bridging principle
                  between motivation (Ava story) and execution (product grid).
                  Lands brand differentiation in seconds for MCAS-conscious scrollers. */}
        <ExclusionsBlock />

        {/* 3. QUALITY STANDARDS - The "0% Trigger" Badge & Trust */}
        <QualityStandards />

        {/* 4. THE SCIENCE SUMMARY + LINK TO DEEP DIVE */}
        <CollagenScienceSection />

        {/* THE BRIDGE BUTTON: Links to /the-how */}
        <div className="flex justify-center pb-24 -mt-8 relative z-20">
          <Link
            href="/the-how"
            className="group relative px-10 py-5 bg-[#0F2A22] text-white rounded-full font-serif font-bold tracking-wider text-sm hover:bg-[#B36B4D] transition-all shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(179,107,77,0.4)] hover:scale-105 flex items-center gap-4"
          >
            View Condition-Specific Protocols
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* 5. PRODUCT GRID - The "Clinical Collection" */}
        <div id="products" className="fade-in py-8 md:py-16">
          <ProductGrid />
        </div>

        {/* 6. SOCIAL PROOF & OBJECTIONS */}
        <Testimonials />
        <FAQ />
      </main>

      {/* GLOBAL FOOTER & UTILITIES */}
      <Footer />
      <FloatingCTA />
      <SampleRequestModal />
    </div>
  );
}