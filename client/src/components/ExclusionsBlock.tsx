/* client/src/components/ExclusionsBlock.tsx
 *
 * Homepage callout for the v7.8 prohibited-excipient list.
 *
 * Design intent (revised 2026-05-10):
 *   - Universal "no" symbol (Ban) instead of strikethrough + X, so the
 *     refused-list semantics read at a glance.
 *   - No line-through on text; the icon carries the prohibition meaning.
 *   - Pill text stays clean and readable.
 */
import { Link } from "wouter";
import { Ban, ArrowRight } from "lucide-react";

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
          <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#B36B4D] mb-3">
            Excipients we refuse to use
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F2A22] leading-tight">
            Nine triggers we built around
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-base md:text-lg text-[#3D3733] leading-relaxed">
            If you've reacted to a supplement and walked away convinced an active ingredient wasn't for you, there's a good chance you were <em>right</em> about the reaction and <em>wrong</em> about the cause. Excipients are the inactive ingredients packed around the active - fillers, binders, coatings, flow agents. They're chosen for manufacturing convenience, not for your gut.
          </p>
          <p className="text-base md:text-lg text-[#3D3733] leading-relaxed mt-4">
            Magnesium often isn't the trigger - magnesium stearate is. Vitamin C often isn't the trigger - citric acid is. These nine are the most common culprits.
          </p>
        </div>

        {/* Refused list - universal "no" symbol carries the prohibition meaning */}
        <ul className="flex flex-wrap justify-center gap-3 md:gap-3.5 mb-10">
          {EXCLUDED.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-[#B36B4D]/15 rounded-full shadow-sm hover:shadow-md hover:border-[#B36B4D]/30 transition-all"
            >
              <Ban
                className="w-6 h-6 text-[#DC2626] flex-shrink-0"
                strokeWidth={2.5}
                aria-label="Excluded"
              />
              <span className="font-bold text-base md:text-lg text-[#0F2A22]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-center text-base md:text-lg text-[#3D3733] italic max-w-2xl mx-auto leading-relaxed mb-6 font-serif">
          Every excipient and every active in the formula had to survive one question: would a zebra react to this?
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
