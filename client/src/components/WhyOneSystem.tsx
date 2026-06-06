/* client/src/components/WhyOneSystem.tsx
 *
 * "Why one system, not twenty bottles." (spec 4.6 + Section 5)
 *
 * Replaces the old linear four-step "Vicious Cycle of hEDS & MCAS" graphic
 * with a closed THREE-WAY loop: connective tissue -> mast cells -> autonomic
 * system -> back to connective tissue. Arrows run clockwise in one consistent
 * direction, with the final arrow closing back to Node 1.
 *
 * The diagram is a functional placeholder a designer can later restyle.
 * Accessibility (spec constraint 10): every node title and body is REAL
 * selectable text in semantic HTML (h3 + p), never an image-only graphic.
 * The connecting SVG is purely decorative and marked aria-hidden.
 */
import { motion } from 'framer-motion';
import { ArrowDown, RotateCcw } from 'lucide-react';

type LoopNode = {
  id: number;
  title: string;
  body: string;
  /** Desktop triangle vertex (percent of the stage box). */
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
  return (
    <section id="why-one-system" className="px-6 py-20 md:py-28 bg-[#F2F0EA] scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
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

        {/* DESKTOP: triangle loop (decorative SVG arrows + real-text node cards) */}
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
            {/* Edge 1 -> 2 (top to bottom-right) */}
            <line
              x1="444" y1="167" x2="616" y2="433"
              stroke="#B36B4D" strokeWidth="3" strokeLinecap="round"
              markerEnd="url(#wos-arrow)"
            />
            {/* Edge 2 -> 3 (bottom-right to bottom-left) */}
            <line
              x1="580" y1="500" x2="220" y2="500"
              stroke="#B36B4D" strokeWidth="3" strokeLinecap="round"
              markerEnd="url(#wos-arrow)"
            />
            {/* Edge 3 -> 1 (bottom-left back up to top): closes the loop */}
            <line
              x1="184" y1="433" x2="356" y2="167"
              stroke="#B36B4D" strokeWidth="3" strokeLinecap="round"
              markerEnd="url(#wos-arrow)"
            />
          </svg>

          {/* Center hub medallion (gives the triangle's middle a focal point) */}
          <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="w-28 h-28 rounded-full border border-[#0F2A22]/10 bg-[#EBE8E1]/70 backdrop-blur-sm flex flex-col items-center justify-center px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B36B4D] mb-2" aria-hidden="true" />
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#B36B4D]">The loop</span>
              <span className="block text-[9px] text-[#6B655F] mt-1 leading-tight">self-reinforcing</span>
            </div>
          </div>

          {/* Node cards pinned to the triangle vertices */}
          {NODES.map((node) => (
            <div
              key={node.id}
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

        {/* Loop caption */}
        <p className="text-center text-[#5D5752] text-sm md:text-base font-medium italic mt-10 md:mt-12 max-w-xl mx-auto">
          Each one feeds the next. Left alone, the loop reinforces itself.
        </p>

        {/* Payoff (keeps the "intervention is possible" framing) */}
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
