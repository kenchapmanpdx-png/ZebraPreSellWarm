import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ShieldCheck, HeartHandshake, Ban, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function OurPromise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />

      {/* HEADER: RESTORED BLOB ENGINE WITH DEEP CONTRAST */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        {/* ========= THE BLOB LAYERS ========= */}
        <div className="absolute inset-0 z-0 heroBase" aria-hidden="true" />

        {/* Large moving plates for base beige coverage */}
        <div className="absolute inset-0 z-0 plate beigeA" aria-hidden="true" />
        <div className="absolute inset-0 z-0 plate beigeB" aria-hidden="true" />

        {/* DEEP SHADOW BLOBS: These create the visible movement */}
        <div className="absolute inset-0 z-0 blob deepShadowA" aria-hidden="true" />
        <div className="absolute inset-0 z-0 blob deepShadowB" aria-hidden="true" />

        {/* BRIGHT CREST BLOBS: The 'sparkle' on the wave */}
        <div className="absolute inset-0 z-0 blob brightCrest" aria-hidden="true" />

        {/* Grain Overlay for premium texture */}
        <div
          className="absolute inset-0 opacity-[0.05] z-[1] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <style>{`
          :root {
            --tan-base: #F6F1EB;
            --tan-mid: #E9E0D6;
            --shadow-greige: #4A4540; /* High Contrast Shadow */
            --deep-charcoal: #1C1C1C; /* Absolute Bottom Shadow */
          }

          .heroBase {
            position: absolute; inset: 0;
            background: linear-gradient(180deg, var(--tan-base) 0%, var(--tan-mid) 100%);
          }

          .plate, .blob {
            position: absolute;
            inset: -40%;
            pointer-events: none;
            will-change: transform;
          }

          /* BEIGE PLATES: The smooth background movement */
          .beigeA { 
            background: radial-gradient(circle at 20% 30%, #D6C7BA 0%, transparent 60%);
            filter: blur(40px);
            animation: moveSlow 20s ease-in-out infinite alternate;
          }
          .beigeB { 
            background: radial-gradient(circle at 80% 70%, #B5A295 0%, transparent 60%);
            filter: blur(40px);
            animation: moveSlow 25s ease-in-out infinite alternate-reverse;
          }

          /* DEEP SHADOWS: The 'Darker Sections' that show the liquid flow */
          .deepShadowA {
            background: radial-gradient(circle at 50% 100%, var(--deep-charcoal) 0%, transparent 50%);
            mix-blend-mode: multiply;
            opacity: 0.12;
            filter: blur(60px);
            animation: liquidFlow 12s ease-in-out infinite;
          }
          .deepShadowB {
            background: radial-gradient(circle at 10% 80%, var(--shadow-greige) 0%, transparent 50%);
            mix-blend-mode: multiply;
            opacity: 0.18;
            filter: blur(50px);
            animation: liquidFlow 15s ease-in-out infinite reverse;
          }

          /* BRIGHT CREST: High contrast white highlight */
          .brightCrest {
            background: radial-gradient(circle at 40% 20%, #FFFFFF 0%, transparent 40%);
            mix-blend-mode: screen;
            opacity: 0.8;
            filter: blur(30px);
            animation: liquidFlow 10s ease-in-out infinite;
          }

          @keyframes moveSlow {
            0% { transform: translate(-5%, -5%); }
            100% { transform: translate(5%, 5%); }
          }

          @keyframes liquidFlow {
            0% { transform: translate(-10%, -10%) rotate(0deg) scale(1); }
            50% { transform: translate(15%, 5%) rotate(5deg) scale(1.1); }
            100% { transform: translate(-10%, -10%) rotate(0deg) scale(1); }
          }
        `}</style>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/40 border border-[#0f2e24]/10 text-[#0f2e24] text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <HeartHandshake size={14} />
            Code of Ethics
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-[#0f2e24]">
            Our <span className="text-[#C8592B] italic font-normal">Promise</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#3E2723] font-medium max-w-2xl mx-auto leading-relaxed">
            Our commitment to the hEDS, POTS, and MCAS community.
          </p>
        </div>
      </section>

      {/* INTRO: BOLD COMMUNITY TEXT */}
      <section className="py-20 px-4 bg-[#DED9D0] border-b border-[#E8DCCA]/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#2c1810] mb-10 leading-snug">
            You've been dismissed by doctors, harmed by "safe" supplements, 
            and marketed to by companies that don't understand your unique physiology.
          </h2>
          <div className="bg-white/80 p-8 rounded-3xl border border-[#E8DCCA] shadow-xl shadow-black/5 max-w-3xl mx-auto">
            <p className="text-xl font-medium text-[#2c1810] italic leading-relaxed">
              "This company was built by a caregiver who watched someone they love struggle—and promised to do better."
            </p>
          </div>
        </div>
      </section>

      {/* PROMISE GRID */}
      <section className="py-24 px-4 bg-[#F4F2ED]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-10">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-700 shadow-sm">
                  <Ban size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2c1810]">What We Will <span className="text-red-700 underline underline-offset-8 decoration-red-200">Never</span> Do</h3>
              </div>
              <PromiseItem title="Never hide ingredients." desc="Full transparency. Every ingredient, every source, and every excipient disclosed. No 'proprietary blends.'" />
              <PromiseItem title="Never use known triggers." desc="No titanium dioxide. No mold-derived citric acid. No artificial dyes. We prioritize function over aesthetics." />
            </div>
            <div className="space-y-10">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#0f2e24] shadow-sm">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2c1810]">What We Will <span className="text-[#0f2e24] underline underline-offset-8 decoration-[#0f2e24]/20">Always</span> Do</h3>
              </div>
              <PromiseItem title="Always lead with evidence." desc="Every formulation grounded in human clinical research. When we don't know something, we say so." positive />
              <PromiseItem title="Always test for your needs." desc="Histamine screening. Heavy metals. Biogenic amines. The contaminants that actually affect your community." positive />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PromiseItem({ title, desc, positive = false }: { title: string, desc: string, positive?: boolean }) {
  return (
    <div className="group">
      <h4 className={`text-xl font-bold mb-3 flex items-center gap-2 ${positive ? 'text-[#0f2e24]' : 'text-[#2c1810]'}`}>{title}</h4>
      <p className="text-[#5D4037] leading-relaxed text-lg">{desc}</p>
    </div>
  );
}