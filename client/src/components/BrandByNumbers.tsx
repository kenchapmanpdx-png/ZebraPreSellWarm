/* client/src/components/BrandByNumbers.tsx
 *
 * Four-stat "by the numbers" block. Each stat bursts in on viewport
 * entry with a slight overshoot and emits a copper ripple. Lands
 * between ExclusionsBlock and CollagenScienceSection on the homepage:
 * "here's what's NOT in it (exclusions) -> here's the numbers that
 * matter -> here's how it works (collagen science)".
 *
 * Accessibility: prefers-reduced-motion users see the same content,
 * static, no burst or ripple.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const stats = [
  {
    value: '29',
    suffix: '',
    label: 'Active ingredients',
    blurb: 'Each one mapped to a published mechanism. None included for marketing.',
  },
  {
    value: '100',
    suffix: '%',
    label: 'Third-party tested',
    blurb: 'Every batch. Heavy metals, microbials, potency. Results published.',
  },
  {
    value: '14',
    suffix: ' paths',
    label: 'Mechanism map',
    blurb: 'From MMP inhibition to mast cell stabilization to TIMP support.',
  },
  {
    value: '0',
    suffix: ' fillers',
    label: 'Excipient policy',
    blurb: 'No magnesium stearate, no titanium dioxide, no citric acid.',
  },
];

export default function BrandByNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState<boolean[]>(stats.map(() => false));

  useEffect(() => {
    if (!sectionRef.current) return;
    if (prefersReducedMotion) {
      setActive(stats.map(() => true));
      return;
    }
    const items = sectionRef.current.querySelectorAll<HTMLElement>('[data-stat-index]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.statIndex);
            // Stagger the bursts so they land in sequence, not all at once
            setTimeout(() => {
              setActive((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 160);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="by-the-numbers"
      className="relative bg-[#EBE8E1] py-20 md:py-24 px-6 overflow-hidden"
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
        {/* Editorial eyebrow + heading */}
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

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-0 relative">
          {stats.map((s, i) => {
            const isActive = active[i];
            return (
              <div
                key={s.label}
                data-stat-index={i}
                className="text-center md:px-6 relative md:after:absolute md:after:top-[15%] md:after:right-0 md:after:h-[70%] md:after:w-px md:after:bg-[#3D3733]/10 last:after:hidden"
              >
                {/* Number with ripple rings */}
                <div className="relative inline-block">
                  <div
                    className="font-serif font-bold text-[#3D3733] leading-none tracking-tight"
                    style={{
                      fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)',
                      letterSpacing: '-0.04em',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(0.5)',
                      transition:
                        'opacity 0.4s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {s.value}
                    {s.suffix && (
                      <span className="text-[#B36B4D] italic font-medium">{s.suffix}</span>
                    )}
                  </div>

                  {/* Ripple ring 1 */}
                  {isActive && !prefersReducedMotion && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full border-2 border-[#B36B4D] pointer-events-none"
                        style={{
                          transform: 'translate(-50%, -50%) scale(1)',
                          opacity: 0,
                          animation: 'bbn-ripple 1.5s 0.2s ease-out forwards',
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full border-2 border-[#B36B4D] pointer-events-none"
                        style={{
                          transform: 'translate(-50%, -50%) scale(1)',
                          opacity: 0,
                          animation: 'bbn-ripple 1.5s 0.5s ease-out forwards',
                        }}
                      />
                    </>
                  )}
                </div>

                <div
                  className="mt-5"
                  style={{
                    opacity: isActive ? 1 : 0,
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

      {/* Keyframes for the ripple. Scoped via prefix so it can't collide. */}
      <style>{`
        @keyframes bbn-ripple {
          0%   { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(20); }
        }
      `}</style>
    </section>
  );
}
