---
date: 2026-05-10
scope: Homepage narrative + structural analysis
inputs: Marketing POD Guide v2.0, Briefing Doc v3.1, live homepage HTML
verdict: Story foundation is strong; three structural fixes needed + four pillars to surface
---

# 1. Critical Finding — Half the Homepage Is Invisible to Crawlers

This is the highest-priority finding, separate from story analysis.

The homepage lazy-loads four major content sections via `React.lazy()` wrapped in `<Suspense>`:

| Component | Lazy-loaded? | In prerendered HTML? | Crawler-visible? |
|---|---|---|---|
| Hero | No | Yes | Yes |
| WhyZebraMascot | No | Yes | Yes |
| OurStory | No | Yes | Yes |
| ExclusionsBlock | No | Yes | Yes |
| **QualityStandards** | **Yes** | **No** | **No** |
| **CollagenScienceSection** | **Yes** | **No** | **No** |
| ProductGrid | No | Yes | Yes |
| **Testimonials** | **Yes** | **No** | **No** |
| **FAQ** | **Yes** | **No** | **No** |
| Footer | No | Yes | Yes |

Evidence (from grep on built `dist/public/index.html`):
- "Collagen" appears 0 times
- "MMP" appears 0 times
- "Frequently / FAQ" appears 0 times

This means **8 high-quality FAQ answers, the entire Collagen Shredder science framing, and the Quality Standards content are invisible to Google, Ahrefs, AudioEye, social previews, and any non-JS crawler.**

The lazy components render only after client-side hydration. The prerender engine sees the `<Suspense>` fallback (empty div) and ships that. Fixable in one of two ways:
- (A) Stop lazy-loading these four components — turn them into normal imports. Cost: maybe +30 KB to the main bundle (one-time, then cached).
- (B) Keep lazy boundaries, but provide pre-resolved content to the prerender script.

Recommendation: **(A) — un-lazy them.** They're above-the-fold-ish anyway, and the SEO value is enormous (8 FAQ entries alone are gold for long-tail search). Cost is negligible.

# 2. Current Homepage Sequence As It Actually Renders to Crawlers

1. **Navigation** — Our Purpose · The How · Our Promise + Join Waitlist
2. **Hero** — "Formulated for Complex Conditions" / "Advanced Autonomic, Mast Cell & Connective Tissue Support" + waitlist form + 3 manufacturing trust badges (FDA Registered / NSF GMP / Third-Party Lab Tested)
3. **WhyZebraMascot** — "When you hear hoofbeats, think horses, but sometimes it's a Zebra"
4. **OurStory** — Ava story; "Wellness for the Unseen" / "We see you" framing; "Welcome to the herd"
5. **ExclusionsBlock** — "Excipients we refuse to use" + 9 pills + educational paragraph
6. *[INVISIBLE TO CRAWLERS: QualityStandards, CollagenScienceSection, Bridge button to /the-how]*
7. **ProductGrid** — AM "Autonomic Rise" / PM "Histamine Guard" / Powder "Flare Defense" with key actives
8. *[INVISIBLE TO CRAWLERS: Testimonials, FAQ]*
9. **Footer**

# 3. Story-Arc Analysis (Strong vs. Missing)

## What's working

| Move | Where | Why it works |
|---|---|---|
| Trifecta promise upfront | Hero subhead | Hits all three conditions in one phrase — passes the "is this for me" test in 2 seconds |
| Audience claim before product | WhyZebraMascot | Validates "rare patient" identity before asking for anything |
| Origin story with specificity | OurStory (Ava) | Doc §5.3: "Founder-as-trifecta-patient narrative is the highest-credibility origin story available." Caregiver-of-patient is the next-best version. ✓ |
| Subtraction-led differentiation | ExclusionsBlock | Doc §8 ("Subtraction Principle") explicitly requires "What We Left Out and Why" as a required artifact. ✓ |
| Audience-fluent vocabulary | ExclusionsBlock | "Excipient" + "react to" + "trigger" — all on doc's USE list (§7.1) |
| Three-product anchor | ProductGrid | AM/PM/Powder maps cleanly to triad framing |
| No banned vocabulary detected | Sitewide | No "miracle / cure / mega-dose / detox / immune boost" — clean per §7.2 |

## What's missing (per the docs)

### The Triad Dilemma is not articulated

The Marketing Doc §1.2 frames "The Triad Dilemma" — six specific conflicts where treating one condition triggers another. The audience describes feeling like *"hostages of their own bodies"* and *"choosing between two evils."*

**Currently, the homepage assumes the visitor already knows what the triad is.** A new visitor from paid traffic or search may not. The brand's reason to exist — that ZebraWell is the first formula designed with all three conditions as simultaneous constraints — is implicit, not stated.

**Suggested placement**: a short callout section between WhyZebraMascot and OurStory. Brief (3-4 sentences), names 2-3 of the specific conflicts (e.g., "Most POTS electrolytes use citric acid, which is a top MCAS trigger. Most EDS supplements use bone broth or hydrolyzed collagen, which carry histamine load. Patients call it choosing between two evils."), and lands the brand thesis.

### BID dosing (Pillar #1) is absent

Per Doc §3.8, **BID dosing is the #1 lead pillar for landing page hero** — "BID dosing delivers ~58% more vitamin C to tissue." It's mentioned in /the-how but not on home. The most counterintuitive, curiosity-clicking stat the brand has is buried.

**Suggested placement**: as a single stat-card pull-quote near the science section. Format: "**~58% more vitamin C delivered to tissue** — because we dose AM and PM, not once a day."

### ECM protection vs collagen-building (Pillar #3) is in lazy content only

The core scientific differentiation — "we PROTECT collagen, we don't try to build more" — lives in `CollagenScienceSection`, which is currently invisible to crawlers. Even after fixing the lazy issue (§1), this framing should appear in plain language above the science deep-dive too, not only inside it.

**Suggested placement**: as a sub-bullet under or near the BID dosing stat, OR as a short hero-adjacent statement: "We don't try to build more collagen. We protect what you have."

### "Built with the trifecta in the family" not explicit enough

The current OurStory copy uses "ZebraWell wasn't born in a boardroom. It was born from my relentless pursuit to help her feel better." This is good but doesn't quite land the doc §3.7 framing: **the founder shares the patient experience (via caregiver-of-trifecta-patient).** The current text emphasizes the caregiver's motivation. Could also explicitly anchor: "Our daughter has all three. So do many of you. This formula was built to be the thing we couldn't find."

### No "Triad sensitivity" practical signals

Doc §2.5 lists what patients want from a brand:
- "Acknowledgment that 'natural' doesn't mean 'safe for MCAS'" — partially covered by ExclusionsBlock
- **"Titratable formats that allow 'start low, go slow'"** — NOT mentioned on homepage
- **"Small capsules (79% of EDS/HSD have dysphagia) — Zebrawell uses Size 0"** — NOT mentioned on homepage. This is high-leverage. Dysphagia (swallowing difficulty) is a near-universal pain point that no other brand calls out.
- "Explicit 'what we left out and why'" — ✓ covered

**Suggested placement**: a short signal-strip block somewhere mid-page. Three icons + one line each:
- "Size 0 capsules — easier swallowing"
- "Start low, go slow — titrate from one capsule"
- "Powder with optional scoop — partial doses welcome"

### No mention of "no fermentation-derived ingredients" (Pillar #5)

Per Doc §3.5, this is a major MCAS-trust signal. Fermentation-derived ingredients (including the citric acid you already exclude, but also many natural-flavoring agents and probiotic-derived B-vitamins) are common MCAS triggers. Currently not mentioned on homepage. Could be added to the closing line of the ExclusionsBlock or as an extra item.

## What might be slightly redundant

- **Manufacturing standards in hero AND QualityStandards section.** Same three badges (FDA Registered / NSF GMP / Third-Party Lab Tested) shown both in the hero subhead row and again in the QualityStandards section. If you keep both, vary the depth — hero is the badge row, the dedicated section should add the *why* (e.g., what each certification means and why it matters for an MCAS-sensitive audience).
- **Empathy/welcome language.** "Wellness for the Unseen" + "We see you" + "Welcome to the herd" + Ava narrative — four empathy beats in fast succession. Each frames it slightly differently (visibility / acknowledgment / inclusion / origin) so it's defensible, but if you want to tighten, you could merge "We see you" into the hero subhead pull quote and drop the "Welcome to the herd" line, OR keep them but ensure none feels like throat-clearing.

# 4. Voice & Language Alignment Audit

Sampling words per Doc §7:

| Word | Status | Notes |
|---|---|---|
| ✓ trigger, react to, flare, can't tolerate | Used | ExclusionsBlock — perfect MCAS-vocab |
| ✓ excipient | Used 3x | Just added — strong signal |
| ✓ filler, binder, coating, flow agent | Used | ExclusionsBlock educational copy |
| ✓ titratable, start low, go slow | **NOT used** | Per §2.5 this is what they want to see |
| ✓ Size 0 capsules, dysphagia | **NOT used** | Per §2.5 — high-leverage absence |
| ✓ source-verified | **NOT used** | Mentioned in /our-promise but not on home |
| ✓ MMP inhibition / ECM protection | NOT in crawlable homepage | Lives in lazy CollagenScienceSection |
| ✓ Mast cell stabilization | **NOT used on homepage** | Used on /the-how. Could add to hero subhead or near products |
| ✗ Miracle, cure, mega-dose, supercharged | Not used | ✓ Clean |
| ✗ Detox, cleanse, reset | Not used | ✓ Clean |
| ✗ Inspired by my journey | Not used | ✓ Clean |
| ✗ Boost immune system | Not used | ✓ Clean |

# 5. Suggested Reordered Sequence

**Goal**: keep what works, fill the gaps, eliminate the prerender invisibility issue.

```
1. Navigation                              [unchanged]
2. Hero                                    [add: small mention of BID dosing OR Size 0]
3. WhyZebraMascot                          [unchanged]
4. NEW — The Triad Dilemma section         [3-4 sentences naming the conflicts; positions the moat]
5. OurStory (Ava)                          [optional: add 1 sentence anchoring founder-as-caregiver-of-trifecta]
6. ExclusionsBlock                         [unchanged, just shipped]
7. NEW — Practical Signals strip           [Size 0 / titratable / start low go slow]
8. QualityStandards                        [un-lazy. Now crawler-visible]
9. CollagenScienceSection                  [un-lazy. ECM-protection framing now visible]
10. NEW — BID dosing pull-quote / stat    [Pillar #1 surfaced; could be inside or after #9]
11. Bridge button to /the-how             [un-lazy with #9]
12. ProductGrid                            [unchanged]
13. Testimonials                           [un-lazy]
14. FAQ                                    [un-lazy. 8 FAQs become indexable — big SEO win]
15. Footer
```

# 6. Prioritized Punch List

| # | Action | Why | Effort |
|---|---|---|---|
| **1** | **Un-lazy QualityStandards, CollagenScienceSection, Testimonials, FAQ** | Half the homepage is invisible to crawlers right now. This single change probably moves Ahrefs Health Score, GSC indexing breadth, and AudioEye scan results in one push. | 10 min |
| 2 | Add a "Triad Dilemma" callout section | Articulates the brand's reason to exist; positions the moat | 30 min draft + chat polish |
| 3 | Add Practical Signals strip (Size 0 / titratable / start low go slow) | Three high-trust signals the audience specifically looks for; missing | 20 min |
| 4 | Surface BID dosing as a stat/pull-quote | Doc's #1 landing-page pillar; currently buried | 15 min |
| 5 | Add "we protect collagen, not build it" pull-quote near science section | Pillar #3; the core scientific differentiation in one line | 10 min |
| 6 | Add "no fermentation-derived ingredients" to ExclusionsBlock closing or as a 10th item | Pillar #5; major MCAS-trust signal | 5 min |
| 7 | Slight tighten of empathy beats (consolidate "Wellness for the Unseen" / "We see you" / "Welcome to the herd") | Reduce throat-clearing without losing voice | Optional, 15 min |

# 7. What I'd Do First

**Just #1.** Un-lazy the four components. This single change:
- Makes ~3-4 KB of valuable indexable content visible to crawlers
- Surfaces 8 high-quality FAQ entries to Google (each is its own potential long-tail rank)
- Restores the "Collagen Shredder / MMP / ECM protection" framing as crawler-visible
- Should bump Ahrefs Health Score on next crawl
- Costs maybe 30 KB to the main bundle (one-time, cached after first load)

Everything else (#2-#7) is content work that benefits from your Claude.ai project chat — patient-language drafts of the Triad Dilemma callout, the Size 0/titratable signal strip, the BID dosing pull-quote, etc. I can write the briefs for those and ship them in a subsequent batch.

Want me to ship #1 right now and stage briefs for the others?
