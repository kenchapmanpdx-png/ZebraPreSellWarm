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
import { Check, ArrowRight, Sun, Moon, Droplets } from "lucide-react";
import { ingredients, ingredientList, type IngredientData } from "@/data/ingredients";

type Condition = "heds" | "pots" | "mcas";
type SKU = "AM" | "PM" | "Powder";

const CONDITION_META: Record<Condition, {
  short: string;
  long: string;
  color: string;
  bg: string;
  bgActive: string;
  border: string;
  borderActive: string;
  pill: string;
}> = {
  heds: {
    short: "hEDS",
    long: "Hypermobile EDS",
    color: "text-emerald-800",
    bg: "bg-emerald-50",
    bgActive: "bg-emerald-100",
    border: "border-emerald-200",
    borderActive: "border-emerald-400",
    pill: "bg-emerald-100 text-emerald-800",
  },
  pots: {
    short: "POTS",
    long: "POTS",
    color: "text-blue-800",
    bg: "bg-blue-50",
    bgActive: "bg-blue-100",
    border: "border-blue-200",
    borderActive: "border-blue-400",
    pill: "bg-blue-100 text-blue-800",
  },
  mcas: {
    short: "MCAS",
    long: "MCAS",
    color: "text-rose-800",
    bg: "bg-rose-50",
    bgActive: "bg-rose-100",
    border: "border-rose-200",
    borderActive: "border-rose-400",
    pill: "bg-rose-100 text-rose-800",
  },
};

const SKU_META: Record<SKU, { color: string; bg: string; icon: typeof Sun }> = {
  AM: { color: "text-[#B36B4D]", bg: "bg-orange-50 border-orange-200", icon: Sun },
  PM: { color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200", icon: Moon },
  Powder: { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: Droplets },
};

// Per-ingredient SKU fallback for cases where the dose string is not explicit
// about AM/PM/Powder placement. Derived from the v7.8 RFQ spec.
const SKU_FALLBACK: Record<string, SKU[]> = {
  "vitamin-d3": ["AM"],
  "vitamin-k2": ["PM"],
  "benfotiamine": ["AM"],
  "l-theanine": ["AM"],
  "niacinamide": ["PM"],
  "zinc-carnosine": ["AM", "PM"],
  "nicotinamide-riboside": ["AM", "PM"],
  "p5p": ["AM"],
  "astaxanthin": ["AM"],
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

function detectSKUs(id: string, data: IngredientData): SKU[] {
  const dose = (data.atAGlance?.dose || "").toString();
  const result: SKU[] = [];
  // Powder claims override AM/PM mentions inside (which describe scoop split)
  if (/Daily Powder|\(Powder\)/i.test(dose)) {
    result.push("Powder");
  } else {
    if (/\bAM\b/.test(dose)) result.push("AM");
    if (/\bPM\b/.test(dose)) result.push("PM");
  }
  if (result.length > 0) return result;
  return SKU_FALLBACK[id] ?? [];
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
        const data = ingredients[id];
        return { name, id, data, skus: data ? detectSKUs(id, data) : [] };
      })
      .filter((item) => item.data && (item.data.triadPlain || item.data.triad));
  }, []);

  // Grid column template based on selection count
  const gridColsClass = (() => {
    switch (conditionsArr.length) {
      case 1:
        return "md:grid-cols-[260px_1fr]";
      case 2:
        return "md:grid-cols-[260px_1fr_1fr]";
      case 3:
        return "md:grid-cols-[260px_1fr_1fr_1fr]";
      default:
        return "";
    }
  })();

  return (
    <section id="by-condition" className="py-16 md:py-24 px-6 bg-[#F4F2ED] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Editorial header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-[10px] font-black text-[#B36B4D] uppercase tracking-[0.4em] mb-4">
            By Your Conditions
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3D3733] leading-tight mb-4">
            How each ingredient helps <span className="text-[#B36B4D] italic">your</span> triad
          </h2>
          <p className="text-base md:text-lg text-[#5D5752] leading-relaxed">
            Tap the conditions you live with. The grid below shows how every ingredient in the formula addresses each one, in plain language.
          </p>
        </div>

        {/* Condition pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12">
          {ALL_CONDITIONS.map((c) => {
            const meta = CONDITION_META[c];
            const active = selected.has(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                aria-pressed={active}
                className={`group inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs md:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B36B4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2ED] ${
                  active
                    ? `${meta.bgActive} ${meta.color} border-2 ${meta.borderActive} shadow-md`
                    : "bg-white/60 text-[#8A857C] border-2 border-transparent hover:bg-white hover:scale-[1.02]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    active ? "bg-white shadow-sm" : "bg-[#3D3733]/10"
                  }`}
                  aria-hidden="true"
                >
                  {active && <Check size={13} strokeWidth={3} className={meta.color} />}
                </span>
                {meta.short}
              </button>
            );
          })}
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
              <p className="text-[#5D5752] text-base font-medium leading-relaxed">
                Tap at least one condition above to see how each ingredient supports it.
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
                className={`hidden md:grid sticky top-20 z-20 bg-[#F4F2ED]/95 backdrop-blur-md gap-6 mb-3 py-4 px-5 border-b-2 border-[#3D3733]/15 shadow-[0_4px_12px_-8px_rgba(15,42,34,0.15)] rounded-t-lg ${gridColsClass}`}
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
              <div className="space-y-0 md:space-y-0">
                {items.map(({ name, id, data, skus }, idx) => {
                  if (!data) return null;
                  const blurbFor = (c: Condition) => {
                    const plain = data.triadPlain?.[c];
                    const fallback = data.triad?.[c];
                    return shortBlurb(plain || fallback);
                  };
                  const altRow = idx % 2 === 1;

                  return (
                    <motion.article
                      key={id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.012, 0.3), duration: 0.4 }}
                      className={`group border-b md:border-b-0 border-[#3D3733]/5 md:rounded-2xl md:hover:bg-white md:hover:shadow-md md:hover:border-[#B36B4D]/20 transition-all overflow-hidden md:grid md:gap-6 md:p-6 md:items-start md:my-1 md:border md:border-[#3D3733]/5 ${gridColsClass} ${
                        altRow ? "bg-white/40 md:bg-[#FAF8F3]" : "bg-white/0 md:bg-white"
                      }`}
                    >
                      {/* Ingredient name + SKU badges */}
                      <div className="p-5 md:p-0 bg-white md:bg-transparent">
                        <Link
                          href={`/ingredients/${id}`}
                          className="block"
                        >
                          <span className="font-serif font-bold text-base md:text-[15px] text-[#3D3733] group-hover:text-[#B36B4D] transition-colors leading-tight">
                            {name}
                          </span>
                        </Link>
                        {/* SKU badges */}
                        {skus.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {skus.map((sku) => {
                              const m = SKU_META[sku];
                              const Icon = m.icon;
                              return (
                                <span
                                  key={sku}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${m.color} ${m.bg}`}
                                >
                                  <Icon size={10} aria-hidden="true" strokeWidth={2.5} />
                                  {sku}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        {/* "Full ingredient page" - hover-only on desktop, persistent on mobile */}
                        <Link
                          href={`/ingredients/${id}`}
                          className="mt-3 md:mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#B36B4D]/60 uppercase tracking-[0.15em] hover:text-[#B36B4D] md:opacity-0 md:group-hover:opacity-100 transition-all"
                        >
                          Full page
                          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
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
                Patient-language summaries. Each ingredient page has the full mechanism, dose, primary literature with PMIDs, safety, and excipient details.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
