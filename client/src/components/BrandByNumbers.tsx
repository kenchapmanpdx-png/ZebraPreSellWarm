/* client/src/components/BrandByNumbers.tsx
 *
 * Four-stat "by the numbers" block. Each stat bursts in once when it
 * enters the viewport: the number snaps in with an overshoot, counts
 * up from zero, and emits two copper ripple rings that expand and
 * dissipate. Lands between ExclusionsBlock and the science section.
 *
 * Static-fallback fix (spec Section 6): the final values (29 / 100% / 14 / 0)
 * are the DEFAULT render state, so prerendered HTML, crawlers, and no-JS
 * visitors always read the real numbers - never "0% third-party tested." The
 * count-up + burst + ripple is progressive enhancement, applied only on the
 * client when motion is allowed.
 *
 * Accessibility: prefers-reduced-motion users keep the final values
 * immediately, with no burst, count-up, or ripple.
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// useLayoutEffect warns under renderToString; fall back to useEffect on the
// server so the prerender build stays clean.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const stats = [
  {
    target: 29,
    suffix: '',
    label: 'Active ingredients',
    blurb: 'Each one mapped to a published mechanism. None included for marketing.',
  },
  {
    target: 100,
    suffix: '%',
    label: 'Third-party tested',
    blurb: 'Every batch. Heavy metals, microbials, potency. Results published.',
  },
  {
    target: 14,
    suffix: ' paths',
    label: 'Mechanism map',
    blurb: 'From MMP inhibition to mast cell stabilization to TIMP support.',
  },
  {
    target: 0,
    suffix: ' fillers',
    label: 'Excipient policy',
    blurb: 'No magnesium stearate, no titanium dioxide, no citric acid.',
  },
];

export default function BrandByNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Default = final values, fully visible. This is what the server prerenders
  // and what the first client render produces (so hydration matches). Only
  // after mount do we switch into the animated "enhancement" state.
  const [enhance, setEnhance] = useState(false);
  const [active, setActive] = useState<boolean[]>(stats.map(() => true));
  const [counts, setCounts] = useState<number[]>(stats.map((s) => s.target));

  // Client-only, before paint: if motion is allowed, reset to the animation
  // start state so the count-up can play. Skipped entirely for reduced motion.
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion) return;
    setEnhance(true);
    setActive(stats.map(() => false));
    setCounts(stats.map(() => 0));
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (prefersReducedMotion) return; // values already final, nothing to animate

    const items = sectionRef.current.querySelectorAll<HTMLElement>('[data-stat-index]');

    const runCountUp = (idx: number) => {
      const target = stats[idx].target;
      if (target === 0) return; // nothing to count
      const duration = 1300;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setCounts((prev) => {
          const next = [...prev];
          next[idx] = Math.round(target * eased);
          return next;
        });
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.statIndex);
            // Stagger the bursts so they land in sequence
            setTimeout(() => {
              setActive((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              runCountUp(idx);
            }, idx * 170);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="by-the-numbers"
      className="relative bg-[#EBE8E1] py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Soft brand-color ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(179, 107, 77, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(164, 180, 148, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            By the numbers
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight max-w-3xl mx-auto">
            Built around what the{' '}
            <span className="text-[#B36B4D] italic font-normal">evidence</span> can defend.
          </h2>
          <p className="mt-5 text-[#5D5752] text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Every line in the formula has to earn its place. Here is what that looks like in numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-0">
          {stats.map((s, i) => {
            const isActive = active[i];
            // Show real values until enhancement kicks in on the client.
            const shown = enhance ? counts[i] : s.target;
            const visible = !enhance || isActive;
            return (
              <div
                key={s.label}
                data-stat-index={i}
                className="text-center md:px-6 relative md:after:absolute md:after:top-[15%] md:after:right-0 md:after:h-[70%] md:after:w-px md:after:bg-[#3D3733]/10 last:after:hidden"
              >
                {/* Number with burst + ripple rings */}
                <div className="relative inline-block">
                  <div
                    className="font-serif font-bold text-[#3D3733] leading-none tracking-tight"
                    style={{
                      fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)',
                      letterSpacing: '-0.04em',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'scale(1)' : 'scale(0.5)',
                      transition:
                        'opacity 0.4s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {shown}
                    {s.suffix && (
                      <span className="text-[#B36B4D] italic font-medium">{s.suffix}</span>
                    )}
                  </div>

                  {/* Ripple rings (fire once on burst, enhancement only) */}
                  {enhance && isActive && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-2 border-[#B36B4D] pointer-events-none"
                        style={{
                          transform: 'translate(-50%, -50%) scale(1)',
                          opacity: 0,
                          animation: 'bbn-ripple 1.6s 0.15s ease-out forwards',
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-2 border-[#B36B4D] pointer-events-none"
                        style={{
                          transform: 'translate(-50%, -50%) scale(1)',
                          opacity: 0,
                          animation: 'bbn-ripple 1.6s 0.45s ease-out forwards',
                        }}
                      />
                    </>
                  )}
                </div>

                <div
                  className="mt-5"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.4s',
                  }}
                >
                  <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.3em] mb-3">
                    {s.label}
                  </p>
                  <p className="text-[#8A857C] text-xs md:text-sm leading-relaxed font-medium max-w-[28ch] mx-auto">
                    {s.blurb}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ripple keyframes, prefixed so they cannot collide */}
      <style>{`
        @keyframes bbn-ripple {
          0%   { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0;    transform: translate(-50%, -50%) scale(17.6); }
        }
      `}</style>
    </section>
  );
}
