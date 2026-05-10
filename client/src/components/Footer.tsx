/* client/src/components/Footer.tsx */
import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3D3733] text-[#EBE8E1] py-20 px-6 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0F2A22] via-[#B36B4D] to-[#0F2A22] opacity-50" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

        {/* Brand Column */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#EBE8E1] rounded-lg flex items-center justify-center text-[#3D3733] font-serif font-bold text-xl">
              Z
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight">
              Zebra<span className="text-[#B36B4D]">Well</span>
            </span>
          </div>
          <p className="text-[#EBE8E1]/60 text-sm leading-relaxed mb-8">
            Clinical-grade stability for the hyper-mobile and histamine-sensitive.
            Research-driven. Zero compromise.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="ZebraWell on Twitter" className="p-2 bg-white/10 rounded-full hover:bg-[#B36B4D] transition-colors"><Twitter size={18} aria-hidden="true" /></a>
            <a href="#" aria-label="ZebraWell on Instagram" className="p-2 bg-white/10 rounded-full hover:bg-[#B36B4D] transition-colors"><Instagram size={18} aria-hidden="true" /></a>
            <a href="#" aria-label="ZebraWell on LinkedIn" className="p-2 bg-white/10 rounded-full hover:bg-[#B36B4D] transition-colors"><Linkedin size={18} aria-hidden="true" /></a>
          </div>
        </div>

        {/* Links Column */}
        <div className="grid grid-cols-2 gap-16">
          <div>
            <h3 className="text-[#B36B4D] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-medium text-[#EBE8E1]/80">
              <li><a href="/#story" className="hover:text-white transition-colors">Our Story</a></li>
              <li><Link href="/ingredients" className="hover:text-white transition-colors">Ingredients</Link></li>
              <li><a href="/#science" className="hover:text-white transition-colors">The Science</a></li>
              <li><a href="/#quality" className="hover:text-white transition-colors">Quality Standards</a></li>
              <li><a href="/#products" className="hover:text-white transition-colors">Formulas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#B36B4D] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Legal</h3>
            <ul className="space-y-4 text-sm font-medium text-[#EBE8E1]/80">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-[#EBE8E1]/40 uppercase tracking-widest">
          © 2025 ZebraWell. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B36B4D] hover:text-white transition-colors"
        >
          Back to Top <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}