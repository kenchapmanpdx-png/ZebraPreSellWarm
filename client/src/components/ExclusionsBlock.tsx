/* client/src/components/ExclusionsBlock.tsx
 *
 * Homepage callout — v7.8 prohibited-excipient list rendered as a
 * 3x3 strikethrough grid. Lands the brand differentiation in seconds
 * for scrollers; "what we LEFT OUT" hits harder than "what we put in"
 * for an MCAS-conscious audience.
 *
 * Content from CONTENT_EXCLUSIONS_BLOCK.json (project chat draft).
 * Visual treatment per the chat's recommendation:
 *   - strikethrough does the visual work (no icons, no boxes, no red)
 *   - 3x3 grid on desktop, single column on mobile
 *   - struck names in terra #B36B4D
 *   - tags in deep green #0F2A22 at lower contrast
 *   - warm sand #EBE8E1 background (integrates, not banner)
 */

const EXCLUDED = [
    { name: "Citric acid", why: "Almost always mold-fermented; one of the most documented MCAS triggers." },
    { name: "Magnesium stearate", why: "Manufacturing lubricant that may slow dissolution and irritate sensitive guts." },
    { name: "Titanium dioxide", why: "Banned as a food additive in the EU; documented immune-reactive effects." },
    { name: "Carrageenan", why: "Inflammatory polysaccharide that can degrade gut barrier function in lab studies." },
    { name: "Gelatin", why: "Animal-derived capsule shell that can carry histamine load from its source." },
    { name: "FD&amp;C dyes / artificial colors", why: "Petroleum-derived colorants linked to mast cell activation in sensitive patients." },
    { name: "Artificial flavors / sweeteners", why: "Many trigger mast cell activation; some disrupt the gut microbiome." },
    { name: "Corn-derived ingredients", why: "Common hidden allergen with frequent cross-reactivity in MCAS patients." },
    { name: "Soy-derived ingredients", why: "Top-8 allergen with phytoestrogen activity; commonly hidden in supplement carriers." }
];

export default function ExclusionsBlock() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#EBE8E1]">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-14 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-5 leading-tight">
            Nine Triggers We Built Around
          </h2>
          <p className="text-base md:text-lg text-[#3D3733] max-w-2xl mx-auto leading-relaxed">
            Most supplements include these nine by default. For zebras, they're the most common cause of mystery flares.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
          {EXCLUDED.map((item) => (
            <li key={item.name} className="text-center md:text-left">
              <p className="text-xl md:text-2xl font-serif font-medium text-[#B36B4D] line-through decoration-[1.5px] decoration-[#B36B4D]/70 mb-2 leading-tight">
                {item.name}
              </p>
              <p className="text-sm md:text-base text-[#0F2A22]/70 leading-snug">
                {item.why}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-center text-base md:text-lg text-[#3D3733]/80 mt-16 max-w-2xl mx-auto leading-relaxed italic">
          Every ingredient passed this gauntlet first. Every line in the formula had to survive one question: would a zebra react to this?
        </p>
      </div>
    </section>
  );
}
