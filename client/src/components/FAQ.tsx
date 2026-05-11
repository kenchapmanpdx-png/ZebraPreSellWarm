/* client/src/components/FAQ.tsx */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      question: "What makes ZebraWell actually different?",
      answer: "Most supplements just try to give you 'more collagen,' but if you have hEDS, your body often produces too many enzymes (called MMPs) that actively break down the collagen you already have. It's like trying to fill a bucket with a hole in the bottom. We include specific ingredients to help 'plug the hole' by protecting your existing collagen, while providing the nutrients to support the new collagen your body builds."
    },
    {
      icon: Droplets,
      question: "How should I start taking these if my system is reactive?",
      answer: "We know our community is highly sensitive, so we designed these for a gradual start. You don't have to start with four or five capsules on day one; you can start with a single capsule to give your body a real chance to adjust. With our powder, you can even start with a tiny sprinkle. This 'low and slow' approach prevents overwhelming your system."
    },
    {
      icon: Award,
      question: "Why do you use 'branded' ingredients for some things?",
      answer: "Branded ingredients aren't just for show-they are about absorption. With some generic forms, your body may only absorb 5% of the dose, meaning 95% is wasted. We use branded versions that ensure you absorb nearly all of the ingredient. This higher quality allows us to use smaller, more effective doses, which keeps your daily capsule count down while providing much higher consistency and safety."
    },
    {
      icon: Microscope,
      question: "How do I know these ingredients actually do anything?",
      answer: "We don't pick ingredients based on lab dishes; we look at the 'therapeutic dose' used in real human clinical studies. We ensure that the amount you swallow is high enough to actually reach your bloodstream and stay there long enough to work. If an ingredient doesn't pass this 'real world' absorption test, it doesn't make it into our formula."
    },
    {
      icon: Clock,
      question: "Is this a permanent fix for my connective tissue?",
      answer: "Nothing can permanently fix a genetic collagen structure, but we can help you manage and preserve what you have. Our goal is to stop the premature breakdown of your existing tissue while supporting the highest quality 'new build' possible. It's about building a more stable daily foundation, not promising a miracle cure."
    },
    {
      icon: Pill,
      question: "Can I take this with my POTS or MCAS medications?",
      answer: "Safety is our first priority. We excluded ingredients that are known to interfere with common meds like beta-blockers or thyroid treatments. We generally recommend a 2-hour window between your medications and supplements. We provide a full ingredient breakdown that you can take directly to your doctor to ensure it fits your specific plan."
    },
    {
      icon: Sun,
      question: "Why is it split into a Morning and Evening system?",
      answer: "Your body needs different support at 8 AM than it does at 8 PM. In the morning, we focus on heart rate stability and brain fog; at night, we focus on histamine clearing and tissue repair. Splitting the dose also makes it much easier for your stomach to process the nutrients if you have slow digestion or gastroparesis."
    },
    {
      icon: ShieldOff,
      question: "Does this contain common triggers like gluten or dairy?",
      answer: "Absolutely not. We avoid gluten, dairy, soy, and corn-derived ingredients. We even removed 'standard' healthy fillers like bovine gelatin to avoid alpha-gal risk. We use only clean, hypoallergenic plant-based capsules and rice-based flow agents to keep your system calm."
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
            <span className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.4em]">ZebraWell Intelligence</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#3D3733] mb-6 leading-tight">
            Straight <span className="text-[#B36B4D] italic font-normal">Answers.</span>
          </h2>
          <p className="text-[#8A857C] text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
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
                  className="group border-none bg-white/40 backdrop-blur-md rounded-[2rem] px-8 transition-all duration-700 data-[state=open]:bg-white data-[state=open]:shadow-2xl data-[state=open]:shadow-[#B36B4D]/10 border border-transparent data-[state=open]:border-[#B36B4D]/10"
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
                <p className="text-[#8A857C] text-xs font-medium">We can provide a detailed data sheet for your doctor.</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-[#B36B4D] text-white font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-[#3D3733] transition-all shadow-md active:scale-95">
              Request Clinical Data
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
