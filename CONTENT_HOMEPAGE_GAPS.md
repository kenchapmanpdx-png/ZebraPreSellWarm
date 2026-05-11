# Homepage Gap-Fill Brief

Hand this to your Claude.ai ZebraWell project chat. References the brand's `Zebrawell_Master_Marketing_POD_Guide_v2_0_1.md` (which the chat already has). I just shipped the crawler-visibility fix (un-lazied four sections); these five content pieces will surface the marketing pillars the homepage is currently missing.

---

## Context

I just audited the homepage against the Master Marketing & POD Guide v2.0. Story foundation is strong. Five specific gaps need patient-language copy:

1. **The Triad Dilemma** isn't articulated on the homepage (Doc §1.2). New visitors don't see why ZebraWell exists structurally.
2. **BID dosing** (Pillar #1 per Doc §3.8 — the #1 lead pillar for landing pages) is absent.
3. **ECM protection vs collagen-building** (Pillar #3) lives in deep-dive science only. Needs a one-line pull-quote on home.
4. **"Start low, go slow" + Size 0 capsules + titratable** (Doc §2.5 explicit asks from the audience) are nowhere on the homepage. Dysphagia affects 79% of EDS/HSD patients — Size 0 is high-leverage.
5. **No fermentation-derived ingredients** (Pillar #5) — missing from the ExclusionsBlock.

## What to write

For each gap, write copy following the same compliance rules as the prior briefs (no diagnose/treat/cure/prevent, no banned vocabulary from Doc §7.2, MMP-degradation framing for hEDS not collagen-building, etc.).

### Piece 1 — Triad Dilemma callout (60–110 words)

A short section that names the core conflict patients live with and positions ZebraWell as the answer. Use specific examples from Doc §1.2's conflict table — pick the two or three most visceral (citric acid in POTS electrolytes triggering MCAS; bone broth for EDS carrying histamine load; probiotics for gut health producing histamine).

Tone: doesn't lecture. Reads as if a friend who's been there is explaining why the supplement aisle has been failing. Land it on the brand thesis: ZebraWell is the first formula designed with all three conditions as simultaneous constraints, not sequential ones.

Headline (4–7 words, audience-fluent — e.g., "Choosing Between Two Evils", "The Trifecta Problem", "Built for the Crossfire", or something better).

### Piece 2 — BID dosing pull-quote / stat (1 line + 2-3 sentence rationale)

The most counterintuitive, curiosity-clicking stat the brand has — per Doc §3.1, BID (twice-daily) dosing delivers ~58% more vitamin C to tissue than once-daily.

Output:
- A short headline that lands the stat (e.g., "~58% more vitamin C delivered to tissue")
- A 2–3 sentence explanation in patient language
- A "Why it matters" link/CTA pointing to /the-how

Avoid jargon like "tissue saturation" without immediate translation. The audience knows pharmacokinetics; the broader patient does not.

### Piece 3 — "We protect collagen, we don't try to build it" pull-quote (1 sentence + 2 sentence support)

The core scientific differentiation in plain language. From Doc §3.3 and the Briefing Doc Ch. 4.1.

Frame:
- One-sentence punchline (e.g., "We don't try to build more collagen. We protect what you already have.")
- 2 sentences explaining why (MMP-driven matrix degradation, not synthesis deficiency)

### Piece 4 — Practical Signals strip (3 icon-cards)

Three side-by-side trust signals that speak to lived experience. Each card: 4–6 word headline + 1 line tag.

Suggested topics (you can refine):
1. **Size 0 capsules** — "easier to swallow when nothing else stays down" or similar. 79% of EDS/HSD have dysphagia. No competitor calls this out.
2. **Start low, go slow** — "titrate from a single capsule" — community-validated language ("start low, go slow" is on the doc's "words to use" list)
3. **Powder doses are partial-friendly** — "start with a sprinkle if you need to" — speaks to the reactivity-aware audience

Output format:
```json
{
  "signals": [
    { "headline": "...", "tag": "..." },
    { "headline": "...", "tag": "..." },
    { "headline": "...", "tag": "..." }
  ]
}
```

### Piece 5 — Fermentation-derived ingredients addition to ExclusionsBlock

The current ExclusionsBlock has 9 items. Doc §3.5 (Pillar #5) emphasizes that fermentation-derived ingredients are a MCAS trigger and most supplement brands don't filter for this. Two options:
- (A) Add a 10th pill: "Fermentation-derived ingredients" — with a why-line like "Citric acid, many B-vitamins, and probiotic-derived ingredients carry histamine load."
- (B) Add a line below the closing sentence emphasizing the same point.

Tell me which version reads better and write both, so I can pick at build time.

## Compliance reminders (unchanged)

- No diagnose / treat / cure / prevent
- No "miracle / mega-dose / supercharged / detox / immune boost"
- MMP-degradation framing for hEDS (NOT "boost collagen")
- Acknowledge evidence quality (in vitro vs animal vs human)
- "Mast cell stabilization" is fine; "anxiety relief" is not (Doc §7.2 — dismissive of physiological tachycardia)
- Use the doc's USE list: trigger, react to, flare, can't tolerate, sensitive, filler-free, methylated, titratable, buffered, source-verified, start low, go slow

## Output format

Single JSON file `CONTENT_HOMEPAGE_GAPS_DRAFTED.json` with this shape:

```json
{
  "triad_dilemma": {
    "headline": "...",
    "body": "..."
  },
  "bid_dosing": {
    "headline": "...",
    "body": "...",
    "cta_text": "Why we dose twice a day"
  },
  "collagen_framing": {
    "punchline": "...",
    "support": "..."
  },
  "practical_signals": [
    { "headline": "...", "tag": "..." },
    { "headline": "...", "tag": "..." },
    { "headline": "...", "tag": "..." }
  ],
  "fermentation_option_a": {
    "pill_label": "Fermentation-derived ingredients",
    "why": "..."
  },
  "fermentation_option_b": {
    "additional_closing_line": "..."
  }
}
```

Save to this folder and ping Cowork. I'll build the components and wire them in one push.

## Reading order for the chat

Doc sections to re-read while writing:
- §1.2 — Triad Dilemma table (for Piece 1)
- §1.3 — Excipients as primary barrier (for Piece 5)
- §2.5 — What patients want from a brand (for Piece 4)
- §3.1 — BID dosing pillar (for Piece 2)
- §3.3 — ECM protection pillar (for Piece 3)
- §3.5 — No fermentation pillar (for Piece 5)
- §5 — Voice & Identity (tone calibration throughout)
- §7.1/§7.2 — Language bank (every piece)
