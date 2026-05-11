/* client/src/components/WhyZebraMascot.tsx */
import { motion } from "framer-motion";

export default function WhyZebraMascot() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-white/60 rounded-[2rem] p-10 md:p-14 shadow-xl text-center overflow-hidden"
        >
            {/* Zebra-stripe motif: top-left decorative SVG */}
            <svg
                aria-hidden="true"
                className="absolute -top-6 -left-6 w-32 h-32 text-[#0F2A22]/10 pointer-events-none"
                viewBox="0 0 120 120"
                fill="none"
            >
                <path d="M0 20 Q 40 5 80 25 T 160 30" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M0 40 Q 40 25 80 45 T 160 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                <path d="M0 60 Q 40 45 80 65 T 160 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Zebra-stripe motif: bottom-right (mirrored) */}
            <svg
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 w-32 h-32 text-[#B36B4D]/10 pointer-events-none rotate-180"
                viewBox="0 0 120 120"
                fill="none"
            >
                <path d="M0 20 Q 40 5 80 25 T 160 30" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M0 40 Q 40 25 80 45 T 160 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                <path d="M0 60 Q 40 45 80 65 T 160 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <div className="relative z-10">
                {/* Eyebrow */}
                <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#B36B4D] mb-4">
                    The Origin of the Name
                </span>

                {/* Why "Zebra"? Heading */}
                <h2 className="font-serif font-bold text-[#3D3733] text-4xl md:text-5xl mb-4 leading-tight">
                    Why <span className="text-[#0F2A22] italic">"Zebra"</span>?
                </h2>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-[#5D5752] mb-6">
                    The Zebra is the mascot for <span className="font-bold text-[#3D3733]">rare conditions</span>.
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 mb-7" aria-hidden="true">
                    <div className="w-12 h-[1px] bg-[#B36B4D]/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B36B4D]/60" />
                    <div className="w-12 h-[1px] bg-[#B36B4D]/40" />
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed text-[#3D3733] max-w-2xl mx-auto">
                    Medical schools teach, <span className="italic">"When you hear hoofbeats, think horses,"</span>{" "}
                    <span className="text-[#B36B4D] italic">but sometimes, it's a Zebra.</span>
                </blockquote>
            </div>
        </motion.div>
    );
}
