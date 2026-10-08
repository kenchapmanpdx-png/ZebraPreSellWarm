/* api/contact.ts - Vercel serverless function
 *
 * Contact form. Durable if EITHER the notification email to the site owner
 * was accepted by Resend OR the Drizzle/Neon insert succeeded:
 *   durable     -> 201 { message: "Message received" }
 *   not durable -> full payload logged once (last-resort record) + 503
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertContactSubmissionSchema, contactSubmissions } from "./_lib/schemas.js";
import { getDb } from "./_lib/db.js";
import {
  methodGuard,
  readJsonBody,
  validate,
  checkHoneypot,
  logUnsavedSubmission,
  describeError,
} from "./_lib/respond.js";
import { sendNotification, formatFields, footerLines, oneLine } from "./_lib/notify.js";

const SUCCESS = { status: 201, body: { message: "Message received" } } as const;
const FAILURE_MESSAGE =
  "We could not deliver your message. Please email ken@wellnessforzebras.com directly.";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const parsed = readJsonBody(req);
  if (!parsed.ok) return res.status(parsed.status).json(parsed.payload);

  const v = validate(insertContactSubmissionSchema, parsed.body);
  if (!v.ok) return res.status(v.status).json(v.payload);
  const data = v.data;

  // Honeypot: identical response to a real success, no side effects.
  if (!checkHoneypot(parsed.body)) {
    return res.status(SUCCESS.status).json(SUCCESS.body);
  }

  const emailPromise = sendNotification({
    kind: "contact",
    subject: `New contact message from ${oneLine(data.name)}`,
    replyTo: data.email,
    text: [
      formatFields([
        ["Name", data.name],
        ["Email", data.email],
      ]),
      "",
      "Message:",
      data.message,
      "",
      "---",
      footerLines(),
    ].join("\n"),
  });

  const dbPromise = (async () => {
    const db = getDb();
    if (!db) return false;
    try {
      await db.insert(contactSubmissions).values(data);
      return true;
    } catch (err) {
      console.error(`[contact] db error: ${describeError(err)}`);
      return false;
    }
  })();

  const [emailOk, dbOk] = await Promise.all([emailPromise, dbPromise]);

  if (emailOk || dbOk) {
    console.log(`[contact] saved (email=${emailOk}, db=${dbOk})`);
    return res.status(SUCCESS.status).json(SUCCESS.body);
  }

  logUnsavedSubmission("contact", data);
  return res.status(503).json({ message: FAILURE_MESSAGE });
}
