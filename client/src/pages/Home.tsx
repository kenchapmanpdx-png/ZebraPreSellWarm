import { useEffect, Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhyZebra from '@/components/WhyZebra'; // POINTING TO THE NEW FILE
import OurStory from '@/components/OurStory';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import SampleRequestModal from '@/components/SampleRequestModal';

// LAZY LOAD HEAVY COMPONENTS
const InteractiveIngredientMap = lazy(() => import('@/components/InteractiveIngredientMap'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const DifferenceSection = lazy(() => import('@/components/DifferenceSection'));
const WhatYouGet = lazy(() => import('@/components/WhatYouGet'));
const ClinicalRationale = lazy(() => import('@/components/ClinicalRationale')); 
const FAQ = lazy(() => import('@/components/FAQ')); 

export default function Home() {
  // Scroll animation functionality
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1, 
    });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F2]">
      <Navigation />

      <main>
        {/* 1. HERO */}
        <Hero />

        {/* 2. COMPACT BANNER (The new Beige Strip) */}
        <WhyZebra />

        {/* 3. STORY */}
        <OurStory />

        {/* 4. CLINICAL PROOF */}
        <Suspense fallback={<div className="h-96 bg-[#FBF8F2]" />}>
           <ClinicalRationale />
           <DifferenceSection />
        </Suspense>

        {/* 5. PRODUCTS */}
        <div id="products">
          <ProductGrid />
        </div>

        {/* 6. INTERACTIVE MAP */}
        <Suspense fallback={<div className="h-96" />}>
          <InteractiveIngredientMap />
        </Suspense>

        {/* 7. CLOSING INFO */}
        <Suspense fallback={<div className="h-20" />}>
           <WhatYouGet />
           <Testimonials />
           <FAQ /> 
        </Suspense>
      </main>

      <Footer />
      <FloatingCTA />
      <SampleRequestModal />
    </div>
  );
}