/* api/waitlist.ts - Vercel serverless function
 *
 * Email capture, two durable stores (either one is enough):
 *   1. Resend Contacts API (if RESEND_API_KEY is set) - primary list of record
 *   2. Drizzle/Neon DB (if DATABASE_URL is set) - backup
 *
 * Durable (Resend or DB write actually succeeded) -> 201, then a best-effort
 * notification email to the site owner (its result never changes the
 * response). Not durable -> full payload logged once + 503.
 *
 * The Resend SDK does not throw on API errors; it resolves { data, error },
 * so `error` is checked explicitly.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { insertWaitlistSubmissionSchema, waitlistSubmissions } from "./_lib/schemas.js";
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
import { sendNotification, formatFields, footerLines } from "./_lib/notify.js";

const SUCCESS = { status: 201, body: { message: "Successfully joined the waitlist!" } } as const;
const FAILURE_MESSAGE =
  "Something went wrong saving your signup. Please try again, or email ken@wellnessforzebras.com.";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const parsed = readJsonBody(req);
  if (!parsed.ok) return res.status(parsed.status).json(parsed.payload);

  const v = validate(insertWaitlistSubmissionSchema, parsed.body);
  if (!v.ok) return res.status(v.status).json(v.payload);
  const data = v.data;

  // Honeypot: identical response to a real success, no side effects.
  if (!checkHoneypot(parsed.body)) {
    return res.status(SUCCESS.status).json(SUCCESS.body);
  }

  // Layer 1: Resend (primary)
  const resendKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID; // optional - for tagging
  let resendOk = false;
  let alreadyOnList = false;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.contacts.create({
        email: data.email,
        unsubscribed: false,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      });
      if (!error) {
        resendOk = true;
      } else if (isDuplicateContactError(error)) {
        // Already on the list - the address is stored, treat as success.
        resendOk = true;
        alreadyOnList = true;
      } else {
        console.error(`[waitlist] resend error: ${describeError(error)}`);
      }
    } catch (err) {
      console.error(`[waitlist] resend threw: ${describeError(err)}`);
    }
  }

  // Layer 2: Drizzle/Neon (backup). dbOk only after a successful insert.
  let dbOk = false;
  const db = getDb();
  if (db) {
    try {
      await db.insert(waitlistSubmissions).values(data);
      dbOk = true;
    } catch (err) {
      console.error(`[waitlist] db error: ${describeError(err)}`);
    }
  }

  if (!resendOk && !dbOk) {
    logUnsavedSubmission("waitlist", data);
    return res.status(503).json({ message: FAILURE_MESSAGE });
  }

  console.log(`[waitlist] saved (resend=${resendOk}, db=${dbOk})`);

  // Best effort: never changes the response.
  await sendNotification({
    kind: "waitlist",
    subject: "New waitlist signup",
    replyTo: data.email,
    text: [
      formatFields([
        ["Email", data.email],
        ["Note", alreadyOnList ? "This address was already in the Resend contacts list." : undefined],
        ["Saved to", [resendOk && "Resend contacts", dbOk && "database"].filter(Boolean).join(", ")],
      ]),
      "",
      "---",
      footerLines(),
    ].join("\n"),
  });

  return res.status(SUCCESS.status).json(SUCCESS.body);
}
