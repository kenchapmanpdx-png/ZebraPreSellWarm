import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import heroProductImage from '@assets/image_1768272183723.png';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = ['Unseen', 'Disbelieved', 'Dismissed', 'Frustrated', 'Fighting Alone', 'Overlooked', 'Rare', 'Resilient'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Joined Waitlist", description: "We'll be in touch soon." });
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative pt-32 md:pt-40 lg:pt-48 pb-20 px-4 flex items-center min-h-screen overflow-hidden bg-[#F2F0EA]">

      {/* SUBTLE BACKGROUND ORBS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-[120px] top-[-10%] right-[-5%]" 
          style={{ background: 'radial-gradient(circle, #B36B4D 0%, transparent 70%)' }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] bottom-[-10%] left-[-5%]" 
          style={{ background: 'radial-gradient(circle, #8C4A2E 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* EDITORIAL HEADER */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B36B4D] animate-pulse" />
            <span className="text-[10px] font-bold text-[#5A3E2B] uppercase tracking-[0.3em]">Formulated for Complex Conditions</span>
          </div>

          <h1 className="font-serif font-bold tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            <span className="block mb-1 bg-gradient-to-t from-[#8C4A2E] via-[#A65D41] to-[#B36B4D] bg-clip-text text-transparent">
              Advanced Autonomic, Mast Cell
            </span>
            <span className="block opacity-90 bg-gradient-to-t from-[#8C4A2E] via-[#A65D41] to-[#B36B4D] bg-clip-text text-transparent">
              & Connective Tissue Support
            </span>
          </h1>
        </div>

        {/* Use items-stretch so both columns match height */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* OPT-IN CARD */}
          <div className="w-full lg:w-[40%] flex">
            <div className="relative bg-white border border-[#EBE8E1] rounded-[2.5rem] p-10 lg:p-12 shadow-[0_30px_60px_-15px_rgba(90,62,43,0.08)] flex flex-col justify-center w-full">
              <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.5em] mb-4">We see you.</p>
              <h2 className="font-serif font-bold text-[#3D3733] mb-8 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                Wellness for the <br />
                <span className={`inline-block text-[#B36B4D] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  {words[currentWordIndex]}
                </span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  className="w-full py-3 bg-transparent border-b border-[#D4CFC6] text-[#3D3733] text-lg focus:outline-none focus:border-[#B36B4D] transition-all placeholder:text-[#9A958C]/50" 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-xl bg-gradient-to-r from-[#B36B4D] to-[#A4613A] text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:brightness-105 transition-all"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            </div>
          </div>

          {/* PRODUCT IMAGE - matches card height */}
          <div className="w-full lg:w-[60%] flex">
            <div className="relative z-10 p-[1.5px] bg-white rounded-[2.5rem] border border-[#B36B4D]/25 shadow-2xl overflow-hidden group w-full flex items-center justify-center">
              <img 
                 src={heroProductImage} 
                 alt="ZebraWell Clinical Line" 
                 className="w-full h-full object-cover transform hover:scale-[1.01] transition-transform duration-1000 ease-out rounded-[2.5rem]" 
              />
              <div className="absolute inset-0 bg-[#B36B4D]/5 opacity-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}