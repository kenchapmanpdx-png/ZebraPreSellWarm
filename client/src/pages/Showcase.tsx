/* client/src/pages/Showcase.tsx
 *
 * Internal preview page. Renders the six "dead" components — files that exist
 * in client/src/components/ but aren't imported by any production page — so
 * we can see what they actually look like and do before deciding to wire them
 * back in or delete them.
 *
 * Not linked from navigation. noindex via robots meta below.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Eye, EyeOff, ExternalLink } from "lucide-react";

import ClinicalRationale from "@/components/ClinicalRationale";
import DifferenceSection from "@/components/DifferenceSection";
import WhyZebra from "@/components/WhyZebra";
import InteractiveIngredientMap from "@/components/InteractiveIngredientMap";
import PreorderReservation from "@/components/PreorderReservation";
import WhatYouGet from "@/components/WhatYouGet";

type ShowcaseEntry = {
  id: string;
  title: string;
  file: string;
  lines: number;
  blurb: string;
  context: string;
  Component: React.ComponentType;
};

const ENTRIES: ShowcaseEntry[] = [
  {
    id: "clinical-rationale",
    title: "ClinicalRationale",
    file: "client/src/components/ClinicalRationale.tsx",
    lines: 181,
    blurb:
      "Three-pillar science narrative — 'Halt the Collagen Shredder' / 'Cellular Backdoor Hydration' / 'Restore Stability.' Aligns with the MMP-degradation framing in your research protocol.",
    context:
      "Per the June 23 changelog, this lived between OurStory and ProductGrid on the homepage. It also lazy-loads InteractiveIngredientMap below it.",
    Component: ClinicalRationale,
  },
  {
    id: "interactive-ingredient-map",
    title: "InteractiveIngredientMap",
    file: "client/src/components/InteractiveIngredientMap.tsx",
    lines: 381,
    blurb:
      "Visual ingredient-to-benefit map: 36 ingredients connecting to 14 health goals with hover/tap highlighting.",
    context:
      "Lazy-loaded by ClinicalRationale. Rendered standalone here so you can see it in isolation. Your June 23 changelog: 'Added interactive ingredient-to-benefit map after Ava story section.'",
    Component: InteractiveIngredientMap,
  },
  {
    id: "preorder-reservation",
    title: "PreorderReservation",
    file: "client/src/components/PreorderReservation.tsx",
    lines: 109,
    blurb:
      "Full reservation form — captures email + firstName + lastName + conditions + currentSupplements + hearAboutUs. Matches the preorderReservations schema in shared/schema.ts exactly.",
    context:
      "The current /preorder page only collects an email. This component is the high-fidelity form your DB schema was designed around. POSTs to /api/preorder (now wired).",
    Component: PreorderReservation,
  },
  {
    id: "what-you-get",
    title: "WhatYouGet",
    file: "client/src/components/WhatYouGet.tsx",
    lines: 5,
    blurb:
      "Five-line wrapper that renders <PreorderReservation/>. Likely a section-name placeholder used during a homepage layout experiment.",
    context:
      "Probably safe to delete — it adds no value over importing PreorderReservation directly.",
    Component: WhatYouGet,
  },
  {
    id: "difference-section",
    title: "DifferenceSection",
    file: "client/src/components/DifferenceSection.tsx",
    lines: 131,
    blurb:
      "Eight-tile feature grid: '2 Bottles Replace 15', 'Smart Science', 'No Junk. Ever.', 'Condition Mindful', 'Gentle by Design', 'Total Transparency', 'Minimalist Purity', 'Circadian Synergy'. Marketing differentiation block.",
    context:
      "Per the June 15 changelog, the 'Why Choose ZebraWell' section was removed and its benefits moved into 'What Makes ZebraWell Different.' This component may be the orphaned predecessor — verify against the live homepage before reintroducing.",
    Component: DifferenceSection,
  },
  {
    id: "why-zebra",
    title: "WhyZebra",
    file: "client/src/components/WhyZebra.tsx",
    lines: 51,
    blurb:
      "Compact 'Why ZebraWell?' callout block. Single paragraph framing the autonomic / mast cell / connective tissue trinity.",
    context:
      "Distinct from WhyZebraMascot (which IS used on the homepage). This one looks like a textual companion that may have been replaced by the mascot block.",
    Component: WhyZebra,
  },
];

export default function Showcase() {
  // Default: show all six. Persists per-component toggles in localStorage so
  // Ken can hide ones he's already decided on while reviewing.
  const [visible, setVisible] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem("showcase:visible");
      if (raw) return JSON.parse(raw);
    } catch {}
    return Object.fromEntries(ENTRIES.map((e) => [e.id, true]));
  });

  useEffect(() => {
    // noindex this preview page
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "ZebraWell — Component Showcase (internal)";
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("showcase:visible", JSON.stringify(visible));
    } catch {}
  }, [visible]);

  const toggle = (id: string) =>
    setVisible((v) => ({ ...v, [id]: !v[id] }));

  const showAll = () =>
    setVisible(Object.fromEntries(ENTRIES.map((e) => [e.id, true])));
  const hideAll = () =>
    setVisible(Object.fromEntries(ENTRIES.map((e) => [e.id, false])));

  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#3D3733]/10 bg-[#EBE8E1]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#5D5752] hover:text-[#B36B4D]">
                <ArrowLeft className="w-4 h-4" />
                Back to site
              </a>
            </Link>
            <span className="text-[#3D3733]/30">·</span>
            <h1 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0F2A22]">
              Component Showcase
            </h1>
            <span className="text-xs text-[#5D5752]">
              ({ENTRIES.length} orphan components)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={showAll}
              className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full bg-[#0F2A22] text-white hover:bg-[#B36B4D] transition-colors"
            >
              Show all
            </button>
            <button
              onClick={hideAll}
              className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-[#0F2A22] text-[#0F2A22] hover:bg-[#0F2A22] hover:text-white transition-colors"
            >
              Hide all
            </button>
          </div>
        </div>

        {/* Quick TOC */}
        <nav className="border-t border-[#3D3733]/10 bg-[#F2F0EA]/60">
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2">
            {ENTRIES.map((e) => (
              <a
                key={e.id}
                href={`#${e.id}`}
                className={`group inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  visible[e.id]
                    ? "border-[#0F2A22]/30 bg-white text-[#0F2A22] hover:border-[#B36B4D] hover:text-[#B36B4D]"
                    : "border-[#3D3733]/20 bg-transparent text-[#5D5752]/70 line-through"
                }`}
              >
                <span className="font-mono">{e.title}</span>
                <span className="text-[#5D5752]/60">{e.lines}L</span>
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 pt-10 pb-6">
        <p className="text-sm text-[#5D5752] leading-relaxed">
          These components exist in the codebase but no page imports them. They
          appear to be the residue of homepage refactors over the past year.
          Each section below shows the component rendering live in isolation,
          plus a short note on what it does and where it likely belonged.
          Toggle visibility per component to compare or focus. Decisions you
          might make: <em>wire it back in</em>, <em>delete the file</em>, or{" "}
          <em>keep but defer</em>.
        </p>
      </section>

      {/* Components */}
      <main className="space-y-12 pb-24">
        {ENTRIES.map((e, idx) => (
          <section
            key={e.id}
            id={e.id}
            className="border-t border-[#3D3733]/10 scroll-mt-32"
          >
            {/* Per-component header */}
            <div className="bg-[#0F2A22] text-white">
              <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[#B36B4D]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {e.title}
                    </h2>
                    <code className="text-xs text-[#B36B4D] bg-white/5 px-2 py-1 rounded">
                      {e.lines} lines
                    </code>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-2">
                    {e.blurb}
                  </p>
                  <p className="text-xs text-white/60 italic leading-relaxed">
                    {e.context}
                  </p>
                  <code className="block mt-2 text-[10px] text-white/40 font-mono">
                    {e.file}
                  </code>
                </div>
                <button
                  onClick={() => toggle(e.id)}
                  className="self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full bg-white/10 hover:bg-[#B36B4D] transition-colors"
                  aria-label={visible[e.id] ? "Hide component" : "Show component"}
                >
                  {visible[e.id] ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live render */}
            {visible[e.id] && (
              <div className="bg-[#EBE8E1]">
                <div className="max-w-6xl mx-auto">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#5D5752]/60 px-6 pt-4 pb-2">
                    Live render below ↓
                  </div>
                </div>
                <div className="component-preview">
                  <e.Component />
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Footer guidance */}
        <section className="border-t border-[#3D3733]/10 max-w-3xl mx-auto px-6 py-12">
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0F2A22] mb-4">
            What to do with each
          </h3>
          <ul className="text-sm text-[#5D5752] space-y-3">
            <li>
              <strong>Wire back in:</strong> import into the relevant page
              (typically Home.tsx between OurStory and ProductGrid for the
              science blocks; replace the inline form on PreorderPage with
              PreorderReservation).
            </li>
            <li>
              <strong>Delete:</strong>{" "}
              <code className="text-xs bg-white/60 px-1 rounded">
                rm client/src/components/&lt;name&gt;.tsx
              </code>
              . Recoverable from git history.
            </li>
            <li>
              <strong>Defer:</strong> leave the file. Costs nothing at runtime
              (Vite tree-shakes unimported modules) but adds maintenance
              friction.
            </li>
          </ul>
          <p className="text-xs text-[#5D5752]/70 italic mt-6">
            This page is noindex/nofollow. Not linked from main navigation.
            Visit at <code>/showcase</code> when you want to review.
          </p>
          <a
            href="https://github.com/kenchapmanpdx-png/ZebraPreSellWarm"
            className="inline-flex items-center gap-1.5 mt-4 text-xs text-[#B36B4D] hover:underline"
          >
            View repo <ExternalLink className="w-3 h-3" />
          </a>
        </section>
      </main>
    </div>
  );
}
