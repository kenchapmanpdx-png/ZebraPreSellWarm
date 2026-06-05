import { useState, useEffect } from "react";
import WaitlistModal from "./WaitlistModal";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  // Mobile bar visibility: show after the hero, retract over the footer so it
  // never covers a heading or sits on the dark footer.
  const [showBar, setShowBar] = useState(false);

  const buttonStyle: React.CSSProperties = {
    backgroundImage: "linear-gradient(to right, #A4613A 0%, #C4856A 50%, #A4613A 100%)",
    backgroundSize: "200% auto",
    backgroundPosition: "left center",
  };

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const footer = document.querySelector("footer");
      let footerInView = false;
      if (footer) {
        const r = footer.getBoundingClientRect();
        footerInView = r.top < window.innerHeight - 24;
      }
      setShowBar(pastHero && !footerInView);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      {/* Desktop: floating corner pill (plenty of room, does not cover copy) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setOpen(true)}
          style={buttonStyle}
          aria-label="Open waitlist signup"
          className="text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 flex items-center focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "right center")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "left center")}
        >
          Join Waitlist
        </button>
      </div>

      {/* Mobile: slim sticky bottom bar pinned to the very bottom edge. Appears
          after the hero and slides away over the footer, so it never lands on
          a heading mid-page the way a corner pill did. */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-2 transition-transform duration-300 ease-out ${
          showBar ? "translate-y-0" : "translate-y-[160%]"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={() => setOpen(true)}
          style={buttonStyle}
          aria-label="Open waitlist signup"
          className="w-full py-3.5 rounded-xl text-white font-bold uppercase tracking-[0.15em] text-sm shadow-[0_10px_30px_-6px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
        >
          Join Waitlist
        </button>
      </div>

      <WaitlistModal open={open} onOpenChange={setOpen} />
    </>
  );
}
