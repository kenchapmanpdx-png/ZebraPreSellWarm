/* client/src/components/WaitlistModal.tsx
 *
 * Modal popup for waitlist email capture. Triggered by the FloatingCTA
 * (and any other surface that wants a popup rather than an inline form).
 *
 * Behavior:
 *   - On open: email input is auto-focused.
 *   - On submit: POSTs to /api/waitlist (same endpoint as the hero form).
 *   - On success: shows confirmation state; modal can be closed normally.
 *   - On error: inline role="alert" message (NOT a toast) + keeps the form
 *     open so the user can retry; focus returns to the email field.
 *
 * Uses shadcn/ui Dialog primitives (Radix-based) for accessibility:
 *   focus trap, ESC to close, ARIA labels, etc.
 *
 * Escape note: a Radix Toast registers its own DismissableLayer, which
 * becomes the top layer above this Dialog. Radix only lets the TOP layer
 * handle Escape, so while a toast is showing, Escape closed the toast and
 * the modal ignored it. Errors are therefore shown inline, and a fallback
 * document listener closes the modal on any Escape that Radix did not
 * already handle (e.g. while the success toast is up).
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trackLead } from "@/lib/metaPixel";
import { trackGa } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const FALLBACK_ERROR =
  "Something went wrong. Please try again, or email ken@wellnessforzebras.com.";

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    const msg = (data as { message?: unknown } | null)?.message;
    if (typeof msg === "string" && msg.trim()) return msg;
  } catch {
    /* non-JSON body */
  }
  return FALLBACK_ERROR;
}

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    setSubmitError("");
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError("Please enter a valid email address, like name@example.com.");
      emailRef.current?.focus();
      return;
    }
    setEmailError("");

    setIsSubmitting(true);
    try {
      const hp = (document.getElementById("modal-website-hp") as HTMLInputElement | null)?.value || "";
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: hp }),
      });
      if (!response.ok) {
        setSubmitError(await readErrorMessage(response));
        return;
      }
      setIsSubmitted(true);
      trackLead({ content_name: 'Waitlist modal' });
      trackGa("generate_lead", { form: "waitlist_modal" });
      toast({
        title: "You're on the list!",
        description: "We'll notify you the moment ZebraThrive is available.",
      });
    } catch {
      setSubmitError(FALLBACK_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  // The submit button is disabled while submitting, which drops focus to
  // <body>. After a failed submit, put focus back inside the dialog.
  useEffect(() => {
    if (submitError) emailRef.current?.focus();
  }, [submitError]);

  // When the modal closes, reset state after the close animation so it doesn't
  // flash old content on next open.
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
        setEmailError("");
        setSubmitError("");
      }, 200);
    }
    onOpenChange(next);
  };

  // Fallback Escape handler. Radix handles Escape in a capture-phase document
  // listener and calls preventDefault() when it dismisses the dialog; if some
  // other layer (a toast) was on top, Radix skips the dialog and the event
  // arrives here un-prevented, so close the modal ourselves.
  const handleOpenChangeRef = useRef(handleOpenChange);
  handleOpenChangeRef.current = handleOpenChange;
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      handleOpenChangeRef.current(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#EBE8E1] border border-[#3D3733]/15 w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-full sm:max-w-md rounded-2xl">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#0F2A22]">
                Join the Waitlist
              </DialogTitle>
              <DialogDescription className="text-[#3D3733]/80 leading-relaxed">
                Be the first to know when ZebraThrive opens for reservations.
                Research-driven AM/PM formulas built for the EDS, POTS, and MCAS triad - no spam, no filler emails.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
              <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                <label htmlFor="modal-website-hp">Website (leave blank)</label>
                <input id="modal-website-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div>
                <label htmlFor="waitlist-modal-email" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  id="waitlist-modal-email"
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  aria-label="Email address for waitlist signup"
                  aria-invalid={emailError ? "true" : undefined}
                  aria-describedby={emailError ? "waitlist-modal-email-error" : undefined}
                  className="w-full px-5 py-4 bg-white/80 border border-[#3D3733]/15 rounded-2xl text-[#3D3733] focus:outline-none focus:border-[#B36B4D] focus:bg-white transition-colors placeholder:text-[#8A857C]/60"
                />
                {emailError && (
                  <p id="waitlist-modal-email-error" role="alert" className="mt-2 text-sm font-medium text-[#9B2C2C]">
                    {emailError}
                  </p>
                )}
              </div>
              {submitError && (
                <p role="alert" className="text-sm font-medium text-[#9B2C2C] text-center">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#0F2A22] text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#B36B4D] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Joining…
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </button>
              <p className="text-xs text-center text-[#3D3733]/60">
                We use your email only to notify you about ZebraThrive. Unsubscribe any time.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#B36B4D]/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#B36B4D]" aria-hidden="true" />
            </div>
            <DialogTitle className="text-2xl font-serif text-[#0F2A22] mb-3">
              You're on the list
            </DialogTitle>
            <DialogDescription className="text-[#3D3733]/80 leading-relaxed">
              We'll email you the moment ZebraThrive is available. In the meantime, you can explore the ingredients, the science, and our promise from the nav above.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
