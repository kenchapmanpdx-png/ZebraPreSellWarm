/* client/src/components/Hero.tsx */
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Factory, Microscope, ArrowRight, Sparkles, Check, Clock } from 'lucide-react';
import heroProductImage from '@assets/hero-product.webp';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const magneticRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const words = ['Unseen', 'Disbelieved', 'Dismissed', 'Frustrated', 'Fighting Alone', 'Overlooked', 'Rare', 'Resilient'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  // Magnetic gradient: copper light follows cursor across the hero
  // Respects prefers-reduced-motion (no listener attached when set)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = magneticRef.current;
    if (!el) return;
    let ticking = false;
    let nextX = 50;
    let nextY = 50;
    const handleMove = (e: MouseEvent) => {
      nextX = (e.clientX / window.innerWidth) * 100;
      nextY = (e.clientY / window.innerHeight) * 100;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            el.style.setProperty('--mx', nextX + '%');
            el.style.setProperty('--my', nextY + '%');
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [prefersReducedMotion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hp = (document.getElementById('hero-website-hp') as HTMLInputElement | null)?.value || '';
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website: hp }),
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

  const buttonBaseStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to right, #0F2A22 0%, #2D6B52 50%, #0F2A22 100%)',
    backgroundSize: '200% auto',
    backgroundPosition: 'left center',
    transition: 'all 0.65s ease',
  };

  const benefits = [
    "Founder pricing locked in for first batch",
    "First access when bottles ship",
    "No spam, ever - one email at launch",
  ];

  // Line-rise variants for the headline
  const headlineContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  };
  const lineRise = {
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
  };
  const lineRiseSweep = {
    hidden: { y: '110%', backgroundPosition: '0% 50%' },
    visible: {
      y: 0,
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
        backgroundPosition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 },
      },
    },
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 px-6 flex flex-col justify-center min-h-screen overflow-hidden bg-[#EBE8E1]">
      {/* MAGNETIC GRADIENT LAYER (behind content). Cursor-following copper
          light + soft sage counter-glow on the opposite side. Blurred so it
          reads as ambient light, not as a defined shape. Pointer-events
          disabled so it never intercepts clicks. */}
      <div
        ref={magneticRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(60vw 50vw at var(--mx, 50%) var(--my, 50%), rgba(179, 107, 77, 0.28) 0%, transparent 55%),
            radial-gradient(50vw 40vw at calc(100% - var(--mx, 50%)) calc(100% - var(--my, 50%)), rgba(164, 180, 148, 0.22) 0%, transparent 55%)
          `,
          filter: 'blur(40px)',
          transition: 'background 0.35s ease-out',
        }}
      />

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

          {/* HEADLINE: line-by-line rise. Italic accent line gets a copper
              gradient sweep that loops gently after the initial rise. */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="font-serif font-bold tracking-tight text-[#3D3733]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            <span className="block overflow-hidden pb-1 mb-1">
              <motion.span variants={lineRise} className="block">
                Advanced Autonomic, Mast Cell
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={lineRiseSweep}
                className="block italic font-normal"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #8E5433 0%, #D88660 25%, #B36B4D 50%, #D88660 75%, #8E5433 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                &amp; Connective Tissue Support
              </motion.span>
            </span>
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B36B4D]/30 to-transparent opacity-50" />

              {/* Microbadge: scarcity / urgency */}
              <div className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1 rounded-full bg-[#B36B4D]/10 border border-[#B36B4D]/20">
                <Clock className="w-3 h-3 text-[#B36B4D]" aria-hidden="true" />
                <span className="text-[9px] font-black text-[#B36B4D] uppercase tracking-[0.25em]">
                  Pre-launch waitlist open
                </span>
              </div>

              <p className="text-xs font-black text-[#B36B4D] uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4" aria-hidden="true" /> We see you
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

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Honeypot */}
                <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                  <label htmlFor="hero-website-hp">Website (leave blank)</label>
                  <input id="hero-website-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="relative">
                  <label htmlFor="hero-waitlist-email" className="sr-only">Email address for waitlist signup</label>
                  <input
                    id="hero-waitlist-email"
                    type="email"
                    placeholder="Email Address"
                    aria-label="Email address for waitlist signup"
                    autoComplete="email"
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
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>

              {/* Benefit lines below the button */}
              <ul className="mt-7 space-y-2.5 pt-5 border-t border-[#3D3733]/8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B36B4D]/15 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3 text-[#B36B4D]" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-[#3D3733] font-medium leading-snug">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* RIGHT: PRODUCT IMAGE */}
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
                  alt="ZebraWell AM and PM clinical-grade supplement formulas for EDS, POTS, and MCAS"
                  width={1536}
                  height={1024}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#B36B4D]/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- TRUST BAR --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="py-7 px-8 md:px-12 bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-md mx-auto max-w-5xl"
        >
          <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.4em] text-center mb-5">
            Manufacturing Standards
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">

            <div className="flex items-center gap-4 group cursor-default flex-1 justify-center md:justify-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Factory className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-black text-[#3D3733] uppercase tracking-widest leading-tight">FDA Registered</span>
                <span className="block text-[10px] font-semibold text-[#8A857C] uppercase tracking-wider mt-0.5">Facility</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-[#3D3733]/10" aria-hidden="true" />

            <div className="flex items-center gap-4 group cursor-default flex-1 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6 text-blue-800" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-black text-[#3D3733] uppercase tracking-widest leading-tight">NSF GMP</span>
                <span className="block text-[10px] font-semibold text-[#8A857C] uppercase tracking-wider mt-0.5">Certified</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-[#3D3733]/10" aria-hidden="true" />

            <div className="flex items-center gap-4 group cursor-default flex-1 justify-center md:justify-end">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Microscope className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-black text-[#3D3733] uppercase tracking-widest leading-tight">Third-Party</span>
                <span className="block text-[10px] font-semibold text-[#8A857C] uppercase tracking-wider mt-0.5">Lab Tested</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
