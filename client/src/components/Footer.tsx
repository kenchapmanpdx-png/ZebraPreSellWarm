import { Link } from "wouter";
import ZebraLogo from "./ZebraLogo";
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    // NEW: Deep Umber background, Alabaster text, and Subtle Graphite border
    <footer className="bg-[#262321] text-[#F2F0ED] pt-20 pb-10 border-t border-[#3C3835]">
      <div className="container mx-auto px-6">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo color set to Alabaster for visibility */}
              <ZebraLogo className="w-10 h-10 text-[#F2F0ED] fill-current" />
              <span className="text-2xl font-serif font-bold text-[#F2F0ED]">
                Zebra<span className="text-[#B36B4D]">Well</span>
              </span>
            </div>
            <p className="text-[#BCB4AD] mb-6 max-w-md leading-relaxed">
              Clinical-grade support for the POTS, EDS, and MCAS community. 
              Built by patients, for patients. 100% transparent, 0% fillers.
            </p>
            <div className="flex space-x-4">
              {/* Updated social icons to Slate backgrounds */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A5560] flex items-center justify-center text-[#F2F0ED] hover:bg-[#B36B4D] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A5560] flex items-center justify-center text-[#F2F0ED] hover:bg-[#B36B4D] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A5560] flex items-center justify-center text-[#F2F0ED] hover:bg-[#B36B4D] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-[#7A8691] uppercase tracking-wider mb-6 text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/our-promise" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">Our Promise</Link></li>
              <li><Link href="/#story" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">Our Story</Link></li>
              <li><Link href="/#faq" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">FAQ</Link></li>
              <li><a href="mailto:hello@zebrawell.com" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-[#7A8691] uppercase tracking-wider mb-6 text-sm">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/#products" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">Daily Foundation</Link></li>
              <li><Link href="/#ingredients" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">Ingredients</Link></li>
              <li><Link href="/#science" className="text-[#F2F0ED] hover:text-[#B36B4D] transition-colors">The Science</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3C3835] flex flex-col md:flex-row justify-between items-center text-sm text-[#7A8691]">
          <p>© 2025 ZebraWell. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#F2F0ED] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F2F0ED] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F2F0ED] transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}