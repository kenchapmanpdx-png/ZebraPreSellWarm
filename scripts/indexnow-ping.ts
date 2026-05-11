/* scripts/indexnow-ping.ts
 *
 * IndexNow post-deploy ping: tells Bing + Yandex + Seznam that pages have
 * been updated so they recrawl within seconds instead of waiting for their
 * normal scheduler.
 *
 * Triggered as a postbuild step. Submits every prerendered URL plus the
 * llms/sitemap surfaces. The API is idempotent so over-submitting is fine.
 *
 * Why: ChatGPT pulls citations from Bing's index. Bing's standard recrawl
 * cadence is hours-to-days. IndexNow collapses that to seconds for the
 * pages we explicitly nominate.
 *
 * Set INDEXNOW_DISABLED=1 in the build env to skip (useful for local dev).
 */
import ingredientList from "./ingredient-routes.json" with { type: "json" };

const HOST = "www.wellnessforzebras.com";
const BASE = `https://${HOST}`;
const KEY = "d0b65122f396b055143aa1e3e3a6a6ba";
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

const CORE_ROUTES = [
  "/",
  "/the-how",
  "/ingredients",
  "/our-promise",
  "/preorder",
  "/privacy",
  "/terms",
  "/shipping",
  "/contact",
];

const MD_ROUTES = [
  "/llms.txt",
  "/llms-full.txt",
  "/llms-routes.txt",
  "/ingredients.md",
  "/the-how.md",
  "/our-promise.md",
  "/preorder.md",
  "/contact.md",
];

async function main() {
  if (process.env.INDEXNOW_DISABLED === "1") {
    console.log("[indexnow] disabled via INDEXNOW_DISABLED=1, skipping");
    return;
  }
  // Only ping from Vercel production builds. Local + preview deploys skip.
  // Vercel exposes VERCEL_ENV. Outside Vercel the var is unset.
  const env = process.env.VERCEL_ENV;
  if (env !== "production") {
    console.log(`[indexnow] skipping ping (VERCEL_ENV=${env ?? "unset"}; production-only)`);
    return;
  }

  const urls: string[] = [];
  for (const r of CORE_ROUTES) urls.push(`${BASE}${r}`);
  for (const i of ingredientList as Array<{ slug: string }>) {
    urls.push(`${BASE}/ingredients/${i.slug}`);
    urls.push(`${BASE}/ingredients/${i.slug}.md`);
  }
  for (const r of MD_ROUTES) urls.push(`${BASE}${r}`);

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    console.log(`[indexnow] submitted ${urls.length} URLs; status ${res.status} ${res.statusText}`);
    // 200 = accepted, 202 = accepted (async), 400 = bad request, 403 = key mismatch, 422 = url not in host
    if (!res.ok) {
      const text = await res.text();
      console.warn(`[indexnow] response body: ${text.slice(0, 500)}`);
    }
  } catch (err) {
    console.warn(`[indexnow] ping failed (non-fatal): ${(err as Error).message}`);
  }
}

main();
