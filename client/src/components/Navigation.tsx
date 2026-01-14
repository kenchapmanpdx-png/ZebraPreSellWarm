/* client/src/components/Navigation.tsx */
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import ZebraLogo from "./ZebraLogo";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling to hash targets
  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return;

    // Small delay to ensure DOM is ready after navigation
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, []);

  // Handle navigation click - manages both routing and scrolling
  const handleNavClick = (href: string) => {
    setIsOpen(false); // Close mobile menu

    // Parse the href to get path and hash
    const [path, hash] = href.includes("#") ? href.split("#") : [href, ""];
    const targetPath = path || "/";
    const targetHash = hash ? `#${hash}` : "";

    // If we're already on the target path (or it's home)
    if (location === targetPath || (targetPath === "/" && location === "/")) {
      if (targetHash) {
        // Just scroll to the section
        scrollToHash(targetHash);
      } else {
        // No hash means scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Navigate to the new path, then scroll
      setLocation(targetPath);
      if (targetHash) {
        scrollToHash(targetHash);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Handle logo click - always go home and scroll to top
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location === "/") {
      // Already home, just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate home, then scroll to top
      setLocation("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const navLinks = [
    { name: "Our Promise", href: "/our-promise" },
    { name: "Ingredients", href: "/#ingredients" },
    { name: "Story", href: "/#story" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? "bg-[#F2F0EA]/95 backdrop-blur-md py-3 shadow-sm border-b border-black/5" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO - Click to return Home and scroll to top */}
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <ZebraLogo className="w-full h-full text-[#262321] fill-current transform group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-[#262321]">
            Zebra<span className="text-[#B36B4D]">Well</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[11px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-[#B36B4D] text-[#262321] cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#waitlist"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/#waitlist");
            }}
          >
            <button className="bg-gradient-to-r from-[#0F2A22] to-[#1A4639] hover:from-[#14372D] hover:to-[#1F5244] text-white px-8 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95">
              Join Waitlist
            </button>
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-[#262321] z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#F2F0EA] z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[#262321] text-2xl font-serif font-bold uppercase tracking-widest hover:text-[#B36B4D]"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#waitlist"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/#waitlist");
            }}
          >
            <button className="bg-[#0F2A22] text-white px-12 py-4 rounded-full font-bold uppercase text-xs tracking-[0.3em] shadow-xl">
              Join Waitlist
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}