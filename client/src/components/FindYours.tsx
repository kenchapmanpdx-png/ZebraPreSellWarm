/* client/src/components/FindYours.tsx
 *
 * "Find Yours" - three co-equal condition entry points (POTS, MCAS, hEDS).
 * A visitor with only ONE of the three conditions should find a complete,
 * standalone reason to engage here. Equal visual weight is required, so all
 * three cards share the same accent and structure; the condition name is the
 * only differentiator. Copy is implemented verbatim from the homepage spec.
 *
 * Accessibility: each card is a semantic <article> with a real <h3> heading.
 */
import { motion } from 'framer-motion';

type ConditionCard = {
  id: string;
  eyebrow: string;
  recognition: string;
  whatWeDo: string;
  leadActives: string;
  closing: string;
};

// Order left to right: POTS, MCAS, hEDS (per spec 4.2).
const CARDS: ConditionCard[] = [
  {
    id: 'pots',
    eyebrow: 'POTS and Dysautonomia',
    recognition: `You stand up and your heart takes off. The brain fog rolls in by afternoon. A meal can flatten you. Heat, a hot shower, a long line at the store, and you are dizzy and wrung out. Your heart rate looks dramatic on a monitor while your bloodwork looks unremarkable. People keep telling you to drink more water, as if you had not thought of that.`,
    whatWeDo: `Salt, fluids, and the medications your doctor prescribed are the foundation of managing POTS, and you should keep all of them. We work on the layer underneath. We supply the nutrients your cells use to make energy, the cofactors involved in normal autonomic nervous system signaling, and compounds studied for supporting healthy vascular tone. Vessel and connective tissue integrity influence how well blood returns from your legs when you stand, which is part of normal orthostatic physiology, so our connective tissue work matters here too.`,
    leadActives: `Taurine and Magnesium Bisglycinate for autonomic calm. Nicotinamide Riboside with activated B vitamins (Riboflavin-5-Phosphate, Benfotiamine) for cellular energy. Pine Bark Extract and Vitamin K2 for vascular support. Vitamin B12 (Methylcobalamin) for nervous-system support, a nutrient frequently low in people with orthostatic symptoms.`,
    closing: `Response varies from person to person, and we will not promise you a number on your monitor. What we will give you is the exact ingredient behind each mechanism, with the research attached, so you can judge it yourself.`,
  },
  {
    id: 'mcas',
    eyebrow: 'MCAS and Histamine Sensitivity',
    recognition: `You react to things that are supposed to be safe. A "clean" supplement still sets you off. Flushing, hives, gut flares, the sense that your body treats ordinary exposures as threats. You read ingredient labels like a detective, because one wrong filler costs you days, and you have been talked out of your own reactions more times than you can count.`,
    whatWeDo: `This is the population we engineered the formula around first. Every capsule is HPMC, so no gelatin and no carrageenan. The PM capsules are opacified with calcium carbonate instead of titanium dioxide. We flow the powders with rice hull and L-leucine instead of magnesium stearate. No FD&C dyes, no citric acid, no fermented ingredients, no corn or soy derivatives. On the active side we use compounds studied for their effects on mast cell stability and histamine processing, plus the cofactors your clearance enzymes rely on.`,
    leadActives: `Luteolin, Quercetin Phytosome, and PEA for mast cell support. Vitamin C and Vitamin D3 alongside the methylation group (Methylfolate, Vitamin B12, P5P) for histamine clearance. Molybdenum to support the enzymes that process sulfites and aldehydes.`,
    closing: `We support titration. The capsules open, the powder doses from a sprinkle, and we publish low-and-slow guidance, because we know your body does not do "full dose on day one."`,
  },
  {
    id: 'heds',
    eyebrow: 'hEDS and Hypermobility',
    recognition: `Your joints slide out of place. You bruise from nothing, your skin is soft or stretchy, you sprain getting out of bed, and you have been called "just flexible" your whole life. The fatigue is real and the healing is slow, even when the imaging looks fine and nobody can tell you why everything hurts.`,
    whatWeDo: `hEDS is not the collagen-building problem most supplements assume it is. The research points the other way: collagen getting broken down too fast, with enzymes called MMPs running over-active in hEDS tissue. So we focus on protection. We use ingredients studied for slowing that enzymatic breakdown, for supporting your body's own natural enzyme brakes (called TIMPs), and we supply the cofactors collagen needs to cross-link into strong tissue. Building blocks alone do not help if the breakdown never stops, which is exactly why so many collagen powders disappoint.`,
    leadActives: `Pine Bark and Grape Seed Extract for enzyme protection. Vitamin C, Copper Bisglycinate, and Manganese Bisglycinate for collagen synthesis and cross-linking. Astaxanthin for cellular antioxidant support and Zinc Carnosine for the gut lining behind absorption.`,
    closing: `We are not selling you new collagen in a scoop. We are protecting the collagen you have and giving your body what it needs to build correctly.`,
  },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.3em] mb-2">
      {children}
    </span>
  );
}

export default function FindYours() {
  return (
    <section id="find-yours" className="py-20 md:py-28 px-6 bg-[#EBE8E1] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
            Find yours
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight">
            Three conditions. One system.{' '}
            <span className="text-[#B36B4D] italic font-normal">
              Start with the one that brought you here.
            </span>
          </h2>
        </div>

        {/* Three co-equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex h-full flex-col bg-white rounded-[2rem] border border-[#3D3733]/5 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Equal-weight accent bar (identical across all three cards) */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#0F2A22] via-[#2D6B52] to-[#B36B4D]" aria-hidden="true" />

              <div className="flex h-full flex-col p-7 lg:p-8">
                <h3 className="font-serif font-bold text-[#3D3733] text-2xl leading-tight mb-6">
                  {card.eyebrow}
                </h3>

                <div className="mb-6">
                  <FieldLabel>Recognition</FieldLabel>
                  <p className="text-[#5D5752] text-sm leading-relaxed">{card.recognition}</p>
                </div>

                <div className="mb-6">
                  <FieldLabel>What we do</FieldLabel>
                  <p className="text-[#5D5752] text-sm leading-relaxed">{card.whatWeDo}</p>
                </div>

                <div className="mb-6">
                  <FieldLabel>Lead actives</FieldLabel>
                  <p className="text-[#5D5752] text-sm leading-relaxed">{card.leadActives}</p>
                </div>

                {/* Closing line pinned to the bottom so all three align */}
                <p className="mt-auto pt-5 border-t border-[#3D3733]/8 text-[#3D3733] text-sm leading-relaxed font-medium italic">
                  {card.closing}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
