/* client/src/data/references.ts
 *
 * One numbered reference list per ingredient page, shared by the page
 * (IngredientDetail), the .md companion (generate-md-pages) and the JSON-LD
 * `citation` property (prerender), so all three always agree.
 *
 * Order: sources[] first, then any PMID from research[].studies[] not already
 * listed. Bibliographic fields come from citations.ts (generated from PubMed);
 * the hand-typed title/authors/year in ingredients.ts are only a fallback for
 * a reference that has no PMID.
 */
import { CITATIONS, type Citation } from "./citations";
import type { IngredientData } from "./ingredients";

export interface Reference {
  n: number;
  title: string;
  /** AMA-style author string, e.g. "Jarisch R, Weyer D, Ehlert E, et al." */
  authors: string;
  /** Individual author names from PubMed (up to six), for structured data. */
  authorNames?: string[];
  /** Group/collective author from PubMed when no individual authors exist. */
  authorGroup?: string;
  journal: string;
  journalFull: string;
  year: string;
  /** "24(4):281-8" (volume, issue, pages as available). */
  locator: string;
  pmid?: string;
  doi?: string;
  pmc?: string;
  link?: string;
  studyType?: string;
}

/** AMA: list all authors up to six; with more than six, the first three then "et al." */
export function formatAuthors(c: Citation): string {
  if (!c.authors.length) return c.group || "";
  const names = c.authorCount > 6 ? [...c.authors.slice(0, 3), "et al."] : c.authors;
  return names.join(", ");
}

function locatorFor(c: Citation): string {
  let s = c.volume || "";
  if (c.issue) s += `(${c.issue})`;
  if (c.pages) s += `${s ? ":" : ""}${c.pages}`;
  return s;
}

function fromCitation(n: number, pmid: string, c: Citation): Reference {
  return {
    n,
    title: c.title,
    authors: formatAuthors(c),
    authorNames: c.authors.length ? c.authors : undefined,
    authorGroup: !c.authors.length && c.group ? c.group : undefined,
    journal: c.journal,
    // NLM full titles carry subtitles after " : " ("Journal of vestibular research : equilibrium & orientation").
    journalFull: c.journalFull.split(" : ")[0].trim(),
    year: c.year,
    locator: locatorFor(c),
    pmid,
    doi: c.doi || undefined,
    pmc: c.pmc || undefined,
    studyType: c.studyType || undefined,
  };
}

export function buildReferences(ing: IngredientData): {
  refs: Reference[];
  numberFor: (pmid?: string) => number | undefined;
} {
  const refs: Reference[] = [];
  const index = new Map<string, number>();
  const add = (pmid: string | undefined, fallback: { title: string; authors?: string; year?: string; link?: string }) => {
    if (pmid && index.has(pmid)) return;
    const n = refs.length + 1;
    const c = pmid ? CITATIONS[pmid] : undefined;
    if (pmid && c) {
      refs.push(fromCitation(n, pmid, c));
    } else {
      refs.push({
        n,
        title: fallback.title,
        authors: fallback.authors || "",
        journal: "",
        journalFull: "",
        year: fallback.year || "",
        locator: "",
        pmid,
        link: fallback.link,
      });
    }
    if (pmid) index.set(pmid, n);
  };
  for (const s of ing.sources || []) add(s.pmid, { title: s.title, authors: s.authors, year: s.year, link: s.link });
  for (const block of ing.research || []) {
    for (const st of block.studies || []) if (st.pmid) add(st.pmid, { title: st.source });
  }
  return { refs, numberFor: (pmid) => (pmid ? index.get(pmid) : undefined) };
}

/** Plain-text AMA citation line: "Authors. Title. Journal. Year;Locator. doi:..." */
export function citationText(r: Reference): string {
  const parts: string[] = [];
  if (r.authors) parts.push(`${r.authors.replace(/\.$/, "")}.`);
  parts.push(`${r.title}.`);
  if (r.journal) parts.push(`${r.journal}. ${r.year}${r.locator ? `;${r.locator}` : ""}.`);
  else if (r.year) parts.push(`${r.year}.`);
  if (r.doi) parts.push(`doi:${r.doi}`);
  return parts.join(" ");
}
