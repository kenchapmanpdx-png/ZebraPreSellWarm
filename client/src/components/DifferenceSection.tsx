import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Microscope, 
  ShieldAlert, 
  HeartPulse, 
  Leaf, 
  Search, 
  Sparkles, 
  RefreshCcw 
} from 'lucide-react';

export default function DifferenceSection() {
  const features = [
    {
      icon: <Layers className="w-5 h-5" aria-hidden="true" />,
      title: "2 Bottles Replace 15",
      description: "Our AM & PM system delivers complete, targeted support without the clutter."
    },
    {
      icon: <Microscope className="w-5 h-5" aria-hidden="true" />,
      title: "Smart Science",
      description: "Only therapeutic doses of highly bioavailable, clinically-vetted ingredients."
    },
    {
      icon: <ShieldAlert className="w-5 h-5" aria-hidden="true" />,
      title: "No Junk. Ever.",
      description: "Strictly zero fillers, binders, or 'pixie dusting.' Pure potency only."
    },
    {
      icon: <HeartPulse className="w-5 h-5" aria-hidden="true" />,
      title: "Condition Mindful",
      description: "Engineered for EDS & POTS while remaining strictly mindful of MCAS triggers."
    },
    {
      icon: <Leaf className="w-5 h-5" aria-hidden="true" />,
      title: "Gentle by Design",
      description: "Gut-safe, low-histamine formulas designed for the most sensitive systems."
    },
    {
      icon: <Search className="w-5 h-5" aria-hidden="true" />,
      title: "Total Transparency",
      description: "Rigorous third-party testing with accessible Certificates of Analysis."
    },
    {
      icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
      title: "Minimalist Purity",
      description: "Only what helps. Clean formulations focused on maximum absorption."
    },
    {
      icon: <RefreshCcw className="w-5 h-5" aria-hidden="true" />,
      title: "Circadian Synergy",
      description: "AM and PM formulas work as a synchronized system for 24-hour stability."
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] } 
    }
  };

  return (
    <section 
      id="difference" 
      className="py-24 md:py-32 px-6 bg-[#F2F0EA]" // Using the warm neutral bridge color
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-[#B36B4D] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
            The ZebraThrive Standard
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3D3733] mb-8 tracking-tight">
            What Makes Us Different
          </h2>
          <div className="w-12 h-[1px] bg-[#B36B4D]/30 mx-auto mb-16" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="group bg-white/60 backdrop-blur-sm border border-white rounded-3xl p-8 text-left shadow-[0_10px_30px_-15px_rgba(90,62,43,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(90,62,43,0.1)] transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F2F0EA] flex items-center justify-center text-[#B36B4D] mb-6 group-hover:bg-[#B36B4D] group-hover:text-white transition-colors duration-500 shadow-inner">
                {feature.icon}
              </div>

              <h3 className="text-base font-serif font-bold mb-3 text-[#3D3733] leading-snug">
                {feature.title}
              </h3>

              <p className="text-[#8A857C] text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}