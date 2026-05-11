/* api/request-sample.ts — Vercel serverless function */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertSampleRequestSchema, sampleRequests } from "./_lib/schemas.js";
import { getDb } from "./_lib/db.js";
import { methodGuard, validate, logSubmission } from "./_lib/respond.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const v = validate(insertSampleRequestSchema, req.body);
  if (!v.ok) return res.status(v.status).json(v.payload);

  logSubmission("sample_request", v.data);

  const db = getDb();
  if (db) {
    try {
      const [row] = await db.insert(sampleRequests).values(v.data).returning();
      return res.status(201).json({ message: "Sample request submitted successfully", data: row });
    } catch (err) {
      console.error("[sample] db error:", err);
    }
  }
  return res.status(202).json({ message: "Sample request received" });
}
