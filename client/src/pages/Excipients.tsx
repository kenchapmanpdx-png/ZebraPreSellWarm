/* client/src/pages/Excipients.tsx
 *
 * /excipients: the excipient hub. Explains what ZebraThrive leaves out and
 * why, what it uses instead, and the carriers that arrive with raw
 * materials. Content lives in client/src/data/excipients.ts (shared with
 * the .md companion). Added 2026-11-05 (SEO/GEO audit A13: the exclusion
 * story lived only in a homepage section and one /our-promise paragraph).
 */
import { Link } from "wouter";
import { Ban, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { datesFor, formatDateLabel } from "@/data/pageDates";
import {
  EXCIPIENTS_INTRO,
  EXCIPIENT_DEFINITION,
  EXCLUDED_EXCIPIENTS,
  USED_EXCIPIENTS,
  CARRIERS,
  CARRIERS_NOTE,
  LABEL_CHECKS,
  EXCIPIENT_FAQ,
} from "@/data/excipients";

export default function Excipients() {
  const modified = datesFor("/excipients")?.modified;

  return (
    <div className="min-h-screen bg-[#EBE8E1] selection:bg-[#B36B4D]/20">
      <Navigation />

      <main id="main-content" className="pt-28 md:pt-32 pb-20 px-6">
        <article className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Excipients" }]} />

          <header className="mb-12">
            <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#8F5238] mb-4">
              Excipients we refuse to use
            </span>
            <h1
              className="font-serif font-bold text-[#3D3733] leading-tight mb-6"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.25rem)" }}
            >
              Excipients: what ZebraThrive leaves out, and what it uses instead
            </h1>
            <p className="text-lg md:text-xl text-[#3D3733] leading-relaxed">{EXCIPIENTS_INTRO}</p>
            <p className="mt-6 text-sm text-[#5D5752]">
              Written by <span className="font-medium text-[#3D3733]">Ken Chapman</span>, Founder of ZebraThrive.
              {modified && (
                <>
                  {" "}Last updated <time dateTime={modified}>{formatDateLabel(modified)}</time>.
                </>
              )}
            </p>
          </header>

          {/* Definition */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">What is an excipient?</h2>
            <p className="text-base md:text-lg text-[#3D3733] leading-relaxed">{EXCIPIENT_DEFINITION}</p>
          </section>

          {/* The eight */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">
              The eight excipients ZebraThrive excludes
            </h2>
            <p className="text-base md:text-lg text-[#3D3733] leading-relaxed mb-8">
              These are the excipients our community reports reacting to most. Each entry says what the excipient does,
              why it is out, and what the formula uses instead.
            </p>
            <ul className="flex flex-wrap gap-2.5 mb-10" aria-label="Excluded excipients">
              {EXCLUDED_EXCIPIENTS.map((e) => (
                <li key={e.slug}>
                  <a
                    href={`#${e.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#B36B4D]/15 rounded-full text-sm font-bold text-[#0F2A22] hover:border-[#B36B4D]/40 transition-colors"
                  >
                    <Ban className="w-4 h-4 text-[#DC2626]" strokeWidth={2.5} aria-hidden="true" />
                    {e.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-10">
              {EXCLUDED_EXCIPIENTS.map((e) => (
                <section
                  key={e.slug}
                  id={e.slug}
                  className="scroll-mt-28 p-6 md:p-8 bg-white/70 border border-[#3D3733]/10 rounded-3xl"
                >
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#3D3733] mb-4">{e.question}</h3>
                  <dl className="space-y-4 text-base md:text-lg text-[#3D3733] leading-relaxed">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F5238] mb-1">What it is</dt>
                      <dd>{e.whatItIs}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F5238] mb-1">Why it is out</dt>
                      <dd>{e.whyExcluded}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F5238] mb-1">What ZebraThrive uses instead</dt>
                      <dd>
                        <strong className="font-semibold">{e.instead}</strong>
                      </dd>
                    </div>
                  </dl>
                  {e.links && e.links.length > 0 && (
                    <p className="mt-5 text-sm text-[#5D5752]">
                      Related:{" "}
                      {e.links.map((l, i) => (
                        <span key={l.href}>
                          {i > 0 && ", "}
                          <Link href={l.href} className="text-[#8F5238] font-medium underline-offset-4 hover:underline">
                            {l.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </section>

          {/* What is used */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">
              The excipients ZebraThrive does use
            </h2>
            <p className="text-base md:text-lg text-[#3D3733] leading-relaxed mb-6">
              Five, all listed on the label. Nothing is added for color, flavor, sweetness or shelf appearance.
            </p>
            <div tabIndex={0} role="region" aria-label="Excipients ZebraThrive uses" className="overflow-x-auto rounded-2xl border border-[#3D3733]/10 bg-white/70">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-[#0F2A22]/5">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold text-[#3D3733]">Role</th>
                    <th scope="col" className="px-5 py-4 font-bold text-[#3D3733]">Excipient</th>
                    <th scope="col" className="px-5 py-4 font-bold text-[#3D3733]">Where</th>
                  </tr>
                </thead>
                <tbody>
                  {USED_EXCIPIENTS.map((u) => (
                    <tr key={u.role + u.excipient} className="border-t border-[#3D3733]/10">
                      <td className="px-5 py-4 text-[#3D3733]">{u.role}</td>
                      <td className="px-5 py-4 text-[#3D3733]">
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#2D6B52]" aria-hidden="true" />
                          {u.excipient}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#5D5752]">{u.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Carriers */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">
              Carriers that arrive with the raw materials
            </h2>
            <p className="text-base md:text-lg text-[#3D3733] leading-relaxed mb-6">{CARRIERS_NOTE}</p>
            <div tabIndex={0} role="region" aria-label="Carriers that arrive with the raw materials" className="overflow-x-auto rounded-2xl border border-[#3D3733]/10 bg-white/70">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-[#0F2A22]/5">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold text-[#3D3733]">Carrier</th>
                    <th scope="col" className="px-5 py-4 font-bold text-[#3D3733]">Arrives with</th>
                    <th scope="col" className="px-5 py-4 font-bold text-[#3D3733]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {CARRIERS.map((c) => (
                    <tr key={c.carrier + c.arrivesWith} className="border-t border-[#3D3733]/10">
                      <td className="px-5 py-4 text-[#3D3733]">{c.carrier}</td>
                      <td className="px-5 py-4 text-[#3D3733]">
                        {c.href ? (
                          <Link href={c.href} className="text-[#8F5238] font-medium underline-offset-4 hover:underline">
                            {c.arrivesWith}
                          </Link>
                        ) : (
                          c.arrivesWith
                        )}
                      </td>
                      <td className="px-5 py-4 text-[#5D5752]">{c.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Label checks */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-4">
              How to check any supplement label for these excipients
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-base md:text-lg text-[#3D3733] leading-relaxed">
              {LABEL_CHECKS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ol>
          </section>

          {/* FAQ, always visible */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3D3733] mb-6">Common questions about excipients</h2>
            <div className="space-y-6">
              {EXCIPIENT_FAQ.map((f) => (
                <div key={f.q} className="p-6 bg-white/70 border border-[#3D3733]/10 rounded-2xl">
                  <h3 className="text-lg md:text-xl font-bold text-[#3D3733] mb-2">{f.q}</h3>
                  <p className="text-base md:text-lg text-[#3D3733] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related + CTA */}
          <section className="p-8 md:p-10 bg-[#0F2A22] text-[#EBE8E1] rounded-[2rem] shadow-xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold !text-[#EBE8E1] mb-3">
              Every active and every excipient, documented
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#EBE8E1]/85 mb-8">
              The ingredient pages list form, dose, evidence and the excipients to avoid for each active. The
              constitution page states what we commit to and what we will not claim.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/ingredients"
                className="inline-flex justify-center px-6 py-3 bg-[#8F5238] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#EBE8E1] hover:text-[#0F2A22] transition-colors"
              >
                Browse the ingredients
              </Link>
              <Link
                href="/our-promise"
                className="inline-flex justify-center px-6 py-3 border border-[#EBE8E1]/40 text-[#EBE8E1] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors"
              >
                Read the constitution
              </Link>
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
