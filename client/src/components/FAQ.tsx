/* client/src/components/FAQ.tsx */
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Activity,
  Sparkles,
  Droplets,
  Award,
  Microscope,
  Clock,
  Pill,
  Sun,
  ShieldOff,
  ChevronDown,
} from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      icon: Sparkles,
      question: "What makes ZebraThrive actually different?",
      answer: "Many supplements focus on adding collagen. Healthy connective tissue depends on a balance between building collagen and breaking it down, and enzymes called MMPs handle the breaking down. We include the cofactors your body uses to build new collagen, plus ingredients studied in lab research for effects on collagen turnover."
    },
    {
      icon: Droplets,
      question: "How should I start taking these if my system is reactive?",
      answer: "We know our community is highly sensitive, so we designed these for a gradual start. You don't have to start with all three capsules on day one; you can start with a single capsule to give your body a real chance to adjust. With our powder, you can even start with a tiny sprinkle. Starting low and going slow lets you see how your body responds to each step."
    },
    {
      icon: Award,
      question: "Do you use branded ingredients or generic forms?",
      answer: "Mostly generic. Most of the formula uses generic forms, checked against written specifications by our cGMP manufacturer, because for most ingredients the right form and dose matter more than the brand name. We do use one branded ingredient: Quercefit (quercetin phytosome), because plain quercetin is poorly absorbed and the phytosome form raised blood quercetin about 20 times in human studies. Everywhere else, we specify the chemical form (for example magnesium bisglycinate, methylcobalamin B12, sodium ascorbate), and each lot is released against a Certificate of Analysis."
    },
    {
      icon: Microscope,
      question: "How do I know these ingredients actually do anything?",
      answer: "Where human studies exist, we use them to set the dose. Where the evidence is mainly from lab research, we say so on the ingredient page. For each ingredient, we compare the blood levels reached in human studies with the levels used in lab research, and we say on the ingredient page when they do not match. "
    },
    {
      icon: Clock,
      question: "Is this a permanent fix for my connective tissue?",
      answer: "No. Nothing changes your genes, and this is not a treatment for any condition. Our goal is to support your body's normal collagen formation, with vitamin C and copper as cofactors. It's about a steadier daily foundation, not a miracle cure."
    },
    {
      icon: Pill,
      question: "Can I take this with my POTS or MCAS medications?",
      answer: "We checked every ingredient against seven medications common in POTS and MCAS: metoprolol, propranolol, ivabradine, fludrocortisone, midodrine, hydroxyzine, and famotidine. For most pairs there is no human data at all, which means unknown, not safe. Where there is a signal, it is listed on that ingredient's page. The strongest signal: vitamin C lowered propranolol blood levels in a small study. Taurine, grape seed and quercetin may add to the heart rate or blood pressure effects of beta-blockers and ivabradine, or work against midodrine and fludrocortisone. Famotidine also reduces zinc absorption from zinc carnosine. We generally recommend a 2-hour window between your medications and supplements. For thyroid medication, keep at least 4 hours between it and the magnesium and chromium in this formula. For famotidine and zinc, spacing may not be enough. We provide a full ingredient breakdown that you can take directly to your doctor to make sure it fits your specific plan."
    },
    {
      icon: Sun,
      question: "Why is it split into a Morning, Evening, and Daily Powder system?",
      answer: "We split the formula across the day so each dose is easier to take. The AM capsules (3 per day) carry most of the B vitamins (benfotiamine, niacinamide, P5P, R5P, methylfolate, B12), vitamin D3 and K2, chromium, copper for collagen cross-linking, and manganese. The PM capsules (3 per day) carry L-theanine, astaxanthin, pantothenic acid, biotin, selenium, boron, and molybdenum. NR, pine bark, grape seed, and zinc carnosine are split across both. The Daily Powder (about 7.7 g a day, in an AM and a PM scoop) carries the gram-scale ingredients: magnesium, vitamin C, taurine, PEA, Quercefit, chlorogenic acid, and luteolin. You can start the powder with a small sprinkle and increase gradually."
    },
    {
      icon: ShieldOff,
      question: "Does this contain common triggers like gluten or dairy?",
      answer: "We formulate without gelatin, magnesium stearate, titanium dioxide, added carrageenan and artificial dyes. We are still confirming with suppliers that no carrier contains dairy, soy-derived tocopherols or citric acid, and that the capsule shells contain no carrageenan. The capsules are plant-based HPMC rather than bovine gelatin, which can carry alpha-gal. The flow agents are rice hull concentrate and L-leucine. A few ingredients arrive on carriers, and we list them on our Promise page, including maltodextrin with the vitamin D3, the quercetin phytosome and the molybdenum, whose sources we are confirming. A few carrier details, such as the astaxanthin beadlet and selenium premix, are still being confirmed with suppliers. Until they are confirmed we do not claim corn-free, wheat-free or gluten-free."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <section id="faq" className="py-24 md:py-40 bg-[#F2F0EA] scroll-mt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Editorial Header */}
        <div className="mb-20 text-left border-l-2 border-[#B36B4D]/30 pl-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black text-[#8F5238] uppercase tracking-[0.4em]">Common Questions</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#3D3733] mb-6 leading-tight">
            Common questions about <span className="text-[#B36B4D] italic font-normal">ZebraThrive</span>
          </h2>
          <p className="text-[#6B655F] text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            No fluff. Just the facts on what is inside, how to start, and how it fits with your medications.
          </p>
        </div>

        {/* --- DUAL COLUMN FAQ (native <details>, icon per question) ---
            Native details/summary instead of a JS accordion (2026-11-01 audit
            G1): every answer ships in the prerendered HTML, so crawlers and
            AI fetchers read the same text as the FAQPage JSON-LD above, and
            open/close works without JavaScript. All closed by default. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 items-start">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 10 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
              >
                <details className="group bg-white/40 backdrop-blur-md rounded-[2rem] px-5 sm:px-8 transition-all duration-700 open:bg-white open:shadow-2xl open:shadow-[#B36B4D]/10 border border-transparent open:border-[#B36B4D]/10">
                  <summary className="flex items-center justify-between gap-3 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-left text-[#3D3733] hover:text-[#B36B4D] transition-colors">
                    <h3 className="flex items-start gap-4 w-full m-0 text-base md:text-lg font-serif font-bold leading-snug text-inherit">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#B36B4D]/10 text-[#B36B4D] flex-shrink-0 group-open:bg-[#B36B4D] group-open:text-white transition-colors"
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="flex-1 pt-2">{faq.question}</span>
                    </h3>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="text-[#5D5752] text-sm md:text-base leading-relaxed pb-8 pl-14 pr-4 font-medium">
                    <div className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-inner">
                      {faq.answer}
                    </div>
                  </div>
                </details>
              </motion.div>
            );
          })}
        </div>

        {/* Supportive Concierge Pod */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-24 flex justify-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-8 p-8 bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3D3733] flex items-center justify-center text-white shadow-lg">
                <Activity size={22} aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-[#3D3733] font-bold text-sm">Have a specific medical question?</p>
                <p className="text-[#6B655F] text-xs font-medium">We can provide a detailed data sheet for your doctor.</p>
              </div>
            </div>
            <Link href="/contact" className="px-8 py-4 bg-[#B36B4D] text-white font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-[#3D3733] transition-all shadow-md active:scale-95">
              Request Ingredient Data
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
