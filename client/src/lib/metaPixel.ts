/**
 * Meta (Facebook) Pixel helper.
 *
 * The base pixel is loaded in client/index.html (Pixel ID 334231342457223),
 * which defines window.fbq and fires the initial PageView. This module is a
 * thin, typed wrapper so app code can fire conversion events without touching
 * the global directly. All calls are no-ops if fbq is unavailable (e.g. blocked
 * by an ad blocker or during SSR/prerender).
 */

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a Meta standard event (e.g. "Lead", "Contact"). */
export function track(event: string, params?: FbqParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    if (params) window.fbq("track", event, params);
    else window.fbq("track", event);
  } catch {
    /* never let analytics break the UI */
  }
}

/** Convenience: fire the standard "Lead" conversion event. */
export function trackLead(params?: FbqParams): void {
  track("Lead", params);
}
