import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ZebraPatternOverlay from '@/components/ZebraPatternOverlay';
import ZebraHeart from '@/components/ZebraHeart';
import ProductBottles from '@/components/ProductBottles';
import { CheckCircle, Heart, Sparkles, Clock, Mail } from 'lucide-react';

export default function PreorderPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [currentSupplements, setCurrentSupplements] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hp = (document.getElementById('preorder-website-hp') as HTMLInputElement | null)?.value || '';
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          conditions,
          currentSupplements: currentSupplements.trim() || undefined,
          hearAboutUs: hearAboutUs || undefined,
          website: hp,
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      setIsSubmitted(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you as soon as ZebraWell is available for order.",
      });
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

  const toggleCondition = (c: string) =>
    setConditions((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="min-h-screen bg-[#EBE8E1]">
      <Navigation />
      <ZebraPatternOverlay opacity={0.03} />

      {/* Hero Section */}
      <section id="main-content" className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-amber-100 text-amber-800 border-amber-200 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
              Coming Soon
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Be the First to Experience
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mt-2">
                ZebraWell
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              A 3-component system - AM capsules, PM capsules, and a Daily Powder - designed for the EDS/POTS/MCAS triad.
              Join the reservation list to experience ZebraWell as soon as it opens for order.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex items-center text-amber-700">
                <ZebraHeart className="mr-2" size={20} />
                <span className="font-medium">Made with care for rare conditions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First-batch pitch - patient-language reservation incentive */}
      <section className="py-16 px-6 bg-[#EBE8E1] border-y border-[#3D3733]/10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-[#B36B4D]/30 rounded-3xl p-8 md:p-10 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0F2A22] mb-5">Why reserve now</h2>
            <p className="text-lg leading-relaxed text-[#3D3733] mb-4">
              The first batch is limited, and once we close the list, the next public opening is months away - that's the manufacturing lead time on the next run. Here's why that matters: <strong>we set aside bottles from the first batch specifically for your refills.</strong> When you finish a bottle, your next one is already reserved - no gap while we manufacture the next run.
            </p>
            <p className="text-lg leading-relaxed text-[#3D3733]">
              New customers in later rounds don't get that guarantee. First-batch buyers do.
            </p>
            <p className="text-sm uppercase tracking-[0.25em] text-[#B36B4D] font-bold mt-6">
              Built by zebras, for zebras.
            </p>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-16 bg-[#DED9D0]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ProductBottles />
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    What's Inside
                  </h2>
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex-1">
                        <h3 className="font-bold text-[#C8592B] mb-2">ZebraWell AM</h3>
                        <p className="text-[#1D4526] font-medium">Fuel + Focus</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
                        <h3 className="font-bold text-[#C8592B] mb-2">ZebraWell PM</h3>
                        <p className="text-[#1D4526] font-medium">Repair + Recover</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 mb-6">
                    Each bottle contains 120 capsules (30-day supply). Take 4 capsules in the morning and 4 at night.
                    That's it-no more 12-bottle stacks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-amber-200 bg-amber-50/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-amber-700 mb-1">AM</div>
                      <div className="text-sm text-gray-600">Morning Formula</div>
                      <div className="text-xs text-gray-500 mt-1">4 capsules</div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">PM</div>
                      <div className="text-sm text-gray-600">Evening Formula</div>
                      <div className="text-xs text-gray-500 mt-1">4 capsules</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" aria-hidden="true" />
                    <span>Clinical-grade ingredients</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" aria-hidden="true" />
                    <span>Formulated for rare conditions</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" aria-hidden="true" />
                    <span>30-day supply per bottle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptom Selector Quiz */}
      <section id="zebrawell-quiz" className="py-12 px-4 md:px-12 bg-[#F4F2ED]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-900 mb-4">What Symptoms Are You Struggling With Most?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">Select up to 3 symptoms and see how ZebraWell supports them.</p>

          {/* Quiz Form */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Fatigue" className="quiz-checkbox" />
              Fatigue / Low Energy
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Brain Fog" className="quiz-checkbox" />
              Brain Fog
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Dizziness" className="quiz-checkbox" />
              Dizziness / Lightheadedness
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Poor Circulation" className="quiz-checkbox" />
              Cold Hands / Poor Circulation
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Joint Pain" className="quiz-checkbox" />
              Joint Pain / Hypermobile Discomfort
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Gut Issues" className="quiz-checkbox" />
              Gut Issues / IBS
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Anxiety" className="quiz-checkbox" />
              Anxiety / Dysautonomia
            </label>
            <label className="quiz-option flex items-center gap-2 text-base text-gray-800 bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200 hover:bg-green-50 hover:border-gray-400">
              <input type="checkbox" name="symptoms" value="Inflammation" className="quiz-checkbox" />
              Chronic Inflammation
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => {
              const selected = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(el => (el as HTMLInputElement).value);
              const resultList = document.getElementById('resultList');
              const resultBox = document.getElementById('quizResults');

              if (resultList && resultBox) {
                resultList.innerHTML = '';
                if (selected.length === 0) {
                  resultList.innerHTML = '<li>Please select at least one symptom.</li>';
                } else {
                  const data: Record<string, string[]> = {
                    "Fatigue": ["Nicotinamide Riboside (AM)", "Benfotiamine (AM)", "Taurine (Powder)"],
                    "Brain Fog": ["Methylcobalamin B12 (AM)", "Methylfolate (AM)", "L-Theanine (AM)"],
                    "Dizziness": ["Taurine (Powder)", "Magnesium Bisglycinate (Powder)", "Vitamin C - Sodium Ascorbate (Powder)"],
                    "Poor Circulation": ["Vitamin K2 MK-7 (PM)", "Copper Bisglycinate (PM)", "Pine Bark Extract (AM)"],
                    "Joint Pain": ["PEA (AM)", "Grape Seed Extract (AM/PM)", "Astaxanthin (AM)"],
                    "Gut Issues": ["Zinc Carnosine (AM/PM)", "PEA (AM)", "Magnesium Bisglycinate (Powder)"],
                    "Anxiety": ["L-Theanine (AM)", "Taurine (Powder)", "Magnesium Bisglycinate (Powder)"],
                    "Inflammation": ["Luteolin (AM)", "Quercetin Phytosome (Powder)", "PEA (AM)"]
                  };

                  selected.forEach(symptom => {
                    const ingredients = data[symptom] || [];
                    const line = `<li><strong>${symptom}</strong>: ${ingredients.join(', ')}</li>`;
                    resultList.innerHTML += line;
                  });
                }
                resultBox.classList.remove('hidden');
              }
            }}
            className="bg-[#0F2A22] hover:bg-[#B36B4D] active:bg-[#8E5433] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 mt-4 focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
          >
            Show My Support Plan
          </button>

          {/* Results Output */}
          <div id="quizResults" className="mt-8 hidden text-left bg-white border border-green-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-800 mb-2">Here's how ZebraWell can help:</h3>
            <ul id="resultList" className="list-disc list-inside text-gray-800"></ul>
          </div>
        </div>
      </section>

      {/* Pre-launch transparency block (replaces fabricated testimonials).
          FTC endorsement guides require testimonials to be from genuine users
          of the actual product. We're not shipping yet, so there are no
          genuine product testimonials to share. Real reviews will replace
          this section after the first batch ships. */}
      <section className="py-16 bg-[#DED9D0]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F2A22] mb-6">
              We don't have testimonials yet.
            </h2>
            <p className="text-lg text-[#3D3733] leading-relaxed mb-4">
              ZebraWell is pre-launch. The first batch hasn't shipped, so no one has used the actual product yet, which means we don't have honest reviews to show you. We'd rather say that plainly than fabricate a quote.
            </p>
            <p className="text-lg text-[#3D3733] leading-relaxed">
              First-batch buyers get the first opportunity to share what worked, what didn't, and what they'd want changed. Those reviews will replace this section.
            </p>
            <p className="text-sm uppercase tracking-[0.25em] text-[#B36B4D] font-bold mt-8">
              Honest before convenient.
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 bg-[#F4F2ED]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 md:p-12 border border-amber-200">
              <div className="mb-8">
                <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-3xl md:text-4xl font-bold text-terra mb-4">
                  Reserve Your Spot - Limited First Run!
                </h2>
                <p className="text-lg text-gray-700">
                  Be the first to know when ZebraWell is available for order.
                  No spam, just the important updates.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot - hidden from humans */}
                  <input type="text" name="website" id="preorder-website-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />

                  <div className="grid sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <label htmlFor="po-first" className="block text-sm font-semibold text-gray-700 mb-1">First name</label>
                      <Input id="po-first" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="py-3 border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white" />
                    </div>
                    <div>
                      <label htmlFor="po-last" className="block text-sm font-semibold text-gray-700 mb-1">Last name</label>
                      <Input id="po-last" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="py-3 border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white" />
                    </div>
                  </div>

                  <div className="text-left">
                    <label htmlFor="po-email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                      <Input id="po-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-12 py-3 border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white" />
                    </div>
                  </div>

                  <div className="text-left">
                    <label htmlFor="po-phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                    <Input id="po-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="py-3 border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white" />
                  </div>

                  <fieldset className="text-left">
                    <legend className="text-sm font-semibold text-gray-700 mb-2">Which apply to you? <span className="text-gray-400 font-normal">(optional)</span></legend>
                    <div className="flex flex-wrap gap-2">
                      {['hEDS', 'POTS', 'MCAS', 'Caregiver', 'Other'].map((c) => (
                        <button type="button" key={c} onClick={() => toggleCondition(c)} aria-pressed={conditions.includes(c)} className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${conditions.includes(c) ? 'bg-[#0F2A22] text-white border-[#0F2A22]' : 'bg-white text-gray-700 border-amber-200 hover:border-amber-400'}`}>{c}</button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="text-left">
                    <label htmlFor="po-supps" className="block text-sm font-semibold text-gray-700 mb-1">Current supplements <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea id="po-supps" value={currentSupplements} onChange={(e) => setCurrentSupplements(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-md border border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white text-gray-900" />
                  </div>

                  <div className="text-left">
                    <label htmlFor="po-hear" className="block text-sm font-semibold text-gray-700 mb-1">How did you hear about us? <span className="text-gray-400 font-normal">(optional)</span></label>
                    <select id="po-hear" value={hearAboutUs} onChange={(e) => setHearAboutUs(e.target.value)} className="w-full px-4 py-3 rounded-md border border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white text-gray-900">
                      <option value="">Select...</option>
                      <option value="Search engine">Search engine</option>
                      <option value="Social media">Social media</option>
                      <option value="Friend or family">Friend or family</option>
                      <option value="Doctor or practitioner">Doctor or practitioner</option>
                      <option value="Support group or community">Support group or community</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !firstName || !lastName || !email}
                    className={`w-full py-3 text-lg text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)] ${(firstName && lastName && email)
                        ? 'bg-[#0F2A22] border-[#0F2A22] hover:bg-[#B36B4D] active:bg-[#744428]'
                        : 'bg-[#7A8691] border-[#7A8691] opacity-70 cursor-not-allowed'
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Reserving your spot...
                      </div>
                    ) : (
                      "Claim Your Spot"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    You're all set!
                  </h3>
                  <p className="text-gray-700">
                    We'll send you an email as soon as ZebraWell is ready to order.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-600 mt-6">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}