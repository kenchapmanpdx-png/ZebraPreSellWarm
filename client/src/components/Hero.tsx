/* client/src/components/Hero.tsx */
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Factory, Microscope, ArrowRight, Sparkles } from 'lucide-react';
// Ensure the image path matches your project structure
import heroProductImage from '@assets/hero-product.webp';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // The "Unseen" word cycle
  const words = ['Unseen', 'Disbelieved', 'Dismissed', 'Frustrated', 'Fighting Alone', 'Overlooked', 'Rare', 'Resilient'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "You're on the list!",
          description: "We'll notify you the moment ZebraWell is available."
        });
        setEmail('');
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Button gradient styles
  const buttonBaseStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #0F2A22 0%, #2D6B52 50%, #0F2A22 100%)',
    backgroundSize: '200% auto',
    backgroundPosition: 'left center',
    transition: 'all 0.65s ease',
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 px-6 flex flex-col justify-center min-h-screen overflow-hidden bg-[#EBE8E1]">



      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* --- EDITORIAL HEADER --- */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full bg-white/40 border border-white/60 shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B36B4D] animate-pulse" />
            <span className="text-[10px] font-black text-[#3D3733] uppercase tracking-[0.3em]">
              Formulated for Complex Conditions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="font-serif font-bold tracking-tight text-[#3D3733]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
          >
            <span className="block mb-2">Advanced Autonomic, Mast Cell</span>
            <span className="block text-[#B36B4D] italic font-normal">& Connective Tissue Support</span>
          </motion.h1>
        </div>

        {/* --- THE HOLOGRAPHIC TRINITY GRID --- */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 max-w-6xl mx-auto mb-24">

          {/* LEFT: OPT-IN CARD (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full lg:w-[35%] flex"
          >
            <div className="relative w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-center overflow-hidden group">
              {/* Subtle shimmers */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B36B4D]/30 to-transparent opacity-50" />

              <p className="text-xs font-black text-[#B36B4D] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> We see you
              </p>

              <h2 className="font-serif font-bold text-[#3D3733] mb-6 leading-tight text-3xl lg:text-4xl">
                Wellness for the <br />
                <span className="relative inline-block min-w-[200px] h-[1.2em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[currentWordIndex]}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute left-0 text-[#B36B4D]"
                    >
                      {words[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-5 px-6 bg-white/50 border border-[#3D3733]/10 rounded-2xl text-[#3D3733] text-lg focus:outline-none focus:border-[#B36B4D] focus:bg-white transition-all placeholder:text-[#8A857C]/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={buttonBaseStyle}
                  className="w-full py-5 rounded-2xl text-white font-bold uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundPosition = 'right center';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundPosition = 'left center';
                  }}
                >
                  {isSubmitting ? "Processing..." : "Join the Waitlist"}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: PRODUCT IMAGE (Glass Frame) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full lg:w-[65%] flex"
          >
            <div className="relative z-10 w-full rounded-[2.5rem] p-3 bg-white/40 backdrop-blur-sm border border-white/40 shadow-2xl">
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-[#F2F0EA]">
                <img
                  src={heroProductImage}
                  alt="ZebraWell AM and PM clinical-grade supplement formulas — physician-formulated for EDS, POTS, and MCAS"
                  width={1536}
                  height={1024}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-[time:2000ms] ease-out"
                />
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B36B4D]/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- THE COLORED TRUST BAR (Glassmorphism Edition) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="py-8 px-10 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm mx-auto max-w-5xl"
        >
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10">
            <p className="text-[9px] font-black text-[#8A857C] uppercase tracking-[0.4em] w-full md:w-auto text-center md:text-left">
              Manufacturing Standards:
            </p>

            {/* FDA Registered - Blue Icon */}
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Factory className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-[#3D3733] uppercase tracking-widest leading-none">FDA Registered</span>
                <span className="block text-[8px] font-bold text-[#8A857C] uppercase tracking-tighter mt-1">Facility</span>
              </div>
            </div>

            {/* NSF GMP - Royal Blue Icon */}
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-5 h-5 text-blue-800" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-[#3D3733] uppercase tracking-widest leading-none">NSF GMP</span>
                <span className="block text-[8px] font-bold text-[#8A857C] uppercase tracking-tighter mt-1">Certified</span>
              </div>
            </div>

            {/* Lab Tested - Copper Icon */}
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Microscope className="w-5 h-5 text-[#B36B4D]" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-[#3D3733] uppercase tracking-widest leading-none">Third-Party</span>
                <span className="block text-[8px] font-bold text-[#8A857C] uppercase tracking-tighter mt-1">Lab Tested</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}