import React, { useEffect } from "react";
// Import AOS for the scroll animations - Ensure this is installed in your project
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { datesFor, formatDateLabel } from "@/data/pageDates";
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

      <main id="main-content">
      {/* THE CONSTITUTION HEADER: Slow Fade Down */}
      <section className="relative pt-32 pb-20 px-6 bg-[#DED9D0]">
        <div className="container mx-auto max-w-5xl text-center relative z-10" data-aos="fade-down">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 max-w-[92vw] px-4 sm:px-6 py-2 rounded-full bg-white/60 border border-[#A4613A]/20 text-[#0F2A22] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] backdrop-blur-md shadow-sm text-center">
            <ShieldCheck size={16} className="text-[#A4613A] flex-shrink-0" aria-hidden="true" />
            The Zebra Science Promise
          </div>

          <h1 className="font-serif font-bold mb-10 text-[#5A3E2B] leading-tight break-words" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}>
            Our <span className="text-[#A4613A] italic font-normal">Constitution</span>
          </h1>

          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="px-8 py-10 rounded-[3rem] bg-white/40 border-2 border-white backdrop-blur-xl shadow-2xl">
              <p className="text-xl md:text-2xl text-[#3D3733] font-bold leading-relaxed">
                ZebraThrive exists because people with EDS, POTS and MCAS, conditions that are commonly co-reported, often find generic multivitamins hard to tolerate. We built a formulation around the sensitivities this community reports from the start, instead of adding a few headline ingredients to a standard multivitamin. This page is our constitution: a formal, public commitment to how we do that work.
              </p>
              {/* Byline backs the Article JSON-LD author/dates (prerender.tsx). */}
              <p className="mt-6 text-sm text-[#5D5752]">
                Written by <span className="font-medium text-[#3D3733]">Ken Chapman</span>, Founder of ZebraThrive.
                {datesFor("/our-promise") && (
                  <>
                    {" "}Last updated{" "}
                    <time dateTime={datesFor("/our-promise")!.modified}>
                      {formatDateLabel(datesFor("/our-promise")!.modified)}
                    </time>.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient-language intro - what the promise concretely means */}
      <section className="py-20 md:py-28 px-6 bg-[#EBE8E1]">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6 text-lg md:text-xl text-[#3D3733] leading-relaxed">
            <p>
              Our constitution is short and specific. <strong>The claims on our ingredient pages are linked to published research, and we flag where the evidence is lab or animal only.</strong> Summary pages like the homepage link to the ingredient pages, where the citations live. Mechanism citations include lab and animal studies where those are the best available evidence, labeled that way; dose claims come from human trials wherever those exist. Each ingredient page lists the PMID, authors, study design and finding so you can judge the evidence yourself, and we correct any citation found to be wrong or under notice. If we cannot back a claim with evidence, we do not make it.
            </p>
            <p>
              <a href="/excipients" className="text-[#8F5238] font-bold underline underline-offset-2 hover:text-[#3D3733]">Every confirmed excipient is listed on our Excipients page</a> and chosen for sensitive systems: HPMC capsules (no gelatin), a calcium carbonate opacifier on the PM caps (no titanium dioxide), and rice hull concentrate and L-leucine as flow agents (no magnesium stearate). We are confirming that the capsule shells contain no carrageenan. Some vitamins and actives arrive on carriers, and we list those too: maltodextrin on the vitamin D3 (about 18 mg a day), microcrystalline cellulose on the vitamin K2 (about 10 mg), sunflower lecithin and maltodextrin in the quercetin phytosome, dicalcium phosphate with the biotin (about 31 mg), maltodextrin and silica with the molybdenum (under 6 mg), and silica in the taurine (up to 7.5 mg). We are confirming the remaining carriers, including those in the astaxanthin beadlet, the selenium premix and the boron glycinate, with our manufacturer and will list them before launch. No FD&C dyes and no added citric acid, and we are confirming with suppliers that no raw-material carrier contains citric acid or soy. Some ingredients, including vitamin C, vitamin B2 and vitamin B12, are made with a fermentation step because no non-fermented commercial form exists, and we disclose which ones. Every ingredient lot will be checked against its Certificate of Analysis before production, and each finished batch will go through our manufacturer's finished-product testing before release.
            </p>
            <p>
              <strong>We don't claim to treat, cure, or prevent anything.</strong> We do aim to give you ingredients studied in published research, at doses chosen from human research wherever it exists, in a formulation built around the sensitivities people with EDS, POTS and MCAS commonly report.
            </p>
            <div className="border-l-4 border-[#A4613A] pl-6 py-3 bg-white/50 rounded-r-2xl mt-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5A3E2B] mb-3">Why we built this</h2>
              <p className="text-base md:text-lg text-[#4A4540]">
                We're zebras ourselves, and the existing supplement market wasn't serving us. Generic multivitamins often use forms and excipients our community finds hard to tolerate, and many specialty brands focus on a single concern. So we built one system around the sensitivities this community reports, the one we'd want to take ourselves.
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
                <h2 className="text-4xl font-serif font-bold text-[#262321]">
                  What We <span className="text-[#A4613A] italic underline decoration-[#A4613A]/30">Never</span> Do
                </h2>
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
                <h2 className="text-4xl font-serif font-bold text-[#262321]">
                  What We <span className="text-[#0F2A22] italic underline decoration-[#0F2A22]/30">Always</span> Do
                </h2>
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

      {/* THE BOTTOM LINE: high-contrast headline on dark green */}
      <section className="py-24 md:py-32 px-6 bg-[#0F2A22] overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#D4A373] mb-5">
            The Bottom Line
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 text-white">
            What it comes down to.
          </h2>
          <p className="text-xl md:text-2xl mb-16 italic font-serif text-[#EBE8E1]/90 max-w-3xl mx-auto">
            "We're not a wellness brand chasing trends. We're a safe harbor for people whose bodies don't follow the rules."
          </p>

          <div className="bg-[#A4613A] p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-2xl relative" data-aos="zoom-out-up">
            <div className="relative z-10">
              <p className="text-xs sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-6">The Zebra Filter</p>
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
      </main>

      <Footer />
    </div>
  );
}

// DATA ARRAYS REMAIN THE SAME BUT THE COPY IS REFINED FOR MAXIMUM "HOLY CRAP" IMPACT
const NEVER_DO = [
  {
    title: "Never hide ingredients.",
    desc: "Every ingredient and dose will be on the label, and every excipient we have confirmed is listed on our Excipients page. No proprietary blends. Where a supplier has not yet disclosed a carrier, we say so."
  },
  {
    title: "Leave out the excipients our community most often avoids.",
    desc: "No titanium dioxide. No added citric acid, and we are confirming that none arrives with any raw material. No artificial dyes. No added carrageenan, and we are confirming that the capsule shells are made without it. No magnesium stearate. We prioritize biological function over shelf aesthetics."
  },
  {
    title: "Never underdose.",
    desc: "We choose doses from published human studies wherever they exist, and each ingredient page explains the basis for its dose. No 'pixie dusting' just to pad the label."
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
    desc: "We start from human research where it exists, and we aim to label lab and animal evidence as exactly that. When the science isn't clear, we say so plainly."
  },
  {
    title: "Always verify what goes in.",
    desc: "Before production, each ingredient lot will be checked against its Certificate of Analysis and the specifications written into our purchase order, including heavy metals and microbial limits."
  },
  {
    title: "Always choose excipients for sensitive systems.",
    desc: "Few fillers, each one listed. Every carrier we have confirmed is listed on our Excipients page. We treat 'inactive' ingredients with the same scrutiny as active ones."
  },
  {
    title: "Always support titration.",
    desc: "Openable capsules. Powder options. We provide gradual-start guidance because many people in our community prefer to start low and go slow."
  },
  {
    title: "Always simplify.",
    desc: "Our system is designed to reduce your pill burden. One system in place of a shelf of separate bottles."
  },
  {
    title: "Always listen.",
    desc: "Your feedback shapes our formulation decisions. Your lived experience matters more to us than any marketing trend."
  }
];

const ACCOUNTABILITY = [
  {
    icon: Microscope,
    title: "Sourcing Disclosure",
    desc: "Each ingredient page lists the form we use and, for botanicals, the plant source, and says when a source decision is still open."
  },
  {
    icon: ClipboardList,
    title: "Certificates of Analysis",
    desc: "Every ingredient lot will be checked against its Certificate of Analysis before production, by us or by our manufacturer's quality team. Ask us about any of them."
  },
  {
    icon: Beaker,
    title: "cGMP Manufacturing",
    desc: "Made by a contract manufacturer operating under FDA's dietary supplement cGMP rule (21 CFR Part 111)."
  },
  {
    icon: FileSearch,
    title: "Ingredient Rationale",
    desc: "Each ingredient page explains why it is in the formula, at what dose, and what the evidence does and does not show."
  }
];