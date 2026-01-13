import { useState, useEffect } from "react";
import { Link } from "wouter";
import ZebraLogo from "./ZebraLogo";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? "bg-[#F5F3EE]/95 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Constrained logo size to prevent massive overlapping */}
          <div className="w-12 h-12 flex items-center justify-center">
            <ZebraLogo className="w-full h-full text-[#262321] fill-current" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-[#262321]">
            Zebra<span className="text-[#B36B4D]">Well</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-[11px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-[#B36B4D] text-[#262321]">
              {link.name}
            </Link>
          ))}
          <Link href="/#waitlist">
            <button className="bg-gradient-to-r from-[#0F2A22] to-[#1A4639] hover:from-[#14372D] hover:to-[#1F5244] text-white px-8 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95">
              Join Waitlist
            </button>
          </Link>
        </div>

        <button className="md:hidden text-[#262321]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}