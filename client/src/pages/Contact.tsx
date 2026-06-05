import { useState, FormEvent } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const hp =
        (document.getElementById("contact-website-hp") as HTMLInputElement | null)?.value || "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website: hp,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setIsSubmitted(true);
      toast({
        title: "Message sent",
        description: "Thanks for reaching out. We respond within two business days.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or email ken@wellnessforzebras.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#3D3733]/20 bg-white text-[#1D2B26] focus:outline-none focus:ring-2 focus:ring-[#B36B4D] focus:border-[#B36B4D]";

  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F2A22] mb-3">
            Contact Support
          </h1>
          <p className="text-lg text-[#3D3733] mb-10 leading-relaxed">
            We read every message. ZebraThrive is built by people who live with the conditions we
            formulate for, and we treat your questions with that respect.
          </p>

          {/* Contact form -> /api/contact */}
          <section className="bg-white/60 border border-[#3D3733]/10 rounded-2xl p-8 md:p-10 mb-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-serif font-bold text-[#0F2A22] mb-2">Send a message</h2>
                {/* Honeypot - hidden from humans, bots fill it */}
                <input
                  type="text"
                  name="website"
                  id="contact-website-hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-px w-px opacity-0"
                />
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-[#3D3733] mb-1">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-[#3D3733] mb-1">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-[#3D3733] mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email || !message}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2A22] hover:bg-[#B36B4D] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-14 h-14 text-[#1D4526] mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-serif font-bold text-[#0F2A22] mb-2">Message sent</h2>
                <p className="text-[#3D3733]">
                  Thanks for reaching out. We respond within two business days.
                </p>
              </div>
            )}
          </section>

          {/* Prefer email? Direct mailto fallback. */}
          <section className="bg-white/60 border border-[#3D3733]/10 rounded-2xl p-8 md:p-10 mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#B36B4D]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#B36B4D]" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0F2A22]">Prefer email?</h2>
            </div>
            <p className="text-[#3D3733] leading-relaxed mb-6">
              Reach us directly for product questions, formulation feedback, partnership inquiries, or
              press. We aim to respond within two business days.
            </p>
            <a
              href="mailto:ken@wellnessforzebras.com"
              className="inline-flex items-center justify-center gap-2 max-w-full break-all px-5 sm:px-6 py-3 bg-[#0F2A22] hover:bg-[#B36B4D] text-white text-[11px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-[0.2em] rounded-full transition-colors text-center"
            >
              ken@wellnessforzebras.com
            </a>
          </section>

          <section className="space-y-6 text-[#3D3733] leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-[#0F2A22]">What's helpful to include</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your question or topic.</li>
              <li>If it's about a specific ingredient, the name of that ingredient.</li>
              <li>
                If it's about an interaction with a medication you take, name the medication (we won't
                share this - see the privacy policy).
              </li>
              <li>If you'd prefer not to use email, mention how you'd like us to reach you instead.</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
