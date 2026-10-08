/* client/src/components/QualityStandards.tsx */
import { motion } from "framer-motion";
import { ShieldCheck, Microscope, Factory } from "lucide-react";

export default function QualityStandards() {
  const standards = [
    {
      title: "cGMP Manufacturing",
      desc: "Made by a contract manufacturer operating under FDA's dietary supplement manufacturing rule (21 CFR Part 111), with incoming quality control on every ingredient lot.",
      icon: <Factory className="w-6 h-6 text-blue-600" aria-hidden="true" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      title: "Lot-Verified Ingredients",
      desc: "Each ingredient lot is checked against its Certificate of Analysis and the specifications written into our purchase order before it goes into production.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-800" aria-hidden="true" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      title: "Finished-Batch Testing",
      desc: "Before release, each finished batch goes through our manufacturer's finished-product testing.",
      icon: <Microscope className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100"
    }
  ];

  return (
    <section id="quality" className="py-16 md:py-20 bg-[#F2F0EA] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[1px] bg-[#B36B4D]" />
              <span className="text-[10px] font-bold text-[#8F5238] uppercase tracking-[0.4em]">Manufacturing Integrity</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight"
            >
              Quality, <br />
              <span className="text-[#B36B4D] italic font-normal">Verified Lot by Lot.</span>
            </motion.h2>
          </div>

          {/* COLORFUL BADGE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-white border border-[#0F2A22]/5 p-6 rounded-[2rem] shadow-xl flex items-center gap-4"
          >
            <div className="flex flex-col items-center">
              <span className="text-[#B36B4D] font-serif font-bold text-4xl italic leading-none">0</span>
              <span className="text-[#0F2A22] font-black uppercase tracking-widest text-[9px] mt-1 text-center">Hidden<br />Excipients</span>
            </div>
            <div className="w-[1px] h-10 bg-[#0F2A22]/10" />
            <p className="text-xs font-medium text-[#5D5752] leading-relaxed max-w-[170px]">
              Designed around the excipients sensitive systems react to.
            </p>
          </motion.div>
        </div>

        {/* Standards Grid - Highly Condensed Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {standards.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-[1.5rem] border border-[#3D3733]/5 shadow-sm hover:shadow-md transition-all duration-500 group flex items-start gap-5"
            >
              <div className={`w-12 h-12 ${item.bgColor} ${item.borderColor} border rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#3D3733] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#5D5752] text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}