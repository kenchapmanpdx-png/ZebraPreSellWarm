import { useEffect, Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import SampleRequestModal from '@/components/SampleRequestModal';

// LAZY LOAD THE MERGED POWERHOUSE
const ClinicalRationale = lazy(() => import('@/components/ClinicalRationale')); 
const Testimonials = lazy(() => import('@/components/Testimonials'));
const FAQ = lazy(() => import('@/components/FAQ')); 

export default function Home() {
  // Maintaining your existing scroll observer
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
    <div className="min-h-screen bg-[#EBE8E1]"> {/* Base Greige Background */}
      <Navigation />

      <main>
        {/* 1. HERO */}
        <Hero />

        {/* 2. STORY */}
        <OurStory />

        {/* 3. CLINICAL LOGIC (Replaces WhyZebra, DifferenceSection, and Map) */}
        <Suspense fallback={<div className="h-96 bg-[#DED9D0]" />}>
           <ClinicalRationale />
        </Suspense>

        {/* 4. PRODUCTS */}
        <div id="products" className="fade-in">
          <ProductGrid />
        </div>

        {/* 5. CLOSING INFO */}
        <Suspense fallback={<div className="h-20" />}>
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