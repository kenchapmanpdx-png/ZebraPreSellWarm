import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ZebraLogo from "./ZebraLogo";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Promise", href: "/our-promise" },
    { name: "Ingredients", href: "/#ingredients" },
    { name: "Story", href: "/#story" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        // Scrolled state uses Moody Alabaster glass effect
        scrolled ? "bg-[#F2F0ED]/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Brand Logo: Locked to Top Left */}
        <Link href="/">
          <a className="flex items-center gap-3 group">
            <ZebraLogo className={`w-9 h-9 transition-colors ${scrolled ? "text-[#262321]" : "text-[#262321]"} fill-current`} />
            <span className={`text-xl font-serif font-bold tracking-tight text-[#262321]`}>
              Zebra<span className="text-[#B36B4D]">Well</span>
            </span>
          </a>
        </Link>

        {/* Desktop Nav Links: Luxe Tracking */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-colors hover:text-[#B36B4D] ${
                scrolled ? "text-[#262321]" : "text-[#262321]"
              }`}>
                {link.name}
              </a>
            </Link>
          ))}
          <Link href="/#waitlist">
            <button className="bg-[#B36B4D] hover:bg-[#A04F3D] text-white px-8 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#B36B4D]/20 active:scale-95">
              Join Waitlist
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#262321]" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F2F0ED] border-t border-[#BCC2BB]/20 shadow-2xl py-8 flex flex-col items-center gap-6 md:hidden animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a 
                className="text-[#262321] text-xs font-bold uppercase tracking-[0.3em] hover:text-[#B36B4D]" 
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <Link href="/#waitlist">
            <button 
              className="bg-[#B36B4D] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest w-[80%]"
              onClick={() => setIsOpen(false)}
            >
              Join Waitlist
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}