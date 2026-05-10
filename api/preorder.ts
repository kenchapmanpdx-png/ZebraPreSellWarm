/* api/preorder.ts — Vercel serverless function */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertPreorderReservationSchema, preorderReservations } from "../shared/schema";
import { getDb } from "./_lib/db";
import { methodGuard, validate, logSubmission } from "./_lib/respond";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const v = validate(insertPreorderReservationSchema, req.body);
  if (!v.ok) return res.status(v.status).json(v.payload);

  logSubmission("preorder", v.data);

  const db = getDb();
  if (db) {
    try {
      const [row] = await db.insert(preorderReservations).values(v.data).returning();
      return res.status(201).json({ message: "Preorder reservation created successfully", data: row });
    } catch (err) {
      console.error("[preorder] db error:", err);
    }
  }
  return res.status(202).json({ message: "Preorder reservation received" });
}
