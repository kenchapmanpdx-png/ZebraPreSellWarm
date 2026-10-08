/* Analytics bootstrap, loaded from <head> in client/index.html.
 * Kept in a file (not inline) so the Content-Security-Policy in vercel.json
 * can block inline scripts. Disclosed in the Privacy Policy (/privacy).
 */
/* Meta Pixel (ID 334231342457223) */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '334231342457223');
fbq('track', 'PageView');

/* Google Analytics 4 (G-DVEJ68587X); gtag.js itself loads async from index.html */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-DVEJ68587X');
