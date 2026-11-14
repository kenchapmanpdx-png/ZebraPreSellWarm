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
    // 40-60 word BLUF answer capsule (master GEO doc §5). Renders as the
    // first thing on the page, above patientSummary. Validated against the
    // v7.8 RFQ formulation spec.
    bluf?: string;
    // Patient-language content layer (v7.8+). When present, IngredientDetail
    // renders these ABOVE the existing clinical content. All optional so
    // ingredients without drafted patient copy still render the clinical layer.
    patientSummary?: string;
    whyThisFormPatient?: string;
    faq?: { q: string; a: string }[];
    triadPlain?: {
        mcas: string;
        heds: string;
        pots: string;
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

// Claims audit 2026-11-10: some copy was removed outright where no supportable
// wording exists. This pass drops what that leaves empty (blank list items,
// study rows with no finding, protocol steps with no dose, blank FAQ answers)
// so pages, the .md companions and JSON-LD never render empty cards.
function sanitizeIngredients(all: Record<string, IngredientData>): void {
    const t = (s?: string) => (s ?? "").replace(/ {2,}/g, " ").trim();
    const opt = (s?: string) => t(s) || undefined;
    for (const ing of Object.values(all)) {
        ing.atAGlance.whatItIs = t(ing.atAGlance.whatItIs);
        ing.atAGlance.whyWeIncludeIt = t(ing.atAGlance.whyWeIncludeIt);
        ing.atAGlance.keyBenefits = ing.atAGlance.keyBenefits.map(t).filter(Boolean);
        ing.howItWorks = ing.howItWorks.split("\n\n").map(t).filter(Boolean).join("\n\n");
        ing.research = ing.research
            .map((r) => ({
                ...r,
                outcome: t(r.outcome),
                summary: t(r.summary),
                studies: r.studies
                    .map((st) => ({ ...st, source: t(st.source), design: opt(st.design), finding: t(st.finding) }))
                    .filter((st) => st.source && st.finding),
            }))
            .filter((r) => r.summary || r.studies.length)
            .map((r) => ({ ...r, outcome: r.outcome || "Research summary" }));
        ing.evidenceGaps = opt(ing.evidenceGaps);
        ing.triad = { mcas: t(ing.triad.mcas), heds: t(ing.triad.heds), pots: t(ing.triad.pots) };
        if (ing.triadPlain) {
            ing.triadPlain = { mcas: t(ing.triadPlain.mcas), heds: t(ing.triadPlain.heds), pots: t(ing.triadPlain.pots) };
        }
        ing.whyThisForm.form = t(ing.whyThisForm.form);
        ing.whyThisForm.rationale = t(ing.whyThisForm.rationale);
        if (ing.whyThisForm.comparison) {
            ing.whyThisForm.comparison = ing.whyThisForm.comparison
                .map((c) => ({ ...c, form: t(c.form), difference: t(c.difference) }))
                .filter((c) => c.form && (c.difference || c.selected));
        }
        ing.safety.sideEffects = t(ing.safety.sideEffects);
        ing.safety.interactions = t(ing.safety.interactions);
        ing.safety.excipientConcerns.avoid = ing.safety.excipientConcerns.avoid.map(t).filter(Boolean);
        ing.safety.excipientConcerns.safe = ing.safety.excipientConcerns.safe.map(t).filter(Boolean);
        ing.safety.cautions = opt(ing.safety.cautions);
        ing.bluf = opt(ing.bluf);
        ing.patientSummary = opt(ing.patientSummary);
        ing.whyThisFormPatient = opt(ing.whyThisFormPatient);
        if (ing.faq) ing.faq = ing.faq.map((f) => ({ q: t(f.q), a: t(f.a) })).filter((f) => f.q && f.a);
        if (ing.howToStart) {
            const protocol = ing.howToStart.protocol
                .map((st) => ({ step: t(st.step), dosage: t(st.dosage), notes: t(st.notes) }))
                .filter((st) => st.step && st.dosage);
            ing.howToStart = protocol.length ? { protocol, timeline: opt(ing.howToStart.timeline) } : undefined;
        }
    }
}

export const ingredients: Record<string, IngredientData> = {
    "palmitoylethanolamide": {
        id: "palmitoylethanolamide",
        name: "Palmitoylethanolamide (PEA)",
        patientSummary: "PEA is a fatty acid your body already makes, part of a natural system involved in calming inflammation. Some people feel their body's natural calming systems could use extra support during periods of high stress on the body. Supplemental PEA is intended to support your body's existing calming pathways. PEA has been studied for decades in chronic pain research. Its effects on mast cells come from lab studies. We use micronized PEA, verified by Certificate of Analysis for particle size.",
        whyThisFormPatient: "We use micronized PEA, particles verified at about 9 to 10 microns by Certificate of Analysis, at 99.84% purity, made through chemical synthesis. Standard PEA is waxy and does not dissolve well, which is why most products grind it into finer particles. Many PEA trials showing benefit used finely ground (micronized) PEA. We source generic micronized PEA that meets the particle size and purity spec on the Certificate of Analysis. What matters is the analytical verification, not the marketing brand on the bottle. Particle size matters for how PEA dissolves, so we check it on the Certificate of Analysis for every lot.",
        faq: [
            { q: "What does PEA actually do?", a: "PEA is thought to interact with the body's PPAR-alpha pathway, which is involved in regulating inflammation. PEA is a fat-based compound your body makes on its own. Researchers study it for its role in the body's normal response to everyday inflammation." },
            { q: "Why does PEA particle size matter?", a: "PEA is the same molecule at any particle size, but finer particles dissolve more easily, which is why particle size is part of our spec. Standard PEA is waxy and barely dissolves in the gut; micronized PEA is ground to a smaller particle size so your gut can absorb it more reliably." },
            { q: "How long until I notice anything?", a: "Human trials at our 1,200 mg daily dose ran from 6 weeks to 60 days, so give it a clean 60 days at full dose for the real picture." },
            { q: "Is PEA safe with my POTS and MCAS medications?", a: "No study has tested PEA with any POTS or MCAS medication, and no interactions have been reported with beta-blockers, ivabradine, fludrocortisone, antihistamines, or cromolyn. That means the question is unanswered, not settled. PEA is broken down by its own enzymes (FAAH and NAAA) rather than the liver enzymes behind most drug interactions, but it has never been tested for effects on those liver enzymes. In three placebo-controlled trials at our 1,200 mg daily dose, lasting 6 weeks to 60 days, side effects were no different from placebo. Run new supplements past your pharmacist or prescriber as always." }
        ],
        triadPlain: {
            mcas: "No randomized controlled trial has tested PEA in people with MCAS, and it is not a substitute for any prescribed treatment. PEA is made by chemical synthesis, not fermentation, which removes the usual source of histamine or tyramine in supplement ingredients.",
            heds: "No randomized controlled trial has tested PEA in people with hEDS, and it is not a substitute for any prescribed treatment. PEA has no known direct effect on collagen, and human relevance of its lab findings to collagen breakdown has not been shown.",
            pots: "PEA has not been studied in POTS, and it is not a substitute for any prescribed treatment."
        },
        bluf: "Palmitoylethanolamide (PEA) is a fat-based compound your body makes on its own. Lab studies link it to the body's normal inflammatory balance, mainly through a receptor called PPAR-alpha. In lab studies of animal mast cells, PEA reduced histamine release. Those studies used concentrations far higher than blood levels reached with supplements. ZebraThrive uses 1,200 mg daily of micronized PEA in the Daily Powder, split AM and PM.",
        atAGlance: {
            whatItIs: "A naturally occurring fatty acid compound your body makes that has been studied in lab research for its role in inflammation and mast cell activity",
            whyWeIncludeIt: "PEA is one of the more studied compounds for mast cell activity in lab research, with a favorable safety profile reported in chronic pain trials.",
            dose: "1,200 mg daily in the Daily Powder, split AM and PM scoops",
            keyBenefits: [
                "Lab studies in animal mast cells: reduced histamine release at concentrations far above blood levels from supplements (lab data)",
                "In a meta-analysis of 11 double-blind trials (774 people), no major side effects were attributed to PEA",
                "",
                ""
            ]
        },
        howItWorks: "Imagine your mast cells as tiny alarm systems throughout your body. PEA is a compound your body makes naturally, studied in lab research for its role in how mast cells respond to triggers.\n\nIn lab studies, PEA acts through PPAR-alpha and also raises 2-AG, another of the body's own signaling lipids. In lab studies, activating PPAR-alpha has been linked to lower inflammatory signaling and reduced mast cell degranulation, though this has been shown at concentrations much higher than what oral doses reach in human blood. In lab studies, PEA increased the activity of DAGL, an enzyme that makes 2-AG, one of the body's own signaling lipids. In lab studies, PEA raised 2-AG, which then engages CB2 receptors on mast cells as a secondary mechanism. This has been shown in cell studies, not confirmed at the concentrations reached by oral supplements. Direct CB2 activation by PEA itself has not been confirmed in receptor assays; the cannabinoid-system effects of PEA work indirectly through this 2-AG entourage.\n\n ",
        research: [
            {
                outcome: "Mast Cell Lab Studies",
                summary: "In lab studies, PEA reduced mast cell degranulation through more than one pathway.",
                studies: [
                    {
                        source: "Petrosino S et al., \"PEA counteracts substance P-induced mast cell activation\"",
                        pmid: "31878942",
                        design: "In vitro study using RBL-2H3 mast cells",
                        finding: "In a lab study in rat RBL-2H3 cells, PEA at 10 uM reduced substance P triggered histamine release through the DAGL/2-AG pathway, a concentration far above blood levels from supplements."
                    },
                    {
                        source: "Sarnelli G et al., \"Impaired Duodenal PEA Release Underlies...\"",
                        pmid: "33065341",
                        design: "Human duodenal biopsies from functional dyspepsia patients",
                        finding: "In an ex vivo lab study on duodenal tissue samples, PEA reduced acid induced mast cell activation and related inflammatory markers; this was tissue tested in the lab, not an outcome in people."
                    }
                ]
            },
            {
                outcome: "Human Tolerability Data (Meta-Analyses)",
                summary: "We cite these reviews of PEA trials in other populations (not hEDS, POTS or MCAS) only as human exposure and tolerability data for PEA, not as evidence of an effect on any condition.",
                studies: [
                    {
                        source: "Lang-Illievich K et al., 2023, systematic review and meta-analysis of PEA trials (full reference in our evidence list)",
                        pmid: "36986081",
                        design: "Meta-analysis of 11 RCTs, 774 patients",
                        finding: "A meta-analysis of 11 double-blind RCTs (774 patients) found no major side effects attributed to PEA."
                    },
                    {
                        source: "Schweiger V et al., \"Extended Treatment with Micron-Size Oral PEA\"",
                        pmid: "38892586",
                        design: "Meta-analysis examining treatment duration effects",
                        finding: "This review pooled studies of micronized PEA over a first and a second month of use; most of the included studies were not randomized controlled trials."
                    }
                ]
            }
        ],
        evidenceGaps: "No randomized controlled trials exist specifically in hEDS, POTS, or MCAS populations. All clinical evidence is extrapolated from related conditions including chronic pain, fibromyalgia, and functional dyspepsia. The mast cell evidence is mechanistic (cell and tissue studies), not clinical outcome data in MCAS.",
        triad: {
            mcas: "No randomized controlled trial has tested PEA in people with MCAS. For sensitive users: our PEA is made by chemical synthesis, not fermentation, which removes the usual source of histamine or tyramine in supplements.",
            heds: "No randomized controlled trial has tested PEA in people with hEDS. PEA has no known direct effect on collagen. Whether it affects TGF-beta, a signal involved in tissue repair, has not been measured.",
            pots: "PEA has not been studied in POTS. One theoretical caution: PEA may affect blood pressure, although trials have not shown a change versus placebo. If your blood pressure runs low, check it when you start."
        },
        whyThisForm: {
            form: "Generic micronized PEA (D90 under 10 micrometers likely met, synthetic, at least 99% purity, COA verified)",
            rationale: "Standard PEA powder has larger particles and is generally considered to have poorer absorption than micronized forms. The solution is particle size reduction. We use generic micronized PEA verified by Certificate of Analysis on every lot. Branded forms (Levagen+, LipiSperse) use different formulation technology; their published absorption advantage could not be verified (the cited source has no PubMed record and its DOI does not resolve), and our spec is generic-OK at the D90 under 10 μm + ≥99% purity tier.",
            comparison: [
                { form: "Standard PEA (not micronized)", difference: "Larger particles, generally considered to absorb less well than micronized forms", selected: false },
                { form: "Generic micronized PEA (D90 under 10 micrometers, COA verified)", difference: "Our form; particle size and purity checked on the Certificate of Analysis for every lot", selected: true },
                { form: "Levagen+ / LipiSperse (branded alternative)", difference: "Different formulation technology; its claimed 1.75x absorption advantage has no verifiable published source", selected: false }
            ]
        },
        safety: {
            sideEffects: "PEA was well tolerated in chronic pain trials, with no major side effects attributed to it. Trials at our daily amount have run up to 12 weeks without serious side effects; longer use has not been studied.",
            interactions: "No interaction studies with POTS or MCAS medications exist; no interactions have been reported. That includes beta-blockers, ivabradine, fludrocortisone, midodrine, hydroxyzine, cromolyn, ketotifen, and H1/H2 blockers. Absence of reports is not proof of no interaction, so tell your prescriber you take it.",
            excipientConcerns: {
                avoid: ["Artificial dyes", "Sodium benzoate", "PEG (polyethylene glycol)", "Titanium dioxide coatings"],
                safe: ["Our Daily Powder does not contain microcrystalline cellulose.", "Silica", "Rice hull concentrate"]
            },
            cautions: "A few sensitive people notice a short adjustment period when starting something new. Starting with a smaller amount and building up slowly can help. If you notice anything unusual when starting, slow down and talk to your clinician. PEA may affect blood pressure in theory, although trials have not shown a change versus placebo. If your blood pressure runs low, check it when you start. Avoid formulations containing common MCAS triggers."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "Start with a small sprinkle, building to half a scoop once a day (300 mg PEA). Each full scoop provides 600 mg PEA.", notes: "Notice how you feel as you build up." },
                { step: "Week 2", dosage: "Half a scoop twice a day (600 mg PEA a day).", notes: "If that feels fine, add a second serving later in the day." },
                { step: "Weeks 3-4", dosage: "Build up to one scoop twice a day as you are comfortable.", notes: "Approaching target dose" },
                { step: "Week 5+", dosage: "1,200 mg/day (maintenance, in the Daily Powder, split AM and PM scoops)", notes: "Full daily amount; give it at least 60 days." }
            ],
            timeline: ""
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
        patientSummary: "Luteolin is a plant compound found in celery, parsley, artichokes and chamomile, and it has been widely studied in the lab. In lab studies of cultured human mast cells, luteolin reduced the release of histamine, tryptase and signals like IL-6, IL-8 and TNF. Those studies used concentrations well above what a supplement dose is expected to reach in blood. That is cell data, not a human outcome. We use standard (non-micronized) luteolin from Sophora japonica, a non-peanut source.",
        whyThisFormPatient: "We use standard (non-micronized) luteolin from Sophora japonica (Japanese pagoda tree). The source is the real gate: some commercial luteolin is extracted from peanut hulls, and a peanut-derived ingredient is a non-starter for an allergy-sensitive community. We do not pay for micronization: luteolin is absorbed poorly both because it dissolves slowly and because it is quickly processed in the gut wall and liver, and micronized luteolin has no human data showing better absorption. The source and purity on the Certificate of Analysis are what matter.",
        faq: [
            { q: "What does luteolin do that quercetin doesn't?", a: "Both are plant flavonoids studied in lab mast cell models, and they differ in a few practical ways. Luteolin is described as crossing the blood-brain barrier in lab research, though this has not been measured in people. On drug interactions it is not the safer pick: in people, repeated quercetin speeds up CYP3A, the enzyme route that clears ivabradine, while luteolin has no human interaction data and its lab data on that enzyme point in both directions. In cultured human mast cells (lab data, at high concentrations), luteolin also reduced cytokines such as IL-1b, IL-6 and TNF, not just histamine." },
            { q: "Why standard luteolin instead of micronized?", a: "Luteolin is absorbed poorly: it dissolves slowly, and what is absorbed is quickly processed by enzymes in the gut wall and liver (UGT1A9). Making the particles smaller may have some effect on exposure in animal studies, but micronized luteolin has no human pharmacokinetic studies showing an advantage for us to pay for. So we put our spec where it matters: standard luteolin from Sophora japonica, a non-peanut source, verified on the Certificate of Analysis." },
            { q: "How should I start luteolin if I'm reactive?", a: "Start low and go slow. Some sensitive people prefer to start any new supplement slowly. A common approach is to start at a fraction of the target dose and increase gradually over a few weeks, adjusting to how you feel. This gives your body time to adjust as you reach your full daily amount. In trials lasting up to 26 weeks, luteolin was generally well tolerated." },
            { q: "How long until I notice anything?", a: "Luteolin is a daily-support ingredient, not something that acts in the moment. Human safety studies of luteolin supplements have run from several weeks up to about 6 months, so give it consistent daily use over the first couple of months." }
        ],
        triadPlain: {
            mcas: "No randomized controlled trial has tested luteolin in people with MCAS, and it is not a substitute for any prescribed treatment. Luteolin has a long history of use in foods and has been studied in human trials for up to about 6 months without major safety concerns. ",
            heds: "No randomized controlled trial has tested luteolin in people with hEDS. Luteolin does not reach levels that block collagen-degrading enzymes at oral doses, so we do not claim a connective tissue benefit for it.",
            pots: " Mast cell symptoms are commonly co-reported by people in the POTS community. Luteolin has not been studied in POTS, and it is not a substitute for any prescribed treatment."
        },
        bluf: "Luteolin is a plant flavonoid (found in celery, parsley, artichokes) that reduced mast cell activity in lab studies of cultured human mast cells, at concentrations above blood levels from supplements. ZebraThrive uses 140 mg daily of standard (non-micronized) luteolin from Sophora japonica, a non-peanut source, in the Daily Powder, split AM and PM.",
        atAGlance: {
            whatItIs: "A plant flavonoid (found in celery, parsley, artichokes) studied in lab mast cell models",
            whyWeIncludeIt: "In lab studies of cultured human mast cells, luteolin reduced the release of histamine, tryptase and cytokines, at concentrations higher than a supplement dose reaches in blood. It has a good safety record in trials up to 26 weeks.",
            dose: "140 mg daily in the Daily Powder, split AM and PM scoops",
            keyBenefits: [
                "Lab studies: reduced histamine, tryptase and cytokine release in cultured human mast cells, at concentrations above blood levels from supplements",
                "",
                "Standard luteolin from Sophora japonica (non-peanut source)"
            ]
        },
        howItWorks: "In lab studies at high concentrations, luteolin acts on several mast cell pathways at once.\n\nFirst, in lab studies luteolin reduced calcium entry into mast cells, a step that triggers the release of their contents. Second, in lab studies it reduced NF-kB, a switch for inflammatory gene activity. Third, in lab studies it reduced protein kinase C (PKC), another pathway that leads to mast cell activation.\n\n ",
        research: [
            {
                outcome: "Mast Cell Lab Studies",
                summary: "In a cultured human mast cell line, luteolin reduced the release of several mast cell signals at a high lab concentration. This is in vitro data, not a clinical outcome.",
                studies: [
                    {
                        source: "Tsilioni I & Theoharides TC, 2024 (Int Arch Allergy Immunol)",
                        pmid: "38588651",
                        design: "In vitro, cultured human LADR mast cell line",
                        finding: "In cultured human mast cells, luteolin pretreatment at a high lab concentration (equal to cromolyn's) reduced release of histamine, tryptase, MMP-9, VEGF, IL-1b, IL-6, IL-8 and TNF."
                    }
                ]
            },
            {
                outcome: "Neuroinflammation Research (Lab and Review Data)",
                summary: "",
                studies: [
                    {
                        source: "Theoharides TC et al., 2021, review of luteolin and neuroinflammation research (full reference in our evidence list)",
                        pmid: "33847020",
                        design: "Review of luteolin mechanisms in neuroinflammation",
                        finding: "A review paper discusses lab and animal research on luteolin and brain immune cells (microglia); this has not been tested in people."
                    }
                ]
            },
            {
                outcome: "Clinical Trial of a Different PEA and Luteolin Product",
                summary: "One clinical trial has tested a combined, co-ground PEA and luteolin product given with smell training after COVID-19. ZebraThrive delivers the same two ingredients separately in the Daily Powder, not as that product.",
                studies: [
                    {
                        source: "Di Stadio A et al., \"Ultramicronized PEA and Luteolin Supplement Combined with Olfactory Training\"",
                        pmid: "35450527",
                        design: "Multicenter double-blind randomized placebo-controlled trial, post-COVID olfactory dysfunction, n=185, 90 days",
                        finding: "The trial gave a combined PEA and luteolin product (co-ground, 770 mg a day) with smell training for 90 days and measured smell test scores. ZebraThrive contains the same two ingredients, not that co-ground product. Olfactory outcome only; no inflammatory markers were measured."
                    }
                ]
            }
        ],
        evidenceGaps: "No randomized controlled trials exist specifically in MCAS, hEDS, or POTS populations. The mast cell evidence comes from in vitro studies in cultured cells. Luteolin does not reach levels that block collagen-degrading enzymes at oral doses, so we do not claim a collagen benefit for it.",
        triad: {
            mcas: "No randomized controlled trial has tested luteolin in people with MCAS, and it is not a substitute for any prescribed treatment.",
            heds: " Luteolin does not reach levels that block collagen-degrading enzymes, so we do not claim a connective tissue benefit for it.",
            pots: "Luteolin has not been studied in POTS, and it is not a substitute for any prescribed treatment."
        },
        whyThisForm: {
            form: "Standard (non-micronized) luteolin from Sophora japonica, non-peanut source, COA-verified",
            rationale: "Luteolin's oral bioavailability is low because it is rapidly glucuronidated in the gut wall and liver (UGT1A9 first-pass metabolism). Luteolin's oral absorption is limited partly by how fast it dissolves and mainly by rapid first-pass metabolism in the gut and liver. Making the particles smaller has shown benefits in animal studies but has no human pharmacokinetic data confirming an advantage, so we keep the standard grade. The decisive spec is the source: we require luteolin from Sophora japonica, confirmed in writing as non-peanut, because some commercial luteolin is extracted from peanut hulls. Liposomal and co-ground PEA plus luteolin products exist; they are not what we ship. We deliver PEA and luteolin separately in the Daily Powder.",
            comparison: [
                { form: "Standard luteolin from Sophora japonica (non-peanut, COA-verified)", difference: "Our form; source confirmed non-peanut by supplier statement", selected: true },
                { form: "Micronized luteolin (≤25 μm)", difference: "Smaller particles may dissolve faster, but no human study shows better absorption", selected: false },
                { form: "Peanut-hull-derived luteolin", difference: "Peanut allergen risk; excluded", selected: false },
                { form: "Liposomal luteolin", difference: "Liposomal luteolin, an alternative carrier technology with claimed but unvalidated improved absorption (commercial claims only, no human data); not used here.", selected: false },
                { form: "Co-ultramicronized PEA-luteolin (10:1 ratio)", difference: "We deliver PEA and luteolin separately in the Daily Powder, not as the co-ultramicronized combination used in the published combination studies.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Luteolin has been well tolerated in trials lasting up to 26 weeks. There are no specific tolerability data for luteolin in highly sensitive people. ",
            interactions: "No human study has tested luteolin with any POTS or MCAS medication, and there are no human blood-level data to show whether lab findings apply at our dose. In lab studies luteolin inhibits CYP2D6, the enzyme that clears metoprolol and inactivates midodrine's active form; it both inhibits and induces CYP3A4, which clears ivabradine; and it blocks OCT2, the kidney transporter that clears famotidine. Whether any of this happens at 140 mg a day is unknown. Hydroxyzine is often taken alongside luteolin in MCAS, and the pair has never been studied. If you take metoprolol, midodrine, ivabradine, hydroxyzine, or famotidine, tell your prescriber. Lab studies that used propranolol found no sign of a beta-receptor interaction. Nothing has been reported with fludrocortisone, cromolyn, or ketotifen, but none has been studied. Theoretical caution with anticoagulants (may enhance effects).",
            excipientConcerns: {
                avoid: ["Magnesium stearate", "FD&C dyes", "Sodium lauryl sulfate"],
                safe: ["Sunflower lecithin", "", "Rice hull concentrate"]
            },
            cautions: "Not recommended during pregnancy or breastfeeding pending more human safety data. Discontinue 2 weeks before surgery. Iron supplements may reduce absorption; space by 2+ hours."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "Start with a small sprinkle, building to half a scoop once a day (35 mg luteolin).", notes: "" },
                { step: "Week 2", dosage: "Half a scoop twice a day (35 mg luteolin each time).", notes: "Morning and evening with meals" },
                { step: "Week 3", dosage: "70 mg once daily", notes: "Increase single dose" },
                { step: "Week 4+", dosage: "70 mg twice daily", notes: "Target maintenance dose" }
            ],
            timeline: "Give it several weeks of steady daily use. Consistent daily dosing is important due to the short half-life."
        },
        sources: [
            { title: "Luteolin Is More Potent than Cromolyn in Their Ability to Inhibit Mediator Release from Cultured Human Mast Cells", pmid: "38588651", authors: "Tsilioni I & Theoharides TC", year: "2024" },
            { title: "Long-COVID syndrome-associated brain fog and chemofog: Luteolin to the rescue", pmid: "33847020", authors: "Theoharides TC et al.", year: "2021" },
            { title: "Ultramicronized Palmitoylethanolamide and Luteolin Supplement Combined with Olfactory Training to Treat Post-COVID-19 Olfactory Impairment", pmid: "35450527", authors: "Di Stadio A et al.", year: "2022" }
        ]
    },
"magnesium-bisglycinate": {
        id: "magnesium-bisglycinate",
        name: "Magnesium Bisglycinate",
        patientSummary: "Magnesium bisglycinate is magnesium bonded to two glycine amino acids, a form that is gentle on the gut compared to magnesium oxide, which is poorly absorbed and has a stronger laxative effect. Magnesium is a foundational mineral we include as part of this formula. How often people in this community run low on magnesium has not been measured. In an animal study, magnesium-deficient rats had higher blood histamine for a period. The bisglycinate form has a gentle gut profile and is the form studied in a small human trial for sleep quality. We chose bisglycinate over magnesium oxide, which is poorly absorbed, and over threonate, which costs more.",
        whyThisFormPatient: "We use magnesium bisglycinate - magnesium chelated to two glycine amino acids. The chelate may be absorbed partly through PepT1, the peptide transporter, a pathway distinct from the ones linked to the laxative effect of citrate or oxide. We ask for spectroscopic (FT-IR) testing to confirm a true chelate before a lot is approved, because some cheaper bisglycinate products are magnesium oxide buffered with glycine rather than a true chelate. We use magnesium bisglycinate to deliver about 300 mg of elemental magnesium a day, close to the 250 to 300 mg used in small human sleep and heart rate variability studies.",
        faq: [
            { q: "Why not magnesium oxide - it's cheaper?", a: "Because most of it never gets into your bloodstream. Magnesium oxide is about 4 to 15% bioavailable, and most of it pulls water into your colon rather than being absorbed. In one human study in people with ileal resection, bisglycinate was about 23.5% absorbed, roughly double magnesium oxide, and it is thought to use a different absorption route than the one linked to the laxative effect. The glycine portion is an amino acid with its own calming and sleep-related research, though at a lower dose than used in those studies. If you have a sensitive gut, bisglycinate is a gentler option than magnesium oxide, though it has not been studied specifically in people with gastroparesis." },
            { q: "Magnesium bisglycinate vs glycinate: is there a difference?", a: "They are the same compound. Magnesium glycinate is the common name and bisglycinate is the precise one: one magnesium bound to two glycine molecules. The difference that matters is on the label. Some products sold under either name are buffered, meaning magnesium oxide is blended in. ZebraThrive specifies a non-buffered true chelate and verifies it by FT-IR." },
            { q: "Will magnesium drop my blood pressure?", a: "For most people with normal or low blood pressure, large studies suggest magnesium does not cause a meaningful drop. A 2025 meta-analysis of 38 trials (2,709 people) found no significant blood pressure effect in people with normal blood pressure. The 'magnesium lowers BP' framing came from older studies in hypertensive populations. If you're already on midodrine and running low, give your prescriber a heads-up - but the data doesn't support magnesium as a meaningful BP dropper at the doses we use." },
            { q: "What does research show about magnesium and mast cells?", a: "Only lab and animal studies; none in people. A lab study using rat mast cells found that very high concentrations of magnesium, far above what supplementation achieves in the body, reduced mast cell activity in a dose-dependent way. In an animal study, magnesium-deficient rats had 4 to 5 times higher blood histamine within two weeks. Whether this applies to people has not been studied." },
            { q: "How long until I notice anything?", a: "Magnesium is not a sleep treatment, and a recent review rated the overall evidence for magnesium and sleep as low to very low certainty. Over months, cellular magnesium stores gradually refill as part of normal mineral repletion. Blood tests for magnesium are notoriously unreliable, since only a small fraction, about 0.3%, of total body magnesium is in your blood, so don't go by serum levels alone." }
        ],
        triadPlain: {
            mcas: "No randomized controlled trial has tested magnesium glycinate in people with MCAS. The form choice matters for tolerability: we use bisglycinate because it avoids the citric acid and sulfate found in some other magnesium forms, which some sensitive individuals report as triggers. Bisglycinate is made from magnesium and glycine without a fermentation step, unlike magnesium citrate.",
            heds: "No randomized controlled trial has tested magnesium glycinate in people with hEDS. We include magnesium as a foundational mineral to cover a common intake gap: about 300 mg elemental magnesium is 71% of the Daily Value.",
            pots: "No trial has tested magnesium in people with POTS, and no study has measured how often people with POTS are low in magnesium, so the dose is set to cover a common intake gap, not to correct a known deficiency. If you tend to run low on blood pressure or take midodrine, monitor your blood pressure when you start and give your prescriber a heads-up. We split the dose AM and PM to maintain steady levels instead of dumping it all at once."
        },
        bluf: "Magnesium bisglycinate is magnesium bonded to two glycine molecules, a form studied for good absorption and a gentle gut profile. Magnesium is a foundational electrolyte; lab studies at concentrations far above what is achievable from oral supplementation have looked at effects on mast cells, and a small trial in heart failure patients found a heart rate variability change. ZebraThrive uses magnesium bisglycinate providing about 300 mg of elemental magnesium daily in the Daily Powder, split between AM and PM scoops.",
        atAGlance: {
            whatItIs: "A highly absorbable, gentle form of magnesium bound to the amino acid glycine",
            whyWeIncludeIt: "Magnesium is a foundational mineral involved in autonomic function, and about 300 mg of elemental magnesium covers 71% of the Daily Value, a common intake gap.",
            dose: "About 300 mg elemental magnesium daily, in the Daily Powder, split AM and PM scoops",
            keyBenefits: [
                "Lab studies in rat mast cells found that magnesium chloride reduced degranulation in a dose-dependent manner, at concentrations well above what oral supplementation achieves in the body.",
                "Lab studies suggest magnesium may influence calcium signaling pathways involved in mast cell activity, at concentrations well above typical blood levels from oral supplementation.",
                "Covers a common intake gap: about 300 mg elemental is 71% of the Daily Value",
                "The bisglycinate form also provides glycine, an amino acid that contributes to sleep support and is a basic building block of collagen, though at a lower amount than doses studied specifically for sleep."
            ]
        },
        howItWorks: "Magnesium is involved in over 300 enzymatic reactions. Three of its roles are described below.\n\nFirst, lab studies suggest magnesium may influence calcium-related pathways in mast cells, though at concentrations well above what oral supplementation can achieve in the body. Mast cell degranulation involves calcium signaling, and some research has looked at whether adequate magnesium levels influence this process. A 2025 lab study in rat mast cells showed magnesium chloride reduced degranulation in a dose-dependent manner, using concentrations far higher than what oral supplementation produces in the bloodstream. Magnesium deficiency does the opposite: in animal data, deficient rats run 4-5 fold higher blood histamine within two weeks.\n\nSecond, magnesium modulates the autonomic nervous system. Magnesium is thought to support the parasympathetic nervous system, and a small trial in heart failure patients found a heart rate variability measure improved with magnesium citrate. \n\nThird, the bisglycinate form delivers ~2g of glycine daily as a useful byproduct. Glycine supports sleep architecture and is one of the primary amino acids used in collagen, though the amount delivered here is below doses studied specifically for sleep benefits. DAO, the enzyme that breaks down histamine in the gut, depends on copper rather than magnesium, so magnesium is not a direct DAO cofactor.",
        research: [
            {
                outcome: "Mast Cell Lab and Animal Studies",
                summary: "Lab research has looked at how magnesium affects mast cells, but the effective concentration in these studies was far above what the body reaches from oral supplementation, so this is not direct evidence that the supplement stabilizes mast cells.",
                studies: [
                    {
                        source: "Kazama I et al., 2025, \"Magnesium and zinc dose-dependently stabilize rat peritoneal mast cells\" (lab study)",
                        pmid: "40692390",
                        design: "In vitro study using rat peritoneal mast cells (2025)",
                        finding: "In this lab study, magnesium chloride reduced the number of degranulating mast cells in a dose-dependent manner, but only at concentrations far above what oral supplementation can achieve in the body."
                    },
                    {
                        source: "Srebro D et al., \"Magnesium in orofacial pain model\"",
                        pmid: "37047214",
                        design: "In vivo rat model (2023)",
                        finding: "In a rat study, injected magnesium sulfate reduced mast cell degranulation by about 23% in the acute phase and about 40% in a later phase."
                    }
                ]
            },
            {
                outcome: "Autonomic Function and HRV",
                summary: "Magnesium supplementation has shown improvements in heart rate variability in some small studies, including one in heart failure patients.",
                studies: [
                    {
                        source: "Almoznino-Sarafian D et al., \"Magnesium and heart rate variability\"",
                        pmid: "19201586",
                        design: "A controlled trial gave 300 mg/day of magnesium citrate to 16 heart failure patients for 5 weeks, compared to 16 untreated heart failure patients.",
                        finding: "HRV correlation dimension significantly improved from 3.47 to 3.94 (p<0.001)"
                    }
                ]
            },
            {
                outcome: "Deficiency and Consequences",
                summary: "In animal studies, magnesium-deficient rats had higher blood histamine and mast cell changes. How common low magnesium status is in this population has not been measured.",
                studies: [
                    {
                        source: "Kraeuter SL & Schwartz R, \"Magnesium deficiency and histamine\"",
                        pmid: "6445415",
                        design: "Animal model of magnesium depletion",
                        finding: "In magnesium-depleted rats, blood histamine rose 4 to 5 fold by day 14 of depletion, with mast cell changes seen in the tissue studied."
                    }
                ]
            }
        ],
        evidenceGaps: "No randomized controlled trials exist specifically testing magnesium glycinate in hEDS, POTS, or MCAS. One study of 94 people with mitral valve prolapse found 59 had low red blood cell magnesium, but low levels were not linked to joint hypermobility. Many people with hEDS report taking magnesium, even though trials in hEDS are lacking.",
        triad: {
            mcas: "No randomized controlled trial has tested magnesium glycinate in people with MCAS. We chose the bisglycinate form in part because it is not fermentation-derived, unlike magnesium citrate.",
            heds: " The glycine delivered with this form is a building block of collagen, though the amount provided is small relative to amounts studied for collagen synthesis. ",
            pots: "No study has measured how often people with POTS are low in magnesium, so the dose is set to cover a common intake gap, not to correct a known deficiency. Monitor blood pressure in hypotensive POTS patients as it can lower BP slightly."
        },
        whyThisForm: {
            form: "Magnesium bisglycinate, generic chelate (lot FT-IR identity testing requested), non-buffered, no citric acid",
            rationale: "Form selection matters for absorption and tolerability. We chose bisglycinate because animal and mechanistic research suggests it may use the PepT1 transport pathway, it tends to cause minimal GI upset, it is not fermentation-derived, and it provides glycine. We are requiring a generic chelate to be verified as a true chelate by FT-IR spectrum testing on each production lot, with no oxide buffering, and free of the citric acid found in some branded chelates.",
            comparison: [
                { form: "Magnesium oxide", difference: "Only 4-15% absorption; strong laxative effect", selected: false },
                { form: "Magnesium citrate", difference: "Magnesium citrate: about 30% absorbed. It is made using fermentation, which may carry a theoretical histamine risk for sensitive individuals, though residue data are not available.", selected: false },
                { form: "Magnesium glycinate", difference: "Magnesium bisglycinate: well absorbed in the studied population, with minimal GI upset and the added benefit of glycine.", selected: true },
                { form: "Magnesium L-threonate", difference: "Magnesium L-threonate: a brain-penetrant alternative some people use; this is not the form we ship.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Magnesium glycinate is generally well tolerated by people with sensitive digestion. Diarrhea can occur if dose is increased too rapidly. Theoretical concern of hypotension exists but is usually not significant in normotensive populations.",
            interactions: "Antibiotics: Space by 2-6 hours. Thyroid medications: separate from magnesium by at least 4 hours, as magnesium may reduce absorption of thyroid medication. Fludrocortisone: potassium is the electrolyte most often watched on fludrocortisone. A study in children found no drop in magnesium, though the same paper notes that adult studies have reported low magnesium at a low frequency; hypokalemia remains the better documented risk. Beta-blockers: the only human study of oral magnesium with beta-blockers (a different salt, in 39 people with high blood pressure) found no significant blood pressure change between groups; older studies of antacid magnesium salts gave conflicting results on metoprolol and propranolol absorption, and none used this form. Famotidine: gram doses of antacid magnesium lowered famotidine absorption by up to about 20-25% in some studies; this chelate is not an antacid, but taking famotidine 2 hours apart costs nothing.",
            excipientConcerns: {
                avoid: ["We avoid fermentation-derived magnesium citrate as a precaution for histamine-sensitive individuals, though no contamination data exist either way.", "Magnesium stearate", "Artificial colors"],
                safe: ["Magnesium bisglycinate, non-buffered, no citric acid", "Rice hull concentrate (flow agent in the Daily Powder)"]
            },
            cautions: "Monitor blood pressure when initiating. Kidney function should be normal. "
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "Start with a small sprinkle, building to half a scoop once a day (75 mg magnesium).", notes: "MCAS ultra-sensitive start" },
                { step: "Week 2", dosage: "Half a scoop twice a day (150 mg magnesium a day).", notes: "Standard start" },
                { step: "Week 3", dosage: "Build up to one scoop twice a day (300 mg magnesium a day).", notes: "Target maintenance" },
                { step: "Week 4+", dosage: "About 300 mg elemental magnesium daily, delivered as magnesium bisglycinate, split AM and PM scoops.", notes: "Full daily amount, split AM/PM scoops" }
            ],
            timeline: "RBC magnesium repletion requires 8-12 weeks. Don't expect immediate effects-repletion takes time. Some people notice changes in sleep within a few weeks, though the overall evidence for magnesium and sleep is inconsistent and rated low certainty."
        },
        sources: [
            { title: "Magnesium and zinc stabilize mast cells in a dose-dependent manner", pmid: "40692390", authors: "Kazama I et al.", year: "2025" },
            { title: "Magnesium reduces mast cell degranulation in orofacial pain model", pmid: "37047214", authors: "Srebro D et al.", year: "2023" },
            { title: "Magnesium administration and heart rate variability", pmid: "19201586", authors: "Almoznino-Sarafian D et al.", year: "2009" },
            { title: "Bioavailability of magnesium diglycinate vs magnesium oxide", pmid: "7815675", authors: "Schuette SA et al.", year: "1994" },
            { title: "Nutritional dose of magnesium in hypertensive patients on beta blockers lowers systolic blood pressure: a double-blind, cross-over study", pmid: "7913949", authors: "Wirell et al.", year: "1994" }
        ]
    },
    "pine-bark-extract": {
        id: "pine-bark-extract",
        name: "Pine Bark Extract",
        patientSummary: "Pine bark extract is one of the most studied natural sources of procyanidins, plant compounds that have been studied in lab and human research (mostly on French maritime pine bark) for their effects on inflammation markers and MMP activity in lab studies. Our Pinus massoniana extract shares this chemistry but has not been tested the same way. A 2025 human study found that French maritime pine bark extract (Pycnogenol, 100 mg twice daily) reduced salivary MMP-8 and serum IL-6 over three months in people receiving gum health treatment. This is a different pine bark species than ours, and the study was not done in people with hEDS. In a rat mast cell study, a pine bark extract also reduced histamine release (lab data). We use Pinus massoniana pine bark extract specified at 65 to 75% procyanidins. The supplier's certificate for the current lot reports 75.10% by an HPLC method that we are asking the supplier to name.",
        whyThisFormPatient: "We use pine bark extract from Pinus massoniana, specified at 65 to 75% procyanidins and non-fermented. Our supplier has confirmed in writing that it is peanut-free; a lab peanut test is pending. Most published human pine bark studies used French maritime pine bark (Pinus pinaster, Pycnogenol), so our evidence is extrapolated across species. ",
        faq: [
            { q: "Why pine bark instead of grape seed?", a: "We use both, actually. Pine bark and grape seed share procyanidin chemistry but differ in minor constituents. A 2025 human study found pine bark extract (as Pycnogenol) reduced MMP-8. Procyanidin M1 is a gut-microbiome-derived metabolite that both pine bark and grape seed can produce, and researchers think it contributes to the effects seen with these extracts, though this has not been proven directly." },
            { q: "What does '65-75% procyanidins by HPLC' actually mean?", a: "HPLC, or high-performance liquid chromatography, is an analytical method that separates and identifies individual compounds in the extract. It is not the same method used to assign a total procyanidin percentage under USP standards. Different analytical methods can report different procyanidin percentages for the same extract, which is one reason we look closely at how a product's percentage was measured. The analytical method on a certificate of analysis matters. We are working to confirm and disclose the specific method used for our pine bark COA." },
            { q: "Does pine bark affect blood pressure?", a: " A meta-analysis of 7 trials (626 people) of French maritime pine bark extract (Pycnogenol) found no significant effect on blood pressure. Our extract is a different species, Pinus massoniana, and has not been tested for blood pressure on its own. No study has measured standing blood pressure, and these trials used French maritime pine bark rather than our species. " },
            { q: "Is pine bark safe long-term?", a: "Pine bark extract, mostly studied as Pycnogenol, has a long history of use in Europe with trials running from 3 to 12 months without serious adverse events reported. Our Pinus massoniana extract has less long-term safety data behind it, with one short-term study in older adults. Pine bark extract has been shown in one study to reduce platelet clumping in smokers. No study has tested pine bark together with warfarin or a DOAC, so if you take one of these medications, mention pine bark to your prescriber. For people scheduled for surgery, standard practice is to stop pine bark extract 2 weeks beforehand." }
        ],
        triadPlain: {
            mcas: "No study has tested pine bark extract in people with MCAS. Pine bark extract, mostly studied as Pycnogenol, has been used in Europe for decades, but we do not have long-term safety data specific to mast cell activation or to our Pinus massoniana extract. Our extract is non-fermented, though we have not tested finished lots for histamine or tyramine. We pair pine bark with grape seed. Gut bacteria convert procyanidins from both into the metabolite M1, one of several compounds that circulate after taking these extracts.",
            heds: "No study has tested pine bark extract in people with hEDS. Most published human pine bark studies used French maritime pine bark (Pycnogenol), not our Pinus massoniana extract. We include pine bark as a source of procyanidins, which gut bacteria convert into valerolactone metabolites.",
            pots: " A meta-analysis of Pycnogenol pine bark extract found no significant overall effect on blood pressure. If you take medications for blood pressure or orthostatic symptoms, talk to your doctor before adding pine bark extract."
        },
        bluf: " ZebraThrive uses 200 mg daily (130 mg AM and 70 mg PM), specified at 65 to 75% procyanidins.",
        atAGlance: {
            whatItIs: "A standardized extract from Pinus massoniana pine bark delivering concentrated oligomeric proanthocyanidins (OPCs).",
            whyWeIncludeIt: "Pine bark extract (Pinus massoniana, 200 mg a day) provides procyanidins, which gut bacteria convert into valerolactone metabolites.",
            dose: "200 mg daily (130 mg AM capsule + 70 mg PM capsule)",
            keyBenefits: [
                "Lower salivary MMP-8 in one human gum-health trial of Pycnogenol, a related pine bark extract",
                "",
                "",
                "A small uncontrolled study in postmenopausal women found a noticeable increase in collagen type I gene activity after taking Pycnogenol, a related pine bark extract."
            ]
        },
        howItWorks: "Pine bark extract works partly through a metabolite called M1, which your gut bacteria produce after absorption. This metabolite is also produced from other polyphenol-rich foods like grape seed and cocoa.\n\n In a lab study, the M1 metabolite inhibited MMP-9 activity at concentrations higher than what is typically measured in human blood plasma after a normal dose. It is not yet confirmed that pine bark extract reaches MMP-9 inhibiting levels in the body. Studies show reduced MMP-8 in a human gum health trial, and in an animal heart study, pine bark extract increased a protective protein called TIMP-4.\n\nIn a lab study using rat peritoneal mast cells, a pine bark extract reduced histamine release in a concentration dependent way. That is lab data, not a human outcome.\n\n ",
        research: [
            {
                outcome: "MMP Activity (Lab and Human Biomarker Studies)",
                summary: "In a lab study, pine bark extract's metabolites inhibited enzymes involved in collagen breakdown.",
                studies: [
                    { source: "Bayer J et al., \"100 mg BID × 3 months → significant MMP-8 reduction\"", pmid: "40362854", design: "2025 German RCT (n=91)", finding: "Significant reduction in salivary MMP-8 (p=0.0261) after 3 months of supplementation, in a study of people receiving gum health treatment." },
                    { source: "Grimm T et al., \"200 mg/day × 5 days → 25% reduction in MMP-9 release\"", pmid: "16441890", design: "Human pilot study (n=7)", finding: "Significant reduction in MMP-9 release from monocytes (p<0.01)." },
                    { source: "Grimm T et al., \"M1 metabolite achieves about 50% MMP-9 inhibition in a lab cell study\"", pmid: "14990359", design: "In vitro, cell study", finding: "In a lab study, 0.5 uM of the M1 metabolite inhibited about 50% of MMP-9 release from cells, a concentration higher than what is typically measured in human blood after a normal dose." }
                ]
            },
            {
                outcome: "Collagen Gene Expression (Lab and Small Study Findings)",
                summary: "In a small, uncontrolled study, Pycnogenol pine bark extract was linked to increased expression of collagen-related genes in postmenopausal women.",
                studies: [
                    { source: "Marini A et al., \"12 week small study of Pycnogenol in postmenopausal women found increased collagen related gene expression\"", pmid: "22270036", design: "Small uncontrolled study (n=20)", finding: "Increased collagen type I gene expression and hyaluronic acid synthase gene expression in a small study of postmenopausal women." }
                ]
            },
            {
                outcome: "Mast Cell Activity (Lab Study)",
                summary: "Lab data: a French maritime pine bark extract reduced histamine release from isolated rat mast cells.",
                studies: [
                    { source: "Sharma SC et al., \"Pycnogenol inhibits the release of histamine from mast cells\"", pmid: "12557250", design: "In vitro, rat peritoneal mast cells", finding: "French maritime pine bark extract (Pycnogenol) produced concentration-dependent inhibition of histamine release induced by compound 48/80 or calcium ionophore." }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials exist specifically in hEDS, POTS, or MCAS populations. The mechanism evidence comes from lab studies, and the human findings come from periodontal, skin and chronic venous insufficiency studies of a different pine species (Pycnogenol). Clinical validation in these specific triple-triad populations is still needed.",
        triad: {
            mcas: "No study has tested pine bark extract in people with MCAS. It is not fermentation-derived, which lowers the risk of histamine and tyramine contamination seen with some plant extracts, though we have not tested finished lots for these compounds directly.",
            heds: " ",
            pots: " ",
        },
        whyThisForm: {
            form: "Generic Pinus massoniana pine bark extract, specified at 65 to 75% procyanidins (assay method being confirmed with the supplier)",
            rationale: "Pine bark activity is thought to depend on procyanidin content and on metabolites, such as M1, that gut bacteria produce from those procyanidins. Unstandardized plant extracts can vary widely in procyanidin levels, and label claims in this category are not always accurate. Our specification is generic Pinus massoniana pine bark extract at 65 to 75% procyanidins, non-fermented. The supplier has confirmed in writing that it is peanut-free, and a lab peanut test is pending. The 65 to 75% procyanidin range is intended to preserve free monomers, which research on other flavanol extracts suggests convert more efficiently to M1, though we have not measured the monomer content of this specific lot. Most published human studies used French maritime pine bark (Pycnogenol), so the clinical evidence is extrapolated across species. Split AM/PM dosing follows the same twice daily schedule used in published Pycnogenol research.",
            comparison: [
                { form: "Unstandardized generic pine bark extract", difference: "Generic pine bark extracts are not always standardized for procyanidin content, which can mean more variation in active compounds from batch to batch.", selected: false },
                { form: "Pinus massoniana pine bark extract, specified at 65 to 75% procyanidins (assay method being confirmed with the supplier)", difference: "Our specification; the supplier assays procyanidins by an HPLC method we are asking them to name.", selected: true },
                { form: "Branded Pycnogenol (French maritime pine)", difference: "Single-species Pinus pinaster; the most-studied extract but premium-priced; not what we ship", selected: false }
            ]
        },
        safety: {
            sideEffects: "Studies of pine bark extract, mostly the branded French maritime pine extract Pycnogenol, report few side effects. Our Pinus massoniana extract has little safety data of its own. The most commonly reported side effect with pine bark extract is mild stomach discomfort, which some people find is reduced by taking it with food. If you notice any new or unusual symptoms after starting pine bark extract, stop taking it and check in with your healthcare provider.",
            interactions: "Beta-blockers: possible small additive blood pressure lowering, about 0 to 2 mmHg systolic in people with normal blood pressure (up to 3 mmHg in pooled trials). Most human research on pine bark extract and blood pressure has used French maritime pine bark (Pycnogenol) rather than the Pinus massoniana extract in this product. A large analysis of trials at 200 mg a day and higher did not find a significant blood pressure change. Fludrocortisone/Midodrine: the same small blood pressure lowering could slightly oppose these medications; no study has tested the combination. Ivabradine: no human data; pine bark has never been tested on liver enzymes in people. Anticoagulants: in one human study in smokers, pine bark extract (Pycnogenol) reduced smoking-induced platelet clumping. No study has tested pine bark with warfarin or a DOAC, so talk with your prescriber if you take a blood thinner.",
            excipientConcerns: {
                avoid: ["Unknown fermentation residues", "Artificial fillers"],
                safe: ["This extract is non-fermented. We have not confirmed the exact solvent used in extraction from our current documentation.", "Other ingredients include things like hypromellose, microcrystalline cellulose, maltodextrin, rice hull, and L-leucine. This product does not use artificial fillers."]
            },
            cautions: "Stop 2 weeks before surgery due to antiplatelet effects. Avoid in first-trimester pregnancy. Autoimmune patients should use caution as pine bark extract may stimulate certain immune pathways. Monitor for orthostatic symptoms if your baseline BP is very low (<100 mmHg)."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "", notes: "" },
                { step: "Week 2", dosage: "", notes: "" },
                { step: "Week 3", dosage: "", notes: "" },
                { step: "Daily", dosage: "130 mg AM + 70 mg PM", notes: "Full target dose (200 mg/day, AM-weighted split)" }
            ],
            timeline: " "
        },
        sources: [
            { title: "MMP-8 reduction at 100 mg BID in human RCT", pmid: "40362854", authors: "Bayer J", year: "2025" },
            { title: "Human plasma inhibits MMP-9 after oral dosing of pine bark extract", pmid: "16441890", authors: "Grimm T", year: "2006" },
            { title: "pine bark extract metabolite M1 inhibits MMP-9", pmid: "14990359", authors: "Grimm T", year: "2004" },
            { title: "Increased COL1A1/COL1A2 gene expression in human skin", pmid: "22270036", authors: "Marini A", year: "2012" },
            { title: "Pycnogenol inhibits the release of histamine from mast cells", pmid: "12557250", authors: "Sharma SC", year: "2003" },
        ]
    },
    "nicotinamide-riboside": {
        id: "nicotinamide-riboside",
        name: "Nicotinamide Riboside (NR)",
        patientSummary: "Nicotinamide Riboside (NR) is a form of vitamin B3 that your body converts to NAD+ - the molecule every cell uses for energy production and DNA repair. NR is one of the few NAD+ precursors with human evidence showing it raises blood NAD+. ",
        whyThisFormPatient: "We use generic Nicotinamide Riboside Chloride, with purity checked on each batch. Current Certificates of Analysis report 99.34 to 99.87% purity by HPLC. NR is chemically unstable - it can degrade over time to nicotinamide, which actually inhibits the enzymes NR is supposed to support. So the most important factor isn't the brand name, it's the analytical paperwork: identity and purity testing on each batch. We require a Certificate of Analysis confirming identity and purity for each batch.",
        faq: [
            { q: "Does NR actually raise NAD+?", a: "In blood, yes - consistently. In a human trial, whole-blood NAD+ rose 22% at 100 mg/day, 51% at 300 mg/day, and 142% at 1,000 mg/day. In skeletal muscle, the picture is murkier; one well-run trial found no muscle NAD+ increase at high doses. " },
            { q: "Will NR keep me awake at night?", a: "No. The 'NAD+ equals energy' framing is mostly marketing. In NR trials, the most commonly reported side effects were mild, such as nausea, diarrhea and headache. NAD+ isn't a stimulant - it's a cofactor in metabolic reactions that happen 24/7. We split the dose AM and PM out of convention. A 2026 study found blood NAD+ rises and falls slowly, and once-daily dosing is enough. NR only needs to be taken once a day, but it comes inside your AM and PM capsules alongside other ingredients, so take those as directed." },
            { q: "What about methylation? Doesn't NR use up methyl groups?", a: "Nicotinamide (a downstream metabolite of NR) gets methylated for excretion using the same methyl donors as homocysteine and neurotransmitter metabolism. We include methylfolate and methylated B12 in the formulation partly to keep that methyl pool topped up. If you've got known MTHFR variants and significant methylation concerns, mention NR to your prescriber when titrating it in." },
            { q: "What should I look for in an NR product?", a: " NR is chemically unstable and easy to mishandle, so what you want to see is identity confirmation (it is what it says), purity (≥99% NR Chloride), and stability testing (the batch hasn't degraded to nicotinamide). " }
        ],
        triadPlain: {
            mcas: "No study has tested NR in people with MCAS, and no human study has tested NR with MCAS medications such as hydroxyzine or famotidine. We include NR as a form of vitamin B3 that your body converts to NAD+.",
            heds: "No study has tested NR in people with hEDS, and its effects on collagen have only been looked at in a lab study.",
            pots: " On blood pressure, the strongest human trial so far found NR did not lower it, so no blood pressure effect is expected at our dose. NR has not been tested together with any POTS medication, and no study has measured standing blood pressure. "
        },
        bluf: "Nicotinamide Riboside (NR) is a specialized form of vitamin B3 that raises cellular NAD+ for energy and DNA repair. Lab and mouse studies suggest NR may affect mast cell activity and certain enzymes involved in tissue structure. ZebraThrive uses 500 mg daily of NR chloride, with a Certificate of Analysis for each batch.",
        atAGlance: {
            whatItIs: "A specialized form of vitamin B3 that efficiently raises NAD+ levels, essential for cellular energy and repair.",
            whyWeIncludeIt: "Lab studies suggest NR may affect mast cell activity through a cellular pathway, and separate lab studies have looked at NR's effects on certain structural proteins.",
            dose: "500 mg daily (250 mg AM capsule + 250 mg PM capsule)",
            keyBenefits: [
                "In a clinical trial, 300 mg a day raised whole-blood NAD+ by 51% and 1,000 mg a day by 142%.",
                "In a lab and mouse study, NR and a related compound reduced mast cell activation markers in mouse and human cord-blood cells; this has not been tested in people at this dose.",
                "",
                ""
            ]
        },
        howItWorks: "Nicotinamide Riboside (NR) is a building block your body uses to make NAD+, which supports proteins called sirtuins.\n\n In lab studies, NR and NMN together were linked to lower levels of certain cell-signaling molecules, but this has not been tested in people. \n\n In a lab study using NR-loaded stem cell particles on skin cells exposed to UV, levels of a collagen-crosslinking enzyme increased.\n\nNR consistently raises NAD+ levels in the blood, though human trials have not shown a change in muscle mitochondrial function. ",
        research: [
            {
                outcome: "Mast Cell Activity (Lab Research)",
                summary: "In lab studies, NR and NMN together were linked to reduced release of certain mediators from human cord-blood mast cells grown in dishes.",
                studies: [
                    { source: "Kim HW et al., \"NAD(+)-boosting molecules suppress mast cell degranulation and anaphylactic responses in mice\"", pmid: "35547746", design: "Preclinical (Theranostics, 2022)", finding: "In a lab study, NR and NMN together were linked to reduced cytokine and lipid mediator production in human cord blood-derived mast cells." }
                ]
            },
            {
                outcome: "NAD+ Elevation",
                summary: "Raised blood NAD+ levels in human trials, with larger increases at higher doses.",
                studies: [
                    { source: "Conze et al., \"300 mg → 51% elevation in blood NAD+\"", pmid: "31278280", design: "Human RCT (2019)", finding: "In a clinical trial of 140 overweight, healthy adults, higher doses were linked to larger increases in whole-blood NAD+." },
                    { source: "Berven et al., 'NR-SAFE trial: no moderate or severe side effects at 3,000 mg/day in a small trial'", pmid: "38016950", design: "High-dose safety trial (2023)", finding: "In a small trial of 20 people with Parkinson's disease over 4 weeks, NAD+ rose up to 5-fold with no moderate or severe side effects, though homocysteine rose slightly at first." }
                ]
            },
        ],
        evidenceGaps: "No clinical trials currently exist specifically in hEDS, POTS, or MCAS populations. While NR robustly elevates NAD+ (a biomarker), functional clinical outcomes in humans have been mixed in other populations. The mast cell findings on this page come from one lab and mouse study and have not been confirmed in people.",
        triad: {
            mcas: " ",
            heds: " ",
            pots: "Supports cellular NAD+ levels. In the strongest human trial to date (adults with raised blood pressure, 1,000 mg a day plus exercise), NR did not lower blood pressure more than placebo, so no blood pressure effect is expected at our dose. NR has not been tested with any POTS medication.",
        },
        whyThisForm: {
            form: "Generic NR chloride, 99.34 to 99.87% purity by HPLC per lot COA.",
            rationale: " Our spec is generic NR chloride at 99.34 to 99.87% purity by HPLC, verified per batch. Most published clinical trials used the branded Niagen form. The molecule is the same, and we verify identity and purity per batch. NR chloride is generally made by chemical synthesis, and we are confirming our manufacturer's route in writing. We split the dose into AM and PM capsules for convenience, though once-daily dosing raises blood NAD+ just as well.",
            comparison: [
                { form: "Unverified marketplace NR (no COA)", difference: "An industry white paper (not peer-reviewed, from a company with a commercial interest) reported up to 87% of NR products failing label claims, with counterfeit risk among untested suppliers.", selected: false },
                { form: "Generic NR chloride, 99.34 to 99.87% purity by HPLC per lot COA.", difference: "Same molecule used in trials. Our spec is verified per batch for identity and purity.", selected: true }
            ]
        },
        safety: {
            sideEffects: "A small trial tested 3,000 mg/day for 4 weeks in 20 people with no moderate or severe side effects, though another trial found higher dropout rates at 2,000 mg/day over 20 weeks. Reported side effects include mild nausea (around 5 to 10%, similar to placebo in some trials), along with diarrhea and headache in some studies. NR has been studied in trials lasting up to about 6 months, plus one 2 year open-label trial. Long-term safety beyond that has not been established.",
            interactions: "No human study has tested NR with any POTS or MCAS medication (beta-blockers, ivabradine, fludrocortisone, midodrine, hydroxyzine, famotidine); that means unknown, not proven safe. The strongest human blood pressure trial found no blood pressure lowering, so no added effect on blood pressure medications is expected. Warfarin: no study has tested NR with warfarin. Case reports with other forms of vitamin B3 describe INR changes, so ask your prescriber whether to check your INR when you start. Diabetes medications: no study has tested NR with them. In trials, NR did not change insulin sensitivity; mention NR to your prescriber if you take diabetes medication.",
            excipientConcerns: {
                avoid: ["NR products without a batch COA"],
                safe: ["The AM and PM capsules include additional ingredients such as MCC, maltodextrin, dicalcium phosphate and a selenium premix carrier. The source or identity of some of these carriers is still being confirmed."]
            },
            cautions: "NR is not expected to lower blood pressure: the strongest human trial found no blood pressure lowering. Patients with methylation issues may benefit from concurrent methyl-donors (B12/Folate)."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "", notes: "Assess tolerance (AM only)" },
                { step: "Week 2", dosage: "", notes: "Building to target dose" },
                { step: "Week 3", dosage: "", notes: "Assessing energy and BP" },
                { step: "Daily", dosage: "250 mg twice daily", notes: "Full target dose (500 mg/day)" }
            ],
            timeline: "In trials, blood NAD+ levels rose within about 2 weeks and then leveled off. "
        },
        sources: [
            { title: "NAD(+)-boosting molecules suppress mast cell degranulation and anaphylactic responses in mice", pmid: "35547746", authors: "Kim HW et al.", year: "2022" },
            { title: "Dose-dependent NAD+ increase; 300 mg safe and effective", pmid: "31278280", authors: "Conze et al.", year: "2019" },
            { title: "Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD+ in healthy middle-aged and older adults", pmid: "29599478", authors: "Martens", year: "2018" },
            { title: "NR-SAFE: 3000 mg/day safe with 5-fold NAD+ increase", pmid: "38016950", authors: "Berven", year: "2023" },
            { title: "Nicotinamide riboside combined with exercise to treat hypertension in middle-aged and older adults: a pilot randomized clinical trial", pmid: "40770531", authors: "Lin et al.", year: "2025" }
        ]
    },
    "taurine": {
        id: "taurine",
        name: "Taurine",
        patientSummary: "Taurine is an amino acid your body makes in small amounts and gets the rest from animal protein. Taurine is involved in several basic body processes, including heart function, bile production, antioxidant defense and nervous system activity. Taurine has decades of cardiovascular trial data, though no trials in people with hEDS, POTS or MCAS. In a lab study using a human mast cell line, taurine lowered inflammatory signaling at concentrations below the blood levels reached after an oral dose. We use synthetic taurine, made by chemical synthesis rather than fermentation, to minimize the risk of histamine and tyramine that can be associated with some fermentation-derived ingredients.",
        faq: [
            { q: "Will taurine lower my blood pressure?", a: "In people with normal blood pressure, the expected drop is modest, roughly 3 to 5 mmHg systolic at 1,500 mg a day, based on pooled trials in mixed populations. For someone with normal BP, that's clinically minor. For someone running low on midodrine, it's worth a quick check-in with your prescriber. We split the dose AM/PM partly to flatten the peak and reduce the acute effect. If you're prone to hypotension or just starting midodrine, mention taurine when you're titrating." },
            { q: "How is supplement taurine different from what's in energy drinks?", a: "Same molecule, different context. The cardiovascular and MMP-9 evidence for taurine comes from supplement trials using doses from about 1 to 6 grams per day taken consistently over weeks, not from occasional energy drink consumption." },
            { q: "Is taurine safe with beta-blockers?", a: "No study has tested taurine together with beta-blockers in people, so there is no direct answer. On its own, taurine lowered heart rate by about 3.6 beats per minute and systolic blood pressure by about 4 mmHg in a meta-analysis of 20 trials, and our 1,500 mg dose falls within the typical dose range studied, though the relationship between dose and effect size was not statistically significant. With a beta-blocker or ivabradine, that could add a little to heart-rate lowering. Check your resting heart rate when you start, and tell your prescriber, especially if you already run low. No liver-enzyme interaction has been identified, so drug levels are not expected to change." },
            { q: "Why synthetic taurine?", a: " Some people with sensitive mast cells report reacting to histamine and tyramine. Synthetic taurine is made by chemical synthesis, with no microbes involved, which is expected to avoid the histamine and tyramine that can be a byproduct of fermentation. The molecule is identical; the contamination profile isn't. For an MCAS-conscious formulation, we chose synthetic taurine as the safer option given the lower contamination risk compared to fermentation-derived sources. It's a small but important detail that separates a brand built for this community from one that isn't." }
        ],
        triadPlain: {
            mcas: "No clinical trial has tested taurine in people with MCAS. The taurine in this product is made by chemical synthesis, not fermentation, which avoids the histamine and tyramine contamination risk associated with some fermentation-derived amino acids; residue testing for histamine and tyramine has not been performed on this material. Most people tolerate taurine well, though mild stomach upset such as reflux or diarrhea has been reported in a clinical trial at a lower dose.",
            heds: "No clinical trial has tested taurine in people with hEDS. Taurine is included as an amino acid involved in several basic body processes, including heart function, antioxidant defense and nervous system activity.",
            pots: "No completed trial has tested taurine in people with POTS. It can lower blood pressure slightly, so if you tend to run low, check your blood pressure more closely when you start. An observational study at York University is currently looking at taurine in people with long COVID and orthostatic intolerance. We split the dose AM/PM to keep the BP curve smooth."
        },
        bluf: "Taurine is a conditionally essential amino acid involved in cardiovascular function and nervous system signaling. In lab studies taurine calmed inflammatory signaling in mast cells, and one small human trial found it lowered MMP-9, an enzyme that breaks down collagen. ZebraThrive uses 1,500 mg daily in the Daily Powder, split AM and PM.",
        atAGlance: {
            whatItIs: "A conditionally essential amino acid involved in cardiovascular and nervous system function.",
            whyWeIncludeIt: "Taurine is involved in heart function, antioxidant defense and nervous system activity; lab studies have looked at its effects on mast cell signaling, and one small human trial in older women found lower blood MMP-9.",
            dose: "1,500 mg daily in the Daily Powder, split AM and PM scoops",
            keyBenefits: [
                "Taurine is involved in several basic body processes, including heart function, bile production, antioxidant defense and nervous system activity.",
                "One small human trial found lower blood MMP-9 after 14 weeks at 1.5 g a day.",
                "In lab and animal studies, taurine affected mast cell related pathways including PPAR-gamma and SOD3.",
                "Our taurine is chemically synthesized, not fermented, which avoids the microbial process that can introduce histamine or tyramine contamination."
            ]
        },
        howItWorks: "Taurine has several mechanisms of action that are being studied, including effects on mast cell signaling, cardiovascular function, and connective tissue enzymes.\n\nIn lab and animal studies, taurine activated PPAR-gamma receptors and increased an antioxidant enzyme called SOD3, pathways related to mast cell signaling. \n\nA meta-analysis of 20 human trials found that taurine modestly reduces heart rate and blood pressure, though the exact mechanism in humans was not directly measured in these trials. \n\nA human trial in elderly women found that 1.5 g of daily oral taurine was associated with a decrease in MMP-9, an enzyme involved in breaking down collagen. Lab studies on skin cells show taurine can increase hyaluronic acid production, though these used concentrations far above what oral supplementation reaches in the skin.",
        research: [
            {
                outcome: "Heart Rate and Blood Pressure",
                summary: "A meta-analysis of 20 randomized trials in mixed populations found modest reductions in heart rate and blood pressure with taurine supplementation, which is why we suggest checking both when you start.",
                studies: [
                    { source: "Tzang et al., \"Meta-analysis of 20 RCTs (n=808)\"", pmid: "39148075", design: "Meta-analysis (2024)", finding: "Heart rate: -3.58 bpm (p=0.004), Systolic BP: -4.00 mmHg (p=0.017)." }
                ]
            },
            {
                outcome: "MMP Inhibition (Connective Tissue)",
                summary: "One small human trial found a reduction in a collagen-degrading enzyme (MMP-9) with taurine supplementation.",
                studies: [
                    { source: "Chupel et al., \"1.5 g/day for 14 weeks lowered blood MMP-9 in older women (small trial)\"", pmid: "33586039", design: "Human controlled trial, 48 older women, 4 groups (2021)", finding: "In this trial, MMP-9 and myeloperoxidase levels decreased within the group taking 1.5 g of taurine daily, though the abstract does not report a comparison against a placebo group." }
                ]
            },
            {
                outcome: "Mast Cell Signaling (Lab and Animal Studies)",
                summary: "Lab and animal studies point to several pathways by which taurine may calm mast cell signaling.",
                studies: [
                    { source: "Zhou et al., \"↑ SOD3 via PPAR-γ; ↓ mast cell infiltration\"", pmid: "32417836", finding: "In an animal study, taurine lowered inflammatory cytokines and mast cell numbers in nasal tissue." },
                    { source: "Nam et al., \"Inhibited TSLP in a human mast cell line (lab study)\"", pmid: "28694089", finding: "Significant inhibition of key mast cell signaling pathways (NF-κB, JNK, p38)." }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials exist specifically in hEDS, POTS, or MCAS populations. The cardiovascular benefits are extrapolated from hypertensive and heart failure populations. Cardiometabolic benefits appear more consistently at doses of 1.5 to 3.0 grams per day in the research reviewed, though the evidence does not establish that lower doses produce no effect at all.",
        triad: {
            mcas: "No clinical trial has tested taurine in people with MCAS. The taurine in this product is made by chemical synthesis, not fermentation, which avoids the histamine and tyramine contamination risk associated with some fermentation-derived amino acids. Residue testing for histamine and tyramine has not been performed on this material.",
            heds: "No clinical trial has tested taurine in people with hEDS.",
            pots: "Because it can lower blood pressure slightly, it should be used with more caution in the hypotensive 'fainting' POTS subtype.",
        },
        whyThisForm: {
            form: "Synthetic taurine powder (non-fermentation, USP38/JP17), up to 0.5% silica anticaking agent",
            rationale: "Taurine is made by chemical synthesis, not fermentation, which avoids the microbial process that can leave behind histamine or tyramine. The raw material carries up to 0.5% silica as an anticaking agent (up to 7.5 mg per day), which we disclose. We chose the powder form because the 1,500 mg amount would require several large capsules. Research suggests that cardiovascular benefits are more consistently seen at doses of 1.5 grams per day and above, which is why we chose this amount.",
            comparison: [
                { form: "Fermentation-derived Taurine", difference: "Fermentation-derived taurine can carry trace histamine or tyramine, which some sensitive individuals prefer to avoid.", selected: false },
                { form: "Synthetic Taurine", difference: "Chemically pure, made without a fermentation step that could introduce histamine or tyramine residues.", selected: true }
            ]
        },
        safety: {
            sideEffects: "Taurine has a good safety record in trials, and European food safety assessors have described intakes up to 6 g a day as not a safety concern, four times our daily amount. If you have or have had a myeloid blood cancer, talk with your oncologist before using taurine. Mild digestive effects such as stomach upset or diarrhea have occurred in a small trial at a dose lower than ours, so they are possible at typical doses too.",
            interactions: "No study has tested taurine together with beta-blockers or ivabradine. Based on taurine's own effect on heart rate in trials (about 3.6 beats per minute lower on average), there could be some additional heart-rate lowering when combined. Check your resting heart rate when starting either, and tell your prescriber. Fludrocortisone/Midodrine: May partially oppose the blood-pressure raising effects of these medications.",
            excipientConcerns: {
                avoid: ["Animal-derived gelatin", "Fermented sources"],
                safe: ["Synthetic taurine powder with up to 0.5% silica anticaking agent", "Rice hull concentrate (flow agent in the Daily Powder)"]
            },
            cautions: "Taurine can lower blood pressure slightly, so if you tend to run low, check your blood pressure more closely when you start. If you notice new anxiety, jitteriness, or trouble sleeping after starting taurine, stop use and check with your healthcare provider."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "Start with a small sprinkle, building to half a scoop once a day (375 mg taurine).", notes: "Assess tolerance" },
                { step: "Week 2", dosage: "Half a scoop twice a day (750 mg taurine a day).", notes: "Standard titration" },
                { step: "Week 3", dosage: "Build up to one scoop twice a day (750 mg taurine each time).", notes: "Building to target" },
                { step: "Week 4+", dosage: "750 mg twice daily", notes: "Total 1,500 mg/day" }
            ],
            timeline: "The MMP-9 trial gave taurine daily for 14 weeks, and the mast cell research was done in lab and animal studies, so there is no timeline for effects in people."
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
        patientSummary: "A 2024 Danish study of patients with an unexplained bleeding tendency found they were about 6 times more likely than healthy controls to have suboptimal or low vitamin C. And vitamin C isn't optional for collagen - it's the cofactor that lets your body's collagen-stabilizing enzymes actually work. In one small trial, a single 2 g dose of vitamin C raised DAO, an enzyme that breaks down histamine. We use sodium ascorbate, which is buffered to a gentler, near neutral pH than acidic ascorbic acid. Each scoop also provides about 105 mg of sodium.",
        whyThisFormPatient: "We use sodium ascorbate - vitamin C buffered to roughly neutral pH - rather than acidic ascorbic acid. We provide 1,500 mg of vitamin C a day as sodium ascorbate, an amount that fully covers the collagen cofactor need and also adds a little sodium. Vitamin C supplements do raise urinary oxalate somewhat, so see the kidney stone note below.",
        faq: [
            { q: "Why sodium ascorbate instead of regular vitamin C?", a: "Plain ascorbic acid is acidic, which some people find harder on a sensitive stomach. Sodium ascorbate is buffered to roughly neutral pH, so it sits gently. Each scoop also provides about 105 mg of sodium. Same vitamin C molecule, paired with sodium, which makes it much less acidic." },
            { q: "Will high-dose vitamin C give me kidney stones?", a: "The kidney stone risk comes from vitamin C metabolism producing oxalate. Vitamin C supplements raise urinary oxalate, which may slightly increase kidney stone risk, mainly in men; the risk has not been shown to increase for women. Anyone with a personal or family history of calcium oxalate stones should mention their vitamin C dose to their doctor. The dose we use is set to cover enzyme cofactor needs; as with any vitamin C supplement, it does modestly raise urinary oxalate, which is why we note the stone-history caution above." },
            { q: "What does research show about vitamin C and histamine?", a: "Two kinds of studies have looked at this. Vitamin C may support DAO, the enzyme that breaks down histamine in your gut; in one small trial in 70 volunteers, a single 2 g dose raised blood DAO levels within an hour. Older observational research suggests that histamine levels tend to rise as plasma vitamin C drops very low." },
            { q: "How much vitamin C is too much?", a: "Past about 200-400 mg/day, your collagen-producing enzymes are fully saturated - more vitamin C doesn't make more collagen. DAO and antioxidant-related effects have not been clearly shown to scale further beyond collagen-saturating doses. Beyond what your body can use, extra vitamin C is mostly excreted, and higher doses do measurably raise urinary oxalate. We chose a dose intended to cover collagen and DAO cofactor needs while staying below the general upper intake limit." }
        ],
        triadPlain: {
            mcas: "We chose sodium ascorbate because it is buffered to a gentler pH than plain ascorbic acid, and our powder contains no citric acid, an ingredient some sensitive individuals say they react to. Like all commercial vitamin C, ours is made with a fermentation step; we are confirming the sugar source before calling it corn-free.",
            heds: "Vitamin C is required for the hydroxylase enzymes that prepare new collagen chains; without it this step cannot proceed. Below the cofactor threshold, the enzymes idle; above it, they work at full speed. No randomized trial has tested vitamin C supplements for hypermobility-related outcomes.",
            pots: "Each scoop of sodium ascorbate provides about 105 mg of sodium (about 210 mg a day), which is worth counting if you track your salt intake. We include vitamin C for its role as a collagen cofactor; it is not intended to treat POTS."
        },
        bluf: "Vitamin C is the enzymatic cofactor for prolyl and lysyl hydroxylases, the enzymes that prepare collagen for folding. In a 2024 study, patients with an unexplained bleeding disorder had plasma vitamin C levels about 21% lower on average than healthy controls. In one small trial, a single 2 g dose of vitamin C raised DAO, an enzyme involved in histamine breakdown. ZebraThrive delivers 1,500 mg vitamin C daily as sodium ascorbate in the Daily Powder, a gentler form for sensitive stomachs.",
        atAGlance: {
            whatItIs: "An essential cofactor for collagen synthesis and a supporting factor in histamine breakdown.",
            whyWeIncludeIt: "Vitamin C is a cofactor for the enzymes that prepare collagen chains for crosslinking, and it may support DAO, an enzyme involved in histamine breakdown.",
            dose: "About 1,500 mg vitamin C daily as sodium ascorbate, in the Daily Powder, split AM and PM scoops",
            keyBenefits: [
                "",
                "Mandatory for prolyl and lysyl hydroxylation, which enables collagen triple-helix folding",
                "May support DAO activity involved in histamine degradation, based on a small trial of a single oral dose.",
                "Buffered form (sodium ascorbate) adds about 105 mg of sodium per scoop"
            ]
        },
        howItWorks: "Vitamin C is an essential cofactor for connective tissue because your body cannot make stable collagen without it.\n\nVitamin C is the cofactor for prolyl and lysyl hydroxylase, the enzymes that hydroxylate proline and lysine residues on newly made collagen chains. That hydroxylation is what allows the chains to fold into a stable triple helix. Without enough vitamin C, the folding step idles and the resulting tissue is weak and fragile. The downstream crosslinking step between mature collagen molecules is performed by lysyl oxidase, a copper-dependent enzyme, and is a separate process from vitamin C's role. A 2024 Danish study found patients with an unexplained bleeding disorder, many with joint hypermobility, had lower average plasma vitamin C than controls; the reason for this difference is not established.\n\nVitamin C is a water-soluble antioxidant. \n\nVitamin C is thought to help break down histamine and serves as a cofactor for DAO, an enzyme involved in histamine breakdown. A small oral study showed a single 2 g dose raised DAO activity, and a separate IV study found serum histamine fell by about 31% after infusion; the two findings come from different doses and routes.",
        research: [
            {
                outcome: "Vitamin C Status Study",
                summary: "",
                studies: [
                    { source: "Leinoe et al., \"Patients with bleeding disorder of unknown cause had lower plasma vitamin C than healthy controls\"", pmid: "39311717", design: "Danish cohort study (2024)", finding: "Patients with bleeding disorder of unknown cause showed about 21% lower average plasma vitamin C than healthy controls, and 32% had suboptimal or low levels versus 5% of controls." }
                ]
            },
            {
                outcome: "Collagen Synthesis & Wound Healing",
                summary: "",
                studies: [
                    { source: "Shaw et al., \"Vitamin C-enriched gelatin supplementation before intermittent activity augments collagen synthesis\"", pmid: "27852613", design: "Human Study (2017)", finding: "" },
                    { source: "Kjaer et al., \"Multinutrient supplementation (including vitamin C) increases collagen synthesis during early wound repair\"", pmid: "31897483", finding: "" }
                ]
            },
            {
                outcome: "Histamine and DAO Studies",
                summary: "In a controlled study, intravenous vitamin C was associated with reduced serum histamine and increased degradation enzyme activity.",
                studies: [
                    { source: "Hagel AF et al., \"Intravenous infusion of ascorbic acid decreases serum histamine concentrations\"", pmid: "23666445", design: "Human study, 89 patients, single 7.5 g IV infusion", finding: "Serum histamine fell from 0.83 to 0.57 ng/ml x m2 body surface area after IV ascorbic acid. IV route; oral doses do not reach these blood levels." },
                    { source: "Jarisch R et al., \"Impact of oral vitamin C on histamine levels and seasickness\"", pmid: "25095772", design: "Double-blind placebo-controlled crossover, 70 volunteers, single 2 g dose", finding: "A single 2 g oral dose raised blood diamine oxidase (DAO) levels (p<0.001); blood histamine was also higher afterward." }
                ]
            }
        ],
        evidenceGaps: "While lower vitamin C status has been observed in a cohort of patients with unexplained bleeding and joint hypermobility, no randomized clinical trial has tested whether vitamin C supplementation changes hypermobility-related outcomes. Studies of vitamin C in POTS mostly used IV doses, which are much higher than what can be absorbed through oral supplementation, so they do not apply to this product.",
        triad: {
            mcas: "We use buffered sodium ascorbate. Like all commercial vitamin C, it is made with a fermentation step; we are confirming the sugar source before calling it corn-free.",
            heds: "A required cofactor for making collagen. Our 1,500 mg daily amount is set above the level needed to saturate the collagen-building enzyme cofactor requirement.",
            pots: "By using the Sodium Ascorbate form, we provide about 210 mg of sodium per day (about 105 mg per scoop) alongside the Vitamin C.",
        },
        whyThisForm: {
            form: "Sodium Ascorbate (buffered; sugar source being confirmed)",
            rationale: "Standard ascorbic acid is acidic, which can be uncomfortable for sensitive digestive systems. Sodium ascorbate is pH-neutral (buffered), sparing the stomach. It also provides a small amount of sodium alongside the vitamin C, which some people find useful when increasing fluid and salt intake. All commercial vitamin C, including ours, is made by fermenting a sugar to 2-keto-L-gulonic acid and then converting it chemically; the final material is purified to over 99%. Some MCAS patients report reacting to corn-derived ingredients. We have asked our supplier to document the sugar source used in manufacturing, and we will not call this product corn-free until we have that confirmation. We deliver about 1,500 mg of vitamin C per day from sodium ascorbate, an amount at or above the level where collagen-cofactor enzymes are saturated. Vitamin C supplements do raise urinary oxalate somewhat at these doses, so if you have a personal or family history of calcium oxalate stones, discuss this with your doctor.",
            comparison: [
                { form: "Ascorbic Acid (plant sugar fermented; source not yet confirmed)", difference: "Highly acidic; feedstock source not always disclosed, which some MCAS patients prefer to avoid; can be harder on sensitive stomachs", selected: false },
                { form: "Sodium Ascorbate", difference: "Buffered to near-neutral pH; adds a small amount of sodium; sugar source being confirmed", selected: true }
            ]
        },
        safety: {
            sideEffects: "Vitamin C is well tolerated at this amount in long-term trials; see the kidney stone note for men and anyone with a stone history. The main effect is reaching 'bowel tolerance' (loose stools) if the dose is too high, which signifies you've exceeded your absorption limit. Our 1,500 mg daily dose sits below the 2,000 mg general upper limit and is split across the AM and PM Daily Powder scoops for tolerance.",
            interactions: "Propranolol: in a small 1995 study, 2 g of vitamin C given before propranolol lowered propranolol blood levels (peak about 28% lower, total exposure about 37% lower), and heart rate fell less than without vitamin C. That study used a single 2 g dose of ascorbic acid; we use 1,500 mg a day of vitamin C as sodium ascorbate, split into two 750 mg scoops. If you take propranolol, talk with your prescriber before starting. Taking the two at least 2 hours apart is the logical precaution, though spacing itself has not been tested. No study has checked metoprolol; the same spacing costs nothing. Anticoagulants: Vitamin C may slightly reduce warfarin's effect through an unclear mechanism; this has been seen even at lower doses, so ask your doctor about monitoring your INR if you take warfarin. Iron supplements: Enhances iron absorption (monitor if you have iron overload like Hemochromatosis). ",
            excipientConcerns: {
                avoid: ["Corn-derived fillers (source being confirmed)", "Synthetic dyes", "Citric acid (none added)"],
                safe: ["", "Sodium-buffered powder"]
            },
            cautions: "Monitor for iron overload if you have Hemochromatosis. For men, especially those with a personal or family history of calcium oxalate kidney stones, make sure to stay well hydrated (2.5 liters or more per day) and mention your vitamin C dose to your doctor. Research shows vitamin C supplements measurably raise urinary oxalate; this effect has not been shown in women."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "Start with a small sprinkle, building to half a scoop once a day (375 mg vitamin C).", notes: "Assess GI tolerance" },
                { step: "Week 2", dosage: "Half a scoop twice a day (750 mg vitamin C a day).", notes: "Standard titration" },
                { step: "Week 3+", dosage: "750 mg twice daily", notes: "Full target dose (1,500 mg/day, delivered in the Daily Powder split AM and PM)" }
            ],
            timeline: " Vitamin C's role as a collagen-building cofactor is an ongoing nutritional need, so continuing supplementation long-term makes sense as part of overall support."
        },
        sources: [
            { title: "Low vitamin C status and hypermobility-related disorders in patients with bleeding disorder of unknown cause", pmid: "39311717", authors: "Leinøe et al.", year: "2024" },
            { title: "Intravenous infusion of ascorbic acid decreases serum histamine concentrations in patients with allergic and non-allergic diseases", pmid: "23666445", authors: "Hagel AF et al.", year: "2013" },
            { title: "Vitamin C + gelatin doubled collagen synthesis markers", pmid: "27852613", authors: "Shaw et al.", year: "2017" },
            { title: "Impact of oral vitamin C on histamine levels and seasickness", pmid: "25095772", authors: "Jarisch R et al.", year: "2014" },
            { title: "Influence of vitamin C on the absorption and first pass metabolism of propranolol", pmid: "7589058", authors: "Gonzalez JP et al.", year: "1995" }
        ]
    },
    "vitamin-d3": {
        id: "vitamin-d3",
        name: "Vitamin D3 (Cholecalciferol)",
        patientSummary: "Vitamin D3 (cholecalciferol) is the form your skin produces in response to sunlight and the form most studied in human trials. Vitamin D supports normal bone health and normal immune function. In lab studies using cell lines and mouse mast cells, active vitamin D reduced IgE-dependent mast cell activation. We use vegan vitamin D3 from lichen at 2,000 IU (50 mcg) in the AM capsule with K2; both are fat-soluble and better absorbed with breakfast fat.",
        whyThisFormPatient: "We use vegan D3 (cholecalciferol) made from lichen, not the usual lanolin (sheep's wool) source, supplied as a dry powder (100,000 IU per gram on a small maltodextrin carrier) in the AM capsule. We use D3 rather than D2 because a meta-analysis of trials found D3 raised blood vitamin D levels more than D2, mainly when taken in larger, less frequent doses. The 2,000 IU dose is a common daily supplement amount and is half the 4,000 IU daily upper limit set for adults, which keeps it conservative for long-term use. We pair D3 with K2 in the same AM capsule. D3 helps your body absorb calcium, and K2 activates proteins (osteocalcin and matrix Gla protein) involved in normal calcium use in bone and blood vessels. Take with breakfast fat for absorption.",
        faq: [
            { q: "Do I really need to supplement vitamin D?", a: "Many people do not get enough vitamin D from sun and food. A blood test is the best way to know your own level. Less time outdoors can lower vitamin D levels. 2,000 IU a day is half the 4,000 IU daily upper limit for adults." },
            { q: "Will I need a higher D3 dose than 2,000 IU?", a: "Possibly. 2,000 IU a day is a conservative amount. How much it raises your blood level depends on your starting level, body size and other factors, so a blood test is the best guide. If your level is low, your clinician may recommend a higher dose for a period of time. Your clinician can check your blood level of 25(OH)D before you start and after about 3 months, and advise whether any extra vitamin D is needed. The dose isn't one-size-fits-all; testing is the way to dial it in." },
            { q: "Why D3 and K2 together?", a: "They work as a pair: D3 helps your body absorb calcium, and K2 (MK-7) activates proteins involved in normal calcium use in bone and blood vessels. Both D3 and K2 are in the AM capsule." },
            { q: "What about vitamin D and mast cells?", a: "The data is complex. Lab studies show vitamin D can act on mast cells through the vitamin D receptor. In one German study of people with MCAS, vitamin D levels were better than in the general population. Vitamin D does not cause or cure MCAS. Its effects on mast cells have been shown only in lab and animal studies. Vitamin D is part of the formula for general nutritional support, not as a treatment." }
        ],
        triadPlain: {
            mcas: "No randomized trials have tested vitamin D in adults with MCAS, and in some MCAS groups vitamin D levels were better than in the general population. A few people with mast cell conditions have reacted when starting vitamin D. If you are sensitive to new supplements, talk with your clinician about how to start.",
            heds: "Vitamin D supports normal bone health. No trials have tested vitamin D in people with EDS. It is in the formula for general nutritional support, paired with K2 in the AM capsule.",
            pots: "No randomized trials have tested vitamin D in adults with POTS. Vitamin D is in the formula for general nutritional support. No study has tested vitamin D3 with common POTS medications."
        },
        bluf: "Vitamin D3 is a fat-soluble vitamin that regulates calcium, supports immune function, and has been studied for effects on mast cells in lab studies. ZebraThrive uses 2,000 IU (50 mcg) of vegan, lichen-derived D3 daily in the AM capsule, together with vitamin K2.",
        atAGlance: {
            whatItIs: "A fat-soluble vitamin that supports normal calcium absorption and normal immune function.",
            whyWeIncludeIt: "Included to help maintain healthy vitamin D levels and support normal immune function.",
            dose: "2,000 IU (50 mcg) daily in the AM capsule",
            keyBenefits: [
                "Vegan D3 from lichen (not lanolin), supplied as a dry powder",
                "In lab studies using cell lines and mouse mast cells, active vitamin D reduced IgE-dependent mast cell activation.",
                "",
                ""
            ]
        },
        howItWorks: "Vitamin D acts as a hormone in the body and has roles in bone, muscle and immune function. \n\nIn lab studies, vitamin D helped keep mast cells stable. Mast cells express both vitamin D receptors (VDR) and the enzyme CYP27B1, enabling local conversion to active calcitriol. In lab studies, vitamin D metabolites reduced the release of inflammatory messengers such as TNF-alpha from mast cells.\n\n ",
        research: [
            {
                outcome: "Pediatric POTS Cohort (Retrospective)",
                summary: "",
                studies: [
                    {
                        source: "Dong T et al., Lanzhou University (Zhonghua Er Ke Za Zhi, 2025)",
                        pmid: "40962545",
                        design: "Retrospective case-control (no placebo); 65 children with POTS, 102 healthy controls",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Orthostatic Hypotension Risk",
                summary: "",
                studies: [
                    {
                        source: "Zuin et al.",
                        pmid: "34628636",
                        design: "Meta-analysis of 8 studies, 16,326 older adults",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Mast Cells (Lab Studies)",
                summary: "Lab studies in cell lines and mouse mast cells show active vitamin D reduces mast cell activation through the vitamin D receptor.",
                studies: [
                    {
                        source: "Liu et al.",
                        pmid: "27998003",
                        finding: "In lab studies of cell lines and mouse mast cells, active vitamin D reduced IgE-triggered activation signals and TNF-alpha production."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct RCTs specifically in adult hEDS, POTS, or MCAS populations. Some findings are counterintuitive (e.g., higher vitamin D status in some MCAS cohorts). Autonomic findings come mainly from children and from adults with other health conditions.",
        triad: {
            mcas: "Vitamin D is usually well tolerated, but a few people with mast cell conditions have reacted to it. If you are sensitive to new supplements, talk with your clinician about how to start.",
            heds: " Vitamin D supports normal bone health. It is paired with K2, which activates proteins involved in normal calcium use.",
            pots: "No randomized trials have tested vitamin D in adults with POTS."
        },
        whyThisForm: {
            form: "Vegan D3 (cholecalciferol) from lichen, 100,000 IU/g powder, in the AM capsule",
            rationale: "A meta-analysis found D3 raised blood vitamin D more than D2, mainly with larger, less frequent doses. We use vegan, lichen-derived D3 rather than the common lanolin (sheep's wool) source, for people avoiding animal-derived ingredients, including those with alpha-gal concerns. It is supplied as a dry powder at 100,000 IU per gram. Each daily serving uses about 21 mg of this powder, which includes about 18 mg of maltodextrin carrier and trace amounts of vitamin C and vitamin E as antioxidants. Vitamin D is fat-soluble, so take the AM capsule with a meal that contains fat.",
            comparison: [
                { form: "Vegan D3 (cholecalciferol) from lichen, dry powder", difference: "Our form; animal-free; fits a dry-fill capsule", selected: true },
                { form: "D3 from lanolin (sheep's wool)", difference: "Common D3 source; animal-derived", selected: false },
                { form: "D2 (Ergocalciferol)", difference: "Raised blood levels less than D3 in a meta-analysis, mainly with large doses", selected: false },
                { form: "Oil-based liquid or softgel D3", difference: "Not compatible with our dry HPMC capsule; softgels often use gelatin", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. Taking much more vitamin D than this formula provides can raise blood calcium. Do not add extra vitamin D without talking with your clinician. A few people with mast cell conditions have reacted when starting vitamin D. If you react, stop and talk with your clinician.",
            interactions: "No study has tested vitamin D3 with common POTS/MCAS medications, including H2 blockers such as famotidine. In people, vitamin D3 did not change a marker of CYP3A, the liver enzyme that clears ivabradine, so no effect on ivabradine is expected, though the pair is untested. Thiazide diuretics require calcium monitoring.",
            excipientConcerns: {
                avoid: ["FD&C dyes", "Titanium dioxide", "Carrageenan (capsule shell confirmation pending)", "Corn starch (none added; the plant source of the maltodextrin carrier is being confirmed)", "BHA/BHT", "Gelatin softgels"],
                safe: ["Lichen-derived (vegan) cholecalciferol", "Maltodextrin micro-carrier (about 18 mg; plant source being confirmed), with trace vitamin C and vitamin E as antioxidants (vitamin E source being confirmed)", "HPMC capsules"]
            },
            cautions: "Monitor serum 25(OH)D levels (target 40-60 ng/mL). Check serum calcium if taking high doses (>4,000 IU)."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "The full AM serving (3 capsules) provides 2,000 IU (50 mcg). If you are sensitive to new supplements, talk with your clinician about how to start.", notes: "Full AM serving" },
                { step: "Weeks 3-4", dosage: "2,000 IU daily", notes: "Standard maintenance" },
                { step: "Ongoing", dosage: "The formula provides 2,000 IU (50 mcg) daily. Any extra vitamin D should be based on blood tests and agreed with your clinician.", notes: "Adjust based on labs" }
            ],
            timeline: "Blood-level repletion takes 8-12 weeks. Take with a fat-containing meal."
        },
        sources: [
            
            
            { title: "Vitamin D suppresses IgE-dependent mast cell activation", pmid: "27998003", authors: "Liu et al.", year: "2017" },
            { title: "Vitamin D and autonomic function", pmid: "38747749", authors: "Faria et al.", year: "2024" },
            { title: "Vitamin D deficiency in vascular EDS", pmid: "27488172", authors: "Busch et al.", year: "2016" }
        ]
    },
    "vitamin-k2": {
        id: "vitamin-k2",
        name: "Vitamin K2 (MK-7)",
        patientSummary: "Vitamin K2 (MK-7) is the cofactor that activates osteocalcin and matrix Gla protein, proteins involved in normal calcium use in bone and blood vessels. We include K2 alongside D3: D3 helps your body absorb calcium, and K2 activates proteins involved in normal calcium use. In a 1975 study, vitamin K2 reduced mast cell degranulation in rats, and blood basophils from people who had taken it for a long time were slightly less reactive. K2 also supports normal bone health. Important: K2 is contraindicated with warfarin.",
        whyThisFormPatient: "We use MK-7 (menaquinone-7) specifically, not MK-4 or short-chain forms. MK-7 stays in the blood for a long time (half-life about 3 days), so one daily dose keeps blood levels steady. MK-4 at the same dose was not detectable in blood in a study of healthy women. The 100 mcg dose is within the clinical trial range (45-720 mcg daily, up to 24 months in human studies). Sourcing matters for MCAS: we use all-trans MK-7 made synthetically from geraniol (a plant-derived starting material) on a microcrystalline cellulose carrier, not natto- or soy-derived and not fermentation-derived. Natto is fermented soy, so natto-derived MK-7 carries soy and fermentation concerns; the synthetic all-trans molecule avoids both.",
        faq: [
            { q: "MK-7 vs MK-4 and vitamin K1: why MK-7?", a: "Vitamin K comes in two main forms: K1 (phylloquinone) from leafy greens and K2 (menaquinones) from fermented foods and animal sources. Both activate vitamin K-dependent proteins. K2 has several subforms (MK-4, MK-7, MK-9, etc.) defined by the length of their isoprenoid tails. MK-7 has a long half-life and activated osteocalcin more completely than vitamin K1 in a study of healthy volunteers. For maintenance dosing, MK-7 is the standard supplement choice." },
            { q: "I'm on warfarin - can I take this?", a: "No. This is the one absolute contraindication for K2 supplementation. Warfarin works by blocking vitamin K-dependent clotting factor activation; supplementing K2 directly opposes warfarin's mechanism and can destabilize INR control with serious clinical consequences. The same applies to other vitamin K antagonists. If you take warfarin or another vitamin K antagonist, do not take the AM capsules, which contain vitamin K2. Talk with your prescriber before you start or change anything." },
            { q: "Why not natto-derived MK-7?", a: "Many MK-7 supplements are made from natto. Natto is a fermented food that can contain histamine and tyramine. We avoid natto-derived MK-7 so that question does not arise. Natto is also soy, one of our excluded allergens. Synthetic all-trans MK-7 made from geraniol is the same molecule without the soy or fermentation baggage, which is why it is the only form we use." },
            { q: "What is known about K2 and mast cells?", a: "The mast cell research on K2 is limited to one study from 1975 in rats and in blood cells from people who had taken K2 for a long time. K2 has not been studied in people with mast cell conditions. K2 is not one of the main reasons the formula was designed; it is in the formula mainly to pair with D3." }
        ],
        triadPlain: {
            mcas: "Vitamin K2 has not been studied in people with mast cell conditions, and the mast cell research that exists is from 1975. K2 is in the formula mainly to pair with D3. Sourcing matters: we use synthetic all-trans MK-7 from geraniol, not natto-derived, because natto is fermented soy.",
            heds: "K2 activates matrix Gla protein and osteocalcin, proteins involved in normal calcium use in bone. K2 has not been studied in people with hEDS. Studies of vitamin K in a mouse model of pseudoxanthoma elasticum, another connective tissue disorder, were negative. In trials, MK-7 has been well tolerated, with no serious side effects reported.",
            pots: " K2 activates matrix Gla protein, a protein found in blood vessel walls. There is no direct POTS clinical evidence for K2. K2 is in the formula mainly to pair with D3 and for normal bone support. "
        },
        bluf: "Vitamin K2 (MK-7) activates proteins involved in normal calcium use in bone and blood vessels. It pairs with D3, which increases calcium absorption. ZebraThrive uses 100 mcg of synthetic all-trans MK-7 (not natto or soy derived) daily in the AM capsule.",
        atAGlance: {
            whatItIs: "A fat-soluble vitamin that activates proteins involved in normal calcium use.",
            whyWeIncludeIt: "Included to pair with D3 and to activate proteins involved in normal calcium use.",
            dose: "100 mcg MK-7 daily in the AM capsule",
            keyBenefits: [
                "Activates matrix Gla protein, a vitamin K-dependent protein in blood vessel walls",
                "In a 1975 rat study, K2 reduced mast cell degranulation",
                "",
                "Superior 72-hour half-life vs MK-4"
            ]
        },
        howItWorks: "Vitamin K2 activates matrix Gla protein (MGP), a protein in blood vessel walls, and osteocalcin, a protein in bone. K2 is paired with D3, which helps your body absorb calcium.\n\nIn bone, K2 activates osteocalcin. In a lab study of bone-forming cells, vitamin K2 increased collagen build-up through the SXR receptor. Regarding mast cells, a 1975 study found menaquinone inhibited degranulation of rat mesenteric mast cells, and basophils from people who had taken it long-term were less reactive. This is older mechanism work that needs modern replication.",
        research: [
            {
                outcome: "Mast Cells (1975 Study)",
                summary: "Older (1975) mechanism research; modern replication is needed.",
                studies: [
                    {
                        source: "Kimura I et al., 1975",
                        pmid: "126001",
                        design: "Rat mast cell experiments plus basophils from treated patients",
                        finding: "Menaquinone significantly inhibited degranulation of rat mesenteric mast cells; basophils from patients given menaquinone long-term showed modestly reduced degranulation, while adding menaquinone directly to cells in vitro did not."
                    }
                ]
            },
            {
                outcome: "MMP Inhibition (Collagen Protection)",
                summary: "",
                studies: [
                    {
                        source: "Abdel-Rahman MS",
                        pmid: "26073022",
                        design: "Clinical study, n=84 (42 MK-7, 42 no MK-7), rheumatoid arthritis",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Vascular Elasticity",
                summary: "A 3-year trial in healthy postmenopausal women found MK-7 (180 mcg a day) improved arterial stiffness.",
                studies: [
                    {
                        source: "Knapen et al.",
                        pmid: "25694037",
                        design: "3-year RCT, n=244",
                        finding: "cfPWV and Stiffness Index beta improved; measures of elasticity improved in women with stiffer arteries at the start (180 mcg a day)."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct evidence in hEDS, POTS, or MCAS populations. Mast cell evidence is historical (1975) and requires modern replication. No studies have measured autonomic markers, and only one small exercise study has looked at heart rate.",
        triad: {
            mcas: "Fermentation sources (natto) can carry histamine and are soy-derived, so we use synthetic all-trans MK-7 made from geraniol instead.",
            heds: "K2 has not been studied in people with hEDS.",
            pots: "There is no direct POTS clinical evidence for K2."
        },
        whyThisForm: {
            form: "MK-7 (menaquinone-7), all-trans, synthetic from geraniol, 1% on microcrystalline cellulose",
            rationale: "MK-7 is better absorbed than MK-4 at supplement doses: in healthy women, 420 mcg of MK-7 was easily measured in blood while MK-4 was not detectable. Our MK-7 is all-trans and made synthetically from geraniol (a plant-derived starting material), supplied at 1% on a wood-pulp microcrystalline cellulose carrier. It is not natto- or soy-derived and not fermentation-derived.",
            comparison: [
                { form: "Synthetic all-trans MK-7 (geraniol-derived, on MCC)", difference: "Our form; 72-hour half-life; once-daily dosing; soy-free and non-fermented", selected: true },
                { form: "Natto-derived MK-7", difference: "Fermented soy source; soy allergen and fermentation concerns; not used", selected: false },
                { form: "MK-4 (Menaquinone-4)", difference: "Not detectable in blood at supplement doses in a study of healthy women", selected: false }
            ]
        },
        safety: {
            sideEffects: "In trials lasting up to 3 years, MK-7 was well tolerated, with no serious side effects reported. Does not increase bleeding risk at standard doses.",
            interactions: "CONTRAINDICATED with warfarin/vitamin K antagonists. No study has tested K2 with beta-blockers, fludrocortisone, or MCAS stabilizers; none of these drugs acts on the vitamin K cycle.",
            excipientConcerns: {
                avoid: ["Povidone", "Sodium lauryl sulfate", "PEG", "Magnesium stearate"],
                safe: ["HPMC capsules", "Rice hull concentrate", "Cellulose", "Microcrystalline cellulose (the K2 carrier)"]
            },
            cautions: "Absolutely avoid if on warfarin. Coagulation safety confirmed at 90μg doses in healthy volunteers."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "The full AM serving (3 capsules) provides 100 mcg of MK-7. If you are sensitive to new supplements, talk with your clinician about how to start.", notes: "Full AM serving" },
                { step: "Week 3+", dosage: "100 mcg daily", notes: "Formula amount" }
            ],
            timeline: "Take with a meal that contains fat."
        },
        sources: [
            { title: "Mast cell stabilization by menaquinone", pmid: "126001", authors: "Kimura I et al.", year: "1975" },
            
            { title: "3-year MK-7 arterial stiffness trial", pmid: "25694037", authors: "Knapen MH et al.", year: "2015" },
            { title: "MK-7 vs MK-4 bioavailability comparison", pmid: "23140417", authors: "Sato T et al.", year: "2012" },
            { title: "Coagulation safety with MK-7", pmid: "34115006", authors: "Ren et al.", year: "2021" }
        ]
    },
    "benfotiamine": {
        id: "benfotiamine",
        name: "Benfotiamine",
        patientSummary: "Benfotiamine is a fat-soluble form of vitamin B1 (thiamine), originally developed in Japan. In the gut it becomes a fat-soluble form that is absorbed more readily than thiamine HCl, which relies on transporters that can become limiting at higher doses. We dose 150 mg in the AM. ",
        whyThisFormPatient: "We use standard benfotiamine (S-benzoylthiamine O-monophosphate) at 150 mg per day. In a study of 20 dialysis patients (Frank 1999), a single 100 mg dose brought a blood marker of thiamine-dependent enzyme activity back toward normal; 150 mg a day gives margin above that. Going higher has not shown added benefit: the 2026 BOND trial gave 600 mg a day for 12 months to adults with type 2 diabetes and nerve damage and found no difference from placebo. ",
        faq: [
            { q: "Benfotiamine vs regular thiamine - what's the difference?", a: " Benfotiamine is converted in the gut to a form that crosses the intestinal lining more easily, then converts back to thiamine inside the body. In studies, this produced peak blood thiamine levels about 5 times higher and total exposure up to 3.6 times higher than thiamine HCl, with red blood cell TDP about 2 times higher. " },
            { q: "I've heard about thiamine deficiency in POTS - does this address that?", a: "Partially. A 2017 chart review at one clinic found low B1 in about 4 of 65 people with POTS (6%), and the authors recommended testing for and correcting B1 deficiency. Benfotiamine at 150 mg/day covers daily B1 needs and gives some headroom for marginal deficiency. It's not a high-dose intervention in that sense: the 2026 BOND trial, 600 mg per day for 12 months in 57 adults with type 2 diabetes and nerve damage, showed no difference from placebo on autonomic measures. " },
            { q: "What does research show about benfotiamine and mast cells?", a: "There's no direct study testing benfotiamine on mast cells. Two rat studies of severe induced thiamine deficiency, plus one supporting animal study, found increased mast cell activity in the brain. These used severe deficiency, so they do not show an effect in people with normal B1 intake." },
            { q: "Is benfotiamine in the formula for nerve or headache support?", a: "No. Benfotiamine is here for daily B1 coverage and mitochondrial energy support. Studies in adults with diabetes have measured nerve-related endpoints at much higher doses (300-600 mg/day) with mixed results, and the 2026 BOND trial at 600 mg/day for a year did not show benefit on nerve function endpoints. We do not position benfotiamine, or this formula, for any nerve or headache condition." }
        ],
        triadPlain: {
            mcas: "No human study has tested benfotiamine with MCAS medications. Its sulfur structure is chemically distinct from sulfites, which makes it unlikely to bother people who are sensitive to sulfites.",
            heds: " Thiamine is the precursor to TPP (thiamine pyrophosphate), the cofactor for transketolase and pyruvate dehydrogenase, central enzymes in glucose metabolism and the Krebs cycle. Findings on connective tissue in diabetes models do not apply to hEDS, which has a different pathology, so we include benfotiamine for B1 coverage and normal energy production, not for connective tissue.",
            pots: "Benfotiamine has not been studied in people with POTS, and no human study has tested it with POTS medications. In a 24 month study of 300 mg daily, diastolic blood pressure rose slightly, so monitor your blood pressure when you start."
        },
        bluf: "Benfotiamine is a fat-soluble form of vitamin B1 (thiamine). In human studies, peak blood thiamine was about 5 times higher than with standard thiamine, and the working form in red blood cells was about 2 times higher. It supports mitochondrial energy production. ZebraThrive uses 150 mg daily.",
        atAGlance: {
            whatItIs: "A fat-soluble form of vitamin B1 (thiamine) that gives peak blood thiamine about 5 times higher, and red-cell TDP about 2 times higher, than thiamine HCl",
            whyWeIncludeIt: "",
            dose: "150 mg daily in the AM capsule",
            keyBenefits: [
                "Peak blood thiamine about 5 times higher, red-cell TDP about 2 times higher, than thiamine HCl",
                "",
                "Supports Krebs cycle and energy production",
                ""
            ]
        },
        howItWorks: "Benfotiamine is fat-soluble, and studies show it raises red blood cell levels of the active thiamine form by about 2 times compared to standard thiamine. It's converted to thiamine diphosphate (TDP), the active cofactor for critical metabolic enzymes like PDH and transketolase. These support pathways your body uses for energy production, including the pentose phosphate pathway and the Krebs cycle.\n\n Lab studies show benfotiamine can block NF-kB signaling, though a 24 month human trial found no change in inflammatory markers. ",
        research: [
            {
                outcome: "Autonomic Function / HRV",
                summary: "",
                studies: [
                    {
                        source: "",
                        design: "",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Thiamine Status in POTS",
                summary: "",
                studies: [
                    {
                        source: "Blitshteyn",
                        pmid: "28531358",
                        design: "Retrospective analysis",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Dose-Ranging Human Data (BENDIP)",
                summary: "A randomized trial in adults with diabetic polyneuropathy compared two benfotiamine doses with placebo. We cite it for dose and tolerability context, not as a claim for any condition.",
                studies: [
                    {
                        source: "Stracke H et al. (BENDIP Trial)",
                        pmid: "18473286",
                        design: "Randomized, double-blind, placebo-controlled, 6 weeks; 165 adults randomized to 600 mg/day, 300 mg/day, or placebo",
                        finding: "In adults with diabetic polyneuropathy, the trial measured a neuropathy symptom score after 6 weeks; we cite it only for dose and tolerability. The trial did not test 100 mg or our 150 mg dose. Treatment was well tolerated."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct studies in non-diabetic dysautonomia or EDS. Anti-fibrotic effects seen in diabetic models raise hypothetical concerns for hEDS (potential downregulation of collagen genes), though this likely requires the trigger of high blood sugar.",
        triad: {
            mcas: " The chemical sulfur structure is distinct from sulfites, making it unlikely to trigger sulfur-sensitive patients. Choosing a high-purity source can help you avoid unnecessary added ingredients.",
            heds: "A precautionary approach is taken with dosing (150mg) due to hypothetical anti-fibrotic effects (decreasing collagen gene expression). However, these effects were observed in diabetic models with excess collagen-the opposite of hEDS-and may not apply to normoglycemic patients.",
            pots: " "
        },
        whyThisForm: {
            form: "Benfotiamine (Fat-soluble)",
            rationale: "Studies show benfotiamine reaches peak blood thiamine levels about 5 times higher than standard thiamine HCl. Studies show modest accumulation with repeat dosing, and the active form has a half-life of about 46 to 51 hours in the blood. You can take this with a meal if that's easiest for you.",
            comparison: [
                { form: "Benfotiamine", difference: "Peak blood thiamine about 5 times higher and red-cell TDP about 2 times higher than thiamine HCl in human studies; fat-soluble", selected: true },
                { form: "Thiamine HCl/Mononitrate", difference: "Water-soluble; relies on transporters that can become limiting at higher doses", selected: false },
                { form: "TTFD (Allithiamine)", difference: "", selected: false }
            ]
        },
        safety: {
            sideEffects: " In a 24 month study of 300 mg daily, the supplement was well tolerated, though diastolic blood pressure rose slightly. If you have POTS, monitor your blood pressure when you start.",
            interactions: "No human study has tested benfotiamine with POTS or MCAS medications, and nothing has been reported. Famotidine blocks a thiamine transporter in lab studies, but benfotiamine is absorbed by a different route, so little effect is expected (untested). Space apart from bile acid sequestrants or laxatives.",
            excipientConcerns: {
                avoid: ["Magnesium stearate", "Titanium dioxide"],
                safe: ["HPMC capsule shell", "Microcrystalline cellulose and maltodextrin (AM capsule fill)", "Rice hull concentrate and L-leucine (flow agents)"]
            },
            cautions: "Monitor blood pressure. Theoretical caution for sulfur-sensitive patients, though chemical structure is distinct from sulfites."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-4", dosage: "50 mg daily", notes: "Sensitive start" },
                { step: "Week 5+", dosage: "150 mg daily", notes: "Standard target dose (below anti-fibrotic threshold)" }
            ],
            timeline: ""
        },
        sources: [
            { title: "BENDIP: Benfotiamine in diabetic polyneuropathy RCT", pmid: "18473286", authors: "Stracke H et al.", year: "2008" },
            { title: "Vitamin B1 deficiency in POTS", pmid: "28531358", authors: "Blitshteyn S", year: "2017" },
            { title: "24-month benfotiamine safety in type 1 diabetes", pmid: "22446172", authors: "Fraser DA et al.", year: "2012" }
        ]
    },
    "p5p": {
        id: "p5p",
        name: "P5P (Pyridoxal-5-Phosphate)",
        patientSummary: "P5P is a phosphorylated form of vitamin B6. When you swallow it, your body breaks it down in the gut and then builds it back up again for your cells to use. P5P is a cofactor for several enzymes in the amine pathways, including one that makes histamine. Its overall effect on histamine levels in the body is not established. DAO (diamine oxidase), the main enzyme that breaks down histamine in your gut, depends on copper, not B6. A 2024 conference abstract (Seidl et al., Clinical Chemistry) reported a link between blood B6 above 20 ug/L and better histamine clearance with a DAO supplement; it has not been published as a full study and does not set a dose. P5P also supports neurotransmitter synthesis (GABA, serotonin, dopamine). Our AM capsule provides 3 to 4 mg of vitamin B6 (final amount being set) as P5P; the draft Supplement Facts panel will declare the final amount.",
        faq: [
            { q: "P5P vs B6: what is the difference?", a: "P5P is a phosphorylated form of vitamin B6. Once swallowed, it is broken down in the gut and then re-activated in the body for your cells to use. One safety point applies to every form: high long-term vitamin B6 intake has been linked to peripheral neuropathy, and EFSA's 2023 upper intake level (12 mg/day of total vitamin B6 for adults) applies to all forms, including P5P. Our AM capsule provides 3 to 4 mg of vitamin B6 (final amount being set), well under the EFSA upper level of 12 mg per day for adults, all forms. If you take other B6-containing supplements, count them too, and stop and tell your clinician if you notice tingling or numbness." },
            { q: "How does P5P relate to histamine?", a: "P5P is a coenzyme for histidine decarboxylase and several other enzymes in the amine pathways. DAO itself, the enzyme that breaks histamine down in your gut, is primarily copper-dependent (with TPQ as its organic cofactor) rather than B6-dependent. " },
            { q: "Is there mast cell research on P5P?", a: " A 2022 lab study found that pyridoxine, combined with vitamin C, affected rat mast cells in a lab setting, at concentrations far higher than what is reached in the human body from typical intake. An older 1979 lab study also looked at pyridoxine's effects on rat mast cells. We don't lead with mast cell effects for P5P. The lab data on this comes from pyridoxine in rat cells at concentrations far above what is reached in the human body, not from P5P itself." },
            { q: "Will P5P interact with my medications?", a: "At 3 to 4 mg of vitamin B6 (final amount being set), there is no data on interactions with POTS or MCAS medications, and a low interaction rating with escitalopram, amitriptyline, and combined oral contraceptives. The main one to know: levodopa (for Parkinson's). High-dose B6 increases the conversion of levodopa to dopamine before it can cross the blood-brain barrier, reducing its effectiveness. Carbidopa blocks this interaction, so if you're on Sinemet (carbidopa/levodopa), the interaction is manageable. High-dose B6 may lower blood levels of some anti-seizure medicines, such as phenobarbital and phenytoin. If you take one, ask your prescriber about monitoring. No study has tested P5P with standard POTS, MCAS, or hEDS medications and none has reported a problem; that means unknown rather than proven safe." }
        ],
        triadPlain: {
            mcas: "There are no randomized trials of P5P in people with MCAS. P5P is a cofactor for the enzyme that makes histamine, so its overall effect on histamine levels in the body is not established.",
            heds: "There are no direct randomized trials of P5P in people with hEDS. P5P is not a direct cofactor for lysyl oxidase, the collagen cross-linking enzyme; copper is.",
            pots: "There are no direct randomized trials of P5P in people with POTS, and there is no data on interactions between P5P and POTS medications at this dose."
        },
        bluf: "P5P is the coenzyme form of vitamin B6. When taken by mouth, it's broken down to pyridoxal in the gut and reactivated by the body. B6 is a cofactor for enzymes involved in amine metabolism, including ones that make GABA, serotonin and dopamine, as well as histidine decarboxylase, which makes histamine. ZebraThrive uses 3 to 4 mg of vitamin B6 (final amount being set) daily in the AM capsule.",
        atAGlance: {
            whatItIs: "The coenzyme form of vitamin B6",
            whyWeIncludeIt: "Cofactor for amine-metabolism enzymes, including those involved in the histamine pathway; supports neurotransmitter synthesis.",
            dose: "3 to 4 mg of vitamin B6 (final amount being set) daily in the AM capsule",
            keyBenefits: [
                "Supporting cofactor for amine metabolism enzymes, including histidine decarboxylase, which is involved in histamine production.",
                "Supports GABA, serotonin, and dopamine synthesis",
                "",
                ""
            ]
        },
        howItWorks: "P5P is the biologically active form of B6. Standard B6 is converted in the body in multiple steps, but P5P skips the first of these steps. P5P is a supporting cofactor for several amine-metabolism enzymes, including histidine decarboxylase, which is involved in making histamine. DAO itself, the enzyme that breaks down histamine in the gut, is primarily copper-dependent (with TPQ as its organic cofactor); adequate B6 status supports the broader amine pathway that DAO operates within.\n\nBeyond the histamine pathway, P5P is required for the synthesis of GABA, serotonin, and norepinephrine. It is involved in over 100 enzymatic reactions, including those that convert excitatory glutamate to calming GABA.",
        research: [
            {
                outcome: "B6 Status and Histamine Handling",
                summary: " DAO itself is copper-dependent; B6 supports the broader amine pathway.",
                studies: [
                    {
                        source: "",
                        finding: ""
                    },
                    {
                        source: "Maintz & Novak",
                        pmid: "17490952",
                        finding: "Review of histamine intolerance: DAO is the main enzyme for breaking down ingested histamine. It does not establish B6 as a DAO cofactor."
                    }
                ]
            },
            {
                outcome: "Lab Study Findings",
                summary: "",
                studies: [
                    {
                        source: "Kazama et al.",
                        pmid: "35781358",
                        finding: "A lab study using pyridoxine on rat mast cells, at concentrations much higher than what's reached in the body, showed activity changes with increasing amounts."
                    }
                ]
            },
            {
                outcome: "Related Research",
                summary: "",
                studies: [
                    {
                        source: "Kovalchuk",
                        pmid: "40134906",
                        design: "Small trial: 68 adolescents who had experienced a fainting episode, open-label, given B6 together with folate, B12 and vitamin D.",
                        finding: ""
                    },
                    {
                        source: "Cui J et al., 2011",
                        pmid: "21078590",
                        design: "Human physiology study, healthy young volunteers, local forearm infusion of pyridoxine",
                        finding: "After pyridoxine was infused into the isolated forearm circulation, muscle sympathetic nerve activity and blood pressure responses to fatiguing handgrip were smaller than before; saline had no such effect. Heart rate variability was not measured, and this was IV infusion, not oral P5P."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct RCTs in hEDS or POTS populations. P5P also plays a role in histamine creation, so its net effect on histamine is unknown and optimal dosing isn't established. Misconception exists: P5P is NOT a direct LOX cofactor (copper is).",
        triad: {
            mcas: " The active form avoids the conversion step, but high total B6 intake carries a neuropathy risk in any form, including P5P.",
            heds: "No direct RCTs in hEDS populations.",
            pots: "No direct RCTs in POTS populations."
        },
        whyThisForm: {
            form: "P5P (Pyridoxal-5-Phosphate)",
            rationale: "Swallowed P5P is broken down to pyridoxal in the gut and re-activated in the body, a different path than pyridoxine HCl takes. It is not risk-free: EFSA's 2023 opinion sets an upper intake level of 12 mg/day of total vitamin B6 for adults, based on peripheral neuropathy, and that level applies to all forms including P5P. Our AM capsule provides 3 to 4 mg of vitamin B6 (final amount being set).",
            comparison: [
                { form: "P5P (Pyridoxal-5-Phosphate)", difference: "Active form; counts toward your total B6 intake.", selected: true },
                { form: "Pyridoxine HCl", difference: "Requires conversion; most B6 neuropathy reports involve high long-term pyridoxine intake", selected: false }
            ]
        },
        safety: {
            sideEffects: " High long-term vitamin B6 intake, in any form, has been linked to nerve damage such as tingling and numbness. EFSA's 2023 upper level is 12 mg per day of total B6 for adults, all forms. Stop and talk to your clinician if you notice tingling or numbness. ",
            interactions: "CONTRAINDICATED with Levodopa without carbidopa. Anticonvulsants may require monitoring. ",
            excipientConcerns: {
                avoid: ["Artificial colors", "Citric acid (none added)", "", "Magnesium stearate"],
                safe: ["Cellulose", "Rice hull concentrate", ""]
            },
            cautions: "Requires cool, dry storage as it is less stable than pyridoxine HCl. Aim for adequate B6 status, not high levels: high total B6 intake can cause nerve symptoms in any form, including P5P."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "", notes: "Conservative start" },
                { step: "Week 3+", dosage: "", notes: "" }
            ],
            timeline: " Take in the AM with breakfast."
        },
        sources: [
            { title: "Histamine and histamine intolerance (DAO/B6 review)", pmid: "17490952", authors: "Maintz L, Novak N", year: "2007" },
            { title: "P5P mast cell suppression, vitamin C synergy", pmid: "35781358", authors: "Kazama et al.", year: "2022" },
            { title: "The B6 paradox: pyridoxine disrupts GABA and cause neuropathy", pmid: "33912895", authors: "Hadtstein F, Vrolijk M", year: "2021" },
            { title: "Scientific opinion on the tolerable upper intake level for vitamin B6", pmid: "37207271", authors: "EFSA NDA Panel (Turck D et al.)", year: "2023" },
            { title: "Pyridoxal and collagen crosslinks in hip fracture", pmid: "16969591", authors: "Saito M et al.", year: "2006" }
        ]
    },
"astaxanthin": {
        id: "astaxanthin",
        name: "Astaxanthin",
        patientSummary: "Astaxanthin is the red carotenoid produced by Haematococcus pluvialis algae - the same molecule that gives salmon and flamingos their color. Lab studies also link it to mast cell and collagen-enzyme effects, but they used concentrations far higher than an oral dose reaches in the blood, so we do not claim those effects for this formula. Human skin trials at 3 to 6 mg are small and mixed. We use natural algal astaxanthin (not synthetic) as a beadlet, at 4 mg of active astaxanthin daily in the PM capsule, within the dose range of the clinical literature.",
        whyThisFormPatient: "We use natural astaxanthin extracted from Haematococcus pluvialis algae (not synthetic), supplied as a beadlet. Whole-cell algae powder was rejected: the algae's tough cyst wall resists digestion, so the astaxanthin inside is poorly released, and taking more does not fix the wrong material. Our specification calls for all-trans astaxanthin above 60% and 9-cis at or below 30% (the limit in EU Regulation 2024/1026). Each lot's certificate currently reports total astaxanthin by HPLC; we are asking our supplier to add the isomer results. The supplier's carrier-free declaration states the beadlet contains no gelatin, soy, or corn-derived carriers or excipients. Take with a meal: in one human study, total absorption was about 2.4 times higher when it was taken after a meal than before one (Okada 2009).",
        faq: [
            { q: "Why does astaxanthin need to be taken with fat?", a: "Astaxanthin is fat-soluble - it can't be efficiently absorbed without dietary fat to form the lipid micelles that ferry it across the intestinal wall. In one human study, total absorption was about 2.4 times higher when it was taken after a meal than before one (Okada 2009). Take it with breakfast, lunch, or dinner, a meal that includes some dietary fat (avocado, olive oil, eggs, nuts)." },
            { q: "When will I notice astaxanthin working?", a: "Astaxanthin is meant for daily, ongoing use rather than as a one-time or occasional ingredient. Blood levels build up over about one to two weeks of daily use. Human skin trials ran 6 to 16 weeks and their results were mixed, so we make no promise of a noticeable effect. It is included as a low-dose antioxidant, not a fast-acting ingredient." },
            { q: "How is your astaxanthin sourced?", a: "Natural astaxanthin from Haematococcus pluvialis algae, supplied as a 5% beadlet. Our specification calls for all-trans above 60% and 9-cis at or below 30% (EU Regulation 2024/1026 limit); the isomer results are being added to the lot certificate. Whole-cell algae powder was rejected because its cyst wall blocks release. The supplier has declared the beadlet free of gelatin, soy, and corn-derived carriers; the full beadlet matrix is being confirmed and will be listed before launch. Our spec has no country-of-origin requirement; the gates are the beadlet form, the isomer profile, and the allergen declaration." },
            { q: "Are there any drug interactions to know about?", a: "One documented case worth noting: a 2019 case report described an INR elevation in a warfarin patient who started astaxanthin. The mechanism is unclear, but caution is warranted. If you take warfarin or another anticoagulant, talk with your prescriber before starting astaxanthin and ask about an INR check within about a week of starting or stopping it. No study has tested astaxanthin with POTS or MCAS medications. One lab finding matters: in human liver cells, astaxanthin switched on CYP3A4, the enzyme that clears ivabradine. If that happened at our 4 mg dose, ivabradine could work a little less well. This has never been measured in people at any dose. Fludrocortisone has no data either: no study has tested the pair, trials of astaxanthin alone found no blood pressure change, and the enzymes that clear fludrocortisone are not documented. A lab screen of nine liver enzymes found astaxanthin does not meaningfully block them, and a meta-analysis of 14 trials found no blood pressure change. If you take ivabradine or fludrocortisone, mention astaxanthin to your prescriber." }
        ],
        triadPlain: {
            mcas: "No study has tested astaxanthin in people with MCAS, and no human study has measured mast cell or histamine outcomes. We include astaxanthin as an antioxidant and make no mast cell claim for it. It is algae-derived and not fermented, and we use HPMC capsules rather than carrageenan softgels.",
            heds: "No study has tested astaxanthin in people with hEDS. The trial most often cited (Yoon 2014) gave astaxanthin together with 3 g of collagen, so its results cannot be credited to astaxanthin alone. A 2016 cell study used an astaxanthin-rich extract and measured collagen below the untreated control, and a 16-week trial at 6 and 12 mg (Tominaga 2017) found no difference from placebo for wrinkles, moisture or elasticity. We make no collagen claim for astaxanthin. The concern about collagen suppression comes from a near-pure Z-isomer preparation, not from all-trans material like ours.",
            pots: "For POTS, no study has tested astaxanthin. It did not change blood pressure in a meta-analysis of 14 trials, so it is not expected to worsen orthostatic symptoms. Heart rate results in exercise studies are inconsistent, and orthostatic heart rate has never been measured."
        },
        bluf: "Astaxanthin is a carotenoid antioxidant from microalgae (Haematococcus pluvialis) that works in the lipid phase of cell membranes. Its mast cell and skin-cell results come from lab concentrations far above what an oral dose reaches, and human skin trials are small and mixed, so we include it as a low-dose antioxidant without efficacy claims. ZebraThrive uses 4 mg daily from a 5% beadlet in the PM capsule, with dinner fat for absorption.",
        atAGlance: {
            whatItIs: "A lipid-phase carotenoid antioxidant from microalgae (Haematococcus pluvialis)",
            whyWeIncludeIt: "Low-dose lipid-phase antioxidant with a long human safety record; no efficacy claim is made",
            dose: "4 mg daily in the PM capsule (5% beadlet), taken with dinner fat for absorption",
            keyBenefits: [
                "Human safety data across 87 studies at up to 24 mg a day (Brendler 2019 review)",
                "Taken up into red blood cell membranes in human studies at 3 to 12 mg a day",
                "No significant blood pressure change in a meta-analysis of 14 RCTs",
                ""
            ]
        },
        howItWorks: "Astaxanthin is a carotenoid that sits in cell membranes, where it can neutralize reactive oxygen species in lab studies.\n\nCell studies report effects on mast cell degranulation and on collagen-degrading enzymes (MMP-1, MMP-3, MMP-13), but they used concentrations roughly 10 to 500 times higher than our estimate of the blood level at 4 mg a day. No human study has measured these effects, so we treat them as unproven for this formula.",
        research: [
            {
                outcome: "Mast Cell Research (Lab and Animal)",
                summary: "Lab and animal studies report reduced degranulation; the concentrations used are well above what oral doses reach.",
                studies: [
                    {
                        source: "Sakai et al., 2009",
                        pmid: "19700409",
                        finding: "Reduced antigen-triggered degranulation in mast cell cultures; concentration reported around 10 µM, about 100 times our estimated blood level at 4 mg."
                    },
                    {
                        source: "Yoshihisa et al., 2016",
                        pmid: "27023003",
                        finding: "Decreased total and degranulated mast cells in a mouse model at 100 mg/kg oral, far above human doses."
                    }
                ]
            },
            {
                outcome: "Collagen Research in Skin Cells",
                summary: "Skin-cell and skin-biopsy studies; none tested astaxanthin alone in people at our dose.",
                studies: [
                    {
                        source: "Chou et al., 2016",
                        pmid: "27322248",
                        finding: "An astaxanthin-rich extract lowered MMP-1 and MMP-3 in skin cells, but collagen measured below the untreated control; the extract's astaxanthin content was not reported."
                    },
                    {
                        source: "Yoon et al., 2014",
                        pmid: "24955642",
                        design: "Human trial, 2 mg/day astaxanthin plus 3 g collagen hydrolysate",
                        finding: "Lower MMP-1 and MMP-12 expression and better skin elasticity with the combination; the effect of astaxanthin alone cannot be separated."
                    }
                ]
            },
            {
                outcome: "Blood Pressure Safety",
                summary: "A meta-analysis of 14 RCTs found no significant change in blood pressure.",
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
        evidenceGaps: "Zero direct studies in hEDS/POTS/MCAS patients. No study has measured astaxanthin's effect on mast cells, histamine or collagen in people. The Z-isomer collagen concern comes from a near-pure Z preparation (86.6% Z), not from all-trans material. At 10 to 20 mg a day, two human studies reported lower TGF-β1 or related changes in collagen-building signals, one more reason we do not raise the dose.",
        triad: {
            mcas: "Algae-derived, not fermented. No reports link it to mast cell reactions, and no human mast cell data exist either way. We avoid carrageenan (common in softgels) by using HPMC capsules.",
            heds: "No collagen or MMP claim. Our estimate puts blood levels at 4 mg roughly 100 times below the lab concentrations. The 4 mg dose is chosen as a low-cost antioxidant within the studied range, not as a collagen dose.",
            pots: "Did not change blood pressure in trials, so it should not worsen orthostatic symptoms. No study has tested it in POTS."
        },
        whyThisForm: {
            form: "Natural astaxanthin, 5% beadlet (Haematococcus pluvialis); specification all-trans above 60% and 9-cis at or below 30% (isomer results being added to the lot certificate)",
            rationale: "Whole-cell H. pluvialis is not a usable form: the algal cyst wall (tough, digestion-resistant) blocks release of the astaxanthin inside, and dosing up does not compensate for the wrong material. Our specification calls for a 5% astaxanthin beadlet with all-trans above 60% and 9-cis at or below 30% (EU Regulation 2024/1026). Each lot's certificate currently reports total astaxanthin by HPLC; we are asking our supplier to add the isomer results. The supplier's carrier-free declaration states no gelatin, soy, or corn-derived carriers or excipients. Take with a meal; absorption was about 2.4 times higher after a meal in one human study.",
            comparison: [
                { form: "5% beadlet (extracted H. pluvialis), total astaxanthin verified by HPLC", difference: "Our form: astaxanthin beadlets from Haematococcus pluvialis; carrier-free declaration (no added gelatin, soy, or corn-derived carriers or excipients)", selected: true },
                { form: "Whole-cell H. pluvialis powder", difference: "Intact cyst wall resists digestion; rejected", selected: false },
                { form: "Synthetic astaxanthin", difference: "Different isomer profile; not what the human studies used", selected: false },
                { form: "Softgels with carrageenan, gelatin, or fish oil carriers", difference: "These carriers are not used in our product.", selected: false }
            ]
        },
        safety: {
            sideEffects: "A 2019 review of 87 human studies found no safety concerns with natural astaxanthin. The European food safety authority sets an acceptable daily intake of 0.2 mg per kg of body weight, and our 4 mg a day is below that for adults. ",
            interactions: "Warfarin: one case report described a large INR rise after astaxanthin was added. If you take warfarin, talk with your prescriber before starting and ask about an INR check within about a week of starting or stopping. Astaxanthin does not meaningfully inhibit CYP enzymes in lab tests, but induced CYP3A4 in human liver cells (never tested in people). If induction occurred at 4 mg, ivabradine levels could fall slightly. Fludrocortisone: no data (no study has tested the pair); astaxanthin alone did not change blood pressure in trials, and fludrocortisone's clearing enzymes are not documented.",
            excipientConcerns: {
                avoid: ["Carrageenan softgels", "Soy-derived carriers (not used in our beadlet; we are still confirming the full carrier makeup and will disclose it once finalized)", "Gelatin beadlet matrices", "Whole-cell algae powder"],
                safe: ["HPMC capsules", "This astaxanthin comes in a beadlet form with a carrier-free declaration: no added carriers or excipients from gelatin, soy, or corn. We are still confirming the cracked-cell processing detail with our supplier."]
            },
            cautions: "Take with a meal. Stop 2 weeks before planned surgery, because animal studies show antiplatelet effects."
        },
        howToStart: {
            protocol: [
                { step: "Ongoing", dosage: "4 mg daily in the PM capsule, taken with dinner fat for absorption", notes: "Standard PM dose with dinner" }
            ],
            timeline: "Blood levels plateau within about one to two weeks. No specific benefit timeline is claimed."
        },
        sources: [
            { title: "Carotenoids and mast cell degranulation (cell study)", pmid: "19700409", authors: "Sakai et al.", year: "2009" },
            { title: "Astaxanthin-rich extract in skin cells (cell study)", pmid: "27322248", authors: "Chou et al.", year: "2016" },
            { title: "No effect of astaxanthin on blood pressure (Meta-analysis)", pmid: "32755613", authors: "Xia et al.", year: "2020" },
            { title: "Safety review of astaxanthin (87 studies)", pmid: "31788888", authors: "Brendler et al.", year: "2019" },
            { title: "Z-isomer collagen suppression concern", pmid: "37305308", authors: "Honda et al.", year: "2023" },
            { title: "Metabolism and CYP-inducer properties of astaxanthin in man and primary human hepatocytes", pmid: "11876499", authors: "Kistler et al.", year: "2002" }
        ]
    },
"l-theanine": {
        id: "l-theanine",
        name: "L-Theanine",
        patientSummary: "L-theanine is an amino acid found in green tea, linked to a calm, focused feel. L-theanine is in the PM capsule because, in small studies, it blunted the acute stress response and supported sleep quality, without changing resting blood pressure. We dose 200 mg in the PM capsule, well within the human-trial range (100-400 mg). Important note: some people, including some with a fast-heart-rate type of POTS, report feeling more on edge with L-theanine. If that has happened to you, talk to your clinician before using the PM capsule.",
        whyThisFormPatient: "We use generic L-theanine with one firm spec: at least 98% L-isomer (specific rotation +7.5 to +8.5 degrees), the form used in human studies. We check it against our specification and request a Certificate of Analysis for every lot. The spec discipline is what matters: get the ≥98% L-isomer or you're paying for the wrong stereoisomer.",
        faq: [
            { q: "Why is L-theanine in the PM and not AM?", a: "L-theanine has a paradoxical reputation: it's calming but not sedating, so people use it during the day for focus. We chose PM placement because L-theanine's calming and sleep-quality support fit best in the evening, and it keeps L-theanine away from morning caffeine. PM dosing supports sleep quality without sedation, based on small studies. If you prefer daytime use, take it whenever you want - the timing is flexible." },
            { q: "What's this 'paradoxical reaction' caveat about?", a: "Some people report feeling more anxious or jittery with L-theanine instead of calmer. This comes from user reports, not controlled studies. If you have tried L-theanine before and felt worse, tell your clinician before starting the PM capsule. L-theanine is inside the PM capsule, so if you react to it, talk to your clinician about whether the PM capsule is right for you." },
            { q: "Will L-theanine help with my sleep?", a: "L-theanine isn't a classic sleep aid - it doesn't sedate. What it does is help quiet the sense of being wired up, which in small studies has supported better sleep quality without sedation. If your bedtime problem is feeling tired but wound up, L-theanine may help you ease into a calmer state, based on small human studies on stress and sleep quality. If falling asleep once you're relaxed is your main issue, L-theanine may not be the right tool for that. L-theanine appears to blunt the acute stress response rather than directly promote sleepiness, based on small studies." },
            { q: "Does L-theanine interact with beta-blockers?", a: "No study has tested L-theanine with beta-blockers (propranolol, metoprolol, nadolol) or other standard POTS medications. In human studies it did not lower resting blood pressure; it blunted blood pressure rises during mental stress only in people who reacted strongly. With a beta-blocker or ivabradine it might slightly add to the blunting of stress-related heart-rate and blood pressure rises; no effect on resting heart rate has been shown. If you're on multiple BP-lowering medications and prone to symptomatic hypotension, mention L-theanine to your prescriber." }
        ],
        triadPlain: {
            mcas: "L-theanine is not in the formula as a mast cell ingredient; it is an amino acid that affects calming brain signals. Animal studies on mast cells exist but no human studies. Some people who react to glutamate-type ingredients report reacting to L-theanine too. This comes from user reports, not studies. L-theanine is inside the PM capsule, so if you react to it, ask your clinician whether the PM capsule suits you.",
            heds: "L-theanine is a neurotransmitter-modulating amino acid and does not have a known direct effect on connective tissue in people. L-theanine is in the formula for calm and sleep support, not for connective tissue.",
            pots: "L-theanine has not been studied in POTS. Some people report feeling more on edge with L-theanine rather than calmer. If you have reacted badly to calming compounds before, ask your clinician before using the PM capsule, which contains L-theanine."
        },
        bluf: "L-theanine is an amino acid from tea that promotes calm alertness without sedation. In small studies, L-theanine blunted the acute stress response and supported sleep quality, without sedation. ZebraThrive uses 200 mg daily of generic L-theanine specified at greater than 98% L-isomer purity.",
        atAGlance: {
            whatItIs: "An amino acid from tea that supports calm, alert focus and, in small studies, may blunt the acute stress response without sedation.",
            whyWeIncludeIt: "May help blunt the acute stress response, based on small studies",
            dose: "200 mg daily in the PM capsule",
            keyBenefits: [
                "In a small study of 12 healthy athletes, adding L-theanine to caffeine reduced caffeine's jittery side effects.",
                "Helped blunt the response to acute stress in small human studies",
                "Improves sleep quality without next-day drowsiness",
                ""
            ]
        },
        howItWorks: "L-theanine is associated with lower stress markers such as salivary α-amylase.\n\nIn mouse studies at doses well above ours, L-theanine reduced mast cell activity. There are no human studies. In animal and lab studies, L-theanine reduced markers of inflammatory collagen breakdown (MMP-3/13) in cartilage cells; this has not been studied in humans.",
        research: [
            {
                outcome: "Stress Response (Human Studies)",
                summary: "Small human studies suggest L-theanine can blunt the acute stress response; a large review found no consistent effect on anxiety.",
                studies: [
                    {
                        source: "Hidese et al., 2019",
                        pmid: "31623400",
                        design: "Randomized, placebo-controlled crossover trial, 30 healthy adults, 200 mg/day for 4 weeks",
                        finding: "In healthy adults, stress-related questionnaire scores and sleep-quality (PSQI) scores improved versus placebo; verbal fluency and executive function scores also improved."
                    },
                    {
                        source: "Unno et al., 2013",
                        pmid: "24051231",
                        finding: "Significantly lower salivary α-amylase (marker of sympathetic stress)."
                    }
                ]
            },
            {
                outcome: "Caffeine Side-Effect Study (Healthy Athletes)",
                summary: "A small crossover study in healthy elite athletes, not in people with POTS.",
                studies: [
                    {
                        source: "Razazan R et al., 2025",
                        pmid: "40977612",
                        design: "Double-blind, placebo-controlled crossover, 12 elite male wrestlers, single doses of 3 mg/kg",
                        finding: "Caffeine side effects were reported less often after caffeine plus L-theanine than after caffeine alone."
                    }
                ]
            },
            {
                outcome: "Sleep Quality Enhancement",
                summary: "In a review of adult trials, 200 to 450 mg a day appeared safe for supporting sleep; one trial in children at 400 mg a day reported no significant side effects.",
                studies: [
                    {
                        source: "Cotter et al., 2025",
                        pmid: "41176609",
                        design: "Systematic review of 13 trials",
                        finding: "A systematic review of 13 trials found 200 to 450 mg a day appears to be a safe and effective way to support healthy sleep in adults."
                    }
                ]
            }
        ],
        evidenceGaps: "Zero human studies on mast cell effects (preclinical only). Zero POTS-specific trials (extrapolated from stress research). Lower-quality theanine can contain the D-isomer, which is why we specify at least 98% L-isomer.",
        triad: {
            mcas: "L-theanine is not in the formula as a mast cell ingredient, and its mast cell effects have not been studied in humans. Industrial L-theanine is made by enzymatic, chemical or fermentation routes; we are confirming our supplier's process in writing.",
            heds: "L-theanine does not have a known direct effect on connective tissue in people.",
            pots: "L-theanine has not been studied in POTS; some people report reacting to it."
        },
        whyThisForm: {
            form: "Generic L-theanine (98% or more L-isomer, specification)",
            rationale: "Mandatory to ensure ≥98% pure L-theanine. Racemic (DL) theanine is half D-isomer; in rats the D form is absorbed poorly and competes with the L form.",
            comparison: [
                { form: "Generic L-theanine (98% or more L-isomer, specification)", difference: "Our spec: 98% or more L-isomer (specific rotation +7.5 to +8.5 degrees), with lot testing requested from the supplier", selected: true },
                { form: "Unverified generic L-theanine (no COA)", difference: "Cannot confirm isomer purity, and animal research suggests D-theanine absorbs less efficiently than L-theanine", selected: false }
            ]
        },
        safety: {
            sideEffects: "Across 31 human trials, L-theanine showed no serious side effects. In one 6-week trial in children at 400 mg a day, no significant side effects were reported.",
            interactions: "No human study has tested L-theanine with any POTS or MCAS medication. With beta-blockers or ivabradine it may slightly add to the blunting of stress-related heart-rate rises (start low). With hydroxyzine it may add to drowsiness, the intended direction for a PM capsule; in human studies reaction time got faster at 100 and 200 mg, with one study finding the opposite at 200 mg.",
            excipientConcerns: {
                avoid: ["Titanium dioxide (our PM capsule uses a calcium carbonate opacifier instead)"],
                safe: ["Vegetable cellulose", ""]
            },
            cautions: "Blood levels peak within about an hour, and they fall over the following hours. Best taken in the PM to support sleep."
        },
        howToStart: {
            protocol: [
                { step: "Ongoing", dosage: "200 mg daily", notes: "In the PM capsule" }
            ],
            timeline: "Calming effects may be felt within an hour; sleep and stress benefits in studies were measured after about 4 weeks."
        },
        sources: [
            { title: "L-theanine on anxiety, sleep, and cognition (RCT)", pmid: "31623400", authors: "Hidese et al.", year: "2019" },
            { title: "Performance-enhancing effects of caffeine and L-Theanine among Iranian elite wrestlers", pmid: "40977612", authors: "Razazan R et al.", year: "2025" },
            { title: "Suntheanine toxicology and safety", pmid: "16759779", authors: "Borzelleca et al.", year: "2006" },
            { title: "L-theanine systematic sleep review", pmid: "41176609", authors: "Cotter et al.", year: "2025" },
            { title: "Generic L-theanine isomer contamination analysis", pmid: "14755608", authors: "Desai & Armstrong", year: "2004" }
        ]
    },
"zinc-carnosine": {
        id: "zinc-carnosine",
        name: "Zinc Carnosine",
        patientSummary: "Zinc carnosine (also called polaprezinc) is a 1:1 chelated complex of zinc and L-carnosine, originally developed in Japan, where it is an approved prescription medicine. This ingredient has two lines of research: gut barrier support, where a small trial found no significant rise in gut permeability during NSAID use, and mast cell effects seen in lab and animal studies. We dose 37.5 mg twice daily (AM and PM) because every human RCT showing efficacy at 75 mg/day used split dosing, not once-daily. The local mucosal effect is thought to need repeated dosing to stay active, based on manufacturer and animal data rather than confirmed human measurements.",
        whyThisFormPatient: "We use generic zinc carnosine specified as a 1:1 zinc to carnosine molar chelate, and we are confirming chelate identity with our supplier. The 1:1 molar chelate structure is the feature linked to the gut barrier and mast cell mechanisms in the studies, not a specific brand. We dose 37.5 mg twice daily (AM and PM), not 75 mg once daily, because the human trials that showed benefit all used split BID dosing; the reasoning that the coating needs repeated administration is based on animal and manufacturer data. Taking it on an empty stomach or about 30 minutes before meals is generally preferred for local contact with the gut lining; you can take it with food if it causes GI upset.",
        faq: [
            { q: "Why split into AM and PM?", a: "The two human trials that showed a gut barrier benefit from zinc carnosine both used 37.5 mg twice daily. The local coating effect is thought to clear within a few hours based on animal and manufacturer data, which is why once daily dosing may leave gaps in protection. Splitting AM and PM matches the exact dose used in the two human trials that showed a gut barrier benefit." },
            { q: "Is zinc carnosine (zinc L-carnosine) the same as regular zinc?", a: "Not exactly. The 1:1 zinc-to-carnosine chelate behaves differently from elemental zinc supplements like zinc bisglycinate or zinc gluconate. Zinc carnosine is thought to survive stomach acid and adhere to gut mucosa for a period of local contact, releasing zinc slowly, based on animal and manufacturer data; this is believed to be where the gut protective effect comes from. Each capsule set provides about 8.6 mg of elemental zinc (about 17 mg a day), separate from any other zinc you take. The carnosine component has shown antioxidant activity in lab studies, though at concentrations far higher than what this dose would achieve in the body." },
            { q: "I take famotidine - is this a problem?", a: "Yes. Acid reducers can lower zinc absorption; our interaction review rates this as a low-level concern. Acid reducers cut zinc absorption: in a human study, famotidine reduced absorption of a soluble zinc salt by about 28%, and cimetidine, ranitidine, and omeprazole moved zinc absorption the same way. What you lose is zinc, not famotidine's effect. Zinc carnosine is a chelate rather than a simple salt, and how much it is affected has not been measured. Spacing doses 2 hours apart is a common suggestion, but it may not help much, because famotidine keeps stomach acid low for 10 to 12 hours. Taking zinc carnosine when famotidine is wearing off, shortly before your next famotidine dose, is the more logical timing, though no timing has been tested. If you take famotidine daily, tell your prescriber." },
            { q: "Is the higher-dose MMP-9 evidence concerning?", a: "This deserves a direct answer. A 2021 study in autoimmune hepatitis patients at 150 mg/day (twice our dose, opposite tissue pathology) showed MMP-9 elevated, which raised concerns about hEDS use. That study was in people with liver fibrosis, a different tissue and condition from ours. Whether its MMP-9 result applies to our 75 mg dose in a non-fibrotic population has not been studied; this is our judgment, not direct evidence. In that same study, serum MMP-1 and MMP-13 levels did not change. Whether these specific enzymes matter for hEDS connective tissue has not been studied directly. We use 75 mg/day and do not plan to go higher, based on the dose used in the human gut barrier trials; direct MMP data at this dose does not exist." }
        ],
        triadPlain: {
            mcas: "No clinical trial has tested zinc carnosine in people with MCAS, and it is not a substitute for any prescribed treatment. L-carnosine is not free histidine and is not a histamine precursor at this dose.",
            heds: "No clinical trial has tested zinc carnosine in people with hEDS. There is no human data on MMP-1 or MMP-13 at our 75 mg per day dose. The only human data, in autoimmune hepatitis patients taking twice this dose, found serum MMP-1 and MMP-13 unchanged. The 150 mg per day study was in people with liver fibrosis, a different tissue and condition from ours, so we do not think it applies directly, though this is our judgment rather than direct evidence.",
            pots: " Zinc carnosine is included for gut lining support, not for any effect on heart rate or blood pressure. Zinc carnosine is in both the AM and PM capsules and copper is in the AM capsule, giving about 17 mg of zinc and 2 mg of copper a day. If you use it long term, ask your clinician about a yearly copper and blood count check."
        },
        bluf: "Zinc carnosine is a 1:1 chelate of zinc and L-carnosine designed to adhere to the gut lining. It has human trial evidence for protecting intestinal permeability, along with reduced mast cell degranulation seen in lab and animal studies. ZebraThrive uses 75 mg daily, split 37.5 mg AM and PM.",
        atAGlance: {
            whatItIs: "A 1:1 chelate of zinc and L-carnosine designed to target the GI lining.",
            whyWeIncludeIt: "Human trial evidence for protecting intestinal permeability, plus reduced mast cell degranulation seen in lab and animal studies.",
            dose: "75 mg daily (37.5 mg AM capsule + 37.5 mg PM capsule)",
            keyBenefits: [
                "In a small trial of 10 healthy volunteers, zinc carnosine prevented a significant increase in NSAID-induced gut permeability.",
                "In a small trial of 8 healthy volunteers, zinc carnosine reduced the rise in exercise-induced gut permeability by 70% after 14 days.",
                "",
                "In an animal bone study at a much higher dose than ours, zinc carnosine increased Type I collagen gene expression. This has not been shown in people or at our dose."
            ]
        },
        howItWorks: "In lab studies of gut cells, zinc carnosine increased the tight junction protein occludin and the protective heat shock protein HSP70. In lab studies, zinc reduced mast cell degranulation.",
        research: [
            {
                outcome: "GI Barrier Protection",
                summary: "Two small human trials have shown zinc carnosine protects against intestinal permeability increases from different stresses.",
                studies: [
                    {
                        source: "Mahmood et al., 2007",
                        pmid: "16777920",
                        design: "RCT, n=10",
                        finding: "In a small trial of 10 healthy volunteers, zinc carnosine prevented a significant increase in permeability caused by NSAIDs over 5 days."
                    },
                    {
                        source: "Davison et al., 2016",
                        pmid: "27357095",
                        design: "Small trial, 8 healthy volunteers.",
                        finding: "70% reduction in exercise-induced gut permeability after 14 days."
                    }
                ]
            },
            {
                outcome: "Mast Cell Animal Studies",
                summary: "In rat studies, zinc carnosine reduced stress-related mast cell degranulation in the stomach lining.",
                studies: [
                    {
                        source: "Gross et al., 2019",
                        pmid: "30521103",
                        finding: ""
                    },
                    {
                        source: "Cho et al., 1991",
                        pmid: "1943472",
                        finding: "In a rat study, oral zinc carnosine reduced stress-induced mast cell degranulation in a dose-dependent manner (3 to 30 mg/kg)."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials in hEDS, POTS, or MCAS populations. Most data extrapolated from athletic, NSAID-user, and gastric ulcer populations.",
        triad: {
            mcas: "No clinical trial has tested zinc carnosine in people with MCAS. L-carnosine is not free histidine and is not a histamine precursor at this dose.",
            heds: "There is no human connective tissue data at any dose showing zinc carnosine affects collagen genes or MMPs; this remains an open question.",
            pots: "Zinc carnosine is included for gut lining support, not for any effect on heart rate or blood pressure."
        },
        whyThisForm: {
            form: "Generic zinc carnosine, specified as a 1:1 molar chelate, about 22.6% zinc by molecular weight.",
            rationale: "A 1:1 chelate that, in animal studies, stayed in the stomach about twice as long as zinc and carnosine given separately. The chelate form is designed to adhere to the gut lining rather than dissolve immediately, based on the drug's pharmacology.",
            comparison: [
                { form: "Zinc L-carnosine (1:1 chelate, polaprezinc-type)", difference: "Stable 1:1 chelate, designed for longer mucosal contact than simple zinc salts, based on pharmacology data.", selected: true },
                { form: "Zinc + L-Carnosine separately", difference: "Separate zinc and L-carnosine are not expected to adhere to the gut lining as well, based on pharmacology data.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Polaprezinc has been used as a prescription medicine in Japan for decades. European food safety assessors could not establish its safety as a food ingredient in 2026, and long-term users should have copper checked. ",
            interactions: "Famotidine and other acid reducers: lower zinc absorption (about 28% for a soluble zinc salt with famotidine); a 2-hour gap may not help because famotidine's effect lasts 10 to 12 hours; taking zinc carnosine near the end of that window is the more logical timing (untested). Separate from fluoroquinolones, tetracyclines, and iron by 4-6 hours.",
            excipientConcerns: {
                avoid: ["Gelatin capsules (we use plant-based HPMC)"],
                safe: ["HPMC capsules", "Rice hull concentrate"]
            },
            cautions: "If you use this long-term, ask your clinician to check your copper status and blood counts yearly, especially if you have kidney disease."
        },
        howToStart: {
            protocol: [
                { step: "Week 1", dosage: "37.5 mg daily", notes: "Check GI tolerance" },
                { step: "Week 2+", dosage: "37.5 mg twice daily (75 mg/day)", notes: "Target dose (AM + PM capsules)" }
            ],
            timeline: ""
        },
        sources: [
            { title: "Zinc carnosine for gut permeability RCT", pmid: "16777920", authors: "Mahmood et al.", year: "2007" },
            { title: "Exercise-induced gut barrier protection RCT", pmid: "27357095", authors: "Davison et al.", year: "2016" },
            { title: "Zinc carnosine mast cell stabilization", pmid: "1943472", authors: "Cho et al.", year: "1991" },
            { title: "HSP70 induction by zinc carnosine", pmid: "12498304", authors: "Odashima et al.", year: "2002" },
            { title: "Effect of intragastric pH on the absorption of oral zinc acetate and zinc oxide in young healthy volunteers", pmid: "8577018", authors: "Henderson et al.", year: "1995" }
        ]
    },
"pantothenic-acid": {
        id: "pantothenic-acid",
        name: "Pantothenic Acid (Vitamin B5)",
        patientSummary: "Pantothenic acid is vitamin B5 - the precursor to Coenzyme A (CoA), one of the most important molecules in cellular metabolism. CoA is required for energy production from carbohydrates, fats, and proteins; for synthesis of fatty acids, cholesterol, and steroid hormones; and for acetylcholine production. Pantothenic acid supports normal energy metabolism, helping the body's cells convert food into usable energy. There's no compelling case for high-dose pantothenic acid in this community, but adequate B5 is part of complete B-vitamin coverage. We use calcium pantothenate at 5 mg - close to the basic adequate intake.",
        faq: [
            { q: "Why such a low dose?", a: "Pantothenic acid is one of the easiest B vitamins to get from food (its name comes from the Greek 'pantothen' meaning 'from everywhere'). True deficiency is rare. Our 5 mg dose provides 100% of the Daily Value, supporting the body's B5 dependent enzyme systems." },
            { q: "What does pantothenic acid actually do?", a: "Pantothenic acid is the precursor to Coenzyme A (CoA), which takes part in enzymatic reactions across energy production, fatty acid synthesis, steroid hormone production and acetylcholine synthesis. The name comes from a Greek word meaning 'from everywhere,' reflecting how widely pantothenic acid is found in foods. Most of B5's value is foundational metabolic support: not something you notice individually, but the cellular machinery requires it." },
            { q: "Does the calcium in calcium pantothenate matter?", a: "The trace amount of calcium contributed by the salt is negligible compared to dietary calcium intake. " },
            { q: "Are there any interactions to worry about?", a: "No documented interactions with the standard POTS, MCAS, or hEDS medication stack, though none has been formally studied. No known CYP effects. Pantothenic acid and biotin share one absorption transporter (SMVT), and both are in the PM capsule (5 mg and 300 mcg). No study has tested whether this matters at these amounts. This is one of the most boring ingredients in the formulation." }
        ],
        triadPlain: {
            mcas: "There are no direct trials of pantothenic acid in MCAS. At 5 mg, our role is daily B-vitamin coverage rather than targeted mast cell intervention. ",
            heds: "There's no direct hEDS connective tissue evidence for pantothenic acid; it is included for foundational B-vitamin coverage. At 5 mg, we're providing baseline B5 to keep CoA-dependent enzymes functional. ",
            pots: "There are no direct trials of pantothenic acid in POTS. At 5 mg, we provide foundational B5 coverage rather than targeted autonomic intervention."
        },
        bluf: "Pantothenic acid is the precursor to Coenzyme A, a molecule involved in cellular energy production and acetylcholine synthesis. ZebraThrive uses 5 mg daily in the PM stack.",
        atAGlance: {
            whatItIs: "An essential B vitamin that forms the core of Coenzyme A, a molecule your body uses in many enzymatic reactions.",
            whyWeIncludeIt: "Precursor to Coenzyme A; required for acetylcholine synthesis and cellular energy production",
            dose: "5 mg daily (PM capsule)",
            keyBenefits: [
                "CoA synthesis enables Krebs cycle function for ATP production",
                "A precursor needed for the body's synthesis of steroid hormones.",
                "",
                ""
            ]
        },
        howItWorks: "Pantothenic acid converts to Coenzyme A (CoA), which participates in pathways including the Krebs cycle, fatty acid metabolism, and acetylcholine synthesis. ",
        research: [
            {
                outcome: "Fibroblast Proliferation",
                summary: " Effects are documented in an animal study using injected pantothenate and in a lab study using cultured human skin fibroblasts.",
                studies: [
                    {
                        source: "Aprahamian M et al., \"Effects of supplemental pantothenic acid on wound healing: experimental study in rabbit\"",
                        pmid: "3976557",
                        design: "Controlled animal study, injected pantothenate 20 mg/kg per day for 3 weeks.",
                        finding: "Pantothenate supplementation significantly increased aponeurosis strength after surgery and increased fibroblast content during the proliferation phase of healing"
                    },
                    {
                        source: "Wiederholt T et al., \"Calcium pantothenate modulates gene expression in proliferating human dermal fibroblasts\"",
                        pmid: "19397697",
                        design: "In vitro, human dermal fibroblasts, 20 ug/mL calcium pantothenate",
                        finding: "Lab study: calcium pantothenate showed a stimulatory effect on dermal fibroblast proliferation and modulated IL-6, IL-8, HMOX-1 and Id1 expression."
                    },
                    {
                        source: "Ebner F et al., \"Topical use of dexpanthenol in skin disorders\"",
                        pmid: "12113650",
                        design: "Review of studies on topical dexpanthenol",
                        finding: "Dexpanthenol activates fibroblast proliferation, accelerates re-epithelization, improves stratum corneum hydration; anti-inflammatory in UV-erythema model"
                    }
                ]
            },
            {
                outcome: "Coenzyme A and Lipid Metabolism",
                summary: "Pantothenic acid is the precursor to coenzyme A (CoA), required for fatty acid metabolism, the TCA cycle, and steroid synthesis. ",
                studies: [
                    {
                        source: "",
                        pmid: "26350816",
                        design: "Randomized, double-blind, multicenter trial, 216 patients with moderate dyslipidemia",
                        finding: ""
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in hEDS, POTS, or MCAS. Findings are extrapolated from general metabolic and wound healing research.",
        triad: {
            mcas: "No direct trials in MCAS.",
            heds: "No direct trials in hEDS.",
            pots: "No direct trials in POTS."
        },
        whyThisForm: {
            form: "Calcium Pantothenate",
            rationale: "We use calcium pantothenate at 5 mg, which provides 100% of the Daily Value for pantothenic acid.",
            comparison: [
                { form: "Calcium Pantothenate", difference: "Our form; 5 mg provides 100% of the Daily Value", selected: true },
                { form: "Pantethine", difference: "", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. ",
            interactions: " ",
            excipientConcerns: {
                avoid: ["", "Povidone (none listed; carrier confirmation pending)", "Titanium dioxide"],
                safe: ["HPMC capsules", "Rice hull concentrate"]
            },
            cautions: ""
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "", notes: "Sensitive start" },
                { step: "Daily", dosage: "5 mg daily", notes: "PM capsule with dinner" }
            ],
            timeline: ""
        },
        sources: [
            { title: "Effects of supplemental pantothenic acid on wound healing: experimental study in rabbit", pmid: "3976557", authors: "Aprahamian M et al.", year: "1985" },
            { title: "Calcium pantothenate modulates gene expression in proliferating human dermal fibroblasts", pmid: "19397697", authors: "Wiederholt T et al.", year: "2009" },
            { title: "Topical use of dexpanthenol in skin disorders", pmid: "12113650", authors: "Ebner F et al.", year: "2002" },
            
        ]
    },
    "biotin": {
        id: "biotin",
        name: "Biotin (Vitamin B7)",
        patientSummary: "Biotin is vitamin B7 - the cofactor for carboxylase enzymes that handle fatty acid synthesis, gluconeogenesis (making glucose from non-carbohydrate sources), and the breakdown of certain amino acids. Biotin is needed for normal energy metabolism and for maintaining normal skin and hair. Deficiency is rare. We use 300 mcg of D-biotin, supplied as a 1% blend on dicalcium phosphate, in the PM capsule. That is well above the daily value and within the usual supplement range.",
        faq: [
            { q: "Why is biotin in the formulation?", a: "Biotin is a required cofactor for several carboxylase enzymes that handle fundamental metabolism - fatty acid synthesis, gluconeogenesis, and amino acid breakdowns. Severe biotin deficiency is rare and causes skin rashes, hair changes and nerve symptoms. Most people are not deficient. Some older seizure medicines (carbamazepine, phenytoin, phenobarbital) speed up the breakdown of biotin, and raw egg white contains a protein (avidin) that binds biotin. 300 mcg provides comfortable headroom." },
            { q: "Will biotin interfere with blood tests?", a: "Yes - this is the most important biotin consideration. High-dose biotin (5 to 10 mg a day in studies) can interfere with some lab tests that use biotin and streptavidin. Some thyroid tests can read falsely high (T4, T3) or falsely low (TSH), and one troponin test used to check for heart damage read falsely low. Our 300 mcg is about 33 times lower than the 10 mg daily dose shown to interfere, but blood biotin at 300 mcg has never been measured, so that margin is an estimate. If you're getting bloodwork done, mention biotin supplementation to your doctor - particularly for thyroid panels. In one study, thyroid test interference from 5 to 10 mg a day of biotin cleared within 2 days of stopping. Ask your lab or clinician whether to pause biotin before a blood test." },
            { q: "Does biotin help with hair, skin, and nails?", a: "There is not enough evidence that biotin improves hair, skin or nails in people who are not deficient. Biotin is included at a standard amount for general nutritional support." },
            { q: "Is the D-biotin form important?", a: "Yes. Only the D form of biotin (D-biotin) is active in the body. Our specification calls for D-biotin. It is supplied as a 1% blend on dicalcium phosphate, and identity is checked by our contract manufacturer." }
        ],
        triadPlain: {
            mcas: "Biotin is not included for mast cell support. There's no high-dose biotin evidence in MCAS. At 300 mcg, we're providing daily coverage rather than targeted intervention.",
            heds: "There are no direct trials of biotin in hEDS. We dose 300 mcg as comfortable coverage rather than targeted skin or connective tissue intervention.",
            pots: "There are no direct trials of biotin in POTS. The most clinically important POTS-related biotin consideration is actually the bloodwork interference issue: POTS patients often have thyroid panels checked, and high-dose biotin can falsely elevate T4/T3 and falsely suppress TSH. Our 300 mcg dose is about 33 times lower than the dose shown to interfere (an estimated margin, since blood levels at 300 mcg have not been measured), but worth knowing if you ever do high-dose biotin separately."
        },
        bluf: "Biotin is an essential B vitamin and a cofactor for carboxylase enzymes used in normal energy metabolism. ZebraThrive uses 300 mcg daily in the PM stack.",
        atAGlance: {
            whatItIs: "An essential B vitamin that serves as a cofactor for energy-producing enzymes",
            whyWeIncludeIt: "Supports normal energy metabolism.",
            dose: "300 mcg daily (PM capsule)",
            keyBenefits: [
                "Essential cofactor for 5 carboxylase enzymes in energy, fat and amino acid metabolism",
                "Supports normal energy metabolism",
                "",
                "Near-complete oral absorption, even at high doses"
            ]
        },
        howItWorks: "Biotin is a cofactor for five carboxylase enzymes, including one that keeps the energy-producing TCA cycle supplied. In animal and cell studies, biotin deprivation impaired mitochondrial function. We use a physiological 300 mcg dose to support metabolism, about 33 times lower than the 10 mg a day shown to cause laboratory interference (TSH, troponin). Blood levels at 300 mcg have not been measured, so that margin is an estimate.",
        research: [
            {
                outcome: "Mitochondrial Function and Energy Metabolism",
                summary: "Biotin is the cofactor for five carboxylases central to TCA-cycle anaplerosis, fatty-acid synthesis, and amino-acid metabolism. In rats and cultured cells, biotin deprivation reduced TCA cycle flow, electron transport chain activity and ATP, and damaged mitochondria.",
                studies: [
                    {
                        source: "Lohr KM et al., \"Biotin rescues mitochondrial dysfunction and neurotoxicity in a tauopathy model\"",
                        pmid: "33318181",
                        design: "Genome-scale forward genetic screen + biotin supplementation in tauopathy models (Drosophila, human neurons, mouse)",
                        finding: "Animal and cell study: when biotin was depleted, carboxylase and mitochondrial function were disrupted, and biotin supplementation restored mitochondrial function."
                    },
                    {
                        source: "Ochoa-Ruiz E et al., \"Biotin deprivation impairs mitochondrial structure and function and has implications for inherited metabolic disorders\"",
                        pmid: "26343941",
                        design: "Rat + cell culture biotin deprivation, mechanistic study of TCA flux, electron transport chain, ATP, mitophagy",
                        finding: "Biotin deprivation reduces TCA cycle flow via deficient pyruvate carboxylase, decreases ETC and complex IV activity, causes mitochondrial damage and biogenesis defects"
                    }
                ]
            },
            {
                outcome: "Laboratory Test Interference Safety",
                summary: "High-dose biotin supplementation can interfere with streptavidin-biotin-based immunoassays used for thyroid hormones, troponin, vitamin D, and other tests. Identified as an underrecognized patient safety risk; FDA has issued a safety communication.",
                studies: [
                    {
                        source: "Gifford JL et al., \"Biotin interference: Underrecognized patient safety risk in laboratory testing\"",
                        pmid: "29760259",
                        design: "Journal article on biotin and laboratory testing",
                        finding: "Biotin supplementation causes false-positive and false-negative results in streptavidin-biotin immunoassays; recommend disclosing biotin use to lab and clinical teams"
                    },
                    {
                        source: "Johnson L, Li D, \"Strategies to Investigate Biotin Interference in Light of the FDA Safety Communication\"",
                        pmid: "31639768",
                        design: "Laboratory medicine commentary on FDA biotin safety communication",
                        finding: "Strategies for clinical and laboratory teams to mitigate biotin interference in patient testing"
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in hEDS/POTS/MCAS. Findings extrapolated from basic carboxylase biochemistry and general mitochondrial research.",
        triad: {
            mcas: "Biotin was well tolerated in a trial using far higher doses (300 mg a day). It has not been studied in people with mast cell conditions. Our biotin is supplied as a 1% blend on dicalcium phosphate, a mineral carrier.",
            heds: "",
            pots: " "
        },
        whyThisForm: {
            form: "D-biotin (1% on dicalcium phosphate)",
            rationale: "D-biotin is the biologically active stereoisomer required as an enzyme cofactor, with near-complete oral absorption. Our D-biotin is made synthetically and is chemically identical to the biotin in food; what matters is the D form.",
            comparison: [
                { form: "D-Biotin, USP", difference: "Active stereoisomer; near-complete absorption", selected: true },
                { form: "Unspecified or mixed-isomer biotin", difference: "Only D-biotin is active in the body.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated.",
            interactions: "Lab tests: high-dose biotin interferes with streptavidin-biotin immunoassays, including troponin (falsely low results, the dangerous direction) and TSH. Interference was shown at 10 mg a day; our 300 mcg is about 33 times lower, but blood levels at this dose have not been measured. Tell your lab and clinician you take biotin and ask whether to pause it before testing. Some older seizure medicines (carbamazepine, phenytoin, phenobarbital) speed up the breakdown of biotin in small studies. No data exist for gabapentin or pregabalin.",
            excipientConcerns: {
                avoid: ["Artificial dyes (none in the confirmed PM ingredients; some carrier materials are still being confirmed)", "Povidone (none listed; carrier confirmation pending)", "Polyethylene glycol (none in the confirmed PM ingredients; some carrier materials are still being confirmed)"],
                safe: ["Vegetable capsules", "Rice hull concentrate"]
            },
            cautions: "Always alert healthcare providers of biotin use before blood work."
        },
        howToStart: {
            protocol: [
                { step: "Daily", dosage: "The full PM serving (3 capsules) provides 300 mcg of biotin. If you are sensitive to new supplements, talk with your clinician about how to start.", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "", notes: "" }
            ],
            timeline: ""
        },
        sources: [
            { title: "Biotin rescues mitochondrial dysfunction and neurotoxicity in a tauopathy model", pmid: "33318181", authors: "Lohr KM et al.", year: "2020" },
            { title: "Biotin deprivation impairs mitochondrial structure and function and has implications for inherited metabolic disorders", pmid: "26343941", authors: "Ochoa-Ruiz E et al.", year: "2015" },
            { title: "Biotin interference: Underrecognized patient safety risk in laboratory testing", pmid: "29760259", authors: "Gifford JL et al.", year: "2018" },
            { title: "Strategies to Investigate Biotin Interference in Light of the FDA Safety Communication", pmid: "31639768", authors: "Johnson L, Li D", year: "2019" },
            { title: "Association of Biotin Ingestion With Performance of Hormone and Nonhormone Assays in Healthy Adults", pmid: "28973622", authors: "Li et al.", year: "2017" },
            { title: "Susceptibility of Cardiac Troponin Assays to Biotin Interference", pmid: "30715102", authors: "Frame et al.", year: "2019" }
        ]
    },
    "boron": {
        id: "boron",
        name: "Boron Glycinate",
        patientSummary: "Boron is a trace mineral with growing research interest for bone health and steroid hormone metabolism, based on animal studies and a small human trial. It's not classified as essential in the way iron or zinc are, but multiple lines of evidence show meaningful biological roles. Boron has been studied for its role in bone metabolism, inflammatory markers, and steroid hormone levels. We include it as part of general bone and mineral support, not as a treatment for fracture risk in any specific population. We dose 2 mg of elemental boron as boron glycinate - within the well-studied range and well below any safety concern.",
        faq: [
            { q: "Why is boron in the formulation?", a: "Several reasons. Boron has research behind its role in bone mineralization and vitamin D and estrogen metabolism, and shows anti-inflammatory effects in a small human trial at supplement-range doses. A small 2011 study of 8 healthy men found that 10 mg of boron per day increased free testosterone and reduced inflammatory markers including hsCRP and TNF-alpha over one week. Boron is a supporting part of the trace mineral mix, studied mainly for bone and hormone metabolism." },
            { q: "Is 2 mg of boron safe?", a: "Yes. The Tolerable Upper Intake Level for boron in adults is 20 mg/day, and most dietary intake from food is around 1-3 mg. Our 2 mg dose is the standard supplement amount with substantial safety margin. No studies have shown adverse effects at supplement doses, though most of the evidence comes from short-term trials and reviews rather than long-term studies. Boron has a low toxicity profile at typical supplement and dietary doses, with a generous margin below the Tolerable Upper Intake Level. Pregnancy is one situation to be more cautious about high-dose boron; 2 mg is within standard dietary intake." },
            { q: "Does boron actually do anything?", a: "More than its reputation suggests. A small human trial found that boron supplementation at 10 mg per day modestly raised free testosterone, lowered sex hormone binding globulin, and reduced hsCRP and TNF-alpha over one week. We have not found trials of boron on bone density or joint comfort in osteoarthritis. The evidence for boron is preliminary and comes mostly from a small human trial and animal and review literature. " },
            { q: "Does boron interact with hormones?", a: "Yes, modestly. In a small human trial, boron supplementation modestly raised free testosterone and lowered sex hormone binding globulin, and vitamin D levels were elevated after one week. The same study found estradiol decreased, not increased. For most adults, these effects are considered modest based on the available evidence. If you're on hormone replacement therapy, transitioning, or have a hormone-sensitive condition, mention boron to your prescriber. For everyone else, the hormone related effects seen in small studies are generally considered mild." }
        ],
        triadPlain: {
            mcas: "Boron has not been studied in people with MCAS, and there are no studied or reported interactions with common MCAS medications. We are not aware of any study specifically testing whether boron triggers histamine release.",
            heds: "Boron has not been studied in people with hEDS. At 2 mg a day, we include it as part of broad bone and mineral support, not as a treatment for any specific condition.",
            pots: "Boron is not an autonomic or cardiovascular ingredient, and it has not been studied in people with POTS. There are no studied or reported interactions between boron and common POTS medications."
        },
        bluf: "Boron is a trace mineral studied for roles in bone metabolism and hormone function, with some lab research into cellular pathways relevant to bone and connective tissue. Boron has been studied for effects on vitamin D and magnesium handling, and for general anti-inflammatory activity in a small human trial. ZebraThrive uses 2 mg daily in the PM stack.",
        atAGlance: {
            whatItIs: "A trace mineral studied for roles in bone metabolism and hormone function.",
            whyWeIncludeIt: "Studied for effects on vitamin D and magnesium handling, and for anti-inflammatory activity in a small human trial.",
            dose: "2 mg elemental boron daily (PM capsule)",
            keyBenefits: [
                "In a small 1 week study of 8 healthy men taking 10 mg of boron a day, five times our dose, blood levels of hsCRP and TNF-alpha fell.",
                "May support normal bone metabolism, based on animal research and review evidence, though no trial has tested our specific dose.",
                "",
                ""
            ]
        },
        howItWorks: "Lab research suggests boron activates certain cellular stress pathways related to bone remodeling, and an animal study found it improved calcium and magnesium handling only when combined with estrogen. A small 1 week study in 8 healthy men taking 10 mg of boron a day found lower hsCRP and TNF-alpha.",
        research: [
            {
                outcome: "Anti-Inflammatory and Antioxidant Effects",
                summary: "A review of boron research reports reductions in inflammatory biomarkers and increases in antioxidant enzyme activity, suggesting benefits may occur around 3 mg per day, though individual trials at this exact range were not conducted.",
                studies: [
                    {
                        source: "Pizzorno L, \"Nothing Boring About Boron\"",
                        pmid: "26770156",
                        design: "Comprehensive integrative-medicine review of boron supplementation evidence",
                        finding: "A review of boron research reports that boron supplementation reduces hs-CRP and TNF-alpha, raises antioxidant enzyme activity, and is associated with bone, wound healing, magnesium absorption, and vitamin D related benefits, with no adverse effects reported up to the 20 mg/day upper limit for adults."
                    }
                ]
            },
            {
                outcome: "Connective Tissue and Cellular Mechanisms",
                summary: "A lab study using prostate cancer cells found that boric acid at a concentration similar to typical human blood levels activated certain endoplasmic reticulum stress pathways. In this lab study, ATF4 and BiP/GRP78 are described as functioning in osteogenesis and bone remodeling.",
                studies: [
                    {
                        source: "Kobylewski SE et al., \"Activation of the EIF2alpha/ATF4 and ATF6 Pathways by Boric Acid at the Concentration Reported in Men at the US Mean Boron Intake\"",
                        pmid: "27587023",
                        design: "In vitro mechanistic study, DU-145 cells, 10 uM boric acid (physiological)",
                        finding: "Boric acid activates eIF2alpha at 30 minutes, ATF4 at 1 hour, and ATF6 at 30 minutes in this lab study, and upregulates GRP78/BiP, calreticulin, and EDEM, without inducing CHOP mediated cell death."
                    }
                ]
            },
            {
                outcome: "Mineral Synergy (Magnesium, Calcium, Vitamin D)",
                summary: "An animal study found that boron plus estrogen (not boron alone) improved calcium and magnesium absorption and retention in ovariectomized rats. This was an animal study, so effects in people have not been shown. Magnesium is one of the foundational nutrients in the formula.",
                studies: [
                    {
                        source: "Sheng MH et al., \"Dietary boron supplementation enhances the effects of estrogen on bone mineral balance in ovariectomized rats\"",
                        pmid: "11508330",
                        design: "Controlled animal study in ovariectomized rats testing boron combined with estradiol on bone mineral balance; boron alone had no effect.",
                        finding: "In this animal study, boron combined with estradiol (not boron alone) improved calcium, phosphorus and magnesium absorption, and calcium and magnesium retention, in ovariectomized rats."
                    },
                    {
                        source: "Yazici Z et al., \"Effect of boron supplementation on plasma element distribution in ovariectomized rats subjected to acute swimming exercise\"",
                        pmid: "21692406",
                        design: "Animal study in ovariectomized rats given boron by injection, combined with acute swimming exercise.",
                        finding: "This animal study found changes in some plasma trace minerals during exercise in ovariectomized rats, but the study authors noted these changes were independent of the boron given."
                    }
                ]
            }
        ],
        evidenceGaps: "No conditions-specific trials for hEDS/POTS/MCAS. Extrapolated from general bone health and inflammation research.",
        triad: {
            mcas: "Boron has not been studied in people with MCAS. We are not aware of any study specifically testing whether boron triggers histamine release.",
            heds: "Boron has not been studied in people with hEDS.",
            pots: "Boron has not been studied in people with POTS."
        },
        whyThisForm: {
            form: "Boron Glycinate",
            rationale: "Boron glycinate is a chelated form chosen for the formula; specific absorption percentage data for this form has not been established. ",
            comparison: [
                { form: "Boron Glycinate", difference: "Boron glycinate was chosen over boron citrate because some sensitive people report reacting to citrate forms. Specific absorption data for boron glycinate has not been established, and excipient details are still being confirmed.", selected: true },
                { form: "Boron Citrate", difference: "Some sensitive individuals report reacting to citrate forms, based on anecdotal reports rather than a specific study we can cite.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Excellent safety profile. Minimal adverse effects at nutritional doses.",
            interactions: "No studied or reported interactions with common POTS/MCAS medications. ",
            excipientConcerns: {
                avoid: ["Citrate forms", "Artificial dyes", "Titanium dioxide"],
                safe: ["HPMC capsules", "Rice hull concentrate"]
            },
            cautions: "Our 2 mg dose is well below the Tolerable Upper Intake Level of 20 mg per day for boron in adults. Carrier composition for the boron glycinate used is still being confirmed."
        },
        howToStart: {
            protocol: [
                { step: "Week 1+", dosage: "2 mg daily", notes: "Full dose (PM capsule)" }
            ],
            timeline: ""
        },
        sources: [
            { title: "Nothing Boring About Boron", pmid: "26770156", authors: "Pizzorno L", year: "2015" },
            { title: "Activation of the EIF2alpha/ATF4 and ATF6 Pathways in DU-145 Cells by Boric Acid at the Concentration Reported in Men at the US Mean Boron Intake", pmid: "27587023", authors: "Kobylewski SE et al.", year: "2016" },
            { title: "Dietary boron supplementation enhances the effects of estrogen on bone mineral balance in ovariectomized rats", pmid: "11508330", authors: "Sheng MH et al.", year: "2001" },
            { title: "Effect of boron supplementation on plasma element distribution in ovariectomized rats subjected to acute swimming exercise", pmid: "21692406", authors: "Yazici Z et al.", year: "2011" }
        ]
    },
    "molybdenum": {
        id: "molybdenum",
        name: "Molybdenum Glycinate",
        patientSummary: "Molybdenum is an essential trace mineral and the cofactor for several enzymes, most importantly sulfite oxidase (which converts sulfite to sulfate), xanthine oxidase (purine metabolism) and aldehyde oxidase (aldehyde processing). Molybdenum is the cofactor for sulfite oxidase, which converts dietary sulfite to sulfate in the body. Some people are sensitive to sulfites in wine and other foods, but there is no research showing molybdenum supplementation changes how people handle dietary sulfites. We dose 150 mcg as molybdenum glycinate - well within the supplement range and below the safety threshold.",
        faq: [
            { q: "What does molybdenum do in sulfite and aldehyde metabolism?", a: "Molybdenum is the cofactor for sulfite oxidase - the enzyme that converts sulfite to sulfate (the safe form). Some people report sensitivity to sulfites found in wine, dried fruit, and processed foods. Molybdenum is required for sulfite oxidase to function. Research on this enzyme comes from studies of rare genetic deficiency, not from testing whether extra molybdenum speeds up sulfite clearance in healthy people. Molybdenum is also a cofactor for aldehyde oxidase, one of several enzymes involved in processing aldehydes in the body. Molybdenum supports two enzyme pathways involved in sulfite and aldehyde processing." },
            { q: "Is 150 mcg of molybdenum safe?", a: "Yes. The Recommended Dietary Allowance is 45 mcg/day; the Tolerable Upper Intake Level is 2,000 mcg/day. Our 150 mcg sits about 3-4 times above basic intake and over 13 times below the UL - comfortable safety margin. Molybdenum has low oral toxicity at typical supplement doses. A human study found no adverse effects at intakes up to about 1,490 mcg per day over 24 days. Long-term data at this dose has not been established in the records we reviewed." },
            { q: "Will molybdenum interact with my medications?", a: "Molybdenum has no reported medication interactions at supplement doses. Very high, long-term molybdenum intake could theoretically affect copper status, but our 150 mcg dose is far below levels studied for that concern, and the formula also includes 2 mg of copper. No documented interactions with the standard POTS, MCAS, or hEDS medication stack. " },
            { q: "Why molybdenum glycinate vs other forms?", a: "Glycinate is the chelated form - molybdenum bound to glycine, the simplest amino acid. We use amino acid chelates for copper, manganese, magnesium and molybdenum. Human studies comparing these chelates with other mineral forms are limited." }
        ],
        triadPlain: {
            mcas: "Molybdenum is the cofactor for sulfite oxidase, the enzyme that converts sulfite to sulfate, and for aldehyde oxidase, one of several enzymes that process aldehydes. Molybdenum has not been studied in people with MCAS, and there is no research showing molybdenum supplementation changes how people handle dietary sulfites. Molybdenum is part of the trace mineral foundation of a formula designed for people with hEDS, POTS and MCAS.",
            heds: "Molybdenum takes part in sulfur amino acid metabolism. Sulfite oxidase, which needs molybdenum, is part of sulfur metabolism that produces sulfate. Molybdenum has not been studied in people with hEDS.",
            pots: "Molybdenum has no known direct effect on heart rate or blood pressure. Molybdenum has no direct autonomic mechanism. Some people notice wine and sulfite-containing foods as triggers, though there is no evidence that molybdenum supplementation changes how these are processed. Molybdenum has not been studied in people with POTS, and there are no documented interactions with the standard POTS medication stack."
        },
        bluf: "Molybdenum is an essential trace mineral required for the enzymes that detoxify sulfites and aldehydes. Molybdenum supports enzymes that process sulfites, and many multivitamins do not include it. ZebraThrive uses 150 mcg daily in the PM stack.",
        atAGlance: {
            whatItIs: "An essential trace mineral required for enzymes that detoxify sulfites and aldehydes",
            whyWeIncludeIt: "Molybdenum supports sulfite metabolism as an enzyme cofactor, based on biochemistry rather than a clinical trial in MCAS patients.",
            dose: "150 mcg daily (PM capsule)",
            keyBenefits: [
                "Essential cofactor for Sulfite Oxidase (sulfite → sulfate)",
                "",
                "",
                "Cofactor for aldehyde oxidase, one of the enzymes that process aldehydes"
            ]
        },
        howItWorks: "Molybdenum is the mandatory cofactor for Sulfite Oxidase. Molybdenum is part of the sulfite oxidase enzyme system that converts sulfite to sulfate in the body. Whether this affects sulfite sensitivity in MCAS has not been studied directly. Molybdenum is also a cofactor for aldehyde oxidase, one of several enzymes involved in processing aldehydes in the body. This has not been studied in relation to wine or alcohol reactions. Molybdenum is a cofactor for enzymes involved in two different detox pathways, though their relevance to MCAS has not been directly studied.",
        research: [
            {
                outcome: "Sulfite Oxidase Cofactor Function",
                summary: "Molybdenum is required for the molybdenum cofactor (Moco) that activates sulfite oxidase (SUOX), the mitochondrial enzyme that converts toxic sulfite to sulfate. Loss of SUOX function causes a severe genetic disease. Whether partial molybdenum status plays any role in sulfite sensitivity reported by some people has not been studied.",
                studies: [
                    {
                        source: "Claerhout H et al., \"Isolated sulfite oxidase deficiency\"",
                        pmid: "28980090",
                        design: "Literature review of 47 isolated sulfite oxidase deficiency patients",
                        finding: "Loss of SUOX function (homozygous mutations) produces severe pharmacoresistant seizures, neurological impairment, and sulfite/S-sulfocysteine accumulation; establishes Moco-SUOX axis as critical to sulfite handling"
                    },
                    {
                        source: "Kaczmarek AT et al., \"A defect in molybdenum cofactor binding causes an attenuated form of sulfite oxidase deficiency\"",
                        pmid: "34741542",
                        design: "Mechanistic biochemistry + clinical genetics, novel SUOX variant",
                        finding: "Moco insertion into SUOX is described as a crucial step in enzyme maturation. Defects in Moco binding produce attenuated SUOX deficiency phenotypes."
                    },
                    {
                        source: "Schwahn BC et al., \"Consensus guidelines for the diagnosis and management of isolated sulfite oxidase deficiency and molybdenum cofactor deficiencies\"",
                        pmid: "38627985",
                        design: "Expert consensus guideline with systematic literature search",
                        finding: "Describes the four ultrarare sulfite-intoxication disorders caused by loss of sulfite oxidase activity through defects in molybdenum cofactor synthesis or the SUOX apoenzyme, and their diagnosis and management"
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials of molybdenum in hEDS, POTS or MCAS populations. Its inclusion is based mainly on enzyme biochemistry, not on clinical studies.",
        triad: {
            mcas: " ",
            heds: "Molybdenum has not been studied in people with hEDS.",
            pots: ""
        },
        whyThisForm: {
            form: "Molybdenum glycinate chelate",
            rationale: "Dietary molybdenum in general is very efficiently absorbed, 88 to 93 percent, across a wide range of intakes in a small human study. We have not found a study directly comparing glycinate to sodium molybdate absorption. In a small human study, molybdenum intakes up to about 1,490 mcg a day for 24 days caused no adverse effects.",
            comparison: [
                { form: "Molybdenum Glycinate", difference: "Molybdenum glycinate chelate. Dietary molybdenum is about 88 to 93 percent absorbed in human studies.", selected: true },
                { form: "Sodium Molybdate", difference: "A common alternative form. We have not found a study directly comparing its absorption with molybdenum glycinate.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Low risk. ",
            interactions: "Molybdenum has no reported medication interactions at supplement doses, and no documented interactions with the standard POTS, MCAS, or hEDS medication stack. Very high, long-term molybdenum intake could theoretically affect copper status, but our 150 mcg dose is far below levels studied for that concern.",
            excipientConcerns: {
                avoid: ["Yeast-derived forms", "Titanium dioxide", "Magnesium stearate"],
                safe: ["HPMC capsules", "L-leucine", "Rice hull concentrate", "Maltodextrin and silica carrier on the molybdenum glycinate, under 6 mg a day (maltodextrin source being confirmed)"]
            },
            cautions: "At our 150 mcg dose there is no established need for copper monitoring, but as with any supplement, mention long term use to your clinician."
        },
        howToStart: {
            protocol: [
                { step: "Week 1+", dosage: "150 mcg daily", notes: "Full dose (PM capsule)" }
            ]
        },
        sources: [
            { title: "Isolated sulfite oxidase deficiency", pmid: "28980090", authors: "Claerhout H et al.", year: "2017" },
            { title: "A defect in molybdenum cofactor binding causes an attenuated form of sulfite oxidase deficiency", pmid: "34741542", authors: "Kaczmarek AT et al.", year: "2021" },
            { title: "Consensus guidelines for the diagnosis and management of isolated sulfite oxidase deficiency and molybdenum cofactor deficiencies", pmid: "38627985", authors: "Schwahn BC et al.", year: "2024" }
        ]
    },
    "copper-bisglycinate": {
        id: "copper-bisglycinate",
        name: "Copper Bisglycinate",
        patientSummary: "Copper is an essential trace mineral and the single non-negotiable cofactor for lysyl oxidase (LOX) - the enzyme that creates cross-links between collagen and elastin fibers. Cross-links are what give connective tissue its tensile strength. Without adequate copper, LOX can't function properly, and the collagen your body makes won't cross-link the way it needs to. Copper is one of the nutrients involved in collagen cross linking, which is relevant to connective tissue health, though we have not tested this formula in people with hEDS. A small 8 week pilot trial in 8 young adult women found that 2 mg per day of copper glycinate increased a urinary collagen cross link ratio by 62 percent. We dose 2 mg of elemental copper as copper bisglycinate, matching the elemental copper amount used in the DiSilvestro pilot trial, which used a different chelate (copper glycinate).",
        faq: [
            { q: "Why copper bisglycinate vs other copper forms?", a: "Bisglycinate is copper chelated to two glycine molecules. Chelated mineral forms are commonly used in supplements, but we do not have human absorption data comparing this specific form to others. We use copper bisglycinate and have a Certificate of Analysis on file for the lot we source." },
            { q: "Will copper interfere with zinc?", a: "Copper and zinc share intestinal transporters, so high-dose zinc taken at the same time can lower copper absorption. Copper is in the AM capsule, and zinc carnosine (37.5 mg, about 8.6 mg zinc) is in both the AM and PM capsules, about 17 mg zinc a day in total. This zinc to copper ratio, about 8.5 to 1, is within the commonly used range. If you take extra zinc separately, or take ZebraThrive long term, ask your clinician about a yearly copper level and blood count check, especially if you have kidney disease." },
            { q: "Is 2 mg of copper safe long-term?", a: "Yes. The 2 mg dose matches the elemental copper amount used in a small 8 week pilot trial, which did not report any adverse effects, though the trial was not designed to assess long term safety. The Tolerable Upper Intake Level for adults is 10 mg/day, so 2 mg sits comfortably at one-fifth of the UL. One screening consideration: if you have a family history of Wilson disease (a genetic copper-handling disorder, about 1 in 40-90 carrier frequency), mention it to your prescriber and consider a baseline serum copper test before chronic supplementation." },
            { q: "Why does copper matter for connective tissue?", a: "Copper is the essential cofactor for lysyl oxidase (LOX), the enzyme that creates the cross-links giving collagen and elastin their tensile strength. Without adequate copper, those cross-links can't form properly. Rare genetic copper transport disorders show that copper is important for collagen and elastin cross linking, but this does not mean copper supplementation treats hEDS." }
        ],
        triadPlain: {
            mcas: "Copper has a nuanced relationship with mast cells. Excess copper can promote mast cell maturation, and copper interacts with tryptase activity in complex ways. At the 2 mg dose we use, we are not aware of evidence that copper's excess effects on mast cells come into play, but there is no dedicated human study at this dose and population to confirm that. ",
            heds: "Copper is one of several trace minerals involved in collagen cross linking, which may be relevant to connective tissue health, though this has not been tested in people with hEDS. Lysyl oxidase (LOX) is the enzyme that cross links collagen and elastin fibers, and copper is the metal cofactor it requires to work. Without adequate copper, cross-links can't form properly, and the collagen your body produces won't have the tensile strength it needs. This formula uses 2 mg of copper as copper bisglycinate, designed for people with hEDS, but no trial has tested this in an hEDS population.",
            pots: "Copper has not been studied in people with POTS. It is in the formula for its normal role as a cofactor for lysyl oxidase, the enzyme that cross links collagen. We have not found data on heart rate effects at the 2 mg dose."
        },
        bluf: "Copper bisglycinate is copper bound to the amino acid glycine. Copper is a cofactor for lysyl oxidase (LOX), the enzyme that creates the covalent crosslinks giving collagen its tensile strength. This formula is designed for people with hEDS, but no trial has shown this changes collagen crosslinking in hEDS. ZebraThrive uses 2 mg elemental daily in the AM stack.",
        atAGlance: {
            whatItIs: "An essential trace mineral, here as an amino acid chelate, that is the cofactor for the enzyme that cross-links collagen fibers",
            whyWeIncludeIt: "Required for lysyl oxidase (LOX), the enzyme responsible for creating the covalent bonds that give collagen its tensile strength",
            dose: "2 mg elemental copper daily (AM capsule)",
            keyBenefits: [
                "A small RCT in healthy young women found a 62 percent higher urinary collagen crosslink marker with copper glycinate, not the bisglycinate form used here.",
                "In a lab study using rat mast cells, copper reduced histamine release in a dose dependent way. This has not been shown in humans or at supplement doses.",
                "Critical cofactor for DAO (histamine degradation enzyme)",
                "Cofactor for dopamine beta-hydroxylase (norepinephrine synthesis)"
            ]
        },
        howItWorks: "Copper is a required cofactor for lysyl oxidase (LOX), the enzyme that weaves collagen threads together into strong tissue. In rats, copper deficiency increased the number of mast cells in tissue, though the histamine content and release behavior per cell did not change. Copper is also a cofactor for diamine oxidase (DAO), which breaks down histamine. Copper is a cofactor for dopamine beta hydroxylase, the enzyme that converts dopamine to norepinephrine. This is a general biological role and has not been tested for an effect on POTS symptoms.",
        research: [
            {
                outcome: "Collagen Cross-Linking",
                summary: "A small pilot RCT in 8 young women found a higher urinary collagen crosslink ratio after copper supplementation.",
                studies: [
                    {
                        source: "DiSilvestro et al., 2010",
                        pmid: "20569928",
                        finding: "In a small trial of 8 young women, 2 mg per day of copper glycinate for 8 weeks produced a 62 percent increase in the urinary ratio of collagen crosslinks to total collagen."
                    }
                ]
            },
            {
                outcome: "Mast Cells (Lab and Animal Studies)",
                summary: "One lab study in rat mast cells found copper reduced histamine release, but other evidence suggests copper's relationship with mast cells is complex and excess copper may promote mast cell maturation.",
                studies: [
                    {
                        source: "Sharma & Jande, 1989",
                        pmid: "2476088",
                        finding: "In a lab study, rat peritoneal mast cells exposed to copper showed dose dependent inhibition of histamine release."
                    },
                    {
                        source: "Schuschke et al., 1994",
                        pmid: "7528379",
                        finding: "In an animal study, copper deficient rats had 53 percent more mast cells in a muscle tissue sample than copper adequate rats."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct clinical trials in EDS/POTS cohorts; the 2025 KLK15 discovery suggests LOX mislocalization may be a factor in EDS regardless of copper levels.",
        triad: {
            mcas: "Copper has a complex relationship with mast cells, and there is no dedicated human study of copper at this dose in people with mast cell conditions.",
            heds: "Copper is the cofactor for lysyl oxidase, the collagen cross-linking enzyme.",
            pots: "Copper has not been studied in people with POTS."
        },
        whyThisForm: {
            form: "Copper bisglycinate (generic chelate; citric-acid-free, magnesium-stearate-free)",
            rationale: "Copper bisglycinate uses an amino acid chelate delivery approach. Human bioavailability data for this specific form has not been established. We use a generic chelate because the branded chelate we evaluated contains citric acid.",
            comparison: [
                { form: "Copper Bisglycinate", difference: "Copper bisglycinate is an amino acid chelate form. Human data comparing its bioavailability and GI tolerance to other copper forms has not been established.", selected: true },
                { form: "Copper Sulfate", difference: "A common copper salt; no human study has compared it with copper bisglycinate", selected: false }
            ]
        },
        safety: {
            sideEffects: "At 2 mg, copper is generally well tolerated and the dose is one fifth of the adult Tolerable Upper Intake Level. We have not found data specifically on heart rate effects at this dose.",
            interactions: "High dose zinc can reduce copper absorption. This formula pairs about 17 mg of zinc with 2 mg of copper per day. If you take extra zinc separately, mention it to your clinician. For long term use, an annual copper level or blood count check is a reasonable addition, especially if you have kidney disease. Contraindicated with penicillamine.",
            excipientConcerns: {
                avoid: ["This product does not use copper citrate.", "Citric acid (we use a generic chelate because the branded chelate we evaluated contains it)"],
                safe: ["Rice hull concentrate", "HPMC capsules"]
            },
            cautions: "Very high dose vitamin C can affect copper handling. As a precaution, take the Daily Powder 2 to 3 hours apart from the AM capsules. Wilson disease is an absolute contraindication."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "The full AM serving (3 capsules) provides 2 mg of copper. If you are sensitive to new supplements, talk with your clinician about how to start.", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "2 mg daily", notes: "Target maintenance (AM capsule)" }
            ],
            timeline: "In the small copper trial on collagen cross links, 8 weeks was the time point tested, not a proven minimum."
        },
        sources: [
            { title: "Copper supplementation effects on cardiovascular health", pmid: "20569928", authors: "DiSilvestro et al.", year: "2010" },
            { title: "Copper deficiency in patients with cystinosis with cysteamine toxicity", pmid: "23651769", authors: "Besouw M et al.", year: "2013" },
            { title: "Histamine release from mast cells - effects of copper", pmid: "2476088", authors: "Sharma & Jande", year: "1989" },
            { title: "Copper deficiency increases mast cell numbers", pmid: "7528379", authors: "Schuschke et al.", year: "1994" }
        ]
    },
    "manganese-bisglycinate": {
        id: "manganese-bisglycinate",
        name: "Manganese Bisglycinate",
        patientSummary: "Manganese is an essential trace mineral that serves as a cofactor for several enzymes involved in connective tissue, including prolidase, which helps recycle proline for collagen synthesis, glycosyltransferases involved in collagen modification, and enzymes involved in making chondroitin sulfate. It's also the cofactor for MnSOD (mitochondrial superoxide dismutase), the primary antioxidant defense inside your mitochondria. In an animal study, manganese deficiency in broiler chicks upregulated MMP-1, MMP-9, and MMP-13 in the growth plate. We include manganese as part of supporting normal connective tissue metabolism, not as a treatment for hEDS. We dose 4 mg elemental manganese as manganese bisglycinate in the AM capsule.",
        faq: [
            { q: "Why is manganese in the formulation?", a: "Manganese is essential for several connective tissue enzymes (prolidase for proline recycling, glycosyltransferases for collagen modification) and for MnSOD, the mitochondrial antioxidant. We include manganese to support normal connective tissue metabolism generally, not as a treatment for hEDS." },
            { q: "Is 4 mg of manganese safe?", a: "Yes. The Tolerable Upper Intake Level for manganese in adults is 11 mg per day, and typical dietary intake from food ranges from about 1.8 to 4 mg depending on diet. Our 4 mg dose sits comfortably between dietary baseline and the UL. Manganese toxicity concerns mostly involve chronic high-dose inhaled exposure, such as in welders or miners, but can also occur with chronic liver disease or high-dose IV nutrition, which bypass the liver's normal regulation. Oral manganese supplements have a long history of use, and our 4 mg daily dose is well below the tolerable upper limit, but people with liver disease, iron deficiency, or who are elderly should talk to their doctor first." },
            { q: "Does manganese trigger mast cells?", a: "No, there is no evidence manganese triggers mast cells at supplement doses." },
            { q: "Are there interactions with other minerals?", a: "Manganese competes with iron and calcium at intestinal transporters, so very high doses of those minerals can reduce manganese absorption. At our 4 mg dose, this generally isn't a concern for most people, though we still recommend spacing from high-dose iron or calcium supplements. For best absorption, take the AM capsules at least 2 hours apart from iron or calcium supplements. Manganese has no known clinically significant direct interactions with most standard POTS, MCAS, or hEDS medications, though methylphenidate and combined oral contraceptives can mildly affect manganese status; most pairs simply have not been studied." }
        ],
        triadPlain: {
            mcas: "There is no direct evidence that manganese affects MCAS at nutritional doses, and there is also no evidence it acts as a mast cell trigger at supplement doses. Manganese is in the formula as the cofactor for MnSOD (mitochondrial superoxide dismutase), the mitochondrial antioxidant enzyme, and for enzymes involved in connective tissue. No interactions with MCAS medications have been reported, though none has been studied.",
            heds: "Manganese is a required cofactor for multiple enzymes involved in collagen synthesis and modification, which is relevant to connective tissue health in general. Prolidase recycles proline from collagen breakdown - without adequate manganese, proline isn't efficiently returned to the pool for new collagen synthesis. Glycosyltransferases, which need manganese, help attach sugar groups during collagen modification, based on biochemical studies. Manganese has not been studied in people with hEDS. Getting enough manganese supports normal activity of these collagen related enzymes, based on animal research.",
            pots: "Manganese supports MnSOD, part of mitochondrial antioxidant defense, which plays a role in general cellular energy metabolism. There is no direct POTS clinical evidence for manganese. No interactions with POTS medications have been reported, though none has been studied."
        },
        bluf: "Manganese is an essential trace mineral and a cofactor for SOD2 (mitochondrial antioxidant), glycosyltransferases (involved in building connective tissue components), and prolidase (which recycles proline for collagen synthesis). These are general nutrient roles relevant to connective tissue health. ZebraThrive uses 4 mg elemental daily, paired with copper in the AM stack to support balanced trace mineral status.",
        atAGlance: {
            whatItIs: "An essential trace mineral that serves as the cofactor for enzymes in connective tissue synthesis and mitochondrial protection",
            whyWeIncludeIt: "Required for SOD2 (mitochondrial antioxidant), glycosyltransferases (involved in connective tissue modification based on biochemical studies), and prolidase (collagen recycling)",
            dose: "4 mg elemental manganese daily (AM capsule)",
            keyBenefits: [
                "Essential cofactor for MnSOD (SOD2) mitochondrial protection",
                "In an animal study, adequate manganese was associated with lower upregulation of collagen degrading enzymes (MMPs).",
                "Required for enzymes involved in building glycosaminoglycans, based on biochemical studies.",
                ""
            ]
        },
        howItWorks: "Manganese powers SOD2, the primary antioxidant protecting mitochondria (cellular powerhouses). In an animal study in broiler chicks, manganese deficiency raised MMP-1, MMP-9 and MMP-13 in the growth plate. ",
        research: [
            {
                outcome: "Connective Tissue Protection",
                summary: "In an animal study, manganese deficiency increased collagen degrading enzymes, creating conditions linked to tissue breakdown in that model.",
                studies: [
                    {
                        source: "Dong et al., 2021",
                        pmid: "34546491",
                        finding: "In an animal study (broiler chicks, 2022), manganese deficiency upregulated MMP-1, MMP-9, and MMP-13 in the growth plate."
                    }
                ]
            },
            {
                outcome: "Mitochondrial Antioxidant Enzyme (MnSOD)",
                summary: "",
                studies: [
                    {
                        source: "Davis & Greger, 1992",
                        pmid: "1550052",
                        finding: "In a small trial, 15 mg per day of manganese for 124 days increased lymphocyte MnSOD activity and serum manganese in women. This is a higher dose than our 4 mg formula."
                    },
                    {
                        source: "Hide M, Beaven MA, \"Suppression of IgE-mediated mast cell activation by Mn2+\"",
                        pmid: "1869551",
                        design: "In vitro mast cell study",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Essential Cofactor Role and Dosing Context",
                summary: "Manganese is the cofactor for arginase, glutamine synthetase, pyruvate carboxylase, and Mn-SOD. These metalloproteins underpin antioxidant defense (Mn-SOD), urea-cycle handling (arginase), glutamine metabolism (GS), and TCA-cycle anaplerosis (pyruvate carboxylase). Daily dietary intake is the primary determinant of status; our 4 mg supplement dose sits well below the UL (11 mg/day).",
                studies: [
                    {
                        source: "Chen P, Bornhorst J, Aschner M, \"Manganese metabolism in humans\"",
                        pmid: "29293455",
                        design: "Comprehensive metabolic review",
                        finding: "Manganese is essential for development, digestion, reproduction, antioxidant defense, energy production, and immune response via cofactor function for arginase, GS, pyruvate carboxylase, and Mn-SOD; deficiency is rare"
                    },
                    {
                        source: "Martins AC et al., \"Manganese in the Diet: Bioaccessibility, Adequate Intake, and Neurotoxicological Effects\"",
                        pmid: "32298096",
                        design: "Review of dietary manganese intake, bioaccessibility and neurotoxicity",
                        finding: "This review covers manganese occurrence in food, bioaccessibility, and adequate intake levels by age, and discusses neurotoxicity risk."
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials in EDS/POTS cohorts.",
        triad: {
            mcas: " Manganese is the cofactor for SOD2, your mitochondrial antioxidant enzyme, which supports your body's general oxidative stress defenses. We use a generic manganese bisglycinate chelate; we are still resolving a conflicting lab result on citrate content for this lot before calling it clean-label.",
            heds: "We include manganese to support normal collagen-related enzyme function. Manganese is a cofactor for glycosyltransferases, enzymes involved in building glycosaminoglycans in connective tissue.",
            pots: "Manganese supports SOD2, your mitochondrial antioxidant enzyme, as part of general cellular energy support."
        },
        whyThisForm: {
            form: "Manganese bisglycinate, a generic chelate",
            rationale: "Manganese bisglycinate is a chelated form, delivered via amino acid transport pathways. We use a generic chelate because the branded chelate we evaluated contains citric acid. We are still resolving a conflicting lab result on citrate content for our current lot before confirming it as citric acid free.",
            comparison: [
                { form: "Manganese Bisglycinate", difference: "Chelated manganese is absorbed via amino acid transport pathways.", selected: true },
                { form: "Manganese Sulfate", difference: "Manganese sulfate is a standard reference form used in research.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Well-tolerated at 4mg (dose is below IOM upper limit of 11mg). Neurotoxicity risk is mainly linked to chronic high-dose inhalation exposure, though liver disease, parenteral nutrition, and contaminated water sources are also recognized risk factors.",
            interactions: "No reported interactions with POTS or MCAS medications (none has been studied). Separate from tetracyclines by 2+ hours.",
            excipientConcerns: {
                avoid: ["Citric acid (supplier confirmation pending for this lot)", "Soy-based fillers"],
                safe: ["Rice hull concentrate", "HPMC capsules"]
            },
            cautions: "Iron status affects absorption (low ferritin increases manganese uptake)."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "The full AM serving (3 capsules) provides 4 mg of manganese. If you are sensitive to new supplements, talk with your clinician about how to start.", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "4 mg daily", notes: "Target maintenance (AM capsule)" }
            ],
            timeline: "In a small 124 day human trial, 15 mg per day of manganese increased a marker of SOD2 activity. Our 4 mg dose has not been tested the same way."
        },
        sources: [
            { title: "Changes of manganese-dependent superoxide dismutase activities and expression with sustained manganese supplementation", pmid: "1550052", authors: "Davis CD, Greger JL", year: "1992" },
            { title: "Manganese deficiency increases MMP expression", pmid: "34546491", authors: "Dong et al.", year: "2021" },
            
            { title: "Manganese metabolism in humans", pmid: "29293455", authors: "Chen P, Bornhorst J, Aschner M", year: "2018" },
            { title: "Manganese in the Diet: Bioaccessibility, Adequate Intake, and Neurotoxicological Effects", pmid: "32298096", authors: "Martins AC et al.", year: "2020" }
        ]
    },
    "selenium": {
        id: "selenium",
        name: "Selenium (Selenomethionine)",
        patientSummary: "Selenium is an essential trace mineral and the core element of selenoproteins - most importantly the glutathione peroxidase family (GPx), your body's primary defense against lipid peroxidation. Selenium also supports thyroid hormone conversion, immune regulation, and DNA repair. Selenium supports your body's general antioxidant defenses as part of the formula's broader anti-inflammatory support. We use synthetic L-selenomethionine (not selenium yeast), an organic form of selenium. 100 mcg in the PM capsule, well within the standard supplement range.",
        faq: [
            { q: "Why selenomethionine vs other selenium forms?", a: "Selenomethionine is the organic form found naturally in plants and animal proteins. It is absorbed through the methionine amino acid transport pathway, which generally gives it strong bioavailability compared to inorganic forms. Selenite, an inorganic form, is generally absorbed less efficiently than selenomethionine. Selenium yeast is mostly selenomethionine, but it is a fermented, yeast-derived ingredient, which we avoid per our formulation fermentation policy. Synthetic L-selenomethionine gives you the bioavailable form, confirmed in writing as synthetic rather than yeast-derived, and that is what we use." },
            { q: "Is selenium safe long-term?", a: "At 100 mcg, this is within the range considered generally well tolerated. The Recommended Dietary Allowance is 55 mcg/day; the Tolerable Upper Intake Level is 400 mcg/day. Our 100 mcg is below the Tolerable Upper Intake Level, but if your selenium status is already adequate, additional supplementation may not be advisable, so check with your clinician. Selenium has a relatively narrow therapeutic window - adequate is essential, but very high doses can cause selenosis (hair, nail, neurological changes) over months. If you eat a lot of Brazil nuts (which are extremely selenium-dense), watch your total intake." },
            { q: "What does selenium do for the thyroid?", a: "Selenium is the cofactor for the deiodinase enzymes that convert T4 to active T3, and the thyroid uses selenium-dependent antioxidant enzymes to protect itself during normal hormone production. That is normal thyroid function support. If you have a diagnosed thyroid condition, talk with your clinician before adding selenium, and do not use this formula in place of thyroid treatment." },
            { q: "Will selenium interact with my medications?", a: "Selenium has no reported harmful interactions with standard POTS, MCAS, and hEDS medications. Levothyroxine and sertraline have been studied in controlled trials with no clinically relevant concerns found. No documented interactions with beta-blockers, midodrine, fludrocortisone, ivabradine, antihistamines, or mast cell stabilizers." }
        ],
        triadPlain: {
            mcas: "Selenium supports glutathione peroxidase activity, part of the body's general antioxidant defense system. This is general antioxidant support, not a treatment for mast cell activation. There are no direct trials of selenium in people with MCAS, and no documented interactions with antihistamines or mast cell stabilizers.",
            heds: "Selenium does not have a direct connective tissue mechanism. Selenium's GPx-supporting role helps keep your body's general antioxidant defense system topped up. Selenium is needed to make selenoprotein P, which carries at least 40 percent of the selenium in blood plasma. There are no direct trials of selenium in people with hEDS.",
            pots: "Selenium is a cofactor for the deiodinase enzymes that convert T4 to T3, part of normal thyroid hormone metabolism. Selenium's GPx activity supports your body's general antioxidant defenses. There are no direct POTS trials of selenium, and no documented interactions with beta-blockers, midodrine, fludrocortisone or ivabradine."
        },
        bluf: "Selenium is an essential trace mineral, supplied here in an organic form, selenomethionine. It is the critical cofactor for glutathione peroxidase (the body's primary cellular antioxidant) and for thyroid hormone conversion. These pathways can be supported by adequate selenium intake. ZebraThrive uses 100 mcg daily in the PM stack.",
        atAGlance: {
            whatItIs: "An essential trace mineral in an organic form.",
            whyWeIncludeIt: "Critical cofactor for Glutathione Peroxidase (cellular antioxidant) and thyroid hormone conversion",
            dose: "100 mcg daily (PM capsule)",
            keyBenefits: [
                "Essential for Glutathione Peroxidase cellular defense",
                "Cofactor for the deiodinases that support normal thyroid hormone conversion",
                "Selenium's role in glutathione peroxidase activity may help limit buildup of reactive oxygen species like hydrogen peroxide.",
                ""
            ]
        },
        howItWorks: "Selenium is the mandatory cofactor for Selenoproteins, primarily Glutathione Peroxidase (GPx). GPx helps neutralize oxidative stress, which is part of the body's normal antioxidant defense. Selenium is a cofactor for deiodinase enzymes that convert T4 to T3, supporting normal thyroid hormone conversion.",
        research: [
            {
                outcome: "Thyroid Biology (Studies in Autoimmune Thyroiditis)",
                summary: "Studies of adults with autoimmune thyroiditis have measured thyroid peroxidase antibodies during selenium supplementation, usually at 200 mcg per day, twice our dose. We cite them for selenium's role in thyroid biology, not as a treatment claim for any thyroid condition.",
                studies: [
                    {
                        source: "Wichman J et al., \"Selenium Supplementation Significantly Reduces Thyroid Autoantibody Levels in Patients with Chronic Autoimmune Thyroiditis: A Systematic Review and Meta-Analysis\"",
                        pmid: "27702392",
                        design: "Systematic review + meta-analysis of 16 controlled trials in autoimmune thyroiditis",
                        finding: "Pooled 16 controlled trials in adults with chronic autoimmune thyroiditis; TPOAb levels were measured at 3, 6, and 12 months"
                    },
                    {
                        source: "van Zuuren EJ et al., \"Selenium supplementation for Hashimoto thyroiditis\"",
                        pmid: "23744563",
                        design: "Cochrane systematic review, 4 RCTs, 463 participants",
                        finding: "This review covered 4 RCTs (463 participants) in adults with Hashimoto thyroiditis, mostly using 200 mcg per day selenomethionine. Adverse events were not significantly increased in these trials."
                    }
                ]
            },
            {
                outcome: "Antioxidant and Extracellular Oxidant Defense",
                summary: "Selenium is a cofactor for glutathione peroxidases, and selenoprotein P accounts for at least 40 percent of total plasma selenium and is thought to act as an extracellular antioxidant defense. Selenium supports normal redox balance as part of general antioxidant defense.",
                studies: [
                    {
                        source: "Rayman MP, \"Selenium and human health\"",
                        pmid: "22381456",
                        design: "Authoritative narrative review (Lancet)",
                        finding: "Comprehensive review of selenium status, selenoproteins (GPx family, SelP), and human health outcomes; baseline dietary intake and supplementation"
                    },
                    {
                        source: "Moschos MP, \"Selenoprotein P\"",
                        pmid: "11215510",
                        design: "Mechanistic review",
                        finding: "Selenoprotein P accounts for at least 40% of total plasma selenium; protects against peroxynitrite-mediated oxidation; functions as extracellular oxidant defense"
                    }
                ]
            }
        ],
        evidenceGaps: "No direct trials specifically in hEDS, POTS, or MCAS populations; findings are extrapolated from general selenium biology and from studies in other populations.",
        triad: {
            mcas: "Selenium supports antioxidant defenses as part of general cellular health. We use synthetic L-selenomethionine, not selenium yeast. The selenomethionine itself is confirmed non-fermented, though the carrier in the premix has not yet been fully disclosed.",
            heds: " Selenium and manganese both support antioxidant enzyme systems, though a direct synergy between them has not been studied.",
            pots: "Selenium supports normal thyroid hormone conversion (T4 to T3)."
        },
        whyThisForm: {
            form: "Synthetic L-selenomethionine (not selenium yeast)",
            rationale: "Selenomethionine is the organic form of selenium and is generally considered to absorb more efficiently than inorganic forms like selenite, based on general selenium literature. Generic selenomethionine is often selenium-enriched yeast; ours is confirmed in writing as synthetic L-selenomethionine, not yeast-derived.",
            comparison: [
                { form: "Synthetic L-selenomethionine", difference: "Organic selenomethionine, considered to have good bioavailability, no yeast carrier.", selected: true },
                { form: "Selenium yeast", difference: "Mostly selenomethionine, but yeast-derived and fermented; not used", selected: false },
                { form: "Sodium Selenite", difference: "Sodium selenite, an inorganic form, is generally considered to have somewhat lower bioavailability and retention than organic forms.", selected: false }
            ]
        },
        safety: {
            sideEffects: "Well-tolerated at 100mcg (upper tolerable limit is 400mcg). Excessive dose can cause garlic-like breath or metallic taste.",
            interactions: "Selenium and levothyroxine have been studied together in people on thyroid hormone replacement, with no clinically relevant change in thyroid hormone levels or dosing needs found. If you take levothyroxine, mention selenium to your prescriber as routine practice. ",
            excipientConcerns: {
                avoid: ["Sulfites", "Artificial dyes"],
                safe: ["HPMC capsules", "Rice hull concentrate"]
            },
            cautions: "Selenium has a relatively narrow range between adequate and excessive intake, so stick to the labeled dose and do not add extra selenium supplements on top of this formula. We are confirming the source of the maltodextrin and selenium premix carrier used in this capsule, including that it is free of sulfites, and will update this once finalized."
        },
        howToStart: {
            protocol: [
                { step: "Weeks 1-2", dosage: "The full serving of 3 PM capsules provides 100 mcg of selenium; each capsule provides about 33 mcg.", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "100 mcg daily", notes: "Target maintenance (PM capsule)" }
            ],
            timeline: "Selenium levels in the body typically take a few months of consistent use to stabilize, based on general selenium research."
        },
        sources: [
            { title: "Selenium and human health", pmid: "22381456", authors: "Rayman MP", year: "2012" },
            { title: "Selenium Supplementation Significantly Reduces Thyroid Autoantibody Levels in Patients with Chronic Autoimmune Thyroiditis: A Systematic Review and Meta-Analysis", pmid: "27702392", authors: "Wichman J et al.", year: "2016" },
            { title: "Selenium supplementation for Hashimoto thyroiditis", pmid: "23744563", authors: "van Zuuren EJ et al.", year: "2013" },
            { title: "Selenoprotein P", pmid: "11215510", authors: "Moschos MP", year: "2000" }
        ]
    },
    "methylfolate": {
        id: "methylfolate",
        name: "Methylfolate (5-MTHF)",
        patientSummary: "Methylfolate is the active, methylated form of folate (vitamin B9), the form your cells use directly without needing MTHFR enzyme conversion. We use methylfolate, the form of folate that circulates in the blood. We use the (6S)-5-MTHF calcium salt at 800 mcg in the AM capsule. Folate helps the body make SAMe, the methyl donor used by many enzymes, including enzymes that break down histamine and adrenaline-like hormones.",
        faq: [
            { q: "Methylfolate vs folic acid: what is the difference?", a: "Folic acid is the synthetic form most commonly used in fortified foods and basic supplements. It has to be converted through DHFR and then MTHFR to become biologically active. Methylfolate does not need that step, and taking it does not leave unconverted folic acid in the blood. We chose methylfolate because it is the active form and does not need conversion." },
            { q: "What's the MTHFR connection to hEDS?", a: "A 2024 single-clinic study at Tulane (Courseault et al.) found that 85% of patients with hEDS or HSD carried a C677T or A1298C MTHFR variant. The study had no comparison group. Some MTHFR variants reduce how much active folate the body makes, which can raise homocysteine. The study did not test methylfolate or any other form of folate." },
            { q: "I've heard some people react badly to methylfolate - should I worry?", a: "It's real. Some people report feeling anxious, irritable or having trouble sleeping when they start methylated B vitamins. We have not found a reliable study of how often this happens. If you tend to react to new supplements, start slowly and talk with your clinician. We deliberately dose 800 mcg in the AM capsule, conservative compared with prescription-strength L-methylfolate products, which run many times higher. If you have reacted to methylated B vitamins before, talk with your clinician before starting. Note that the AM capsules also contain vitamins D3, K2 and B12 and minerals." },
            { q: "How does methylfolate relate to histamine?", a: "Methylfolate doesn't break down histamine directly, but it's foundational to the methylation pathway that does. Your body breaks down histamine through HNMT (in your cells and CNS) and DAO (in your gut). HNMT uses methyl groups from SAMe to inactivate histamine. SAMe is regenerated through the methylfolate-B12 cycle. Methylfolate keeps that cycle turning." }
        ],
        triadPlain: {
            mcas: "No clinical trials have tested methylfolate in people with MCAS. The 800 mcg AM dose is low compared with prescription L-methylfolate products (7.5 to 15 mg in trials).",
            heds: "No clinical trials have tested methylfolate in people with hEDS. If you have reacted to methylated B vitamins before, talk with your clinician before starting.",
            pots: "No clinical trials have tested methylfolate in people with POTS. A 2021 single-patient case report (Mittal) discussed methylated B vitamins in a person with a COMT gene variant; one case cannot establish benefit. "
        },
        bluf: "Methylfolate (5-MTHF) is the bioactive form of folate that bypasses MTHFR genetic blocks. Methylfolate is already the active form, so it does not depend on the MTHFR conversion step. Methylfolate is needed for normal methylation and normal homocysteine metabolism. ZebraThrive uses 800 mcg daily in the AM stack.",
        atAGlance: {
            whatItIs: "The active form of folate, which does not need the MTHFR conversion step.",
            whyWeIncludeIt: "Included as the active form of folate, which supports normal methylation and homocysteine metabolism.",
            dose: "800 mcg daily (AM capsule)",
            keyBenefits: [
                "",
                "Supports normal methylation",
                "",
                "Helps supply SAMe, the methyl donor used by many enzymes"
            ]
        },
        howItWorks: "Methylfolate bypasses the MTHFR enzyme block to provide active folate. Methylfolate helps protect BH4 from breakdown in blood vessel studies and supplies methyl groups the body uses to make SAMe.",
        research: [
            {
                outcome: "hEDS-Specific Genetic Association",
                summary: "A single-clinic study found a high prevalence of MTHFR variants in people with hEDS or HSD. It did not test folate or any folate form.",
                studies: [
                    {
                        source: "Courseault J et al., \"MTHFR Polymorphisms in Patients With hEDS\"",
                        pmid: "38523329",
                        design: "Single-center prevalence study, Tulane EDS clinic",
                        finding: "85% of patients with hEDS or HSD carried a C677T or A1298C MTHFR variant (hEDS subgroup 84%); no comparison group."
                    },
                    {
                        source: "Courseault J et al., \"Folate-dependent hypermobility syndrome: A proposed mechanism\"",
                        pmid: "37095957",
                        design: "Proposed mechanism and literature review",
                        finding: "A hypothesis paper that reports no new data; its proposed mechanism has not been tested."
                    }
                ]
            },
            {
                outcome: "L-Methylfolate Bioavailability vs Folic Acid",
                summary: "L-5-methyltetrahydrofolate (L-5-MTHF) is the only folate species normally circulating in plasma. Studies show L-5-MTHF is at least as bioavailable as folic acid and does not leave unmetabolized folic acid in the blood.",
                studies: [
                    {
                        source: "Pietrzik K et al., \"Folic acid and L-5-methyltetrahydrofolate: comparison of clinical pharmacokinetics and pharmacodynamics\"",
                        pmid: "20608755",
                        design: "Review comparing folic acid and L-5-MTHF",
                        finding: "L-5-MTHF at least as effective as folic acid for raising folate status and lowering plasma homocysteine; reduced risk of masking B12-deficiency hematological signs; reduced antifolate-drug interaction"
                    },
                    {
                        source: "Wright AJA et al., \"Comparison of (6S)-5-methyltetrahydrofolic acid v. folic acid as the reference folate in longer-term human dietary intervention studies\"",
                        pmid: "19852872",
                        design: "16-week placebo-controlled RCT in 163 healthy adults",
                        finding: "Used as reference folates, (6S)-5-MTHF and folic acid gave similar red-cell folate responses; the authors recommended 5-MTHF as the reference folate for future studies."
                    }
                ]
            },
            {
                outcome: "Methylated B Vitamins: Single Case Report",
                summary: "One published case report discusses methylated B vitamins in a person with a COMT gene variant. Case reports are the lowest level of clinical evidence and cannot show that a supplement caused a change.",
                studies: [
                    {
                        source: "Mittal N et al., \"Improvement of hyperadrenergic postural orthostatic tachycardia syndrome (POTS) with methylated B vitamins in the setting of a heterozygous COMT Val158Met polymorphism\"",
                        pmid: "34764114",
                        design: "Case report (n=1), BMJ Case Reports",
                        finding: "Describes a single adult with POTS and a heterozygous COMT Val158Met variant who was given methylated B vitamins. Cited for the methylation-catecholamine hypothesis, not as evidence of benefit"
                    }
                ]
            }
        ],
        evidenceGaps: "The MTHFR prevalence data come from a single-center study. No clinical trials have tested methylfolate in hEDS, POTS, or MCAS.",
        triad: {
            mcas: "No clinical trials have tested methylfolate in MCAS. 800 mcg is far below the 7.5 to 15 mg doses used in prescription L-methylfolate trials.",
            heds: " ",
            pots: " "
        },
        whyThisForm: {
            form: "(6S)-5-MTHF calcium salt",
            rationale: "The active form of folate; bypasses the MTHFR conversion step. We use the calcium salt of (6S)-5-MTHF (confirmed by supplier statement), which contains no glucosamine.",
            comparison: [
                { form: "(6S)-5-MTHF calcium salt", difference: "Our form; active folate; no shellfish-derived component", selected: true },
                { form: "(6S)-5-MTHF glucosamine salt", difference: "Not used; we chose the calcium salt", selected: false },
                { form: "Folic Acid", difference: "Synthetic form that requires conversion, including through MTHFR", selected: false }
            ]
        },
        safety: {
            sideEffects: "Generally well-tolerated. Some people report anxiety, irritability or poor sleep when starting methylated B vitamins. If that happens, stop and talk with your clinician.",
            interactions: "Propranolol: whether methylfolate adds to propranolol's effect on blood pressure or heart rate has not been tested; if you take propranolol, mention it to your prescriber. Methotrexate works by blocking folate, and folate supplements can change how methotrexate works. If you take methotrexate, talk with your prescriber before taking this formula. May mask B12 deficiency (always paired with B12 in ZebraThrive).",
            excipientConcerns: {
                avoid: ["Artificial colors", "Corn-derived fillers (maltodextrin source in the AM capsule being confirmed)"],
                safe: ["HPMC capsules", "Rice hull concentrate"]
            },
            cautions: "Always ensure B12 status is optimized alongside folate to prevent neurological masking."
        },
        howToStart: {
            protocol: [
                { step: "Daily", dosage: "The full AM serving (3 capsules) provides 800 mcg of methylfolate. If you are sensitive to methylated B vitamins, talk with your clinician about how to start.", notes: "Assess methylation sensitivity" },
                { step: "Weeks 3-4", dosage: "", notes: "" },
                { step: "Week 5+", dosage: "", notes: "" }
            ],
            timeline: ""
        },
        sources: [
            { title: "MTHFR Polymorphisms in Patients With hEDS", pmid: "38523329", authors: "Courseault J et al.", year: "2024" },
            { title: "Folate-dependent hypermobility syndrome: A proposed mechanism", pmid: "37095957", authors: "Courseault J et al.", year: "2023" },
            { title: "Folic acid and L-5-methyltetrahydrofolate: comparison of clinical pharmacokinetics and pharmacodynamics", pmid: "20608755", authors: "Pietrzik K et al.", year: "2010" },
            { title: "Comparison of (6S)-5-methyltetrahydrofolic acid v. folic acid as the reference folate in longer-term human dietary intervention studies", pmid: "19852872", authors: "Wright AJA et al.", year: "2009" },
            { title: "Improvement of hyperadrenergic postural orthostatic tachycardia syndrome (POTS) with methylated B vitamins in the setting of a heterozygous COMT Val158Met polymorphism", pmid: "34764114", authors: "Mittal N et al.", year: "2021" },
            { title: "5-MTHF enhances the portal pressure reduction achieved with propranolol in patients with cirrhosis: A randomized placebo-controlled trial", pmid: "37482222", authors: "Vukotic et al.", year: "2023" }
        ]
    },
    "vitamin-b12": {
        id: "vitamin-b12",
        name: "Methylcobalamin (Vitamin B12)",
        patientSummary: "Methylcobalamin is one of the two forms of vitamin B12 the body uses as a coenzyme. Vitamin B12 works with folate in the methylation cycle, which the body uses to make SAMe, a methyl donor for many enzymes. Methylation directly affects histamine clearance (through HNMT), catecholamine breakdown (through COMT), and neurotransmitter handling. We dose 1,000 mcg in the AM capsule, well above the basic requirement and within the range used in B12 studies.",
        whyThisFormPatient: "We use methylcobalamin, one of the coenzyme forms of vitamin B12. At 1,000 mcg, the dose is high enough to overcome the marginal absorption in oral B12 above the intrinsic-factor saturation point.",
        faq: [
            { q: "Methylcobalamin vs cyanocobalamin - does it really matter?", a: "For most healthy people, the difference is negligible - both forms eventually become methylcobalamin in the body. " },
            { q: "Why 1,000 mcg when the RDA is only 2.4 mcg?", a: "Oral B12 absorption is unusual. Oral B12 is absorbed in two ways: a carrier system that handles only small amounts at a time, and passive absorption of a small share of larger doses. To get clinically meaningful B12 to the bloodstream from an oral supplement, you have to rely on the passive pathway, which absorbs only a small share of a much higher dose. 1,000 mcg is a standard oral dose; in a dose-finding trial in older adults with mild B12 deficiency, about 650 to 1,000 mcg a day was needed to correct a blood marker of B12 status." },
            { q: "How does B12 relate to histamine?", a: "Histamine is cleared through two enzymes in your body: DAO (in your gut) and HNMT (intracellular and in the CNS). HNMT requires methyl groups from SAMe, which depends on the methylfolate-B12 cycle to regenerate. Methylfolate, B12 and riboflavin (R5P) each have roles in the methylation cycle." },
            { q: "Will B12 interact with my other medications?", a: "Most POTS and mast cell medications have not been studied with methylcobalamin. Some medications can lower B12 levels over time, including metformin and long-term proton pump inhibitors. For H2 blockers such as famotidine the evidence is mixed; long-term use may lower absorption of B12 from food, and they are not shown to affect supplemental methylcobalamin. If you take any of those, you may need the B12 more than most. Direct interactions are minimal. If you take methotrexate, tell your prescriber about the methylfolate in the AM capsules, because folate can change how methotrexate works. No serious interactions with methylcobalamin were found in our medication review, though most combinations have not been studied." }
        ],
        triadPlain: {
            mcas: "B12 is not a mast cell ingredient. It is included at 1,000 mcg to help maintain normal B12 levels.",
            heds: "B12 does not act directly on collagen.",
            pots: "There are no controlled trials of methylcobalamin for autonomic outcomes. 1,000 mcg a day is in the range shown to correct mild B12 deficiency by mouth in a dose-finding trial."
        },
        bluf: "Vitamin B12 supports normal nervous system function and the methylation cycle. Methylcobalamin is one of the coenzyme forms of B12. ZebraThrive uses 1,000 mcg daily in the AM stack.",
        atAGlance: {
            whatItIs: "A coenzyme form of vitamin B12, which supports normal nervous system function",
            whyWeIncludeIt: "Included at 1,000 mcg to help maintain normal B12 levels.",
            dose: "1,000 mcg daily (AM capsule)",
            keyBenefits: [
                "Helps maintain normal B12 levels",
                "",
                "Cofactor for methionine synthase, which helps regenerate SAMe",
                "Coenzyme form of vitamin B12"
            ]
        },
        howItWorks: "Methylcobalamin is the primary bioactive cofactor for the methylation cycle. Vitamin B12 supports normal homocysteine metabolism.",
        research: [
            {
                outcome: "B12 Status Studies",
                summary: "Studies in children with fainting have measured B12 levels. They did not test B12 supplements.",
                studies: [
                    {
                        source: "Oner T et al., \"POTS and vitamin B12 deficiency in adolescents\"",
                        pmid: "24366986",
                        design: "Case-control study, children with vasovagal syncope (some with a POTS pattern) vs healthy controls",
                        finding: "Measured B12 levels in children with vasovagal syncope and in healthy controls; it did not test B12 supplements."
                    }
                ]
            },
            {
                outcome: "Nerve Function Research (Methylcobalamin)",
                summary: "Trials of methylcobalamin in adults with peripheral neuropathy have measured nerve conduction and clinical response, usually at higher doses and often combined with other agents. We cite them for B12's role in normal nerve function and for high-dose safety, not as a treatment claim.",
                studies: [
                    {
                        source: "Sawangjit R et al., \"Efficacy and Safety of Mecobalamin on Peripheral Neuropathy: A Systematic Review and Meta-Analysis of Randomized Controlled Trials\"",
                        pmid: "32716261",
                        design: "Systematic review + meta-analysis of 15 RCTs, 1707 peripheral neuropathy patients",
                        finding: "Pooled 15 RCTs (1,707 adults with peripheral neuropathy); clinical response and nerve conduction velocity were measured, mostly with methylcobalamin given alongside other agents; no serious adverse events were reported"
                    },
                    {
                        source: "Oki R et al., \"Efficacy and safety of ultrahigh-dose methylcobalamin\"",
                        pmid: "35532908",
                        design: "Phase 3 randomized trial of 50 mg methylcobalamin injections in early ALS",
                        finding: "Reported the safety profile of very high-dose methylcobalamin"
                    }
                ]
            },
            {
                outcome: "Methylated B Vitamins: Single Case Report",
                summary: "One published case report discusses methylated B vitamins (methylfolate plus methylcobalamin) in a person with a COMT gene variant. Case reports are the lowest level of clinical evidence and cannot show that a supplement caused a change.",
                studies: [
                    {
                        source: "Mittal N et al., \"Improvement of hyperadrenergic POTS with methylated B vitamins in the setting of a heterozygous COMT Val158Met polymorphism\"",
                        pmid: "34764114",
                        design: "Case report (n=1), BMJ Case Reports",
                        finding: "Describes a single adult with POTS and a heterozygous COMT Val158Met variant who was given methylated B vitamins. Cited for the methylation-catecholamine hypothesis, not as evidence of benefit"
                    }
                ]
            }
        ],
        evidenceGaps: "Deficiency prevalence data exist for adolescents with POTS, but there are no controlled trials of methylcobalamin for autonomic outcomes.",
        triad: {
            mcas: " If you feel unwell after starting, stop and talk with your clinician.",
            heds: "B12 does not act directly on collagen.",
            pots: " Helps maintain normal B12 levels."
        },
        whyThisForm: {
            form: "Methylcobalamin",
            rationale: "A coenzyme form of vitamin B12. Works in the methylation cycle as the cofactor of methionine synthase. How it is made: all vitamin B12, including methylcobalamin, starts as a fermentation product, because no chemical route exists at commercial scale; it is then purified and converted to the methyl form. We disclose this so you know how it is made.",
            comparison: [
                { form: "Methylcobalamin", difference: "Coenzyme form of B12; cofactor for methionine synthase", selected: true },
                { form: "Cyanocobalamin", difference: "Common stable form; converted in the body to the coenzyme forms", selected: false }
            ]
        },
        safety: {
            sideEffects: "Exceptionally safe. High doses are non-toxic. If you feel unwell after starting, stop and talk with your clinician.",
            interactions: "Metformin and long-term proton pump inhibitors are linked with lower B12 levels; for PPIs the effect is on B12 from food. For H2 blockers such as famotidine the evidence is mixed (the best controlled test found no change), and they are not shown to affect supplemental methylcobalamin. Most other medications used by people with these conditions have not been studied with methylcobalamin. Pregabalin and estrogen-containing birth control pills have been linked with lower blood B12 readings.",
            excipientConcerns: {
                avoid: ["Artificial cherry/berry flavors", "Mannitol", "Sorbitol"],
                safe: ["HPMC capsules", "Rice hull concentrate"]
            },
            cautions: "If you feel unwell after starting, stop and talk with your clinician about other forms of B12."
        },
        howToStart: {
            protocol: [
                { step: "Daily", dosage: "The full AM serving (3 capsules) provides 1,000 mcg of B12.", notes: "Assess tolerance" },
                { step: "Week 3+", dosage: "", notes: "" }
            ],
            timeline: ""
        },
        sources: [
            { title: "POTS and vitamin B12 deficiency in adolescents", pmid: "24366986", authors: "Oner T et al.", year: "2014" },
            { title: "Efficacy and Safety of Mecobalamin on Peripheral Neuropathy: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", pmid: "32716261", authors: "Sawangjit R et al.", year: "2020" },
            { title: "Improvement of hyperadrenergic POTS with methylated B vitamins in the setting of a heterozygous COMT Val158Met polymorphism", pmid: "34764114", authors: "Mittal N et al.", year: "2021" },
            { title: "Efficacy and safety of ultrahigh-dose methylcobalamin", pmid: "35532908", authors: "Oki R et al.", year: "2022" }
        ]
    },
    "grape-seed-extract": {
        id: "grape-seed-extract",
        name: "Grape Seed Extract",
        patientSummary: "Grape seed extract is one of the most concentrated natural sources of procyanidins, the same compound family found in pine bark, though each has a different minor compound profile. In lab studies, procyanidins can reduce MMP enzymes that break down matrix proteins. These effects were seen at concentrations well above what oral intake reaches in the blood and have not been studied in people. In lab studies, grape seed procyanidins have been shown to act on mast cells through several pathways, including FceRI downregulation, calcium influx inhibition, and cAMP elevation. These findings come from cell and animal studies and have not been confirmed in people. We pair grape seed with pine bark because both are broken down by gut bacteria into related metabolites, including one called M1, that can be absorbed into the bloodstream. Human data on exactly how much reaches circulation from grape seed alone is still limited.",
        whyThisFormPatient: "We use grape seed extract standardized to 95% or higher OPCs (oligomeric proanthocyanidins) by HPLC, an analytical method that measures procyanidins more specifically than older total-absorbance methods. Peanut protein was not detected by ELISA testing. Some grape seed comes from winery pomace, the seeds left after wine fermentation, so we are confirming with our supplier whether ours is from fresh-pressed or pomace seed. We deliver 170 mg total daily, split 100 mg in the morning and 70 mg in the evening.",
        faq: [
            { q: "Why grape seed AND pine bark - aren't they the same thing?", a: "They share the procyanidin chemistry, but they're not identical. Grape seed delivers a higher procyanidin density per milligram. Pine bark brings a different minor compound profile, though its specific contribution to MMP or mast cell activity has not been measured in our lots. The gut metabolite M1 can come from both grape seed and pine bark, and together they may cover a broader mechanism profile, though no study has tested the combination directly." },
            { q: "Is grape seed safe with blood thinners?", a: "Grape seed extract has mild antiplatelet activity in lab studies. There is not enough data to know how meaningful this is in people, so tell your prescriber if you are on warfarin, aspirin, or a DOAC. Human studies in cardiovascular populations have generally gone well, but the standard caution applies: tell your prescriber if you are on blood thinners, and stop 2 weeks before scheduled surgery. " },
            { q: "What do lab studies show about grape seed and mast cells?", a: "In lab studies, grape seed procyanidins have been shown to act on mast cells through several pathways, including FceRI downregulation, calcium influx inhibition, and cAMP elevation. " },
            { q: "What does '≥95% OPCs by HPLC' actually mean?", a: "HPLC (high-performance liquid chromatography) separates and quantifies procyanidins more specifically than older total-absorbance methods like UV-Vis or vanillin, which can sometimes produce inflated percentages. DMAC is another procyanidin-specific method; our supplier tests by HPLC, which meets the same goal. When the COA specifies HPLC, the percentage reflects the procyanidin content measured by a method more specific than older total-absorbance tests." }
        ],
        triadPlain: {
            mcas: "No study has tested grape seed extract in people with MCAS. For MCAS specifically, we are confirming whether our seed is fresh-pressed or winery pomace, because pomace has been through wine fermentation.",
            heds: "No study has tested grape seed extract in people with hEDS. We include grape seed as a source of procyanidins, which gut bacteria convert into a metabolite called M1.",
            pots: "No study has tested grape seed extract in people with POTS, and it can lower blood pressure slightly. A meta-analysis of 16 RCTs (n=810) found an average drop in systolic blood pressure of about 6 mmHg across mixed populations. In people with normal blood pressure, we estimate a smaller drop of about 0 to 3 mmHg, so a large blood pressure drop is not expected at our dose, though no study has measured standing blood pressure specifically. If you take medications for blood pressure or orthostatic symptoms, talk to your doctor before adding grape seed extract."
        },
        bluf: "Grape seed extract is one of the most concentrated natural sources of procyanidins, a compound family it shares with pine bark. In lab studies, grape seed procyanidins can inhibit matrix-degrading enzymes called MMPs. This has not been shown in people, and the active concentrations used in these studies are far above what is achievable in human plasma at typical doses. Lab and animal studies suggest grape seed procyanidins may affect mast cell signaling through several pathways. This has not been confirmed in people. ZebraThrive uses 170 mg daily.",
        atAGlance: {
            whatItIs: "Grape seed extract is one of the most concentrated natural sources of procyanidins, the same compound family found in pine bark, with a different minor-compound profile.",
            whyWeIncludeIt: "In lab studies, grape seed procyanidins reduced MMP enzymes that break down matrix proteins. This has not been shown in people at the blood levels reached from oral intake. Lab studies suggest procyanidins may affect mast cell signaling through several pathways, including FceRI expression, calcium influx, and cAMP levels. This has not been confirmed in people.",
            dose: "170 mg daily (100 mg AM capsule + 70 mg PM capsule)",
            keyBenefits: ["MMP-9 inhibition by the gut-derived M1 metabolite, shown in lab studies; human blood level data confirming this at our dose are not yet available.", "Mast cell pathway effects (FcεRI, calcium influx, cAMP) seen in lab and animal studies", "Direct procyanidin interaction with collagen fibers, shown in lab studies.", ""]
        },
        howItWorks: "Grape seed extract is one of the most concentrated natural sources of procyanidins, the same compound family found in pine bark, with a different minor-compound profile. In lab studies, grape seed procyanidins reduced MMP enzymes that break down matrix proteins. This has not been shown in people at the blood levels reached from oral intake. Lab studies suggest procyanidins may affect mast cell signaling through several pathways, including FceRI expression, calcium influx, and cAMP levels. This has not been confirmed in people. We pair grape seed with pine bark in the formulation because gut bacteria convert procyanidins from both sources into a related metabolite called M1, or DHPV.",
        research: [
            {
                outcome: "Lab Research on the Procyanidin Metabolite M1/DHPV and MMP Enzymes",
                summary: "The gut-microbiome-derived metabolite M1, also called DHPV, inhibits MMP-9 in lab studies and is produced from procyanidins in both pine bark and grape seed. Whether it reaches these active concentrations in human blood at our dose has not been shown.",
                studies: [
                    {
                        source: "Grimm T et al., \"Antioxidant activity and inhibition of matrix metalloproteinases by metabolites of maritime pine bark extract (pycnogenol)\"",
                        pmid: "14990359",
                        design: "In vitro mechanistic study, cell-free MMP activity + monocyte secretion",
                        finding: "M1 metabolite inhibits MMP-1, MMP-2, MMP-9 activity; 0.5 µM M1 inhibits ~50% MMP-9 secretion from cells (the IC50 for cellular MMP-9 release)"
                    },
                    {
                        source: "Baron G et al., \"Unraveling the parahormetic mechanism underlying the health-protecting effects of grapeseed procyanidins\"",
                        pmid: "38104483",
                        design: "Human study measuring urinary metabolites, plus proteomic analysis in cell models.",
                        finding: "Grape seed procyanidins convert to DHPV, detected in human urine. In lab studies, DHPV activates the Nrf2 antioxidant pathway after oxidizing to its quinone form; this has not been shown directly in people."
                    }
                ]
            },
            {
                outcome: "MMP-2/9 Downregulation in a Dental Cell Model",
                summary: "In a lab study using dental implant cell models, grape seed procyanidins reduced matrix-degrading enzyme expression. ",
                studies: [
                    {
                        source: "Cardoso LM et al., \"Naringenin and proanthocyanidins pre-treatment decreases synthesis and activity of gelatinases induced by zoledronic acid in a dental implant surface in vitro model\"",
                        pmid: "37146390",
                        design: "In vitro, human gingival fibroblasts + osteoblasts",
                        finding: "In a lab study, grape seed procyanidins reduced MMP-2 and MMP-9 in cells exposed to zoledronic acid, and increased TIMP-2 in osteoblasts."
                    }
                ]
            },
            {
                outcome: "Cardiovascular and Blood Pressure Effects",
                summary: "Meta-analytic evidence shows a modest reduction in systolic blood pressure across study populations. If you take medications for blood pressure or orthostatic symptoms, talk to your doctor before adding grape seed extract.",
                studies: [
                    {
                        source: "Zhang H et al., \"The impact of grape seed extract treatment on blood pressure changes: A meta-analysis of 16 randomized controlled trials\"",
                        pmid: "27537554",
                        design: "Meta-analysis of 16 RCTs, n=810",
                        finding: "In a meta-analysis of 16 trials, grape seed extract reduced systolic blood pressure by about 6 mmHg on average across mixed study populations."
                    }
                ]
            }
        ],
        triad: {
            mcas: "Grape seed extract has not been studied in people with MCAS, and its lab findings on mast cells have not been confirmed in people. For MCAS specifically, we are confirming whether our seed is fresh-pressed or winery pomace, because pomace has been through wine fermentation.",
            heds: "Grape seed extract has not been studied in people with hEDS, and its lab findings on MMP enzymes and collagen fibers have not been shown in people.",
            pots: " A meta-analysis of 16 randomized trials (n=810) found grape seed extract lowered systolic blood pressure by about 6 mmHg on average across a mix of study populations, with larger drops at higher starting blood pressure. In people with normal blood pressure, we estimate a smaller change of roughly 0 to 3 mmHg, so a large blood pressure drop isn't expected at our dose, though no study has measured standing blood pressure. "
        },
        whyThisForm: {
            form: "Generic grape seed extract (Vitis vinifera), ≥95% OPCs by HPLC, peanut protein not detected by ELISA, seed source being confirmed",
            rationale: "We use grape seed extract standardized to at least 95% OPCs (oligomeric proanthocyanidins) by HPLC, an analytical method commonly used to measure procyanidin content. Peanut protein was not detected by ELISA testing. Some grape seed comes from winery pomace, the seeds left after wine fermentation, so we are confirming with our supplier whether ours is from fresh-pressed or pomace seed. We deliver 170 mg total daily, split 100 mg in the morning and 70 mg in the evening."
        },
        safety: {
            sideEffects: "Excellent safety profile in cardiovascular RCTs running 8-12 weeks. In a small human study using 300 mg per day of grape seed extract, most people (73%) reported no side effects at all.",
            interactions: "Mild antiplatelet activity. Mention to your prescriber if you are on warfarin, aspirin, or a DOAC. Discontinue 2 weeks before scheduled surgery. No study has tested grape seed with POTS medications, but its own effects matter. Beta-blockers (metoprolol, propranolol): grape seed alone lowered systolic blood pressure about 2 to 6 mmHg and heart rate about 1 to 1.4 beats per minute in meta-analyses, so it may add slightly to these drugs; a human study found no effect on CYP2D6, the enzyme that clears metoprolol. Fludrocortisone/Midodrine: the same blood pressure lowering could slightly oppose these medications; our 170 mg a day is below the doses that lowered blood pressure significantly. Ivabradine: may add slightly to heart-rate lowering; a three-month human study of a related grape seed product found no change in CYP3A4, the enzyme that clears ivabradine. Hydroxyzine: there is no direct study of grape seed extract taken with hydroxyzine. Separate human studies found no effect on the CYP2D6 or CYP3A4 enzymes that can affect how some drugs are cleared, but this hasn't been tested as a pair, so mention it to your prescriber. One trial in treated hypertensives found vitamin C plus grape-seed polyphenols together raised blood pressure by about 5 mmHg; our formula has both, at a higher vitamin C and much lower polyphenol dose, so the relevance is unknown.",
            excipientConcerns: {
                avoid: ["Peanut-skin adulteration", "Artificial colors", "Magnesium stearate"],
                safe: ["HPMC capsules", "Rice hull concentrate", "Cellulose"]
            }
        },
        sources: [
            { title: "Antioxidant activity and inhibition of matrix metalloproteinases by metabolites of maritime pine bark extract (pycnogenol)", pmid: "14990359", authors: "Grimm T et al.", year: "2004" },
            { title: "Unraveling the parahormetic mechanism underlying the health-protecting effects of grapeseed procyanidins", pmid: "38104483", authors: "Baron G et al.", year: "2023" },
            { title: "The impact of grape seed extract treatment on blood pressure changes: A meta-analysis of 16 randomized controlled trials", pmid: "27537554", authors: "Zhang H et al.", year: "2016" },
            { title: "Naringenin and proanthocyanidins pre-treatment decreases synthesis and activity of gelatinases induced by zoledronic acid in a dental cell model", pmid: "37146390", authors: "Cardoso LM et al.", year: "2023" },
            { title: "Oligomeric Procyanidins (OPCs) Inhibit Procollagen Type I Secretion of Fibroblasts", pmid: "30603486", authors: "Kim BJ et al.", year: "2017" },
            { title: "Anti-wrinkling effects of the mixture of vitamin C, vitamin E, pycnogenol and evening primrose oil on hairless mouse skin caused by chronic ultraviolet B irradiation", pmid: "17803593", authors: "Cho HS et al.", year: "2007" },
            { title: "The effect of grape seed extract on the pharmacokinetics of dextromethorphan in healthy volunteers", pmid: "23881421", authors: "Goey et al.", year: "2013" },
            { title: "The combination of vitamin C and grape-seed polyphenols increases blood pressure: a randomized, double-blind, placebo-controlled trial", pmid: "15662232", authors: "Ward et al.", year: "2005" },
            { title: "The Effects of a Grape Seed Procyanidin Extract on Cytochrome P450 3A4 Activity and Inflammatory Mediators in the Lungs of Heavy Active and Former Smokers", pmid: "39684816", authors: "Xue et al.", year: "2024" }
        ]
    },
    "quercetin-phytosome": {
        id: "quercetin-phytosome",
        name: "Quercetin Phytosome (Quercefit®)",
        patientSummary: "Quercetin Phytosome is quercetin, a plant flavonoid, bound to a sunflower lecithin carrier that helps with quercetin's main limitation: poor absorption. Plain quercetin is generally considered poorly absorbed by the body. Quercefit® (Indena's branded phytosome form) delivers about 20 times more quercetin into your bloodstream per milligram. The phytosome form gives much higher blood levels of quercetin than plain quercetin.",
        whyThisFormPatient: "We use Quercefit, Indena's quercetin phytosome, because a human study showed about 20 times higher quercetin absorption than plain quercetin. The carrier is sunflower lecithin (not soy), which helps your gut absorb the quercetin. The complex also contains maltodextrin. Generic quercetin phytosome blends have not been shown to match Quercefit's 20x absorption data. Quercefit® is the one mandatory branded sourcing in our formulation. We request a Certificate of Analysis for every batch.",
        faq: [
            { q: "Why mandatory Quercefit® instead of generic quercetin phytosome?", a: "The bioavailability difference shown in the Riva 2019 study is substantial. Quercefit has the human PK study showing 20x absorption versus plain quercetin; data on generic quercetin phytosome blends is not established. The phytosome technology uses a specific manufacturing process to produce a phospholipid-quercetin complex. For this ingredient, bioavailability is a major reason for choosing the branded form, based on the Riva 2019 human PK study. This is the one mandatory brand in our formulation." },
            { q: "How is Quercefit different from EMIQ or plain quercetin?", a: "All three deliver quercetin to your body, but the mechanisms differ. Plain quercetin is generally considered poorly absorbed by the body. Quercefit uses a phospholipid carrier to lift absorption about 20-fold. Quercefit has a growing body of human research, including studies in allergic rhinitis, exercise recovery, and COVID-19, though the total number of independent trials is smaller than headline counts suggest." },
            { q: "Is Quercefit safe with ivabradine and beta-blockers?", a: "No study has tested quercetin with any of these medications. Quercetin blocks the liver enzyme CYP3A4 in lab tests, but in people repeated dosing does the opposite: it speeds CYP3A activity in the gut (induction). For ivabradine, that points toward lower drug levels and weaker heart-rate control, not toxicity. We rate it low-to-moderate because the human effect was small and our dose puts less quercetin in the gut than the study dose. For metoprolol and propranolol, the lab effect on their clearing enzymes needs higher quercetin levels than our dose reaches, so drug levels are unlikely to change. The better-supported effect is a small added drop in blood pressure. The same drop could slightly oppose fludrocortisone and midodrine. Fludrocortisone levels could also fall if it is cleared by CYP3A4, which is not documented. Monitor as you normally would and mention quercetin to your prescriber." },
            { q: "How long until I notice anything from Quercefit?", a: "Quercefit is a daily-use ingredient; give it consistent daily use. Quercefit reaches meaningfully higher quercetin blood levels than plain quercetin at the same dose, based on a human pharmacokinetic study, though absolute levels are still modest." },
            { q: "Is quercetin a mast cell stabilizer for MCAS?", a: "Quercetin is not an approved mast cell stabilizer. The evidence is lab research: in studies of human mast cells, quercetin reduced release of histamine, PGD2, leukotrienes, TNF, and IL-8. Those are lab findings, not clinical outcomes in people with MCAS. The form matters too, because plain quercetin is poorly absorbed." },
            { q: "Does quercetin lower histamine?", a: "In lab studies, quercetin reduced histamine release from human mast cells. Those studies do not show a change in histamine levels in a person. The human trial listed on this page measured seasonal allergy symptoms in healthy adults." }
        ],
        triadPlain: {
            mcas: "No randomized controlled trial has tested quercetin phytosome in people with MCAS, and it is not a substitute for any prescribed treatment. Quercefit uses sunflower lecithin, not soy, as its carrier.",
            heds: "No randomized controlled trial has tested quercetin phytosome in people with hEDS, and it is not a substitute for any prescribed treatment.",
            pots: "Quercetin has not been studied in POTS, and it is not a substitute for any prescribed treatment. Quercetin may add a small drop in blood pressure, which could slightly oppose fludrocortisone and midodrine, so mention it to your prescriber."
        },
        bluf: "Quercetin Phytosome is quercetin, a plant flavonoid, bound to a sunflower lecithin carrier that helps with quercetin's main limitation: poor absorption. Plain quercetin is poorly absorbed. Indena's branded Quercefit form delivers about 20 times more quercetin into the bloodstream per milligram, based on a human pharmacokinetic study. ZebraThrive uses 300 mg of Quercefit daily in the Daily Powder, split AM and PM.",
        atAGlance: {
            whatItIs: "Quercetin Phytosome is quercetin, a plant flavonoid, bound to a sunflower lecithin carrier that helps with quercetin's main limitation: poor absorption.",
            whyWeIncludeIt: "Plain quercetin is poorly absorbed. Quercefit® (Indena's branded phytosome form) delivers about 20 times more quercetin into your bloodstream per milligram.",
            dose: "300 mg Quercefit® quercetin phytosome daily in the Daily Powder, split AM and PM scoops (300 mg of the phytosome complex, not 300 mg of free quercetin)",
            keyBenefits: ["About 20 times higher quercetin absorption than plain quercetin in a human pharmacokinetic study", "", "", "Mandatory branded sourcing: Indena Quercefit® is the form with the 20x human PK data"]
        },
        howItWorks: "The phytosome carrier is sunflower lecithin, which helps your gut absorb the quercetin. Quercefit® (Indena's branded phytosome form) delivers about 20 times more quercetin into your bloodstream per milligram. The phytosome form gives much higher blood levels of quercetin than plain quercetin.",
        research: [
            {
                outcome: "Quercefit® Phytosome Bioavailability",
                summary: "The Indena Quercefit® phytosome delivery system delivers about 20x higher quercetin plasma concentrations than plain quercetin per milligram. Free quercetin's half-life is short, about 3.4 to 3.8 hours, so steady dosing matters. The form that actually circulates longer in the body (conjugated quercetin) persists longer, based on the Riva pharmacokinetic study.",
                studies: [
                    {
                        source: "Riva A et al., \"Improved Oral Absorption of Quercetin from Quercetin Phytosome®, a New Delivery System Based on Food Grade Lecithin\"",
                        pmid: "30328058",
                        design: "Human pharmacokinetic study, healthy volunteers",
                        finding: "Quercefit gave about 20 times higher quercetin absorption than plain quercetin at the same weight; half-life in this study was about 3.4 to 3.8 hours."
                    }
                ]
            },
            {
                outcome: "Human Trial at a Higher Dose Than Ours",
                summary: "A randomized placebo-controlled trial in Japanese adults with seasonal pollen allergy symptoms. Seasonal allergy is a different condition from MCAS; we cite this trial only as human exposure data for Quercetin Phytosome at a higher dose than ours, not as evidence of an effect on allergy or MCAS.",
                studies: [
                    {
                        source: "Yamada S et al., 2022, randomized placebo-controlled trial of a quercetin-containing supplement (full reference in our evidence list)",
                        pmid: "35776034",
                        design: "Randomized double-blind placebo-controlled trial, n=66 adults, Japan, 4 weeks",
                        finding: "In a small trial, people took 200 mg of quercetin a day (about 500 mg of Quercetin Phytosome complex, more than our 300 mg daily amount) for 4 weeks."
                    }
                ]
            },
            {
                outcome: "Human Tolerability Data (Open-Label Trials)",
                summary: "Quercefit has been given alongside standard care in open-label randomized trials in adults with early-stage COVID-19. We cite them only as human exposure and tolerability data for this ingredient form, not as evidence of any effect on COVID-19, MCAS, or POTS.",
                studies: [
                    {
                        source: "Di Pierro F et al., randomized clinical trial of Quercefit given alongside standard care (full reference in our evidence list)",
                        pmid: "36712674",
                        design: "Randomized clinical trial, early-stage COVID-19",
                        finding: "Quercefit was given alongside standard care in adults with early-stage COVID-19 and was reported as well tolerated"
                    },
                    {
                        source: "Di Pierro F et al., pilot open-label randomized trial of Quercefit given alongside standard care (full reference in our evidence list)",
                        pmid: "34194240",
                        design: "Randomized controlled open-label trial, n=42",
                        finding: "Pilot open-label trial (n=42) giving Quercefit alongside standard care in adults with early-stage COVID-19; laboratory markers were tracked and the supplement was reported as well tolerated"
                    }
                ]
            }
        ],
        triad: {
            mcas: "No randomized controlled trial has tested quercetin phytosome in people with MCAS, and it is not a substitute for any prescribed treatment. Quercefit uses sunflower lecithin, not soy, as its carrier.",
            heds: "No randomized controlled trial has tested quercetin phytosome in people with hEDS, and it is not a substitute for any prescribed treatment.",
            pots: "Quercetin has not been studied in POTS, and it is not a substitute for any prescribed treatment. Quercetin may add a small drop in blood pressure, which could slightly oppose fludrocortisone and midodrine, so mention it to your prescriber."
        },
        whyThisForm: {
            form: "Quercefit (Indena quercetin phytosome: quercetin, sunflower lecithin, maltodextrin), mandatory branded sourcing",
            rationale: "We use Quercefit, Indena's quercetin phytosome, because a human study showed about 20 times higher quercetin absorption than plain quercetin. The carrier is sunflower lecithin (not soy), which helps your gut absorb the quercetin. The complex also contains maltodextrin. This is one of the few cases where the branded form is genuinely non-negotiable. Generic quercetin phytosome blends have not shown the same 20 times absorption seen with Quercefit in human testing. Quercefit® is the one mandatory branded sourcing in our formulation. We request a Certificate of Analysis for every batch."
        },
        safety: {
            sideEffects: "Quercefit has been used in a number of human clinical studies and has generally been well tolerated. ",
            interactions: "No study has tested quercetin with POTS or MCAS medications. Ivabradine: in people, repeated quercetin dosing induces CYP3A (the opposite of the lab-test inhibition), which could lower ivabradine levels and weaken heart-rate control; rated low-to-moderate. Metoprolol/Propranolol: the lab effect on their clearing enzymes needs higher quercetin levels than our dose reaches, so drug levels are unlikely to change; the better-supported effect is a small added blood pressure drop. Fludrocortisone/Midodrine: the same blood pressure drop could slightly oppose these medications; fludrocortisone levels could fall too, but only if it is cleared by CYP3A4, which is not documented. Mention to your prescriber when initiating.",
            excipientConcerns: {
                avoid: ["Soy-derived lecithin carriers (Quercefit uses sunflower lecithin)", "Magnesium stearate", "Artificial colors"],
                safe: ["Sunflower lecithin phospholipid carrier and maltodextrin (source being confirmed)", "", "Rice hull concentrate"]
            }
        },
        sources: [
            { title: "Improved Oral Absorption of Quercetin from Quercetin Phytosome®, a New Delivery System Based on Food Grade Lecithin", pmid: "30328058", authors: "Riva A et al.", year: "2019" },
            { title: "Effects of repeated oral intake of a quercetin-containing supplement on allergic reaction: a randomized, placebo-controlled, double-blind study", pmid: "35776034", authors: "Yamada S et al.", year: "2022" },
            { title: "Quercetin as a possible complementary agent for early-stage COVID-19: Concluding results of a randomized clinical trial", pmid: "36712674", authors: "Di Pierro F et al.", year: "2023" },
            { title: "Potential Clinical Benefits of Quercetin in the Early Stage of COVID-19: Results of a Second, Pilot, Randomized, Controlled and Open-Label Clinical Trial", pmid: "34194240", authors: "Di Pierro F et al.", year: "2021" },
            { title: "Effect of quercetin on CYP3A activity in Chinese healthy participants", pmid: "21680781", authors: "Duan et al.", year: "2012" }
        ]
    },
    "chromium": {
        id: "chromium",
        name: "Chromium",
        patientSummary: "Chromium is a trace mineral studied for a possible role in how the body responds to insulin. We include chromium at 200 micrograms, a standard supplement dose, as part of general trace mineral coverage. We use chromium picolinate, a well studied form of chromium used in many human trials.",
        whyThisFormPatient: "We use chromium picolinate at 200 micrograms, a standard supplement dose. In diabetes trials, side effects were no more common than with placebo, though long term safety still needs more study. Chromium is generally poorly absorbed; picolinate is a commonly used chelated form in human trials. The 200 mcg dose sits within the range studied in human trials, which spans roughly 50 to 1,000 mcg per day. This is a multivitamin completion ingredient: a modest dose, generally well tolerated, adding trace mineral coverage at negligible bulk weight.",
        faq: [
            { q: "Why include chromium in a formulation for hEDS/POTS/MCAS?", a: " Chromium supports normal glucose handling as part of the formula's broader trace mineral coverage." },
            { q: "Will chromium interact with my POTS medications?", a: "No documented interactions with the standard POTS medication stack: beta-blockers, midodrine, fludrocortisone, ivabradine. Chromium picolinate doesn't engage the CYP enzymes that drive most drug interactions. Some interaction is theoretically possible with diabetes medications (insulin sensitizers) - if you're on metformin or insulin, mention chromium to your prescriber, since better glucose handling might mean your doses need adjustment. Interactions with common POTS medications have not been formally studied. One exception: chromium picolinate can lower levothyroxine absorption, so take them at least 4 hours apart if you use thyroid medication." },
            { q: "Is chromium picolinate safe long-term?", a: "Yes. Chromium picolinate at the 200 mcg supplement dose has not shown more adverse events than placebo in clinical trials, though researchers note long-term safety still needs further study. We source chromium picolinate and are working to finalize batch testing documentation for this ingredient." },
            { q: "What about chromium picolinate vs other chromium forms?", a: "Picolinate is a well studied form of chromium used in many human trials. Chromium chloride has also been studied in human trials and shown similar effects, though picolinate has the most research behind it." }
        ],
        triadPlain: {
            mcas: "Chromium doesn't directly engage mast cell biology. It is a trace mineral, not a mast cell stabilizer. Chromium supports normal glucose handling as part of overall nutrient coverage. It is not intended to affect mast cell activity. Chromium is included as a general trace mineral for nutrient completeness.",
            heds: "Chromium doesn't have a direct connective tissue mechanism. It is not a collagen ingredient. Chromium is part of the trace mineral foundation of the formula.",
            pots: "Chromium is included as part of general trace mineral coverage in the formula. Chromium has not been studied in POTS. "
        },
        bluf: "Chromium is a trace mineral studied for a possible role in how the body responds to insulin and processes carbohydrates. ZebraThrive uses 200 mcg of chromium picolinate in the AM capsules, a standard supplement dose.",
        atAGlance: {
            whatItIs: "Chromium is a trace mineral that has been studied for a possible role in insulin response and carbohydrate metabolism.",
            whyWeIncludeIt: "We include 200 micrograms of chromium, the standard supplement dose, as part of general trace mineral coverage. ",
            dose: "200 mcg daily as chromium picolinate (AM capsule)",
            keyBenefits: ["Chromium supports normal glucose handling and carbohydrate metabolism, at a standard 200 mcg supplement dose.", "", "Chromium picolinate is a well-studied form of chromium used in supplements, though absorption data vary across studies.", "Chromium at the 200 microgram supplement dose has a long history of use in clinical trials with an adverse event rate similar to placebo, though long term safety is still being studied."]
        },
        howItWorks: "Chromium is a trace mineral that has been studied for a possible role in insulin response and carbohydrate metabolism. We include 200 micrograms of chromium, the standard supplement dose, as part of general trace mineral coverage. Chromium supports normal glucose handling as part of general nutrient coverage. We use chromium picolinate, a well studied form of chromium.",
        research: [
            {
                outcome: "Glucose Handling and Insulin Response",
                summary: "Chromium's role in insulin signaling is studied but not fully established; researchers have not pinned down a specific molecular site of action. Most human trials were run in adults with impaired glucose tolerance or type 2 diabetes, measuring fasting glucose and HbA1c. We cite them for chromium's general role in glucose metabolism, not as a claim that this product treats diabetes. ZebraThrive is not intended for diabetes.",
                studies: [
                    {
                        source: "Suksomboon N et al., \"Systematic review and meta-analysis of the efficacy and safety of chromium supplementation in diabetes\"",
                        pmid: "24635480",
                        design: "Systematic review + meta-analysis of 25 RCTs in adults with type 2 diabetes",
                        finding: "Pooled trials measured fasting glucose and HbA1c. Adverse event rates were similar to placebo in these trials, though the authors note long term safety still needs more study."
                    },
                    {
                        source: "Huang H et al., pooled analysis of chromium trials (2017)",
                        pmid: "28677892",
                        design: "Pooled analysis of 28 RCTs in adults with type 2 diabetes.",
                        finding: "Glucose handling measures were compared across the pooled studies, which used a range of chromium doses and durations."
                    },
                    {
                        source: "Ghosh D et al., \"Role of chromium supplementation in Indians with type 2 diabetes mellitus\"",
                        pmid: "12550067",
                        design: "Double blind, placebo controlled crossover trial, 50 adults with type 2 diabetes, 400 mcg/day chromium picolinate (200 mcg twice daily) for 12 week arms.",
                        finding: "Fasting and post-meal glucose and HbA1c were measured; cited for chromium's role in glucose metabolism"
                    },
                    {
                        source: "Havel PJ, \"A scientific review: the role of chromium in insulin resistance\"",
                        pmid: "15208835",
                        design: "Mechanistic review",
                        finding: "Some researchers have proposed that chromium supports insulin receptor signaling through a complex called chromodulin, though this mechanism is not firmly established, and low chromium status has been linked to impaired glucose handling in some studies."
                    }
                ]
            },
            {
                outcome: "Cardiac Electrical Measures (Higher-Dose Study)",
                summary: "A small RCT in adults with type 2 diabetes, at 1,000 mcg/day (five times our dose), measured the QTc interval. It is not POTS data and did not test our dose.",
                studies: [
                    {
                        source: "Vrtovec M et al., \"Chromium supplementation shortens QTc interval duration in patients with type 2 diabetes mellitus\"",
                        pmid: "15990745",
                        design: "RCT, 60 adults with type 2 diabetes, 1000 mcg/day chromium picolinate for 3 months (crossover design).",
                        finding: "QTc interval was compared between chromium and placebo after 3 months."
                    }
                ]
            },
            {
                outcome: "Long-Term Safety at Supplement Doses",
                summary: "Chromium picolinate at the 200 mcg supplement dose has not shown increased adverse events compared to placebo in clinical trials, though researchers note that long term safety still needs more study.",
                studies: [
                ]
            }
        ],
        triad: {
            mcas: "Chromium doesn't directly engage mast cell biology - it's a trace mineral, not a mast cell stabilizer. Chromium supports normal glucose metabolism as part of general trace mineral nutrition. Chromium is included as part of the trace mineral foundation of the formula, alongside other ingredients chosen for different purposes.",
            heds: "Chromium doesn't have a direct connective tissue mechanism - it's not a collagen ingredient. Chromium supports normal glucose metabolism, which is part of general nutritional support. Chromium is part of the trace mineral foundation of the formula. Chromium's role here is limited to general trace mineral nutrition.",
            pots: "Chromium is included as part of the formula's general trace mineral coverage. Chromium has not been studied in POTS. We do not have evidence that chromium changes autonomic symptom pressure."
        },
        whyThisForm: {
            form: "Chromium picolinate, 200 mcg (AM capsule)",
            rationale: "We use chromium picolinate at 200 micrograms, a standard supplement dose. In diabetes trials, side effects were no more common than with placebo, though long term safety still needs more study. Chromium absorption is generally low across forms. Picolinate is commonly used because it is well studied, though specific absorption percentage figures are not something we can cite a source for. The 200 mcg dose is within the range used across chromium trials, which spans roughly 50 to 1,000 mcg per day, and is lower than the higher doses used in some diabetes studies. This is a multivitamin completion ingredient: modest dose, generally well tolerated in studies, and included for trace mineral coverage at negligible bulk weight."
        },
        safety: {
            sideEffects: "Chromium picolinate at the 200 mcg supplement dose has generally shown adverse event rates similar to placebo in diabetes trials, though researchers note long-term safety still needs more study. ",
            interactions: "Theoretical interaction with diabetes medications (insulin, metformin); if you are on either, mention chromium to your prescriber since improved glucose handling might affect dosing requirements. Chromium picolinate does not meaningfully engage the CYP enzymes behind most drug interactions. One documented interaction exists: taking chromium picolinate at the same time as levothyroxine can reduce thyroid hormone absorption, so take them at least 4 hours apart. No other documented interactions were found with common POTS, MCAS, or hEDS medications such as beta-blockers, midodrine, fludrocortisone, or ivabradine.",
            excipientConcerns: {
                avoid: ["Chromium without a verified assay on file", "Artificial colors", "Magnesium stearate"],
                safe: ["HPMC capsules", "Rice hull concentrate", "Cellulose"]
            }
        },
        sources: [
            { title: "Systematic review and meta-analysis of the efficacy and safety of chromium supplementation in diabetes", pmid: "24635480", authors: "Suksomboon N et al.", year: "2014" },
            { title: "Chromium supplementation for adjuvant treatment of type 2 diabetes mellitus: results from a pooled analysis", pmid: "28677892", authors: "Huang H et al.", year: "2017" },
            { title: "Role of chromium supplementation in Indians with type 2 diabetes mellitus", pmid: "12550067", authors: "Ghosh D et al.", year: "2002" },
            { title: "A scientific review: the role of chromium in insulin resistance", pmid: "15208835", authors: "Havel PJ", year: "2004" },
            { title: "Chromium supplementation shortens QTc interval duration in patients with type 2 diabetes mellitus", pmid: "15990745", authors: "Vrtovec M et al.", year: "2005" }
        ]
    },
    "chlorogenic-acid": {
        id: "chlorogenic-acid",
        name: "Chlorogenic Acid",
        patientSummary: "Chlorogenic acid (CGA) is one of the main polyphenols in green coffee beans, separate from caffeine. CGA has been studied in lab research for pro-collagen activity in skin cells, in animal and cell studies for mast cell related pathways, and in small trials for modest cardiovascular effects. We include it for these studied properties. Lab studies in skin fibroblasts show CGA increases Type I collagen synthesis through the TGF-beta/Smad pathway, and reduces MMP-1 and MMP-3 specifically in cells exposed to UV damage. Our specification calls for decaffeinated green coffee bean extract with caffeine under 0.1%; we will confirm this on the production lot's certificate before launch.",
        whyThisFormPatient: "We source chlorogenic acid from green coffee bean extract, standardized to 45% or more CGAs by HPLC. The decaf spec matters to us because some people in this community are sensitive to caffeine. Our specification calls for decaffeinated extract with caffeine under 0.1%; we will confirm this on the production lot's certificate before launch. We specify a non-fermented water and ethanol extraction to help avoid the histamine and tyramine that can come with poorly sourced botanical extracts. The dose is 200 mg per day, split AM and PM in the Daily Powder.",
        faq: [
            { q: "Is chlorogenic acid the same as coffee?", a: "It's the polyphenol found in coffee. A single cup of coffee can provide a similar amount; our supplement provides a measured dose from green coffee bean extract. " },
            { q: "Will chlorogenic acid affect my blood pressure?", a: "Probably not at our dose. The cleanest meta-analyses show CGA produces a modest 2 to 3 mmHg systolic drop on average, with a larger effect in people with higher starting blood pressure and little to no effect in normotensives. For most POTS patients with normal or low BP, CGA shouldn't be a hypotensive concern. If you take midodrine and your blood pressure tends to run low, mention CGA to your prescriber." },
            { q: "What do lab studies show about chlorogenic acid, collagen and mast cells?", a: "Lab and animal studies have looked at both collagen and mast cell pathways, but neither effect has been shown in people yet. See the How It Works section above for details." },
            { q: "How does chlorogenic acid handle methylation?", a: "CGA is partly cleared through methylation, so it does draw on the methyl donor pool - but the demand is small at 200 mg/day relative to total methylation throughput. The formula also contains methylfolate and methylcobalamin (vitamin B12). If you have known MTHFR variants and significant methylation concerns, mention CGA to your prescriber. In general trials, people tolerated it well at doses up to 1,000 mg per day for 12 weeks. Coffee delivers a comparable amount of CGA per serving." }
        ],
        triadPlain: {
            mcas: "No study has tested chlorogenic acid in people with MCAS. Our specification calls for a decaffeinated green coffee bean extract because some people in this community are sensitive to caffeine; we will confirm caffeine under 0.1% on the production lot's certificate before launch.",
            heds: "No study has tested chlorogenic acid in people with hEDS, and its lab findings on collagen have not been shown in people. We include it as a green coffee polyphenol, at 200 mg a day in the Daily Powder.",
            pots: "No study has tested chlorogenic acid in people with POTS. Pooled trials of green coffee bean extract found only small blood pressure changes, with little or no change in people with normal or low blood pressure, so a large blood pressure drop is not expected at our dose. If you take midodrine or other blood pressure medications, mention CGA to your prescriber."
        },
        bluf: "Chlorogenic acid (CGA) is the polyphenol in green coffee separate from caffeine. In lab studies, CGA increased type I collagen production in skin cells through the TGF-beta/Smad pathway and lowered MMP-1 and MMP-3 in UVA-stressed cells. These effects have not been shown in people. ZebraThrive uses 200 mg CGA in the daily powder.",
        atAGlance: {
            whatItIs: "Chlorogenic acid is a key polyphenol found in green coffee beans, separate from caffeine.",
            whyWeIncludeIt: "CGA has been studied in lab research for pro-collagen activity in skin cells, in animal and cell studies for mast cell related pathways, and in small trials for modest cardiovascular support. We include it for these studied properties. Lab studies in skin fibroblasts show CGA increases Type I collagen synthesis through the TGF-beta/Smad pathway while reducing MMP-1 and MMP-3 in UVA-stressed cells.",
            dose: "200 mg chlorogenic acid daily (from about 444 mg green coffee bean extract, specified as decaffeinated) in the Daily Powder, split AM and PM scoops",
            keyBenefits: ["In a lab study, CGA increased Type I collagen synthesis via the TGF-beta/Smad pathway.", "In a lab study, CGA reduced MMP-1 and MMP-3, enzymes that break down collagen, under UVA exposure conditions.", "In animal and lab studies, CGA has shown effects on the PPAR-gamma and Akt1/NF-kB pathways involved in mast cell activity.", "Decaffeinated green coffee bean sourcing is intended to reduce caffeine exposure, which some people prefer to limit."]
        },
        howItWorks: "Chlorogenic acid is a key polyphenol found in green coffee beans, separate from caffeine. CGA has been studied in lab research for pro-collagen activity in skin cells, in animal and cell studies for mast cell related pathways, and in small trials for modest cardiovascular support. We include it for these studied properties. Lab studies in skin fibroblasts show CGA increases Type I collagen synthesis through the TGF-beta/Smad pathway while reducing MMP-1 and MMP-3 in UVA-stressed cells. We source from green coffee bean extract specified as decaffeinated. The lot and caffeine level are still being finalized, and we will confirm caffeine under 0.1% on the production lot's certificate before launch.",
        research: [
            {
                outcome: "Pro-Collagen Activity in Lab Studies",
                summary: "In a lab study, chlorogenic acid increased Type I collagen synthesis in human dermal fibroblasts through TGF-beta/Smad signaling, and reduced MMP-1 and MMP-3 expression in UVA-stressed cells. ",
                studies: [
                    {
                        source: "Xue N et al., \"Chlorogenic Acid Prevents UVA-Induced Skin Photoaging through Regulating Collagen Metabolism and Apoptosis in Human Dermal Fibroblasts\"",
                        pmid: "35805942",
                        design: "In vitro, human dermal fibroblasts under UVA-induced photoaging stress",
                        finding: "CGA upregulated Col1 mRNA and protein expression in HDFs without affecting cell viability; under UVA stress, CGA decreased MMP-1 and MMP-3 levels while enhancing TGF-beta/Smad2/3 signaling for Col1 synthesis"
                    }
                ]
            },
            {
                outcome: "Pharmacokinetics and Absorption",
                summary: "Chlorogenic acids from green coffee extract are highly bioavailable in humans, with substantial conversion to active metabolites (caffeic, ferulic, dihydrocaffeic, dihydroferulic acids and their sulfate/glucuronide conjugates) detected in plasma and urine. There was a trend toward somewhat reduced relative absorption at the highest doses tested.",
                studies: [
                    {
                        source: "Farah A et al., \"Chlorogenic acids from green coffee extract are highly bioavailable in humans\"",
                        pmid: "19022950",
                        design: "Human PK study, n=10 healthy adults, decaffeinated green coffee extract 170 mg CGA",
                        finding: "Approximately 33% of ingested cinnamic acid moieties recovered in plasma including metabolites; peak plasma levels 0.5-8 hours after dosing"
                    },
                    {
                        source: "Stalmach A et al., \"Impact of dose on the bioavailability of coffee chlorogenic acids in humans\"",
                        pmid: "24947504",
                        design: "Randomized double-blind controlled trial, n=11 healthy volunteers, using a coffee beverage.",
                        finding: "Peak plasma concentrations 1.0-1.5 µmol/L total metabolites after 412-795 µmol CGA dose; 16-25% of dose recovered in urine over 24 hours"
                    }
                ]
            },
            {
                outcome: "Cardiovascular and Endothelial Function",
                summary: "Meta-analytic and acute RCT evidence shows small average blood pressure effects, with neutral effects in people with normal blood pressure. In one small trial, continuous mean post-ischemic blood vessel dilation improved at 450 and 900 mg CGA doses, though the peak response did not change.",
                studies: [
                    {
                        source: "Ward NC et al., \"Acute effects of chlorogenic acids on endothelial function and blood pressure in healthy men and women\"",
                        pmid: "27109860",
                        design: "Randomized crossover RCT, n=16 healthy adults",
                        finding: "900 mg of 5-CGA significantly improved continuous mean post-ischemic flow-mediated dilation at 1 hour and 4 hours; no significant acute BP effect in normotensives"
                    },
                    {
                        source: "Samavat S et al., \"The effects of green coffee bean extract on blood pressure and heart rate: A systematic review and dose-response meta-analysis of randomized controlled trials\"",
                        pmid: "39368321",
                        design: "Meta-analysis of 10 RCTs, n=563",
                        finding: "Green coffee bean extract reduced systolic BP by 2.95 mmHg and diastolic BP by 2.15 mmHg overall; subgroup analysis found no effect in females; HR effect neutral"
                    }
                ]
            }
        ],
        triad: {
            mcas: "Chlorogenic acid has not been studied in people with MCAS. Our specification calls for a decaffeinated green coffee bean extract so you get the polyphenol without the caffeine, since some people prefer to limit caffeine; caffeine under 0.1% will be confirmed on the production lot's certificate.",
            heds: "Chlorogenic acid has not been studied in people with hEDS, and its lab findings on collagen production and breakdown have not been shown in people.",
            pots: "Chlorogenic acid has not been studied in people with POTS. Our specification calls for decaffeinated sourcing, with caffeine under 0.1% to be confirmed on the production lot's certificate, because some people with POTS prefer to avoid caffeine."
        },
        whyThisForm: {
            form: "Green coffee bean extract, 45% or more CGAs by HPLC; caffeine specification under 0.1% (production lot certificate pending)",
            rationale: "We source chlorogenic acid from green coffee bean extract, standardized to 45% or more CGAs by HPLC. Some people prefer to limit caffeine, and many in the POTS community choose to avoid it. Our specification calls for decaffeinated extract with caffeine under 0.1%; we will confirm this on the production lot's certificate before launch. We specify a non-fermented water and ethanol extraction process to help avoid histamine and tyramine that can come from poorly sourced botanical extracts. The dose is 200 mg per day, split AM and PM in the Daily Powder."
        },
        safety: {
            sideEffects: "Excellent tolerability in human cardiovascular and metabolic trials at 200-400 mg/day. The decaffeinated, non-fermented sourcing is intended to reduce caffeine and biogenic amine exposure for this population.",
            interactions: "No study has tested CGA with any POTS medication. Modest BP-lowering effect in hypertensive populations (2-3 mmHg systolic in meta-analyses); about 0 to 2 mmHg in people with normal blood pressure, and none found in women. Beta-blockers: may add slightly to blood pressure lowering. Lab data suggested a CGA breakdown product could slow metoprolol and propranolol clearance, but blood levels at our dose are about 8 times too low for that. If you are on midodrine or other BP-supporting medications and prone to symptomatic hypotension, mention CGA to your prescriber. CGA undergoes methylation clearance, and the demand is small at a 200 mg per day dose.",
            excipientConcerns: {
                avoid: ["Fermented botanical sources", "", "Artificial colors"],
                safe: ["This ingredient is part of your Daily Powder, taken as 2 scoops a day, not in a capsule.", "Rice hull concentrate", ""]
            }
        },
        sources: [
            { title: "Chlorogenic Acid Prevents UVA-Induced Skin Photoaging through Regulating Collagen Metabolism and Apoptosis in Human Dermal Fibroblasts", pmid: "35805942", authors: "Xue N et al.", year: "2022" },
            { title: "Chlorogenic acids from green coffee extract are highly bioavailable in humans", pmid: "19022950", authors: "Farah A et al.", year: "2008" },
            { title: "Impact of dose on the bioavailability of coffee chlorogenic acids in humans", pmid: "24947504", authors: "Stalmach A et al.", year: "2014" },
            { title: "Acute effects of chlorogenic acids on endothelial function and blood pressure in healthy men and women", pmid: "27109860", authors: "Ward NC et al.", year: "2016" },
            { title: "The effects of green coffee bean extract on blood pressure and heart rate: A systematic review and dose-response meta-analysis of randomized controlled trials", pmid: "39368321", authors: "Samavat S et al.", year: "2024" }
        ]
    },
    "niacinamide": {
        id: "niacinamide",
        name: "Niacinamide",
        patientSummary: "Niacinamide is vitamin B3 in its amide form - different from niacin, which causes flushing through prostaglandin release. Niacinamide is non-flushing. In an animal and isolated cell lab study, nicotinamide affected mast cell activity, but this has not been studied in people. We use 16 to 50 mg (final amount being set). A small human study gave 9 healthy men a single 100 mg dose and measured higher blood histamine at the 5 hour mark, the only time point checked, so a lasting or temporary pattern was not shown. Lower doses have not been tested. ",
        whyThisFormPatient: "We use niacinamide, the amide form, not niacin, at 16 to 50 mg (final amount being set) per day. Niacin causes flushing through prostaglandin release from Langerhans cells - that 'niacin flush' is uncomfortable and can be a problem for sensitive populations. Niacinamide is the non-flushing form. We chose 16 to 50 mg (final amount being set) partly because a 2013 study found that a single 100 mg dose in 9 healthy men raised blood histamine at the 5 hour mark, a change researchers linked to methylation use. ",
        faq: [
            { q: "Niacinamide vs niacin - what's the difference?", a: "Both are vitamin B3, but they're chemically distinct and act differently. Niacin (nicotinic acid) activates GPR109A receptors on skin Langerhans cells, triggering a prostaglandin release that causes the classic 'niacin flush' - uncomfortable warmth, redness, sometimes itching. Niacinamide (nicotinamide) doesn't activate GPR109A, so no flushing. Niacin's flush comes from prostaglandins released through GPR109A on skin cells, not from mast cells. We use niacinamide, which does not cause this flush." },
            { q: "Why is the dose 16 to 50 mg (final amount being set)?", a: "Because of a 2013 human study (Tian et al.) showing 100 mg of niacinamide raised plasma histamine at 5 hours after a single dose. The researchers suggested a mechanism, methylation competition: niacinamide gets cleared through methylation, drawing on the same methyl donor pool that HNMT needs to break down histamine. " },
            { q: "Does niacinamide actually help with collagen?", a: "In cultured dermal fibroblast lab studies, niacinamide supported pro-collagen activity, but at concentrations much higher than oral dosing is estimated to reach. At our 16 to 50 mg (final amount being set) dose, the connective tissue contribution is modest. A 2026 study found that niacinamide did not keep blood NAD+ raised over time, unlike NR, which is also in this formula. It's a supporting cast ingredient at this dose, not a hero player." },
            { q: "What's niacinamide's role alongside NR?", a: "NR (nicotinamide riboside) is the more efficient NAD+ precursor - it raises blood NAD+ levels more reliably than niacinamide does. Niacinamide at 16 to 50 mg (final amount being set) has a different downstream metabolite profile than niacin. Think of niacinamide as broad B3 coverage and NR as targeted NAD+ raise. We include both because they cover different aspects of the vitamin B3 family at low cumulative cost." }
        ],
        triadPlain: {
            mcas: "A 2013 study found that a single 100 mg dose of niacinamide raised blood histamine in 9 healthy men, a change researchers linked to methylation use. We also include methylfolate and methylated B12, which support the body's methyl supply.",
            heds: "We include niacinamide as broad vitamin B3 coverage alongside NR, not as a connective tissue ingredient. Niacinamide has not been tested with most hEDS medications.",
            pots: " Niacinamide is a form of vitamin B3 that supports normal energy production in cells. "
        },
        bluf: "Niacinamide is vitamin B3 in its amide form, different from niacin, which causes flushing through prostaglandin release. Niacinamide does not cause the flushing associated with niacin, since that flush comes from prostaglandins released through a different pathway in skin cells. Lab studies on skin cells have looked at niacinamide at concentrations far above what supplemental doses reach in the blood, and niacinamide also supports normal NAD+ production in the body. ZebraThrive uses 16 to 50 mg (final amount being set) in the AM stack.",
        atAGlance: {
            whatItIs: "Niacinamide is vitamin B3 in its amide form - different from niacin, which causes flushing through prostaglandin release.",
            whyWeIncludeIt: "Niacinamide is non-flushing. In an animal and isolated cell lab study, nicotinamide affected mast cell activity, but this has not been studied in people. ",
            dose: "16 to 50 mg (final amount being set) daily (AM capsule)",
            keyBenefits: ["Non-flushing B3 form: niacin's flush comes from prostaglandins released through GPR109A on skin cells, a different pathway than niacinamide.", "Supports normal NAD+ production in the body", "", ""]
        },
        howItWorks: "Niacinamide is a form of vitamin B3 that the body uses for normal NAD+ production, which supports normal energy production in cells. In an animal and isolated cell lab study, nicotinamide affected mast cell activity, but this has not been studied in people. A small human study gave 9 healthy men a single 100 mg dose and measured higher blood histamine at the 5 hour mark, the only time point checked, so a lasting or temporary pattern was not shown. Lower doses have not been tested. ",
        research: [
            {
                outcome: "Methylation/Histamine Dose Constraint",
                summary: "A small human study found that a single 100 mg dose of niacinamide raised blood histamine 5 hours later in 9 healthy men. The researchers suggested this may relate to competition for the same methyl donor pool used by other enzymes, though lower doses were not tested. ",
                studies: [
                    {
                        source: "Tian YJ et al., \"Excess nicotinamide increases plasma serotonin and histamine levels\"",
                        pmid: "23426511",
                        design: "Single 100 mg oral dose given to 9 healthy male volunteers.",
                        finding: "A single 100 mg dose of niacinamide raised plasma histamine at 5 hours. The study authors attributed this to a drop in methyl donor levels, since betaine fell after the dose."
                    },
                    {
                        source: "Loring HS, Thompson PR, \"Kinetic Mechanism of Nicotinamide N-Methyltransferase\"",
                        pmid: "30148963",
                        design: "Enzyme kinetics study, NNMT mechanism",
                        finding: "This lab study examined how the enzyme NNMT methylates nicotinamide using the SAM methyl pool, and noted that aberrant NNMT activity can deplete SAM. It did not test supplemental niacinamide doses."
                    }
                ]
            },
            {
                outcome: "Safety and Hepatotoxicity Ceiling",
                summary: "Niacinamide has been extensively reviewed for high-dose safety in the diabetes-prevention literature. Reversible hepatotoxicity has been reported above 3 g/day; minor abnormalities of liver enzymes can occur infrequently. ",
                studies: [
                    {
                        source: "Knip M et al., \"Safety of high-dose nicotinamide: a review\"",
                        pmid: "11126400",
                        design: "Literature review of high-dose nicotinamide trials",
                        finding: "Therapeutic index is wide; reversible hepatotoxicity reported at doses above 3 g/day in animals and humans; minor liver enzyme abnormalities infrequent at typical study doses; no evidence of teratogenicity or oncogenicity"
                    },
                    {
                        source: "Cosmetic Ingredient Review Expert Panel, \"Final report of the safety assessment of niacinamide and niacin\"",
                        pmid: "16596767",
                        design: "Comprehensive safety review",
                        finding: "A cosmetic safety review found niacinamide and niacin non-toxic at levels well above those used in cosmetics, and both are readily absorbed."
                    }
                ]
            },
            {
                outcome: "NAD+ Pathway Coverage Alongside NR",
                summary: "Niacinamide is a form of vitamin B3 included alongside Nicotinamide Riboside in this formula. Recent mouse and cord-blood cell research looked at how NAD-boosting compounds NMN and NR affected mast cell degranulation through SIRT6 signaling. Niacinamide itself was not tested in this work.",
                studies: [
                    {
                        source: "Kim HW et al., \"NAD(+)-boosting molecules suppress mast cell degranulation and anaphylactic responses in mice\"",
                        pmid: "35547746",
                        design: "Mouse + human cord blood-derived mast cell + cell models",
                        finding: "In a mouse and cord-blood cell study, NMN and NR suppressed mast cell degranulation through the SIRT6 pathway. Niacinamide's role in this same pathway has not been established."
                    }
                ]
            }
        ],
        triad: {
            mcas: "A 2013 study found that a single 100 mg dose of niacinamide raised blood histamine in 9 healthy men, a change researchers linked to methylation use. We also include methylfolate and methylated B12, which support the body's methyl supply.",
            heds: " ",
            pots: " Niacinamide is a form of vitamin B3 that supports normal energy production in cells. "
        },
        whyThisForm: {
            form: "Niacinamide (amide form)",
            rationale: "We use niacinamide, the amide form, not niacin, at 16 to 50 mg (final amount being set) per day. Niacin causes flushing through prostaglandin release from Langerhans cells - that 'niacin flush' is uncomfortable and can be a problem for sensitive populations. Niacinamide is the non-flushing form. We chose 16 to 50 mg (final amount being set) partly because a 2013 study found that a single 100 mg dose in 9 healthy men raised blood histamine at the 5 hour mark, a change researchers linked to methylation use. "
        },
        safety: {
            sideEffects: "Our dose is 16 to 50 mg (final amount being set), within niacinamide's wide safety margin noted in the research. Niacinamide is non-flushing (unlike niacin). Very high doses (over 3 g per day) have hepatotoxicity concerns, far above our dose. No reported acute side effects in healthy populations at supplement doses.",
            interactions: "Niacinamide has not been tested with most POTS, MCAS or hEDS medications. One human study found omeprazole did not change niacinamide absorption. Case reports describe INR rises in people on warfarin who started niacin or niacinamide, so tell your prescriber if you take warfarin. Famotidine may slow the kidney's clearance of a niacinamide breakdown product, based on lab and transporter data rather than a study of the two taken together. What this means for the body is not known. Mention to your prescriber if you take additional high-dose B3 separately.",
            excipientConcerns: {
                avoid: ["", "Artificial colors", "Magnesium stearate"],
                safe: ["HPMC capsules", "Rice hull concentrate", "Cellulose"]
            }
        },
        sources: [
            { title: "Excess nicotinamide increases plasma serotonin and histamine levels", pmid: "23426511", authors: "Tian YJ et al.", year: "2013" },
            { title: "Kinetic Mechanism of Nicotinamide N-Methyltransferase", pmid: "30148963", authors: "Loring HS, Thompson PR", year: "2018" },
            { title: "Safety of high-dose nicotinamide: a review", pmid: "11126400", authors: "Knip M et al.", year: "2000" },
            { title: "Final report of the safety assessment of niacinamide and niacin", pmid: "16596767", authors: "Cosmetic Ingredient Review Expert Panel", year: "2005" },
            { title: "NAD(+)-boosting molecules suppress mast cell degranulation and anaphylactic responses in mice", pmid: "35547746", authors: "Kim HW et al.", year: "2022" }
        ]
    },
    "r5p": {
        id: "r5p",
        name: "R5P (Riboflavin-5-Phosphate)",
        patientSummary: "R5P (riboflavin 5'-phosphate) is a form of vitamin B2. Your body uses riboflavin to make FMN and FAD, the cofactor forms its enzymes need. Riboflavin is the cofactor the MTHFR enzyme needs for methylation. Riboflavin also supports mitochondrial energy production through the electron transport chain. ",
        whyThisFormPatient: "We use riboflavin 5'-phosphate (R5P), a form of vitamin B2 that your body turns into the cofactors FMN and FAD. Plain riboflavin is converted by riboflavin kinase before it becomes active. The product provides 18.3 mg of riboflavin, well above the basic vitamin requirement and far below the 400 mg used in some high-dose riboflavin studies. It is a daily B2 and methylation-cofactor dose. Like all riboflavin, it starts as a fermentation product; we disclose that because no non-fermented vitamin B2 exists.",
        faq: [
            { q: "Why R5P instead of regular riboflavin?", a: "Riboflavin needs to be converted by an enzyme called riboflavin kinase before your body can use it as a cofactor. R5P is a phosphorylated form of vitamin B2; whether people use it more efficiently than plain riboflavin has not been tested. " },
            { q: "Is R5P in the formula for headaches?", a: "No. Our 18.3 mg of riboflavin is for daily B2 intake, MTHFR cofactor support, and supporting Complex I and II of the electron transport chain. Riboflavin studies in people with headache conditions used 400 mg per day, about 22 times the 18.3 mg of riboflavin in this product. This formula is not intended for any headache condition; talk with your clinician about headache care." },
            { q: "Why does MTHFR matter for the riboflavin dose?", a: "MTHFR is the enzyme that converts folate into its active methyl form, which your body uses for methylation. R5P (as FAD) is MTHFR's required cofactor. Daily riboflavin (18.3 mg) supports MTHFR function, which plays a role in methylation. In a small trial, riboflavin 1.6 mg per day raised SAM, a methyl donor, in adults with the MTHFR 677TT genotype." },
            { q: "Will R5P interact with my medications?", a: " Tetracycline antibiotics can interfere with riboflavin absorption, so separate dosing by about 3 hours. If you take tetracyclines, mention R5P to your prescriber. " }
        ],
        triadPlain: {
            mcas: "R5P does not act directly on mast cells; it is a vitamin B2 cofactor.",
            heds: "R5P is included for daily vitamin B2 intake (18.3 mg of riboflavin in the AM capsule).",
            pots: "R5P is a foundational vitamin B2 ingredient rather than a primary one."
        },
        bluf: "R5P is a phosphorylated form of vitamin B2, made from riboflavin by a chemical step. Riboflavin, as FAD, is the cofactor the MTHFR enzyme needs. Riboflavin also supports mitochondrial energy production. ZebraThrive uses 18.3 mg riboflavin as riboflavin 5'-phosphate sodium in the AM capsule.",
        atAGlance: {
            whatItIs: "R5P (riboflavin 5'-phosphate) is a form of vitamin B2. Your body uses riboflavin to make FMN and FAD, the cofactor forms its enzymes need.",
            whyWeIncludeIt: "Riboflavin is the cofactor the MTHFR enzyme needs for methylation. Riboflavin also supports mitochondrial energy production through the electron transport chain.",
            dose: "18.3 mg riboflavin as riboflavin 5'-phosphate sodium (AM capsule)",
            keyBenefits: ["Riboflavin 5'-phosphate, a form of vitamin B2 used to make the cofactors FMN and FAD", "", "Mitochondrial energy: cofactor for Complex I and Complex II of the electron transport chain", "Daily B2 coverage at 18.3 mg riboflavin, a cofactor the MTHFR enzyme needs."]
        },
        howItWorks: "R5P (riboflavin 5'-phosphate) is a form of vitamin B2. Your body uses riboflavin to make FMN and FAD, the cofactor forms its enzymes need. Riboflavin is the cofactor the MTHFR enzyme needs for methylation. Riboflavin also supports mitochondrial energy production through the electron transport chain. ",
        research: [
            {
                outcome: "MTHFR Cofactor Support and Blood Pressure",
                summary: "Riboflavin (as FAD) is the cofactor for MTHFR. In people with the MTHFR C677T variant, the enzyme is less stable and more dependent on riboflavin availability. Studies in adults with the TT genotype have measured blood pressure in relation to riboflavin status, illustrating the genotype-cofactor interaction.",
                studies: [
                    {
                        source: "Rooney M et al., \"Impact of the MTHFR C677T polymorphism on one-carbon metabolites: evidence from a randomised trial of riboflavin supplementation\"",
                        pmid: "32330571",
                        design: "Plasma metabolite analysis (n=115) plus riboflavin 1.6 mg/day vs placebo for 16 weeks in MTHFR 677TT adults (n=47)",
                        finding: "TT-genotype adults had lower SAM and SAM:SAH and higher homocysteine than CC; riboflavin raised SAM and cystathionine in the TT group."
                    },
                    {
                        source: "Rooney M et al., \"Impact of the MTHFR C677T polymorphism on blood pressure and related central haemodynamic parameters in healthy adults\"",
                        pmid: "35821207",
                        design: "Cross-sectional study of 242 adults with the 677TT genotype plus age-matched non-TT controls, drawn from 2,546 prescreened individuals",
                        finding: "Adults with the 677TT genotype had systolic blood pressure about 5.5 mmHg higher than non-TT (CC/CT) adults."
                    },
                    {
                        source: "McAuley E et al., \"Riboflavin status, MTHFR genotype and blood pressure\"",
                        pmid: "27170501",
                        design: "Narrative + targeted review",
                        finding: "Reviews trials of riboflavin in adults with the MTHFR 677TT genotype in which blood pressure was measured"
                    }
                ]
            },
            {
                outcome: "Our Riboflavin Dose",
                summary: " This capsule provides 18.3 mg riboflavin for daily B2 and methylation-cofactor support. ZebraThrive is not intended to diagnose, treat, cure, or prevent any disease, including headache conditions.",
                studies: [
                    {
                        source: "",
                        pmid: "33779525",
                        design: "",
                        finding: ""
                    },
                    {
                        source: "",
                        pmid: "22683887",
                        design: "Evidence-graded clinical practice guideline",
                        finding: ""
                    }
                ]
            },
            {
                outcome: "Mitochondrial Energy and FAD/FMN Cofactor Role",
                summary: "Riboflavin is the precursor to FAD and FMN, the cofactors for Complex I and Complex II of the electron transport chain and the FAD-dependent flavoproteins of fatty acid beta-oxidation. This is textbook biochemistry and the reason riboflavin is relevant to cellular energy.",
                studies: []
            }
        ],
        triad: {
            mcas: "R5P does not act directly on mast cells; it is a vitamin B2 cofactor.",
            heds: "Included for daily vitamin B2 intake.",
            pots: " "
        },
        whyThisForm: {
            form: "Riboflavin 5'-Phosphate (R5P), USP grade, providing 18.3 mg riboflavin (AM capsule)",
            rationale: "We use riboflavin 5'-phosphate (R5P), a form of vitamin B2 that your body turns into the cofactors FMN and FAD. Plain riboflavin is converted by riboflavin kinase before it becomes active. The product provides 18.3 mg of riboflavin, well above the basic vitamin requirement and far below the 400 mg used in some high-dose riboflavin studies. It is a daily B2 and methylation-cofactor dose. How it is made: all commercial riboflavin is produced by fermentation, and R5P is made from it by a chemical step and purified to USP grade. Our sourcing rule is to avoid fermentation where a non-fermented option exists and to disclose it where none does. For vitamin B2 there is none. No histamine or tyramine result is on file yet for the current lot."
        },
        safety: {
            sideEffects: "Excellent safety profile. May cause harmless bright yellow urine color (excreted excess riboflavin). ",
            interactions: "Methotrexate users should mention any methylated B-vitamin stack to their prescriber, as methylated cofactors can affect methotrexate's antifolate mechanism. Tetracycline antibiotics can interfere with riboflavin absorption. If you take tetracycline, consider separating doses by about 3 hours and mention it to your prescriber. ",
            excipientConcerns: {
                avoid: ["Unverified grades without a COA", "Artificial colors", "Magnesium stearate"],
                safe: ["HPMC capsules", "Rice hull concentrate", "Cellulose"]
            }
        },
        sources: [
            
            { title: "Impact of the MTHFR C677T polymorphism on one-carbon metabolites: evidence from a randomised trial of riboflavin supplementation", pmid: "32330571", authors: "Rooney M et al.", year: "2020" },
            { title: "Impact of the MTHFR C677T polymorphism on blood pressure phenotype: results from the JINGO project", pmid: "35821207", authors: "Rooney M et al.", year: "2022" },
            { title: "Riboflavin status, MTHFR genotype and blood pressure", pmid: "27170501", authors: "McAuley E et al.", year: "2016" },
            
        ]
    }

};

sanitizeIngredients(ingredients);

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
