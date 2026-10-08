/* client/src/components/FAQ.tsx */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      icon: Sparkles,
      question: "What makes ZebraThrive actually different?",
      answer: "Most supplements just try to give you 'more collagen.' But healthy connective tissue depends on a balance between building collagen and breaking it down, and enzymes called MMPs handle the breaking down. We include ingredients that support a healthy balance of that turnover and help protect the collagen you already have, alongside the cofactors your body uses to build new collagen."
    },
    {
      icon: Droplets,
      question: "How should I start taking these if my system is reactive?",
      answer: "We know our community is highly sensitive, so we designed these for a gradual start. You don't have to start with all three capsules on day one; you can start with a single capsule to give your body a real chance to adjust. With our powder, you can even start with a tiny sprinkle. This 'low and slow' approach prevents overwhelming your system."
    },
    {
      icon: Award,
      question: "Do you use branded ingredients or generic forms?",
      answer: "Mostly generic. Most of the formula uses generic forms with strict COA verification, because for most ingredients the right form and dose matter more than the brand name. We do use one branded ingredient: Quercefit (quercetin phytosome), because plain quercetin has terrible absorption (around 1-2%) and the phytosome form is one of the few patented delivery systems with the human data to back it up. Everywhere else, we specify the chemical form (e.g., magnesium bisglycinate, methylcobalamin B12, sodium ascorbate) and source from manufacturers that publish full Certificates of Analysis."
    },
    {
      icon: Microscope,
      question: "How do I know these ingredients actually do anything?",
      answer: "We don't pick ingredients based on lab dishes; we look at the 'therapeutic dose' used in real human clinical studies. We ensure that the amount you swallow is high enough to actually reach your bloodstream and stay there long enough to work. If an ingredient doesn't pass this 'real world' absorption test, it doesn't make it into our formula."
    },
    {
      icon: Clock,
      question: "Is this a permanent fix for my connective tissue?",
      answer: "No. Nothing changes your genes, and this is not a treatment for any condition. Our goal is to support your body's normal collagen maintenance: helping protect existing collagen and supporting healthy new collagen formation. It's about a steadier daily foundation, not a miracle cure."
    },
    {
      icon: Pill,
      question: "Can I take this with my POTS or MCAS medications?",
      answer: "We checked every ingredient against the medications most common in POTS and MCAS: beta-blockers, ivabradine, fludrocortisone, midodrine, antihistamines, and mast cell stabilizers. Where human data shows an interaction, it is listed on that ingredient's page. Two examples: vitamin C lowered propranolol blood levels in a small study, and magnesium should be spaced away from thyroid medication. We generally recommend a 2-hour window between your medications and supplements. We provide a full ingredient breakdown that you can take directly to your doctor to make sure it fits your specific plan."
    },
    {
      icon: Sun,
      question: "Why is it split into a Morning, Evening, and Daily Powder system?",
      answer: "Your body needs different support at 8 AM than it does at 8 PM. The AM capsules (3 per day) carry most of the B vitamins (benfotiamine, niacinamide, P5P, R5P, methylfolate, B12), vitamin D3 and K2, chromium, and the copper and manganese used for collagen cross-linking. The PM capsules (3 per day) carry L-theanine, astaxanthin, pantothenic acid, biotin, selenium, boron, and molybdenum. NR, pine bark, grape seed, and zinc carnosine are split across both. The Daily Powder (about 7.7 g a day, in an AM and a PM scoop) carries the gram-scale ingredients: magnesium, vitamin C, taurine, PEA, Quercefit, chlorogenic acid, and luteolin. It is titratable from a sprinkle, which matters if your system is reactive or if you have slow digestion or gastroparesis."
    },
    {
      icon: ShieldOff,
      question: "Does this contain common triggers like gluten or dairy?",
      answer: "We formulate without gluten, dairy, soy, gelatin, magnesium stearate, titanium dioxide, citric acid, carrageenan, and artificial dyes. The capsules are plant-based HPMC rather than bovine gelatin, which can carry alpha-gal. The flow agents are rice hull concentrate and L-leucine. A few vitamins arrive on small carriers, and we list every one on our Promise page, including the maltodextrin on the vitamin D3, whose source we are confirming with our manufacturer."
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

  // Open the first two by default to front-load info and break the "wall of identical rows" feel
  const defaultOpen: string[] = [];

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
            Straight <span className="text-[#B36B4D] italic font-normal">Answers.</span>
          </h2>
          <p className="text-[#6B655F] text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            No fluff. Just the facts on how we protect your stability and support your system.
          </p>
        </div>

        {/* --- DUAL COLUMN ACCORDION (multi-open, icon per question, first two expanded) --- */}
        <Accordion
          type="multiple"
          defaultValue={defaultOpen}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 items-start"
        >
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="group border-none bg-white/40 backdrop-blur-md rounded-[2rem] px-5 sm:px-8 transition-all duration-700 data-[state=open]:bg-white data-[state=open]:shadow-2xl data-[state=open]:shadow-[#B36B4D]/10 border border-transparent data-[state=open]:border-[#B36B4D]/10"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-serif font-bold text-[#3D3733] py-6 hover:no-underline hover:text-[#B36B4D] transition-colors leading-snug">
                    <div className="flex items-start gap-4 w-full">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#B36B4D]/10 text-[#B36B4D] flex-shrink-0 group-data-[state=open]:bg-[#B36B4D] group-data-[state=open]:text-white transition-colors"
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="flex-1 pt-2">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5D5752] text-sm md:text-base leading-relaxed pb-8 pl-14 pr-4 font-medium">
                    <div className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-inner">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>

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
