/* client/src/components/OurStory.tsx */

import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function OurStory() {
  return (
    <section className="py-24 px-4 bg-[#F4F2ED]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* LEFT: PHOTO + TRIM + QUOTE */}
        <div className="w-full md:w-1/2 relative pl-4 pt-4">
          {/* Padding ensures the trim never gets clipped */}
          <div className="absolute top-0 left-0 right-4 bottom-4 border-2 border-[#7A8691] rounded-[2rem] z-0" />

          {/* Wrapper must allow overflow so the quote can sit mostly OUTSIDE the image */}
          <div className="relative z-10 overflow-visible">
            {/* Image stays clipped to rounded corners */}
            <div className="overflow-hidden rounded-[2rem] shadow-2xl bg-[#EDEAE3]">
              <img
                src="/images/ken-and-ava.png"
                alt="Ken and Ava"
                className="w-full h-auto object-cover grayscale-[0.15] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>

            {/* Quote card: only top ~10% overlaps into the photo */}
            <div
              className="
                absolute
                right-5 md:right-6
                top-full
                -translate-y-[10%]
                z-20
                w-[58%] sm:w-[44%] md:w-[40%]
                max-w-[260px] md:max-w-[280px]
                bg-[#FBFAF7]
                rounded-2xl
                p-3 md:p-4
                shadow-xl
                border border-[#E8E2D8]
              "
            >
              <p className="text-[#262321] font-serif italic text-xs md:text-sm leading-snug">
                If it’s not good enough for Ava, it’s not good enough for you.
                <br />
                And it’s not going in.
              </p>
              <div className="w-6 h-[2px] bg-[#B36B4D] mt-2" />
            </div>
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="w-full md:w-1/2 pt-12 md:pt-0">
          <p className="text-[#7A8691] font-bold uppercase tracking-[0.25em] mb-4">
            Our Purpose
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-6 leading-tight">
            Behind every bottle is a deeper purpose and her name is{" "}
            <span className="text-[#C85A32] italic font-normal text-[110%]">Ava</span>.
          </h2>

          <div className="space-y-6 text-lg text-[#4A4540] leading-relaxed mb-10">
            <p>
              Ava is my daughter. She lives with scoliosis, hEDS, POTS, and MCAS. Mostly
              invisible conditions that affect everything from how her body uses nutrients to
              how she lives with chronic pain, subluxating joints, and extreme fatigue.
            </p>

            <p>
              ZebraWell wasn’t born in a boardroom. It was born from my relentless pursuit to
              help her feel better. Not just temporarily, but sustainably and safely.
            </p>

            <p className="font-medium text-[#2c1810]">
              We couldn’t find what she needed. So we created it. A system designed to be
              effective, tolerable, and honest about what’s inside.
            </p>
          </div>

          {/* CTA */}
          <Link href="/ingredients">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#A4613A] hover:bg-[#8E5433] active:bg-[#744428] text-white font-bold rounded-full shadow-lg shadow-black/10 transition-all transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]">
              Explore Our Ingredients
              <ArrowRight size={20} />
            </button>
          </Link>

          {/* Subtext */}
          <div className="flex items-center gap-3 mt-6 text-sm text-[#5D5752]">
            <span className="text-red-600">❤️</span>
            <span>If you or someone you love is a Zebra, welcome to the herd.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
