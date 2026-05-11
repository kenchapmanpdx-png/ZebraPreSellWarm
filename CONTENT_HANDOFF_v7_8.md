# Content Handoff — v7.8 Formula Update

**Supersedes** `CONTENT_HANDOFF.md` (v6.8). The formula changed substantially in v7.8 — do NOT use the older brief.

Hand this to your Claude.ai ZebraWell project chat. Companion file: `FORMULA_v7_8.json` (the canonical RFQ spec for AM Capsules / PM Capsules / Daily Powder, including per-ingredient dose, spec, and sourcing tier).

---

## What changed in v7.8

**REMOVED entirely (10 ingredients no longer in formula):**
EMIQ, L-Carnitine Fumarate, L-Proline, PQQ, Silicon (MMST), L-Lysine, Chondroitin Sulfate, Recombinant Human Lactoferrin, L-Citrulline. (Pycnogenol® replaced with generic Pine Bark Extract — see below.)

**ADDED (3 new ingredients):**
- **Grape Seed Extract** (≥95% OPCs, Vitis vinifera, non-fermented) — 100 mg AM + 70 mg PM
- **Quercetin Phytosome (Quercefit®)** — 300 mg in Daily Powder. **Mandatory branded ingredient** (Indena's Quercefit®). 20× higher bioavailability than standard quercetin.
- **Chromium** (chromium picolinate) — 200 mcg AM

**REFORMULATED (form, dose, or brand spec changed):**
- Pycnogenol® → **Pine Bark Extract (generic, multi-species)**. v7.8 specifies 65–75% OPCs (HPLC) from *Pinus pinaster / massoniana / sylvestris*. The branded Pycnogenol® designation is dropped.
- **Nicotinamide Riboside** — brand spec changed from "Niagen® mandatory" to **"Generic OK"** (still NR Chloride ≥99%)
- **L-Theanine** — brand spec changed from "Suntheanine® preferred" to **"Generic OK"** (≥98% L-isomer)
- **Zinc Carnosine** — brand spec changed from "PepZin GI® mandatory" to **"Generic OK"**. Dose changed: 75 mg → **37.5 mg**, and it now appears in BOTH AM and PM (was PM only).
- **Astaxanthin** — brand spec changed from "AstaReal® mandatory" to **"Generic OK"** (H. pluvialis 4% extract). Dose: 8 mg → **4 mg active**.
- **Magnesium Glycinate** renamed to **Magnesium Bisglycinate** (Albion TRAACS preferred). Dose specified: 2400 mg total delivering 300 mg elemental Mg.
- **Vitamin C** — dose changed from 2000 mg → **1686 mg sodium ascorbate delivering 1500 mg vitamin C**
- **PEA** — spec tightened: **Ultramicronized ≤10µm D90, ≥99% purity, synthetic**. Dose: 1400 mg → **1200 mg**.
- **Luteolin** — spec: **Micronized ≤25µm**. Dose: stays around 140 mg in Daily Powder.
- **Vitamin K2** and **Vitamin D3** moved from PM-only to **AM only** in v7.8.
- **Pantothenic Acid** — now specified as Calcium pantothenate.

**Other notable v7.8 brand commitments worth weaving into copy** (these are real differentiators):
- HPMC capsules (vegan, no gelatin)
- PM capsules: **CaCO₃ opacifier, TiO₂-free confirmed on COA** (titanium dioxide is increasingly flagged for safety concerns in the EU)
- Capsule flow agents: rice hull concentrate + L-leucine (no magnesium stearate)
- Powder flow agent: rice hull concentrate
- **PROHIBITED across all SKUs**: magnesium stearate, titanium dioxide, FD&C dyes, citric acid, carrageenan, gelatin, artificial flavors/sweeteners, corn-derived ingredients, soy-derived ingredients

The "what's NOT in it" list is brand-defining. Worth a callout section somewhere.

## What I'm asking the chat to produce

Same three pieces as the prior brief, but for the new canonical 29 ingredients. **Priority order** for the chat — write these first, the rest can wait:

### Tier 1 (highest priority — currently empty placeholder pages):

1. **Grape Seed Extract** (NEW — no content exists)
2. **Quercetin Phytosome (Quercefit®)** (NEW — no content exists). Emphasize the mandatory branded sourcing.
3. **Chromium** (NEW — no content exists)
4. **Chlorogenic Acid** (existing thin placeholder)
5. **Niacinamide** (existing thin placeholder)
6. **R5P (Riboflavin-5-Phosphate)** (existing thin placeholder)

### Tier 2 (existing rich content needs brand/dose/form updates):

7. **Pine Bark Extract** (formerly Pycnogenol — the existing content references Pycnogenol® brand heavily; needs reframing for generic multi-species pine bark)
8. **Nicotinamide Riboside** (existing content tout's "Niagen® mandatory, 87% counterfeit rate" framing; v7.8 is now "Generic OK" — rewrite `whyThisForm`)
9. **L-Theanine** (drop Suntheanine® emphasis)
10. **Zinc Carnosine** (drop PepZin GI® emphasis; note the dose change to 37.5 mg)
11. **Astaxanthin** (drop AstaReal® emphasis; note dose change to 4 mg active)
12. **Magnesium Bisglycinate** (update dose to 2400 mg total / 300 mg elemental; Albion TRAACS preferred)
13. **Vitamin C** (update to sodium ascorbate, 1686 mg delivering 1500 mg)
14. **PEA / Palmitoylethanolamide** (update spec: ultramicronized ≤10µm, dose 1200 mg)
15. **Luteolin** (update spec: micronized ≤25µm)
16. **Vitamin K2** + **Vitamin D3** (note: AM-only now in v7.8)

### Tier 3 (existing content — only patient summary + FAQ + triad rewrite needed, no spec changes):

All others: Benfotiamine, Vitamin B6 (P5P), Vitamin B12, Copper Bisglycinate, Manganese Bisglycinate, Methylfolate, Pantothenic Acid, Boron Glycinate, Molybdenum Glycinate, Selenium, Taurine, Biotin.

For each, produce:
- **Patient summary** (60–110 words, plain language)
- **4 FAQ items** (Q+A, 40–80 words per A)
- **Plain-language triad rewrite** (mcas / heds / pots paragraphs)

[Same spec details as the prior `CONTENT_HANDOFF.md` — re-read that for tone, compliance, format if needed. Schema unchanged.]

## Output format

Same as before — single JSON file, top-level array, one object per ingredient. Use these slugs (from `CONTENT_HANDOFF_INGREDIENTS_v7_8.json` companion file):

```
palmitoylethanolamide, luteolin, magnesium-bisglycinate, taurine, vitamin-c,
nicotinamide-riboside, pine-bark-extract, grape-seed-extract, quercetin-phytosome,
chlorogenic-acid, l-theanine, zinc-carnosine, astaxanthin, benfotiamine, niacinamide,
p5p, r5p, methylfolate, vitamin-b12, vitamin-d3, vitamin-k2, copper-bisglycinate,
manganese-bisglycinate, chromium, selenium, pantothenic-acid, biotin, boron, molybdenum
```

29 slugs total. Schema per ingredient:

```json
{
  "slug": "grape-seed-extract",
  "patient_summary": "...",
  "faq": [
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." }
  ],
  "triad_plain": {
    "mcas": "...",
    "heds": "...",
    "pots": "..."
  }
}
```

For **Tier 1 and Tier 2 ingredients**, also include a `whyThisForm` patient-language paragraph (60–100 words) since the form/sourcing story changed:

```json
{
  "slug": "nicotinamide-riboside",
  "patient_summary": "...",
  "why_this_form_patient": "...",
  "faq": [...],
  "triad_plain": {...}
}
```

Save as `CONTENT_INGREDIENTS_v7_8_DRAFTED.json` and hand back to Cowork.

## Section pages

`/the-how`, `/our-promise`, `/preorder` — write a short patient-language intro for each. Reference v7.8 brand commitments where relevant (TiO₂-free, no magnesium stearate, no fillers, vegan HPMC, mandatory Quercefit®, etc.). Format:

```json
{
  "the_how_intro": "...",
  "our_promise_intro": "...",
  "preorder_pitch": "..."
}
```

Save as `CONTENT_SECTIONS_v7_8_DRAFTED.json`.

## Compliance reminders (unchanged from v6.8 brief)

- No diagnose/treat/cure/prevent language
- No drug-superiority comparisons
- Be honest about evidence gaps
- Respect the TGF-β paradox where relevant (mast cell stabilizers may suppress collagen synthesis at high doses)
- Collagen framing: hEDS involves excess MMP-driven DEGRADATION, not deficient synthesis — "protect existing collagen" not "boost collagen production"
- Brand mentions should be limited to what's actually mandatory in v7.8 (Quercefit® for quercetin phytosome) and preferred (Albion TRAACS for Mg/Mn/Cu). Everything else is "Generic OK" sourcing.

## Companion files in this folder

- `FORMULA_v7_8.json` — the canonical AM/PM/Powder spec parsed from your RFQ
- `CONTENT_HANDOFF_INGREDIENTS_v7_8.json` — the 29-slug list (regenerated below for you to upload as attachment)
- `CONTENT_HANDOFF.md` — the older v6.8 brief; **do not use**

---

Hand the chat: this file + `FORMULA_v7_8.json` + `CONTENT_HANDOFF_INGREDIENTS_v7_8.json`. It returns JSON; drop in this folder; ping me to implement.
