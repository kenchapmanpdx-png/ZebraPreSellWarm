/* api/_lib/respond.ts
 * Shared helpers for serverless function responses, CORS / origin checks,
 * body parsing, validation and safe logging.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fromZodError } from "zod-validation-error";
import type { ZodSchema } from "zod";

/** Max size of the parsed JSON body, in characters. */
export const MAX_BODY_CHARS = 20_000;

const ALLOWED_ORIGINS = new Set<string>([
  "https://www.wellnessforzebras.com",
  "https://wellnessforzebras.com",
  "http://localhost:5173",
  "http://localhost:5000",
]);

/** Vercel preview deployments of this project. */
const PREVIEW_ORIGIN_RE = /^https:\/\/zebra-pre-sell-warm-[a-z0-9-]+\.vercel\.app$/;

export function isAllowedOrigin(origin: string | undefined): origin is string {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin) || PREVIEW_ORIGIN_RE.test(origin);
}

function getOrigin(req: VercelRequest): string | undefined {
  const raw = req.headers?.origin;
  if (Array.isArray(raw)) return raw[0];
  return typeof raw === "string" ? raw : undefined;
}

/**
 * Sets CORS headers for an allowed origin (echoing it back) and always adds
 * `Vary: Origin` so caches never serve one origin's headers to another.
 * Returns the origin if it is on the allowlist, otherwise undefined.
 */
export function setCors(req: VercelRequest, res: VercelResponse): string | undefined {
  res.setHeader("Vary", "Origin");
  const origin = getOrigin(req);
  if (!isAllowedOrigin(origin)) return undefined;
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "600");
  return origin;
}

/**
 * Honeypot bot check.
 *
 * Frontend forms include a hidden input named `website`. Real users leave it
 * empty. Bots that auto-fill all inputs by name fill it in. If the body has a
 * non-empty honeypot, the handler returns the exact same status and body as a
 * real success, but skips ALL downstream processing (no Resend write, no DB
 * write, no notification, no log line).
 *
 * Returns true if the request looks human and should proceed.
 */
export function checkHoneypot(body: unknown): boolean {
  if (!body || typeof body !== "object") return true;
  const b = body as Record<string, unknown>;
  // Honeypot fields - keep multiple names so bots have nothing to filter on
  const trap = b.website || b.url || b.company_url || b.fax;
  if (typeof trap === "string" && trap.trim().length > 0) return false;
  return true;
}

/**
 * Method + origin guard. Order:
 *   OPTIONS -> 204 for an allowed origin, 403 otherwise
 *   method not in `allowed` -> 405
 *   POST without an allowlisted Origin header -> 403
 * Returns true if the handler should continue.
 */
export function methodGuard(req: VercelRequest, res: VercelResponse, allowed: string[]) {
  const origin = setCors(req, res);
  if (req.method === "OPTIONS") {
    if (origin) res.status(204).end();
    else res.status(403).json({ message: "Forbidden" });
    return false;
  }
  if (!allowed.includes(req.method || "")) {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return false;
  }
  if (req.method === "POST" && !origin) {
    res.status(403).json({ message: "Forbidden" });
    return false;
  }
  return true;
}

/**
 * Safely reads the request body. Vercel's body getter throws on malformed
 * JSON, returns a string for text/plain, a Buffer for octet-stream and
 * undefined when there is no content type. Anything other than a plain JSON
 * object is rejected with 400; anything over MAX_BODY_CHARS with 413.
 */
export function readJsonBody(
  req: VercelRequest,
): { ok: true; body: Record<string, unknown> } | { ok: false; status: number; payload: { message: string } } {
  const invalid = { ok: false as const, status: 400, payload: { message: "Invalid request" } };
  let body: unknown;
  try {
    body = req.body;
  } catch {
    return invalid;
  }
  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    (typeof Buffer !== "undefined" && Buffer.isBuffer(body))
  ) {
    return invalid;
  }
  let size: number;
  try {
    size = JSON.stringify(body).length;
  } catch {
    return invalid;
  }
  if (size > MAX_BODY_CHARS) {
    return { ok: false, status: 413, payload: { message: "Request too large" } };
  }
  return { ok: true, body: body as Record<string, unknown> };
}

export function validate<T>(schema: ZodSchema<T>, body: unknown):
  | { ok: true; data: T }
  | { ok: false; status: number; payload: unknown } {
  const result = schema.safeParse(body);
  if (!result.success) {
    const err = fromZodError(result.error);
    const first = result.error.issues[0]?.message;
    const message = first && first !== "Required" ? first : "Please check the form and try again.";
    return { ok: false, status: 400, payload: { message, errors: err.details } };
  }
  return { ok: true, data: result.data };
}

/**
 * Last-resort record: log the full payload ONCE, only when nothing durable
 * (Resend, DB, notification email) succeeded. Vercel captures stdout.
 */
export function logUnsavedSubmission(kind: string, payload: unknown) {
  console.error(`[${kind}] NOT SAVED - last-resort record:`, JSON.stringify(payload));
}

/**
 * Short, PII-free description of an error for logs. Email addresses are
 * masked and the text is capped so no submitted payload leaks into logs.
 */
export function describeError(err: unknown): string {
  let text: string;
  if (err && typeof err === "object") {
    const e = err as { name?: unknown; statusCode?: unknown; message?: unknown };
    const parts = [e.name, e.statusCode, e.message].filter(
      (p) => typeof p === "string" || typeof p === "number",
    );
    text = parts.length ? parts.join(" ") : String(err);
  } else {
    text = String(err);
  }
  return text.replace(/[^\s@<>"',;:]+@[^\s@<>"',;:]+/g, "[email]").slice(0, 200);
}

/** True when a Resend error means the contact is already on the list. */
export function isDuplicateContactError(err: { message?: string; statusCode?: number | null } | null): boolean {
  if (!err) return false;
  if (err.statusCode === 409) return true;
  const msg = (err.message || "").toLowerCase();
  return msg.includes("already exist") || msg.includes("duplicate");
}
