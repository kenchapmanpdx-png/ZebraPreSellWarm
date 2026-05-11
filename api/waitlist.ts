/* api/waitlist.ts — Vercel serverless function
 *
 * Three-layer email capture (degrades gracefully if any layer is missing):
 *   1. Resend Contacts API (if RESEND_API_KEY is set) — primary list of record
 *   2. Drizzle/Neon DB (if DATABASE_URL is set) — local copy / backup
 *   3. stdout log (always) — last-resort recovery from Vercel function logs
 *
 * Returns 201 if Resend or DB write succeeded, 202 if only logged.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { insertWaitlistSubmissionSchema, waitlistSubmissions } from "../shared/schema";
import { getDb } from "./_lib/db";
import { methodGuard, validate, logSubmission } from "./_lib/respond";

const RESEND_KEY = process.env.RESEND_API_KEY;
const SEGMENT_ID = process.env.RESEND_WAITLIST_SEGMENT_ID; // optional — for tagging

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const v = validate(insertWaitlistSubmissionSchema, req.body);
  if (!v.ok) return res.status(v.status).json(v.payload);

  logSubmission("waitlist", v.data);

  // Layer 1: Resend (primary)
  let resendOk = false;
  if (RESEND_KEY) {
    try {
      const resend = new Resend(RESEND_KEY);
      await resend.contacts.create({
        email: v.data.email,
        unsubscribed: false,
        ...(SEGMENT_ID ? { segments: [{ id: SEGMENT_ID }] } : {}),
      });
      resendOk = true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // Already-exists is fine — don't treat as failure
      if (msg.toLowerCase().includes("already exists") || msg.toLowerCase().includes("duplicate")) {
        resendOk = true;
      } else {
        console.error("[waitlist] resend error:", err);
      }
    }
  }

  // Layer 2: Drizzle/Neon (backup)
  const db = getDb();
  if (db) {
    try {
      await db.insert(waitlistSubmissions).values(v.data).returning();
    } catch (err) {
      console.error("[waitlist] db error:", err);
    }
  }

  // If either Resend or DB worked, 201. Otherwise 202 (logged only).
  if (resendOk || db) {
    return res.status(201).json({ message: "Successfully joined the waitlist!" });
  }
  return res.status(202).json({ message: "Successfully joined the waitlist!" });
}
