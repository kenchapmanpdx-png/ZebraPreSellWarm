/* api/preorder.ts - Vercel serverless function
 *
 * The richer counterpart to /api/waitlist. Captures the full reservation
 * form: email + firstName + lastName + phone + conditions[] + current
 * supplements + hear-about-us.
 *
 * Two durable stores (either one is enough):
 *   1. Resend Contacts API (with rich properties) - primary list of record
 *   2. Drizzle/Neon DB - backup (full schema)
 * Durable -> 201, then a best-effort notification email to the site owner
 * (its result never changes the response). Not durable -> full payload
 * logged once + 503.
 *
 * Resend properties used: phone, conditions, current_supplements,
 *   hear_about_us, source='preorder_form'. If a property isn't defined
 *   on the Resend audience yet, we fall back to a contact create without
 *   properties so the email itself is still captured.
 *
 * Idempotency: if the email is already in Resend (e.g. they joined the
 * waitlist first, now upgrading to full preorder), we UPDATE the
 * existing contact with the richer data instead of failing.
 *
 * The Resend SDK does not throw on API errors; it resolves { data, error },
 * so `error` is checked explicitly.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { insertPreorderReservationSchema, preorderReservations } from "./_lib/schemas.js";
import { getDb } from "./_lib/db.js";
import {
  methodGuard,
  readJsonBody,
  validate,
  checkHoneypot,
  logUnsavedSubmission,
  describeError,
  isDuplicateContactError,
} from "./_lib/respond.js";
import { sendNotification, formatFields, footerLines, oneLine } from "./_lib/notify.js";

const SUCCESS = { status: 201, body: { message: "Preorder reservation created successfully" } } as const;
const FAILURE_MESSAGE =
  "Something went wrong saving your signup. Please try again, or email ken@wellnessforzebras.com.";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const parsed = readJsonBody(req);
  if (!parsed.ok) return res.status(parsed.status).json(parsed.payload);

  const v = validate(insertPreorderReservationSchema, parsed.body);
  if (!v.ok) return res.status(v.status).json(v.payload);
  const data = v.data;

  // Honeypot: identical response to a real success, no side effects.
  if (!checkHoneypot(parsed.body)) {
    return res.status(SUCCESS.status).json(SUCCESS.body);
  }

  // Build Resend properties payload - only fields that are present.
  const props: Record<string, string | number | null> = {
    source: "preorder_form",
  };
  if (data.phone) props.phone = data.phone;
  if (data.conditions && data.conditions.length) props.conditions = data.conditions.join(", ");
  if (data.currentSupplements) props.current_supplements = data.currentSupplements;
  if (data.hearAboutUs) props.hear_about_us = data.hearAboutUs;

  // Layer 1: Resend - create or update
  const resendKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_PREORDER_SEGMENT_ID; // optional
  let resendOk = false;
  let resendNote: string | undefined;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);

      // Build payload; cast through `as const` so TS picks the CreateContactOptions
      // overload (segments-based) instead of LegacyCreateContactOptions (audienceId).
      const createPayload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        unsubscribed: false,
        properties: props,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      } as const;

      const { error } = await resend.contacts.create(createPayload);
      if (!error) {
        resendOk = true;
      } else if (isDuplicateContactError(error)) {
        // Contact already exists (e.g. they joined waitlist first). Upgrade with richer data.
        const { error: uErr } = await resend.contacts.update({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          properties: props,
        });
        if (!uErr) {
          resendOk = true;
          resendNote = "Existing Resend contact updated with reservation details.";
        } else {
          // The address itself is already stored in Resend; only the richer
          // fields failed to update. Still durable for the email.
          resendOk = true;
          resendNote = "Already in Resend contacts, but updating its details FAILED. Copy the fields below manually.";
          console.error(`[preorder] resend update error: ${describeError(uErr)}`);
        }
      } else if (/propert/i.test(error.message || "")) {
        // Properties not defined on the audience yet - retry without them so the email is still captured.
        const { error: rErr } = await resend.contacts.create({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          unsubscribed: false,
          ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
        });
        if (!rErr) {
          resendOk = true;
          resendNote = "Saved to Resend WITHOUT properties (define them in the Resend dashboard). Details are only in this email.";
          console.warn(
            "[preorder] resend properties unavailable on audience; created basic contact. Define properties in Resend dashboard to capture them next time."
          );
        } else {
          console.error(`[preorder] resend retry error: ${describeError(rErr)}`);
        }
      } else {
        console.error(`[preorder] resend error: ${describeError(error)}`);
      }
    } catch (err) {
      console.error(`[preorder] resend threw: ${describeError(err)}`);
    }
  }

  // Layer 2: Drizzle/Neon DB (full schema backup). dbOk only after a successful insert.
  let dbOk = false;
  const db = getDb();
  if (db) {
    try {
      await db.insert(preorderReservations).values(data);
      dbOk = true;
    } catch (err) {
      console.error(`[preorder] db error: ${describeError(err)}`);
    }
  }

  if (!resendOk && !dbOk) {
    logUnsavedSubmission("preorder", data);
    return res.status(503).json({ message: FAILURE_MESSAGE });
  }

  console.log(`[preorder] saved (resend=${resendOk}, db=${dbOk})`);

  // Best effort: never changes the response.
  await sendNotification({
    kind: "preorder",
    subject: `New reservation from ${oneLine(data.firstName)}`,
    replyTo: data.email,
    text: [
      formatFields([
        ["First name", data.firstName],
        ["Last name", data.lastName],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Conditions", data.conditions && data.conditions.length ? data.conditions.join(", ") : undefined],
        ["Current supplements", data.currentSupplements],
        ["Heard about us", data.hearAboutUs],
      ]),
      "",
      "---",
      formatFields([
        ["Saved to", [resendOk && "Resend contacts", dbOk && "database"].filter(Boolean).join(", ")],
        ["Note", resendNote],
      ]),
      footerLines(),
    ].join("\n"),
  });

  return res.status(SUCCESS.status).json(SUCCESS.body);
}
