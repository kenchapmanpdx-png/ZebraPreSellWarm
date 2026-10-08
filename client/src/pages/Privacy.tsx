import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto prose-headings:font-serif">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#5D5752] mb-12">Last updated: <time dateTime="2026-10-07">October 7, 2026</time></p>

          <div className="space-y-8 text-[#3D3733] leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">What we collect</h2>
              <p>We only collect what you type into a form, plus standard website analytics described below.</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Waitlist:</strong> your email address.</li>
                <li><strong>Reservation form:</strong> your name, email, optional phone number, and, if you choose to share them, the conditions you identify with (such as hEDS, POTS, or MCAS), the supplements you currently take, and how you heard about us. The condition and supplement fields are optional and are health-related information. Please leave them blank if you would rather not share them.</li>
                <li><strong>Contact form:</strong> your name, email, and message.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">How we use it</h2>
              <p>We use your email to tell you about ZebraThrive: product availability, formulation updates, and shipping news. We use reservation answers in aggregate to plan the product. We use contact-form details to reply to you. We do not sell your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Who processes it</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Resend</strong> stores waitlist and reservation contacts and sends our emails.</li>
                <li><strong>Google Workspace</strong> hosts our inbox. When you submit a form, a copy of what you entered is emailed to us there.</li>
                <li><strong>Vercel</strong> hosts this website. Its servers process every request and keep short-lived technical logs.</li>
              </ul>
              <p className="mt-3">These providers handle data on our behalf. We do not send the conditions or supplements you enter to Google, Meta, or any advertising service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Analytics, advertising, and cookies</h2>
              <p>This site uses the following tools, which set cookies or similar identifiers in your browser:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Google Analytics 4</strong> records pages viewed, approximate location, device and browser, and when a form is submitted, so we can see how people find and use the site.</li>
                <li><strong>Meta Pixel</strong> records page views and the fact that a waitlist, reservation, or contact form was submitted, so we can measure and improve our ads on Facebook and Instagram. It does not receive what you typed into the form.</li>
                <li><strong>Vercel Analytics and Speed Insights</strong> and <strong>Ahrefs Web Analytics</strong> record anonymous, aggregated visit and performance data.</li>
              </ul>
              <p className="mt-3">Some state privacy laws treat ad measurement with tools like the Meta Pixel as "sharing" personal information. You can opt out by emailing us (address below), by blocking third-party cookies in your browser, by installing Google's Analytics opt-out browser add-on, or through your Facebook ad preferences. We also use a small amount of local storage to remember interface preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Your rights</h2>
              <p>You can unsubscribe from any email we send via the unsubscribe link in the email. You can request that we delete your personal information at any time by emailing <a href="mailto:ken@wellnessforzebras.com" className="text-[#8F5238] underline underline-offset-2 hover:text-[#0F2A22]">ken@wellnessforzebras.com</a>. We will confirm and complete the deletion within 30 days.</p>
              <p className="mt-3">Residents of California, Colorado, Virginia, and other US states with privacy laws, and people in the EU and UK, have additional rights, including the right to know what data we hold, to correct it, to delete it, and to opt out of sharing. Use the same email address; we will respond within the timelines those laws require.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Security</h2>
              <p>The site is served over HTTPS and form submissions are transmitted over encrypted connections. We do not collect payment information on this site (pre-launch, no e-commerce yet). When commerce launches, we will use a PCI-compliant payment processor; payment details will not touch our servers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Children</h2>
              <p>This site is not directed to children under 13, and we do not knowingly collect their information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Changes to this policy</h2>
              <p>We may update this policy as the business and the law evolve. The "Last updated" date above reflects the most recent revision. Material changes will be announced by email to current waitlist subscribers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Contact</h2>
              <p>Questions about this policy: <a href="mailto:ken@wellnessforzebras.com" className="text-[#8F5238] underline underline-offset-2 hover:text-[#0F2A22]">ken@wellnessforzebras.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
