/* api/_lib/respond.ts
 * Shared helpers for serverless function responses + CORS.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fromZodError } from "zod-validation-error";
import type { ZodSchema } from "zod";

export function setCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}


/**
 * Honeypot bot check.
 *
 * Frontend forms include a hidden input named `website` (or whatever the
 * convention is below). Real users leave it empty. Bots that auto-fill all
 * inputs by name fill it in. If the body has a non-empty honeypot, we accept
 * the request (return 200 to keep the bot happy) but skip ALL downstream
 * processing — no Resend write, no DB write, no log line.
 *
 * Returns true if the request looks human and should proceed.
 */
export function checkHoneypot(body: unknown): boolean {
  if (!body || typeof body !== "object") return true;
  const b = body as Record<string, unknown>;
  // Honeypot fields — keep multiple names so bots have nothing to filter on
  const trap = b.website || b.url || b.company_url || b.fax;
  if (typeof trap === "string" && trap.trim().length > 0) return false;
  return true;
}

export function methodGuard(req: VercelRequest, res: VercelResponse, allowed: string[]) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return false;
  }
  if (!allowed.includes(req.method || "")) {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return false;
  }
  return true;
}

export function validate<T>(schema: ZodSchema<T>, body: unknown):
  | { ok: true; data: T }
  | { ok: false; status: number; payload: unknown } {
  const result = schema.safeParse(body);
  if (!result.success) {
    const err = fromZodError(result.error);
    return { ok: false, status: 400, payload: { message: "Validation failed", errors: err.details } };
  }
  return { ok: true, data: result.data };
}

export function logSubmission(kind: string, payload: unknown) {
  // Vercel captures stdout. Log so the submission isn't lost even when DB is down.
  console.log(`[${kind}]`, JSON.stringify(payload));
}
