/* client/src/components/ComorbidityNudge.tsx
 *
 * Comorbidity nudge (spec 4.5). Placed directly AFTER the Ava story so the
 * adjacency reads as "Ava has all three, and you might too." Copy is
 * implemented verbatim and is intentionally non-numeric (no prevalence
 * percentages), per the spec hard constraints.
 *
 * DEPENDENCY / PLACEHOLDER: the "30-second zebra check" self-screen tool does
 * not exist yet. Per spec Section 6, the CTA points at the existing /contact
 * page as a placeholder and is flagged for follow-up. When the real screen
 * ships, repoint this Link. The screen must be educational and non-diagnostic.
 */
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ComorbidityNudge() {
  return (
    <section id="comorbidity" className="px-6 py-16 md:py-20 bg-[#EBE8E1]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto overflow-hidden rounded-[2.5rem] bg-[#0F2A22] px-8 py-12 md:px-14 md:py-16 shadow-xl"
      >
        {/* Ambient brand glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-[#B36B4D]/15 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#2D6B52]/20 blur-[120px]"
        />

        <div className="relative z-10 max-w-3xl">
          <p className="text-[#D4A373] font-bold uppercase tracking-[0.4em] text-[10px] mb-5">
            More common than you were told
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-6">
            Here for one? You might be more zebra than you think.
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
            These three conditions travel together far more often than most people are told. A large share of people with POTS also have joint hypermobility that was never assessed. Many people with hEDS develop mast cell symptoms they have never connected to a name. If you came here for one, it is worth knowing whether you are actually managing two, or three. That is not a diagnosis, and it is not a sales pitch. It is the question your doctor may not have asked.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Placeholder target: /contact until the zebra-check tool exists. */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#B36B4D] text-white font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-white hover:text-[#0F2A22] transition-colors active:scale-95"
            >
              Take the 30-second zebra check
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <span className="text-white/70 text-xs font-medium">
              Educational only. Bring the result to your clinician.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
