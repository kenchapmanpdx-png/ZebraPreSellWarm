import React from 'react';

export default function DifferenceSection() {
  const features = [
    {
      icon: "💊",
      title: "2 Bottles Replace 15",
      description: "AM & PM system delivers complete, targeted support."
    },
    {
      icon: "🧠",
      title: "Smart Science",
      description: "Only therapeutic doses of highly bioavailable ingredients."
    },
    {
      icon: "🚫",
      title: "No Junk. Ever.",
      description: "No fillers. No pixie dust. No nonsense."
    },
    {
      icon: "👥",
      title: "Built for EDS & POTS while being mindful of MCAS",
      description: "No more piecing together random supplements."
    },
    {
      icon: "🍃",
      title: "Gentle by Design",
      description: "Gut-safe, low-histamine formulas for sensitive systems."
    },
    {
      icon: "🔍",
      title: "Commitment to Quality",
      description: "Third-party testing and Certificates of Analysis."
    },
    {
      icon: "🌱",
      title: "Only What Helps",
      description: "Clean minimalist formulation with bioavailable ingredients."
    },
    {
      icon: "🧩",
      title: "Works as a System",
      description: "AM and PM formulas work together for 24-hr support."
    },
  ];

  return (
    <section 
      id="difference" 
      className="py-12 md:py-20 px-6 bg-[#EFE6D8]"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* NEW: Deep Umber Text */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#262321] mb-2 md:mb-4" data-aos="fade-up">
          What Makes ZebraWell Different
        </h2>
        <p className="text-xl text-[#5D5752] mb-6 md:mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We've reimagined supplement design for the unique needs of rare condition warriors.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              // NEW: Slate Blue Card Border
              className="bg-white rounded-xl shadow-md border-2 border-[#7A8691] p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              {/* NEW: Muted Copper Title */}
              <h3 className="text-sm font-serif font-bold mb-2 text-[#B36B4D]">{feature.title}</h3>
              <p className="text-[#4A4540] text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}