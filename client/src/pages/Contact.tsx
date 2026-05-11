import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-3">Contact Support</h1>
          <p className="text-lg text-[#3D3733] mb-10 leading-relaxed">
            We read every message. ZebraWell is built by people who live with the conditions we formulate for, and we treat your questions with that respect.
          </p>

          <section className="bg-white/60 border border-[#3D3733]/10 rounded-2xl p-8 md:p-10 mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#B36B4D]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#B36B4D]" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0F2A22]">Email us</h2>
            </div>
            <p className="text-[#3D3733] leading-relaxed mb-6">
              For product questions, formulation feedback, partnership inquiries, press, or anything else - drop us a line.
              We aim to respond within two business days.
            </p>
            <a
              href="mailto:ken@wellnessforzebras.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2A22] hover:bg-[#B36B4D] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors"
            >
              ken@wellnessforzebras.com
            </a>
          </section>

          <section className="space-y-6 text-[#3D3733] leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-[#0F2A22]">What's helpful to include</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your question or topic.</li>
              <li>If it's about a specific ingredient, the name of that ingredient.</li>
              <li>If it's about an interaction with a medication you take, name the medication (we won't share this - see the privacy policy).</li>
              <li>If you'd prefer not to use email, mention how you'd like us to reach you instead.</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
