import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Cycling words for the "Wellness for the..." section
  const words = ['Unseen', 'Disbelieved', 'Dismissed', 'Frustrated', 'Fighting Alone', 'Overlooked', 'Rare', 'Resilient'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 1200);
    }, 4500);
    return () => clearInterval(interval);
  }, [words.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulation of API logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({ 
        title: "You're on the waitlist!", 
        description: "We'll notify you as soon as ZebraWell is available." 
      });
      setEmail('');
    } catch {
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'Please try again.' 
      });
    } finally { 
      setIsSubmitting(false); 
    }
  };

  return (
    <section className="relative pt-32 md:pt-48 pb-16 px-4 overflow-hidden min-h-screen flex items-center bg-[#EBE8E1]">
      {/* LUXE MIST ANIMATION: Soft, organic earth-tone drift */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-[-40%] animate-luxe-mist" 
             style={{ background: 'radial-gradient(circle at 30% 30%, #F7F8F7 0%, transparent 60%)', filter: 'blur(100px)' }} />
        <div className="absolute inset-[-40%] animate-luxe-mist-reverse" 
             style={{ background: 'radial-gradient(circle at 70% 70%, #BCC2BB 0%, transparent 60%)', filter: 'blur(120px)' }} />
      </div>

      <style>{`
        @keyframes luxeMist {
          0% { transform: translate(-2%, -2%) scale(1); }
          100% { transform: translate(4%, 4%) scale(1.05); }
        }
        .animate-luxe-mist { animation: luxeMist 20s ease-in-out infinite alternate; }
        .animate-luxe-mist-reverse { animation: luxeMist 25s ease-in-out infinite alternate-reverse; }
      `}</style>

      {/* TEXTURE OVERLAY: Subtle grain for luxury feel */}
      <div className="absolute inset-0 opacity-[0.05] z-[1] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* SECTION HEADER: Precision tracking and branding */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/30 border border-white/40 text-[#262321] text-[10px] font-bold uppercase tracking-[0.4em] backdrop-blur-md shadow-sm">
            <ShieldCheck size={14} /> Physician Formulated
          </div>
          <h1 className="text-4xl md:text-[4.5rem] font-serif font-bold leading-[1.05] text-[#6B4F3A]" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            Advanced Autonomic, Mast Cell <br className="hidden md:block" /> & Connective Tissue Support
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 max-w-6xl mx-auto">
          {/* OPT-IN CARD: Moody Alabaster with Copper Accents */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#F2F0ED]/95 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-14 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)]">
              <p className="text-[10px] font-bold text-[#B36B4D] uppercase tracking-[0.5em] mb-4">We see you.</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#262321] mb-10 leading-tight">
                Wellness for the <br />
                <span className={`bg-gradient-to-r from-[#B36B4D] to-[#8C543A] bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                  className="w-full px-7 py-5 bg-white border border-[#BCC2BB] rounded-2xl text-[#262321] text-lg focus:outline-none focus:ring-1 focus:ring-[#B36B4D] shadow-sm" 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-6 rounded-2xl bg-[#A4613A] text-white font-bold uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-[#8E5433] active:bg-[#744428] transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            </div>
          </div>

          {/* PRODUCT IMAGE: Product depth and high-end drop shadow */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src="/images/zebrawell-bottles-final2.png" 
              alt="ZebraWell Support" 
              className="w-full max-w-lg drop-shadow-[0_40px_60px_rgba(0,0,0,0.1)] transform hover:scale-[1.03] transition-transform duration-1000" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}