/* client/src/pages/Ingredients.tsx */
import { Link } from "wouter";
import { ingredients, ingredientList } from "@/data/ingredients";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Ingredients() {
    const [searchQuery, setSearchQuery] = useState("");

    const slugify = (text: string) => {
        const namePart = text.split(' (')[0];
        return namePart.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const filteredIngredients = ingredientList.filter(name =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
            <Navigation />

            <main id="main-content" className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif font-bold text-5xl md:text-6xl text-[#3D3733] mb-6"
                        >
                            The <span className="text-[#B36B4D]">Ingredients</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[#5D5752] max-w-2xl leading-relaxed mb-10"
                        >
                            Explore the clinical science and specific rationale behind every ingredient in our formulation.
                            Designed for the specific needs of hEDS, POTS, and MCAS.
                        </motion.p>

                        {/* Search Bar */}
                        <div className="relative max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D5752] group-focus-within:text-[#B36B4D] transition-colors" size={20} aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search ingredients..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-white/50 backdrop-blur-md border border-[#3D3733]/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B36B4D]/20 focus:border-[#B36B4D] transition-all text-[#3D3733] font-medium"
                            />
                        </div>
                    </div>

                    {/* Ingredients Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredIngredients.map((name, index) => {
                            const id = slugify(name);
                            const data = ingredients[id];
                            return (
                                <motion.div
                                    key={id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={`/ingredients/${id}`}
                                        className="group h-full p-5 bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl hover:bg-white hover:border-[#B36B4D]/30 transition-all duration-500 cursor-pointer shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col"
                                    >
                                        <div className="contents">
                                            <div className="mb-3">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B36B4D] font-bold">
                                                    Ingredient {index + 1}
                                                </span>
                                                <h3 className="font-serif font-bold text-xl text-[#3D3733] mt-1 group-hover:text-[#B36B4D] transition-colors leading-tight">
                                                    {name}
                                                </h3>
                                            </div>

                                            {data?.atAGlance?.whatItIs && (
                                                <p className="text-sm text-[#5D5752] line-clamp-1 mb-4 flex-grow">
                                                    {data.atAGlance.whatItIs}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B36B4D] group-hover:translate-x-2 transition-transform">
                                                Clinical Science
                                                <span className="text-lg">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {filteredIngredients.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[#5D5752] text-lg font-serif italic">
                                No ingredients found matching "{searchQuery}"
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <FloatingCTA />
        </div>
    );
}
