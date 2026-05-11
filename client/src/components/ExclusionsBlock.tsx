/* client/src/components/ExclusionsBlock.tsx
 *
 * Compact homepage callout for the v7.8 prohibited-excipient list.
 *
 * Design intent (post-iteration):
 *   - Make exclusions feel INTENTIONAL at scroll speed (not "got crossed off
 *     by mistake"). Explicit "We refuse to use" framing + per-item X marker.
 *   - Take roughly half the vertical real estate of the prior 3x3 card grid.
 *   - Descriptions deferred to /our-promise (already covers excipient story
 *     at depth); homepage gets the scannable list only, with a Learn More
 *     anchor for readers who want the "why."
 */
import { Link } from "wouter";
import { X, ArrowRight } from "lucide-react";

const EXCLUDED = [
  "Citric acid",
  "Magnesium stearate",
  "Titanium dioxide",
  "Carrageenan",
  "Gelatin",
  "FD&C dyes",
  "Artificial flavors",
  "Corn derivatives",
  "Soy derivatives",
];

export default function ExclusionsBlock() {
  return (
    <section className="py-14 md:py-20 px-6 bg-[#EBE8E1]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#B36B4D] mb-3">
            What we refuse to use
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0F2A22] leading-tight">
            Nine triggers we built around
          </h2>
        </div>

        <ul className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-8">
          {EXCLUDED.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 border border-[#3D3733]/10 rounded-full text-sm md:text-base"
            >
              <X
                className="w-3.5 h-3.5 text-[#B36B4D] flex-shrink-0"
                aria-hidden="true"
                strokeWidth={3}
              />
              <span className="font-medium text-[#0F2A22] line-through decoration-[1.5px] decoration-[#B36B4D]/60">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm md:text-base text-[#3D3733]/80 italic max-w-2xl mx-auto leading-relaxed mb-5">
          Every ingredient in the formula had to survive one question: would a zebra react to this?
        </p>

        <div className="text-center">
          <Link
            href="/our-promise"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#B36B4D] hover:text-[#0F2A22] transition-colors"
          >
            Why each is excluded
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
