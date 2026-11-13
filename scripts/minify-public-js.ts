/* scripts/minify-public-js.ts
 *
 * Postbuild: minify the hand-written scripts that Vite copies verbatim from
 * client/public/js/ to dist/public/js/. Vite does not process the public
 * directory, so those files shipped with their comments and whitespace
 * (Semrush Site Audit 2026-11-13: "Unminified JavaScript" on every page).
 *
 * The commented source stays in client/public/js/. Only the build output is
 * rewritten. File names and URLs do not change, so the script-src CSP in
 * vercel.json and the <script> tag in client/index.html are unaffected.
 *
 * Cosmetic step: on any error the original file is left in place and the
 * build continues.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { transform } from "esbuild";

const dir = resolve("dist/public/js");

async function main() {
  if (!existsSync(dir)) {
    console.log("[minify] dist/public/js not found, nothing to do");
    return;
  }
  const files = readdirSync(dir).filter((f) => f.endsWith(".js"));
  for (const f of files) {
    const p = resolve(dir, f);
    const src = readFileSync(p, "utf8");
    try {
      const { code } = await transform(src, {
        minify: true,
        loader: "js",
        target: "es2017",
        legalComments: "none",
      });
      writeFileSync(p, code);
      console.log(`[minify] js/${f}: ${src.length} -> ${code.length} bytes`);
    } catch (e) {
      console.warn(`[minify] js/${f}: left unminified (${(e as Error).message})`);
    }
  }
}

main();
