/* client/src/components/TheSystem.tsx
 *
 * Horizontal scroll panel that walks through the four parts of the
 * ZebraWell system: Morning, Daily Powder, Evening, Together. Vertical
 * scroll inside this section is mapped to horizontal translation of
 * the card track. When the user reaches the end of the track, normal
 * vertical scrolling resumes.
 *
 * Accessibility:
 *   - prefers-reduced-motion: track stacks vertically, no transform.
 *   - Sticky pin releases on its own (no scroll-jacking).
 *   - Scroll input is always 1:1 (no momentum hijacking).
 */
import React, { useEffect, useRef, useState } from 'react';
import { Sun, Droplets, Moon, Sparkles, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const cards = [
  {
    id: 'am',
    tag: 'Morning Foundation',
    pill: 'AM Capsules',
    icon: Sun,
    iconBg: 'bg-orange-50',
    iconColor: 'text-[#B36B4D]',
    titlePlain: 'Set the day up to be',
    titleAccent: 'stable.',
    body:
      'The morning capsules carry the methylation, energy, and cross-linking nutrients your body needs at the front of the day. The work that gets the autonomic system, mitochondria, and connective tissue rebuilding pathways online.',
    bullets: [
      'Steadier energy, less morning crash',
      'Methylation support for hard-to-clear histamine',
      'Cofactors for collagen cross-linking',
    ],
  },
  {
    id: 'powder',
    tag: 'Daily Powder',
    pill: 'ECM + Mast Cell',
    icon: Droplets,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    titlePlain: 'Where the heavy',
    titleAccent: 'lifters live.',
    body:
      'The powder carries the actives that need real dose to work. Gram-scale ingredients that protect existing collagen, calm mast cells across multiple pathways, and replenish what gets used up. Mixed into water, titratable from a sprinkle.',
    bullets: [
      'Protects existing collagen from MMP-driven breakdown',
      'Multi-pathway mast cell stabilization',
      'Titratable from a sprinkle for sensitive starts',
    ],
  },
  {
    id: 'pm',
    tag: 'Evening Reset',
    pill: 'PM Capsules',
    icon: Moon,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    titlePlain: 'Help the body actually',
    titleAccent: 'recover.',
    body:
      "The evening capsules protect the gut lining, support tissue repair, and reduce the inflammatory load left over from the day so it doesn't follow you into sleep.",
    bullets: [
      'Calmer histamine load before bed',
      'Gut lining protection while you sleep',
      'Overnight connective-tissue recovery',
    ],
  },
  {
    id: 'together',
    tag: 'The Full System',
    pill: 'All three components',
    icon: Sparkles,
    iconBg: 'bg-[#B36B4D]/10',
    iconColor: 'text-[#B36B4D]',
    titlePlain: 'Three parts. One',
    titleAccent: 'system.',
    body:
      'AM capsules, daily powder, and PM capsules work as a single system. Each timed to a specific biological window. Each formulated to do one job well, rather than ten jobs adequately. Sold together, never as separates.',
    bullets: [
      'Three time-of-day formulations',
      'Twenty-nine evidence-mapped ingredients',
      'One waitlist for the full system',
    ],
  },
];

export default function TheSystem() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [, setTick] = useState(0); // force re-render for indicator if needed

  useEffect(() => {
    if (prefersReducedMotion) return;
    const wrap = wrapperRef.current;
    const track = trackRef.current;
    const prog = progressRef.current;
    if (!wrap || !track || !prog) return;

    let ticking = false;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const trackWidth = track.scrollWidth;
      const maxOffset = trackWidth - window.innerWidth + window.innerWidth * 0.12;
      track.style.transform = `translate3d(${-progress * maxOffset}px, 0, 0)`;
      prog.style.width = `${progress * 100}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [prefersReducedMotion]);

  // Reduced-motion fallback: render a clean vertical stack of the same cards.
  if (prefersReducedMotion) {
    return (
      <section className="bg-[#FBF8F2] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            The ZebraWell System
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight">
            Three parts.{' '}
            <span className="text-[#B36B4D] italic font-normal">One system.</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {cards.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-[2rem] p-8 border border-[#3D3733]/8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                  <c.icon className={`w-5 h-5 ${c.iconColor}`} aria-hidden="true" />
                </div>
                <span className="text-[10px] font-black text-[#3D3733] uppercase tracking-[0.25em]">
                  {c.tag}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3D3733] mb-3">
                {c.titlePlain}{' '}
                <span className="text-[#B36B4D] italic font-normal">{c.titleAccent}</span>
              </h3>
              <p className="text-[#5D5752] text-sm leading-relaxed mb-4">{c.body}</p>
              <ul className="space-y-2 pt-3 border-t border-[#3D3733]/10">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-[#3D3733]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B36B4D] flex-shrink-0 mt-1.5" />
                    <span className="font-medium leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FBF8F2]">
      {/* Editorial header */}
      <div className="max-w-7xl mx-auto pt-20 md:pt-28 pb-10 md:pb-14 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
        >
          The ZebraWell System
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-bold text-[#3D3733] leading-tight"
        >
          Three parts. <span className="text-[#B36B4D] italic font-normal">One system.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-5 text-[#5D5752] text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Scroll to walk through how each part works, then how they work together.
        </motion.p>
      </div>

      {/* Horizontal track wrapper: tall vertical space, sticky inner viewport */}
      <div ref={wrapperRef} className="relative" style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 will-change-transform"
            style={{ paddingLeft: '6vw', paddingRight: '6vw' }}
          >
            {cards.map((c, i) => (
              <article
                key={c.id}
                className="flex-shrink-0 w-[88vw] md:w-[420px] h-[68vh] md:h-[520px] bg-white rounded-[2rem] p-7 md:p-9 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_-20px_rgba(15,42,34,0.12)] border border-[#3D3733]/8"
              >
                {/* Decorative corner gradient */}
                <span
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-60 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(179, 107, 77, 0.18) 0%, transparent 70%)',
                  }}
                />

                {/* Top: card number + pill */}
                <header className="relative z-10 flex items-center justify-between">
                  <span
                    className="font-serif italic text-[#B36B4D] font-medium"
                    style={{ fontSize: '1.1rem', letterSpacing: '0.04em' }}
                  >
                    0{i + 1} / 04
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}
                    >
                      <c.icon className={`w-5 h-5 ${c.iconColor}`} aria-hidden="true" />
                    </div>
                    <span className="text-[9px] font-black text-[#3D3733] uppercase tracking-[0.25em]">
                      {c.pill}
                    </span>
                  </div>
                </header>

                {/* Middle: headline + body */}
                <div className="relative z-10 my-6">
                  <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.35em] mb-3">
                    {c.tag}
                  </p>
                  <h3
                    className="font-serif font-bold text-[#3D3733] leading-[1.05] tracking-tight mb-5"
                    style={{ fontSize: 'clamp(1.75rem, 2.4vw, 2.5rem)' }}
                  >
                    {c.titlePlain}{' '}
                    <span className="text-[#B36B4D] italic font-normal">{c.titleAccent}</span>
                  </h3>
                  <p className="text-[#5D5752] text-sm md:text-[15px] leading-relaxed font-medium">
                    {c.body}
                  </p>
                </div>

                {/* Bottom: bullets */}
                <footer className="relative z-10 space-y-2.5 pt-4 border-t border-[#3D3733]/10">
                  <p className="text-[9px] font-black text-[#B36B4D]/70 uppercase tracking-[0.25em] mb-1">
                    What it does
                  </p>
                  {c.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-2.5 text-[12.5px] text-[#3D3733] font-medium leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B36B4D] flex-shrink-0 mt-1.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </footer>
              </article>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-[9px] font-black text-[#8A857C] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <div className="w-40 h-[2px] bg-[#3D3733]/15 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-[#B36B4D]"
                style={{ width: '0%', transition: 'width 0.05s linear' }}
              />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#B36B4D]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
