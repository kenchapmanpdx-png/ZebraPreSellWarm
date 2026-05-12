/* client/src/components/IngredientByCondition.tsx
 *
 * Interactive condition-filter explorer. Lets visitors pick 1, 2, or 3 of
 * { hEDS, POTS, MCAS } and see a grid of every v7.8 ingredient with a
 * patient-friendly blurb for each selected condition. Pulls from the
 * canonical triadPlain field in ingredients.ts.
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Check, ArrowRight, Filter } from "lucide-react";
import { ingredients, ingredientList } from "@/data/ingredients";

type Condition = "heds" | "pots" | "mcas";

const CONDITION_META: Record<Condition, {
  short: string;
  long: string;
  color: string;
  bg: string;
  border: string;
  pill: string;
}> = {
  heds: {
    short: "hEDS",
    long: "Hypermobile EDS",
    color: "text-emerald-800",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    pill: "bg-emerald-100 text-emerald-800",
  },
  pots: {
    short: "POTS",
    long: "POTS",
    color: "text-blue-800",
    bg: "bg-blue-50",
    border: "border-blue-200",
    pill: "bg-blue-100 text-blue-800",
  },
  mcas: {
    short: "MCAS",
    long: "MCAS",
    color: "text-rose-800",
    bg: "bg-rose-50",
    border: "border-rose-200",
    pill: "bg-rose-100 text-rose-800",
  },
};

const slugify = (text: string) => {
  const namePart = text.split(" (")[0];
  return namePart.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

function shortBlurb(text: string | undefined, maxChars = 220): string {
  if (!text) return "";
  const cleaned = text.trim();
  if (cleaned.length <= maxChars) return cleaned;
  const truncated = cleaned.slice(0, maxChars);
  const lastPeriod = truncated.lastIndexOf(". ");
  if (lastPeriod > maxChars * 0.55) return truncated.slice(0, lastPeriod + 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace) + "...";
}

const ALL_CONDITIONS: Condition[] = ["heds", "pots", "mcas"];

export default function IngredientByCondition() {
  const [selected, setSelected] = useState<Set<Condition>>(new Set(ALL_CONDITIONS));

  const toggle = (c: Condition) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const conditionsArr = ALL_CONDITIONS.filter((c) => selected.has(c));

  const items = useMemo(() => {
    return ingredientList
      .map((name) => {
        const id = slugify(name);
        return { name, id, data: ingredients[id] };
      })
      .filter((item) => item.data && (item.data.triadPlain || item.data.triad));
  }, []);

  // Grid column template based on selection count
  const gridColsClass = (() => {
    switch (conditionsArr.length) {
      case 1:
        return "md:grid-cols-[220px_1fr]";
      case 2:
        return "md:grid-cols-[220px_1fr_1fr]";
      case 3:
        return "md:grid-cols-[220px_1fr_1fr_1fr]";
      default:
        return "";
    }
  })();

  return (
    <section id="by-condition" className="py-16 md:py-24 px-6 bg-[#EBE8E1] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Editorial header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.4em] mb-4">
            By Your Conditions
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight mb-4">
            How each ingredient helps <span className="text-[#B36B4D] italic">your</span> triad
          </h2>
          <p className="text-base md:text-lg text-[#5D5752] leading-relaxed">
            Select the conditions you live with. The grid below shows how every ingredient in the formula addresses each one, in plain language.
          </p>
        </div>

        {/* Condition pills */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A857C]">
            <Filter size={11} aria-hidden="true" />
            Filter by condition
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {ALL_CONDITIONS.map((c) => {
              const meta = CONDITION_META[c];
              const active = selected.has(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggle(c)}
                  aria-pressed={active}
                  className={`group inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs md:text-sm transition-all ${
                    active
                      ? `${meta.bg} ${meta.color} border-2 ${meta.border} shadow-md scale-100`
                      : "bg-white/50 text-[#8A857C] border-2 border-transparent hover:bg-white hover:scale-[1.02]"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      active ? "bg-white" : "bg-[#3D3733]/10"
                    }`}
                    aria-hidden="true"
                  >
                    {active && <Check size={12} strokeWidth={3} className={meta.color} />}
                  </span>
                  {meta.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid or empty state */}
        <AnimatePresence mode="wait">
          {conditionsArr.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 max-w-md mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/60 mb-6 shadow-sm">
                <Filter className="text-[#B36B4D]" size={28} aria-hidden="true" />
              </div>
              <p className="text-[#5D5752] text-base font-medium leading-relaxed">
                Select at least one condition above to see how each ingredient supports it.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${conditionsArr.join("-")}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Desktop column header (sticky) */}
              <div
                className={`hidden md:grid sticky top-20 z-20 bg-[#EBE8E1]/95 backdrop-blur-md gap-4 mb-3 pb-3 border-b-2 border-[#3D3733]/10 px-5 ${gridColsClass}`}
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8A857C]">
                  Ingredient
                </div>
                {conditionsArr.map((c) => {
                  const m = CONDITION_META[c];
                  return (
                    <div
                      key={c}
                      className={`text-[10px] font-black uppercase tracking-[0.2em] ${m.color}`}
                    >
                      {m.long}
                    </div>
                  );
                })}
              </div>

              {/* Rows */}
              <div className="space-y-3 md:space-y-2">
                {items.map(({ name, id, data }, idx) => {
                  if (!data) return null;
                  const blurbFor = (c: Condition) => {
                    const plain = data.triadPlain?.[c];
                    const fallback = data.triad?.[c];
                    return shortBlurb(plain || fallback);
                  };

                  return (
                    <motion.article
                      key={id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.015, 0.35), duration: 0.4 }}
                      className={`bg-white rounded-2xl border border-[#3D3733]/5 shadow-sm hover:shadow-md hover:border-[#B36B4D]/20 transition-all overflow-hidden md:grid md:gap-4 md:p-5 md:items-start ${gridColsClass}`}
                    >
                      {/* Ingredient name + link */}
                      <div className="p-5 md:p-0 border-b md:border-b-0 border-[#3D3733]/5">
                        <Link
                          href={`/ingredients/${id}`}
                          className="group inline-flex flex-col items-start gap-1.5"
                        >
                          <span className="font-serif font-bold text-base md:text-[15px] text-[#3D3733] group-hover:text-[#B36B4D] transition-colors leading-tight">
                            {name}
                          </span>
                          <span className="text-[10px] font-bold text-[#B36B4D]/70 uppercase tracking-[0.15em] group-hover:text-[#B36B4D] inline-flex items-center gap-1.5 transition-colors">
                            Full ingredient page
                            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                          </span>
                        </Link>
                      </div>

                      {/* Condition cells */}
                      {conditionsArr.map((c) => {
                        const m = CONDITION_META[c];
                        const blurb = blurbFor(c);
                        return (
                          <div
                            key={c}
                            className="p-5 md:p-0 border-b md:border-b-0 border-[#3D3733]/5 last:border-b-0"
                          >
                            {/* Mobile-only label */}
                            <div className="md:hidden mb-2">
                              <span
                                className={`inline-block text-[9px] font-black uppercase tracking-[0.2em] ${m.pill} px-2 py-0.5 rounded-md`}
                              >
                                {m.long}
                              </span>
                            </div>
                            <p className="text-[13.5px] md:text-sm text-[#5D5752] leading-relaxed">
                              {blurb || (
                                <span className="italic text-[#8A857C]/60">
                                  No direct mechanism for this condition.
                                </span>
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </motion.article>
                  );
                })}
              </div>

              {/* Footer note */}
              <p className="text-center text-xs text-[#8A857C] mt-10 max-w-2xl mx-auto leading-relaxed">
                These are patient-language summaries. Each ingredient page has the full mechanism,
                dose, primary literature with PMIDs, safety, and excipient details.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
