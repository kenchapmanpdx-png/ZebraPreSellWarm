/* client/src/components/BrandByNumbers.tsx
 *
 * Four-stat "by the numbers" block. Each number counts up from zero,
 * scrubbed directly to scroll position via GSAP ScrollTrigger: as the
 * section travels through the viewport the digits climb in real time,
 * and reverse if the user scrolls back up. Lands between ExclusionsBlock
 * and the science section on the homepage.
 *
 * Accessibility: prefers-reduced-motion users see the same content with
 * final values shown immediately, no scrubbing.
 */
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  {
    target: 29,
    display: (n: number) => String(n),
    suffix: '',
    label: 'Active ingredients',
    blurb: 'Each one mapped to a published mechanism. None included for marketing.',
  },
  {
    target: 100,
    display: (n: number) => String(n),
    suffix: '%',
    label: 'Third-party tested',
    blurb: 'Every batch. Heavy metals, microbials, potency. Results published.',
  },
  {
    target: 14,
    display: (n: number) => String(n),
    suffix: ' paths',
    label: 'Mechanism map',
    blurb: 'From MMP inhibition to mast cell stabilization to TIMP support.',
  },
  {
    target: 0,
    display: (n: number) => String(n),
    suffix: ' fillers',
    label: 'Excipient policy',
    blurb: 'No magnesium stearate, no titanium dioxide, no citric acid.',
  },
];

export default function BrandByNumbers() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const items = q('[data-stat]') as HTMLElement[];

      items.forEach((item, i) => {
        const numEl = item.querySelector('[data-stat-num]') as HTMLElement;
        const target = Number(item.dataset.target);
        const suffix = item.dataset.suffix || '';
        const counter = { v: 0 };

        // Dimmed start state
        gsap.set(item, { opacity: 0.15, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            end: 'top 22%',
            scrub: 0.6,
          },
        });

        // Stagger each stat across the scrub window
        const slot = i * 0.12;
        tl.to(item, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, slot);
        tl.to(
          counter,
          {
            v: target,
            duration: 0.7,
            ease: 'power1.out',
            onUpdate: () => {
              if (numEl) numEl.textContent = Math.round(counter.v) + suffix;
            },
          },
          slot
        );
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={rootRef}
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
            Every line in the formula has to earn its place. Scroll, and watch what that looks like in numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-0">
          {stats.map((s) => (
            <div
              key={s.label}
              data-stat
              data-target={s.target}
              data-suffix={s.suffix}
              className="text-center md:px-6 relative md:after:absolute md:after:top-[15%] md:after:right-0 md:after:h-[70%] md:after:w-px md:after:bg-[#3D3733]/10 last:after:hidden"
            >
              <div
                className="font-serif font-bold text-[#3D3733] leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)', letterSpacing: '-0.04em' }}
              >
                <span data-stat-num>
                  {prefersReducedMotion ? `${s.target}${s.suffix}` : `0${s.suffix}`}
                </span>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.3em] mb-3">
                  {s.label}
                </p>
                <p className="text-[#8A857C] text-xs md:text-sm leading-relaxed font-medium max-w-[28ch] mx-auto">
                  {s.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
