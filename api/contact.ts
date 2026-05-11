/* api/contact.ts - Vercel serverless function */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertContactSubmissionSchema, contactSubmissions } from "./_lib/schemas.js";
import { getDb } from "./_lib/db.js";
import { methodGuard, validate, logSubmission, checkHoneypot } from "./_lib/respond.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  // Silent honeypot drop - bots filled the trap field; respond OK with no side effects
  if (!checkHoneypot(req.body)) {
    return res.status(200).json({ message: "OK" });
  }

  const v = validate(insertContactSubmissionSchema, req.body);
  if (!v.ok) return res.status(v.status).json(v.payload);

  logSubmission("contact", v.data);

  const db = getDb();
  if (db) {
    try {
      const [row] = await db.insert(contactSubmissions).values(v.data).returning();
      return res.status(201).json({ message: "Contact form submitted successfully", data: row });
    } catch (err) {
      console.error("[contact] db error:", err);
    }
  }
  return res.status(202).json({ message: "Message received" });
}
