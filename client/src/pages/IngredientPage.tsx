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

                {/* Where this ingredient sits in the product, plus the one
                    conversion path. Links back to the system and the waitlist
                    (2026-11-01 audit G12: ingredient pages had no CTA). */}
                <section
                    aria-labelledby="in-the-system"
                    className="max-w-4xl mx-auto px-4 pb-16"
                >
                    <div className="p-8 md:p-10 bg-[#0F2A22] text-[#EBE8E1] rounded-[2rem] shadow-xl">
                        {/* Same image as og:image and Article.image (prerender.tsx):
                            marked-up images must be visible on the page. */}
                        <figure className="mb-8 overflow-hidden rounded-2xl border border-[#EBE8E1]/15 bg-[#EBE8E1]">
                            <img
                                src={`/images/og/${id}-600.webp`}
                                srcSet={`/images/og/${id}-600.webp 600w, /images/og/${id}.jpg 1200w`}
                                sizes="(max-width: 896px) 92vw, 832px"
                                alt={`${ingredient.name}: ${ingredient.atAGlance.dose}`}
                                width={1200}
                                height={630}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto"
                            />
                        </figure>
                        <h2 id="in-the-system" className="text-2xl md:text-3xl font-serif font-bold !text-[#EBE8E1] mb-3">
                            Where {ingredient.name.split(" (")[0]} fits in ZebraThrive
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-[#EBE8E1]/85 mb-2">
                            {ingredient.atAGlance.dose.replace(/\.$/, "")}.
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-[#EBE8E1]/75 mb-8">
                            One part of a three-part daily system: AM capsules, PM capsules, and Daily Powder.
                            Pre-launch: join the waitlist for first access and founder pricing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="/#waitlist"
                                className="inline-flex justify-center px-6 py-3 bg-[#8F5238] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#EBE8E1] hover:text-[#0F2A22] transition-colors"
                            >
                                Join the waitlist
                            </a>
                            <a
                                href="/#products"
                                className="inline-flex justify-center px-6 py-3 border border-[#EBE8E1]/40 text-[#EBE8E1] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors"
                            >
                                See the three-part system
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Related Ingredients - cross-linking for SEO + UX */}
            <nav aria-labelledby="related-ingredients" className="py-16 px-6 bg-[#F2F0EA] border-t border-[#3D3733]/10">
                <div className="max-w-6xl mx-auto">
                    <h2 id="related-ingredients" className="text-2xl md:text-3xl font-serif font-bold text-[#262321] mb-2">
                        Explore More Ingredients
                    </h2>
                    <p className="text-sm md:text-base text-[#5D5752] mb-8 max-w-2xl">
                        Continue learning about the components of ZebraThrive's AM capsules, PM capsules and Daily Powder.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {related.map((r) => (
                            <Link
                                key={r.slug}
                                href={`/ingredients/${r.slug}`}
                                className="block p-5 bg-white/60 hover:bg-white border border-[#3D3733]/10 hover:border-[#B36B4D]/40 rounded-2xl transition-colors"
                            >
                                <h3 className="font-bold text-[#0F2A22] text-base mb-1">{r.name}</h3>
                                <span className="text-xs text-[#8F5238] font-medium tracking-wide">
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
            </nav>

            <Footer />
        </div>
    );
}
