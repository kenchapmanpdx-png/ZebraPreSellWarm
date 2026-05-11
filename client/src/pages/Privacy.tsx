import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto prose-headings:font-serif">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#5D5752] mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-8 text-[#3D3733] leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">What we collect</h2>
              <p>When you join our waitlist or submit a reservation form, we collect the email address you provide. The full reservation form additionally collects name, optional phone number, the conditions you self-identify with (EDS, POTS, MCAS, etc.), and how you heard about us. We do not collect health information, diagnoses, or any data we don't explicitly ask for on a form.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">How we use it</h2>
              <p>We use your email solely to notify you about ZebraWell - product availability, formulation updates, and shipping news. We never sell, rent, or share your information with third parties for marketing purposes.</p>
              <p className="mt-3">Form submissions are stored with Resend (our email service provider) and may be analyzed in aggregate to understand audience needs. Names, phone numbers, and condition selections are visible only to ZebraWell staff for product planning.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Analytics</h2>
              <p>We use Vercel Analytics, Vercel Speed Insights, and Ahrefs Web Analytics to understand how visitors find and use the site. These tools do not collect personally identifiable information by default; they use anonymous, aggregated data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Cookies</h2>
              <p>We use a small amount of local storage to remember your preferences (such as showcase visibility toggles for internal review pages). No tracking cookies are set on this site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Your rights</h2>
              <p>You can unsubscribe from any email we send via the unsubscribe link in the email. You can request that we delete your personal information at any time by emailing <a href="mailto:ken@wellnessforzebras.com" className="text-[#B36B4D] hover:underline">ken@wellnessforzebras.com</a>. We will confirm and complete the deletion within 30 days.</p>
              <p className="mt-3">Residents of California, Colorado, Virginia, and the EU have additional rights under CCPA, CPA, CDPA, and GDPR respectively. These include the right to know what data we hold, the right to portability, and the right to correct inaccuracies. Same email address; we'll respond within the timelines those laws require.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Security</h2>
              <p>The site is served over HTTPS. Form submissions are transmitted to Resend over an encrypted connection. We do not store payment information on this site (pre-launch - no e-commerce yet). When commerce launches, we will use Stripe or a similar PCI-compliant processor; payment details never touch our servers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Changes to this policy</h2>
              <p>We may update this policy as the business and the law evolve. The "Last updated" date above will reflect the most recent revision. Material changes will be announced via email to current waitlist subscribers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Contact</h2>
              <p>Questions about this policy: <a href="mailto:ken@wellnessforzebras.com" className="text-[#B36B4D] hover:underline">ken@wellnessforzebras.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
