import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HeartHandshake,
  Ban,
  CheckCircle2,
  ShieldCheck,
  FlaskConical,
  BookOpenCheck,
  ClipboardList,
  FileSearch,
  Scale,
  ShieldAlert,
  Beaker,
  AlertTriangle,
} from "lucide-react";

type PromiseItemType = {
  title: string;
  desc: string;
};

const NEVER_DO: PromiseItemType[] = [
  {
    title: "Never hide what’s inside.",
    desc:
      "No proprietary blends. No vague “natural flavors.” If it’s in the bottle, you’ll see it—clearly.",
  },
  {
    title: "Never use risky “inactive ingredients.”",
    desc:
      "No dyes. No titanium dioxide. No unnecessary fillers or additives that can cause reactions.",
  },
  {
    title: "Never underdose ingredients.",
    desc:
      "If a dose can’t realistically help, it doesn’t belong. No label decoration. No wasted money.",
  },
  {
    title: "Never rebrand generic supplements.",
    desc:
      "We don’t take a “wellness” blend and slap your condition on the front. We build for your reality.",
  },
  {
    title: "Never chase trends or buzzwords.",
    desc:
      "No detox theater. No miracle language. No fads without real evidence and clear reasons.",
  },
  {
    title: "Never exploit desperation.",
    desc:
      "No fear marketing. No fake urgency. No manipulation. Your hope is not a sales tactic.",
  },
];

const ALWAYS_DO: PromiseItemType[] = [
  {
    title: "Always show the full formula.",
    desc:
      "Every ingredient listed. No guessing. No games. You deserve clarity before you ever swallow a capsule.",
  },
  {
    title: "Always design for sensitive bodies.",
    desc:
      "We assume you react to things other people ignore—because many of you do.",
  },
  {
    title: "Always keep the “other ingredients” minimal.",
    desc:
      "We minimize fillers and additives and choose the simplest options whenever possible.",
  },
  {
    title: "Always verify quality you can check.",
    desc:
      "cGMP manufacturing. Third-party testing. Certificates of Analysis available. Standards that can be verified—not just claimed.",
  },
  {
    title: "Always be honest about what we know.",
    desc:
      "If evidence is limited, we say that plainly. If something is still theoretical, we label it as such.",
  },
  {
    title: "Always improve when we learn.",
    desc:
      "When better data emerges, we update. No silent changes. No pretending we were perfect.",
  },
];

const NON_NEGOTIABLES = [
  {
    icon: ShieldCheck,
    title: "No guesswork",
    desc: "You shouldn’t have to gamble with “probably fine.” We build for clarity and safety-first decision making.",
  },
  {
    icon: FlaskConical,
    title: "Quality you can verify",
    desc: "Testing and documentation that supports trust—because trust without proof isn’t enough for this community.",
  },
  {
    icon: BookOpenCheck,
    title: "Built with real evidence",
    desc: "We prioritize human research and practical dosing logic—then we explain our choices in plain English.",
  },
];

const ACCOUNTABILITY = [
  {
    icon: ClipboardList,
    title: "Decision logs",
    desc: "We document major formulation decisions so you can understand what changed and why.",
  },
  {
    icon: FileSearch,
    title: "No silent reformulations",
    desc: "If we change something, we tell you. Period.",
  },
  {
    icon: Scale,
    title: "Truth > marketing",
    desc: "Tradeoffs exist. Uncertainty exists. We won’t pretend otherwise.",
  },
  {
    icon: ShieldAlert,
    title: "Community-first response",
    desc: "If someone reacts, we take it seriously, investigate, and improve—no dismissing, no minimizing.",
  },
];

export default function OurPromise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />

      {/* HERO / HEADER */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        {/* ========= BLOB LAYERS ========= */}
        <div className="absolute inset-0 z-0 heroBase" aria-hidden="true" />
        <div className="absolute inset-0 z-0 plate beigeA" aria-hidden="true" />
        <div className="absolute inset-0 z-0 plate beigeB" aria-hidden="true" />
        <div className="absolute inset-0 z-0 blob deepShadowA" aria-hidden="true" />
        <div className="absolute inset-0 z-0 blob deepShadowB" aria-hidden="true" />
        <div className="absolute inset-0 z-0 blob brightCrest" aria-hidden="true" />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] z-[1] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* UPDATED COLOR SYSTEM FOR THE MOVING GRADIENT */}
        <style>{`
          :root {
            /* Base canvas (matches your site baseline) */
            --tan-base: #F4F2ED;   /* light */
            --tan-mid:  #EBE8E1;   /* baseline */
            --tan-deep: #DED9D0;   /* deeper neutral */

            /* Shadow system (warm, not black) */
            --shadow-1: #3A2F26;   /* espresso */
            --shadow-2: #4A4540;   /* warm greige shadow */

            /* Highlights (white + subtle copper warmth) */
            --crest-1: rgba(255, 255, 255, 0.85);
            --crest-2: rgba(164, 97, 58, 0.22);
          }

          .heroBase {
            position: absolute; inset: 0;
            background: linear-gradient(180deg, var(--tan-base) 0%, var(--tan-mid) 55%, var(--tan-deep) 100%);
          }

          .plate, .blob {
            position: absolute;
            inset: -40%;
            pointer-events: none;
            will-change: transform;
          }

          /* Subtle moving plates (avoid muddy beige) */
          .beigeA {
            background: radial-gradient(circle at 20% 30%, rgba(222, 217, 208, 0.9) 0%, transparent 60%);
            filter: blur(42px);
            animation: moveSlow 20s ease-in-out infinite alternate;
          }
          .beigeB {
            background: radial-gradient(circle at 80% 70%, rgba(235, 232, 225, 0.9) 0%, transparent 62%);
            filter: blur(46px);
            animation: moveSlow 25s ease-in-out infinite alternate-reverse;
          }

          /* Warm espresso shadows */
          .deepShadowA {
            background: radial-gradient(circle at 50% 100%, var(--shadow-1) 0%, transparent 52%);
            mix-blend-mode: multiply;
            opacity: 0.10;
            filter: blur(64px);
            animation: liquidFlow 12s ease-in-out infinite;
          }
          .deepShadowB {
            background: radial-gradient(circle at 10% 80%, var(--shadow-2) 0%, transparent 55%);
            mix-blend-mode: multiply;
            opacity: 0.14;
            filter: blur(56px);
            animation: liquidFlow 15s ease-in-out infinite reverse;
          }

          /* Bright crest: white highlight + faint copper glow */
          .brightCrest {
            background:
              radial-gradient(circle at 38% 18%, var(--crest-1) 0%, transparent 40%),
              radial-gradient(circle at 65% 28%, var(--crest-2) 0%, transparent 48%);
            mix-blend-mode: screen;
            opacity: 0.85;
            filter: blur(34px);
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
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/45 border border-black/5 text-[#0f2e24] text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <HeartHandshake size={14} />
            Code of Ethics
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-[#0f2e24]">
            Our <span className="text-[#C8592B] italic font-normal">Promise</span>
          </h1>

          {/* HERO SUBHEADLINE: HIGH CONTRAST + DOESN’T BLEND INTO THE GRADIENT */}
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-6 py-4 rounded-3xl bg-white/55 border border-black/5 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.10)]">
              <p className="text-lg md:text-2xl text-[#2c1810] font-semibold leading-relaxed">
                If your body reacts, <span className="text-[#C8592B] font-bold">“probably fine”</span> isn’t fine.
                <span className="block mt-2 text-[#5D4037] font-medium">
                  We build supplements you can trust—because you can see exactly what you’re taking.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT INTRO */}
      <section className="py-20 px-4 bg-[#DED9D0] border-b border-black/5">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#2c1810] mb-10 leading-snug">
            You’ve been dismissed by doctors, harmed by “safe” supplements, and marketed to by brands
            that don’t understand your physiology.
          </h2>

          <div className="bg-white/80 p-8 rounded-3xl border border-black/5 shadow-xl shadow-black/5 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-medium text-[#2c1810] italic leading-relaxed">
              This is a safety-first promise—built for people who can’t afford guesswork.
            </p>
          </div>

          {/* Non-negotiables */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {NON_NEGOTIABLES.map((x, idx) => {
              const Icon = x.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F4F2ED]/90 border border-black/5 rounded-3xl p-8 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/70 border border-black/5 flex items-center justify-center text-[#0f2e24] mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#2c1810] mb-2">{x.title}</h3>
                  <p className="text-[#5D4037] leading-relaxed">{x.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMISE GRID */}
      <section className="py-24 px-4 bg-[#F4F2ED]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* NEVER */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 mb-8 border-b border-black/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-700 shadow-sm">
                  <Ban size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2c1810]">
                  What We Will{" "}
                  <span className="text-red-700 underline underline-offset-8 decoration-red-200">
                    Never
                  </span>{" "}
                  Do
                </h3>
              </div>
              {NEVER_DO.map((item, idx) => (
                <PromiseItem key={idx} title={item.title} desc={item.desc} />
              ))}
            </div>

            {/* ALWAYS */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 mb-8 border-b border-black/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#0f2e24] shadow-sm">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2c1810]">
                  What We Will{" "}
                  <span className="text-[#0f2e24] underline underline-offset-8 decoration-[#0f2e24]/20">
                    Always
                  </span>{" "}
                  Do
                </h3>
              </div>
              {ALWAYS_DO.map((item, idx) => (
                <PromiseItem key={idx} title={item.title} desc={item.desc} positive />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNTABILITY SECTION */}
      <section className="py-24 px-4 bg-[#EBE8E1] border-t border-black/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/55 border border-black/5 text-[#0f2e24] text-xs font-bold uppercase tracking-widest backdrop-blur-sm shadow-sm">
              <Beaker size={14} />
              Accountability
            </div>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0f2e24] mb-5">
              We don’t ask for trust. We build it.
            </h3>
            <p className="text-lg md:text-xl text-[#5D4037] max-w-3xl mx-auto leading-relaxed">
              This isn’t branding. It’s a set of constraints we hold ourselves to—because the people we
              serve deserve standards they can verify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACCOUNTABILITY.map((x, idx) => {
              const Icon = x.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F4F2ED]/90 border border-black/5 rounded-3xl p-8 shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/70 border border-black/5 flex items-center justify-center text-[#0f2e24] shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#2c1810] mb-2">
                        {x.title}
                      </h4>
                      <p className="text-[#5D4037] leading-relaxed">{x.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Honest note (no medical claims) */}
          <div className="mt-12 max-w-4xl mx-auto bg-white/55 border border-black/5 rounded-3xl p-7">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F4F2ED] border border-black/5 flex items-center justify-center text-[#C8592B] shrink-0">
                <AlertTriangle size={18} />
              </div>
              <div>
                <p className="text-[#2c1810] font-semibold mb-1">No false promises.</p>
                <p className="text-[#5D4037] leading-relaxed">
                  We don’t claim to diagnose, treat, cure, or prevent disease. We promise something
                  different: transparency, careful standards, and respect for high-sensitivity bodies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PromiseItem({
  title,
  desc,
  positive = false,
}: {
  title: string;
  desc: string;
  positive?: boolean;
}) {
  return (
    <div className="group">
      <h4
        className={`text-xl font-bold mb-3 flex items-center gap-2 ${
          positive ? "text-[#0f2e24]" : "text-[#2c1810]"
        }`}
      >
        {title}
      </h4>
      <p className="text-[#5D4037] leading-relaxed text-lg">{desc}</p>
    </div>
  );
}
