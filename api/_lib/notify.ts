/* api/_lib/notify.ts
 *
 * Plain-text notification email to the site owner via Resend.
 *
 * Env:
 *   RESEND_API_KEY  required to send at all
 *   NOTIFY_TO       recipient (default ken@wellnessforzebras.com)
 *   NOTIFY_FROM     sender (default "ZebraThrive Site <notifications@wellnessforzebras.com>")
 *
 * If the first send fails (e.g. the wellnessforzebras.com sending domain is
 * not verified yet) it retries ONCE from Resend's test sender
 * onboarding@resend.dev to the same recipient. Note: Resend only delivers
 * test-sender mail to the address that owns the Resend account, so the
 * fallback only helps when NOTIFY_TO is that address.
 *
 * Never throws. Returns true only if a send succeeded. Logs a short error
 * (no payload) on failure.
 */
import { Resend } from "resend";
import { describeError } from "./respond.js";

const DEFAULT_TO = "ken@wellnessforzebras.com";
const DEFAULT_FROM = "ZebraThrive Site <notifications@wellnessforzebras.com>";
const FALLBACK_FROM = "ZebraThrive Site <onboarding@resend.dev>";

export interface NotificationInput {
  /** Short tag for log lines, e.g. "contact". */
  kind: string;
  subject: string;
  text: string;
  replyTo?: string;
}

/** Strip line breaks and cap length so user input is safe in a subject line. */
export function oneLine(value: string, max = 80): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, max);
}

/** Render "Label: value" lines, skipping empty values. */
export function formatFields(fields: Array<[string, string | undefined | null]>): string {
  return fields
    .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

/** Common footer lines for every notification. */
export function footerLines(): string {
  return formatFields([
    ["Received", new Date().toISOString()],
    ["Environment", process.env.VERCEL_ENV || "unknown"],
  ]);
}

export async function sendNotification(input: NotificationInput): Promise<boolean> {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error(`[notify:${input.kind}] skipped: RESEND_API_KEY not set`);
      return false;
    }
    const resend = new Resend(key);
    const to = process.env.NOTIFY_TO || DEFAULT_TO;
    const primaryFrom = process.env.NOTIFY_FROM || DEFAULT_FROM;
    const senders = primaryFrom === FALLBACK_FROM ? [primaryFrom] : [primaryFrom, FALLBACK_FROM];

    for (let i = 0; i < senders.length; i++) {
      const from = senders[i];
      try {
        const { error } = await resend.emails.send({
          from,
          to,
          subject: oneLine(input.subject, 120),
          text: input.text,
          ...(input.replyTo ? { replyTo: input.replyTo } : {}),
        });
        if (!error) {
          if (i > 0) console.warn(`[notify:${input.kind}] sent via fallback sender`);
          return true;
        }
        console.error(`[notify:${input.kind}] send failed (attempt ${i + 1}): ${describeError(error)}`);
      } catch (err) {
        console.error(`[notify:${input.kind}] send threw (attempt ${i + 1}): ${describeError(err)}`);
      }
    }
    return false;
  } catch (err) {
    console.error(`[notify:${input.kind}] unexpected error: ${describeError(err)}`);
    return false;
  }
}
