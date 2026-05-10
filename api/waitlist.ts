/* api/waitlist.ts — Vercel serverless function */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertWaitlistSubmissionSchema, waitlistSubmissions } from "../shared/schema";
import { getDb } from "./_lib/db";
import { methodGuard, validate, logSubmission } from "./_lib/respond";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const v = validate(insertWaitlistSubmissionSchema, req.body);
  if (!v.ok) return res.status(v.status).json(v.payload);

  logSubmission("waitlist", v.data);

  const db = getDb();
  if (db) {
    try {
      const [row] = await db.insert(waitlistSubmissions).values(v.data).returning();
      return res.status(201).json({ message: "Successfully joined the waitlist!", data: row });
    } catch (err) {
      console.error("[waitlist] db error:", err);
      // Fall through to 202 — we already logged it
    }
  }
  return res.status(202).json({ message: "Successfully joined the waitlist!" });
}
