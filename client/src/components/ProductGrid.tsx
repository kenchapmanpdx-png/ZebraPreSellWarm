import React from 'react';
import { Sun, Moon, ShieldCheck, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function ProductGrid() {
  const products = [
    {
      id: "am",
      tag: "01 / Morning",
      title: "AM Formula",
      subtitle: "The Rhythm Pathway",
      desc: "Wakes up your nervous system gently. It stabilizes heart rate fluctuations and clears brain fog for a steady, focused day.",
      bgColor: "bg-white",
      textColor: "text-[#262321]",
      accentColor: "text-[#A4613A]",
      icon: <Sun className="w-6 h-6" />,
      benefits: ["Heart Rate Stability", "Mental Clarity", "Daily Endurance"]
    },
    {
      id: "pm",
      tag: "02 / Evening",
      title: "PM Formula",
      subtitle: "The Repair Pathway",
      desc: "Gently lowers histamine levels while you sleep. It supports deep tissue repair so you wake up feeling 'light' and refreshed.",
      bgColor: "bg-white",
      textColor: "text-[#262321]",
      accentColor: "text-[#A4613A]",
      icon: <Moon className="w-6 h-6" />,
      benefits: ["Histamine Clearing", "Overnight Repair", "Restorative Sleep"]
    },
    {
      id: "foundation",
      tag: "The Essential Baseline",
      title: "Daily Foundation",
      subtitle: "The Integrity Pathway",
      desc: "The 'missing link' for stability. It stops the 'shredding' of your collagen and repairs the gut barrier so your system can actually hold together.",
      bgColor: "bg-[#0F2A22]", 
      textColor: "text-[#EBE8E1]", // FIXED: Now High-Contrast Light Greige
      accentColor: "text-[#A4613A]",
      icon: <ShieldCheck className="w-6 h-6" />,
      benefits: ["Mast Cell Stability", "Connective Tissue Armor", "Gut-Barrier Repair"],
      isFeatured: true
    }
  ];

  return (
    <section id="products" className="py-32 px-6 bg-[#F4F2ED]">
      <div className="max-w-7xl mx-auto">

        {/* Editorial Header */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A4613A]/10 rounded-full mb-6">
            <Clock className="w-4 h-4 text-[#A4613A]" />
            <span className="text-[#A4613A] font-bold tracking-[0.3em] text-[10px] uppercase">
              The 24-Hour Stabilization Protocol
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#5A3E2B] mb-8 leading-tight">
            One System. <br />
            <span className="text-[#A4613A] italic font-normal">Every Pathway.</span>
          </h2>
          <p className="text-xl text-[#4A4540] leading-relaxed max-w-2xl mx-auto font-medium">
            Complexity requires a synchronized solution. We engineered these three formulas to work in harmony, protecting your system from sunrise to sunset.
          </p>
        </div>

        {/* The Trinity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {products.map((product) => (
            <div 
              key={product.id}
              className={`relative flex flex-col rounded-[3.5rem] p-10 md:p-12 transition-all duration-700 hover:-translate-y-4 group shadow-2xl
                         ${product.bgColor} ${product.textColor} 
                         ring-4 ring-[#A4613A] ring-offset-8 ring-offset-[#F4F2ED]`}
            >
              <p className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-10 ${product.isFeatured ? 'text-[#A4613A]' : 'opacity-60 text-[#A4613A]'}`}>
                {product.tag}
              </p>

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm 
                                ${product.isFeatured ? 'bg-[#A4613A] text-white' : 'bg-[#F4F2ED] text-[#A4613A]'}`}>
                  {product.icon}
                </div>
                {/* FIXED: Heading color for the Daily Foundation */}
                <h3 className={`text-4xl font-serif font-bold mb-2 ${product.isFeatured ? 'text-[#EBE8E1]' : 'text-[#262321]'}`}>
                  {product.title}
                </h3>
                <p className={`text-lg font-bold ${product.isFeatured ? 'text-[#BCC2BB]' : 'text-[#A4613A]'}`}>
                  {product.subtitle}
                </p>
              </div>

              <p className="text-lg leading-relaxed mb-10 opacity-90 font-medium">
                {product.desc}
              </p>

              <ul className="space-y-4 mb-12 flex-grow">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold tracking-wide">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${product.isFeatured ? 'text-[#A4613A]' : 'text-[#BCC2BB]'}`} />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[11px] transition-all duration-500
                                ${product.isFeatured 
                                  ? 'bg-[#A4613A] text-white hover:bg-[#EBE8E1] hover:text-[#0F2A22]' 
                                  : 'bg-[#0F2A22] text-white hover:bg-[#A4613A]'}`}>
                View Supplement Facts <ArrowRight className="w-4 h-4" />
              </button>

              {product.isFeatured && (
                <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none text-white">
                  <ShieldCheck size={120} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}