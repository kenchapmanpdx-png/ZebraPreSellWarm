/**
 * Google Analytics 4 helper.
 *
 * The gtag.js snippet in client/index.html defines window.gtag. This is a
 * thin, typed wrapper so app code can fire events without touching the
 * global directly. No-op if gtag is unavailable (ad blocker, SSR/prerender)
 * and never throws.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 event, e.g. trackGa("generate_lead", { form: "hero" }). */
export function trackGa(event: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    if (params) window.gtag("event", event, params);
    else window.gtag("event", event);
  } catch {
    /* never let analytics break the UI */
  }
}
