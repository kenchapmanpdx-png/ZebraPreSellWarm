/* client/src/components/IngredientLinks.tsx
 *
 * Homepage index of every ingredient page. Crawlable <a> links in the
 * prerendered HTML so crawlers reach all ingredient pages one click from
 * the homepage (2026-10-31 indexing audit: homepage linked to none).
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ingredientList } from "@/data/ingredients";

const slugify = (text: string) => {
  const namePart = text.split(" (")[0];
  return namePart.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const items = ingredientList
  .map((name) => ({ name: name.split(" (")[0], slug: slugify(name) }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function IngredientLinks() {
  return (
    <section
      aria-labelledby="ingredient-index-heading"
      className="py-16 md:py-20 px-6 bg-[#EBE8E1]"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#8F5238] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
          Ingredient Pages
        </p>
        <h2
          id="ingredient-index-heading"
          className="text-3xl md:text-4xl font-serif font-bold text-[#3D3733] mb-4"
        >
          Every ingredient, documented
        </h2>
        <p className="text-[#5D5752] text-base max-w-2xl mx-auto leading-relaxed mb-10">
          Dose, form, why we chose it, and the published studies behind each of the {items.length}.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-3 text-left">
          {items.map((it) => (
            <li key={it.slug}>
              <Link
                href={`/ingredients/${it.slug}`}
                className="inline-block px-4 py-2 rounded-full bg-white/70 border border-[#3D3733]/10 text-sm font-medium text-[#3D3733] underline decoration-[#B36B4D]/40 underline-offset-4 hover:bg-white hover:text-[#8F5238] hover:decoration-[#8F5238] transition-colors"
              >
                {it.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/ingredients"
          className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#8F5238] underline underline-offset-4 hover:text-[#3D3733]"
        >
          Browse all ingredients
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
