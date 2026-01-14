/* client/src/components/QualityStandards.tsx */
import { motion } from "framer-motion";
import { ShieldCheck, Microscope, Factory } from "lucide-react";

export default function QualityStandards() {
  const standards = [
    {
      title: "FDA-Registered Facility",
      desc: "ZebraWell is manufactured in a facility fully registered with the FDA, subject to regular, rigorous clinical inspections.",
      icon: <Factory className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      title: "NSF GMP Certified",
      desc: "Our partner maintains NSF GMP certification, ensuring every step follows the highest global standards for purity and safety.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-800" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      title: "Third-Party Lab Tested",
      desc: "Every batch is verified by independent labs to ensure that what’s on the label is exactly what is in the bottle.",
      icon: <Microscope className="w-6 h-6 text-[#B36B4D]" />,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100"
    }
  ];

  return (
    <section id="quality" className="py-20 md:py-28 bg-[#F2F0EA] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-[#B36B4D]" />
              <span className="text-[10px] font-bold text-[#B36B4D] uppercase tracking-[0.4em]">Manufacturing Integrity</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif font-bold text-[#3D3733] leading-tight"
            >
              Clinical Quality, <br />
              <span className="text-[#B36B4D] italic font-normal">Without Compromise.</span>
            </motion.h2>
          </div>

          {/* COLORFUL BADGE: Replaces the wasted space bar */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-[#0F2A22]/10 p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6"
          >
            <div className="flex flex-col items-center">
               <span className="text-[#B36B4D] font-serif font-bold text-5xl italic leading-none">0%</span>
               <span className="text-[#0F2A22] font-black uppercase tracking-widest text-[8px] mt-2 text-center">Trigger<br/>Guarantee</span>
            </div>
            <div className="w-[1px] h-12 bg-[#0F2A22]/10" />
            <p className="text-[11px] font-medium text-[#5D5752] leading-relaxed max-w-[180px]">
              Specifically designed to prevent cross-contamination and flares.
            </p>
          </motion.div>
        </div>

        {/* Standards Grid with Colored Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {standards.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-[#3D3733]/5 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className={`w-14 h-14 ${item.bgColor} ${item.borderColor} border rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3D3733] mb-4">
                {item.title}
              </h3>
              <p className="text-[#8A857C] text-sm md:text-base leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}