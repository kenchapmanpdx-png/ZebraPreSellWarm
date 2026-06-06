/* client/src/pages/Home.tsx */
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FindYours from '@/components/FindYours';
import BenefitsByCondition from '@/components/BenefitsByCondition';
import WhyZebraMascot from '@/components/WhyZebraMascot';
import OurStory from '@/components/OurStory';
import ComorbidityNudge from '@/components/ComorbidityNudge';
import WhyOneSystem from '@/components/WhyOneSystem';
import ProductGrid from '@/components/ProductGrid';
import ExclusionsBlock from '@/components/ExclusionsBlock';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BrandByNumbers from '@/components/BrandByNumbers';

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
  // Focus the hero email input when navigating with #hero-waitlist-email hash
  // (e.g., 'Reserve the Full System' CTA on the ProductGrid)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const focusHeroEmail = () => {
      if (window.location.hash === '#hero-waitlist-email') {
        const el = document.getElementById('hero-waitlist-email') as HTMLInputElement | null;
        if (el) {
          el.focus({ preventScroll: false });
        }
      }
    };
    // Run on mount and on subsequent hash changes
    focusHeroEmail();
    window.addEventListener('hashchange', focusHeroEmail);
    return () => window.removeEventListener('hashchange', focusHeroEmail);
  }, []);

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
        {/* 1. HERO - hook */}
        <Hero />

        {/* 2. FIND YOURS - three co-equal condition entry points (POTS / MCAS / hEDS) */}
        <FindYours />

        {/* 3. WHY ZEBRA - Brand Mascot Block */}
        <div className="px-6 py-12 bg-[#EBE8E1] relative z-20">
          <WhyZebraMascot />
        </div>

        {/* 4. OUR STORY - Ken & Ava (Heart of the brand) */}
        <OurStory />

        {/* 5. COMORBIDITY NUDGE - placed directly after Ava ("she has all three, you might too") */}
        <ComorbidityNudge />

        {/* 6. WHY ONE SYSTEM - three-way loop (replaces the old linear Vicious Cycle) */}
        <WhyOneSystem />

        {/* 7. 14 PATHWAYS - mechanism depth */}
        <CollagenScienceSection />

        {/* 7.5 BENEFITS BY CONDITION - how much of the 29-active system works for a single condition */}
        <BenefitsByCondition />

        {/* 8. NINE TRIGGERS - what's NOT in the formula */}
        <ExclusionsBlock />

        {/* 9. BY THE NUMBERS - animated stat band (29 / 100% / 14 / 0) */}
        <BrandByNumbers />

        {/* 10. CLINICAL QUALITY - FDA / GMP / third-party */}
        <QualityStandards />

        {/* 11. PRODUCT GRID - The "Clinical Collection" */}
        <div id="products" className="fade-in py-8 md:py-16">
          <ProductGrid />
        </div>

        {/* 12. SOCIAL PROOF & OBJECTIONS */}
        <Testimonials />
        <FAQ />
      </main>

      {/* GLOBAL FOOTER & UTILITIES */}
      <Footer />
      <FloatingCTA />
    </div>
  );
}
