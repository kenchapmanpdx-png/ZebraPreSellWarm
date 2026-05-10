/* client/src/components/Navigation.tsx */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Purpose", href: "/#story" },
    // { name: "Ingredients", href: "/ingredients" }, // hidden until launch
    { name: "The How", href: "/the-how" },
    // { name: "Quality", href: "/#quality" }, // hidden
    // { name: "Formulas", href: "/#products" }, // hidden
    { name: "Our Promise", href: "/our-promise" },
    // { name: "Reserve", href: "/preorder" }, // hidden
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#EBE8E1]/80 backdrop-blur-xl border-b border-white/20 py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          aria-label="ZebraWell home"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-[#3D3733] rounded-lg flex items-center justify-center text-[#EBE8E1] font-serif font-bold text-lg group-hover:bg-[#B36B4D] transition-colors">
            Z
          </div>
          <span className="font-serif font-bold text-2xl text-[#3D3733] tracking-tight">
            Zebra<span className="text-[#B36B4D]">Well</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors relative group ${location === link.href ? 'text-[#B36B4D]' : 'text-[#5D5752] hover:text-[#B36B4D]'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#B36B4D] transition-all duration-300 ${location === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>

        {/* ACTION BUTTONS — styled as link to preserve SEO + avoid nesting */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#waitlist"
            className="px-6 py-2.5 bg-[#0F2A22] hover:bg-[#B36B4D] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 shadow-lg inline-block"
          >
            Join Waitlist
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-[#3D3733]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#EBE8E1] border-t border-[#3D3733]/10 shadow-2xl md:hidden p-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D3733]"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-[#0F2A22] text-white font-bold uppercase tracking-[0.2em] rounded-xl active:bg-[#B36B4D] text-center"
            >
              Join Waitlist
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
