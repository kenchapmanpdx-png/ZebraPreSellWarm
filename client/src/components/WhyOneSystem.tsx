/* client/src/components/WhyOneSystem.tsx
 *
 * "Why one system, not twenty bottles." (spec 4.6 + Section 5)
 *
 * A closed THREE-WAY loop: connective tissue -> mast cells -> autonomic
 * system -> back to connective tissue. On desktop the diagram is a pinned,
 * scroll-scrubbed sequence (GSAP ScrollTrigger): as the user scrolls, node 1
 * ignites, each edge draws around the triangle in turn, the next node ignites,
 * and the loop closes with a pulse on the centre hub. This mirrors the
 * scroll-driven reveal the old Vicious Cycle graphic used.
 *
 * Accessibility / robustness:
 *   - Default DOM state is FULLY LIT (drawn edges, visible nodes), so the
 *     prerendered HTML and any no-JS visitor see a complete, readable diagram.
 *     GSAP only sets the dimmed start state once it is actually driving.
 *   - prefers-reduced-motion: no animation, static diagram.
 *   - Mobile (<768px): no pin/scrub; a static vertical stack with a loop-back
 *     indicator.
 *   - Every node title and body is real selectable text (not an image).
 */
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LoopNode = {
  id: number;
  title: string;
  body: string;
  pos: { left: string; top: string };
};

const NODES: LoopNode[] = [
  {
    id: 1,
    title: 'Connective tissue breaks down',
    body: 'Over-active enzymes (MMPs) degrade collagen faster than the body rebuilds it. Tissue gets weaker.',
    pos: { left: '50%', top: '16.7%' },
  },
  {
    id: 2,
    title: 'Mast cells activate',
    body: 'Collagen fragments and daily stress set off mast cells, which release histamine and more tissue-degrading enzymes.',
    pos: { left: '82.5%', top: '83.3%' },
  },
  {
    id: 3,
    title: 'Autonomic system overloads',
    body: 'Mediators plus lax blood vessels let blood pool on standing. The heart races, energy crashes, the system runs in overdrive.',
    pos: { left: '17.5%', top: '83.3%' },
  },
];

function NodeCard({ node }: { node: LoopNode }) {
  return (
    <div className="w-full rounded-2xl bg-white border border-[#3D3733]/8 shadow-md p-5">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2A22] text-[#D4A373] font-bold text-sm flex-shrink-0"
          aria-hidden="true"
        >
          {node.id}
        </span>
        <h3 className="font-serif font-bold text-[#3D3733] text-base leading-tight">
          {node.title}
        </h3>
      </div>
      <p className="text-[#5D5752] text-sm leading-relaxed">{node.body}</p>
    </div>
  );
}

export default function WhyOneSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop only: pinned, scroll-scrubbed reveal.
      mm.add('(min-width: 768px)', () => {
        const root = sectionRef.current;
        const stage = stageRef.current;
        if (!root || !stage) return;

        const q = gsap.utils.selector(root);
        const cards = q('[data-wos-card]');
        const e1 = q('#wos-edge-1')[0];
        const e2 = q('#wos-edge-2')[0];
        const e3 = q('#wos-edge-3')[0];
        const med = q('#wos-medallion')[0];
        const dot = q('#wos-medallion-dot')[0];

        // Dimmed start state. Default DOM is fully lit, so this only applies
        // once GSAP is actually driving the scene.
        gsap.set(cards, { opacity: 0.25, scale: 0.85, y: 10, transformOrigin: 'center' });
        gsap.set([e1, e2, e3], { autoAlpha: 0 });
        gsap.set(e1, { strokeDashoffset: 318 });
        gsap.set(e2, { strokeDashoffset: 360 });
        gsap.set(e3, { strokeDashoffset: 318 });
        gsap.set(med, { scale: 0.9, opacity: 0.7, transformOrigin: 'center' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=2600',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Node 1 ignites.
        tl.to(cards[0], { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }, 0.4);
        // Edge 1 -> 2 draws, then node 2 ignites.
        tl.set(e1, { autoAlpha: 1 }, 1.1);
        tl.to(e1, { strokeDashoffset: 0, duration: 1.6, ease: 'none' }, 1.1);
        tl.to(cards[1], { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }, 2.5);
        // Edge 2 -> 3 draws, then node 3 ignites.
        tl.set(e2, { autoAlpha: 1 }, 2.9);
        tl.to(e2, { strokeDashoffset: 0, duration: 1.6, ease: 'none' }, 2.9);
        tl.to(cards[2], { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }, 4.3);
        // Edge 3 -> 1 closes the loop.
        tl.set(e3, { autoAlpha: 1 }, 4.7);
        tl.to(e3, { strokeDashoffset: 0, duration: 1.6, ease: 'none' }, 4.7);
        // Centre hub emphasis: the loop is now closed / self-reinforcing.
        tl.to(med, { scale: 1.06, opacity: 1, duration: 0.7, ease: 'back.out(2)' }, 6.1);
        tl.to(dot, { scale: 1.6, duration: 0.4, yoyo: true, repeat: 1, transformOrigin: 'center' }, 6.3);
        // Hold the closed loop before the pin releases.
        tl.to({}, { duration: 1.5 }, 7.0);

        return () => {
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} id="why-one-system" className="bg-[#F2F0EA] scroll-mt-24">
      {/* Header (normal scroll) */}
      <div className="max-w-5xl mx-auto px-6 pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            Why one system
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight mb-6">
            Why one system, not{' '}
            <span className="text-[#B36B4D] italic font-normal">twenty bottles.</span>
          </h2>
          <p className="text-[#5D5752] text-base md:text-lg leading-relaxed font-medium">
            Whether you have one of these conditions or all three, these systems are wired together inside your body. Mast cell mediators speed up collagen breakdown. Collagen fragments trigger more mast cell activation. Lax connective tissue and mast cell mediators both load the autonomic system, feeding the dizziness and racing heart of POTS. Treat one piece in isolation and the others keep driving the loop. That is the case for one coordinated system instead of a shelf of single-ingredient bottles, and it is why we do not sell the three components separately.
          </p>
        </div>
      </div>

      {/* Stage: pinned + scroll-scrubbed on desktop, static on mobile */}
      <div
        ref={stageRef}
        className="px-6 py-12 md:py-0 md:h-screen md:flex md:items-center md:justify-center md:overflow-hidden"
      >
        <div className="w-full max-w-5xl mx-auto">
          {/* DESKTOP: triangle loop */}
          <div className="relative hidden md:block w-full max-w-4xl mx-auto aspect-[4/3]">
            <svg
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
              role="presentation"
            >
              <defs>
                <marker
                  id="wos-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#B36B4D" />
                </marker>
              </defs>
              {/* Faint closed triangle to read as a single loop */}
              <path
                d="M 400 100 L 660 500 L 140 500 Z"
                fill="none"
                stroke="#0F2A22"
                strokeOpacity="0.08"
                strokeWidth="2"
              />
              {/* Edge 1 -> 2 (top to bottom-right). dash so it can draw on scroll */}
              <line
                id="wos-edge-1"
                x1="444" y1="167" x2="616" y2="433"
                stroke="#B36B4D" strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#wos-arrow)"
                strokeDasharray="318" strokeDashoffset="0"
              />
              {/* Edge 2 -> 3 (bottom-right to bottom-left) */}
              <line
                id="wos-edge-2"
                x1="580" y1="500" x2="220" y2="500"
                stroke="#B36B4D" strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#wos-arrow)"
                strokeDasharray="360" strokeDashoffset="0"
              />
              {/* Edge 3 -> 1 (bottom-left back up to top): closes the loop */}
              <line
                id="wos-edge-3"
                x1="184" y1="433" x2="356" y2="167"
                stroke="#B36B4D" strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#wos-arrow)"
                strokeDasharray="318" strokeDashoffset="0"
              />
            </svg>

            {/* Center hub medallion */}
            <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div
                id="wos-medallion"
                className="w-28 h-28 rounded-full border border-[#0F2A22]/10 bg-[#EBE8E1]/70 backdrop-blur-sm flex flex-col items-center justify-center px-3"
              >
                <span id="wos-medallion-dot" className="w-2.5 h-2.5 rounded-full bg-[#B36B4D] mb-2" aria-hidden="true" />
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#B36B4D]">The loop</span>
                <span className="block text-[9px] text-[#6B655F] mt-1 leading-tight">self-reinforcing</span>
              </div>
            </div>

            {/* Node cards pinned to the triangle vertices */}
            {NODES.map((node) => (
              <div
                key={node.id}
                data-wos-card
                className="absolute w-60 -translate-x-1/2 -translate-y-1/2"
                style={{ left: node.pos.left, top: node.pos.top }}
              >
                <NodeCard node={node} />
              </div>
            ))}
          </div>

          {/* MOBILE: vertical stack with directional chevrons + loop-back note */}
          <div className="md:hidden space-y-3">
            {NODES.map((node, i) => (
              <div key={node.id}>
                <NodeCard node={node} />
                {i < NODES.length - 1 && (
                  <div className="flex justify-center py-2" aria-hidden="true">
                    <ArrowDown className="w-5 h-5 text-[#B36B4D]" />
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 pt-2 text-[#B36B4D]">
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                and back to the top
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption + payoff (normal scroll) */}
      <div className="max-w-5xl mx-auto px-6 pb-20 md:pb-28">
        <p className="text-center text-[#5D5752] text-sm md:text-base font-medium italic mt-2 md:mt-0 max-w-xl mx-auto">
          Each one feeds the next. Left alone, the loop reinforces itself.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl mx-auto rounded-[2rem] bg-[#0F2A22] px-8 py-8 md:px-12 md:py-10 text-center shadow-xl"
        >
          <p className="text-[#D4A373] font-black uppercase tracking-[0.35em] text-[10px] mb-3">
            Intervention is possible
          </p>
          <p className="text-white text-lg md:text-xl font-serif font-medium leading-relaxed">
            ZebraThrive is built to interrupt the loop at every point, not patch one symptom and let the cycle restart.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
