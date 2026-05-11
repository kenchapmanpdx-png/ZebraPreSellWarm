/* client/src/pages/not-found.tsx */
import { Link } from "wouter";
import { ArrowRight, Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#B36B4D] mb-6">
            404 - Page Not Found
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#0F2A22] mb-6 leading-tight">
            That page <span className="text-[#B36B4D] italic font-normal">went off-road.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#3D3733] mb-12 leading-relaxed max-w-xl mx-auto">
            The page you're looking for isn't here. Maybe the URL changed, or maybe we never had it. Either way, here are some good places to head next.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <Link
              href="/"
              className="group flex flex-col items-center gap-3 p-6 bg-white/60 border border-white rounded-2xl hover:shadow-lg hover:bg-white transition-all"
            >
              <Home className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F2A22]">Home</span>
              <span className="text-xs text-[#5D5752]">Start at the top of the story.</span>
            </Link>
            <Link
              href="/the-how"
              className="group flex flex-col items-center gap-3 p-6 bg-white/60 border border-white rounded-2xl hover:shadow-lg hover:bg-white transition-all"
            >
              <ArrowRight className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F2A22]">The How</span>
              <span className="text-xs text-[#5D5752]">How the formula addresses each condition.</span>
            </Link>
            <Link
              href="/our-promise"
              className="group flex flex-col items-center gap-3 p-6 bg-white/60 border border-white rounded-2xl hover:shadow-lg hover:bg-white transition-all"
            >
              <ArrowRight className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#0F2A22]">Our Promise</span>
              <span className="text-xs text-[#5D5752]">What we'll and won't do with this formula.</span>
            </Link>
          </div>

          <p className="text-xs text-[#8A857C]">
            If you got here from a link on our site, let us know:{" "}
            <a href="mailto:ken@wellnessforzebras.com" className="text-[#B36B4D] hover:underline">
              ken@wellnessforzebras.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
