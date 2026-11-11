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
      title: "One Daily Routine",
      description: "Our AM capsules, PM capsules and Daily Powder work together as one routine."
    },
    {
      icon: <Microscope className="w-5 h-5" aria-hidden="true" />,
      title: "Smart Science",
      description: "Each ingredient is chosen with its form and dose explained on its own page, including where human evidence is limited."
    },
    {
      icon: <ShieldAlert className="w-5 h-5" aria-hidden="true" />,
      title: "No Junk. Ever.",
      description: "No magnesium stearate and no unnecessary additives. Every filler, carrier and flow agent we use is listed, with its purpose."
    },
    {
      icon: <HeartPulse className="w-5 h-5" aria-hidden="true" />,
      title: "Condition Mindful",
      description: "Designed with the hEDS, POTS and MCAS community in mind, with every ingredient reviewed against known mast cell triggers."
    },
    {
      icon: <Leaf className="w-5 h-5" aria-hidden="true" />,
      title: "Made With Sensitive Systems in Mind",
      description: "Formulated with buffered vitamin C, plant capsules and a powder you can start in small amounts, for people with sensitive systems."
    },
    {
      icon: <Search className="w-5 h-5" aria-hidden="true" />,
      title: "Total Transparency",
      description: "Every production lot is tested by our cGMP manufacturer, and Certificates of Analysis are available on request."
    },
    {
      icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
      title: "Minimalist Purity",
      description: "Only ingredients chosen for a stated reason. Clean formulations, with absorption considered for each ingredient."
    },
    {
      icon: <RefreshCcw className="w-5 h-5" aria-hidden="true" />,
      title: "Circadian Synergy",
      description: "Our AM capsules, PM capsules and Daily Powder split the formula across the day."
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
          <p className="text-[#8F5238] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
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

              <p className="text-[#6B655F] text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}