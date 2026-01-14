/* client/src/components/ProductGrid.tsx */
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, FlaskConical, Sun, Moon, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

export default function ProductGrid() {
  const products = [
    {
      id: "morning",
      tag: "AM FORMULA",
      title: "Autonomic Rise",
      subtitle: "Hemodynamic Stability & Energy",
      price: "Waitlist Only",
      description: "Stop the morning adrenaline dump. A clinical blend of electrolytes, B-Vitamins, and adaptogens to stabilize heart rate and clear brain fog before your feet hit the floor.",
      icon: <Sun className="w-6 h-6 text-[#B36B4D]" />,
      ingredients: ["1000mg Sodium", "Licorice Root", "Bio-Active B Complex"],
      gradient: "from-orange-100/50 to-white/50"
    },
    {
      id: "evening",
      tag: "PM FORMULA",
      title: "Histamine Guard",
      subtitle: "Mast Cell Calm & Repair",
      price: "Waitlist Only",
      description: "Clear the day's inflammatory load. Designed to stabilize mast cells while you sleep, preventing the '3 AM wake-up' and supporting deep connective tissue repair.",
      icon: <Moon className="w-6 h-6 text-indigo-600" />,
      ingredients: ["Quercetin Phytosome", "Luteolin", "DAO Enzyme"],
      gradient: "from-indigo-100/50 to-white/50"
    },
    {
      id: "rescue",
      tag: "ACUTE RESCUE",
      title: "Flare Defense",
      subtitle: "Rapid Reaction Support",
      price: "Waitlist Only",
      description: "For when the bucket overflows. A rapid-dissolve powder designed to halt a flare-up in its tracks by flooding the system with stabilizers and hydration.",
      icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
      ingredients: ["Pure L-Theanine", "Magnesium Glycinate", "Potassium"],
      gradient: "from-rose-100/50 to-white/50"
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
            {/* The Card Container - Glassmorphism & Depth */}
            <div className={`h-full rounded-[2.5rem] bg-gradient-to-b ${product.gradient} backdrop-blur-xl border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col p-2`}>

              {/* Product Visual Area */}
              <div className="relative h-64 w-full bg-white/40 rounded-[2rem] flex items-center justify-center overflow-hidden group-hover:scale-[0.98] transition-transform duration-500">
                <div className="absolute inset-0 bg-[#F2F0EA]/30" />
                {/* Placeholder for Bottle Image */}
                <FlaskConical size={64} className="text-[#3D3733]/20 relative z-10 group-hover:text-[#B36B4D] transition-colors duration-500" />

                {/* Floating Tag */}
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  {product.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#3D3733]">{product.tag}</span>
                </div>
              </div>

              {/* Product Details */}
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

                {/* Ingredient Highlights */}
                <div className="mt-auto mb-8 space-y-3">
                  <p className="text-[9px] font-black text-[#B36B4D]/60 uppercase tracking-[0.2em]">Key Actives</p>
                  {product.ingredients.map((ing) => (
                    <div key={ing} className="flex items-center gap-3 text-xs text-[#3D3733] font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B36B4D]" />
                      {ing}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/#waitlist">
                  <button className="w-full py-4 rounded-xl bg-[#3D3733] text-white font-bold uppercase tracking-[0.2em] text-[10px] group-hover:bg-[#0F2A22] transition-colors shadow-lg flex items-center justify-center gap-3">
                    Reserve {product.title}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Footer for the Grid */}
      <div className="max-w-2xl mx-auto text-center mt-20">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#B36B4D]/20 shadow-sm">
          <Star className="w-4 h-4 text-[#B36B4D] fill-current" />
          <span className="text-xs font-bold text-[#5D5752]">
            "Finally, a system that respects my sensitivity." — <span className="text-[#3D3733]">Verified Zebra</span>
          </span>
        </div>
      </div>

    </section>
  );
}