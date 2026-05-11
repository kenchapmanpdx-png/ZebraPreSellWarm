import React, { useEffect } from "react";
// Import AOS for the scroll animations - Ensure this is installed in your project
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  Microscope,
  Scissors
} from "lucide-react";

export default function OurPromise() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize animations with a slightly longer duration for a "Luxury" feel
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F2ED] overflow-x-hidden">
      <Navigation />

      {/* THE CONSTITUTION HEADER: Slow Fade Down */}
      <section id="main-content" className="relative pt-32 pb-20 px-6 bg-[#DED9D0]">
        <div className="container mx-auto max-w-5xl text-center relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full bg-white/60 border border-[#A4613A]/20 text-[#0F2A22] text-xs font-bold uppercase tracking-[0.4em] backdrop-blur-md shadow-sm">
            <ShieldCheck size={16} className="text-[#A4613A]" aria-hidden="true" />
            The Zebra Science Promise
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-10 text-[#5A3E2B] leading-tight">
            Our <span className="text-[#A4613A] italic font-normal">Constitution</span>
          </h1>

          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="px-8 py-10 rounded-[3rem] bg-white/40 border-2 border-white backdrop-blur-xl shadow-2xl">
              <p className="text-2xl md:text-3xl text-[#262321] font-serif font-bold leading-tight mb-6 italic">
                "We exist because the system failed you."
              </p>
              <p className="text-lg md:text-xl text-[#4A4540] font-medium leading-relaxed">
                ZebraWell wasn't born in a boardroom. It was built by a caregiver who watched someone they love struggle, and promised to do better. This is our formal commitment to doing it right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient-language intro — what the promise concretely means */}
      <section className="py-20 md:py-28 px-6 bg-[#EBE8E1]">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6 text-lg md:text-xl text-[#3D3733] leading-relaxed">
            <p>
              Our promise is short and specific. <strong>Every claim on this site is anchored to peer-reviewed human research</strong> — PMID, author, study title, dose, population. If we can't cite it, we don't claim it. Every excipient is disclosed and chosen for MCAS safety: HPMC capsules (no gelatin, no carrageenan), CaCO<sub>3</sub> opacifier on PM caps (no titanium dioxide), rice hull and L-leucine flow agents (no magnesium stearate). No FD&amp;C dyes, no citric acid, no fermented ingredients, no corn or soy derivatives. Every batch comes with Certificate of Analysis verification on identity, potency, and contaminants.
            </p>
            <p>
              <strong>We don't claim to treat, cure, or prevent anything.</strong> We do claim to give you ingredients with documented mechanisms in research, at doses supported by clinical evidence, in a formulation engineered for the sensitivities of the EDS/POTS/MCAS triad.
            </p>
            <div className="border-l-4 border-[#A4613A] pl-6 py-3 bg-white/50 rounded-r-2xl mt-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5A3E2B] mb-3">Why we built this</h2>
              <p className="text-base md:text-lg text-[#4A4540]">
                We're zebras ourselves, and the existing supplement market wasn't serving us — generic "multivitamins" load up on the wrong forms and the wrong excipients, while specialty MCAS brands lack the ECM-protective and methylation coverage that hEDS and POTS need. So we built what we'd want to take ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE MANIFESTO GRID: Side-scrolling reveals */}
      <section className="py-32 px-6 bg-[#F4F2ED]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* COLUMN 1: Slide in from Left */}
            <div className="space-y-12" data-aos="fade-right">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-[#A4613A]/20 pb-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#5A3E2B] flex items-center justify-center text-white shadow-lg">
                  <Ban size={28} aria-hidden="true" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-[#262321]">
                  What We <span className="text-[#A4613A] italic underline decoration-[#A4613A]/30">Never</span> Do
                </h3>
              </div>

              {NEVER_DO.map((item, idx) => (
                <div key={idx} className="relative pl-12 group" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <span className="absolute left-0 top-0 text-3xl font-serif font-bold text-[#A4613A]/20 group-hover:text-[#A4613A] transition-colors">
                    {idx + 1}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#5A3E2B] mb-3">{item.title}</h3>
                  <p className="text-[#4A4540] text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* COLUMN 2: Slide in from Right */}
            <div className="space-y-12" data-aos="fade-left">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-[#0F2A22]/20 pb-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#0F2A22] flex items-center justify-center text-white shadow-lg">
                  <CheckCircle2 size={28} aria-hidden="true" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-[#262321]">
                  What We <span className="text-[#0F2A22] italic underline decoration-[#0F2A22]/30">Always</span> Do
                </h3>
              </div>

              {ALWAYS_DO.map((item, idx) => (
                <div key={idx} className="relative pl-12 group" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <span className="absolute left-0 top-0 text-3xl font-serif font-bold text-[#0F2A22]/20 group-hover:text-[#0F2A22] transition-colors">
                    {idx + 1}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#5A3E2B] mb-3">{item.title}</h3>
                  <p className="text-[#4A4540] text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNTABILITY: Staggered Fade Up */}
      <section className="py-24 px-6 bg-[#DED9D0]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16" data-aos="zoom-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#262321] mb-6">Our Accountability</h2>
            <div className="w-24 h-1 bg-[#A4613A] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACCOUNTABILITY.map((x, idx) => {
              const Icon = x.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/60 p-10 rounded-[3rem] border border-white text-center shadow-xl hover:-translate-y-2 transition-transform duration-500"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                >
                  <div className="w-14 h-14 bg-[#0F2A22] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Icon size={24} className="text-[#A4613A]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#262321] mb-4">{x.title}</h3>
                  <p className="text-[#4A4540] text-sm leading-relaxed">{x.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* THE BOTTOM LINE: Dramatic Scale-In */}
      <section className="py-32 px-6 bg-[#0F2A22] overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center text-[#EBE8E1]">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10" data-aos="fade-up">The Bottom Line</h2>
          <p className="text-xl md:text-2xl mb-16 opacity-80 italic font-serif" data-aos="fade-up" data-aos-delay="200">
            "We're not a wellness brand chasing trends. We're a safe harbor for people whose bodies don't follow the rules."
          </p>

          <div className="bg-[#A4613A] p-12 rounded-[4rem] text-white shadow-2xl relative" data-aos="zoom-out-up">
            <div className="relative z-10">
              <p className="text-lg font-bold uppercase tracking-[0.4em] mb-6">The Zebra Filter</p>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-8 italic">Does this serve the patient?</h3>
              <div className="flex flex-col md:flex-row justify-center gap-12 text-lg font-bold">
                <span className="flex items-center gap-3"><CheckCircle2 className="text-[#0F2A22]" aria-hidden="true" /> If yes, we do it.</span>
                <span className="flex items-center gap-3"><Ban className="text-[#0F2A22]" aria-hidden="true" /> If no, we don't.</span>
              </div>
            </div>
            <ShieldCheck size={200} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// DATA ARRAYS REMAIN THE SAME BUT THE COPY IS REFINED FOR MAXIMUM "HOLY CRAP" IMPACT
const NEVER_DO = [
  {
    title: "Never hide ingredients.",
    desc: "Full transparency. Every ingredient, every source, and every excipient disclosed. No 'proprietary blends.' No secrets."
  },
  {
    title: "Never use known triggers.",
    desc: "No titanium dioxide. No mold-derived citric acid. No artificial dyes. No carrageenan. We prioritize biological function over shelf aesthetics."
  },
  {
    title: "Never underdose.",
    desc: "If a dose isn't at a clinically effective level, it doesn't belong. We refuse to use 'pixie dusting' just to pad our labels."
  },
  {
    title: "Never ignore your medications.",
    desc: "We research how our ingredients interact with beta-blockers, fludrocortisone, midodrine, and the other medications you actually take."
  },
  {
    title: "Never exploit your desperation.",
    desc: "No miracle claims. No fear tactics. No hype. We provide evidence and honesty, not false hope."
  },
  {
    title: "Never dismiss your reactions.",
    desc: "If you report a problem, we believe you first and investigate second. You've been gaslit by the medical industry enough."
  }
];

const ALWAYS_DO = [
  {
    title: "Always lead with evidence.",
    desc: "Every formulation is grounded in human clinical research. When the science isn't clear, we say so plainly."
  },
  {
    title: "Always test for what matters.",
    desc: "Histamine screening. Heavy metals. Biogenic amines. We test for the specific contaminants that trigger your population."
  },
  {
    title: "Always use MCAS-safe excipients.",
    desc: "Minimal fillers. Hypoallergenic alternatives. We treat 'inactive' ingredients with the same scrutiny as active ones."
  },
  {
    title: "Always support titration.",
    desc: "Openable capsules. Powder options. We provide micro-dosing guidance because 'low and slow' is how your body works."
  },
  {
    title: "Always simplify.",
    desc: "Our system is designed to reduce your pill burden. One trusted solution to replace twenty random bottles."
  },
  {
    title: "Always listen.",
    desc: "Your feedback shapes our lab work. Your lived experience matters more to us than any marketing trend."
  }
];

const ACCOUNTABILITY = [
  {
    icon: Microscope,
    title: "Sourcing Disclosure",
    desc: "Full ingredient sourcing is disclosed on every single product we release."
  },
  {
    icon: ClipboardList,
    title: "Certificates of Analysis",
    desc: "Third-party COAs are available upon request to verify the molecular purity of every batch."
  },
  {
    icon: Beaker,
    title: "cGMP Manufacturing",
    desc: "Strict adherence to current Good Manufacturing Practices with rigorous third-party verification."
  },
  {
    icon: FileSearch,
    title: "Decision Logs",
    desc: "Public logs documenting exactly why we included or excluded every ingredient in the formula."
  }
];