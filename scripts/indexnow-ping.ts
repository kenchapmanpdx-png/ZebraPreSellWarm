/* scripts/indexnow-ping.ts
 *
 * IndexNow post-build ping (Bing, Yandex, Seznam, Naver, Yep, Amazon share
 * one endpoint). Google does not participate.
 *
 * Submits ONLY URLs that are new or whose sitemap <lastmod> changed, found
 * by diffing the sitemap just built (dist/public/sitemap.xml) against the
 * sitemap currently live on production. IndexNow is for added, updated, or
 * deleted URLs; re-submitting unchanged pages on every deploy is noise
 * (2026-11-01 audit G17). Dates come from client/src/data/pageDates.ts.
 *
 * llms*.txt and .md companions are not submitted: they are served noindex.
 *
 * Runs only on Vercel production builds. Set INDEXNOW_DISABLED=1 to skip.
 * Set INDEXNOW_FORCE_ALL=1 to submit every sitemap URL once (e.g. after a
 * site-wide change the dates do not capture).
 *
 * Timing caveat: this runs at build time, a minute or so before Vercel
 * promotes the new deployment. Engines fetch on their own schedule, normally
 * well after that.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const HOST = "www.wellnessforzebras.com";
const BASE = `https://${HOST}`;
const KEY = "d0b65122f396b055143aa1e3e3a6a6ba";
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

function parseSitemap(xml: string): Map<string, string> {
  const out = new Map<string, string>();
  const re = /<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]*)<\/lastmod>)?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.set(m[1].trim(), (m[2] || "").trim());
  return out;
}

async function main() {
  if (process.env.INDEXNOW_DISABLED === "1") {
    console.log("[indexnow] disabled via INDEXNOW_DISABLED=1, skipping");
    return;
  }
  const env = process.env.VERCEL_ENV;
  if (env !== "production") {
    console.log(`[indexnow] skipping ping (VERCEL_ENV=${env ?? "unset"}; production-only)`);
    return;
  }

  const built = parseSitemap(readFileSync(resolve("dist/public/sitemap.xml"), "utf8"));

  let live = new Map<string, string>();
  let liveOk = false;
  try {
    const res = await fetch(`${BASE}/sitemap.xml`, { headers: { "cache-control": "no-cache" } });
    if (res.ok) {
      live = parseSitemap(await res.text());
      liveOk = live.size > 0;
    }
  } catch (err) {
    console.warn(`[indexnow] could not fetch live sitemap: ${(err as Error).message}`);
  }

  let urls: string[];
  if (process.env.INDEXNOW_FORCE_ALL === "1") {
    urls = [...built.keys()];
  } else if (!liveOk) {
    // Without a baseline we cannot tell what changed; skip rather than spam.
    console.warn("[indexnow] no live sitemap baseline; skipping (set INDEXNOW_FORCE_ALL=1 to submit all)");
    return;
  } else {
    urls = [...built.entries()]
      .filter(([loc, lastmod]) => live.get(loc) !== lastmod)
      .map(([loc]) => loc);
    // URLs dropped from the sitemap (removed or redirected pages).
    for (const loc of live.keys()) if (!built.has(loc)) urls.push(loc);
  }

  if (urls.length === 0) {
    console.log("[indexnow] no changed URLs; nothing to submit");
    return;
  }

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    console.log(`[indexnow] submitted ${urls.length} changed URLs; status ${res.status} ${res.statusText}`);
    // 200/202 accepted, 400 bad request, 403 key mismatch, 422 URL not in host
    if (!res.ok) {
      const text = await res.text();
      console.warn(`[indexnow] response body: ${text.slice(0, 500)}`);
    }
  } catch (err) {
    console.warn(`[indexnow] ping failed (non-fatal): ${(err as Error).message}`);
  }
}

main();
