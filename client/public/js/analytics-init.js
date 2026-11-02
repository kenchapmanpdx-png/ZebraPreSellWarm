/* Analytics bootstrap, loaded (defer) from <head> in client/index.html.
 * Kept in a file (not inline) so the Content-Security-Policy in vercel.json
 * can block inline scripts. Disclosed in the Privacy Policy (/privacy).
 *
 * The fbq and gtag stubs are defined immediately so app code can queue
 * events at any time. The vendor libraries (fbevents.js, gtag.js) are
 * injected after window load so they do not compete with first render
 * (Lighthouse 2026-11-01: they were the largest third-party main-thread cost).
 * Queued calls replay when each library loads.
 */
(function (w, d) {
  /* Meta Pixel (ID 334231342457223): stub + queue */
  if (!w.fbq) {
    var n = (w.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
  }
  w.fbq("init", "334231342457223");
  w.fbq("track", "PageView");

  /* Google Analytics 4 (G-DVEJ68587X): stub + queue */
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = gtag;
  gtag("js", new Date());
  gtag("config", "G-DVEJ68587X");

  function inject(src) {
    var s = d.createElement("script");
    s.async = true;
    s.src = src;
    d.head.appendChild(s);
  }
  function loadVendors() {
    inject("https://www.googletagmanager.com/gtag/js?id=G-DVEJ68587X");
    inject("https://connect.facebook.net/en_US/fbevents.js");
  }
  function schedule() {
    if ("requestIdleCallback" in w) w.requestIdleCallback(loadVendors, { timeout: 3000 });
    else w.setTimeout(loadVendors, 1);
  }
  if (d.readyState === "complete") schedule();
  else w.addEventListener("load", schedule, { once: true });
})(window, document);
