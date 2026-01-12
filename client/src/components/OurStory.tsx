/* client/src/components/OurStory.tsx */

import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function OurStory() {
  return (
    <section className="py-24 px-4 bg-[#F4F2ED]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Left: The Personal Photo with Slate Blue Trim */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#7A8691] rounded-[2rem] z-0" /> {/* Slate Blue Trim */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl">
            <img 
              src="/images/ken-and-ava.jpg" 
              alt="Ken and Ava" 
              className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Right: The Content */}
        <div className="w-full md:w-1/2">
          <p className="text-[#7A8691] font-bold uppercase tracking-[0.2em] mb-4">The ZebraWell Origin</p> {/* Slate Blue Label */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#262321] mb-6 leading-tight">
            Behind every bottle is a deeper purpose and her name is <span className="text-[#B36B4D] italic font-normal">Ava</span>.
          </h2>

          <div className="space-y-6 text-lg text-[#4A4540] leading-relaxed mb-10">
            <p>
              ZebraWell wasn't born in a boardroom; it was born at a kitchen table surrounded by 
              medical journals and laboratory test results.
            </p>
            <p>
              When Ken's daughter, Ava, was diagnosed with EDS and POTS, they found a supplement 
              market filled with fillers and "one-size-fits-all" solutions that ignored her unique sensitivity.
            </p>
          </div>

          {/* Primary Action: Muted Umber Button */}
          <Link href="/our-story">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#A4613A] hover:bg-[#8E5433] active:bg-[#744428] text-white font-bold rounded-full shadow-lg shadow-black/10 transition-all transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]">
              Read Our Full Story
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}