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
