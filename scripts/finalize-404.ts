/* scripts/finalize-404.ts
 *
 * Postbuild: vite-prerender-plugin writes the "/404" route to
 * dist/public/404/index.html. Vercel serves dist/public/404.html, with
 * HTTP status 404, for any URL that matches no file. Move it there and
 * remove the directory so /404 itself is not a 200 page.
 */
import { existsSync, renameSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve("dist/public");
const candidates = [resolve(out, "404/index.html"), resolve(out, "404.html")];
const src = candidates.find((p) => existsSync(p));
if (!src) {
  console.error("[404] no prerendered 404 page found; expected dist/public/404/index.html");
  process.exit(1);
}
if (src !== resolve(out, "404.html")) {
  renameSync(src, resolve(out, "404.html"));
  rmSync(resolve(out, "404"), { recursive: true, force: true });
}
console.log("[404] dist/public/404.html ready");
