import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackLead, track } from "@/lib/metaPixel";

export default function PreorderReservation() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        trackLead({ content_name: 'Preorder reservation' });
        toast({
          title: "You're on the reservation list!",
          description: "We'll notify you as soon as ZebraThrive is available for order.",
        });
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE VIEW
  if (isSubmitted) {
    return (
      <section className="py-8 md:py-16 px-8 mt-4 md:mt-10 border-t border-[#3C3835]/10 bg-[#DED9D0]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-xl border-2 border-[#262321] p-8 md:p-12 text-center bg-white">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-serif font-bold text-[#262321] mb-4">You're All Set!</h2>
            <p className="text-xl text-[#4A4540] leading-relaxed max-w-2xl mx-auto">
              We'll send you an email as soon as ZebraThrive is ready to order. Thank you for joining our community.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // DEFAULT FORM VIEW
  return (
    <section className="py-8 md:py-16 px-8 mt-4 md:mt-10 border-t border-[#3C3835]/10 bg-[#DED9D0]">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl shadow-xl border-2 border-[#262321] p-4 md:p-12 text-center bg-white">
          <h2 className="text-3xl font-serif font-bold text-[#B36B4D] mb-3 md:mb-6">📧 Reserve Your Spot - Limited First Run!</h2>
          <p className="text-xl text-[#262321] leading-relaxed max-w-2xl mx-auto mb-4 md:mb-8">
            Be the first to know when ZebraThrive is available for order.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 px-4 py-3 border-2 border-[#BCC2BB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B36B4D] focus:border-[#B36B4D] text-gray-900 bg-white"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className={`text-white font-bold px-6 py-3 rounded-lg shadow transition-all duration-300 text-sm whitespace-nowrap border-2 focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]
                  ${
                    email 
                      ? 'bg-[#A4613A] border-[#A4613A] hover:bg-[#8E5433] active:bg-[#744428] hover:scale-[1.05]' 
                      : 'bg-[#7A8691] border-[#7A8691] opacity-100 cursor-not-allowed'
                  }`
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                    Adding...
                  </div>
                ) : (
                  "Claim Your Spot"
                )}
              </button>
            </div>
            <p className="text-sm text-[#7A8691] mt-3 opacity-80">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}