/* client/src/pages/ClusterHubPage.tsx
 *
 * Renders one cluster hub from client/src/data/clusterHubs.ts. Layout follows
 * /excipients (pages/Excipients.tsx). Each ingredient entry shows the dose
 * and the existing plain-language paragraph from that ingredient's page
 * (triadPlain), then links to the page. See the DRAFT GATE note in
 * clusterHubs.ts before linking to these pages from anywhere.
 */
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { datesFor, formatDateLabel } from "@/data/pageDates";
import { ingredients } from "@/data/ingredients";
import { CLUSTER_HUBS, type ClusterHub } from "@/data/clusterHubs";

// Build-time sanity check (runs during prerender): every ingredient appears
// exactly once in each hub.
function checkCoverage(hub: ClusterHub) {
  const listed = hub.groups.flatMap((g) => g.ids);
  const all = Object.keys(ingredients);
  const missing = all.filter((id) => !listed.includes(id));
  const unknown = listed.filter((id) => !ingredients[id]);
  const dupes = listed.filter((id, i) => listed.indexOf(id) !== i);
  if (missing.length || unknown.length || dupes.length) {
    console.warn(`[hub ${hub.path}] missing=${missing.join(",")} unknown=${unknown.join(",")} duplicate=${dupes.join(",")}`);
  }
}

export default function ClusterHubPage({ hub }: { hub: ClusterHub }) {
  if (typeof window === "undefined") checkCoverage(hub);
  const modified = datesFor(hub.path)?.modified;
  const otherHubs = CLUSTER_HUBS.filter((h) => h.path !== hub.path);

  return (
    <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
      <Navigation />

      <main id="main-content" className="pt-28 md:pt-32 pb-20 px-6">
        <article className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: hub.crumb }]} />

          <header className="mb-12">
            <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#8F5238] mb-4">
              {hub.eyebrow}
            </span>
            <h1
              className="font-serif font-bold text-[#3D3733] leading-tight mb-6"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.25rem)" }}
            >
              {hub.h1}
            </h1>
            <p className="text-lg md:text-xl text-[#3D3733] leading-relaxed">{hub.bluf}</p>
            <p className="mt-6 text-sm text-[#5D5752]">
              Written by <span className="font-medium text-[#3D3733]">Ken Chapman</span>, Founder of ZebraThrive.
              {modified && (
                <>
                  {" "}Last updated <time dateTime={modified}>{formatDateLabel(modified)}</time>.
                </>
              )}
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">How to read this page</h2>
            <p className="text-base md:text-lg text-[#3D3733] leading-relaxed">{hub.intro}</p>
            <p className="mt-4 p-6 bg-white/60 border border-[#DED9D0] rounded-2xl text-base md:text-lg text-[#3D3733] leading-relaxed">
              {hub.limits}
            </p>
          </section>

          {hub.groups.map((g) => (
            <section key={g.heading} className="mb-14">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">{g.heading}</h2>
              <p className="text-base md:text-lg text-[#3D3733] leading-relaxed mb-8">{g.note}</p>
              <div className="space-y-6">
                {g.ids.map((id) => {
                  const ing = ingredients[id];
                  if (!ing) return null;
                  const text = ing.triadPlain?.[hub.triadKey] || ing.triad[hub.triadKey];
                  return (
                    <div key={id} className="p-6 md:p-8 bg-white/60 border border-[#DED9D0] rounded-2xl">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#3D3733] mb-2">
                        <Link href={`/ingredients/${id}`} className="hover:text-[#8F5238] transition-colors">
                          {ing.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-[#5D5752] mb-4">
                        <span className="font-bold text-[#3D3733]">Dose in ZebraThrive:</span> {ing.atAGlance.dose}
                      </p>
                      <p className="text-base md:text-lg text-[#3D3733] leading-relaxed">{text}</p>
                      <p className="mt-4">
                        <Link
                          href={`/ingredients/${id}`}
                          className="text-[#8F5238] font-bold underline underline-offset-2 hover:text-[#3D3733]"
                        >
                          {ing.name}: full evidence, form, and safety
                        </Link>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-6">Common questions</h2>
            <div className="space-y-6">
              {hub.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg md:text-xl font-bold text-[#3D3733] mb-2">{f.q}</h3>
                  <p className="text-base md:text-lg text-[#3D3733] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 md:p-10 bg-[#0F2A22] text-[#EBE8E1] rounded-[2rem] shadow-xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold !text-[#EBE8E1] mb-3">
              Every active and every excipient, documented
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#EBE8E1]/85 mb-8">
              The ingredient pages list form, dose, evidence and safety for each active. The excipients page lists
              what the formula leaves out and what it uses instead.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link
                href="/ingredients"
                className="inline-flex justify-center px-6 py-3 bg-[#8F5238] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#EBE8E1] hover:text-[#0F2A22] transition-colors"
              >
                Browse the ingredients
              </Link>
              <Link
                href="/excipients"
                className="inline-flex justify-center px-6 py-3 border border-[#EBE8E1]/40 text-[#EBE8E1] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors"
              >
                Read about excipients
              </Link>
              {otherHubs.map((h) => (
                <Link
                  key={h.path}
                  href={h.path}
                  className="inline-flex justify-center px-6 py-3 border border-[#EBE8E1]/40 text-[#EBE8E1] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors"
                >
                  {h.crumb}
                </Link>
              ))}
              <a
                href="/#waitlist"
                className="inline-flex justify-center px-6 py-3 border border-[#EBE8E1]/40 text-[#EBE8E1] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors"
              >
                Join the waitlist
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
