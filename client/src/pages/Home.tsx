/* client/src/pages/Home.tsx */
import { useEffect, Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory'; // Moved up
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import SampleRequestModal from '@/components/SampleRequestModal';

// LAZY LOADED COMPONENTS
const ClinicalRationale = lazy(() => import('@/components/ClinicalRationale')); 
const QualityStandards = lazy(() => import('@/components/QualityStandards')); 
const Testimonials = lazy(() => import('@/components/Testimonials'));
const FAQ = lazy(() => import('@/components/FAQ')); 

export default function Home() {
  // Preserving your existing scroll observer for "fade-in" animations
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
    <div className="min-h-screen bg-[#F2F0EA] selection:bg-[#B36B4D]/20">
      {/* GLOBAL NAVIGATION */}
      <Navigation />

      <main>
        {/* 1. HERO - The Hook */}
        <Hero />

        {/* 2. OUR STORY - Now right below the Hero (contains id="story") */}
        <OurStory />

        {/* 3. CLINICAL RATIONALE - The Science (contains id="ingredients") */}
        <Suspense fallback={<div className="h-96 bg-[#EDEAE3]" />}>
           <ClinicalRationale />
        </Suspense>

        {/* 4. QUALITY STANDARDS - The Manufacturing Trust */}
        <Suspense fallback={<div className="h-48 bg-[#F2F0EA]" />}>
           <QualityStandards />
        </Suspense>

        {/* 5. PRODUCT GRID - The Solution */}
        <div id="products" className="fade-in py-12 md:py-24">
          <ProductGrid />
        </div>

        {/* 6. SOCIAL PROOF & OBJECTIONS (contains id="faq") */}
        <Suspense fallback={<div className="h-40" />}>
           <Testimonials />
           <FAQ /> 
        </Suspense>
      </main>

      {/* GLOBAL FOOTER & UTILITIES */}
      <Footer />
      <FloatingCTA />
      <SampleRequestModal />
    </div>
  );
}