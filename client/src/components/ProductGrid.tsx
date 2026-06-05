/* client/src/components/ProductGrid.tsx
 *
 * Three-SKU lineup for v7.8: AM Capsules, PM Capsules, Daily Powder.
 * Cards describe what each part of the system DOES for the patient (not
 * specific ingredients - those live on the deep-dive pages). The full
 * system is one product; CTAs reflect that.
 */
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Sun, Moon, Droplets } from "lucide-react";
import { Link } from "wouter";

export default function ProductGrid() {
  const products = [
    {
      id: "am",
      tag: "AM CAPSULES",
      title: "AM Capsules",
      subtitle: "Morning Foundation",
      description: "Set the day up to be stable. The morning capsules carry the methylation, energy, and cross-linking nutrients your body needs at the front of the day - the work that gets the autonomic system, mitochondria, and connective tissue rebuilding pathways online.",
      icon: <Sun className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />,
      benefits: [
        "Steadier energy, less morning crash",
        "Methylation support for hard-to-clear histamine",
        "Cofactors for collagen cross-linking",
      ],
      gradient: "from-orange-100/50 to-white/50"
    },
    {
      id: "pm",
      tag: "PM CAPSULES",
      title: "PM Capsules",
      subtitle: "Evening Reset",
      description: "Help the body actually recover overnight. The evening capsules protect the gut lining, support tissue repair, and reduce the inflammatory load left over from the day so it doesn't follow you into sleep.",
      icon: <Moon className="w-6 h-6 text-indigo-600" aria-hidden="true" />,
      benefits: [
        "Calmer histamine load before bed",
        "Gut lining protection while you sleep",
        "Overnight connective-tissue recovery",
      ],
      gradient: "from-indigo-100/50 to-white/50"
    },
    {
      id: "powder",
      tag: "DAILY POWDER",
      title: "Daily Powder",
      subtitle: "ECM Protection & Mast Cell Calm",
      description: "Carry the actives that need real dose to work. The powder is where the heavy lifters live - the gram-scale ingredients that protect existing collagen, calm mast cells across multiple pathways, and replenish what gets used up. Mixed into water; titratable from a sprinkle.",
      icon: <Droplets className="w-6 h-6 text-emerald-700" aria-hidden="true" />,
      benefits: [
        "Protects existing collagen from MMP-driven breakdown",
        "Multi-pathway mast cell stabilization",
        "Titratable from a sprinkle for sensitive starts",
      ],
      gradient: "from-emerald-100/50 to-white/50"
    }
  ];

  return (
    <section id="waitlist" className="py-24 px-6 bg-[#F2F0EA] relative overflow-hidden">

      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
        >
          The Clinical Collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-bold text-[#3D3733] mb-4"
        >
          Targeted Biological <span className="text-[#B36B4D] italic">Intervention.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#5D5752] text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Three components, one system. AM capsules, PM capsules, and the Daily Powder all work together - not sold separately.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative flex flex-col h-full"
          >
            <div className={`h-full rounded-[2.5rem] bg-gradient-to-b ${product.gradient} backdrop-blur-xl border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col p-2`}>

              <div className="relative h-64 w-full bg-white/40 rounded-[2rem] flex items-center justify-center overflow-hidden group-hover:scale-[0.98] transition-transform duration-500">
                <div className="absolute inset-0 bg-[#F2F0EA]/30" />
                <FlaskConical size={64} className="text-[#3D3733]/20 relative z-10 group-hover:text-[#B36B4D] transition-colors duration-500" aria-hidden="true" />

                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  {product.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#3D3733]">{product.tag}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#3D3733] leading-tight group-hover:text-[#B36B4D] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[10px] font-bold text-[#8A857C] uppercase tracking-widest mt-1">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-[#5D5752] text-sm leading-relaxed mb-6 font-medium">
                  {product.description}
                </p>

                <div className="mt-auto space-y-3 pt-4 border-t border-[#3D3733]/10">
                  <p className="text-[9px] font-black text-[#B36B4D]/60 uppercase tracking-[0.2em]">What it does</p>
                  {product.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 text-xs text-[#3D3733] font-medium leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B36B4D] flex-shrink-0 mt-1.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Single unified CTA for the full system */}
      <div className="max-w-7xl mx-auto mt-16 text-center relative z-10">
        <Link
          href="/#hero-waitlist-email"
          className="inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#0F2A22] text-white font-bold uppercase tracking-wide sm:tracking-[0.2em] text-xs sm:text-sm hover:bg-[#B36B4D] transition-all shadow-xl hover:scale-[1.02]"
        >
          Reserve the Full System
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <p className="mt-4 text-xs text-[#8A857C] font-medium">
          One waitlist for all three components. No partial reservations.
        </p>
      </div>

    </section>
  );
}
