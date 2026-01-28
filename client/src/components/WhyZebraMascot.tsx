/* client/src/components/WhyZebraMascot.tsx */
import { motion } from "framer-motion";

export default function WhyZebraMascot() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm border border-white/60 rounded-[2rem] p-8 md:p-10 shadow-xl text-center"
        >
            {/* Why "Zebra"? Heading */}
            <h2 className="font-serif font-bold text-[#3D3733] text-3xl md:text-4xl mb-3">
                Why <span className="text-[#0F2A22]">"Zebra"</span>?
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-[#5D5752] mb-5">
                The Zebra is the mascot for <span className="font-bold text-[#3D3733]">rare conditions</span>.
            </p>

            {/* Divider */}
            <div className="w-16 h-[1px] bg-[#B36B4D]/40 mx-auto mb-5" />

            {/* Quote - flowing sentence */}
            <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-[#3D3733]">
                Medical schools teach, <span className="italic">"When you hear hoofbeats, think horses,"</span>{" "}
                <span className="text-[#B36B4D]">but sometimes, it's a Zebra.</span>
            </blockquote>
        </motion.div>
    );
}
