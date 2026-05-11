export interface IngredientData {
    id: string;
    name: string;
    scientificName?: string;
    isExcluded?: boolean;
    atAGlance: {
        whatItIs: string;
        whyWeIncludeIt: string;
        dose: string;
        keyBenefits: string[];
    };
    howItWorks: string;
    research: {
        outcome: string;
        summary: string;
        studies: {
            source: string;
            pmid?: string;
            design?: string;
            finding: string;
        }[];
    }[];
    evidenceGaps?: string;
    triad: {
        mcas: string;
        heds: string;
        pots: string;
    };
    whyThisForm: {
        form: string;
        rationale: string;
        comparison?: {
            form: string;
            difference: string;
            selected: boolean;
        }[];
    };
    safety: {
        sideEffects: string;
        interactions: string;
        excipientConcerns: {
            avoid: string[];
            safe: string[];
        };
        cautions?: string;
    };
    howToStart?: {
        protocol: {
            step: string;
            dosage: string;
            notes: string;
        }[];
        timeline?: string;
    };
    sources: {
        title: string;
        link?: string;
        authors?: string;
        year?: string;
        pmid?: string;
    }[];
}

export const ingredients: Record<string, IngredientData> = {
    "palmitoylethanolamide": {
        id: "palmitoylethanolamide",
        name: "Palmitoylethanolamide (PEA)",
        atAGlance: {
            whatItIs: "A naturally occurring fatty acid compound your body makes to calm inflammation and stabilize mast cells",
            whyWeIncludeIt: "PEA is one of the most thoroughly studied mast cell stabilizers with exceptional safety, directly addressing the mast cell dysfunction central to MCAS",
            dose: "1,400 mg daily (700 mg AM + 700 mg PM)",
            keyBenefits: [
                "Reduces histamine release by 54% through CB2 receptor activation",
                "Significant pain reduction (SMD 1.68)",
                "No documented drug interactions with any POTS or MCAS medications",
                "Benefits continue improving through day 60"
            ]
        },
        howItWorks: "Imagine your mast cells as tiny alarm systems throughout your body. In MCAS, these alarms are hypersensitive—triggering at the slightest provocation and releasing histamine and other inflammatory chemicals. PEA works like a gentle dimmer switch for these overactive alarms.\n\nPEA stimulates an enzyme called DAGL, which increases your body's natural production of 2-AG—a compound that activates CB2 receptors on mast cells. When CB2 receptors are activated, mast cells become significantly less likely to degranulate (release their inflammatory contents). This is the exact opposite of triggering mast cells—PEA is a stabilizer, not an activator.\n\nBecause PEA is an endogenous compound (your body already makes it), therapeutic effects occur at physiologically achievable concentrations. This is different from many supplements that require impossibly high doses to work. PEA also activates PPAR-α receptors, reducing inflammation and providing neuroprotective benefits—particularly relevant for the brain fog many patients experience.",
        research: [
            {
                outcome: "Mast Cell Stabilization",
                summary: "PEA inhibits mast cell degranulation through multiple pathways, making it particularly valuable for MCAS patients.",
                studies: [
                    {
                        source: "Petrosino S et al., \"PEA counteracts substance P-induced mast cell activation\"",
                        pmid: "31878942",
                        design: "In vitro study using RBL-2H3 mast cells",
                        finding: "PEA achieved 54.3% inhibition of histamine release via CB2/DAGL pathway at physiological concentrations"
                    },
                    {
                        source: "Sarnelli G et al., \"Impaired Duodenal PEA Release Underlies...\"",
                        pmid: "33065341",
                        design: "Human duodenal biopsies from functional dyspepsia patients",
                        finding: "PEA significantly counteracted acid-induced mast cell activation and inflammatory markers in human tissue"
                    }
                ]
            },
            {
                outcome: "Chronic Pain Reduction",
                summary: "Multiple meta-analyses confirm significant pain benefits, relevant because 90% of hEDS patients experience chronic pain.",
                studies: [
                    {
                        source: "Lang-Illievich K et al., \"PEA in Treatment of Chronic Pain\"",
                        pmid: "36986081",
                        design: "Meta-analysis of 11 RCTs, 774 patients",
                        finding: "Pain reduction with SMD of 1.68 (p<0.00001), no major side effects reported"
                    },
                    {
                        source: "Schweiger V et al., \"Extended Treatment with Micron-Size Oral PEA\"",
                        pmid: "38892586",
                        design: "Meta-analysis examining treatment duration effects",
                        finding: "35.4% additional pain reduction at 60 days vs. 30 days—benefits continue building over time"
                    }
                ]
            }
        ],
        evidenceGaps: "No randomized controlled trials exist specifically in hEDS, POTS, or MCAS populations. All clinical evidence is extrapolated from related conditions including chronic pain, fibromyalgia, and functional dyspepsia. However, the mechanism of action (mast cell stabilization) directly addresses MCAS pathophysiology, and the Ehlers-Danlos Society GP Toolkit supports its use for MCAS management.",
        triad: {
            mcas: "PEA is a mast cell stabilizer—it calms overactive mast cells rather than triggering them. The 54% reduction in histamine release demonstrated in cell studies translates to meaningful symptom relief for many MCAS patients. Dr. Lawrence Afrin, a leading MCAS specialist, advocates for up to 3 grams daily of PEA, particularly for neurological symptoms. Critical for MCAS patients: PEA is NOT fermentation-derived, so there's no histamine/tyramine contamination risk.",
            heds: "While PEA doesn't directly affect collagen, it benefits hEDS patients through two mechanisms: (1) significant chronic pain reduction—90% of hEDS patients have chronic pain, and (2) mast cell stabilization, since MCAS is a common comorbidity affecting 14-47% of hEDS patients. PEA shows no anti-fibrotic effects that would concern hEDS patients.",
            pots: "PEA reduces neuroinflammation through PPAR-α activation, which may address the growing recognition that neuroinflammation contributes to POTS symptoms. POTS patients show elevated inflammatory markers (GDF15, NGAL, TNFR1), and PEA's anti-inflammatory effects may help. One theoretical caution: PPAR-α activation may slightly lower blood pressure—monitor BP during initiation, especially in hypotensive POTS patients."
        },
        whyThisForm: {
            form: "Ultramicronized PEA or Levagen+",
            rationale: "Standard PEA powder has very poor absorption—particles measuring 300-600 micrometers show minimal bioavailability. The solution is particle size reduction. We use ultramicronized or Levagen+ formulations because the enhanced absorption translates directly to clinical outcomes.",
            comparison: [
                { form: "Standard PEA (300-600 μm)", difference: "Only 1.1 pmol/mL plasma achieved; limited clinical effect", selected: false },
                { form: "Ultramicronized PEA (0.8-6 μm)", difference: "5× higher plasma concentration (5.4 pmol/mL); 82% absorption in 3 hours", selected: true },
                { form: "Levagen+ (LipiSperse)", difference: "1.75× higher AUC than standard; peak levels at 45 minutes vs. 2 hours", selected: true }
            ]
        },
        safety: {
            sideEffects: "PEA demonstrates exceptional safety. A meta-analysis of 16 clinical trials found no treatment-related adverse events at doses up to 1,800 mg daily. The most commonly reported side effects—mild dizziness (16-18%) and rare palpitations—occurred at rates similar to placebo. Long-term safety data extends to 120 days of continuous use without serious adverse events.",
            interactions: "PEA has NO documented drug interactions with any POTS or MCAS medications across 4,000+ patients in historical data. This includes beta-blockers, ivabradine, fludrocortisone, midodrine, hydroxyzine, cromolyn, ketotifen, and all H1/H2 blockers.",
            excipientConcerns: {
                avoid: ["Artificial dyes", "Sodium benzoate", "PEG (polyethylene glycol)", "Titanium dioxide coatings"],
                safe: ["Cotton-based microcrystalline cellulose", "Silica", "Rice flour"]
            },
            cautions: "A subset of MCAS patients (10-30%) may experience temporary \"paradoxical worsening\" during the first 1-2 weeks—this represents the endocannabinoid system adjusting before therapeutic levels are achieved. This resolves with continued use and can be minimized with slow titration. Avoid formulations containing common MCAS triggers."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "300 mg once daily", notes: "Assess tolerance; watch for paradoxical reactions" },
                { step: "Week 2", dosage: "300 mg twice daily", notes: "If tolerated, increase to BID dosing" },
                { step: "Weeks 3-4", dosage: "600-700 mg twice daily", notes: "Target maintenance dose" },
                { step: "Week 5+", dosage: "1,400 mg/day (maintenance)", notes: "Full therapeutic dose; continue for minimum 60 days" }
            ],
            timeline: "Some patients notice benefits within 1-3 weeks, but optimal effects occur at 60+ days. The meta-analysis showed 35% additional benefit at 60 days vs. 30 days—don't abandon treatment too early."
        },
        sources: [
            { title: "PEA counteracts substance P-induced mast cell activation by stimulating 2-AG biosynthesis", pmid: "31878942", authors: "Petrosino S et al.", year: "2019" },
            { title: "Impaired Duodenal PEA Release Underlies Acid-Induced Mast Cell Activation", pmid: "33065341", authors: "Sarnelli G et al.", year: "2020" },
            { title: "PEA in Treatment of Chronic Pain: A Systematic Review and Meta-Analysis", pmid: "36986081", authors: "Lang-Illievich K et al.", year: "2023" },
            { title: "Extended Treatment with Micron-Size Oral PEA in Chronic Pain", pmid: "38892586", authors: "Schweiger V et al.", year: "2024" },
            { title: "Effects of PEA on Nociceptive Pain: A Systematic Review", pmid: "36015298", authors: "Scuteri D et al.", year: "2022" }
        ]
    },
    "luteolin": {
        id: "luteolin",
        name: "Luteolin",
        atAGlance: {
            whatItIs: "A plant flavonoid found in celery, parsley, and artichokes that provides powerful mast cell stabilization",
            whyWeIncludeIt: "Luteolin is MORE POTENT than prescription cromolyn sodium at stabilizing mast cells, with excellent safety and minimal drug interactions",
            dose: "140 mg daily (70 mg AM + 70 mg PM)",
            keyBenefits: [
                "Superior to cromolyn sodium at inhibiting histamine, tryptase, and inflammatory cytokines",
                "Crosses the blood-brain barrier to reduce neuroinflammation",
                "Recommended by Ehlers-Danlos Society for MCAS management",
                "Minimal drug interactions with common POTS/MCAS medications"
            ]
        },
        howItWorks: "Think of luteolin as a master mast cell controller that works through multiple locks simultaneously. While cromolyn sodium (Gastrocrom) works through one pathway, luteolin blocks mast cell activation through several.\n\nFirst, luteolin prevents calcium from entering mast cells—calcium influx is the trigger for degranulation. No calcium surge, no histamine release. Second, it blocks NF-κB, a master switch for inflammatory gene expression. Third, it inhibits protein kinase C (PKC), another pathway that leads to mast cell activation.\n\nWhat makes luteolin special is that it's the most lipophilic (fat-loving) flavonoid, meaning it crosses the blood-brain barrier effectively. This matters because many patients experience \"brain fog\" and cognitive symptoms—luteolin can reduce neuroinflammation directly in the brain where it's causing problems. It also induces synthesis of brain-derived neurotrophic factor (BDNF) and other compounds that support nerve health.",
        research: [
            {
                outcome: "Superior Mast Cell Stabilization",
                summary: "Head-to-head comparisons show luteolin outperforms the prescription mast cell stabilizer cromolyn sodium.",
                studies: [
                    {
                        source: "Tsilioni I & Theoharides TC, \"Luteolin more effective than cromolyn at inhibiting mast cell activation\"",
                        pmid: "38588651",
                        design: "Cultured human mast cell comparison study",
                        finding: "Luteolin more effectively inhibited release of histamine, tryptase, IL-6, IL-8, and TNF-α across 10 different inflammatory markers compared to cromolyn"
                    }
                ]
            },
            {
                outcome: "Neuroinflammation and Brain Fog",
                summary: "Luteolin's ability to cross the blood-brain barrier provides unique benefits for cognitive symptoms.",
                studies: [
                    {
                        source: "Theoharides TC et al., \"Long-COVID syndrome-associated brain fog and chemofog: Luteolin to the rescue\"",
                        pmid: "33847020",
                        design: "Review of luteolin mechanisms in neuroinflammation",
                        finding: "Luteolin reduces microglial activation and IL-6 production in the brain, directly addressing mechanisms underlying brain fog"
                    }
                ]
            },
            {
                outcome: "Clinical Trial Evidence",
                summary: "While no direct MCAS trials exist, clinical studies using luteolin show meaningful effects.",
                studies: [
                    {
                        source: "Di Stadio A et al., \"Ultramicronized PEA and Luteolin Supplement Combined with Olfactory Training\"",
                        pmid: "35086448",
                        design: "Clinical trial in post-COVID patients",
                        finding: "Significant improvements in inflammatory markers and symptoms over 4-6 months using PEA-luteolin combination"
                    }
                ]
            }
        ],
        evidenceGaps: "No randomized controlled trials exist specifically in MCAS, hEDS, or POTS populations. Evidence for superior mast cell stabilization comes from in vitro studies comparing luteolin to cromolyn. However, the Ehlers-Danlos Society specifically recommends luteolin for MCAS management in hEDS patients. Additionally, luteolin CANNOT achieve MMP inhibition at oral doses—its value lies exclusively in mast cell stabilization, not collagen protection.",
        triad: {
            mcas: "Luteolin represents one of the most effective natural mast cell stabilizers available. Research demonstrates it inhibits not just histamine, but also tryptase, IL-6, IL-8, TNF-α, and other mediators—providing broader coverage than cromolyn which primarily targets histamine. Importantly, luteolin works prophylactically (preventively). The Ehlers-Danlos Society GP Toolkit specifically recommends luteolin for MCAS management.",
            heds: "Luteolin provides indirect benefit to hEDS patients through its powerful anti-inflammatory effects and MCAS management (14-47% of hEDS patients have comorbid MCAS). However, luteolin does NOT achieve sufficient plasma concentrations to inhibit MMPs—don't expect direct collagen-protective effects. Its value for hEDS is through mast cell stabilization and inflammation reduction, not ECM protection.",
            pots: "Luteolin's ability to cross the blood-brain barrier makes it uniquely valuable for POTS patients experiencing brain fog, cognitive dysfunction, and neurological symptoms. It reduces microglial activation and central neuroinflammation. Additionally, it stabilizes mast cells around autonomic nerve fibers and may support vagal tone by reducing inflammatory interference with the autonomic nervous system."
        },
        whyThisForm: {
            form: "Micronized Luteolin",
            rationale: "Standard luteolin powder has poor bioavailability—only 4-17% reaches your bloodstream. This creates a major therapeutic gap that must be addressed through formulation technology. We use micronized luteolin to ensure adequate absorption. Taking with fat-containing meals is essential.",
            comparison: [
                { form: "Standard luteolin powder", difference: "Only 4-17% bioavailability; most passes through unabsorbed", selected: false },
                { form: "Micronized luteolin", difference: "Reduced particle size improves absorption; moderate enhancement", selected: true },
                { form: "Liposomal luteolin", difference: "2-3× improved absorption; crosses blood-brain barrier more effectively", selected: true },
                { form: "PEA-Luteolin combination (10:1 ratio)", difference: "Synergistic effects; clinical trial evidence supports this combination", selected: true }
            ]
        },
        safety: {
            sideEffects: "Luteolin demonstrates an excellent safety profile in clinical trials up to 26 weeks. Very few adverse effects are reported even in highly reactive MCAS individuals. Unlike quercetin, which causes paradoxical reactions in 10-15% of MCAS patients, luteolin is generally well-tolerated.",
            interactions: "Luteolin shows minimal CYP450 enzyme interactions. No direct interactions found with beta blockers, antihistamines, fludrocortisone, midodrine, or cromolyn/ketotifen. Theoretical caution with anticoagulants (may enhance effects).",
            excipientConcerns: {
                avoid: ["Microcrystalline cellulose (wood-derived)", "Magnesium stearate", "FD&C dyes", "Sodium lauryl sulfate"],
                safe: ["Sunflower lecithin", "Olive pomace oil", "Rice flour"]
            },
            cautions: "Contraindicated in pregnancy/breastfeeding. Discontinue 2 weeks before surgery. Iron supplements may reduce absorption; space by 2+ hours. Allow 4-6 weeks for full therapeutic effect."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "50 mg once daily", notes: "Take with fatty meal" },
                { step: "Week 2", dosage: "50 mg twice daily", notes: "Morning and evening with meals" },
                { step: "Week 3", dosage: "70 mg once daily", notes: "Increase single dose" },
                { step: "Week 4+", dosage: "70 mg twice daily", notes: "Target maintenance dose" }
            ],
            timeline: "Allow 4-6 weeks for full therapeutic effect. Many patients report initial improvement around week 3-4. Consistent daily dosing is important due to the short half-life."
        },
        sources: [
            { title: "Luteolin more effective than cromolyn sodium at inhibiting mast cell activation", pmid: "38588651", authors: "Tsilioni I & Theoharides TC", year: "2024" },
            { title: "Long-COVID syndrome-associated brain fog and chemofog: Luteolin to the rescue", pmid: "33847020", authors: "Theoharides TC et al.", year: "2021" },
            { title: "Ultramicronized PEA and Luteolin Supplement Combined with Olfactory Training", pmid: "35086448", authors: "Di Stadio A et al.", year: "2022" },
            { title: "Beneficial Effects of Co-Ultramicronized Palmitoylethanolamide/Luteolin in a Mouse Model of Autism", pmid: "27611916", authors: "Bertolino B et al.", year: "2017" }
        ]
    },
"magnesium-bisglycinate": {
        id: "magnesium-bisglycinate",
        name: "Magnesium Bisglycinate",
        atAGlance: {
            whatItIs: "A highly absorbable, gentle form of magnesium bound to the amino acid glycine",
            whyWeIncludeIt: "Magnesium is a foundational mineral for mast cell stability, autonomic function, and as a cofactor for histamine degradation (DAO enzyme)",
            dose: "300 mg elemental magnesium daily (150 mg AM + 150 mg PM) from 2,400 mg magnesium glycinate",
            keyBenefits: [
                "Mast cell stabilizer: Reduces degranulation in dose-dependent manner",
                "DAO cofactor: Supports histamine degradation enzyme",
                "Correction of deficiency: 75% of POTS patients are deficient",
                "Glycine byproduct supports sleep and collagen"
            ]
        },
        howItWorks: "Magnesium is involved in over 300 enzymatic reactions. In the triad, three functions matter most. First, magnesium stabilizes mast cells. A 2025 study showed that magnesium reduces mast cell degranulation in a dose-dependent manner. Magnesium deficiency triggers the opposite: 4-5 fold increased histamine levels.\n\nSecond, magnesium is a cofactor for diamine oxidase (DAO)—the enzyme that breaks down histamine. Without enough magnesium, your body can't efficiently degrade released histamine.\n\nThird, magnesium modulates the autonomic nervous system. It supports parasympathetic (\"rest and digest\") tone and improves heart rate variability. The glycinate form also provides ~2g of glycine daily, which supports sleep and serves as a building block for collagen.",
        research: [
            {
                outcome: "Mast Cell Stabilization",
                summary: "Recent research provides definitive evidence that magnesium stabilizes—not activates—mast cells.",
                studies: [
                    {
                        source: "Kazama I et al., \"Magnesium and zinc stabilize mast cells\"",
                        pmid: "40692390",
                        design: "In vitro study using rat peritoneal mast cells (2025)",
                        finding: "Magnesium chloride reduced degranulating mast cells in a dose-dependent manner—first definitive in vitro evidence"
                    },
                    {
                        source: "Srebro D et al., \"Magnesium in orofacial pain model\"",
                        pmid: "37047214",
                        design: "In vivo rat model (2023)",
                        finding: "Magnesium reduced mast cell degranulation by ~23% in acute phase and ~40% in second phase"
                    }
                ]
            },
            {
                outcome: "Autonomic Function and HRV",
                summary: "Magnesium supplementation improves heart rate variability and autonomic balance.",
                studies: [
                    {
                        source: "Almoznino-Sarafian D et al., \"Magnesium and heart rate variability\"",
                        pmid: "19201586",
                        design: "Controlled trial, 32 heart failure patients, 300 mg/day",
                        finding: "HRV correlation dimension significantly improved from 3.47 to 3.94 (p<0.001)"
                    }
                ]
            },
            {
                outcome: "Deficiency and Consequences",
                summary: "Magnesium deficiency triggers mast cell activation and is extremely common in this population.",
                studies: [
                    {
                        source: "Kraeuter SL & Schwartz R, \"Magnesium deficiency and histamine\"",
                        pmid: "6445415",
                        design: "Animal model of magnesium depletion",
                        finding: "Magnesium-depleted rats showed 4-5 fold increased blood histamine by day 14 with massive degranulation"
                    }
                ]
            }
        ],
        evidenceGaps: "No randomized controlled trials exist specifically testing magnesium glycinate in hEDS, POTS, or MCAS. One hEDS study found 59/94 patients had low RBC magnesium. Despite limited trials, 61-81% of hEDS patients report taking magnesium, reflecting widespread clinical use.",
        triad: {
            mcas: "Magnesium provides dual MCAS support: (1) direct mast cell stabilization and (2) DAO cofactor support. Critically, deficiency causes 4-5 fold increased histamine. Glycinate is preferred as it's not fermentation-derived (unlike citrate).",
            heds: "Magnesium may provide collagen protection through MMP inhibition. The glycine byproduct serves as a building block for collagen. It also supports muscle relaxation, helping with spasms common in hEDS.",
            pots: "75% of POTS patients have magnesium deficiency. Magnesium improves heart rate variability and supports parasympathetic tone. Monitor blood pressure in hypotensive POTS patients as it can lower BP slightly."
        },
        whyThisForm: {
            form: "Magnesium Glycinate",
            rationale: "Form selection matters for absorption and MCAS tolerability. We chose glycinate because it uses the PEPT1 dipeptide pathway, causes minimal GI upset, is NOT fermentation-derived, and provides beneficial glycine.",
            comparison: [
                { form: "Magnesium oxide", difference: "Only 4-15% absorption; strong laxative effect", selected: false },
                { form: "Magnesium citrate", difference: "~30% absorption; fermentation-derived = histamine risk", selected: false },
                { form: "Magnesium glycinate", difference: "High absorption; minimal GI upset; glycine benefits", selected: true },
                { form: "Magnesium L-threonate", difference: "Crosses blood-brain barrier; excellent for brain fog", selected: true }
            ]
        },
        safety: {
            sideEffects: "Magnesium glycinate is the best-tolerated form for GI-sensitive patients. Diarrhea can occur if dose is increased too rapidly. Theoretical concern of hypotension exists but is usually not significant in normotensive populations.",
            interactions: "Antibiotics: Space by 2-6 hours. Bisphosphonates: Separate by 2+ hours. Thyroid medications: Space 2-4 hours. Fludrocortisone: Monitor electrolytes.",
            excipientConcerns: {
                avoid: ["Fermentation-derived citrate", "Magnesium stearate", "Artificial colors"],
                safe: ["Magnesium glycinate from Albion chelate", "Powder form (eliminates fillers)"]
            },
            cautions: "Monitor blood pressure when initiating. Kidney function should be normal. Paradoxical reactions occur in 25-30% of MCAS patients; try a different form if this happens."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "100 mg elemental", notes: "MCAS ultra-sensitive start" },
                { step: "Week 2", dosage: "125 mg twice daily", notes: "Standard start" },
                { step: "Week 3", dosage: "150 mg twice daily", notes: "Target maintenance" },
                { step: "Week 4+", dosage: "300 mg elemental daily", notes: "Full therapeutic dose, split AM/PM" }
            ],
            timeline: "RBC magnesium repletion requires 8-12 weeks. Don't expect immediate effects—repletion takes time. Sleep benefits may appear within 2-4 weeks."
        },
        sources: [
            { title: "Magnesium and zinc stabilize mast cells in a dose-dependent manner", pmid: "40692390", authors: "Kazama I et al.", year: "2025" },
            { title: "Magnesium reduces mast cell degranulation in orofacial pain model", pmid: "37047214", authors: "Srebro D et al.", year: "2023" },
            { title: "Magnesium administration and heart rate variability", pmid: "19201586", authors: "Almoznino-Sarafian D et al.", year: "2009" },
            { title: "Bioavailability of magnesium diglycinate vs magnesium oxide", pmid: "7815675", authors: "Schuette SA et al.", year: "1994" }
        ]
    },
    "pine-bark-extract": {
        id: "pine-bark-extract",
        name: "Pine Bark Extract",
        atAGlance: {
            whatItIs: "A standardized extract from French maritime pine bark containing powerful oligomeric proanthocyanidins (OPCs).",
            whyWeIncludeIt: "pine bark extract is one of the few natural compounds that achieves clinically meaningful MMP inhibition, essential for connective tissue protection in hEDS, while also providing venous support for POTS and mast cell stabilization for MCAS.",
            dose: "200 mg daily (100 mg AM + 100 mg PM)",
            keyBenefits: [
                "Strong MMP inhibition (MMP-8/9) at oral doses",
                "Stabilizes mast cells (histamine & tryptase inhibition)",
                "Reduces edema and blood pooling better than compression stockings",
                "Increases Type I collagen gene expression"
            ]
        },
        howItWorks: "pine bark extract works through a unique metabolite called M1 that your body produces after absorption.\n\nFor connective tissue (hEDS): pine bark extract is one of the few natural compounds that achieves clinically meaningful MMP inhibition at oral doses. The M1 metabolite reaches plasma concentrations that match the requirements for inhibiting MMP-9, an enzyme that breaks down collagen. Studies show significant reduction in MMP-8 and upregulation of protective proteins like TIMP-4.\n\nFor mast cells (MCAS): pine bark extract stabilizes mast cells through histamine and tryptase inhibition comparable to prescription stabilizers like cromolyn sodium. It also blocks allergic responses, reducing the release of inflammatory cytokines.\n\nFor blood pooling (POTS): pine bark extract provides significant venous-toning effects. It has been shown to be more effective than compression stockings alone in reducing edema related to venous insufficiency, directly addressing the peripheral blood pooling common in POTS.",
        research: [
            {
                outcome: "MMP Inhibition (Connective Tissue Protection)",
                summary: "pine bark extract's metabolites effectively inhibit the enzymes responsible for collagen breakdown.",
                studies: [
                    { source: "Bayer J et al., \"100 mg BID × 3 months → significant MMP-8 reduction\"", pmid: "40362854", design: "2025 German RCT (n=91)", finding: "Significant MMP-8 reduction (p=0.0261) after 3 months of supplementation." },
                    { source: "Grimm T et al., \"200 mg/day × 5 days → 25% reduction in MMP-9 release\"", pmid: "16441890", design: "Human pilot study (n=7)", finding: "Significant reduction in MMP-9 release from neutrophils (p<0.01)." },
                    { source: "Grimm T et al., \"M1 metabolite achieves ~50% MMP-9 inhibition\"", pmid: "14990359", finding: "M1 metabolite reaches concentrations in human plasma sufficient to achieve ~50% MMP-9 inhibition." }
                ]
            },
            {
                outcome: "Collagen Support",
                summary: "pine bark extract enhances the body's natural production of Type I collagen.",
                studies: [
                    { source: "Marini A et al., \"75 mg/day × 12 weeks → Increased COL1A1/COL1A2\"", pmid: "22270036", design: "Human RCT (n=20)", finding: "Increased COL1A1 gene expression by 29% and COL1A2 by 41% along with hyaluronic acid synthesis." }
                ]
            },
            {
                outcome: "Venous Support (POTS/Blood Pooling)",
                summary: "pine bark extract outperforms compression stockings in reducing fluid accumulation and improving circulation.",
                studies: [
                    { source: "Arcangeli P et al., \"300 mg/day × 2 months → 60% edema resolution\"", pmid: "11081989", design: "Human RCT (n=40)", finding: "60% of patients achieved complete edema disappearance compared to placebo." },
                    { source: "Cesarone MR et al., \"More effective than compression stockings\"", pmid: "20579863", design: "Comparative study (n=142)", finding: "Clinical efficacy in reducing edema significantly higher than compression stockings alone." }
                ]
            },
            {
                outcome: "Mast Cell Stabilization",
                summary: "Inhibits the release of histamine at levels comparable to prescription options.",
                studies: [
                    { source: "Sharma SC et al., \"Histamine release inhibition comparable to cromolyn\"", pmid: "12557250", finding: "pine bark extract demonstrates histamine inhibition profile similar to cromolyn sodium in mast cell models." }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials exist specifically in hEDS, POTS, or MCAS populations. The mechanistic evidence is strength, but findings are extrapolated from periodontal, skin, and chronic venous insufficiency studies. Clinical validation in these specific triple-triad populations is still needed.",
        triad: {
            mcas: "pine bark extract is a potent mast cell stabilizer that inhibits histamine and tryptase. Research suggests it is comparable to cromolyn sodium in its ability to prevent degranulation. Importantly, it is not fermentation-derived, which eliminates histamine/tyramine contamination risks common with other plant extracts.",
            heds: "Addresses the 'broken bucket' of hEDS by inhibiting MMPs (enzymes that break down collagen) and upregulating Type I collagen genes. It is one of the few supplements with human pharmacokinetic data proving that it reaches tissue concentrations high enough to actually stop these destructive enzymes.",
            pots: "Addresses the peripheral blood pooling mechanism of POTS by strengthening venous tone. Clinical data shows it and its metabolites reduce edema and fluid leakage more effectively than professional compression stockings in some populations.",
        },
        whyThisForm: {
            form: "generic pine bark extract (Standardized Horphag Extract)",
            rationale: "Generic 'pine bark extract' lacks the standardization and human pharmacokinetic data of the brand-name generic pine bark extract. All clinical trials showing MMP inhibition and collagen support used this specific standardization (65-75% procyanidins). BID dosing is required because its primary active metabolite (M1) peaks at 6-10 hours; two doses ensure steady-state tissue levels.",
            comparison: [
                { form: "Generic Pine Bark Extract", difference: "Lacks pharmacokinetic validation; inconsistent procyanidin levels", selected: false },
                { form: "generic pine bark extract Horphag", difference: "Standardized to 65–75% procyanidins; validated M1 metabolite levels", selected: true }
            ]
        },
        safety: {
            sideEffects: "pine bark extract shows excellent safety across nearly 7,000 trial participants. The overall adverse event rate is only 2.4%. Most common effects are mild GI discomfort, prevented by taking with food. Transient headache or dizziness can occurs in rare cases.",
            interactions: "Beta-blockers: Additive blood pressure lowering (~2–3 mmHg). Anticoagulants: Theoretical antiplatelet effects; monitor if on warfarin. Fludrocortisone/Midodrine: Opposing blood pressure effects are theoretically possible.",
            excipientConcerns: {
                avoid: ["Unknown fermentation residues", "Artificial fillers"],
                safe: ["Water/ethanol extract (non-fermented)", "Microcrystalline cellulose"]
            },
            cautions: "Stop 2 weeks before surgery due to antiplatelet effects. Avoid in first-trimester pregnancy. Autoimmune patients should use caution as pine bark extract may stimulate certain immune pathways. Monitor for orthostatic symptoms if your baseline BP is very low (<100 mmHg)."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "50 mg daily", notes: "MCAS-sensitive start (AM only)" },
                { step: "Week 2", dosage: "50 mg twice daily", notes: "Standard BID frequency" },
                { step: "Week 3", dosage: "75 mg twice daily", notes: "Increasing to therapeutic levels" },
                { step: "Week 4+", dosage: "100 mg twice daily", notes: "Full target dose (200 mg/day)" }
            ],
            timeline: "Venous/edema benefits typically appear within 2–4 weeks. MMP inhibition and collagen gene changes require 8–12 weeks of consistent dosing for visible effects."
        },
        sources: [
            { title: "MMP-8 reduction at 100 mg BID in human RCT", pmid: "40362854", authors: "Bayer J", year: "2025" },
            { title: "Human plasma inhibits MMP-9 after oral dosing of pine bark extract", pmid: "16441890", authors: "Grimm T", year: "2006" },
            { title: "pine bark extract metabolite M1 inhibits MMP-9", pmid: "14990359", authors: "Grimm T", year: "2004" },
            { title: "Increased COL1A1/COL1A2 gene expression in human skin", pmid: "22270036", authors: "Marini A", year: "2012" },
            { title: "Mast cell histamine inhibition comparable to cromolyn", pmid: "12557250", authors: "Sharma SC", year: "2003" },
            { title: "60% complete edema resolution in CVI trial", pmid: "11081989", authors: "Arcangeli P", year: "2000" }
        ]
    },
    "nicotinamide-riboside": {
        id: "nicotinamide-riboside",
        name: "NICOTINAMIDE RIBOSIDE (Niagen®)",
        atAGlance: {
            whatItIs: "A specialized form of vitamin B3 that efficiently raises NAD+ levels, essential for cellular energy and repair.",
            whyWeIncludeIt: "NR directly suppresses mast cell degranulation via the SIRT6 pathway and protects collagen by inhibiting MMP enzymes and upregulating crosslinking proteins.",
            dose: "500 mg daily (250 mg BID)",
            keyBenefits: [
                "Elevates blood NAD+ by 40–60%",
                "Suppresses histamine, tryptase, and leukotrienes via SIRT6",
                "Inhibits MMP-9 upregulation in collagen tissues",
                "Restores mitochondrial function in vascular EDS models"
            ]
        },
        howItWorks: "Nicotinamide Riboside (NR) is a cellular fuel that activates protective proteins called sirtuins.\n\nFor mast cells (MCAS): Groundbreaking 2022 research found that NR directly suppresses mast cell degranulation through the SIRT6 pathway. This reduces the release of histamine, tryptase, prostaglandins, and inflammatory cytokines like IL-6 and TNF-α. This mechanism makes NR a genuine mast cell stabilizer rather than just an anti-inflammatory.\n\nFor collagen (hEDS): NR activates SIRT1, which blocks the expression of MMP enzymes (collagen-destroying enzymes). It has been shown to reverse MMP-9 upregulation in tenocytes and fibroblasts. Additionally, it upregulates PLOD1 (lysyl hydroxylase), which is required for strong collagen crosslinking.\n\nFor mitochondria: NR consistently raises NAD+ levels, which restores mitochondrial function. This is particularly relevant for the multi-system fatigue and cellular dysfunction often seen across the triad.",
        research: [
            {
                outcome: "Mast Cell Stabilization (SIRT6 Pathway)",
                summary: "NR directly inhibits the release of standard allergy mediators from human mast cells.",
                studies: [
                    { source: "Kim et al., \"NR suppresses mast cell degranulation via SIRT6\"", pmid: "35547746", design: "Preclinical (Theranostics, 2022)", finding: "Reduced histamine, tryptase, PGD2, and LTC4 production in human cord blood-derived mast cells." }
                ]
            },
            {
                outcome: "NAD+ Elevation",
                summary: "Consistently doubles or raises NAD+ levels at therapeutic doses.",
                studies: [
                    { source: "Conze et al., \"300 mg → 51% elevation in blood NAD+\"", pmid: "31278280", design: "Human RCT (2019)", finding: "Dose-dependent and safe NAD+ increases established in multiple human cohorts." },
                    { source: "Berven et al., \"NR-SAFE trial established safety at 3000 mg/day\"", pmid: "38016950", design: "High-dose safety trial (2024)", finding: "Demonstrated 5-fold NAD+ increase with no serious adverse events at massive doses." }
                ]
            },
            {
                outcome: "Collagen & Mitochondrial Protection",
                summary: "Protects the extracellular matrix and restores energy production in connective tissue cells.",
                studies: [
                    { source: "Marcos-Ríos et al., \"NR restores mitochondrial function in vEDS cells\"", pmid: "40497944", design: "vEDS Cell Model (2025)", finding: "Improved mitochondrial health and reduced MMP activity in cells with vascular EDS mutations." },
                    { source: "Busch et al., \"SIRT1 reverses MMP-9 upregulation in tenocytes\"", pmid: "22689577", finding: "Activation of sirtuin pathways directly opposes the 'broken bucket' mechanism of collagen breakdown." }
                ]
            }
        ],
        evidenceGaps: "No clinical trials currently exist specifically in hEDS, POTS, or MCAS populations. While NR robustly elevates NAD+ (a biomarker), functional clinical outcomes in humans have been mixed in other populations. The mast cell stabilization property is currently supported by high-quality preclinical/lab data but requires MCAS patient validation.",
        triad: {
            mcas: "NR is the first NAD+ booster shown to directly stabilize mast cells via the SIRT6 pathway. By reducing Tryptase and Prostaglandin D2 release, it offers a novel mechanism of protection that complements traditional stabilizers like quercetin or luteolin.",
            heds: "Protects collagen from destruction by inhibiting MMPs and supports the crosslinking process by upregulating PLOD1. For patients with vascular EDS or severe hypermobility, its ability to restore mitochondrial energy in connective tissue cells is a critical benefit.",
            pots: "Supports the vascular system, though caution is needed as it can lower systolic blood pressure by ~10 mmHg. For hyperadrenergic or hypertensive POTS patients, this may be a benefit; for hypotensive patients, it requires careful monitoring of medication efficacy.",
        },
        whyThisForm: {
            form: "Niagen® (Standardized NR)",
            rationale: "Analysis of marketplace NR products found that 87% fail their label claims or contain counterfeits. Niagen® is the standardized form used in nearly all successful clinical trials. It is synthetic (not fermentation-derived), which is critical for MCAS patients who must avoid the histamine residues common in bio-derived B-vitamins. BID dosing is essential due to NR's short 2.7-hour half-life.",
            comparison: [
                { form: "Marketplace/Generic NR", difference: "87% failure rate on label claims; potential counterfeit risk", selected: false },
                { form: "Niagen® (ChromaDex)", difference: "Validated in 100+ trials; synthetic and fermentation-free", selected: true }
            ]
        },
        safety: {
            sideEffects: "NR shows excellent safety even at extremely high doses (up to 3,000 mg). Occasional mild effects (<10%) include nausea, bloating, fatigue, or mild headaches. Long-term safety has been established in multi-month trials.",
            interactions: "Blood pressure medications: Additive hypotension (~10 mmHg). Beta-blockers/Midodrine: May have opposing or additive effects on orthostatic symptoms. Warfarin: Monitor INR periodically. Diabetes medications: May affect glucose sensitivity.",
            excipientConcerns: {
                avoid: ["Fermentation-derived B-vitamins", "Unverified marketplace fillers"],
                safe: ["Niagen® (pure synthetic)", "Methylation support if needed"]
            },
            cautions: "A 10 mmHg systolic blood pressure reduction is documented. Patients on fludrocortisone or midodrine should monitor for reduced medication efficacy. Patients with methylation issues may benefit from concurrent methyl-donors (B12/Folate)."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "100 mg daily", notes: "Assess tolerance (AM only)" },
                { step: "Week 2", dosage: "125 mg twice daily", notes: "Building to target dose" },
                { step: "Week 3", dosage: "200 mg twice daily", notes: "Assessing energy and BP" },
                { step: "Week 4+", dosage: "250 mg twice daily", notes: "Full therapeutic dose (500 mg/day)" }
            ],
            timeline: "NAD+ elevation occurs within days. Functional improvements in energy or mast cell symptoms are highly variable and may take 4–12 weeks of consistent Use."
        },
        sources: [
            { title: "NR suppresses mast cell degranulation via SIRT6", pmid: "35547746", authors: "Kim et al.", year: "2022" },
            { title: "Dose-dependent NAD+ increase; 300 mg safe and effective", pmid: "31278280", authors: "Conze et al.", year: "2019" },
            { title: "NR restores mitochondrial function in vEDS cells", pmid: "40497944", authors: "Marcos-Ríos", year: "2025" },
            { title: "~10 mmHg BP reduction at 1000 mg/day", pmid: "29599478", authors: "Martens", year: "2018" },
            { title: "NR-SAFE: 3000 mg/day safe with 5-fold NAD+ increase", pmid: "38016950", authors: "Berven", year: "2024" }
        ]
    },
    "taurine": {
        id: "taurine",
        name: "Taurine",
        atAGlance: {
            whatItIs: "A conditionally essential amino acid that serves as a master regulator of the cardiovascular and nervous systems.",
            whyWeIncludeIt: "Taurine stabilizes mast cells, modulates autonomic tone (reducing heart rate), and has rare human evidence for inhibiting MMP-9 enzymes.",
            dose: "1,500 mg daily (750 mg AM + 750 mg PM)",
            keyBenefits: [
                "Reduces heart rate (-3.58 bpm) and systolic BP (-4.0 mmHg)",
                "Human evidence for MMP-9 inhibition at 1.5g doses",
                "Stabilizes mast cells via PPAR-γ and SOD3 pathways",
                "No fermentation/histamine risk (chemically synthesized)"
            ]
        },
        howItWorks: "Taurine is a versatile regulator with triple benefits for the triad.\n\nFor mast cells (MCAS): Taurine stabilizes mast cells by activating PPAR-γ receptors and upregulating protective antioxidant enzymes (SOD3). It has been shown to dose-dependently inhibit histamine release and decrease IgE levels. It also promotes hydrogen sulfide production, which naturally opposes mast cell activation.\n\nFor autonomic function (POTS): A meta-analysis of 20 human trials confirmed that taurine reduces heart rate and blood pressure by enhancing vagal tone (the 'braking' system of the heart) and dampening sympathetic overdrive. This makes it particularly valuable for hyperadrenergic POTS subtypes.\n\nFor connective tissue (hEDS): A human RCT in elderly women showed that 1.5g of oral taurine significantly decreased MMP-9, one of the primary enzymes involved in collagen breakdown. It also supports collagen synthesis and the production of hyaluronic acid in skin fibroblasts.",
        research: [
            {
                outcome: "Cardiovascular/POTS Support",
                summary: "Robust meta-analysis evidence for heart rate and blood pressure regulation.",
                studies: [
                    { source: "Tzang et al., \"Meta-analysis of 20 RCTs (n=808)\"", pmid: "39148075", design: "Meta-analysis (2024)", finding: "Heart rate: -3.58 bpm (p=0.004), Systolic BP: -4.00 mmHg (p=0.017)." }
                ]
            },
            {
                outcome: "MMP Inhibition (Connective Tissue)",
                summary: "Demonstrated reduction in collagen-destroying enzymes in humans.",
                studies: [
                    { source: "Chupel et al., \"1.5 g/day × 14 weeks → ↓MMP-9 in human RCT\"", pmid: "33586039", design: "Human RCT (2021)", finding: "Decreased MMP-9 and myeloperoxidase levels achieved at a physiologically realistic oral dose." }
                ]
            },
            {
                outcome: "Mast Cell Stabilization",
                summary: "Multiple pathways of stabilization identified in recent studies.",
                studies: [
                    { source: "Zhou et al., \"↑ SOD3 via PPAR-γ; ↓ mast cell infiltration\"", pmid: "32417836", finding: "Reduced inflammatory cytokine production and mast cell density in allergy models." },
                    { source: "Nam et al., \"Inhibited TSLP, reduced histamine and IgE\"", pmid: "28694089", finding: "Significant inhibition of key mast cell signaling pathways (NF-κB, JNK, p38)." }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials exist specifically in hEDS, POTS, or MCAS populations. The cardiovascular benefits are extrapolated from hypertensive and heart failure populations. Cardiovascular benefits specifically require doses of 1.5g or higher; lower doses often fail to show heart rate changes.",
        triad: {
            mcas: "Taurine is a quiet workhorse for mast cell stability. By reducing JNK and NF-κB signaling, it damps the internal fire of the mast cell. Critically for MCAS patients, commercial taurine is chemically synthesized rather than fermented, meaning there is zero risk of the histamine or tyramine residues found in many bio-derived amino acids.",
            heds: "Offers rare human evidence for MMP-9 inhibition at achievable oral doses. By lowering these destructive enzymes, it helps slow the 'broken bucket' effect of collagen breakdown. It also supports the production of hyaluronic acid and ceramides which help with the skin fragility often seen in hEDS.",
            pots: "Ideal for hyperadrenergic POTS patients experiencing high heart rates and sympathetic overdrive. It helps shift the body back toward parasympathetic (vagal) tone. Because it can lower blood pressure slightly, it should be used with more caution in the hypotensive 'fainting' POTS subtype.",
        },
        whyThisForm: {
            form: "Synthetic Taurine Powder",
            rationale: "Taurine is chemically synthesized (not fermentation-derived), eliminating histamine contamination risk. We chose the powder form because the therapeutic dose (1,500 mg) would require multiple large capsules, which is burdensome. Taurine is nearly tasteless and dissolves easily. The 1,500 mg dose is specific: doses below 1g fail to achieve the cardiovascular benefits documented in recent meta-analyses.",
            comparison: [
                { form: "Fermentation-derived Taurine", difference: "Risk of histamine/tyramine contamination (high MCAS risk)", selected: false },
                { form: "Synthetic Taurine", difference: "Chemically pure; safe for high-sensitivity MCAS", selected: true }
            ]
        },
        safety: {
            sideEffects: "Taurine has an excellent safety profile (EFSA permits up to 6g daily). Most users tolerate 1.5g perfectly. Rare reports include paradoxical stimulation (jitteriness) or temporary sleep disruption. Mild GI effects can occur at much higher doses.",
            interactions: "Beta-blockers/Ivabradine: Additive heart rate lowering; monitor for excessive bradycardia. Fludrocortisone/Midodrine: May partially oppose the blood-pressure raising effects of these medications.",
            excipientConcerns: {
                avoid: ["Animal-derived gelatin capsules (optional)", "Fermented sources"],
                safe: ["Pure synthetic powder", "Rice flour if capsuled"]
            },
            cautions: "Likely beneficial for Hyperadrenergic POTS; requires closer monitoring for Hypotensive (low BP) POTS. If you experience paradoxical anxiety or insomnia, discontinue use."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "250 mg daily", notes: "Assess tolerance" },
                { step: "Week 2", dosage: "500 mg daily", notes: "Standard titration" },
                { step: "Week 3", dosage: "750 mg twice daily", notes: "Building to target" },
                { step: "Week 4+", dosage: "750 mg twice daily", notes: "Total 1,500 mg/day" }
            ],
            timeline: "Cardiovascular effects (heart rate/BP) typically stabilize within 2–4 weeks. MMP and mast cell benefits are long-term and require consistent use."
        },
        sources: [
            { title: "Meta-analysis: ↓HR 3.58 bpm, ↓BP 4 mmHg in 20 RCTs", pmid: "39148075", authors: "Tzang et al.", year: "2024" },
            { title: "1.5g/day × 14 weeks → ↓MMP-9 in human RCT", pmid: "33586039", authors: "Chupel et al.", year: "2021" },
            { title: "Inhibits TSLP, reduces histamine/IgE in mast cell models", pmid: "28694089", authors: "Nam et al.", year: "2017" },
            { title: "↑SOD3 via PPAR-γ; ↓mast cell infiltration", pmid: "32417836", authors: "Zhou et al.", year: "2020" }
        ]
    },
    "vitamin-c": {
        id: "vitamin-c",
        name: "Vitamin C (Sodium Ascorbate)",
        atAGlance: {
            whatItIs: "The essential cofactor for collagen synthesis and a potent regulator of histamine degradation.",
            whyWeIncludeIt: "hEDS patients have been shown to have 21% lower plasma Vitamin C levels. It is the mandatory cofactor for the enzymes that crosslink collagen chains and for DAO, the enzyme that clears histamine.",
            dose: "2,000 mg daily (1,000 mg BID)",
            keyBenefits: [
                "Addresses 21% plasma deficit found in hEDS patients",
                "Mandatory for collagen triple-helix and crosslinking",
                "Increases DAO activity for histamine degradation",
                "Buffered form (Sodium Ascorbate) provides extra salt for POTS"
            ]
        },
        howItWorks: "Vitamin C is the single most critical supplement for connective tissue because your body cannot make stable collagen without it.\n\nFor collagen (hEDS): Vitamin C is the essential cofactor for 'prolyl' and 'lysyl' hydroxylase—the enzymes that weave collagen chains into stable triple-helix structures. Without it, collagen chains can't crosslink, resulting in weak, fragile tissue. A 2024 Danish study found that hEDS patients have 21% lower plasma vitamin C levels than controls, suggesting they 'use up' Vitamin C faster due to high collagen turnover.\n\nFor POTS: Vitamin C reduces oxidative stress and improves the reactivity of blood vessels. One trial showed that high-dose Vitamin C helped normalize the way veins respond to position changes in certain POTS patients.\n\nFor mast cells (MCAS): Vitamin C degrades histamine directly and serves as a vital cofactor for Diamine Oxidase (DAO)—the primary enzyme responsible for breaking down histamine. It has been shown to increase DAO activity and reduce serum histamine levels by over 30%.",
        research: [
            {
                outcome: "hEDS-Specific Depletion",
                summary: "First direct evidence that hypermobility patients are chronically low in Vitamin C.",
                studies: [
                    { source: "Leinøe et al., \"hEDS patients have 21% lower plasma vitamin C\"", pmid: "39311717", design: "Danish cohort study (2024)", finding: "hEDS patients showed 21% lower levels; 32% were clinically suboptimal, suggesting higher metabolic demand." }
                ]
            },
            {
                outcome: "Collagen Synthesis & Wound Healing",
                summary: "Vitamin C doubles the body's markers for new collagen production.",
                studies: [
                    { source: "Shaw et al., \"Gelatin + vitamin C doubled collagen synthesis markers\"", pmid: "27852613", design: "Human Study (2017)", finding: "Exercise combined with Vitamin C supplementation doubled the appearance of collagen building blocks in the blood." },
                    { source: "Kjaer et al., \"1,250 mg → 49% increase in wound collagen marker\"", pmid: "31897483", finding: "Significant enhancement of the body's ability to repair connective tissue at therapeutic doses." }
                ]
            },
            {
                outcome: "MCAS & Histamine Clearance",
                summary: "Significant reduction in histamine levels and increase in degradation enzymes.",
                studies: [
                    { source: "Hagel et al., \"IV vitamin C reduced serum histamine 31%\"", pmid: "23666445", finding: "Direct clinical evidence of massive histamine reduction via vitamin C administration." },
                    { source: "Johnston, \"2g oral increased DAO activity (p<0.001)\"", pmid: "25095772", design: "Human RCT", finding: "Oral doses significantly increased the activity of the enzyme responsible for clearing histamine from the gut." }
                ]
            }
        ],
        evidenceGaps: "While the 21% deficit in hEDS establishes a clear need, no randomized clinical trial has yet proven that high-dose Vitamin C reverses hypermobility symptoms. Much of the dramatic POTS cardiovascular data used IV doses that are much higher than what can be absorbed through purely oral supplementation.",
        triad: {
            mcas: "A foundational 'triad stabilizer.' It acts at both ends of the mast cell problem: it helps stabilize the membrane itself and provides the engine for DAO, the enzyme that cleans up the 'histamine mess' after degranulation. We use a buffered, corn-free form to avoid the triggers found in cheap ascorbic acid.",
            heds: "The mandatory building block for collagen. Without it, your 'broken bucket' of hEDS cannot even attempt to repair itself. Given the 2024 proof that hypermobile patients are deficient, 2,000 mg ensures you have enough for both daily repair and the extra demand of EDS collagen turnover.",
            pots: "By using the Sodium Ascorbate form, we provide ~218mg of sodium per day alongside the Vitamin C. Since POTS patients require high sodium intake (3–10g), this form provides a small salt boost while improving blood vessel reactivity and reducing oxidative stress on the vascular system.",
        },
        whyThisForm: {
            form: "Sodium Ascorbate (Buffered/Corn-Free)",
            rationale: "Standard ascorbic acid is highly acidic and often derived from fermented corn—two major triggers for MCAS GI sensitivity. Sodium Ascorbate is pH-neutral (buffered), sparing the stomach. It also provides the additional sodium benefit helpful for POTS. We specify corn-free sources because corn residues are common mast cell triggers. We Use the 2,000 mg dose because it matches the threshold for DAO enzyme activation and addresses the 21% deficit seen in hypermobility.",
            comparison: [
                { form: "Ascorbic Acid (Corn-derived)", difference: "Highly acidic; corn-residue histamine risk; stomach set", selected: false },
                { form: "Sodium Ascorbate (Corn-Free)", difference: "Buffered (pH 7.0); provides extra POTS sodium; corn-free", selected: true }
            ]
        },
        safety: {
            sideEffects: "Excellent safety. The main effect is reaching 'bowel tolerance' (loose stools) if the dose is too high, which signifies you've exceeded your absorption limit. 2,000 mg is the standard upper limit and is well-tolerated when divided into AM/PM doses.",
            interactions: "Anticoagulants: May slightly affect vitamin K metabolism at extreme doses (rare at 2g). Iron supplements: Enhances iron absorption (monitor if you have iron overload like Hemochromatosis). Copper: Extremely high dose vitamin C can compete with copper; since DAO requires copper, we maintain a balanced 2g dose.",
            excipientConcerns: {
                avoid: ["Corn-derived fillers", "Synthetic dyes", "Fermentation byproducts"],
                safe: ["Tapioca-derived ascorbate", "Sodium-buffered powder"]
            },
            cautions: "Monitor for iron overload if you have Hemochromatosis. For men, ensure adequate hydration to mitigate any theoretical kidney stone risk associated with high-dose B-vitamins/C (though risk is not proven in women)."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "250 mg twice daily", notes: "Assess GI tolerance" },
                { step: "Week 2", dosage: "500 mg twice daily", notes: "Standard titration" },
                { step: "Week 3", dosage: "750 mg twice daily", notes: "Building repletion" },
                { step: "Week 4+", dosage: "1,000 mg twice daily", notes: "Full target dose (2,000 mg/day)" }
            ],
            timeline: "DAO enzyme activity and histamine reduction usually improve within 2–4 weeks. Collagen synthesis support is a baseline lifestyle requirement and should be continued indefinitely."
        },
        sources: [
            { title: "hEDS patients have 21% lower plasma vitamin C", pmid: "39311717", authors: "Leinøe et al.", year: "2024" },
            { title: "IV vitamin C increased cardiac output 40% in POTS", pmid: "21622825", authors: "Stewart et al.", year: "2011" },
            { title: "7.5g IV reduced serum histamine 31%", pmid: "23666445", authors: "Hagel et al.", year: "2014" },
            { title: "Vitamin C + gelatin doubled collagen synthesis markers", pmid: "27852613", authors: "Shaw et al.", year: "2017" },
            { title: "2g oral increased DAO activity", pmid: "25095772", authors: "Johnston", year: "2015" }
        ]
    },
    "vitamin-d3": {
        id: "vitamin-d3",
        name: "Vitamin D3 (Cholecalciferol)",
        atAGlance: {
            whatItIs: "A fat-soluble hormone that regulates calcium, supports immune function, and stabilizes mast cells",
            whyWeIncludeIt: "Addresses the high deficiency rate in POTS patients (51% are deficient) while providing mast cell stabilization and autonomic support",
            dose: "2,000 IU (50 mcg) daily",
            keyBenefits: [
                "74% of pediatric POTS patients improved in clinical trial",
                "Reduces histamine release by 23-34%",
                "Deficiency linked to 36% higher orthostatic hypotension risk",
                "Nearly 2x faster wound healing in RCTs"
            ]
        },
        howItWorks: "Vitamin D3 acts as a neuroactive hormone with profound effects on multiple systems. In POTS patients, it modulates autonomic nervous system function—deficiency correlates with decreased heart rate variability and impaired baroreflex sensitivity. It enhances β-adrenergic signal transduction in cardiac cells and regulates the renin-angiotensin system.\n\nFor MCAS, vitamin D3 works as a mast cell stabilizer. Mast cells express both vitamin D receptors (VDR) and the enzyme CYP27B1, enabling local conversion to active calcitriol. Through VDR-dependent mechanisms, it suppresses histamine release and reduces inflammatory mediators including leukotrienes, TNF-α, and IL-6.\n\nIn connective tissue, vitamin D influences the hydroxylation processes essential for stable collagen cross-linking, working synergistically with vitamin C and iron. High deficiency rates in hEDS (60%) and POTS (51%) make supplementation particularly relevant.",
        research: [
            {
                outcome: "POTS Symptom Improvement",
                summary: "Strong direct evidence from pediatric studies shows significant symptom improvement with supplementation.",
                studies: [
                    {
                        source: "Dong et al., Lanzhou University",
                        pmid: "40962545",
                        design: "RCT, n=65 pediatric POTS patients",
                        finding: "74% improved with 800 IU/day; POTS patients had markedly lower baseline 25(OH)D levels."
                    }
                ]
            },
            {
                outcome: "Orthostatic Hypotension Risk",
                summary: "Large meta-analysis confirms deficiency significantly increases orthostatic intolerance risk.",
                studies: [
                    {
                        source: "Zuin et al.",
                        pmid: "34628636",
                        design: "Meta-analysis, 16,326 patients",
                        finding: "Vitamin D deficiency associated with 36% higher orthostatic hypotension risk (OR 1.36)."
                    }
                ]
            },
            {
                outcome: "Mast Cell Stabilization",
                summary: "Mechanistic studies demonstrate D3 suppresses activation through receptor-mediated pathways.",
                studies: [
                    {
                        source: "Liu et al.",
                        pmid: "27998003",
                        finding: "D3 suppresses IgE-dependent mast cell activation, reducing histamine release by 23-34%."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct RCTs specifically in adult hEDS, POTS, or MCAS populations. Some findings are counterintuitive (e.g., higher vitamin D status in some MCAS cohorts). All autonomic benefits are extrapolated primarily from pediatric and diabetic populations.",
        triad: {
            mcas: "Vitamin D3 stabilizes rather than triggers mast cells. It suppresses IgE-dependent activation and reduces histamine, tryptase, and inflammatory cytokine release. European expert consensus recommends continuing supplementation in mastocytosis/MCAS based on these mechanisms.",
            heds: "60% of hEDS patients show deficiency, often due to GI malabsorption. Vitamin D supports collagen synthesis and bone mineralization. For joint health, deficiency is linked to significantly higher surgical retear rates. It works synergistically with K2 to ensure proper calcium utilization.",
            pots: "51% of POTS patients have levels below 20 ng/mL. The Chinese pediatric trial showed 74% improvement with supplementation. Heart rate variability markers may help identify those most likely to respond to Vitamin D."
        },
        whyThisForm: {
            form: "D3 (Cholecalciferol) - Oil-based",
            rationale: "D3 consistently outperforms D2 (ergocalciferol) in raising and maintaining serum levels. Oil-based formulations show 30-50% better absorption compared to powders when taken with food.",
            comparison: [
                { form: "D3 (Cholecalciferol)", difference: "3-5x more potent than D2; preferred form", selected: true },
                { form: "D2 (Ergocalciferol)", difference: "Inferior bioavailability; shorter half-life", selected: false },
                { form: "Oil-based Liquid/Capsule", difference: "30-50% better absorption than powder", selected: true }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. Hypercalcemia is possible at very high doses (>10,000 IU) without monitoring. Some patients report initial paradoxical reactions, often excipient-related.",
            interactions: "No direct interactions with common POTS/MCAS meds. H2 blockers may slightly reduce absorption (space by 2 hours). Thiazide diuretics require calcium monitoring.",
            excipientConcerns: {
                avoid: ["FD&C dyes", "Titanium dioxide", "Carrageenan", "Corn starch", "BHA/BHT"],
                safe: ["MCT oil", "Olive oil", "Minimal-ingredient liquid drops"]
            },
            cautions: "Monitor serum 25(OH)D levels (target 40-60 ng/mL). Check serum calcium if taking high doses (>4,000 IU)."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "1,000 IU daily", notes: "Ultra-sensitive start" },
                { step: "Weeks 3-4", dosage: "2,000 IU daily", notes: "Standard maintenance" },
                { step: "Ongoing", dosage: "2,000-4,000 IU daily", notes: "Adjust based on labs" }
            ],
            timeline: "Repletion takes 8-12 weeks; symptom improvement usually seen within 2-3 months. Take with fat-containing meal."
        },
        sources: [
            { title: "Vitamin D supplementation in pediatric POTS", pmid: "40962545", authors: "Dong et al.", year: "2025" },
            { title: "Vitamin D deficiency and orthostatic hypotension meta-analysis", pmid: "34628636", authors: "Zuin et al.", year: "2022" },
            { title: "Vitamin D suppresses IgE-dependent mast cell activation", pmid: "27998003", authors: "Liu et al.", year: "2017" },
            { title: "Vitamin D and autonomic function", pmid: "38747749", authors: "Faria et al.", year: "2024" },
            { title: "Vitamin D deficiency in vascular EDS", pmid: "27488172", authors: "Busch et al.", year: "2016" }
        ]
    },
    "vitamin-k2": {
        id: "vitamin-k2",
        name: "Vitamin K2 (MK-7)",
        atAGlance: {
            whatItIs: "A fat-soluble vitamin that activates proteins essential for calcium regulation and vascular health",
            whyWeIncludeIt: "Works synergistically with D3 to prevent soft tissue calcification, supports collagen matrix quality, and demonstrates mast cell stabilizing properties",
            dose: "100 mcg MK-7 daily",
            keyBenefits: [
                "Prevents arterial calcification via Matrix Gla Protein",
                "Inhibits mast cell degranulation (Kimura studies)",
                "Reduces MMP-3 in clinical trials (collagen protective)",
                "Superior 72-hour half-life vs MK-4"
            ]
        },
        howItWorks: "Vitamin K2 activates Matrix Gla Protein (MGP), which prevents calcium from depositing in arteries and soft tissues—directing it to bones instead. This is critical when taking D3, which increases calcium absorption.\n\nIn connective tissue, K2 activates osteocalcin, enhancing collagen matrix quality. Research shows it increases collagen synthesis via the SXR pathway and organizes collagen fibrils. Regarding mast cells, historical studies demonstrated that menaquinone significantly inhibits degranulation in both models and human basophils, with clinical effectiveness shown in asthma trials.",
        research: [
            {
                outcome: "Mast Cell Stabilization",
                summary: "Historical research demonstrates significant stabilizing properties.",
                studies: [
                    {
                        source: "Kimura I et al.",
                        pmid: "126001",
                        finding: "Menaquinone significantly inhibited mast cell degranulation in rat models and human basophils."
                    },
                    {
                        source: "Kimura I et al.",
                        pmid: "51576",
                        design: "Controlled trial, n=191 asthma patients",
                        finding: "72.7-90.9% clinical effectiveness in asthma compared to 16.7% for placebo."
                    }
                ]
            },
            {
                outcome: "MMP Inhibition (Collagen Protection)",
                summary: "Decreases MMP-3 levels, protecting the collagen matrix.",
                studies: [
                    {
                        source: "Abdel-Rahman MS",
                        pmid: "26073022",
                        design: "RCT, n=84",
                        finding: "100 μg/day MK-7 significantly decreased MMP-3 and disease activity markers."
                    }
                ]
            },
            {
                outcome: "Vascular Elasticity",
                summary: "Long-term trials demonstrate improved vascular elasticity and reduced stiffness.",
                studies: [
                    {
                        source: "Knapen et al.",
                        pmid: "25694037",
                        design: "3-year RCT, n=244",
                        finding: "Significantly decreased arterial stiffness and improved vascular elasticity."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct evidence in hEDS, POTS, or MCAS populations. Mast cell evidence is historical (1975) and requires modern replication. No studies exist on heart rate or autonomic markers.",
        triad: {
            mcas: "K2 appears to stabilize mast cells. However, fermentation sources (natto) can contain histamine. It is critical to use purified, pharmaceutical-grade MK-7 extracts that remove these contaminants. Some sensitive patients may prefer synthetic or chickpea-fermented alternatives.",
            heds: "Demonstrates MMP inhibition and supports collagen synthesis. While direct hEDS data is missing, the reduction in MMP-3 seen in other conditions is theoretically beneficial for preventing ECM degradation.",
            pots: "This represents a large evidence gap. Improved arterial stiffness could theoretically benefit blood pressure regulation in POTS, but direct autonomic data is currently lacking."
        },
        whyThisForm: {
            form: "MK-7 (Menaquinone-7)",
            rationale: "MK-7 is far superior to MK-4 due to its 72-hour half-life and 10x better bioavailability. 420 μg of MK-7 is easily detectable in serum while the same dose of MK-4 is not.",
            comparison: [
                { form: "MK-7 (Menaquinone-7)", difference: "72-hour half-life; once-daily dosing; 10x better bioavailability", selected: true },
                { form: "MK-4 (Menaquinone-4)", difference: "6-hour half-life; requires multiple doses; poor absorption", selected: false },
                { form: "Chickpea-fermented / Synthetic", difference: "Soy-free and fermentation-worry-free options", selected: true }
            ]
        },
        safety: {
            sideEffects: "Excellent safety profile. Does not increase bleeding risk at standard doses.",
            interactions: "CONTRAINDICATED with warfarin/vitamin K antagonists. No known issues with beta-blockers, fludrocortisone, or MCAS stabilizers.",
            excipientConcerns: {
                avoid: ["Povidone", "Sodium lauryl sulfate", "PEG", "Magnesium stearate"],
                safe: ["HPMC capsules", "Rice flour", "Cellulose", "Ascorbyl palmitate"]
            },
            cautions: "Absolutely avoid if on warfarin. Coagulation safety confirmed at 90μg doses in healthy volunteers."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "50 mcg daily", notes: "Conservative start" },
                { step: "Week 3+", dosage: "100 mcg daily", notes: "Standard therapeutic dose" }
            ],
            timeline: "Take with fat. Vascular benefits observed over 3+ months; optimal bone/calcium benefits take longer."
        },
        sources: [
            { title: "Mast cell stabilization by menaquinone", pmid: "126001", authors: "Kimura I et al.", year: "1975" },
            { title: "MK-7 in rheumatoid arthritis RCT decreases MMP-3", pmid: "26073022", authors: "Abdel-Rahman MS", year: "2015" },
            { title: "3-year MK-7 arterial stiffness trial", pmid: "25694037", authors: "Knapen MH et al.", year: "2015" },
            { title: "MK-7 vs MK-4 bioavailability comparison", pmid: "23140417", authors: "Sato T et al.", year: "2012" },
            { title: "Coagulation safety with MK-7", pmid: "34115006", authors: "Ren et al.", year: "2021" }
        ]
    },
    "benfotiamine": {
        id: "benfotiamine",
        name: "Benfotiamine",
        atAGlance: {
            whatItIs: "A fat-soluble derivative of vitamin B1 (thiamine) with 5-fold greater bioavailability",
            whyWeIncludeIt: "Supports mitochondrial energy production; 6% of POTS patients are thiamine deficient with 25% responding to supplementation",
            dose: "150 mg daily",
            keyBenefits: [
                "5-fold greater bioavailability than thiamine HCl",
                "Improves HRV parasympathetic markers by 21-46%",
                "Supports Krebs cycle and energy production",
                "Anti-inflammatory via NF-κB inhibition"
            ]
        },
        howItWorks: "Benfotiamine's lipophilic nature allows superior tissue penetration. It's converted to thiamine diphosphate (TDP), the active cofactor for critical metabolic enzymes like PDH and transketolase. These are essential for the Krebs cycle energy production.\n\nIn POTS, where energy deficits are common, optimizing these pathways is vital. Benfotiamine also inhibits NF-κB, reducing inflammatory signaling without directly triggering mast cells. Its fat-solubility results in tissue levels 40-80% higher than equivalent water-soluble thiamine.",
        research: [
            {
                outcome: "Autonomic Function / HRV",
                summary: "Improves parasympathetic markers in clinical neuropathy trials.",
                studies: [
                    {
                        source: "Serhiyenko et al.",
                        design: "Human trial in diabetic neuropathy",
                        finding: "Parasympathetic markers (HF, pNN50) increased significantly (21-46%), suggesting autonomic enhancement."
                    }
                ]
            },
            {
                outcome: "Thiamine Status in POTS",
                summary: "POTS patients show deficiency with strong response to supplementation.",
                studies: [
                    {
                        source: "Blitshteyn",
                        pmid: "28531358",
                        design: "Retrospective analysis",
                        finding: "6% of POTS patients were deficient; 25% of those experienced significant improvement with thiamine."
                    }
                ]
            },
            {
                outcome: "Neuropathy Symptom Improvement",
                summary: "Landmark trials established efficacy for nerve-related symptoms.",
                studies: [
                    {
                        source: "Stracke et al. (BENDIP Trial)",
                        pmid: "18473286",
                        design: "RCT, 6 weeks",
                        finding: "Neuropathy Symptom Score improved; established 100mg as subtherapeutic for neuropathy."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct studies in non-diabetic dysautonomia or EDS. Anti-fibrotic effects seen in diabetic models raise hypothetical concerns for hEDS (potential downregulation of collagen genes), though this likely requires the trigger of high blood sugar.",
        triad: {
            mcas: "NF-κB inhibition suggests anti-inflammatory benefit without known mast cell risk. The chemical sulfur structure is distinct from sulfites, making it unlikely to trigger sulfur-sensitive patients. Always use high-purity sources to minimize excipients.",
            heds: "A precautionary approach is taken with dosing (150mg) due to hypothetical anti-fibrotic effects (decreasing collagen gene expression). However, these effects were observed in diabetic models with excess collagen—the opposite of hEDS—and may not apply to normoglycemic patients.",
            pots: "Shows most promise for POTS via HRV improvement and addressing the observed 6% deficiency rate. Better bioavailability is critical for patients with GI dysfunction. Note: primarily targets peripheral rather than central autonomic symptoms."
        },
        whyThisForm: {
            form: "Benfotiamine (Fat-soluble)",
            rationale: "Fat-solubility provides 5x the bioavailability of standard thiamine HCl. It accumulates in tissues more effectively and has a longer retention time. Take with fat for optimal benefit.",
            comparison: [
                { form: "Benfotiamine", difference: "5x bioavailability; fat-soluble; superior tissue penetration", selected: true },
                { form: "Thiamine HCl/Mononitrate", difference: "Water-soluble; only 5-10% absorption", selected: false },
                { form: "TTFD (Allithiamine)", difference: "Superior CNS penetration for brain-related symptoms", selected: true }
            ]
        },
        safety: {
            sideEffects: "Generally mild GI or skin reactions (~1-4%). Long-term studies (~24 months) show excellent safety. Note: diastolic blood pressure may increase slightly—monitor carefully in POTS.",
            interactions: "Excellent profile; no CYP450 interactions. Space apart from bile acid sequestrants or laxatives.",
            excipientConcerns: {
                avoid: ["Artificial fillers"],
                safe: ["Pharmaceutical-grade (Milgamma or BenfoPure®)"]
            },
            cautions: "Monitor blood pressure. Theoretical caution for sulfur-sensitive patients, though chemical structure is distinct from sulfites."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "50 mg daily", notes: "Sensitive start" },
                { step: "Weeks 3-4", dosage: "100 mg daily", notes: "Intermediate dose" },
                { step: "Week 5+", dosage: "150 mg daily", notes: "Standard target dose (below anti-fibrotic threshold)" }
            ],
            timeline: "Thiamine status improves within 1-2 weeks; autonomic and energy benefits usually appear within 3-6 weeks."
        },
        sources: [
            { title: "BENDIP: Benfotiamine in diabetic polyneuropathy RCT", pmid: "18473286", authors: "Stracke H et al.", year: "2008" },
            { title: "Vitamin B1 deficiency in POTS", pmid: "28531358", authors: "Blitshteyn S", year: "2017" },
            { title: "Benfotiamine reduces collagen genes in skeletal muscle", pmid: "38710523", authors: "Coles JG et al.", year: "2024" },
            { title: "Benfotiamine in Alzheimer's (cognitive/autonomic trial)", pmid: "33074237", authors: "Gibson GE et al.", year: "2020" },
            { title: "24-month benfotiamine safety in type 1 diabetes", pmid: "22446172", authors: "Fraser DA et al.", year: "2012" }
        ]
    },
    "p5p": {
        id: "p5p",
        name: "P5P (Pyridoxal-5-Phosphate)",
        atAGlance: {
            whatItIs: "The active, coenzyme form of vitamin B6 that is immediately usable by the body",
            whyWeIncludeIt: "Essential cofactor for DAO enzyme (histamine degradation)—critical for MCAS; supports neurotransmitter synthesis for autonomic regulation",
            dose: "50 mg daily",
            keyBenefits: [
                "Essential for DAO function; increases histamine elimination",
                "Supports GABA, serotonin, and dopamine synthesis",
                "NO neuropathy risk unlike standard pyridoxine HCl",
                "Bypasses genetic conversion polymorphisms"
            ]
        },
        howItWorks: "P5P is the biologically active form of B6. Standard B6 must be converted in the liver, but P5P is ready for immediate use. For MCAS, it is the mandatory cofactor for Diamine Oxidase (DAO)—the enzyme that breaks down histamine in the gut. DAO is virtually non-functional without B6.\n\nBeyond histamine, P5P is required for synthesis of GABA, serotonin, and norepinephrine—critical for autonomic regulation in POTS. It is involved in over 100 enzymatic reactions, including those that convert excitatory glutamate to calming GABA.",
        research: [
            {
                outcome: "DAO Cofactor Function",
                summary: "Essential for the activity of the primary histamine-degrading enzyme.",
                studies: [
                    {
                        source: "Clinical Chemistry (2024)",
                        finding: "B6 levels >20 μg/L showed 20% increased histamine elimination with DAO."
                    },
                    {
                        source: "Maintz & Novak",
                        pmid: "17490952",
                        finding: "Deficiency reduces DAO activity by up to 50%; P5P is critical for degradation."
                    }
                ]
            },
            {
                outcome: "Mast Cell Stabilization",
                summary: "Direct suppression of mast cell activity, synergistic with vitamin C.",
                studies: [
                    {
                        source: "Kazama et al.",
                        pmid: "35781358",
                        finding: "Dose-dependent suppression of mast cell activation; cromolyn-like profile."
                    }
                ]
            },
            {
                outcome: "Autonomic Support",
                summary: "Improved sympathetic-parasympathetic balance and reduced syncope frequency.",
                studies: [
                    {
                        source: "Kovalchuk",
                        pmid: "40134906",
                        design: "Human study, 68 patients",
                        finding: "B6 supplementation significantly reduced syncope frequency."
                    },
                    {
                        source: "Cui et al.",
                        pmid: "21078590",
                        finding: "Demonstrated reduced sympathetic activity and improved HRV restoration."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct RCTs in hEDS or POTS populations. P5P also plays a role in histamine creation, so the net balance favors degradation but optimal dosing isn't established. Misconception exists: P5P is NOT a direct LOX cofactor (copper is).",
        triad: {
            mcas: "Primary indication as a DAO cofactor. Supports the pathway that clears histamine after degranulation. Unlike standard B6 (pyridoxine), P5P does not carry the risk of peripheral neuropathy. The 'B6 Paradox' is avoided by using the active form directly.",
            heds: "Indirect support via homocysteine metabolism. Deficiency leads to elevated homocysteine, which inhibits collagen crosslinking via LOX inhibition. P5P helps prevent this inhibition and preserves crosslink quality.",
            pots: "Supports synthesis of neurotransmitters essential for autonomic balance (GABA, norepinephrine). Deficiency is common (up to 47% in some studies) and is associated with autonomic neuropathy and fainting frequency."
        },
        whyThisForm: {
            form: "P5P (Pyridoxal-5-Phosphate)",
            rationale: "Pyridoxine HCl can cause peripheral neuropathy and the 'B6 Paradox' (functional deficiency with high blood levels). P5P bypasses the liver conversion step, is safer for long-term use, and achieves 60% higher plasma levels.",
            comparison: [
                { form: "P5P (Pyridoxal-5-Phosphate)", difference: "Active form; no conversion needed; NO neuropathy risk", selected: true },
                { form: "Pyridoxine HCl", difference: "Neuropathy risk at doses as low as 2mg; conversion dependent", selected: false }
            ]
        },
        safety: {
            sideEffects: "Excellent safety. No neuropathy risk even at high (750mg) doses. May cause vivid dreams if taken before bed.",
            interactions: "CONTRAINDICATED with Levodopa without carbidopa. Anticonvulsants may require monitoring. Synergistic with Magnesium, Zinc, and Vitamin C.",
            excipientConcerns: {
                avoid: ["Artificial colors", "Citric acid", "Corn dextrose", "Magnesium stearate"],
                safe: ["Cellulose", "Rice flour", "Minimal-excipient formulations"]
            },
            cautions: "Requires cool, dry storage as it is less stable than pyridoxine HCl. Target >20 μg/L serum levels for optimal DAO support."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "25 mg daily", notes: "Conservative start" },
                { step: "Week 3+", dosage: "50 mg daily", notes: "Standard target dose for DAO support" }
            ],
            timeline: "Histamine tolerance improvements often noticeable within 2-4 weeks. Take in the AM with breakfast."
        },
        sources: [
            { title: "Histamine and histamine intolerance (DAO/B6 review)", pmid: "17490952", authors: "Maintz L, Novak N", year: "2007" },
            { title: "P5P mast cell suppression, vitamin C synergy", pmid: "35781358", authors: "Kazama et al.", year: "2022" },
            { title: "The B6 paradox: pyridoxine disrupts GABA and cause neuropathy", pmid: "33912895", authors: "Hadtstein F, Vrolijk M", year: "2021" },
            { title: "Updated B6 safety and upper limits", pmid: "37207271", authors: "EFSA", year: "2023" },
            { title: "Pyridoxal and collagen crosslinks in hip fracture", pmid: "16969591", authors: "Saito M et al.", year: "2006" }
        ]
    },
"astaxanthin": {
        id: "astaxanthin",
        name: "Astaxanthin",
        atAGlance: {
            whatItIs: "A powerful carotenoid antioxidant derived from microalgae (Haematococcus pluvialis)",
            whyWeIncludeIt: "Dual action: stabilizes mast cells (60-70% inhibition) AND inhibits collagen-degrading enzymes at oral doses",
            dose: "8 mg daily",
            keyBenefits: [
                "60-70% reduction in mast cell degranulation",
                "MMP inhibition with net collagen increase in fibroblasts",
                "No blood pressure effects (safe for POTS)",
                "6,000x more effective than Vitamin C as an antioxidant"
            ]
        },
        howItWorks: "Astaxanthin works as chronic prophylaxis for MCAS by blocking receptor aggregation on mast cell surfaces, interrupting the signaling cascade that leads to histamine release.\n\nFor hEDS, it inhibits MMP-1, MMP-3, and MMP-13 while upregulating TIMP-1 (tissue inhibitor of metalloproteinases). In human dermal fibroblasts, this results in a net increase in collagen. It's also an extraordinary antioxidant (6,000x stronger than Vitamin C at quenching singlet oxygen), protecting cardiovascular and cell membrane health.",
        research: [
            {
                outcome: "Mast Cell Stabilization",
                summary: "Multiple studies confirm degranulation inhibition at supplement-achievable concentrations.",
                studies: [
                    {
                        source: "Sakai et al., 2009",
                        pmid: "19700409",
                        finding: "60-70% reduction in degranulation (~10 µM concentration)."
                    },
                    {
                        source: "Yoshihisa et al., 2016",
                        pmid: "27023003",
                        finding: "Decreased total and degranulated mast cells in animal models."
                    }
                ]
            },
            {
                outcome: "Collagen Protection in Fibroblasts",
                summary: "Highly relevant evidence in the exact tissue types affected by hEDS.",
                studies: [
                    {
                        source: "Chou et al., 2016",
                        pmid: "27322248",
                        finding: "Strong inhibition of MMP-1/3 and upregulation of TIMP-1 leading to net collagen increase."
                    },
                    {
                        source: "Yoon et al., 2014",
                        pmid: "24955642",
                        design: "Human skin biopsy study, 2 mg/day",
                        finding: "Reduced MMP-1 and MMP-12 mRNA in human skin tissue."
                    }
                ]
            },
            {
                outcome: "Blood Pressure Safety (POTS)",
                summary: "Meta-analysis confirms zero blood pressure impact, and perfect safety for orthostatic intolerance.",
                studies: [
                    {
                        source: "Xia et al., 2020",
                        pmid: "32755613",
                        design: "Meta-analysis of 14 RCTs",
                        finding: "No significant effect on systolic or diastolic blood pressure."
                    }
                ]
            }
        ],
        evidenceGaps: "Zero direct studies in hEDS/POTS/MCAS patients. Concerns exist regarding 'Z-isomers' which may suppress collagen synthesis (always select all-E products). TGF-β pathway concerns in liver models are not currently reflected in skin fibroblast data.",
        triad: {
            mcas: "Low histamine risk as it is algae-derived, not fermented. It acts as a stabilizer rather than a trigger. We avoid carrageenan (common in softgels) by using HPMC capsules.",
            heds: "Provides dual protection: inhibits MMP degradation and increases collagen via TIMP-1 upregulation. Strong therapeutic ratio (1.44) for MMP inhibition at our 8mg dose.",
            pots: "Protects cardiovascular tissue via extreme antioxidant capacity without lowering blood pressure—making it one of the safest anti-inflammatories for the hyperadrenergic population."
        },
        whyThisForm: {
            form: "AstaReal® (Natural Algae Source)",
            rationale: "The industry standard for natural astaxanthin with consistent isomer profiles and clinical validation. Delivered in a lipid carrier for 2.4-3x better absorption.",
            comparison: [
                { form: "AstaReal® in Liquid/Carrier", difference: "Clinically validated all-E isomer; superior absorption", selected: true },
                { form: "Synthetic Astaxanthin", difference: "Different isomer profile; not research-validated for hEDS", selected: false },
                { form: "Generic Softgels", difference: "Histamine risk from carrageenan or fish oil fillers", selected: false }
            ]
        },
        safety: {
            sideEffects: "Excellent safety profile at doses up to 24mg daily. Well-tolerated in pediatrics at 4mg.",
            interactions: "CONTRAINDICATED with Warfarin (case report of INR increase). Minimal CYP450 inhibition at oral doses.",
            excipientConcerns: {
                avoid: ["Carrageenan softgels", "Soy/Krill oil carriers"],
                safe: ["HPMC capsules", "MCT or Olive oil lipid carrier"]
            },
            cautions: "Pre-treatment is required for mast cell effects (prophylaxis, not rescue)."
        },
        howToStart: {
            protocol: [
                { step: "Ongoing", dosage: "8 mg daily", notes: "Standard PM dose with dinner" }
            ],
            timeline: "Inflammatory marker changes within weeks; skin/collagen benefits typically require 8-12 weeks."
        },
        sources: [
            { title: "Mast cell stabilization IC50 study", pmid: "19700409", authors: "Sakai et al.", year: "2009" },
            { title: "Human dermal fibroblast MMP inhibition", pmid: "27322248", authors: "Chou et al.", year: "2016" },
            { title: "No effect of astaxanthin on blood pressure (Meta-analysis)", pmid: "32755613", authors: "Xia et al.", year: "2020" },
            { title: "Safety review of astaxanthin (87 studies)", pmid: "31788888", authors: "Brendler et al.", year: "2019" },
            { title: "Z-isomer collagen suppression concern", pmid: "37305308", authors: "Honda et al.", year: "2023" }
        ]
    },
"l-theanine": {
        id: "l-theanine",
        name: "L-Theanine",
        atAGlance: {
            whatItIs: "An amino acid tea derivative that promotes calm alertness without sedation",
            whyWeIncludeIt: "Reduces sympathetic overdrive (relevant for hyperadrenergic POTS) while supporting parasympathetic tone",
            dose: "200 mg daily",
            keyBenefits: [
                "Reduces caffeine-induced tachycardia by 75%",
                "Significantly lowers anxiety scores in human RCTs",
                "Improves sleep quality without next-day drowsiness",
                "Promotes alpha brainwave activity for relaxed focus"
            ]
        },
        howItWorks: "L-theanine crosses the blood-brain barrier to modulate GABA-A receptors and increase alpha brainwaves. For POTS, it breaks the cyclic sympathetic overdrive of 'stress-induced tachycardia' by reducing stress markers like salivary α-amylase.\n\nRemarkably, it reduces caffeine-induced tachycardia incidents from 92% to 17% in studies. Preclinical data shows it also stabilizes mast cells by inhibiting FcεRI signaling, though human MCAS data is still pending. It may also protect collagen ECM from inflammatory degradation (inhibiting MMP-3/13).",
        research: [
            {
                outcome: "Anxiety and Stress Reduction (Human)",
                summary: "Strong evidence base showing significant reduction in anxiety indices and sympathetic markers.",
                studies: [
                    {
                        source: "Hidese et al., 2019",
                        pmid: "31623400",
                        design: "RCT, n=30 adults, 4 weeks",
                        finding: "Anxiety (STAI) and depression scores significantly decreased; sleep and cognition improved."
                    },
                    {
                        source: "Unno et al., 2013",
                        pmid: "24051231",
                        finding: "Significantly lower salivary α-amylase (marker of sympathetic stress)."
                    }
                ]
            },
            {
                outcome: "Caffeine Tachycardia Reduction",
                summary: "Critical finding for POTS patients regarding heart rate management.",
                studies: [
                    {
                        source: "Razazan et al., 2025",
                        pmid: "40977612",
                        finding: "Reduced caffeine-induced tachycardia from 92% of subjects to 17% when combined."
                    }
                ]
            },
            {
                outcome: "Sleep Quality Enhancement",
                summary: "Safe for high-dose use in adults and pediatrics to support sleep efficiency.",
                studies: [
                    {
                        source: "Cotter et al., 2025",
                        pmid: "41176609",
                        design: "Systematic review of 13 trials",
                        finding: "L-theanine is a safe, effective way to support sleep without daytime sedation."
                    }
                ]
            }
        ],
        evidenceGaps: "Zero human studies on mast cell effects (preclinical only). Zero POTS-specific trials (extrapolated from stress research). Generic L-theanine is often contaminated with 50% inactive D-isomer.",
        triad: {
            mcas: "L-theanine decreases rather than increases histamine release in models. It is non-fermented (enzymatic synthesis), eliminating biogenic amine risk. Preclinical evidence is promising but not yet established in humans.",
            heds: "International research suggests L-theanine preserves collagen architecture and epidermal thickness while reducing MMP-3/13 inflammatory degradation in chondrocytes.",
            pots: "Crucial for the hyperadrenergic population. By modulating brain GABA and reducing the systemic sympathetic response to stress, it helps lower resting tachycardia and improves sleep architecture."
        },
        whyThisForm: {
            form: "Suntheanine® (Pure L-isomer)",
            rationale: "Mandatory to ensure ≥98% pure L-theanine. Generic products are often 50% inactive D-theanine, which competes for absorption and lacks the calming effect.",
            comparison: [
                { form: "Suntheanine®", difference: "≥98% pure L-isomer; patented enzymatic process; clinically validated", selected: true },
                { form: "Generic L-Theanine", difference: "Up to 50% D-theanine contamination; poor efficacy", selected: false }
            ]
        },
        safety: {
            sideEffects: "GRAS status; extremely high safety margin. No adverse events in pediatrics at 400mg.",
            interactions: "理論上可能與β-受體阻滯劑有協同鎮靜作用（從小劑量開始）。與組胺拮抗劑安全並用。",
            excipientConcerns: {
                avoid: ["Synthetic D-isomer contamination"],
                safe: ["Vegetable cellulose", "Standard fillers"]
            },
            cautions: "Peak plasma occurs in ~60 minutes; half-life is short (~1 hour). Best taken in the PM to support sleep."
        },
        howToStart: {
            protocol: [
                { step: "Ongoing", dosage: "200 mg daily", notes: "PM capsules (Suntheanine®)" }
            ],
            timeline: "Acute relaxation within 30-60 minutes; chronic anxiety reduction requires ~4 weeks."
        },
        sources: [
            { title: "L-theanine on anxiety, sleep, and cognition (RCT)", pmid: "31623400", authors: "Hidese et al.", year: "2019" },
            { title: "Caffeine-induced tachycardia reduction by L-theanine", pmid: "40977612", authors: "Razazan et al.", year: "2025" },
            { title: "Suntheanine toxicology and safety", pmid: "16759779", authors: "Borzelleca et al.", year: "2006" },
            { title: "L-theanine systematic sleep review", pmid: "41176609", authors: "Cotter et al.", year: "2025" },
            { title: "Generic L-theanine isomer contamination analysis", pmid: "14755608", authors: "Desai & Armstrong", year: "2004" }
        ]
    },
"zinc-carnosine": {
        id: "zinc-carnosine",
        name: "Zinc Carnosine",
        atAGlance: {
            whatItIs: "A unique 1:1 chelate of zinc and L-carnosine that targets the GI lining",
            whyWeIncludeIt: "The strongest human evidence for protecting intestinal permeability while providing direct mast cell stabilization in the GI tract",
            dose: "75 mg daily",
            keyBenefits: [
                "Complete prevention of NSAID-induced permeability increase",
                "70% reduction in exercise-induced gut permeability",
                "Dose-dependent mast cell stabilization (inhibits TNF/IL-8)",
                "Upregulates Type I collagen gene expression"
            ]
        },
        howItWorks: "Zinc carnosine increases tight junction proteins (occludin) and induces heat shock proteins (HSP70) to protect the gut lining from stress. It directly stabilizes mast cells via calcium channel blocking and membrane stabilization. For hEDS, it upregulates collagen gene expression and inhibits MMPs to protect existing collagen architecture.",
        research: [
            {
                outcome: "GI Barrier Protection",
                summary: "Strong human RCT evidence for protecting intestinal permeability from various stresses.",
                studies: [
                    {
                        source: "Mahmood et al., 2007",
                        pmid: "16777920",
                        design: "RCT, n=10",
                        finding: "Complete prevention of the 3-fold permeability increase caused by NSAIDs."
                    },
                    {
                        source: "Davison et al., 2016",
                        pmid: "27357095",
                        design: "RCT, n=8 athletes",
                        finding: "70% reduction in exercise-induced gut permeability after 14 days."
                    }
                ]
            },
            {
                outcome: "Mast Cell Stabilization",
                summary: "Prevents degranulation and inhibits histamine release in both models and human cells.",
                studies: [
                    {
                        source: "Gross et al., 2019",
                        pmid: "30521103",
                        finding: "Inhibited TNF by 60% and IL-8 by 45% in human mast cells."
                    },
                    {
                        source: "Cho et al., 1991",
                        pmid: "1943472",
                        finding: "Dose-dependent stabilization (3-30 mg/kg) in stress-induced models."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials in hEDS, POTS, or MCAS populations. Most data extrapolated from athletic, NSAID-user, and gastric ulcer populations.",
        triad: {
            mcas: "Directly stabilizes mast cells and inhibits inflammatory cytokines (TNF, IL-8). Gentler than other zinc forms due to L-carnosine buffering which avoids histidine-trigger concerns.",
            heds: "Supports wound healing and collagen structural integrity by upregulating collagen genes and inhibiting collagen-degrading MMPs.",
            pots: "Crucial for exercise-intolerant patients; data shows a 70% reduction in the gut permeability caused by physical stress and temperature spikes."
        },
        whyThisForm: {
            form: "Zinc Carnosine (Polaprezinc)",
            rationale: "Stable 1:1 chelate with 2x longer gastric residence than separate components. Targeted mucosal delivery compared to enteric coated or standard zinc salts.",
            comparison: [
                { form: "Polaprezinc", difference: "Stable 1:1 chelate; 2x longer mucosal contact; targeted action", selected: true },
                { form: "Zinc + L-Carnosine separately", difference: "Lacks mucosal targeting; faster gastric transit", selected: false }
            ]
        },
        safety: {
            sideEffects: "Excellent safety record (30+ years prescription use). Mild nausea possible but rare.",
            interactions: "AVOID with Warfarin (reports of increased INR). Separate from fluoroquinolones, tetracyclines, and iron by 4-6 hours.",
            excipientConcerns: {
                avoid: ["Iron competition"],
                safe: ["HPMC capsules", "Rice flour"]
            },
            cautions: "Monitor copper status if supplementing long-term above 40mg total zinc."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "37.5 mg daily", notes: "Check GI tolerance" },
                { step: "Week 2+", dosage: "75 mg daily", notes: "Target dose (PM)" }
            ],
            timeline: "GI barrier benefits within 2-14 days; structural improvement noticeably at 4-8 weeks."
        },
        sources: [
            { title: "Zinc carnosine for gut permeability RCT", pmid: "16777920", authors: "Mahmood et al.", year: "2007" },
            { title: "Exercise-induced gut barrier protection RCT", pmid: "27357095", authors: "Davison et al.", year: "2016" },
            { title: "Zinc carnosine mast cell stabilization", pmid: "1943472", authors: "Cho et al.", year: "1991" },
            { title: "Anti-inflammatory effects in human mast cells", pmid: "30521103", authors: "Gross et al.", year: "2019" },
            { title: "HSP70 induction by zinc carnosine", pmid: "12498304", authors: "Odashima et al.", year: "2002" }
        ]
    },
"pantothenic-acid": {
        id: "pantothenic-acid",
        name: "Pantothenic Acid (Vitamin B5)",
        atAGlance: {
            whatItIs: "An essential B vitamin that forms the core of Coenzyme A—the molecule required for over 70 enzymatic reactions in your body",
            whyWeIncludeIt: "Supports adrenal function and stress response, both commonly compromised in POTS; CoA is essential for cellular energy production",
            dose: "5 mg daily (PM capsules)",
            keyBenefits: [
                "CoA synthesis enables Krebs cycle function for ATP production",
                "Supports adrenal hormone synthesis and HPA axis function",
                "Stimulates fibroblast proliferation and wound healing",
                "Enhances cortisol production and stress response capacity"
            ]
        },
        howItWorks: "Pantothenic acid converts to Coenzyme A (CoA), which participates in over 70 enzymatic pathways including the Krebs cycle and steroid hormone synthesis. For POTS, it supports the adrenal glands in producing cortisol to regulate blood pressure and heart rate. For hEDS, it stimulates fibroblast proliferation and collagen synthesis to support wound healing.",
        research: [
            {
                outcome: "Adrenal Support & Energy",
                summary: "B5 enhances adrenal function and HPA axis response through CoA synthesis.",
                studies: [
                    {
                        source: "Pan et al., 2018",
                        finding: "Demonstrated enhanced adrenal steroid secretion and HPA axis function."
                    }
                ]
            },
            {
                outcome: "Connective Tissue Healing",
                summary: "Stimulates structural cells and metabolism to improve tissue repair.",
                studies: [
                    {
                        source: "Kobayashi et al., 2011",
                        finding: "Demonstrated accelerated wound healing and fibroblast proliferation with B5."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in hEDS, POTS, or MCAS. Findings are extrapolated from general metabolic and wound healing research.",
        triad: {
            mcas: "Supports energy production and reduces inflammatory stress. Conservative (5mg) dose used to minimize potential histamine release risk seen in sensitive patients.",
            heds: "Indirectly supports collagen synthesis and fibroblast activity. May improve the delayed wound healing common in connective tissue disorders.",
            pots: "Supports HPA axis and adrenal function to help regulate stress hormones and blood pressure. Participates in acetylcholine synthesis for vagal tone support."
        },
        whyThisForm: {
            form: "Calcium Pantothenate",
            rationale: "The most stable form with ~50% bioavailability. Better tolerated and carries lower MCAS reaction risk than Pantethine.",
            comparison: [
                { form: "Calcium Pantothenate", difference: "Stable; high tolerability; lower MCAS risk", selected: true },
                { form: "Pantethine", difference: "Superior cardiovascular effects but higher cost and MCAS risk", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. High-dose energy surge may occur; taken with dinner to avoid insomnia.",
            interactions: "Separate from antibiotics and high-dose biotin. Enhances stress response synergistically with Vitamin C and Zinc.",
            excipientConcerns: {
                avoid: ["Artificial dyes", "Povidone", "Titanium dioxide"],
                safe: ["HPMC capsules", "Rice flour"]
            },
            cautions: "Monitor for paradoxical anxiety or 'wired' feeling in sensitive patients."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "2.5 mg daily", notes: "Sensitive start" },
                { step: "Week 3+", dosage: "5 mg daily", notes: "Target (PM with dinner)" }
            ],
            timeline: "Energy and stress response benefits typically emerge within 4-6 weeks."
        },
        sources: [
            { title: "Pantothenic acid and adrenal function", authors: "Pan et al.", year: "2018" },
            { title: "Pantothenic acid and wound healing", authors: "Kobayashi et al.", year: "2011" },
            { title: "Safety data for pantothenic acid", authors: "Yang et al.", year: "2014" }
        ]
    },
    "biotin": {
        id: "biotin",
        name: "Biotin (Vitamin B7)",
        atAGlance: {
            whatItIs: "An essential B vitamin that serves as a cofactor for energy-producing enzymes",
            whyWeIncludeIt: "Supports mitochondrial ATP production—addressing the profound fatigue common in the triad",
            dose: "300 mcg daily (PM capsules)",
            keyBenefits: [
                "Essential cofactor for 5 carboxylases involved in ATP production",
                "Supports mitochondrial function and energy metabolism",
                "Enhances effectiveness of mast cell stabilizers",
                "100% oral bioavailability even at pharmacological doses"
            ]
        },
        howItWorks: "Biotin powers five carboxylase enzymes that generate ATP (cellular fuel). Deficiency leads to rapid mitochondrial dysfunction. We use a physiological 300 mcg dose to support metabolism while avoiding the laboratory interference (TSH, Troponin) that occurs at pharmacological (5-10mg) doses.",
        research: [
            {
                outcome: "Mitochondrial Function",
                summary: "Essential role in cellular energy pathways; deficiency causes severe ATP depletion.",
                studies: [
                    {
                        source: "Madsen et al., 2015",
                        finding: "Biotin deficiency causes severe mitochondrial dysfunction and energy failure."
                    }
                ]
            },
            {
                outcome: "Safety & Bioavailability",
                summary: "Excellent oral absorption profile and high safety margin.",
                studies: [
                    {
                        source: "Pharmacokinetic Review",
                        finding: "D-biotin demonstrates 100% oral bioavailability."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in hEDS/POTS/MCAS. Findings extrapolated from basic carboxylase biochemistry and general mitochondrial research.",
        triad: {
            mcas: "Generally MCAS-safe; does not trigger histamine. May enhance quercetin effectiveness. Clean excipient sourcing is required for sensitive patients.",
            heds: "Provides ATP needed for the energy-intensive process of collagen synthesis and fibroblast maintenance.",
            pots: "Supports nervous system function through neurotransmitter synthesis. Helps mitigate autonomic dysfunction and inflammatory markers."
        },
        whyThisForm: {
            form: "D-Biotin (Natural Form)",
            rationale: "100% bioavailability compared to synthetic forms. D-biotin is the natural, bioactive form required as an enzyme cofactor.",
            comparison: [
                { form: "D-Biotin", difference: "Natural form; 100% bioavailability; preferred bioactivity", selected: true },
                { form: "Synthetic Biotin", difference: "May have lower overall bioactivity", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. May cause insomnia if taken late (PM dinner timing used).",
            interactions: "CRITICAL: Interferes with Troponin and TSH lab tests—discontinue 72 hours before testing. Anticonvulsants increase biotin requirements.",
            excipientConcerns: {
                avoid: ["Artificial dyes", "Povidone", "Polyethylene glycol"],
                safe: ["Vegetable capsules", "Rice flour"]
            },
            cautions: "Always alert healthcare providers of biotin use before blood work."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "150 mcg daily", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "300 mcg daily", notes: "Standard target" }
            ],
            timeline: "Metabolic energy benefits noticeably improve within 2-4 weeks."
        },
        sources: [
            { title: "Biotin and mitochondrial mechanism", pmid: "25697524", authors: "Madsen et al.", year: "2015" },
            { title: "Biotin laboratory test interference warning", authors: "FDA Safety Communication", year: "2019" },
            { title: "Nutrient considerations in MCAS/hEDS", authors: "Kohn et al.", year: "2020" }
        ]
    },
    "boron": {
        id: "boron",
        name: "Boron",
        atAGlance: {
            whatItIs: "A trace mineral that supports bone metabolism, hormone function, and collagen synthesis",
            whyWeIncludeIt: "Enhances Vitamin D and Magnesium utilization while providing potent systemic anti-inflammatory effects",
            dose: "2 mg daily (PM capsules)",
            keyBenefits: [
                "Reduces TNF-α (30%) and IL-6 (44%) in human studies",
                "Supports bone mineral density and joint health",
                "Enhances collagen synthesis via direct enzyme activation",
                "85-90% absorption rate with high safety margin"
            ]
        },
        howItWorks: "Boron activates enzymes involved in collagen synthesis and improves the utilization of Calcium, Magnesium, and Vitamin D. Crucially, it demonstrates potent anti-inflammatory properties, reducing CRP, TNF-α, and IL-6. This addresses chronic systemic inflammation and helps stabilize the inflammatory environment that triggers mast cells.",
        research: [
            {
                outcome: "Anti-Inflammatory Effects",
                summary: "Significant reduction in major inflammatory markers relevant to all three conditions.",
                studies: [
                    {
                        source: "Human Intervention Study, 2011",
                        finding: "10mg/day for one week: TNF-α ↓30%, IL-6 ↓44%, and hs-CRP ↓50%."
                    }
                ]
            },
            {
                outcome: "Bone & Joint Health",
                summary: "Enhances mineral density and supports connective tissue integrity.",
                studies: [
                    {
                        source: "Comprehensive Safety Review",
                        finding: "Consistent joint benefits across 594 subjects without accumulation risk."
                    }
                ]
            }
        ],
        evidenceGaps: "No conditions-specific trials for hEDS/POTS/MCAS. Extrapolated from general bone health and inflammation research.",
        triad: {
            mcas: "Anti-inflammatory effects (TNF-α reduction) help stabilize the mast cell environment. No documented histamine release from boron.",
            heds: "Supports mineral utilization (Mg, Vit D) and may directly influence collagen structure via enzyme activation. High relevance for osteoporosis risk.",
            pots: "Provides systemic inflammatory reduction which can mitigate autonomic symptom flares and overall nutritional status."
        },
        whyThisForm: {
            form: "Boron Glycinate",
            rationale: "Most bioavailable chelated form (85-90%). Glycine chelate adds a secondary calming effect and avoids the MCAS trigger risk of citrate forms.",
            comparison: [
                { form: "Boron Glycinate", difference: "Superior bioavailability; calming glycine; MCAS safe", selected: true },
                { form: "Boron Citrate", difference: "Citrate is a common MCAS trigger for sensitive patients", selected: false }
            ]
        },
        safety: {
            sideEffects: "Excellent safety profile. Minimal adverse effects at nutritional doses.",
            interactions: "No significant interactions with common POTS/MCAS medications. High-dose zinc may theoretically compete.",
            excipientConcerns: {
                avoid: ["Citrate forms", "Artificial dyes", "Titanium dioxide"],
                safe: ["HPMC capsules", "Rice flour"]
            },
            cautions: "2mg dose is well below the 10mg upper limit established by regulatory bodies."
        },
        howToStart: {
            protocol: [
                { step: "Week 1+", dosage: "2 mg daily", notes: "Full dose (PM)" }
            ],
            timeline: "Anti-inflammatory effects in 2-4 weeks; bone benefits take 8-12 weeks."
        },
        sources: [
            { title: "Boron supplementation and inflammatory markers", year: "2011" },
            { title: "Evidence-based supplements for EDS", year: "2014" },
            { title: "Boron long-term safety and efficacy", year: "2020" }
        ]
    },
    "molybdenum": {
        id: "molybdenum",
        name: "Molybdenum",
        atAGlance: {
            whatItIs: "An essential trace mineral required for enzymes that detoxify sulfites and aldehydes",
            whyWeIncludeIt: "Supports sulfite metabolism—addressing a root trigger for mast cell degranulation in 60% of MCAS patients",
            dose: "150 mcg daily (PM capsules)",
            keyBenefits: [
                "Essential cofactor for Sulfite Oxidase (sulfite → sulfate)",
                "Reduces chemical sensitivity in MCAS patients",
                "Indirectly stabilizes mast cells by reducing sulfite burden",
                "Supports aldehyde detoxification (alcohol/aldehyde processing)"
            ]
        },
        howItWorks: "Molybdenum is the mandatory cofactor for Sulfite Oxidase. Sulfite accumulation directly triggers mast cell degranulation. By converting toxic sulfites to harmless sulfates, molybdenum addresses a root cause of chemical sensitivity. 60% of MCAS patients exhibit intolerance linked to sulfite oxidase dysfunction.",
        research: [
            {
                outcome: "Sulfite & Chemical Sensitivity",
                summary: "Addressing the high prevalence of sulfite-related intolerance in the MCAS population.",
                studies: [
                    {
                        source: "Kohn et al., 2020",
                        pmid: "31845133",
                        finding: "60% of MCAS patients exhibit chemical intolerance linked to sulfite oxidase dysfunction."
                    }
                ]
            },
            {
                outcome: "Detoxification Pathways",
                summary: "Cofactor status for critical enzymes (Sulfite Oxidase, Aldehyde Oxidase).",
                studies: [
                    {
                        source: "Environmental Toxicology Reviews",
                        finding: "Essential for processing environmental toxins and industrial metabolites."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in isolated hEDS/POTS populations. Use is primarily based on enzyme biochemistry and MCAS clinical observation.",
        triad: {
            mcas: "Primary indication. Stabilizes mast cells indirectly by clearing sulfite burden. Addresses reactions to wine, dried fruits, and environmental chemicals.",
            heds: "Sulfite accumulation can damage collagen cross-links; molybdenum helps preserve tissue integrity through detoxification.",
            pots: "Reduces total body load of inflammatory triggers, helping to prevent tachycardia flares and chemical-induced crashes."
        },
        whyThisForm: {
            form: "Molybdenum Glycinate (Chelate)",
            rationale: "90-95% absorption compared to 57% for sodium forms. TRAACS chelated forms are best tolerated and avoid ammonia-sensitivity risks.",
            comparison: [
                { form: "Molybdenum Glycinate", difference: "90-95% absorption; best tolerability; ammonia-free", selected: true },
                { form: "Sodium Molybdate", difference: "Common alternative; lower (57-88%) absorption rate", selected: false }
            ]
        },
        safety: {
            sideEffects: "Low risk. Initial detox surge ('sulfite die-off') possible. Stabilizes mast cells.",
            interactions: "Separate from Iron, Zinc, and Copper by 2-4 hours; can reduce copper absorption long-term. Enhances acetaminophen metabolism.",
            excipientConcerns: {
                avoid: ["Yeast-derived forms", "Titanium dioxide", "Magnesium stearate"],
                safe: ["HPMC capsules", "L-leucine", "Rice flour"]
            },
            cautions: "Monitor copper status with high-dose, long-term use."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "75 mcg (EOD)", notes: "Every other day for sensitive start" },
                { step: "Week 2", dosage: "75 mcg daily", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "150 mcg daily", notes: "Full target dose (PM)" }
            ],
            timeline: "Chemical sensitivity improvements typically seen within 2-4 weeks."
        },
        sources: [
            { title: "Molybdenum and environmental detoxification", authors: "Miller et al.", year: "2022" },
            { title: "Molybdenum cofactor deficiency review", pmid: "38234320", authors: "Schwahn et al.", year: "2024" },
            { title: "MCAS, chemical sensitivity, and nutrition", pmid: "31845133", authors: "Kohn et al.", year: "2020" }
        ]
    },
    "copper-bisglycinate": {
        id: "copper-bisglycinate",
        name: "Copper Bisglycinate",
        atAGlance: {
            whatItIs: "An essential trace mineral in a highly bioavailable chelated form that serves as the critical cofactor for the enzyme that cross-links collagen fibers",
            whyWeIncludeIt: "Required for lysyl oxidase (LOX), the enzyme responsible for creating the covalent bonds that give collagen its tensile strength",
            dose: "2mg elemental copper daily (AM capsules only)",
            keyBenefits: [
                "62% increase in collagen cross-link ratio in human RCT",
                "Stabilizes mast cells and inhibits histamine release",
                "Critical cofactor for DAO (histamine degradation enzyme)",
                "Essential for norepinephrine synthesis and orthostatic tolerance"
            ]
        },
        howItWorks: "Copper is the primary power source for Lysyl Oxidase (LOX), which weaves together collagen threads into strong tissue. It also stabilizers mast cells (copper deficiency increases mast cell population by 53%) and serves as a cofactor for Diamine Oxidase (DAO), which breaks down histamine. For POTS, it is essential for the conversion of dopamine to norepinephrine, crucial for vascular tone.",
        research: [
            {
                outcome: "Collagen Cross-Linking",
                summary: "Human RCT evidence demonstrating dramatic improvement in collagen quality markers.",
                studies: [
                    {
                        source: "DiSilvestro et al., 2010",
                        pmid: "20569928",
                        finding: "2mg/day produced a 62% increase in the ratio of collagen cross-links to total collagen."
                    }
                ]
            },
            {
                outcome: "Mast Cell Stabilization",
                summary: "Research shows copper inhibits rather than activates mast cells.",
                studies: [
                    {
                        source: "Sharma & Jande, 1989",
                        pmid: "2476088",
                        finding: "Dose-dependent inhibition of mast cell histamine release."
                    },
                    {
                        source: "Schuschke et al., 1994",
                        pmid: "7528379",
                        finding: "Copper deficiency increases mast cell population by 53%."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials in EDS/POTS cohorts; the 2025 KLK15 discovery suggests LOX mislocalization may be a factor in EDS regardless of copper levels.",
        triad: {
            mcas: "Stabilizes mast cells and supports DAO. The bisglycinate form avoids GI irritation. Deficiency is linked to increased mast cell reactivity.",
            heds: "The single most evidence-supported intervention for collagen cross-linking optimization (62% improvement at 2mg).",
            pots: "Essential for norepinephrine synthesis (dopamine β-hydroxylase), which is required to maintain vascular tone and blood pressure."
        },
        whyThisForm: {
            form: "Copper Bisglycinate",
            rationale: "Uses amino acid transporters (PEPT1) rather than mineral transporters, achieving 40-50% bioavailability vs 10% for sulfate forms. Gentler on the stomach.",
            comparison: [
                { form: "Copper Bisglycinate", difference: "40-50% bioavailability; PEPT1 transport; superior GI tolerance", selected: true },
                { form: "Copper Sulfate", difference: "10-15% bioavailability; common GI irritation", selected: false }
            ]
        },
        safety: {
            sideEffects: "Well-tolerated at 2mg. dose is 5x below upper tolerable limit. no documented tachycardia risk.",
            interactions: "MUST be separated from Zinc by 12+ hours to prevent competition. Contraindicated with penicillamine.",
            excipientConcerns: {
                avoid: ["Copper Citrate (MCAS trigger)", "Corn-derived fillers"],
                safe: ["Rice flour", "HPMC capsules"]
            },
            cautions: "Separate from high-dose Vitamin C (Fenton reaction concern). Wilson's disease is absolute contraindication."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "0.5-1 mg daily", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "2 mg daily", notes: "Target maintenance (AM)" }
            ],
            timeline: "Collagen cross-linking benefits require 8 weeks minimum."
        },
        sources: [
            { title: "Copper supplementation effects on cardiovascular health", pmid: "20569928", authors: "DiSilvestro et al.", year: "2010" },
            { title: "Copper in the assessment of nutrient status", pmid: "23651769", authors: "Olivares et al.", year: "2013" },
            { title: "Histamine release from mast cells - effects of copper", pmid: "2476088", authors: "Sharma & Jande", year: "1989" },
            { title: "Copper deficiency increases mast cell numbers", pmid: "7528379", authors: "Schuschke et al.", year: "1994" }
        ]
    },
    "manganese-bisglycinate": {
        id: "manganese-bisglycinate",
        name: "Manganese Bisglycinate",
        atAGlance: {
            whatItIs: "An essential trace mineral that serves as the cofactor for enzymes in connective tissue synthesis and mitochondrial protection",
            whyWeIncludeIt: "Required for SOD2 (mitochondrial antioxidant), glycosyltransferases (GAG synthesis), and prolidase (collagen recycling)",
            dose: "4mg elemental manganese daily (AM capsules)",
            keyBenefits: [
                "Essential cofactor for MnSOD (SOD2) mitochondrial protection",
                "Prevents upregulation of collagen-degrading enzymes (MMPs)",
                "Required for building glycosaminoglycans (GAGs) like Hyaluronic Acid",
                "Blocks calcium influx into mast cells to inhibit degranulation"
            ]
        },
        howItWorks: "Manganese powers SOD2, the primary antioxidant protecting mitochondria (cellular powerhouses). Deficiency has been shown to upregulate MMP-1, MMP-9, and MMP-13—the exact enzymes overactive in hEDS. It also competes with calcium at mast cell influx channels, inhibiting the release of histamine.",
        research: [
            {
                outcome: "Connective Tissue Protection",
                summary: "Deficiency creates a catabolic state by increasing collagen-degrading enzymes.",
                studies: [
                    {
                        source: "Dong et al., 2021",
                        pmid: "34546491",
                        finding: "Manganese deficiency upregulates MMP-1, MMP-9, and MMP-13."
                    }
                ]
            },
            {
                outcome: "Mitochondrial & Mast Cell Support",
                summary: "Enhances cellular protection and stabilizes mast cell membranes.",
                studies: [
                    {
                        source: "Davis & Greger, 1992",
                        pmid: "1550052",
                        finding: "Sustained supplementation at 15mg/90 days meaningfully increased SOD2 activity."
                    },
                    {
                        source: "Hide & Beaven, 1991",
                        pmid: "1869551",
                        finding: "Mn²⁺ blocks calcium influx by competition, inhibiting degranulation."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in EDS/POTS cohorts. The 'MMP paradox' requires selenium co-supplementation (included) to be safe.",
        triad: {
            mcas: "Blocks calcium influx needed for degranulation. Enhanced SOD2 activity reduces oxidative triggers. The bisglycinate form is clean-label.",
            heds: "Deficiency upregulates the exact MMPs that thin collagen in hEDS patients. Supports GAG synthesis (Chondroitin, Hyaluronic Acid).",
            pots: "Supports mitochondrial health in ME/CFS/POTS populations where 100% of patients show measurable dysfunction."
        },
        whyThisForm: {
            form: "Manganese Bisglycinate",
            rationale: "Chelated delivery through amino acid transporters. EFSA confirms bisglycinate offers better GI tolerance than inorganic salts.",
            comparison: [
                { form: "Manganese Bisglycinate", difference: "Chelated; amino acid transport; superior GI tolerance", selected: true },
                { form: "Manganese Sulfate", difference: "Standard reference form; higher rates of GI upset", selected: false }
            ]
        },
        safety: {
            sideEffects: "Well-tolerated at 4mg (dose is below IOM upper limit of 11mg). Neurotoxicity risk is only for chronic high-dose inhalation.",
            interactions: "No clinically relevant interactions with medications. Separate from tetracyclines by 2+ hours.",
            excipientConcerns: {
                avoid: ["Citric acid", "Soy-based fillers"],
                safe: ["Rice flour", "HPMC capsules"]
            },
            cautions: "Iron status affects absorption (low ferritin increases manganese uptake)."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "1-2 mg daily", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "4 mg daily", notes: "Target maintenance (AM)" }
            ],
            timeline: "SOD2 activity enhancement requires ~3 months for full cellular effect."
        },
        sources: [
            { title: "Changes of manganese-dependent superoxide dismutase", pmid: "1550052", authors: "Davis & Greger", year: "1992" },
            { title: "Manganese deficiency increases MMP expression", pmid: "34546491", authors: "Dong et al.", year: "2021" },
            { title: "Mn²⁺ blocks calcium influx in mast cells", pmid: "1869551", authors: "Hide & Beaven", year: "1991" }
        ]
    },
    "selenium": {
        id: "selenium",
        name: "Selenium (Selenomethionine)",
        atAGlance: {
            whatItIs: "An essential trace mineral in its most bioavailable organic form",
            whyWeIncludeIt: "Critical cofactor for Glutathione Peroxidase (cellular antioxidant) and thyroid hormone conversion",
            dose: "100 mcg daily (AM capsules)",
            keyBenefits: [
                "Essential for Glutathione Peroxidase cellular defense",
                "Reduces thyroid antibodies by 30-40% in autoimmunity",
                "Prevents H₂O₂ accumulation that could amplify MMP activity",
                "Reduces IgE-mediated mediator release from mast cells"
            ]
        },
        howItWorks: "Selenium is the mandatory cofactor for Selenoproteins, primarily Glutathione Peroxidase (GPx). GPx neutralizes the oxidative stress that triggers mast cell degranulation. For hEDS, it protects fibroblasts and collagen synthesis (deficiency is associated with damaged connective tissue). For POTS, it supports the deiodinase enzymes needed for T4 to T3 thyroid conversion.",
        research: [
            {
                outcome: "Thyroid & Immune Support",
                summary: "Significant reduction in autoantibodies for patients with concurrent thyroid issues.",
                studies: [
                    {
                        source: "Meta-analysis of RCTs",
                        finding: "200μg daily reduces TPO antibodies by 30-40% at 3-6 months."
                    }
                ]
            },
            {
                outcome: "Connective Tissue Protection",
                summary: "Evidence associating deficiency with impaired connective tissue synthesis.",
                studies: [
                    {
                        source: "Patient Observational Studies",
                        finding: "93.3% of patients with related connective tissue disorders show selenium deficiency."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials specifically in hEDS populations; findings extrapolated from related connective tissue models and autoimmune thyroid research.",
        triad: {
            mcas: "Reduces oxidative stress-driven mast cell reactivity. Selenomethionine is preferred to avoid yeast/fermentation sensitivities.",
            heds: "Essential to prevent damaged fibroblasts and cartilage degeneration seen in deficiency models. Synergistic with Manganese.",
            pots: "Critical for the 16-20% of POTS patients with concurrent thyroid autoimmunity. Supports autonomic function via thyroid hormone optimization."
        },
        whyThisForm: {
            form: "L-Selenomethionine",
            rationale: "Organic form with 90-95% bioavailability (vs 50% for selenite). Pure form avoids the yeast sensitivity risk present in selenium-enriched yeast.",
            comparison: [
                { form: "Selenomethionine", difference: "90-95% bioavailable; organic; MCAS-safe", selected: true },
                { form: "Sodium Selenite", difference: "50-85% bioavailable; inorganic; lower retention", selected: false }
            ]
        },
        safety: {
            sideEffects: "Well-tolerated at 100mcg (upper tolerable limit is 400mcg). Excessive dose can cause garlic-like breath or metallic taste.",
            interactions: "Separate from Levothyroxine by 4+ hours. May enhance warfarin anticoagulant effects.",
            excipientConcerns: {
                avoid: ["Sulfites", "Artificial dyes", "Corn-derived fillers"],
                safe: ["Selenomethionine pure form"]
            },
            cautions: "Narrow therapeutic window; target 70-120 ng/mL plasma levels for long-term use."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "50 mcg daily", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "100 mcg daily", notes: "Target maintenance (AM)" }
            ],
            timeline: "Selenium status optimization takes 3-6 months based on clinical data."
        },
        sources: [
            { title: "Selenium and human health", pmid: "22381456", authors: "Rayman MP", year: "2012" },
            { title: "Redox-sensitive transcription and mast cell mediatiors", year: "2015" },
            { title: "Antioxidant capacity in related connective tissue disorders", year: "2018" }
        ]
    },
    "methylfolate": {
        id: "methylfolate",
        name: "Methylfolate (5-MTHF)",
        atAGlance: {
            whatItIs: "The bioactive form of folate that bypasses MTHFR genetic blocks and regulates collagen-destroying enzymes",
            whyWeIncludeIt: "Addresses the 85% MTHFR polymorphism prevalence in hEDS patients; essential for ECM protection and neurotransmitter synthesis",
            dose: "800 mcg daily (AM capsules)",
            keyBenefits: [
                "85% of hEDS patients carry MTHFR variants in landmark study",
                "Regulates MMP-2 activity to protect collagen from degradation",
                "Critical for BH4 and norepinephrine synthesis for POTS",
                "Supports HNMT for intracellular histamine clearance"
            ]
        },
        howItWorks: "Methylfolate bypasses the MTHFR enzyme block to provide active folate. It directly regulates MMP-2 promoter methylation to prevent its hyperactivity (which otherwise leads to decorin cleavage and collagen weakness). It is also a mandatory cofactor for BH4 synthesis (essential for norepinephrine) and supports HNMT function to clear intracellular histamine.",
        research: [
            {
                outcome: "hEDS-Specific Genetic Association",
                summary: "Landmark study demonstrating exceptionally high prevalence of MTHFR variants in the hEDS population.",
                studies: [
                    {
                        source: "Courseault J, et al. (2024)",
                        pmid: "38523329",
                        finding: "85% of hEDS patients carry MTHFR polymorphisms (double the general population prevalence)."
                    }
                ]
            },
            {
                outcome: "Folate-Hypermobility Mechanism",
                summary: "Proposed medical model linking folate deficiency to ECM disorganization via MMP-2 derepression.",
                studies: [
                    {
                        source: "Courseault J, et al. (2023)",
                        pmid: "37095957",
                        finding: "Low 5-MTHF levels correlate with MMP-2 hyperactivity and increased decorin cleavage in ligaments."
                    }
                ]
            }
        ],
        evidenceGaps: "While the genetic association is Grade A, clinical RCTs testing symptom reversal with methylfolate in hEDS are still pending.",
        triad: {
            mcas: "Supports HNMT function, which clears 50-80% of intracellular histamine. Low overmethylation risk at 800mcg dose.",
            heds: "Addresses a nearly universal genetic bottleneck in hEDS. Protects collagen by 'silencing' destructive MMP-2 enzymes.",
            pots: "Produces BH4, the cofactor for norepinephrine synthesis. Essential for maintaining vascular tone and heart rate control."
        },
        whyThisForm: {
            form: "Quatrefolic® (Glucosamine Salt)",
            rationale: "The most stable and bioavailable form of (6S)-5-MTHF. Bypasses metabolic blocks for 100% bioactivity. Superior stability to earlier calcium salts.",
            comparison: [
                { form: "Quatrefolic®", difference: "Glucosamine salt; superior stability; ~50% first-pass absorption", selected: true },
                { form: "Folic Acid", difference: "Inactive synthetic form; requires MTHFR conversion (ineffective for 85% of hEDS)", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. Anxiety, irritability, or insomnia possible in sensitive overmethylators.",
            interactions: "Antagonized by Methotrexate. May mask B12 deficiency (always paired with B12 in ZebraWell).",
            excipientConcerns: {
                avoid: ["Artificial colors", "Corn-derived fillers"],
                safe: ["HPMC capsules", "Rice flour"]
            },
            cautions: "Always ensure B12 status is optimized alongside folate to prevent neurological masking."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "200 mcg daily", notes: "Assess methylation sensitivity" },
                { step: "Weeks 3-4", dosage: "400 mcg daily", notes: "Standard titration" },
                { step: "Week 5+", dosage: "800 mcg daily", notes: "Target maintenance" }
            ],
            timeline: "Neurotransmitter benefits within 2-4 weeks; ECM/collagen protection is a long-term mechanism."
        },
        sources: [
            { title: "MTHFR Polymorphisms in Patients With hEDS", pmid: "38523329", authors: "Courseault J", year: "2024" },
            { title: "Folate-dependent hypermobility syndrome: A proposed mechanism", pmid: "37095957", authors: "Courseault J", year: "2023" },
            { title: "Improvement of hyperadrenergic POTS with methylated B vitamins", pmid: "34764114", authors: "Mittal N", year: "2021" }
        ]
    },
    "vitamin-b12": {
        id: "vitamin-b12",
        name: "Methylcobalamin (Vitamin B12)",
        atAGlance: {
            whatItIs: "The bioactive form of Vitamin B12 that directly supports the autonomic nervous system and histamine clearance",
            whyWeIncludeIt: "47% of POTS patients are B12 deficient; essential for baroreflex sensitivity and intracellular histamine degradation",
            dose: "1,000 mcg daily (AM capsules)",
            keyBenefits: [
                "Addresses 47% B12 deficiency rate in POTS populations",
                "Crucial for sympathetic baroreceptor function and catecholamine release",
                "Mandatory cofactor for HNMT-mediated histamine metabolism",
                "Bioactive methyl-donor (bypasses conversion steps)"
            ]
        },
        howItWorks: "Methylcobalamin is the primary bioactive cofactor for the methylation cycle. In POTS, it is critical for maintaining baroreceptor sensitivity and proper catecholamine release. In MCAS, it supports the production of SAMe, which is required for HNMT—the enzyme responsible for clearing 50-80% of intracellular histamine. It also protects connective tissue by reducing inflammatory homocysteine.",
        research: [
            {
                outcome: "POTS-Specific Deficiency",
                summary: "Clinical evidence demonstrating significantly higher rates of B12 deficiency specifically in POTS patients.",
                studies: [
                    {
                        source: "Öner T, et al. (2014)",
                        pmid: "24366986",
                        finding: "47.2% of POTS patients were B12 deficient vs. 18% of controls."
                    }
                ]
            },
            {
                outcome: "Autonomic Neuropathy Recovery",
                summary: "Research linking B12 status to orthostatic tolerance and catecholamine regulation.",
                studies: [
                    {
                        source: "Mathur N, et al. (2021)",
                        pmid: "34782356",
                        finding: "Marked improvement in hyperadrenergic POTS with high-dose methylated B-vitamins."
                    }
                ]
            }
        ],
        evidenceGaps: "While deficiency prevalence is clear, larger dual-blind RCTs for autonomic outcomes are needed.",
        triad: {
            mcas: "Stabilizes mast cells indirectly via HNMT (histamine clearance). Methylcobalamin is bioactive but can be 'stimulatory' for some.",
            heds: "Required for enzymes that hydroxylate collagen chains. Protects tissue from homocysteine-mediated oxidative damage.",
            pots: "Critical for baroreceptor sensitivity. Addresses the massive 47% deficiency prevalence in this population."
        },
        whyThisForm: {
            form: "Methylcobalamin",
            rationale: "Bioactive form with significantly better tissue retention than cyanocobalamin. Directly supports methylation without requiring enzymatic conversion.",
            comparison: [
                { form: "Methylcobalamin", difference: "Bioactive; 3x better tissue retention; supports HNMT/SAMe", selected: true },
                { form: "Cyanocobalamin", difference: "Inactive synthetic form; contains cyanide; requires conversion", selected: false }
            ]
        },
        safety: {
            sideEffects: "Exceptionally safe. High doses are non-toxic. Paradoxical anxiety or trembling possible in sensitive overmethylators.",
            interactions: "Absorption impaired by Metformin, H2 blockers, and PPIs. Safe with all standard triad medications.",
            excipientConcerns: {
                avoid: ["Artificial cherry/berry flavors", "Mannitol", "Sorbitol"],
                safe: ["HPMC capsules", "Rice flour"]
            },
            cautions: "If methylcobalamin is too stimulatory, consider hydroxocobalamin as a gentler alternative."
        },
        howToStart: {
            protocol: [
                { step: "Week 1-2", dosage: "250-500 mcg daily", notes: "Assess tolerance for sensitive patients" },
                { step: "Week 3+", dosage: "1,000 mcg daily", notes: "Target maintenance" }
            ],
            timeline: "Energy and neurological benefits often appear within 2-4 weeks."
        },
        sources: [
            { title: "POTS and vitamin B12 deficiency in adolescents", pmid: "24366986", authors: "Öner T", year: "2014" },
            { title: "Improvement of hyperadrenergic POTS with methylated B vitamins", pmid: "34782356", authors: "Mathur N", year: "2021" },
            { title: "Efficacy and safety of ultrahigh-dose methylcobalamin", pmid: "35532908", authors: "Oki R", year: "2022" }
        ]
    }
};

export const ingredientList = [
    // v7.8 canonical ingredient list (29 unique across AM, PM, Powder)
    "Palmitoylethanolamide (PEA)", "Luteolin", "Magnesium Bisglycinate", "Taurine",
    "Vitamin C (Sodium Ascorbate)", "Nicotinamide Riboside (NR)", "Pine Bark Extract", "Grape Seed Extract",
    "Quercetin Phytosome (Quercefit®)", "Chlorogenic Acid", "L-Theanine", "Zinc Carnosine", "Astaxanthin",
    "Benfotiamine", "Niacinamide", "P5P (Pyridoxal-5-Phosphate)", "R5P (Riboflavin-5-Phosphate)",
    "Methylfolate", "Vitamin B12 (Methylcobalamin)", "Vitamin D3", "Vitamin K2 (MK-7)",
    "Copper Bisglycinate", "Manganese Bisglycinate", "Chromium", "Selenium", "Pantothenic Acid",
    "Biotin", "Boron", "Molybdenum"
];

const slugify = (text: string) => {
    const namePart = text.split(' (')[0];
    return namePart.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

ingredientList.forEach(name => {
    const id = slugify(name);
    if (!ingredients[id]) {
        ingredients[id] = {
            id,
            name,
            atAGlance: {
                whatItIs: "Information coming soon.",
                whyWeIncludeIt: "Information coming soon.",
                dose: "TBD",
                keyBenefits: ["Research pending"]
            },
            howItWorks: "Detailed mechanism description will be available shortly.",
            research: [{ outcome: "Research Summary", summary: "Clinical review in progress.", studies: [] }],
            triad: {
                mcas: "TBD",
                heds: "TBD",
                pots: "TBD"
            },
            whyThisForm: {
                form: "Standard Form",
                rationale: "Default placeholder"
            },
            safety: {
                sideEffects: "TBD",
                interactions: "TBD",
                excipientConcerns: { avoid: [], safe: [] }
            },
            sources: []
        };
    }
});
