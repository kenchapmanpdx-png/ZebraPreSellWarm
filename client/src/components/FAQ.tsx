import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Is ZebraWell suitable for POTS and EDS?",
      answer: "Yes. ZebraWell is specifically formulated to support hydration, connective tissue health, and mast cell stability, which are common concerns for the POTS and EDS communities."
    },
    {
      question: "Are your products MCAS friendly?",
      answer: "Absolutely. We avoid common triggers like high-histamine fillers, artificial dyes, and preservatives. Our formulas are third-party tested for purity."
    },
    {
      question: "When will my pre-order ship?",
      answer: "We are currently in the final stages of production. Pre-orders are estimated to ship within 4-6 weeks. You will receive email updates throughout the process."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship to the US and Canada. We are working on expanding to the UK and Australia soon."
    }
  ];

  // JSON-LD Schema for Google SEO - Preserved exactly
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FBF8F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0f2e24] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#5D4037]">
            Everything you need to know about our clinical-grade formulations.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#C8592B]/20">
              <AccordionTrigger className="text-left text-lg font-medium text-[#2c1810] hover:text-[#C8592B] transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}