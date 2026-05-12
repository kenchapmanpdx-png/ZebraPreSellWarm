import { IngredientData } from "@/data/ingredients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, XCircle, Beaker, ShieldCheck, Microscope } from "lucide-react";

interface IngredientDetailProps {
    data: IngredientData;
}

export default function IngredientDetail({ data }: IngredientDetailProps) {
    // Build a unified, numbered reference list. Start with sources[] (the
    // canonical bibliography we ship), then add any PMIDs from
    // research[].studies that aren't already in sources. Map PMID -> ref
    // number so study cards can show [n] inline matching the same numbering.
    type RefEntry = {
        n: number;
        title: string;
        authors?: string;
        year?: string;
        pmid?: string;
        link?: string;
    };
    const refList: RefEntry[] = [];
    const pmidIndex = new Map<string, number>();
    for (const src of data.sources || []) {
        const n = refList.length + 1;
        refList.push({ n, title: src.title, authors: src.authors, year: src.year, pmid: src.pmid, link: src.link });
        if (src.pmid) pmidIndex.set(src.pmid, n);
    }
    for (const block of data.research || []) {
        for (const study of block.studies || []) {
            if (!study.pmid) continue;
            if (pmidIndex.has(study.pmid)) continue;
            const n = refList.length + 1;
            refList.push({ n, title: study.source, pmid: study.pmid });
            pmidIndex.set(study.pmid, n);
        }
    }
    const refNumberForPmid = (pmid?: string) => (pmid ? pmidIndex.get(pmid) : undefined);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
            {/* Header */}
            <div className="space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight">{data.name}</h1>
                {data.scientificName && (
                    <p className="text-2xl text-muted-foreground italic font-light">{data.scientificName}</p>
                )}
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    Last reviewed <time dateTime="2026-05-11">May 11, 2026</time>
                </p>
            </div>

            {/* BLUF answer capsule (40-60 words). Primary AI citation surface
                per master GEO doc §5 - leads every ingredient page. */}
            {data.bluf && (
                <section className="bg-[#0F2A22]/[0.04] border border-[#0F2A22]/15 rounded-2xl p-6 md:p-8 shadow-sm">
                    <p className="text-base md:text-lg leading-relaxed text-primary font-medium">
                        {data.bluf}
                    </p>
                </section>
            )}

            {/* Patient Summary - longer plain-language layer (renders only when content is drafted) */}
            {data.patientSummary && (
                <section className="bg-white/60 border-l-4 border-accent/60 rounded-r-2xl p-8 md:p-10 shadow-sm">
                    <p className="text-lg md:text-xl leading-relaxed text-primary/90 font-serif">
                        {data.patientSummary}
                    </p>
                </section>
            )}

            {/* At a Glance */}
            <Card className="bg-secondary/20 border-border shadow-md overflow-hidden ring-1 ring-black/[0.03]">
                <CardHeader className="bg-secondary/30 border-b border-border/50 py-4">
                    <h2 className="text-xl font-serif flex items-center gap-2 m-0">
                        <CheckCircle2 className="w-5 h-5 text-accent" aria-hidden="true" />
                        At a Glance
                    </h2>
                </CardHeader>
                <CardContent className="p-8 grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                        <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-accent/80">What It Is</h3>
                        <p className="text-lg leading-snug">{data.atAGlance.whatItIs}</p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-accent/80">Why We Include It</h3>
                        <p className="text-lg leading-snug">{data.atAGlance.whyWeIncludeIt}</p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-accent/80">Daily Dose</h3>
                        <p className="text-xl font-serif font-medium text-primary">{data.atAGlance.dose}</p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-accent/80">Key Benefits</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.atAGlance.keyBenefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm bg-white/60 px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-accent/70" aria-hidden="true" />
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* How It Works */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                        <Beaker className="w-6 h-6 text-accent" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-serif">How It Works</h2>
                </div>
                <div className="prose prose-slate max-w-none text-lg leading-relaxed text-muted-foreground space-y-4">
                    {data.howItWorks.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </section>

            {/* What the Research Shows */}
            <section className="space-y-8 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-border/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-lg">
                        <Microscope className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-serif">What the Research Shows</h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {data.research.map((item, idx) => (
                        <AccordionItem key={idx} value={`research-${idx}`} className="border rounded-2xl px-6 bg-[#FDFBF7]/50">
                            <AccordionTrigger className="text-left text-xl font-serif hover:no-underline py-6">
                                {item.outcome}
                            </AccordionTrigger>
                            <AccordionContent forceMount className="space-y-6 pb-8">
                                <p className="text-lg font-medium text-primary/80 border-l-2 border-accent pl-4">{item.summary}</p>
                                <div className="grid gap-6">
                                    {item.studies.map((study, sIdx) => (
                                        <div key={sIdx} className="bg-white p-6 rounded-xl border border-border/40 shadow-sm space-y-3">
                                            <div className="flex justify-between items-start gap-4">
                                                <cite className="font-serif text-lg not-italic text-primary">
                                                    {refNumberForPmid(study.pmid) !== undefined && (
                                                        <a
                                                            href={`#ref-${refNumberForPmid(study.pmid)}`}
                                                            className="text-accent font-bold mr-2 no-underline hover:underline"
                                                            aria-label={`Jump to reference ${refNumberForPmid(study.pmid)}`}
                                                        >
                                                            [{refNumberForPmid(study.pmid)}]
                                                        </a>
                                                    )}
                                                    {study.source}
                                                </cite>
                                                {study.pmid && (
                                                    <Badge variant="outline" className="text-[10px] uppercase tracking-tighter shrink-0">PMID: {study.pmid}</Badge>
                                                )}
                                            </div>
                                            {study.design && (
                                                <p className="text-xs font-bold uppercase tracking-widest text-[#A4613A]/70">{study.design}</p>
                                            )}
                                            <p className="text-muted-foreground leading-relaxed">{study.finding}</p>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

            </section>

            {/* For the Triad Specifically */}
            <section className="space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-serif">Addressing the Triad</h2>
                    <p className="text-muted-foreground">Tailored benefits for complex conditions</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        { title: "MCAS", content: data.triad.mcas },
                        { title: "hEDS", content: data.triad.heds },
                        { title: "POTS", content: data.triad.pots }
                    ].map((item, idx) => (
                        <div key={idx} className="group relative p-8 bg-white rounded-3xl shadow-lg border border-border/30 transition-all hover:-translate-y-1">
                            <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                                {item.title}
                            </div>
                            <p className="text-muted-foreground leading-relaxed mt-2">{item.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why We Chose This Form */}
            <section className="space-y-8 p-10 md:p-14 bg-primary text-primary-foreground rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-serif !text-primary-foreground">Why We Chose This Form</h2>
                        <div className="inline-block px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg">
                            <span className="text-accent-foreground font-bold">{data.whyThisForm.form}</span>
                        </div>
                    </div>

                    <p className="text-xl leading-relaxed opacity-90 font-serif">
                        {data.whyThisForm.rationale}
                    </p>

                    {data.whyThisForm.comparison && (
                        <div className="pt-8 grid gap-4">
                            <h3 className="font-bold text-xs uppercase tracking-[0.2em] opacity-60">Form Comparison</h3>
                            <div className="grid gap-3">
                                {data.whyThisForm.comparison.map((comp, i) => (
                                    <div key={i} className={`p-4 rounded-xl flex items-start gap-4 transition-colors ${comp.selected ? 'bg-white/10 border border-white/20' : 'opacity-40 grayscale'}`}>
                                        {comp.selected ? <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" /> : <XCircle className="w-5 h-5 opacity-40 shrink-0 mt-0.5" aria-hidden="true" />}
                                        <div>
                                            <p className="font-bold text-sm">{comp.form}</p>
                                            <p className="text-xs opacity-70">{comp.difference}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Safety & Interactions */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <ShieldCheck className="w-6 h-6 text-green-600" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-serif">Safety & Interactions</h2>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b pb-2">Potential Side Effects</h3>
                        <p className="text-muted-foreground leading-relaxed">{data.safety.sideEffects}</p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b pb-2">Drug Interactions</h3>
                        <p className="text-muted-foreground leading-relaxed">{data.safety.interactions}</p>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-8 bg-red-50/50 rounded-3xl border border-red-100 space-y-4">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-red-800/70">Excipients to Avoid</h3>
                        <ul className="grid gap-2">
                            {data.safety.excipientConcerns.avoid.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-red-900/80">
                                    <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-8 bg-green-50/50 rounded-3xl border border-green-100 space-y-4">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-green-800/70">Safe Excipients</h3>
                        <ul className="grid gap-2">
                            {data.safety.excipientConcerns.safe.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-green-900/80">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {data.safety.cautions && (
                    <div className="p-8 bg-accent/5 rounded-[2rem] border border-accent/20 flex gap-6 italic">
                        <AlertCircle className="w-8 h-8 text-accent shrink-0" aria-hidden="true" />
                        <p className="text-lg text-primary/80 leading-relaxed">{data.safety.cautions}</p>
                    </div>
                )}
            </section>

            {/* Titration Protocol */}
            {data.howToStart && (
                <section className="space-y-10">
                    <h2 className="text-3xl font-serif">How to Start</h2>
                    <div className="overflow-hidden border border-border/50 rounded-[2rem] shadow-xl bg-white p-2">
                        <Table>
                            <TableHeader className="bg-secondary/20">
                                <TableRow className="border-none">
                                    <TableHead className="py-6 px-8 text-xs uppercase tracking-[0.2em] font-bold">Protocol Step</TableHead>
                                    <TableHead className="py-6 px-8 text-xs uppercase tracking-[0.2em] font-bold">Suggested Dosage</TableHead>
                                    <TableHead className="py-6 px-8 text-xs uppercase tracking-[0.2em] font-bold">Key Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.howToStart.protocol.map((step, i) => (
                                    <TableRow key={i} className="border-border/30 hover:bg-secondary/5">
                                        <TableCell className="py-6 px-8 font-bold text-primary">{step.step}</TableCell>
                                        <TableCell className="py-6 px-8 font-serif text-lg">{step.dosage}</TableCell>
                                        <TableCell className="py-6 px-8 text-muted-foreground text-sm leading-relaxed">{step.notes || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {data.howToStart.timeline && (
                        <div className="text-center p-6 bg-secondary/30 rounded-2xl border border-border/50">
                            <p className="font-serif italic text-lg text-primary/80">"{data.howToStart.timeline}"</p>
                        </div>
                    )}
                </section>
            )}

            {/* State of the Evidence (formerly Evidence Gaps). Demoted from
                inside the Research section to here so the buying-decision flow
                isn't broken by a warning-shaped block mid-page. Neutral styling
                signals scientific honesty without alarm. */}
            {data.evidenceGaps && (
                <section className="pt-8">
                    <div className="p-6 md:p-8 bg-white/40 border border-border/40 rounded-2xl">
                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">State of the Evidence</h3>
                        <p className="text-sm md:text-base text-foreground/75 leading-relaxed">{data.evidenceGaps}</p>
                    </div>
                </section>
            )}

            {/* References (numbered, unified across sources + research studies) */}
            <section id="references" className="pt-16 border-t border-border/50">
                <Accordion type="single" collapsible>
                    <AccordionItem value="references" className="border-none">
                        <AccordionTrigger className="text-muted-foreground hover:no-underline flex justify-center py-4 bg-secondary/20 rounded-xl">
                            References ({refList.length})
                        </AccordionTrigger>
                        <AccordionContent forceMount>
                            <ol className="space-y-6 pt-10 px-4 md:px-12 list-none">
                                {refList.map((ref) => (
                                    <li
                                        key={ref.n}
                                        id={`ref-${ref.n}`}
                                        className="text-sm border-l-2 border-border/50 pl-6 py-1 scroll-mt-24"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between items-start gap-4">
                                                <span className="font-serif text-lg leading-snug">
                                                    <span className="text-accent font-bold mr-2">[{ref.n}]</span>
                                                    {ref.title}
                                                </span>
                                                {ref.pmid && (
                                                    <a
                                                        href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[10px] bg-primary/5 px-2 py-0.5 rounded border hover:bg-primary/10 transition-colors uppercase tracking-widest shrink-0"
                                                    >
                                                        PMID: {ref.pmid}
                                                    </a>
                                                )}
                                            </div>
                                            {(ref.authors || ref.year) && (
                                                <p className="text-muted-foreground/80 italic">
                                                    {ref.authors} {ref.year && `(${ref.year})`}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* Patient FAQ - common questions in plain language */}
            {data.faq && data.faq.length > 0 && (
                <section className="space-y-6">
                    <h2 className="text-3xl font-serif text-primary">Common Questions</h2>
                    <Accordion type="single" collapsible className="space-y-3">
                        {data.faq.map((item, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="bg-white/60 border border-border/50 rounded-xl px-6">
                                <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent forceMount className="text-base leading-relaxed text-foreground/80 pb-5">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            )}

            {/* Plain-language triad - patient voice rewrite of the clinical triad block */}
            {data.triadPlain && (
                <section className="grid gap-6 md:grid-cols-3">
                    <div className="bg-white/60 border border-border/50 rounded-2xl p-6">
                        <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-accent mb-3">For MCAS</h3>
                        <p className="text-base leading-relaxed">{data.triadPlain.mcas}</p>
                    </div>
                    <div className="bg-white/60 border border-border/50 rounded-2xl p-6">
                        <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-accent mb-3">For hEDS</h3>
                        <p className="text-base leading-relaxed">{data.triadPlain.heds}</p>
                    </div>
                    <div className="bg-white/60 border border-border/50 rounded-2xl p-6">
                        <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-accent mb-3">For POTS</h3>
                        <p className="text-base leading-relaxed">{data.triadPlain.pots}</p>
                    </div>
                </section>
            )}

            {/* Why this form - patient-language version (when present, supplements the clinical whyThisForm) */}
            {data.whyThisFormPatient && (
                <section className="bg-white/50 border border-border/50 rounded-2xl p-8 md:p-10">
                    <h2 className="text-2xl font-serif text-primary mb-4">Why This Form</h2>
                    <p className="text-base md:text-lg leading-relaxed text-foreground/85">
                        {data.whyThisFormPatient}
                    </p>
                </section>
            )}

            {/* Author byline (relocated from top, master GEO doc §17 YMYL).
                The JSON-LD `author` field on MedicalWebPage carries the same
                attribution for AI crawlers; this visible line backs it. */}
            <section className="pt-8 border-t border-border/40 text-sm text-muted-foreground/80">
                <p>
                    Written by <span className="font-medium text-foreground/85">Ken Chapman</span>, Founder of ZebraWell.
                    Reviewed and last updated <time dateTime="2026-05-11">May 11, 2026</time>.
                </p>
            </section>
        </div>
    );
}
