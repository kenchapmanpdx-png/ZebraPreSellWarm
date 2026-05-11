import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-3">Terms of Service</h1>
          <p className="text-sm text-[#5D5752] mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-8 text-[#3D3733] leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Acceptance</h2>
              <p>By using wellnessforzebras.com or joining our waitlist, you agree to these Terms of Service. If you don't agree, please don't use the site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Medical disclaimer</h2>
              <p>ZebraWell is a dietary supplement brand. <strong>The information on this site is for educational purposes only and is not medical advice.</strong> The statements made about our products have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease.</p>
              <p className="mt-3">Hypermobile Ehlers-Danlos Syndrome (hEDS), Postural Orthostatic Tachycardia Syndrome (POTS), and Mast Cell Activation Syndrome (MCAS) are complex conditions that require care from qualified healthcare providers. Always consult your physician before starting any new supplement, especially if you take prescription medications, have a diagnosed medical condition, are pregnant or nursing, or are giving the product to a minor.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Waitlist signups</h2>
              <p>Joining the waitlist does not guarantee inventory at launch. Quantities will be limited. We will notify waitlist members in the order they signed up, but signups do not constitute a binding reservation unless explicitly converted via a separate preorder process.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Intellectual property</h2>
              <p>All content on this site - text, formulation rationale, ingredient research summaries, brand assets - is owned by ZebraWell unless otherwise credited. You may not copy, redistribute, or use our content for commercial purposes without written permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Limitation of liability</h2>
              <p>To the maximum extent permitted by law, ZebraWell is not liable for any indirect, incidental, or consequential damages arising from your use of this site or our products. Your use is at your own risk.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Governing law</h2>
              <p>These terms are governed by the laws of the State of Oregon, USA, without regard to conflict-of-law principles.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Contact</h2>
              <p>Questions about these terms: <a href="mailto:ken@wellnessforzebras.com" className="text-[#B36B4D] hover:underline">ken@wellnessforzebras.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
