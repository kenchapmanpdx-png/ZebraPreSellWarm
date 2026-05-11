/* client/src/components/ProductGrid.tsx
 *
 * Three-SKU lineup for v7.8: AM Capsules, PM Capsules, Daily Powder.
 * Replaced the older Autonomic Rise / Histamine Guard / Flare Defense
 * naming (and the bogus "Acute Rescue" 3rd SKU) with the actual formula.
 */
import { motion } from "framer-motion";
import { Star, ArrowRight, FlaskConical, Sun, Moon, Droplets } from "lucide-react";
import { Link } from "wouter";

export default function ProductGrid() {
  const products = [
    {
      id: "am",
      tag: "AM CAPSULES",
      title: "AM Capsules",
      subtitle: "Morning Foundation",
      price: "Waitlist Only",
      description: "The morning foundation. Methylated B-vitamins, vitamin D3 paired with K2 (MK-7), and the trace minerals that drive collagen cross-linking and histamine clearance. Built to support steady energy and autonomic balance through your day.",
      icon: <Sun className="w-6 h-6 text-[#B36B4D]" aria-hidden="true" />,
      ingredients: ["Methyl B12 + Methylfolate", "Vitamin D3 + K2 (MK-7)", "Copper, Manganese, Selenium"],
      gradient: "from-orange-100/50 to-white/50"
    },
    {
      id: "pm",
      tag: "PM CAPSULES",
      title: "PM Capsules",
      subtitle: "Evening Reset",
      price: "Waitlist Only",
      description: "Evening reset. Zinc carnosine to protect your gut lining, the trace minerals (Boron, Molybdenum) and B-vitamin precursors that work overnight, plus the PM split of mast cell stabilizers so the inflammatory load doesn't follow you to sleep.",
      icon: <Moon className="w-6 h-6 text-indigo-600" aria-hidden="true" />,
      ingredients: ["Zinc Carnosine (GI lining)", "Boron + Molybdenum", "Pantothenic Acid + Biotin"],
      gradient: "from-indigo-100/50 to-white/50"
    },
    {
      id: "powder",
      tag: "DAILY POWDER",
      title: "Daily Powder",
      subtitle: "ECM Protection & Mast Cell Calm",
      price: "Waitlist Only",
      description: "The bulk actives in a dissolvable form. Quercefit® quercetin phytosome, ultramicronized PEA, micronized luteolin, magnesium bisglycinate at therapeutic dose, sodium-buffered vitamin C, and taurine. Mixed into water; built to deliver the ingredients that need gram-scale dosing.",
      icon: <Droplets className="w-6 h-6 text-emerald-700" aria-hidden="true" />,
      ingredients: ["Quercetin Phytosome (Quercefit®)", "Magnesium Bisglycinate (2,400 mg)", "Ultramicronized PEA + Luteolin"],
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
          className="text-4xl md:text-6xl font-serif font-bold text-[#3D3733]"
        >
          Targeted Biological <span className="text-[#B36B4D] italic">Intervention.</span>
        </motion.h2>
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
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#3D3733] leading-tight group-hover:text-[#B36B4D] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[10px] font-bold text-[#8A857C] uppercase tracking-widest mt-1">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-[#5D5752] text-sm leading-relaxed mb-8 font-medium">
                  {product.description}
                </p>

                <div className="mt-auto mb-8 space-y-3">
                  <p className="text-[9px] font-black text-[#B36B4D]/60 uppercase tracking-[0.2em]">Key Actives</p>
                  {product.ingredients.map((ing) => (
                    <div key={ing} className="flex items-center gap-3 text-xs text-[#3D3733] font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B36B4D]" />
                      {ing}
                    </div>
                  ))}
                </div>

                <Link
                  href="/#waitlist"
                  className="w-full py-4 rounded-xl bg-[#0F2A22] text-white font-bold uppercase tracking-[0.2em] text-[10px] group-hover:bg-[#B36B4D] transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  Reserve {product.title}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center mt-20">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#B36B4D]/20 shadow-sm">
          <Star className="w-4 h-4 text-[#B36B4D] fill-current" aria-hidden="true" />
          <span className="text-xs font-bold text-[#5D5752]">
            "Finally, a system that respects my sensitivity." - <span className="text-[#3D3733]">Verified Zebra</span>
          </span>
        </div>
      </div>

    </section>
  );
}
