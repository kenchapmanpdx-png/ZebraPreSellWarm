/* client/src/components/OurStory.tsx */
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function OurStory() {
  const fadeInRight = {
    hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { delay: 0.2 + i * 0.15, duration: 0.9, ease: [0.21, 0.45, 0.32, 0.9] }
    })
  };

  return (
    <section id="story" className="py-16 px-4 bg-[#F2F0EA] overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">

        {/* LEFT: PHOTO + QUOTE CARD ANCHORING */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-1/2 relative pl-4 pt-4"
        >
          {/* Decorative Trim */}
          <motion.div
            initial={{ x: -10, y: -10 }}
            whileInView={{ x: 0, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 left-0 right-4 bottom-4 border border-[#B36B4D]/30 rounded-[2.5rem] z-0"
          />

          {/* Image Container - MUST be overflow-visible for the card to float outside */}
          <div className="relative z-10 overflow-visible">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl bg-[#EDEAE3] border border-white/50">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                src="/images/ken-and-ava.webp"
                alt="Ken and Ava"
                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
              />
            </div>

            {/* FLOATING QUOTE CARD: Repositioned to barely overlap (5% at top) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6.75, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="relative mt-5 mx-auto right-auto bottom-auto w-[90%] max-w-[340px] md:absolute md:mt-0 md:mx-0 md:right-[-50px] md:bottom-[-130px] md:w-[78%] md:max-w-[280px] z-20 bg-white border-t border-l border-white/80 rounded-2xl p-5 md:p-6 shadow-[0_40px_80px_-15px_rgba(90,62,43,0.25)] backdrop-blur-sm will-change-transform"
            >
              <p className="text-[#3D3733] font-serif italic text-base md:text-lg leading-relaxed">
                "If it's not good enough for Ava, it's not good enough for you. And it's not going in."
              </p>
              <div className="w-12 h-[2px] bg-[#B36B4D] mt-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: CONTENT & COLOR RESTORATION */}
        <div className="w-full md:w-1/2 pt-12 md:pt-0">
          <motion.p
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}
            className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#B36B4D]/40" />
            Our Purpose
          </motion.p>

          <motion.h2
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-[#3D3733] mb-8 leading-[1.1]"
          >
            Behind every bottle is a deeper purpose and her name is{" "}
            <span className="text-[#B36B4D] italic font-normal">Ava</span>.
          </motion.h2>

          <div className="space-y-6 text-lg text-[#5D5752] leading-relaxed mb-12">
            <motion.p custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}>
              Ava is my daughter. She lives with scoliosis, <a href="https://www.ehlers-danlos.com/heds-diagnostic-checklist/" target="_blank" rel="noopener noreferrer" className="text-[#B36B4D] hover:underline font-bold">hEDS</a>, <a href="https://www.dysautonomiainternational.org/page.php?ID=30" target="_blank" rel="noopener noreferrer" className="text-[#B36B4D] hover:underline font-bold">POTS</a>, and <a href="https://tmsforacure.org/overview/mast-cell-activation-syndrome-mcas/" target="_blank" rel="noopener noreferrer" className="text-[#B36B4D] hover:underline font-bold">MCAS</a>. Mostly invisible conditions that affect everything from how her body uses nutrients to how she lives with chronic pain, subluxating joints, and extreme fatigue.
            </motion.p>
            <motion.p custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}>
              ZebraWell wasn't born in a boardroom. It was born from my relentless pursuit to help her feel better. Not just temporarily, but sustainably and safely.
            </motion.p>
            <motion.p custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} className="font-bold text-[#3D3733]">
              We couldn't find what she needed. So we created it. A system designed to be effective, tolerable, and honest about what's inside.
            </motion.p>
          </div>

          {/* CTA & WELCOME MESSAGE */}
          <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} className="flex flex-col gap-10">
            <Link
              href="/ingredients"
              className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 sm:gap-4 px-6 sm:px-12 py-4 sm:py-5 bg-[#0F2A22] hover:bg-[#B36B4D] text-white font-bold rounded-full shadow-2xl transition-all duration-500 transform hover:scale-[1.05] uppercase text-xs tracking-widest"
            >
              Explore Our Ingredients
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
            </Link>

            {/* THE MISSING HEART QUOTE - RESTORED */}
            <div className="flex items-start gap-4 max-w-md border-l-2 border-[#B36B4D]/20 pl-6 py-2">
              <Heart className="text-[#B36B4D] w-6 h-6 mt-1 flex-shrink-0 fill-[#B36B4D]" aria-hidden="true" />
              <p className="text-[14px] md:text-[16px] font-serif italic text-[#3D3733] leading-relaxed">
                "If you or someone you love is a Zebra, welcome to the herd."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}