/* client/src/components/Footer.tsx */
import { Link } from "wouter";
import { ArrowUp } from "lucide-react";

// Build-time stamp - shows on the visible Last Updated footer line.
// Bump implicitly each Vercel build so freshness signal matches real content cadence.
const LAST_UPDATED = new Date().toISOString().slice(0, 10);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2A22] text-[#EBE8E1] pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#EBE8E1] rounded-lg flex items-center justify-center text-[#3D3733] font-serif font-bold text-xl">
                Z
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight">
                Zebra<span className="text-[#B36B4D]">Thrive</span>
              </span>
            </div>
            <p className="text-[#EBE8E1]/60 text-sm leading-relaxed mb-8">
              Clinical-grade stability for the hyper-mobile and histamine-sensitive.
              Research-driven. Zero compromise.
            </p>
          </div>

          {/* Explore Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <h3 className="text-[#B36B4D] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Explore</h3>
              <ul className="space-y-4 text-sm font-medium text-[#EBE8E1]/80">
                <li><a href="/#story" className="hover:text-white transition-colors">Our Story</a></li>
                <li><Link href="/ingredients" className="hover:text-white transition-colors">Ingredients</Link></li>
                <li><Link href="/our-promise" className="hover:text-white transition-colors">The Constitution</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#B36B4D] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Legal</h3>
              <ul className="space-y-4 text-sm font-medium text-[#EBE8E1]/80">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping &amp; Returns</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* FTC SUPPLEMENT DISCLOSURE - required for dietary supplements */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-[10px] text-[#EBE8E1]/60 leading-relaxed max-w-4xl">
            <strong className="text-[#EBE8E1]/80">Important:</strong> These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
            Information on this site is for educational purposes only and is not a substitute for professional medical advice.
            Always consult your physician before starting any new supplement, especially if you take prescription medications or have a diagnosed medical condition.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#EBE8E1]/40 uppercase tracking-widest">
            © {year} ZebraThrive. All rights reserved.
            <span className="ml-3 opacity-80">
              Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
            </span>
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="text-[10px] uppercase tracking-widest text-[#EBE8E1]/60 hover:text-[#B36B4D] transition-colors inline-flex items-center gap-2"
          >
            Back to Top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
