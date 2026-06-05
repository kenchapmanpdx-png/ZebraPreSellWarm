import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Shipping() {
  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-3">Shipping &amp; Returns</h1>
          <p className="text-sm text-[#5D5752] mb-12">Pre-launch placeholder. Full policy publishes with the first product shipment.</p>

          <div className="space-y-8 text-[#3D3733] leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Pre-launch status</h2>
              <p>ZebraThrive is not yet shipping. Waitlist subscribers will be the first to know when products are available for order, including the final shipping options, lead times, and return policy. Manufacturing timing depends on first-run production scheduling and will be communicated by email.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">What we expect to offer (subject to change at launch)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Free standard shipping</strong> within the contiguous United States on orders over a yet-to-be-determined threshold.</li>
                <li><strong>Tracked shipping</strong> on all orders - you'll receive a tracking link by email.</li>
                <li><strong>30-day satisfaction guarantee</strong> on unopened product (returns at customer's cost).</li>
                <li><strong>No-questions-asked exchange</strong> if your first bottle arrives damaged or doesn't tolerate well - we'll work with you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">International shipping</h2>
              <p>Initial launch is U.S.-only. International availability is planned for a future phase, depending on customs requirements for dietary supplements in each destination.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Contact</h2>
              <p>For shipping questions after launch: <a href="mailto:ken@wellnessforzebras.com" className="text-[#B36B4D] hover:underline">ken@wellnessforzebras.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
