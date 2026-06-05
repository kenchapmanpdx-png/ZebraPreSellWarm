import { useRoute, Link } from "wouter";
import { ingredients, ingredientList } from "@/data/ingredients";
import IngredientDetail from "@/components/IngredientDetail";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NotFound from "./not-found";

const slugify = (text: string) =>
    text.split(' (')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function IngredientPage() {
    const [, params] = useRoute("/ingredients/:id");
    const id = params?.id;
    const ingredient = id ? ingredients[id] : null;

    if (!ingredient || !id) {
        return <NotFound />;
    }

    // Deterministic "related ingredients" - next 4 in the canonical list
    // (wraps around). Stable across SSR + client hydration.
    const allSlugs = ingredientList.map((n: string) => ({
        slug: slugify(n),
        name: n.split(' (')[0],
    }));
    const currentIdx = allSlugs.findIndex((i: { slug: string }) => i.slug === id);
    const related: { slug: string; name: string }[] = [];
    if (currentIdx >= 0) {
        for (let i = 1; related.length < 6 && i < allSlugs.length; i++) {
            const ix = (currentIdx + i) % allSlugs.length;
            if (allSlugs[ix].slug !== id) related.push(allSlugs[ix]);
        }
    }

    return (
        <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
            <Navigation />
            <main id="main-content" className="pt-24">
                <IngredientDetail data={ingredient} />
            </main>

            {/* Related Ingredients - cross-linking for SEO + UX */}
            <section className="py-16 px-6 bg-[#F2F0EA] border-t border-[#3D3733]/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#262321] mb-2">
                        Explore More Ingredients
                    </h2>
                    <p className="text-sm md:text-base text-[#5D5752] mb-8 max-w-2xl">
                        Continue learning about the components of ZebraThrive's AM and PM formulas.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {related.map((r) => (
                            <Link
                                key={r.slug}
                                href={`/ingredients/${r.slug}`}
                                className="block p-5 bg-white/60 hover:bg-white border border-[#3D3733]/10 hover:border-[#B36B4D]/40 rounded-2xl transition-colors"
                            >
                                <h3 className="font-bold text-[#0F2A22] text-base mb-1">{r.name}</h3>
                                <span className="text-xs text-[#B36B4D] font-medium tracking-wide">
                                    Read details →
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link
                            href="/ingredients"
                            className="inline-block px-6 py-3 bg-[#0F2A22] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#B36B4D] transition-colors"
                        >
                            Browse all {ingredientList.length} ingredients
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
