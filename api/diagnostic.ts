/* api/diagnostic.ts
 *
 * Lightweight probe to surface what's reachable from a serverless function.
 * Hit GET /api/diagnostic to see:
 *   - which environment variables are present (just names, never values)
 *   - which dependency modules import successfully
 *   - which local relative modules import successfully
 *
 * Use this to triage ERR_MODULE_NOT_FOUND and similar runtime errors.
 * Remove or noindex once stable.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const envPresence = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_WAITLIST_SEGMENT_ID: !!process.env.RESEND_WAITLIST_SEGMENT_ID,
    RESEND_PREORDER_SEGMENT_ID: !!process.env.RESEND_PREORDER_SEGMENT_ID,
    DATABASE_URL: !!process.env.DATABASE_URL,
    NODE_VERSION: process.version,
  };

  const probes: Record<string, string> = {};

  const tryImport = async (name: string, importer: () => Promise<unknown>) => {
    try {
      const mod = await importer();
      probes[name] = `OK (exports: ${Object.keys((mod ?? {}) as object).slice(0, 5).join(", ")})`;
    } catch (e: unknown) {
      const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      probes[name] = `FAIL — ${msg}`;
    }
  };

  await tryImport("resend", () => import("resend"));
  await tryImport("@neondatabase/serverless", () => import("@neondatabase/serverless"));
  await tryImport("drizzle-orm/neon-http", () => import("drizzle-orm/neon-http"));
  await tryImport("drizzle-zod", () => import("drizzle-zod"));
  await tryImport("zod", () => import("zod"));
  await tryImport("zod-validation-error", () => import("zod-validation-error"));
  await tryImport("./_lib/schemas.js", () => import("./_lib/schemas.js"));
  await tryImport("./_lib/respond.js", () => import("./_lib/respond.js"));
  await tryImport("./_lib/db.js", () => import("./_lib/db.js"));
  await tryImport("./_lib/schemas (no ext)", () => import("./_lib/schemas"));
  await tryImport("./_lib/respond (no ext)", () => import("./_lib/respond"));

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    timestamp: new Date().toISOString(),
    env: envPresence,
    moduleProbes: probes,
  });
}
