/* api/preorder.ts — Vercel serverless function
 *
 * The richer counterpart to /api/waitlist. Captures the full reservation
 * form: email + firstName + lastName + phone + conditions[] + current
 * supplements + hear-about-us.
 *
 * Three-layer email capture with graceful degradation:
 *   1. Resend Contacts API (with rich properties) — primary list of record
 *   2. Drizzle/Neon DB — backup (full schema)
 *   3. stdout log — last-resort recovery
 *
 * Resend properties used: phone, conditions, current_supplements,
 *   hear_about_us, source='preorder_form'. If a property isn't defined
 *   on the Resend audience yet, we fall back to a contact create without
 *   properties so the email itself is still captured.
 *
 * Idempotency: if the email is already in Resend (e.g. they joined the
 * waitlist first, now upgrading to full preorder), we UPDATE the
 * existing contact with the richer data instead of failing.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { insertPreorderReservationSchema, preorderReservations } from "./_lib/schemas.js";
import { getDb } from "./_lib/db.js";
import { methodGuard, validate, logSubmission } from "./_lib/respond.js";

const RESEND_KEY = process.env.RESEND_API_KEY;
const SEGMENT_ID = process.env.RESEND_PREORDER_SEGMENT_ID; // optional

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const v = validate(insertPreorderReservationSchema, req.body);
  if (!v.ok) return res.status(v.status).json(v.payload);
  const data = v.data;

  logSubmission("preorder", data);

  // Build Resend properties payload — only fields that are present.
  const props: Record<string, string | number | null> = {
    source: "preorder_form",
  };
  if (data.phone) props.phone = data.phone;
  if (data.conditions && data.conditions.length) props.conditions = data.conditions.join(", ");
  if (data.currentSupplements) props.current_supplements = data.currentSupplements;
  if (data.hearAboutUs) props.hear_about_us = data.hearAboutUs;

  // Layer 1: Resend — create or update
  let resendOk = false;
  if (RESEND_KEY) {
    const resend = new Resend(RESEND_KEY);

    const createPayload: Parameters<typeof resend.contacts.create>[0] = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      unsubscribed: false,
      properties: props,
      ...(SEGMENT_ID ? { segments: [{ id: SEGMENT_ID }] } : {}),
    };

    try {
      await resend.contacts.create(createPayload);
      resendOk = true;
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();

      if (msg.includes("already exists") || msg.includes("duplicate")) {
        // Contact already exists (e.g. they joined waitlist first). Upgrade with richer data.
        try {
          await resend.contacts.update({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            properties: props,
          });
          resendOk = true;
        } catch (uErr) {
          console.error("[preorder] resend update error:", uErr);
        }
      } else if (msg.includes("property") || msg.includes("properties")) {
        // Properties not defined on the audience yet — retry without them so the email is still captured.
        try {
          await resend.contacts.create({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            unsubscribed: false,
          });
          resendOk = true;
          console.warn(
            "[preorder] resend properties unavailable on audience; created basic contact. Define properties in Resend dashboard to capture them next time."
          );
        } catch (eRetry) {
          console.error("[preorder] resend retry error:", eRetry);
        }
      } else {
        console.error("[preorder] resend error:", err);
      }
    }
  }

  // Layer 2: Drizzle/Neon DB (full schema backup)
  const db = getDb();
  if (db) {
    try {
      await db.insert(preorderReservations).values(data).returning();
    } catch (err) {
      console.error("[preorder] db error:", err);
    }
  }

  if (resendOk || db) {
    return res.status(201).json({ message: "Preorder reservation created successfully" });
  }
  return res.status(202).json({ message: "Preorder reservation received" });
}
