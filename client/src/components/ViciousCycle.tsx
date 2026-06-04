/* client/src/components/ViciousCycle.tsx
 *
 * The "Vicious Cycle" of hEDS & MCAS, rebuilt as a pinned, scroll-scrubbed
 * sequence. The section pins to the viewport and the user's scroll drives
 * the animation timeline directly:
 *
 *   1. An arc traces clockwise around a circular loop.
 *   2. Each of the four nodes ignites as the arc reaches it.
 *   3. The centre hub rotates as the loop fills.
 *   4. At loop close, the ring washes inflamed red (self-reinforcing).
 *   5. Climax: the loop retracts open, a copper intervention mark appears,
 *      and "Intervention is possible" rises in.
 *
 * Accessibility:
 *   - All motion is scroll-scrubbed: 1:1 with user input, no autoplay.
 *   - prefers-reduced-motion: renders a static, fully-lit diagram, no pin.
 *   - Mobile (<768px): renders a static vertical stack, no pin.
 *   - Default (no-JS / prerender) state of the desktop diagram is
 *     fully-lit and readable; GSAP sets the dimmed start state only when
 *     it actually drives the animation.
 */
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---- Geometry (SVG viewBox is 0 0 600 600) ---- */
const CENTER = 300;
const RING_R = 216;
const RING_C = 2 * Math.PI * RING_R; // circumference

type Node = {
  id: number;
  n: string;
  title: string;
  desc: string;
  theme: 'brown' | 'green';
  /** HTML card position (percent of stage) */
  card: { left: string; top: string };
  /** SVG dot centre */
  dot: { cx: number; cy: number };
};

const NODES: Node[] = [
  {
    id: 1,
    n: '1',
    title: 'Collagen Breaks Down',
    desc: 'Weak connective tissue degrades due to genetic and stress factors.',
    theme: 'brown',
    card: { left: '50%', top: '14%' },
    dot: { cx: CENTER, cy: CENTER - RING_R },
  },
  {
    id: 2,
    n: '2',
    title: 'Fragments Trigger Inflammation',
    desc: 'Biological debris activates aggressive immune responses.',
    theme: 'green',
    card: { left: '86%', top: '50%' },
    dot: { cx: CENTER + RING_R, cy: CENTER },
  },
  {
    id: 3,
    n: '3',
    title: 'Mast Cells Activate',
    desc: 'Hyper-sensitive cells release histamine and toxic mediators.',
    theme: 'brown',
    card: { left: '50%', top: '86%' },
    dot: { cx: CENTER, cy: CENTER + RING_R },
  },
  {
    id: 4,
    n: '4',
    title: 'Enzymes Attack Collagen',
    desc: 'Destructive enzymes shred remaining tissue, repeating the cycle.',
    theme: 'green',
    card: { left: '14%', top: '50%' },
    dot: { cx: CENTER - RING_R, cy: CENTER },
  },
];

const themeColor = (t: 'brown' | 'green') => (t === 'brown' ? '#B47F65' : '#2E5C55');
const themeText = (t: 'brown' | 'green') => (t === 'brown' ? 'text-[#8B5E4B]' : 'text-[#1F443E]');

export default function ViciousCycle() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop only: build the pinned, scrubbed timeline.
      mm.add('(min-width: 768px)', () => {
        const root = rootRef.current;
        if (!root) return;

        const q = gsap.utils.selector(root);
        const arc = q('#vc-arc')[0];
        const intro = q('#vc-intro')[0];
        const hub = q('#vc-hub')[0];
        const redOverlay = q('#vc-red')[0];
        const inflamed = q('#vc-inflamed')[0];
        const climax = q('#vc-climax')[0];
        const slash = q('#vc-slash')[0];
        const cards = q('[data-vc-card]');
        const dots = q('[data-vc-dot]');

        // ---- Start state (dimmed). Default DOM state is fully lit, so
        // this only applies once GSAP is actually driving the scene. ----
        gsap.set(arc, { strokeDashoffset: RING_C, stroke: '#B36B4D' });
        gsap.set(cards, { opacity: 0.28, scale: 0.84, y: 14 });
        gsap.set(dots, { scale: 0.55, transformOrigin: 'center', fill: '#D4CEC4' });
        gsap.set(hub, { rotation: 0, transformOrigin: 'center' });
        gsap.set(redOverlay, { opacity: 0 });
        gsap.set(inflamed, { opacity: 0, y: 16 });
        gsap.set(climax, { opacity: 0, y: 36 });
        gsap.set(slash, { opacity: 0, scale: 0.4, transformOrigin: 'center' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=2400',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Intro recedes as the cycle begins
        tl.to(intro, { opacity: 0.0, y: -24, duration: 0.8 }, 0.6);

        // Arc traces the full loop (units 1 -> 7)
        tl.to(arc, { strokeDashoffset: 0, ease: 'none', duration: 6 }, 1);

        // Centre hub rotates with the draw
        tl.to(hub, { rotation: 540, ease: 'none', duration: 6 }, 1);

        // Each node ignites as the arc passes it
        const igniteAt = [1.0, 2.5, 4.0, 5.5];
        NODES.forEach((node, i) => {
          const at = igniteAt[i];
          tl.to(cards[i], { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, at);
          tl.to(
            dots[i],
            { scale: 1.5, fill: themeColor(node.theme), duration: 0.6, ease: 'back.out(2)' },
            at
          );
        });

        // Loop closes: inflamed red wash (units 7 -> 8.3)
        tl.to(redOverlay, { opacity: 1, duration: 1.2, ease: 'power1.in' }, 7);
        tl.to(arc, { stroke: '#C0392B', duration: 1.2 }, 7);
        tl.to(inflamed, { opacity: 1, y: 0, duration: 0.7 }, 7.4);

        // Intervention (units 8.3 -> 10)
        tl.to(inflamed, { opacity: 0, y: -14, duration: 0.5 }, 8.3);
        tl.to(redOverlay, { opacity: 0, duration: 1.1 }, 8.5);
        // Arc retracts open, leaving a gap at the top, and recolours copper
        tl.to(arc, { strokeDashoffset: 190, stroke: '#A4613A', duration: 1.1, ease: 'power2.inOut' }, 8.5);
        tl.to(slash, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)' }, 8.8);
        tl.to(hub, { rotation: '+=70', duration: 1 }, 8.6);
        tl.to(climax, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 9.1);

        return () => {
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={rootRef}
      id="science"
      className="bg-[#EBE8E1] scroll-mt-24 md:h-screen md:overflow-hidden"
    >
      <div className="h-full w-full flex items-center py-12 md:py-0 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl border border-[#B36B4D]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B36B4D]/5 rounded-full blur-[100px] -mr-48 -mt-48" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2D6B52]/5 rounded-full blur-[100px] -ml-48 -mb-48" aria-hidden="true" />

            {/* ---- Intro heading ---- */}
            <div id="vc-intro" className="relative z-10 text-center mb-6 md:mb-4">
              <div className="inline-flex p-3 bg-[#B36B4D]/10 rounded-2xl mb-4">
                <RefreshCw className="w-7 h-7 text-[#B36B4D]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#3D3733] mb-2">
                The "Vicious Cycle" of hEDS &amp; MCAS
              </h3>
              <p className="text-[#8A857C] text-sm md:text-base font-medium max-w-xl mx-auto">
                Scroll to trace the feedback loop, then watch where it can be broken.
              </p>
            </div>

            {/* ============ DESKTOP: scrubbed circular stage ============ */}
            <div className="hidden md:block relative z-10">
              <div
                className="relative mx-auto aspect-square"
                style={{ width: 'min(58vh, 540px)' }}
              >
                {/* SVG: ring track + animated arc + node dots + slash */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 600 600"
                  aria-hidden="true"
                >
                  {/* faint full-ring track */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RING_R}
                    fill="none"
                    stroke="#B36B4D"
                    strokeWidth="2"
                    strokeDasharray="6 9"
                    opacity="0.22"
                  />
                  {/* animated arc (starts at top, draws clockwise) */}
                  <circle
                    id="vc-arc"
                    cx={CENTER}
                    cy={CENTER}
                    r={RING_R}
                    fill="none"
                    stroke="#B36B4D"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset="0"
                    transform={`rotate(-90 ${CENTER} ${CENTER})`}
                  />
                  {/* node dots on the ring */}
                  {NODES.map((node) => (
                    <circle
                      key={node.id}
                      data-vc-dot
                      cx={node.dot.cx}
                      cy={node.dot.cy}
                      r="13"
                      fill={themeColor(node.theme)}
                      stroke="#FFFFFF"
                      strokeWidth="4"
                    />
                  ))}
                  {/* intervention slash at the top gap */}
                  <g id="vc-slash">
                    <line
                      x1={CENTER - 34}
                      y1={CENTER - RING_R - 30}
                      x2={CENTER + 34}
                      y2={CENTER - RING_R + 30}
                      stroke="#A4613A"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>

                {/* inflamed-red overlay (fades in at loop close) */}
                <div
                  id="vc-red"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(192,57,43,0.0) 35%, rgba(192,57,43,0.28) 75%, rgba(192,57,43,0.05) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* centre hub */}
                <div
                  id="vc-hub"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] h-[18%] rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex items-center justify-center border border-gray-100 z-20"
                >
                  <RefreshCw className="w-1/2 h-1/2 text-[#B36B4D]/40" aria-hidden="true" />
                </div>

                {/* node cards */}
                {NODES.map((node) => (
                  <div
                    key={node.id}
                    data-vc-card
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: node.card.left,
                      top: node.card.top,
                      width: 'clamp(150px, 20vh, 188px)',
                    }}
                  >
                    <div className="relative rounded-[1.5rem] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 px-5 py-6 text-center">
                      <div
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                        style={{ backgroundColor: themeColor(node.theme) }}
                      >
                        {node.n}
                      </div>
                      <div className={`font-serif font-bold text-[15px] leading-tight mb-1.5 mt-1 ${themeText(node.theme)}`}>
                        {node.title}
                      </div>
                      <p className="text-[12px] text-[#5D5752] leading-snug font-semibold">
                        {node.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* climax labels (sit under the stage, overlapping region) */}
              <div className="relative h-20 mt-2">
                <div
                  id="vc-inflamed"
                  className="absolute inset-x-0 top-0 flex justify-center"
                >
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C0392B]/10 text-[#C0392B] border border-[#C0392B]/20 text-sm font-black uppercase tracking-[0.18em]">
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    This loop is self-reinforcing
                  </span>
                </div>
                <div
                  id="vc-climax"
                  className="absolute inset-x-0 top-0 flex flex-col items-center"
                >
                  <span className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#A4613A] text-white text-base font-bold shadow-lg">
                    Intervention is possible
                  </span>
                  <span className="mt-3 text-[#8A857C] text-sm font-medium">
                    ZebraWell is built to break this loop at multiple points.
                  </span>
                </div>
              </div>
            </div>

            {/* ============ MOBILE: static vertical stack ============ */}
            <div className="md:hidden relative z-10 mt-4">
              <div className="flex flex-col gap-4">
                {NODES.map((node) => (
                  <div
                    key={node.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center relative"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 text-white shadow-sm"
                      style={{ backgroundColor: themeColor(node.theme) }}
                    >
                      {node.n}
                    </div>
                    <div className={`font-serif font-bold text-lg mb-1 ${themeText(node.theme)}`}>
                      {node.title}
                    </div>
                    <p className="text-sm text-[#5D5752] leading-relaxed font-semibold">
                      {node.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center pt-8">
                <div className="h-12 w-0.5 bg-gradient-to-b from-transparent to-[#D4A373]" aria-hidden="true" />
                <div className="bg-white border border-[#D4A373]/30 px-6 py-2 rounded-full shadow-sm text-[#8B5E4B] font-serif italic text-base -mt-3">
                  Intervention is possible
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
