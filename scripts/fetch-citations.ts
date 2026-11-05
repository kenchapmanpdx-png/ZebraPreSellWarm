/* scripts/fetch-citations.ts
 *
 * Manual (not part of `npm run build`): `npm run citations`.
 *
 * Collects every PMID cited on the ingredient pages (sources[] and
 * research[].studies[]), fetches the bibliographic record for each from
 * NCBI E-utilities esummary, and writes client/src/data/citations.ts.
 * The reference lists, the .md companions and the JSON-LD `citation`
 * property all read from that file, so author names, article titles,
 * journals, volume/pages, DOIs and PubMed publication types come from
 * PubMed rather than from hand-typed text.
 *
 * Re-run after adding or changing any PMID in ingredients.ts. The script
 * fails (non-zero exit) if any PMID is not found, so a typo cannot ship.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { ingredients } from "../client/src/data/ingredients.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../client/src/data/citations.ts");
const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi";

/* PubMed publication types mapped to a reader-facing label, highest first.
 * Only PubMed's own indexing is used; nothing is inferred from the abstract. */
const STUDY_TYPES: [string, string][] = [
  ["Meta-Analysis", "Meta-analysis"],
  ["Practice Guideline", "Guideline"],
  ["Guideline", "Guideline"],
  ["Systematic Review", "Systematic review"],
  ["Randomized Controlled Trial", "Randomized controlled trial"],
  ["Clinical Trial, Phase IV", "Clinical trial"],
  ["Clinical Trial, Phase III", "Clinical trial"],
  ["Clinical Trial, Phase II", "Clinical trial"],
  ["Clinical Trial, Phase I", "Clinical trial"],
  ["Controlled Clinical Trial", "Clinical trial"],
  ["Clinical Trial", "Clinical trial"],
  ["Observational Study", "Observational study"],
  ["Review", "Review"],
  ["Case Reports", "Case report"],
];

type Summary = {
  uid: string;
  error?: string;
  title: string;
  source: string;
  fulljournalname: string;
  pubdate: string;
  sortpubdate?: string;
  volume: string;
  issue: string;
  pages: string;
  authors: { name: string; authtype: string }[];
  pubtype: string[];
  articleids: { idtype: string; value: string }[];
};

function cleanTitle(t: string): string {
  let s = t.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  s = s.replace(/\s+/g, " ").trim();
  if (s.startsWith("[") && s.endsWith("].")) s = s.slice(1, -2); // translated-title convention
  return s.replace(/\.$/, "");
}

function sentenceCaseJournal(j: string): string {
  // NLM full names are lowercase after the first word ("Journal of hypertension").
  return j.length ? j[0].toUpperCase() + j.slice(1) : j;
}

function collectPmids(): string[] {
  const set = new Set<string>();
  for (const ing of Object.values(ingredients)) {
    for (const s of ing.sources || []) if (s.pmid) set.add(s.pmid);
    for (const b of ing.research || []) for (const st of b.studies || []) if (st.pmid) set.add(st.pmid);
  }
  return [...set].sort((a, b) => Number(a) - Number(b));
}

async function fetchBatch(ids: string[]): Promise<Record<string, Summary>> {
  const url = `${EUTILS}?db=pubmed&retmode=json&id=${ids.join(",")}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url);
    if (res.ok) {
      const json = (await res.json()) as { result: Record<string, Summary> & { uids: string[] } };
      return json.result;
    }
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  throw new Error(`esummary failed for batch starting ${ids[0]}`);
}

async function main() {
  const pmids = collectPmids();
  const records: Record<string, unknown> = {};
  const missing: string[] = [];
  for (let i = 0; i < pmids.length; i += 150) {
    const batch = pmids.slice(i, i + 150);
    const result = await fetchBatch(batch);
    for (const id of batch) {
      const s = result[id];
      if (!s || s.error || !s.title) { missing.push(id); continue; }
      const people = s.authors.filter((a) => a.authtype === "Author").map((a) => a.name);
      const collective = s.authors.filter((a) => a.authtype === "CollectiveName").map((a) => a.name);
      const doi = s.articleids.find((x) => x.idtype === "doi")?.value || "";
      const pmc = s.articleids.find((x) => x.idtype === "pmc")?.value || "";
      const year = (s.pubdate.match(/\d{4}/) || (s.sortpubdate || "").match(/\d{4}/) || [""])[0];
      const studyType = STUDY_TYPES.find(([pt]) => s.pubtype.includes(pt))?.[1] || "";
      records[id] = {
        title: cleanTitle(s.title),
        authors: people.slice(0, 6),
        authorCount: people.length,
        ...(collective.length ? { group: collective[0] } : {}),
        journal: s.source,
        journalFull: sentenceCaseJournal(s.fulljournalname),
        year,
        volume: s.volume,
        issue: s.issue,
        pages: s.pages,
        doi,
        pmc,
        studyType,
      };
    }
    await new Promise((r) => setTimeout(r, 400)); // NCBI: max 3 requests/s without a key
  }
  if (missing.length) {
    console.error(`[citations] PubMed returned no record for: ${missing.join(", ")}`);
    process.exit(1);
  }
  const today = new Date().toISOString().slice(0, 10);
  const body = `/* client/src/data/citations.ts
 *
 * GENERATED by scripts/fetch-citations.ts on ${today} from NCBI PubMed
 * esummary. Do not edit by hand: change the PMID in ingredients.ts and
 * run \`npm run citations\`.
 */
export interface Citation {
  title: string;
  /** Up to six authors as PubMed formats them ("Jarisch R"). */
  authors: string[];
  authorCount: number;
  group?: string;
  /** NLM/ISO journal abbreviation. */
  journal: string;
  journalFull: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  pmc: string;
  /** Reader-facing label derived only from PubMed publication types; empty when none applies. */
  studyType: string;
}

export const CITATIONS: Record<string, Citation> = ${JSON.stringify(records, null, 2)};
`;
  writeFileSync(OUT, body);
  console.log(`[citations] wrote ${Object.keys(records).length} records to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
